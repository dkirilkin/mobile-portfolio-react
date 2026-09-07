const research = window.portfolioResearch;
const viewer = document.querySelector('.image-viewer');
let lastTrigger;
document.addEventListener('click', (event) => {
  const trigger=event.target.closest('[data-zoom]');
  if (!trigger) return;
  lastTrigger=trigger;
  viewer.querySelector('img').src=trigger.dataset.zoom;
  viewer.querySelector('img').alt=trigger.dataset.caption;
  viewer.querySelector('.image-caption').textContent=trigger.dataset.caption;
  viewer.querySelector('a').href=trigger.dataset.zoom;
  viewer.showModal();
});
viewer.querySelector('.close-viewer').addEventListener('click',()=>viewer.close());
viewer.addEventListener('close',()=>lastTrigger?.focus());
function updateFigure(figure,stage) {
  const img=figure.querySelector('img');
  img.src=stage.image;img.alt=stage.alt;
  img.width=stage.image.includes('technicians')?571:810;
  img.height=stage.image.includes('technicians')?1280:1440;
  const button=figure.querySelector('button');
  button.dataset.zoom=stage.image;button.dataset.caption=`${stage.label}. ${stage.type}`;
  button.setAttribute('aria-label',`Увеличить: ${stage.label}`);
  const caption=figure.querySelector('figcaption');
  caption.replaceChildren(document.createTextNode(stage.label));
  const small=document.createElement('small');small.textContent=`${stage.type} · нажмите для деталей`;caption.append(small);
}
document.querySelectorAll('[data-stage]').forEach(button=>button.addEventListener('click',()=>{
  const stage=research.ev.stages[Number(button.dataset.stage)];
  document.querySelectorAll('[data-stage]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
  updateFigure(document.querySelector('.active-stage'),stage);
  document.querySelector('.stage-description').textContent=stage.text;
}));
document.querySelectorAll('[data-role]').forEach(button=>button.addEventListener('click',()=>{
  document.querySelectorAll('[data-role]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
  const stage=research.ev.stages[button.dataset.role==='tech'?1:0];
  updateFigure(document.querySelector('.role-screen'),stage);
  const description=document.querySelector('.role-description');if(description)description.textContent=stage.text;
}));
