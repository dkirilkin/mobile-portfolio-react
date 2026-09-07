import { chromium } from 'file:///C:/Users/Dmitriy/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const dir = path.dirname(fileURLToPath(import.meta.url));
const browser = await chromium.launch({headless:true,channel:'msedge'});
const results = [], errors = [];
for(const width of [320,390,1440]) {
  const page = await browser.newPage({viewport:{width,height:900}});
  page.on('pageerror', error => errors.push(error.message));
  for(const route of ['/preview','/preview/cases/ev-charging','/preview/projects/ev-clients']) {
    await page.goto('http://localhost:3002'+route,{waitUntil:'networkidle'});
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth-innerWidth);
    const galleryBackgrounds = await page.locator('[class*="projectGallery"], [class*="caseCover"], [class*="openingGallery"], [class*="perspective_"] , [class*="detailSpread"]').evaluateAll(elements => elements.map(element => getComputedStyle(element).backgroundColor));
    const clear = galleryBackgrounds.every(color => color === 'rgba(0, 0, 0, 0)');
    if(overflow || !clear || await page.getByText('Смотреть ближе',{exact:true}).count()) errors.push(`Gallery failed: ${route}/${width}`);
    const icon = page.getByRole('button',{name:/^Увеличить:/}).first();
    const screenshot = page.getByRole('button',{name:/^Открыть изображение:/}).first();
    const iconBox = await icon.boundingBox(), imageBox = await screenshot.boundingBox();
    const outside = iconBox.y >= imageBox.y + imageBox.height;
    if(!outside || iconBox.width < 44 || iconBox.height < 44) errors.push(`Icon overlaps screenshot or is too small: ${route}/${width}`);
    for(const trigger of [icon,screenshot]) {
      await trigger.focus(); await page.keyboard.press('Enter');
      const dialog = page.getByRole('dialog'); await dialog.waitFor({state:'visible'});
      await page.keyboard.press('Tab');
      if(!await dialog.evaluate(element => element.contains(document.activeElement))) errors.push('Focus escaped dialog');
      await page.keyboard.press('Escape');
      if(!await trigger.evaluate(element => element === document.activeElement)) errors.push('Focus not restored to initiating control');
    }
    results.push({route,width,overflow,clear,outside});
    if(width===390 || width===1440) {
      const target = route.endsWith('ev-clients') ? page.locator('[class*="projectGallery"]') : route.endsWith('ev-charging') ? page.locator('[class*="caseCover"]') : page.locator('[class*="openingGallery"]');
      await target.scrollIntoViewIfNeeded();
      await target.locator('img').evaluateAll(images => Promise.all(images.map(image => image.decode().catch(()=>{}))));
      await target.screenshot({path:path.join(dir,`gallery-${route.split('/').at(-1)}-${width}.png`)});
    }
  }
  await page.close();
}
await browser.close();
fs.writeFileSync(path.join(dir,'gallery-checks.json'),JSON.stringify({results,errors},null,2));
console.log(JSON.stringify({views:results.length,errors}));
if(errors.length) process.exitCode=1;
