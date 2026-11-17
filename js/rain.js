/* ---------- дождь на стекле ---------- */
const X=$('rain').getContext('2d');$('rain').width=W;$('rain').height=H;
const S=[],D=[];for(let i=0;i<700;i++)S.push({x:rand(150,1450),y:rand(60,720),z:Math.random()});
let bolt=null,nextB=0,last=performance.now();
function flash(){
 const f=$('flash');f.style.setProperty('--bx',rand(25,75)+'%');f.style.transition='none';f.style.opacity=.8;
 setTimeout(()=>{f.style.transition='opacity .9s ease-out';f.style.opacity=0},90);
 setTimeout(()=>{f.style.transition='none';f.style.opacity=.55;setTimeout(()=>{f.style.transition='opacity 1.2s ease-out';f.style.opacity=0},70)},240);
}
function strike(now){
 let x=rand(350,1300),y=80;const p=[[x,y]],end=rand(380,520);
 while(y<end){x+=rand(-45,45);y+=rand(28,55);p.push([x,y])}
 bolt={p,until:now+170};flash();thunder(rand(.5,2.8));
}
function frame(now){
 const dt=Math.min(.05,(now-last)/1000),k=dt*60;last=now;
 X.clearRect(0,0,W,H);X.save();X.beginPath();X.rect(245,75,1170,625);X.clip();
 const n=Math.round(w.rain*7),sl=w.wind/100*.55;
 for(let i=0;i<n;i++){const s=S[i],v=(500+s.z*900)*dt;s.y+=v;s.x+=v*sl;if(s.y>720){s.y=rand(40,80);s.x=rand(150,1450)-sl*500}if(s.x>1450)s.x-=1300}
 for(let b=0;b<3;b++){
  X.beginPath();X.strokeStyle='rgba(175,220,255,'+(.12+b*.09)+')';X.lineWidth=.7+b*.45;
  for(let i=b;i<n;i+=3){const s=S[i],l=12+s.z*30;X.moveTo(s.x,s.y);X.lineTo(s.x+sl*l,s.y+l)}
  X.stroke();
 }
 if(w.rain>0&&D.length<30+w.rain*1.5&&Math.random()<w.rain/100*.5*k)D.push({x:rand(260,1400),y:rand(90,650),r:rand(1.5,3.2),v:0,y0:0,sl:false,p:0,life:0,max:rand(500,1400)});
 for(let i=D.length-1;i>=0;i--){
  const d=D[i];d.life+=k;
  if(!d.sl){d.r+=.0025*k*(w.rain/100+.1);if(d.r>4.2||(d.r>2.5&&Math.random()<.0007*k)){d.sl=true;d.y0=d.y;d.v=.4+d.r*.15}}
  else if(d.p>0)d.p-=k;
  else{d.y+=d.v*k*1.4;d.x+=Math.sin(d.y*.05)*.1+w.wind/100*.12*k;d.v=Math.min(d.v+.01*k,2.2+d.r*.3);d.r=Math.max(1.2,d.r-.0015*k);if(Math.random()<.008*k){d.p=rand(10,50);d.v=.3}}
  if(d.y>705||(!d.sl&&d.life>d.max)){D.splice(i,1);continue}
  const a=d.sl?1:Math.min(1,(d.max-d.life)/120);X.globalAlpha=a;
  if(d.sl){X.strokeStyle='rgba(190,225,255,.1)';X.lineWidth=d.r*.55;X.beginPath();X.moveTo(d.x,d.y0);X.lineTo(d.x,d.y);X.stroke()}
  X.fillStyle='rgba(150,200,240,.22)';X.strokeStyle='rgba(220,240,255,.45)';X.lineWidth=.8;
  X.beginPath();X.ellipse(d.x,d.y,d.r*.8,d.r*1.1,0,0,7);X.fill();X.stroke();
  X.fillStyle='rgba(255,255,255,.7)';X.beginPath();X.arc(d.x-d.r*.25,d.y-d.r*.3,d.r*.25,0,7);X.fill();
 }
 X.globalAlpha=1;
 if(bolts&&w.rain>25&&now>nextB){strike(now);nextB=now+rand(5000,12000)}
 if(bolt&&now<bolt.until){
  X.strokeStyle='#e6f2ff';X.lineWidth=2.5;X.shadowColor='#9cf';X.shadowBlur=18;X.beginPath();
  bolt.p.forEach((q,i)=>i?X.lineTo(q[0],q[1]):X.moveTo(q[0],q[1]));X.stroke();
 }
 X.globalAlpha=1;flickerWin(now);
 X.restore();requestAnimationFrame(frame);
}
