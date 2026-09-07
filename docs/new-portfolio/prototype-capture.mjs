import {chromium} from 'file:///C:/Users/Dmitriy/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const dir=path.dirname(fileURLToPath(import.meta.url));
const base=process.env.PORTFOLIO_CHECK_URL || 'http://localhost:3002';
const browser=await chromium.launch({headless:true,channel:'msedge'});
const results=[];
for(const route of [{name:'home',path:'/preview'},{name:'charging',path:'/preview/charging'}]) {
  for(const view of [{name:'desktop',width:1440,height:1000},{name:'mobile',width:390,height:844},{name:'tablet',width:768,height:1024}]) {
    const page=await browser.newPage({viewport:{width:view.width,height:view.height}});
    await page.goto(base+route.path,{waitUntil:'networkidle'});
    await page.evaluate(()=>document.fonts.ready);
    const height=await page.evaluate(()=>document.documentElement.scrollHeight);
    for(let y=0;y<height;y+=700) {await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),y);await page.waitForTimeout(150);}
    await page.evaluate(()=>Promise.all([...document.images].filter(img=>img.getBoundingClientRect().width>0).map(img=>img.decode().catch(()=>{}))));
    const images=await page.evaluate(()=>[...document.images].filter(img=>img.getBoundingClientRect().width>0&&!img.naturalWidth).map(img=>img.src));
    await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
    await page.screenshot({path:path.join(dir,`prototype-${route.name}-${view.name}.png`)});
    await page.screenshot({path:path.join(dir,`prototype-${route.name}-${view.name}-full.png`),fullPage:true});
    // Section crops keep interface detail legible for the independent reviewer.
    if(route.name==='home') for(const id of ['cases','work']) await page.locator(`#${id}`).screenshot({path:path.join(dir,`prototype-${id}-${view.name}.png`)});
    else await page.locator('[class*="detailSpread"]').screenshot({path:path.join(dir,`prototype-detail-${view.name}.png`)});
    results.push({route:route.path,width:view.width,missingImages:images});await page.close();
  }
}
await browser.close();
fs.writeFileSync(path.join(dir,'prototype-capture.json'),JSON.stringify(results,null,2));
console.log(JSON.stringify(results));
