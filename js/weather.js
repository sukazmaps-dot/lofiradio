/* ---------- погода и ручки ---------- */
const w={rain:55,wind:25,fog:30},P={clear:[0,8,0,0],drizzle:[22,12,15,0],rain:[55,25,30,0],heavy:[88,50,45,0],storm:[100,80,55,1]};
let bolts=false,ac,nb,rg,wg,rf,playing=false,trk=0,vol=.7,aud=.6;
const au=new Audio(),KS=[];
function apply(){
 root.style.setProperty('--rain',w.rain/100);root.style.setProperty('--fog',w.fog/100);
 $('city').style.filter='blur('+w.fog*.05+'px) brightness('+(1-w.rain*.002-w.fog*.002)+')';
 KS.forEach(k=>k.draw());rainSnd();
}
function setBolt(v){bolts=v;$('bolt').classList.toggle('on',v);$('bolt').setAttribute('aria-pressed',v)}
function preset(k){const p=P[k];w.rain=p[0];w.wind=p[1];w.fog=p[2];setBolt(!!p[3]);apply();document.querySelectorAll('[data-p]').forEach(b=>b.classList.toggle('on',b.dataset.p===k))}
document.querySelectorAll('[data-p]').forEach(b=>b.onclick=()=>preset(b.dataset.p));
$('bolt').onclick=()=>setBolt(!bolts);
[['дождь',()=>w.rain,v=>w.rain=v,1],['ветер',()=>w.wind,v=>w.wind=v,1],['туман',()=>w.fog,v=>w.fog=v,1],['музыка',()=>vol*100,v=>{vol=v/100;au.volume=vol}],['шум',()=>aud*100,v=>aud=v/100]].forEach(([name,get,set,wx])=>{
 const l=document.createElement('label');l.className='fd';
 l.innerHTML='<span>'+name+'</span><input type="range" min="0" max="100" step="1" aria-label="'+name+'"><output></output>';
 const r=l.querySelector('input'),o=l.querySelector('output');
 r.oninput=()=>{set(+r.value);if(wx)document.querySelectorAll('[data-p]').forEach(b=>b.classList.remove('on'));apply()};
 KS.push({draw(){const v=Math.round(get());r.value=v;o.textContent=v;r.style.setProperty('--v',v+'%')}});
 $('faders').append(l);
});
