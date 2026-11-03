const { chromium } = require('playwright');
const C={blue:'#0c78f6',purple:'#a65ab4',pink:'#f44296',orange:'#f67011',yellow:'#ffda1b'};
function rng(s){return()=>{s=(s*16807)%2147483647;return s/2147483647}}
function blob(cx,cy,r,seed,n=7,j=0.22){const R=rng(seed);const pts=[];for(let i=0;i<n;i++){const a=i/n*Math.PI*2;const rr=r*(1-j+2*j*R());pts.push([cx+rr*Math.cos(a),cy+rr*Math.sin(a)])}
 let d='';for(let i=0;i<n;i++){const p0=pts[(i-1+n)%n],p1=pts[i],p2=pts[(i+1)%n],p3=pts[(i+2)%n];
 if(i===0)d+=`M${p1[0]},${p1[1]}`;const c1=[p1[0]+(p2[0]-p0[0])/6,p1[1]+(p2[1]-p0[1])/6],c2=[p2[0]-(p3[0]-p1[0])/6,p2[1]-(p3[1]-p1[1])/6];d+=`C${c1},${c2},${p2}`}return d+'Z'}
// logo cluster centered at (x,y) scale s
function cluster(x,y,s,blend){const b=[[C.yellow,-0.55,-0.2,0.62,3],[C.blue,-0.25,-0.55,0.55,11],[C.pink,0.25,-0.1,0.6,7],[C.purple,-0.65,0.35,0.42,19],[C.orange,0.15,0.45,0.5,23]];
 return b.map(([c,dx,dy,r,sd])=>`<path d="${blob(x+dx*s,y+dy*s,r*s,sd)}" fill="${c}" opacity="${blend==='multiply'?0.88:0.9}"/>`).join('')}
const font=`font-family:Inter,'Inter Display',sans-serif`;
function page(v){
 let bg,body;
 if(v==='light'){bg='#fbf8f3';body=`
  <svg width="1920" height="1080" style="position:absolute;inset:0">
   <defs><filter id="f" filterUnits="userSpaceOnUse" x="-600" y="-600" width="3120" height="2280"><feGaussianBlur stdDeviation="90"/></filter></defs>
   <g filter="url(#f)" opacity="0.35">${cluster(1950,1120,520,'normal')}</g>
   <g filter="url(#f)" opacity="0.18"><path d="${blob(-60,-40,380,5)}" fill="${C.blue}"/></g>
   ${cluster(1585,300,150,'multiply')}
  </svg>
  <div style="position:absolute;right:120px;top:500px;text-align:right;${font}">
   <div style="font-family:'Inter Display';font-weight:800;font-size:64px;letter-spacing:-1px;color:#1b1b22;line-height:1">THE SWEET SPOT</div>
   <div style="font-weight:500;font-size:26px;color:#5b6478;margin-top:22px">AI &amp; Vibecoding · Courses &amp; Workshops</div>
   <div style="font-weight:600;font-size:25px;color:#1b1b22;margin-top:26px">Lior Alperovich</div>
  </div>`;}
 if(v==='dark'){bg='#12131c';body=`
  <svg width="1920" height="1080" style="position:absolute;inset:0">
   <defs><filter id="f" filterUnits="userSpaceOnUse" x="-600" y="-600" width="3120" height="2280"><feGaussianBlur stdDeviation="110"/></filter></defs>
   <g filter="url(#f)" opacity="0.45">${cluster(1800,1000,480,'screen')}</g>
   <g filter="url(#f)" opacity="0.22"><path d="${blob(80,60,360,5)}" fill="${C.purple}"/></g>
   ${cluster(1585,300,150,'screen')}
  </svg>
  <div style="position:absolute;right:120px;top:500px;text-align:right;${font}">
   <div style="font-family:'Inter Display';font-weight:800;font-size:64px;letter-spacing:-1px;color:#fff;line-height:1">THE SWEET SPOT</div>
   <div style="font-weight:500;font-size:26px;color:#b9bdd0;margin-top:22px">AI &amp; Vibecoding · Courses &amp; Workshops</div>
   <div style="font-weight:600;font-size:25px;color:#fff;margin-top:26px">Lior Alperovich</div>
  </div>`;}
 if(v==='minimal'){bg='#f5f2ec';body=`
  <svg width="1920" height="1080" style="position:absolute;inset:0">
   <defs><filter id="f" filterUnits="userSpaceOnUse" x="-600" y="-600" width="3120" height="2280"><feGaussianBlur stdDeviation="120"/></filter></defs>
   <g filter="url(#f)" opacity="0.55">
    <path d="${blob(-40,1100,420,3)}" fill="${C.yellow}"/><path d="${blob(260,1180,360,7)}" fill="${C.pink}"/>
    <path d="${blob(1980,-60,420,11)}" fill="${C.blue}"/><path d="${blob(1700,-140,320,19)}" fill="${C.purple}"/>
    <path d="${blob(2000,1150,300,23)}" fill="${C.orange}"/></g>
   ${cluster(150,145,62,'multiply')}
  </svg>
  <div style="position:absolute;left:240px;top:118px;${font}">
   <div style="font-family:'Inter Display';font-weight:800;font-size:44px;letter-spacing:-0.5px;color:#1b1b22;line-height:1">THE SWEET SPOT</div>
   <div style="font-weight:500;font-size:22px;color:#5b6478;margin-top:10px">AI &amp; Vibecoding · Lior Alperovich</div>
  </div>`;}
 return `<html><body style="margin:0;width:1920px;height:1080px;overflow:hidden;background:${bg};position:relative">${body}</body></html>`}
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1920,height:1080},deviceScaleFactor:1});
for(const v of ['light','dark','minimal']){await p.setContent(page(v));await p.waitForTimeout(200);await p.screenshot({path:`meet-background-${v}.png`})}
await b.close()})();
