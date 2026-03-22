// -----------------------------
// About / Debug Screen
// -----------------------------

let APP_VERSION="1.0.0"; //default
const APP_NAME="Tiptacular";

let aboutTapTimes=[];
let debugMode=false;

async function openAbout(){
 if(window.Capacitor) {
   const info = await App.getInfo();
   APP_VERSION = info.version;
 }
 const modal=document.createElement('div');
 modal.id='aboutModal';
 modal.style.position='fixed';
 modal.style.inset='0';
 modal.style.zIndex='10000';
 modal.style.background='rgba(0,0,0,.55)';
 modal.style.display='flex';
 modal.style.alignItems='center';
 modal.style.justifyContent='center';

 debugMode=false;
 aboutTapTimes=[];

 modal.innerHTML=`
 <div id="aboutContent" style="background:var(--card);color:var(--text);padding:20px;border-radius:16px;width:90%;max-width:520px;max-height:80vh;box-shadow:var(--shadow);display:flex;flex-direction:column">
 <div style="display:flex;align-items:center;gap:10px;font-size:20px;font-weight:700;margin-bottom:10px">
 <img src="assets/icon/icon.png" style="width:28px;height:28px;border-radius:6px"> ${APP_NAME}
 </div>
 <div style="font-size:14px;margin-bottom:8px">Version ${APP_VERSION}</div>
 <div style="font-size:12px;margin-bottom:14px">© ${new Date().getFullYear()} GizSoft</div>
 <div id="tosBlock" style="font-size:13px;line-height:1.4;color:var(--muted);overflow:auto;max-height:40vh">
 TIP CALCULATOR SOFTWARE LICENSE AGREEMENT

Copyright (c) 2026 GizSoft. All rights reserved.

Permission is granted to use this software for personal use. Redistribution, modification, or commercial resale of the software without written permission from the copyright holder is prohibited.

This application is provided \"AS IS\" without warranty of any kind, express or implied.

In no event shall the authors or copyright holders be liable for any claim or damages arising from use of this software.

The receipt scanning feature uses experimental computer vision algorithms executed locally on the device. Accuracy may vary depending on lighting conditions and camera stability.
 </div>
 <div id="debugBlock" style="display:none;margin-top:10px;flex:1;min-height:0"></div>
 <div style="margin-top:16px;text-align:right">
 <button onclick="closeAbout()" style="padding:.4rem .8rem;border:none;border-radius:8px;background:var(--button)">Close</button>
 </div>
 </div>`;

 document.body.appendChild(modal);

 const content=document.getElementById('aboutContent');
 content.addEventListener('click',handleAboutTap);
}



function closeAbout(){
 const m=document.getElementById('aboutModal');
 if(m) m.remove();
}

function handleAboutTap(){
 const now=Date.now();
 aboutTapTimes.push(now);
 aboutTapTimes=aboutTapTimes.filter(t=>now-t<5000);

 if(aboutTapTimes.length>=5){
  debugMode=true;
  logScan("display_debug_logs");
  showDebugLogs();
 }
}

function toggleCvDebug(){
    cvDebugEnabled=!cvDebugEnabled;
    console.log("tottleCvDebug" + cvDebugEnabled);
    const btn=document.getElementById("toggleCvDebugBtn");

    if(btn){
        btn.classList.toggle('active',cvDebugEnabled);
        btn.innerText=cvDebugEnabled ? "Disable CV Overlay" : "Enable CV Overlay";
    }

}

function showDebugLogs(){

 const tos=document.getElementById('tosBlock');
 const dbg=document.getElementById('debugBlock');
 if(!dbg||!tos) return;

 tos.style.display='none';
 dbg.style.display='block';

 dbg.innerHTML=`
 <div style="display:flex;gap:8px;margin-bottom:8px">
  <button id="emailLogsBtn" style="padding:.3rem .6rem;border:none;border-radius:6px;background:var(--button)">
   Email Logs
  </button>
  <button id="toggleCvDebugBtn"
   style="padding:.3rem .6rem;border:none;border-radius:6px;background:var(--button)">
   Enable CV Overlay
  </button>
 </div>

 <div style="max-height:45vh;overflow:auto;border:1px solid var(--border);border-radius:8px">
  <table id="logTable" style="width:100%;font-size:12px;border-collapse:collapse">
   <thead>
    <tr>
     <th data-col="t">Time</th>
     <th data-col="step">Step</th>
     <th data-col="status">Status</th>
     <th data-col="frame">Frame</th>
    </tr>
   </thead>
   <tbody></tbody>
  </table>
 </div>
 `;

 renderLogTable();

 const btn=document.getElementById("toggleCvDebugBtn");
 if(btn)btn.onclick=toggleCvDebug;

 const emailBtn=document.getElementById('emailLogsBtn');
 if(emailBtn) emailBtn.onclick=emailLogs;

 document.querySelectorAll('#logTable th').forEach(th=>{
  th.style.cursor='pointer';
  th.onclick=()=>sortLogs(th.dataset.col);
 });
}

function renderLogTable(){
 const tbody=document.querySelector('#logTable tbody');
 if(!tbody) return;

 tbody.innerHTML="";

 scannerLogs.forEach(l=>{
  const tr=document.createElement('tr');
  const time=new Date(l.t).toLocaleTimeString();

  tr.innerHTML=`
   <td>${time}</td>
   <td>${l.step||''}</td>
   <td>${l.status||''}</td>
   <td>${l.frame ?? ''}</td>`;

  tbody.appendChild(tr);
 });
}

function emailLogs(){
 try{
  const body=encodeURIComponent(JSON.stringify(scannerLogs,null,2));
  const subject=encodeURIComponent('Tip Calculator Scanner Logs');
  window.location.href=`mailto:?subject=${subject}&body=${body}`;
 }catch(e){console.warn('email logs failed',e)}
}

function sortLogs(col){
 scannerLogs.sort((a,b)=>{
  if(a[col]>b[col]) return 1;
  if(a[col]<b[col]) return -1;
  return 0;
 });
 renderLogTable();
}

// make header clickable
const headerTitle=document.querySelector('.header span');
if(headerTitle) headerTitle.addEventListener('click',openAbout);

// initial render
update();

