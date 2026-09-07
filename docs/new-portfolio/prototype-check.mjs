import { chromium } from 'file:///C:/Users/Dmitriy/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const dir=path.dirname(fileURLToPath(import.meta.url));
const base=process.env.PORTFOLIO_CHECK_URL || 'http://localhost:3002';
const browser=await chromium.launch({headless:true,channel:'msedge'});
const result=[];
for(const route of ['/preview','/preview/charging']) {
  for(const width of [320,390,768,1440]) {
    const page=await browser.newPage({viewport:{width,height:width<600?844:1000},hasTouch:width<600,reducedMotion:'reduce'});
    const errors=[];page.on('pageerror',e=>errors.push(e.message));
    const response=await page.goto(base+route,{waitUntil:'networkidle'});
    const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth);
    const zoom=page.getByRole('button',{name:/Увеличить:/}).first();
    await zoom.focus();await page.keyboard.press('Enter');
    const dialog=page.getByRole('dialog');
    await dialog.waitFor({state:'visible'});
    const opened=await dialog.isVisible();
    await page.keyboard.press('Tab');
    const contained=await dialog.evaluate(el=>el.contains(document.activeElement));
    await page.keyboard.press('Escape');
    const restored=await zoom.evaluate(el=>el===document.activeElement);
    const closeWorks=await page.locator('dialog[open]').count()===0;
    let roleWorks=null, reducedAnimation=null;
    if(route.endsWith('charging')) {
      const role=page.getByRole('button',{name:'Глазами техника',exact:true});
      await role.click();
      roleWorks=await role.getAttribute('aria-pressed')==='true' && await page.getByRole('heading',{name:'Видеть маршрут и следующий шаг'}).isVisible();
      reducedAnimation=await page.locator('[class*="perspectiveVisual"]').evaluate(el=>getComputedStyle(el).animationName)==='none';
      await page.getByRole('link',{name:'Все кейсы',exact:true}).click();
      await page.waitForURL('**/preview#cases');
    } else {
      for(const name of ['Заказать зарядку','Выбрать и купить','Разобраться в расходах']) {
        await page.goto(base+'/preview',{waitUntil:'networkidle'});
        const openingLink=page.locator('a').filter({has:page.getByRole('heading',{name,exact:true})});
        const destination=await openingLink.getAttribute('href');
        await openingLink.click();
        await page.waitForURL(base+destination);
        if(!await page.locator('h1').isVisible())errors.push(`Opening link ${name} failed`);
      }
    }
    const record={route,width,status:response.status(),overflow,opened,focusContained:contained,focusRestored:restored,closeWorks,roleWorks,reducedAnimation,errors};result.push(record);
    await page.close();
  }
}
const nojs=await browser.newPage({javaScriptEnabled:false});
await nojs.goto(base+'/preview');
result.push({noJavaScript:true,title:await nojs.locator('h1').textContent(),works:await nojs.locator('article[id]').count(),contact:await nojs.locator('a[href="https://t.me/Dmitriy33666"]').count()});
await nojs.close();
await browser.close();
fs.writeFileSync(path.join(dir,'prototype-checks.json'),JSON.stringify(result,null,2));
console.log(JSON.stringify(result));
