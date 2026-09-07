import {chromium} from 'file:///C:/Users/Dmitriy/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const __dirname=path.dirname(fileURLToPath(import.meta.url));
const dir=__dirname;
(async()=>{
  const browser=await chromium.launch({headless:true,channel:'msedge'});
  const results=[];
  for (const letter of ['a','b','c']) {
    for (const size of [{name:'desktop',width:1440,height:1000},{name:'tablet',width:768,height:1024},{name:'mobile',width:390,height:844},{name:'small',width:320,height:740}]) {
      const page=await browser.newPage({viewport:{width:size.width,height:size.height},deviceScaleFactor:1});
      const errors=[];page.on('pageerror',e=>errors.push(e.message));
      await page.goto(`http://127.0.0.1:4317/direction-${letter}.html`,{waitUntil:'networkidle'});
      await page.evaluate(()=>document.fonts.ready);
      const measure=await page.evaluate(()=>({scrollWidth:document.documentElement.scrollWidth,viewport:innerWidth,images:[...document.images].filter(i=>i.getAttribute('src')&&!i.complete||i.getAttribute('src')&&i.naturalWidth===0).map(i=>i.getAttribute('src')),fonts:[...document.fonts].map(f=>({family:f.family,status:f.status})),contentVisible:!!document.querySelector('h1')?.getBoundingClientRect().height}));
      if(size.name!=='small') {
        await page.screenshot({path:path.join(dir,`${size.name}-${letter}.png`)});
        await page.screenshot({path:path.join(dir,`${size.name}-${letter}-full.png`),fullPage:true});
      }
      if(size.name==='mobile') {
        const controls=page.locator(letter==='a'?'[data-stage]':'[data-role]');
        await controls.nth(1).click();
        const selector=letter==='a'?'.active-stage':'.role-screen';
        if(!(await page.locator(`${selector} img`).getAttribute('src')).includes('technicians'))errors.push('Role switch failed');
        const zoom=page.locator(`${selector} [data-zoom]`);
        await zoom.click();
        if(!await page.locator('dialog').evaluate(el=>el.open))errors.push('Viewer did not open');
        await page.keyboard.press('Escape');
        if(await page.locator('dialog').evaluate(el=>el.open))errors.push('Escape did not close viewer');
        if(!await zoom.evaluate(el=>el===document.activeElement))errors.push('Focus not restored');
        await controls.first().focus();await page.keyboard.press('Enter');
        if(await controls.first().getAttribute('aria-pressed')!=='true')errors.push('Keyboard selection failed');
        await page.emulateMedia({reducedMotion:'reduce'});
        const motion=await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior);
        if(motion!=='auto')errors.push('Reduced motion scroll not disabled');
      }
      results.push({letter,size:size.name,...measure,errors});await page.close();
    }
  }
  fs.writeFileSync(path.join(dir,'browser-checks.json'),JSON.stringify(results,null,2));
  console.log(JSON.stringify(results.map(r=>({concept:r.letter,size:r.size,overflow:r.scrollWidth-r.viewport,brokenImages:r.images,errors:r.errors}))));
  if(process.argv.includes('--references')){
    for(const ref of [{key:'a',url:'https://www.pentagram.com/work/mit-media-lab'},{key:'b',url:'https://linear.app/features'},{key:'c',url:'https://www.studiolenzing.com/'}]){
      const page=await browser.newPage({viewport:{width:1440,height:1000}});
      try{await page.goto(ref.url,{waitUntil:'domcontentloaded',timeout:25000});await page.waitForTimeout(1800);await page.screenshot({path:path.join(dir,`reference-${ref.key}.png`)});console.log('reference',ref.key,'captured');}catch(e){console.log('reference',ref.key,e.message)}
      await page.close();
    }
  }
  await browser.close();
})();
