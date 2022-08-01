$(()=>{
  let canvas=$('canvas');
  let ctx=canvas[0].getContext('2d');
  let selectedKana;
  let kana=['あ','え','か','き','す','せ','た','と','な','ぬ','ふ','ほ','み','む','や','ゆ','ら','り','わ','を'];
  let lastPosition={x:null,y:null};
  let isDrag=false;
  function image(src){
    let img=new Image();
    img.src=src;
    img.onload=()=>{ctx.drawImage(img,0,0,567,567)}
  }
  function random(min,max){return Math.floor(Math.random()*(max-min+1))+min};
  function kanaSelect(){selectedKana=kana[random(0,kana.length-1)]}
  function playAudio(src){
    $('body').append($('<audio>').attr('src',src).attr('autoplay','autoplay'));
  }
  function hiragana(){
    ctx.clearRect(0,0,567,567);
    kanaSelect();
    image('./resource/hiragana_base/'+selectedKana+'.png');
    $('#kana').attr('src','./resource/hiragana_junban/'+selectedKana+'.png');
    $('#kakijun').attr('src','./resource/hiragana_junban/'+selectedKana+'_j.png');
    playAudio('./resource/sound/'+selectedKana+'.mp3');
  }
  function draw(x,y){
    if(!isDrag){return}
    ctx.lineCap='round';
    ctx.lineJoin='round';
    ctx.lineWidth=30;
    ctx.strokeStyle='black';
    if(lastPosition.x===null||lastPosition.y===null){
      ctx.moveTo(x,y);
    }else{
      ctx.moveTo(lastPosition.x,lastPosition.y);
    }
    ctx.lineTo(x,y);
    ctx.stroke();
    lastPosition.x=x;
    lastPosition.y=y;
  }
  function kokugoMarutuke(){
    const imgData=sliceByNumber(ctx.getImageData(0,0,567,567).data,4);
    const gray=imgData.filter(e=>e[0]==159).length;
    const black=imgData.filter(e=>e[3]==255).length;
    if(black>gray){
      playAudio('./resource/sound/正解.mp3');
      image('./resource/まる.png')
    }else{
      playAudio('./resource/sound/不正解.mp3');
      image('./resource/ばつ.png')
    }
  }
  function sliceByNumber(array,number){
    const length=Math.ceil(array.length/number);
    return new Array(length).fill().map((_,i)=>array.slice(i*number,(i+1)*number));
  }
  canvas.on('touchstart',()=>{
    isDrag=true;
    ctx.beginPath();
  });
  canvas.on('touchend',()=>{
    isDrag=false;
    ctx.closePath();
    lastPosition.x=null;
    lastPosition.y=null;
  });
  $('#marutuke').on('touchend',kokugoMarutuke);
  canvas.on('touchmove',(e)=>{
    let rect=$(e.target).offset();
    let x=e.pageX;
    x-=rect.left;
    let y=e.pageY;
    y-=rect.top;
    draw(x,y);
  });
  $('#yarinaosi').on('touchend',()=>{
    ctx.clearRect(0,0,567,567);
    image('./resource/hiragana_base/'+selectedKana+'.png');
  })
  hiragana();
})