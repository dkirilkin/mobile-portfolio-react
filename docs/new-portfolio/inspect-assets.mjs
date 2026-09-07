import fs from 'node:fs';
import path from 'node:path';
import cp from 'node:child_process';
import sharp from 'sharp';
import {fileURLToPath} from 'node:url';
const __dirname=path.dirname(fileURLToPath(import.meta.url));
const dir = __dirname;
const esc = s => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;');
(async () => {
  const paths = cp.execFileSync('git', ['-c','core.quotepath=false','ls-tree', '-r', '--name-only', 'main', 'public/projects', 'public/images'], {encoding:'utf8'}).trim().split('\n').filter(p => /\.(jpg|webp|png)$/.test(p));
  const inventory = [];
  for (let start=0; start<paths.length; start+=16) {
    const batch=paths.slice(start,start+16), layers=[];
    for (let i=0;i<batch.length;i++) {
      const file=batch[i], m=await sharp(file).metadata();
      inventory.push({file,width:m.width,height:m.height,bytes:fs.statSync(file).size});
      const x=(i%8)*190,y=Math.floor(i/8)*420;
      layers.push({input:await sharp(file).resize(174,365,{fit:'inside'}).toBuffer(),left:x+8,top:y+5});
      const bits=file.replace('public/','').split('/');
      layers.push({input:Buffer.from(`<svg width="190" height="48"><rect width="190" height="48" fill="white"/><text x="5" y="16" font-family="Segoe UI" font-size="10">${esc(bits.at(-2))}</text><text x="5" y="33" font-family="Segoe UI" font-size="10">${esc(bits.at(-1))} ${m.width}×${m.height}</text></svg>`),left:x,top:y+370});
    }
    await sharp({create:{width:1520,height:Math.ceil(batch.length/8)*420,channels:3,background:'#e7e8eb'}}).composite(layers).png().toFile(path.join(dir,`assets-${start/16+1}.png`));
  }
  fs.writeFileSync(path.join(dir,'asset-inventory.json'),JSON.stringify(inventory,null,2));
  console.log(`${inventory.length} images inventoried; ${Math.ceil(paths.length/16)} contact sheets`);
})();
