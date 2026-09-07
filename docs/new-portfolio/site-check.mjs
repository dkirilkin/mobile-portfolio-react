import { chromium } from 'file:///C:/Users/Dmitriy/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const dir=path.dirname(fileURLToPath(import.meta.url));
const base='http://localhost:3002';
const browser=await chromium.launch({headless:true,channel:'msedge'});
const page=await browser.newPage();
const errors=[],results=[];
page.on('pageerror',e=>errors.push(e.message));
await page.goto(base+'/projects');
const projects=await page.locator('a[class*="projectRow"]').evaluateAll(links=>links.map(link=>link.getAttribute('href')));
const routes=['/','/projects','/cases/ev-charging','/cases/goods-delivery',...projects];
if(projects.length!==8)errors.push('Expected eight visible projects');
for(const width of [320,390,768,1440]) {
  await page.setViewportSize({width,height:width<600?844:1000});
  for(const route of routes) {
    const response=await page.goto(base+route,{waitUntil:'networkidle'});
    const state=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth-innerWidth,headings:document.querySelectorAll('h1').length,navs:document.querySelectorAll('nav[aria-label="Основная навигация"]').length,footers:document.querySelectorAll('footer').length,previewLinks:[...document.querySelectorAll('a')].filter(a=>a.getAttribute('href')?.startsWith('/preview')).length,canonical:document.querySelector('link[rel="canonical"]')?.getAttribute('href'),noindex:document.querySelector('meta[name="robots"]')?.content.includes('noindex')}));
    if(response.status()!==200||state.overflow||state.headings!==1||state.navs!==1||state.footers!==1||state.previewLinks||state.noindex||!state.canonical||new URL(state.canonical).href!==new URL(route,'https://kirilkin.vercel.app').href)errors.push({route,width,state,status:response.status()});
    if(route.startsWith('/projects/')) {
      if(!await page.getByRole('button',{name:/^Открыть скриншот 1 проекта/}).count())errors.push('Carousel missing: '+route);
      if(await page.getByText('Смотреть ближе',{exact:true}).count())errors.push('Overlay returned: '+route);
    }
    if(route.startsWith('/cases/')) {
      for(const heading of ['Как устроена система','Задача','Результат','Приложения кейса'])if(!await page.getByRole('heading',{name:heading,exact:true}).count())errors.push('Missing case section: '+heading);
      const edgeCount=await page.getByRole('list',{name:'Связи между частями системы'}).locator('li').count();
      if(edgeCount!==(route.endsWith('ev-charging')?5:6))errors.push('Case relationships lost: '+route);
    }
    results.push({route,width,status:response.status(),...state});
    if([390,1440].includes(width)&&['/','/projects','/cases/ev-charging','/cases/goods-delivery','/projects/ev-clients','/projects/e-commerce'].includes(route)) {
      await page.evaluate(()=>document.fonts.ready);
      const height=await page.evaluate(()=>document.documentElement.scrollHeight);
      for(let y=0;y<height;y+=700){await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),y);await page.waitForTimeout(60);}
      await page.evaluate(()=>Promise.all([...document.images].filter(i=>i.complete&&i.naturalWidth).map(i=>i.decode().catch(()=>{}))));
      await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
      const name=route==='/'?'home':route.split('/').at(-1);
      await page.screenshot({path:path.join(dir,`site-${name}-${width}.png`)});
      await page.screenshot({path:path.join(dir,`site-${name}-${width}-full.png`),fullPage:true});
      if(route.startsWith('/cases/'))await page.locator('[class*="caseDescriptionGrid"]').screenshot({path:path.join(dir,`site-${name}-description-${width}.png`)});
      if(route.startsWith('/projects/'))await page.locator('[class*="projectCarousel"]').screenshot({path:path.join(dir,`site-${name}-carousel-${width}.png`)});
    }
  }
}
await page.setViewportSize({width:390,height:844});
await page.goto(base+'/projects/ev-clients',{waitUntil:'networkidle'});
await page.getByRole('button',{name:'Прокрутить карусель вперёд',exact:true}).click();
await page.waitForTimeout(500);
if(!await page.getByRole('button',{name:'Прокрутить карусель назад',exact:true}).isEnabled())errors.push('Carousel did not move');
await page.getByRole('button',{name:/^Открыть скриншот 1 проекта/}).click();
await page.getByRole('dialog').waitFor();
await page.getByRole('button',{name:'Следующее изображение',exact:true}).click();
if(!await page.getByText('2 / 4',{exact:true}).isVisible())errors.push('Lightbox did not change');
await page.keyboard.press('Escape');
if(await page.getByRole('dialog').count())errors.push('Lightbox did not close');
await page.getByRole('link',{name:/^Кейс:/}).click();
await page.waitForURL('**/cases/ev-charging');
await page.locator('a[class*="projectRow"]').first().click();
await page.waitForURL('**/projects/ev-clients');
const redirects=[['/preview','/'],['/preview/projects','/projects'],['/preview/charging','/cases/ev-charging'],['/preview/cases/goods-delivery','/cases/goods-delivery'],['/preview/projects/ev-clients','/projects/ev-clients'],['/figma-demo','/']];
for(const [from,to] of redirects){await page.goto(base+from);if(new URL(page.url()).pathname!==to)errors.push('Redirect failed: '+from);}
for(const route of ['/projects/cognitivy','/projects/missing','/cases/missing']){const res=await page.goto(base+route);if(res.status()!==404)errors.push('Missing/hidden route visible: '+route);}
const nojs=await browser.newPage({javaScriptEnabled:false});
await nojs.goto(base+'/projects');
if(await nojs.locator('a[class*="projectRow"]').count()!==8)errors.push('No-JS catalog incomplete');
await browser.close();
fs.writeFileSync(path.join(dir,'site-checks.json'),JSON.stringify({results,redirects,errors},null,2));
console.log(JSON.stringify({pages:routes.length,widths:4,errors}));
if(errors.length)process.exitCode=1;
