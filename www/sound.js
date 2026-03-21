// -----------------------------
// Sound
// -----------------------------

let audioCtx=null;
let clickBuffer=null;

function initAudio(){
 if(audioCtx) return;

 try{
  audioCtx=new(window.AudioContext||window.webkitAudioContext)();

  const length=audioCtx.sampleRate*0.02;
  clickBuffer=audioCtx.createBuffer(1,length,audioCtx.sampleRate);

  const data=clickBuffer.getChannelData(0);
  for(let i=0;i<length;i++){
   data[i]=(Math.random()*2-1)*(1-i/length);
  }

 }catch(e){audioCtx=null}
}

function playClick(){
 if(!audioCtx||!clickBuffer) return;

 const source=audioCtx.createBufferSource();
 const gain=audioCtx.createGain();

 source.buffer=clickBuffer;
 gain.gain.value=0.12+Math.random()*0.05;
 source.playbackRate.value=0.95+Math.random()*0.1;

 source.connect(gain);
 gain.connect(audioCtx.destination);

 source.start();
}
