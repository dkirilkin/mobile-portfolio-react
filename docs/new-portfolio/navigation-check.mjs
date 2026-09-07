import { chromium } from 'file:///C:/Users/Dmitriy/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const dir = path.dirname(fileURLToPath(import.meta.url));
const base = 'http://localhost:3002';
const browser = await chromium.launch({headless:true, channel:'msedge'});
const errors = [], results = [];
const page = await browser.newPage();
page.on('pageerror', error => errors.push(error.message));
await page.goto(base + '/preview/projects');
const projects = await page.locator('a[class*="projectRow"]').evaluateAll(links => links.map(link => link.getAttribute('href')));
if(projects.length !== 8) errors.push(`Expected 8 projects, got ${projects.length}`);
const routes = ['/preview', '/preview/projects', '/preview/cases/ev-charging', '/preview/cases/goods-delivery', ...projects];
for(const width of [320, 390, 768, 1440]) {
  await page.setViewportSize({width, height:width < 600 ? 844 : 1000});
  for(const route of routes) {
    const response = await page.goto(base + route, {waitUntil:'networkidle'});
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    const nav = page.getByRole('navigation', {name:'Основная навигация'});
    const cases = await nav.getByRole('link', {name:'Кейсы', exact:true}).getAttribute('href');
    const works = await nav.getByRole('link', {name:'Работы', exact:true}).getAttribute('href');
    if(response.status() !== 200 || overflow > 0 || cases !== '/preview#cases' || works !== '/preview/projects') errors.push(`Route check failed: ${route} / ${width}`);
    results.push({route,width,status:response.status(),overflow});
    if([390,1440].includes(width) && ['/preview','/preview/projects','/preview/projects/e-commerce','/preview/cases/goods-delivery'].includes(route)) {
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({path:path.join(dir,`navigation-${route.split('/').at(-1)}-${width}.png`)});
      if(route === '/preview') {
        await page.locator('#work').screenshot({path:path.join(dir,`navigation-works-${width}.png`)});
      }
      if(route.endsWith('/e-commerce')) await page.locator('[class*="projectDetails"]').screenshot({path:path.join(dir,`navigation-project-details-${width}.png`)});
    }
  }
}
// Follow the actual user journey with client-side navigation.
await page.goto(base + '/preview');
await page.getByRole('navigation', {name:'Основная навигация'}).getByRole('link', {name:'Кейсы',exact:true}).click();
await page.waitForURL('**/preview#cases');
await page.locator('#charging').getByRole('link', {name:'Смотреть кейс',exact:true}).click();
await page.waitForURL('**/preview/cases/ev-charging');
await page.locator('a[class*="projectRow"]').first().click();
await page.waitForURL('**/preview/projects/ev-clients');
await page.getByRole('link', {name:/^Кейс:/}).click();
await page.waitForURL('**/preview/cases/ev-charging');
await page.getByRole('link', {name:'Все кейсы',exact:true}).click();
await page.waitForURL('**/preview#cases');
await page.getByRole('navigation', {name:'Основная навигация'}).getByRole('link', {name:'Работы',exact:true}).click();
await page.waitForURL('**/preview/projects');
await page.locator('a[class*="projectRow"]').first().click();
await page.waitForURL('**/preview/projects/e-commerce');
const zoom = page.getByRole('button',{name:/Увеличить:/}).first();
await zoom.focus(); await page.keyboard.press('Enter');
await page.getByRole('dialog').waitFor({state:'visible'});
await page.keyboard.press('Escape');
if(!await zoom.evaluate(el => el === document.activeElement)) errors.push('Image viewer did not restore focus');
for(const name of ['cognitivy','missing-project']) {
  const response = await page.goto(base + '/preview/projects/' + name);
  if(response.status() !== 404) errors.push(`Hidden/unknown project visible: ${name}`);
}
const nojs = await browser.newPage({javaScriptEnabled:false});
await nojs.goto(base + '/preview/projects');
if(await nojs.locator('a[class*="projectRow"]').count() !== 8) errors.push('No-JS project links missing');
await browser.close();
fs.writeFileSync(path.join(dir,'navigation-checks.json'),JSON.stringify({results,projects,journey:'passed',errors},null,2));
console.log(JSON.stringify({routes:routes.length,widths:4,journey:'passed',errors}));
if(errors.length) process.exitCode=1;
