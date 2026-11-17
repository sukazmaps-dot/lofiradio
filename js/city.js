/* ---------- ночной город ---------- */
const WIN=[];
(function(){
 const c=$('city'),g=c.getContext('2d');c.width=W;c.height=H;
 let s=11;const R=()=>(s=s*16807%2147483647)/2147483647;
 const sk=g.createLinearGradient(0,60,0,700);sk.addColorStop(0,'#061b33');sk.addColorStop(.6,'#0b3a5a');sk.addColorStop(1,'#12506e');
 g.fillStyle=sk;g.fillRect(0,0,W,H);
 for(let i=0;i<150;i++){g.fillStyle='rgba(190,220,255,'+(.2+R()*.5)+')';g.fillRect(250+R()*1160,80+R()*330,1.6,1.6)}
 const mg=g.createRadialGradient(472,157,10,472,157,120);mg.addColorStop(0,'rgba(170,215,255,.5)');mg.addColorStop(1,'rgba(170,215,255,0)');
 g.fillStyle=mg;g.fillRect(340,30,260,260);
 g.fillStyle='#d4ebff';g.beginPath();g.arc(472,157,22,0,7);g.fill();
 g.fillStyle='rgba(120,160,200,.45)';[[465,150,5],[481,165,4],[474,173,3]].forEach(([x,y,r])=>{g.beginPath();g.arc(x,y,r,0,7);g.fill()});
 [['#0d3556',110,230,.2,.4],['#0a2a47',150,320,.28,.6],['#071d33',190,400,.36,.85]].forEach(([col,h0,h1,d,al],li)=>{
  for(let x=215;x<1430;){
   const w=55+R()*70,h=h0+R()*(h1-h0),y=700-h;
   g.fillStyle=col;g.fillRect(x,y,w,h+10);
   for(let wy=y+10;wy<690;wy+=15)for(let wx=x+7;wx<x+w-8;wx+=12){const on=R()<d;
    if(on){g.globalAlpha=al*(.6+R()*.4);g.fillStyle=R()<.78?'#ff9b55':'#6fd0ff';g.fillRect(wx,wy,6,8)}
    if(li==2&&wy<540)WIN.push({x:wx,y:wy,col,on,al})}
   g.globalAlpha=1;x+=w+R()*14-4}
 });
 g.fillStyle='#06192c';g.fillRect(245,592,1170,108);
 for(let i=0;i<300;i++){g.globalAlpha=.3+R()*.6;g.fillStyle=R()<.8?'#ff9b55':'#6fd0ff';g.fillRect(250+R()*1160,598+R()*92,4+R()*5,3+R()*3)}
 const bc=$('bloom');bc.width=W;bc.height=H;bc.getContext('2d').drawImage(c,0,0);
})();
const cctx=$('city').getContext('2d'),bctx=$('bloom').getContext('2d');let nextWin=0;
function flickerWin(now){
 if(now<nextWin)return;nextWin=now+rand(500,1800);
 const q=WIN[Math.floor(Math.random()*WIN.length)];q.on=!q.on;
 for(const x of [cctx,bctx]){x.globalAlpha=1;x.fillStyle=q.col;x.fillRect(q.x,q.y,6,8);if(q.on){x.globalAlpha=q.al*.85;x.fillStyle=Math.random()<.78?'#ff9b55':'#6fd0ff';x.fillRect(q.x,q.y,6,8)}x.globalAlpha=1}
}
