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
function sliceArrayByNumber(array,number){
  const length=Math.ceil(array.length/number);
  return new Array(length).fill().map((_, i)=>array.slice(i*number,(i+1)*number));
}
function playAudio(src){
  const music=new Audio(src);
  music.play();
}
function mathInit(){
  $('#1').on('touchend click',Push(1));
  $('#2').on('touchend click',Push(2));
  $('#3').on('touchend click',Push(3));
  $('#4').on('touchend click',Push(4));
  $('#5').on('touchend click',Push(5));
  $('#6').on('touchend click',Push(6));
  $('#7').on('touchend click',Push(7));
  $('#8').on('touchend click',Push(8));
  $('#9').on('touchend click',Push(9));
  $('#0').on('touchend click',Push(0));
  $('#delete').on('touchend click',Push('delete'));
}
function tasizan(){
  let siki=[random(1,9),'+',random(0,9)]
  $('#siki').text(siki[0]+siki[1]+siki[2]+'は？');
  $('#mathAnswer').text('')
  $('#marutuke').on('touchend click',()=>{
    if($('#mathAnswer').text()*1===siki[0]+siki[2]){
      $('#mathPanel').text('せいかい')
    }else{
      $('#mathPanel').text('ふせいかい')
    }
  })
  $('#next').on('touchend click',tasizan);
}
function hikizan(){
  let siki=[random(1,9),'-'];
  siki.push(random(0,siki[0]));
  $('#siki').text(siki[0]+siki[1]+siki[2]+'は？');
  $('#mathAnswer').text('')
  $('#marutuke').on('touchend click',()=>{
    if($('#mathAnswer').text()*1===siki[0]-siki[2]){
      $('#mathPanel').text('せいかい')
    }else{
      $('#mathPanel').text('ふせいかい')
    }
  })
  $('#next').on('touchend click',hikizan);
}
function random(min,max){return Math.floor(Math.random()*(max-min+1))+min};
$(()=>{
  let canvas=$('canvas');
  let ctx=canvas[0].getContext('2d');
  let subject,selectedKana;
  let kana=['あ','い','う','え','お','か','き','く','け','こ','さ','し','す','せ','そ'];
  let lastPosition={x:null,y:null};
  let isDrag=false;
  function image(src){
    let img=new Image();
    img.src=src;
    img.onload=()=>{ctx.drawImage(img,0,0)}
  }
  function kanaSelect(){selectedKana=kana[random(0,kana.length-1)]}
  function hiragana(){
    ctx.clearRect(0,0,567,567);
    kanaSelect();
    image('./resource/'+selectedKana+'.png');
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
  $('#1thButton').on('touchend click',()=>{
    $('#1th').show();
    $('#start').hide();
  });
  $('#japanese').on('touchend click',()=>{
    subject='Japanese';
    $('#1th').hide();
    $('#1thJapanese').show();
  });
  $('#math').on('touchend click',()=>{
    subject='Math';
    $('#1th').hide();
    $('#1thMath').show();
  });
  function kokugoMarutuke(){
    /*const imageData=sliceArrayByNumber(ctx.getImageData(0,0,567,567).data,4);
    let Gray=imageData.filter(e=>e[0]===159).length;
    let Black=568**2-imageData.filter(e=>e[1]===0).length;
    console.log(Gray);
    console.log(Black);*/
    if(random(1,10)>2){
      playAudio('resource/seikai.mp3');
      ctx.beginPath();
      ctx.lineWidth=30;
      ctx.arc(284,284,150,0,Math.PI*2,false);
      ctx.strokeStyle="#ff0000";
      ctx.stroke();
      ctx.closePath();
    }else{
      playAudio('resource/batu.mp3');
      ctx.beginPath();
      ctx.strokeStyle="#ff0000";
      ctx.lineWidth=30;
      ctx.moveTo(134,134);
      ctx.lineTo(433,433);
      ctx.stroke();
      ctx.closePath();
      ctx.beginPath();
      ctx.strokeStyle="#ff0000";
      ctx.lineWidth=30;
      ctx.moveTo(134,433);
      ctx.lineTo(433,134);
      ctx.stroke();
      ctx.closePath();
    }
    
  }
  $('#hiragana,#katakana,#kanzi,#tasizan,#hikizan').on('touchend click',()=>{
    $('#1thJapanese,#1thMath').hide();
    $('#question').show();
    if(subject==='Japanese'){
      $('#mathPanel').hide();
      canvas.on('touchstart mousedown',drawStart);
      canvas.on('touchend mouseup',drawEnd);
      canvas.on('touchmove mousemove',(e)=>{
        e.preventDefault();
        let rect=$(e.target).offset();
        let x=e.pageX||e.originalEvent.changedTouches[0].pageX;
        x-=rect.left;
        let y=e.pageY||e.originalEvent.changedTouches[0].pageY
        y-=rect.top;
        draw(x,y);
      });
      $('#marutuke').on('touchend click',kokugoMarutuke);
      $('#next').on('touchend click',hiragana);
    }else{
      $('#japanesePanel').hide();  
      $('#1').on('touchend click',Push(1));
      $('#2').on('touchend click',Push(2));
      $('#3').on('touchend click',Push(3));
      $('#4').on('touchend click',Push(4));
      $('#5').on('touchend click',Push(5));
      $('#6').on('touchend click',Push(6));
      $('#7').on('touchend click',Push(7));
      $('#8').on('touchend click',Push(8));
      $('#9').on('touchend click',Push(9));
      $('#0').on('touchend click',Push(0));
      $('#delete').on('touchend click',Push('delete'));
    }
  });
  $('#tasizan').on('touchend click',tasizan);
  $('#hikizan').on('touchend click',hikizan);
  $('#hiragana').on('touchend click',hiragana);
});