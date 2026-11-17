const {chromium}=require('playwright');
const head=`<div style="width:100%;margin:0;-webkit-print-color-adjust:exact;print-color-adjust:exact;position:absolute;top:0;left:0;right:0;height:8px;background:linear-gradient(90deg,#ffda1b,#f67011,#f44296,#a65ab4,#0c78f6)"></div>`;
const foot=`<div dir="rtl" style="-webkit-print-color-adjust:exact;print-color-adjust:exact;position:absolute;bottom:0;left:0;right:0;background:#1f2433;color:#fff;padding:10px 16mm;display:flex;justify-content:space-between;align-items:center;font-family:Heebo,Arial,sans-serif;font-size:10px;line-height:1.5">
<div><b style="font-size:12px">ליאור אלפרוביץ · The Sweet Spot</b><br>054-4828438 · liorlp@gmail.com · <a href="https://www.linkedin.com/company/the-sweet-spot-in-a-product/posts/" style="color:#fff">LinkedIn</a></div>
<div style="color:#c4c9d6;font-size:9px;text-align:left">עוסק מורשה 043054451 · המחירים אינם כוללים מע"מ (18%)<br>תשלום שוטף + 30 כנגד חשבונית מס · בתוקף 30 יום מ-17.11.2026</div></div>`;
(async()=>{const b=await chromium.launch();const p=await b.newPage();await p.goto('file://'+process.argv[2]);await p.waitForTimeout(1500);
await p.pdf({path:process.argv[3],format:'A4',printBackground:true,preferCSSPageSize:true,displayHeaderFooter:true,headerTemplate:head,footerTemplate:foot});await b.close();})();
