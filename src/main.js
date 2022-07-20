function Push(n){
  return ()=>{
    let number = $('#mathAnswer').text()*10;
    if(typeof n === 'number'){
      number+=n;
    }else{
      number=Math.floor(number/100)
    }
    $('#mathAnswer').text(number);
  }
}
function playAudio(src){
  const music=new Audio(src);
  music.play();
}
function sliceByNumber(array,number){
  const length=Math.ceil(array.length/number);
  return new Array(length).fill().map((_,i)=>array.slice(i*number,(i+1)*number));
}
function tasizan(){
  let siki=[random(1,9),'+',random(0,9)]
  $('#siki').text(siki[0]+siki[1]+siki[2]+'は？');
  $('#mathAnswer').text('')
  $('#marutuke').on('touchend',()=>{
    if($('#mathAnswer').text()*1===siki[0]+siki[2]){
      $('#mathPanel').html('<h1>せいかい</h1>');
      playAudio('resource/正解.mp3');
    }else{
      $('#mathPanel').html('<h1>ふせいかい</h1>');
      playAudio('resource/不正解.mp3');
    }
  });
}
function hikizan(){
  let siki=[random(1,9),'-'];
  siki.push(random(0,siki[0]));
  $('#siki').text(siki[0]+siki[1]+siki[2]+'は？');
  $('#mathAnswer').text('')
  $('#marutuke').on('touchend',()=>{
    if($('#mathAnswer').text()*1===siki[0]-siki[2]){
      $('#mathPanel').html('<h1>せいかい</h1>');
      playAudio('resource/正解.mp3');
    }else{
      $('#mathPanel').html('<h1>ふせいかい</h1>');
      playAudio('resource/不正解.mp3');
    }
  });
}
function random(min,max){return Math.floor(Math.random()*(max-min+1))+min};
$(()=>{
  let canvas=$('canvas');
  let ctx=canvas[0].getContext('2d');
  let subject,selectedKana;
  let kana=['あ','い','う','え','お','か','き','く','け','こ','さ','し','す','せ','そ','た','ち','つ','て','と','な','に',',ぬ','ね','の','は','ひ','ふ','へ','ほ','ま','み','む','め','も','や','ゆ','よ','ら','り','る','れ','ろ','わ','を','ん'];
  let lastPosition={x:null,y:null};
  let isDrag=false;
  function image(src){
    let img=new Image();
    img.src=src;
    img.onload=()=>{ctx.drawImage(img,0,0,567,567)}
  }
  function kanaSelect(){selectedKana=kana[random(0,kana.length-1)]}
  function hiragana(){
    ctx.clearRect(0,0,567,567);
    kanaSelect();
    image('./resource/'+selectedKana+'.png');
    playAudio('./resource/'+selectedKana+'.mp3')
  }
  function draw(x,y){
    if(!isDrag) {
      return;
    }
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
  function drawStart(){
    isDrag=true;
    ctx.beginPath();
  }
  function drawEnd(){
    isDrag=false;
    ctx.closePath();
    lastPosition.x=null;
    lastPosition.y=null;
  }
  $('#1th,#question,#1thJapanese,#1thMath').hide();
  $('#1thButton').on('touchend',()=>{
    $('#1th').show();
    $('#start').hide();
  });
  $('#japanese').on('touchend',()=>{
    subject='Japanese';
    $('#1th').hide();
    $('#1thJapanese').show();
  });
  $('#math').on('touchend',()=>{
    subject='Math';
    $('#1th').hide();
    $('#1thMath').show();
  });
  function kokugoMarutuke(){
    const imgData=sliceByNumber(ctx.getImageData(0,0,567,567).data,4);
    const gray=imgData.filter(e=>e[0]===159).length;
    const black=imgData.filter(e=>e[0]===0).length;
    alert(gray);
    alert(black);
    /*if(black/3<gray){
      playAudio('./resource/正解.mp3');
      image('./resource/まる.png')
    }else{
      playAudio('./resource/不正解.mp3');
      image('./resource/ばつ.png')
    }*/
  }
  $('#hiragana,#katakana,#kanzi,#tasizan,#hikizan').on('touchend click',()=>{
    $('#1thJapanese,#1thMath').hide();
    $('#question').show();
    if(subject==='Japanese'){
      $('#mathPanel').hide();
      canvas.on('touchstart',drawStart);
      canvas.on('touchend',drawEnd);
      $('#marutuke').on('touchend',kokugoMarutuke);
      $('#next').on('touchend',hiragana);
      $('#modoru').on('touchend',()=>{
        $('#question').hide();
        $('#1thJapanese').show();
      });
      canvas.on('touchmove',(e)=>{
        e.preventDefault();
        let rect=$(e.target).offset();
        let x=e.pageX||e.originalEvent.changedTouches[0].pageX;
        x-=rect.left;
        let y=e.pageY||e.originalEvent.changedTouches[0].pageY;
        y-=rect.top;
        draw(x,y);
      });
    }else{
      $('#japanesePanel').hide();  
      $('#1').on('touchend',Push(1));
      $('#2').on('touchend',Push(2));
      $('#3').on('touchend',Push(3));
      $('#4').on('touchend',Push(4));
      $('#5').on('touchend',Push(5));
      $('#6').on('touchend',Push(6));
      $('#7').on('touchend',Push(7));
      $('#8').on('touchend',Push(8));
      $('#9').on('touchend',Push(9));
      $('#0').on('touchend',Push(0));
      $('#delete').on('touchend',Push('delete'));
      $('#modoru').on('touchend',()=>{
        $('#question').hide();
        $('#1thMath').show();
      });
    }
    $('#hazimekara').on('touchend',()=>{
      $('#question').hide();
      $('#start').show();
    });
  });
  $('#tasizan').on('touchend',()=>{
    tasizan();
    $('#next').on('touchend',tasizan);
  });
  $('#hikizan').on('touchend',()=>{
    hikizan();
    $('#next').on('touchend',hikizan);
  });
  $('#hiragana').on('touchend',hiragana);
});