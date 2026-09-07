import sharp from 'sharp';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const dir=path.dirname(fileURLToPath(import.meta.url));
const names=['А. Маршрут сервиса','Б. Открытая система','В. Крупный план'];
const layers=[];
for(let i=0;i<3;i++){
  const key=['a','b','c'][i],x=20+i*500;
  layers.push({input:Buffer.from(`<svg width="480" height="70"><text x="0" y="27" font-family="Segoe UI" font-size="25" font-weight="600" fill="#202925">${names[i]}</text><text x="0" y="53" font-family="Segoe UI" font-size="14" fill="#42574b">${i===0?'Рекомендую':'Альтернативное направление'}</text></svg>`),left:x,top:12});
  layers.push({input:await sharp(path.join(dir,`desktop-${key}.png`)).resize({width:480}).png().toBuffer(),left:x,top:90});
  layers.push({input:await sharp(path.join(dir,`mobile-${key}.png`)).resize({width:195}).png().toBuffer(),left:x+142,top:452});
}
await sharp({create:{width:1520,height:900,channels:3,background:'#f5f6f5'}}).composite(layers).png().toFile(path.join(dir,'comparison.png'));
