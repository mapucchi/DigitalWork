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
function random(min,max){return Math.floor(Math.random()*(max-min+1))+min};
$(()=>{
  let canvas=$('canvas');
  let ctx=canvas[0].getContext('2d');
  let subject,selectedKana;
  let kana=['あ','え','か','き','す','せ','た','と','な','ぬ','ふ','ほ','み','む','や','ゆ','ら','り','わ','を'];
  let lastPosition={x:null,y:null};
  let isDrag=false;
  let isSelected=false;
  function image(src){
    let img=new Image();
    img.src=src;
    img.onload=()=>{ctx.drawImage(img,0,0,567,567)}
  }
  function kanaSelect(){selectedKana=kana[random(0,kana.length-1)]}
  function hiragana(){
    ctx.clearRect(0,0,567,567);
    kanaSelect();
    image('./resource/hiragana_base/'+selectedKana+'.png');
    $('#kana').attr('src','./resource/hiragana_junban/'+selectedKana+'.png');
    $('#kakijun').attr('src','./resource/hiragana_junban/'+selectedKana+'_j.png');
    playAudio('./resource/sound/'+selectedKana+'.mp3');
  }
  function katakana(){
    ctx.clearRect(0,0,567,567);
    kanaSelect();
    image('./resource/katakana_base/'+selectedKana+'.png');
    $('#kana').attr('src','./resource/katakana_junban/'+selectedKana+'.png');
    $('#kakijun').attr('src','./resource/katakana_junban/'+selectedKana+'_j.png');
    playAudio('./resource/sound/'+selectedKana+'.mp3');
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
  function tasizan(){
    let siki=[random(0,9),'+',random(0,9)]
    $('#siki').text(siki[0]+siki[1]+siki[2]+'は？');
    $('#mathAnswer').text('')
    $('#marutuke').on('mouseup',()=>{
      if($('#mathAnswer').text()*1===siki[0]+siki[2]){
        $('#mathPanel').html('<h1>せいかい</h1>');
        playAudio('resource/sound/正解.mp3');
      }else{
        $('#mathPanel').html('<h1>ふせいかい</h1>');
        playAudio('resource/sound/不正解.mp3');
      }
    });
  }
  function hikizan(){
    let siki=[random(1,9),'-'];
    siki.push(random(0,siki[0]));
    $('#siki').text(siki[0]+siki[1]+siki[2]+'は？');
    $('#mathAnswer').text('')
    $('#marutuke').on('mouseup',()=>{
      if($('#mathAnswer').text()*1===siki[0]-siki[2]){
        $('#mathPanel').html('<h1>せいかい</h1>');
        playAudio('resource/正解.mp3');
      }else{
        $('#mathPanel').html('<h1>ふせいかい</h1>');
        playAudio('resource/不正解.mp3');
      }
    });
  }
  $('#1').on('mouseup',Push(1));
  $('#2').on('mouseup',Push(2));
  $('#3').on('mouseup',Push(3));
  $('#4').on('mouseup',Push(4));
  $('#5').on('mouseup',Push(5));
  $('#6').on('mouseup',Push(6));
  $('#7').on('mouseup',Push(7));
  $('#8').on('mouseup',Push(8));
  $('#9').on('mouseup',Push(9));
  $('#0').on('mouseup',Push(0));
  $('#delete').on('mouseup',Push('delete'));
  $('#1th,#question,#1thJapanese,#1thMath').hide();
  $('#1thButton').on('mouseup',()=>{
    $('#1th').show();
    $('#start').hide();
  });
  $('#japanese').on('mouseup',()=>{
    subject='Japanese';
    $('#1th').hide();
    $('#1thJapanese').show();
  });
  $('#math').on('mouseup',()=>{
    subject='Math';
    $('#1th').hide();
    $('#1thMath').show();
  });
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
  $('#hiragana,#katakana,#tasizan,#hikizan').on('mouseup',()=>{
    $('#1thJapanese,#1thMath').hide();
    $('#question').show();
    if(subject==='Japanese'){
      if(!isSelected){
        isSelected=true;
        $('#mathPanel').hide();
        canvas.on('mousedown',drawStart);
        canvas.on('mouseup',drawEnd);
        $('#marutuke').on('mouseup',kokugoMarutuke);
        $('#modoru').on('mouseup',()=>{
          $('#question').hide();
          $('#1thJapanese').show();
        });
        canvas.on('mousemove',(e)=>{
          e.preventdefault();
          let rect=$(e.target).offset();
          let x=e.pagex||e.originalevent.changedtouches[0].pagex;
          x-=rect.left;
          let y=e.pagey||e.originalevent.changedtouches[0].pagey;
          y-=rect.top;
          draw(x,y);
        });
      }
    }else{
      if(!isSelected){
        isSelected=true;
        $('#modoru').on('mouseup',()=>{
          $('#question').hide();
          $('#1thMath').show();
        });
        canvas.on('mousedown',drawStart);
        canvas.on('mouseup',drawEnd);
        $('#marutuke').on('mouseup',kokugoMarutuke);
        canvas.on('mousemove',(e)=>{
          e.preventDefault();
          let rect=$(e.target).offset();
          let x=e.pageX||e.originalEvent.changedTouches[0].pageX;
          x-=rect.left;
          let y=e.pageY||e.originalEvent.changedTouches[0].pageY;
          y-=rect.top;
          draw(x,y);
        });
        $('#yarinaosi').on('mouseup',()=>{
          ctx.clearRect(0,0,567,567);
        });
      }
    }
    $('#hazimekara').on('mouseup',()=>{
      $('#question').hide();
      $('#start').show();
    });
  });
  $('#tasizan').on('mouseup',()=>{
    tasizan();
    $('#next').off();
    $('#next').on('mouseup',tasizan);
  });
  $('#hikizan').on('mouseup',()=>{
    hikizan();
    $('#next').off();
    $('#next').on('mouseup',hikizan);
  });
  $('#hiragana').on('mouseup',()=>{
    hiragana();
    $('#next').off();
    $('#next').on('mouseup',hiragana);
  });
  $('#katakana').on('mouseup',()=>{
    katakana();
    $('#next').off();
    $('#next').on('mouseup',katakana);
  })
});