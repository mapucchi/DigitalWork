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
function mathInit(){
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
}
function tasizan(){
  let siki=[random(1,9),'+',random(0,9)]
  $('#siki').text(siki[0]+siki[1]+siki[2]+'は？');
  $('#mathAnswer').text('')
  $('#marutuke').on('touchend',()=>{
    if($('#mathAnswer').text()*1===siki[0]+siki[2]){
      $('#mathPanel').text('せいかい')
    }else{
      $('#mathPanel').text('ふせいかい')
    }
  })
  $('#next').on('touchend',tasizan);
}
function hikizan(){
  let siki=[random(1,9),'-'];
  siki.push(random(0,siki[0]));
  $('#siki').text(siki[0]+siki[1]+siki[2]+'は？');
  $('#mathAnswer').text('')
  $('#marutuke').on('touchend',()=>{
    if($('#mathAnswer').text()*1===siki[0]-siki[2]){
      $('#mathPanel').text('せいかい')
    }else{
      $('#mathPanel').text('ふせいかい')
    }
  })
  $('#next').on('touchend',hikizan);
}
function random(min,max){return Math.floor(Math.random()*(max-min+1))+min};
$(()=>{
  let canvas=$('canvas');
  let ctx=canvas[0].getContext('2d');
  let subject,selectedKana;
  let kana=['あ','い','う','え','お','か','き','く','け','こ','さ','し','す','せ','そ'];
  let lastPosition={x:null,y:null};
  function image(src){
    let img=new Image();
    img.src=src;
    img.onload=()=>{ctx.drawImage(img,0,0)}
  }
  function kanaSelect(){selectedKana=kana[random(0,kana.length-1)]}
  function hiragana(){
    kanaSelect();
    image('./resource/'+selectedKana+'.png')
  }
  function draw(x,y){
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
    ctx.beginPath();
  }
  function drawEnd(){
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
    const imageData=sliceArrayByNumber(ctx.getImageData(0,0,567,567),4);
    let Gray=imageData.filter(e=>{return e[0]===159&&e[1]===160&&1[2]===160}).length;
    let Black=imageData.filter(e=>{return e[0]===0&&e[1]===0&&1[2]===0}).length;
    console.log(Gray);
    console.log(Black);
  }
  $('#hiragana,#katakana,#kanzi,#tasizan,#hikizan').on('touchend',()=>{
    $('#1thJapanese,#1thMath').hide();
    $('#question').show();
    if(subject==='Japanese'){
      $('#mathPanel').hide();
		canvas.on('touchstart',drawStart);
      canvas.on('touchend',drawEnd);
		canvas.on('touchmove',(e)=>{
        e.preventDefault();
        let rect=$(e.target).offset();
        let x=e.pageX||e.originalEvent.changedTouches[0].pageX;
        x-=rect.left;
        let y=e.pageY||e.originalEvent.changedTouches[0].pageY
        y-=rect.top;
        draw(x,y);
		});
      $('#marutuke').on('touchend',kokugoMarutuke);
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
    }
  });
  $('#tasizan').on('touchend',tasizan);
  $('#hikizan').on('touchend',hikizan);
  $('#hiragana').on('touchend',hiragana);
});