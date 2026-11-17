/* ---------- звук ---------- */
au.src=TR[0].f;au.preload='metadata';au.volume=vol;au.onended=()=>setTrk((trk+1)%TR.length);
au.ontimeupdate=()=>{const s=au.currentTime|0;$('tc').textContent=(s/60|0)+':'+String(s%60).padStart(2,'0')};
function init(){
 ac=new(window.AudioContext||window.webkitAudioContext)();
 nb=ac.createBuffer(1,ac.sampleRate*3,ac.sampleRate);const d=nb.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;
 const out=ac.createDynamicsCompressor();out.connect(ac.destination);
 rg=ac.createGain();wg=ac.createGain();rf=ac.createBiquadFilter();rf.type='bandpass';rf.Q.value=.4;
 const rs=ac.createBufferSource();rs.buffer=nb;rs.loop=true;rs.connect(rf);rf.connect(rg);rg.connect(out);rs.start();
 const wl=ac.createBiquadFilter();wl.type='lowpass';wl.frequency.value=350;
 const ws=ac.createBufferSource();ws.buffer=nb;ws.loop=true;ws.connect(wl);wl.connect(wg);wg.connect(out);ws.start(0,1);
 rainSnd();
}
function rainSnd(){
 if(!ac)return;const r=w.rain/100,t=ac.currentTime;
 rg.gain.setTargetAtTime(Math.pow(r,1.2)*.5*aud,t,.3);rf.frequency.setTargetAtTime(1200+r*1600,t,.3);
 wg.gain.setTargetAtTime(w.wind/100*.3*aud,t,.4);
}
function thunder(delay){
 if(!ac||playing===false)return;const t=ac.currentTime+delay,s=ac.createBufferSource(),f=ac.createBiquadFilter(),g=ac.createGain();
 s.buffer=nb;s.loop=true;f.type='lowpass';f.frequency.setValueAtTime(420,t);f.frequency.exponentialRampToValueAtTime(60,t+3);
 g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(.2+.7*aud,t+.15);g.gain.exponentialRampToValueAtTime(.001,t+3.5);
 s.connect(f);f.connect(g);g.connect(ac.destination);s.start(t);s.stop(t+4);
}
