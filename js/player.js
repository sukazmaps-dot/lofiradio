/* ---------- пульт ---------- */
const IC={play:'<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>',pause:'<svg viewBox="0 0 24 24"><path d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg>'};
function ui(){
 const T=TR[trk];
 $('play').innerHTML=playing?IC.pause:IC.play;$('play').setAttribute('aria-label',playing?'пауза':'играть');$('play').classList.toggle('on',playing);
 $('tn').textContent=String(trk+1).padStart(2,'0')+' '+T.n;$('ta').textContent=T.a;
 $('deck').classList.toggle('playing',playing);
 [...$('pl').children].forEach((b,i)=>b.classList.toggle('on',i===trk));
}
function setTrk(i){trk=i;au.src=TR[i].f;$('tc').textContent='0:00';if(playing)au.play().catch(()=>{});ui()}
async function toggle(){
 if(!ac)init();
 if(playing){au.pause();await ac.suspend();playing=false}else{await ac.resume();playing=true;au.play().catch(()=>{})}
 ui();
}
TR.forEach((t,i)=>{const b=document.createElement('button');b.className='key';b.textContent=i+1;b.title=t.n+' — '+t.a;b.setAttribute('aria-label',t.n+' — '+t.a);b.onclick=()=>setTrk(i);$('pl').append(b)});
$('play').onclick=toggle;
$('prev').onclick=()=>setTrk((trk+TR.length-1)%TR.length);
$('next').onclick=()=>setTrk((trk+1)%TR.length);
const fold=m=>{const f=$('deck').classList.toggle('min',m);$('tog').textContent=f?'развернуть ▴':'свернуть ▾';$('tog').setAttribute('aria-expanded',!f)};
const flip=()=>fold(!$('deck').classList.contains('min'));
$('tog').onclick=flip;if(innerWidth<720)fold(true);
addEventListener('keydown',e=>{if(e.target!==document.body)return;if(e.code==='Space'){e.preventDefault();toggle()}if(e.key==='h'||e.key==='р')flip()});
preset('rain');ui();requestAnimationFrame(frame);
