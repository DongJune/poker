$(function(){
	$('.game > div').each(function(i){
		 $(this)
		 .delay(i*200)
	     .animate({fontSize:30,opacity:1})	
	})
	function makepoker(){
      var poker=[]		
      var colors=['h','s','d','c']
      var f={}
      while(poker.length!==52){
	var c=colors[Math.floor(Math.random()*4)]
	var n=Math.ceil(Math.random()*13)
	var v={color:c,number:n}
	if (!f[c+n]) 
{
	poker.push(v)
   f[c+n]=true;
		};	
}
return poker;
}
var poker=makepoker()
function setpoker(poker){
var dict={
	1:'A',
	2:2,
	3:3,
	4:4,
	5:5,
	6:6,
	7:7,
	8:8,
	9:9,
	10:'T',
	11:'J',
    12:'Q',
    13:'K'
}
var index=0
for (var i = 0; i <7; i++) {
	for (var j = 0; j < i+1; j++) {
	var s=poker[index]
	index++
	$('<div>')
	.addClass('pai')
	.appendTo($('.screns'))
	.attr('num',s.number)
	.attr('id',i+'-'+j)
	.css('backgroundImage','url(./image/'+dict[s.number]+s.color+'.png)')
	.delay(index*30)
    .animate({
    	top:i*40,
    	left:j*100+(6-i)*50,
    	opacity:1
    })
	};

};
for (var s;index < poker.length; index++) 
// for (var s;index < 32; index++) 
{
	s=poker[index]
	$('<div>')
.addClass('pai left')
.appendTo($('.screns'))
.attr('num',s.number)
.attr('num1',index)
.css('backgroundImage','url(./image/'+dict[s.number]+s.color+'.png)')
.delay(index*30)
.animate({
	top:400,
	left:150,
	opacity:1
})
};
	return poker
}
//开始游戏
var s=true;
$('#btn').click(function(){
		$('.game > div').hide()
	if (s) {	
     $('.pai').detach()
   poker=makepoker()
   $('.gt').css('display','block')
   $('.lt').css('display','block')
    $('.screns').css('display','block')
	setpoker(poker)
};
s=false;
})
 // console.table(setpoker(poker))
// 在来一次
$('#reset').click(function(){
	if(confirm('你确定重新再来一次吗？')){
   $('.pai').detach()
       setpoker(poker)
}
})
//新开一局
$('#news').click(function(){
	if(confirm('你确定要新开一局吗？')){
   $('.pai').detach()
   poker=makepoker()
    setpoker(poker)
  }
})
//结束
$('#end').click(function(){
  var si=confirm('是否要结束游戏！')
  if(si){
      $('.pai').detach()
      s=true;
      ins=0;
     $('.grade>input').val(0)
  }
})

var gt=$('.gt')
gt.click((function(){
var zindex=0
	return function(){
 $('.left').last()
           .css('zIndex',zindex++)
           .animate({left:420})
           .queue(function(){
           	$(this).removeClass('left')
           	        .addClass('right')
           	        .animate({top:400}).dequeue()
           })
prev.animate({top:"+=30"})
   prev=null
       }
})())
var lt=$('.lt')
// 通过闭包进行访问内部的变量
lt.click((function(){
	var num=0
	return function(){
	num++;
	if (num>3) {
    alert('非常遗憾！这是盘死局')
   return;
};
	$('.right').each(function(i){
	if ( $('.left').length) {return};	
		$(this)	
		.delay(i*100)
		.animate({left:150})
	    .queue(function(){
			$(this).removeClass('right')
           	        .addClass('left')
           	        .css('zIndex',0)
           	        .dequeue()
		       })
	})
 prev.animate({top:"+=30"})
   prev=null
}

})())
function getnumber(el){
   return parseInt($(el).attr('num'))
} 
function iscanclick(a){
	var x=parseInt($(a).attr('id').split('-')[0])
	var y=parseInt($(a).attr('id').split('-')[1])
	if ($('#'+(x+1)+'-'+y).length||$('#'+(x+1)+'-'+(y+1)).length) {
		return true;
	}else{return false;}

}
var prev=null
var grd=10;
var ins=parseInt($('.grade>input').val())
// ins.click(function(){

// })
$('.screns').on('click','.pai',function(){
     var num=getnumber($(this))
     if ($(this).attr('id')&&iscanclick(this)) {
     	return false;
     };

     // if ( $('.grade>input').val()=280) {
     // 	alert('恭喜你成功了')
     // }
         if (num==13) {
      $(this)
      .animate({top:0,right:0,opacity:0})
      .queue(function(){
        $(this).detach().dequeue()
      })
      ins+=10
   $('.grade>input').val(ins)
   prev=null;
            return;
     };
     if (prev) {
        // 第二张牌不是13
        if (getnumber(prev)+getnumber(this)==13) {
        prev.add(this)
     	.animate({top:0,right:0,opacity:0})
     	.queue(function(){
     		$(this).detach().dequeue()
     	})
        ins+=10
    $('.grade>input').val(ins)

        }
        else{
        	if ($(this).attr('id')||prev.attr('id')) {     
   if ($(this).attr('id')==$(prev).attr('id')) {
      $(this).animate({top:'+=30'})
 	}
 if ($(this).attr('id')!=$(prev).attr('id')){	
        $(this).animate({top:'-=30'}).animate({top:'+=30'})
 	   $(prev).delay(400).animate({top:'+=30'}) 
 }   
    // if(this==$('.lt')||this==$('.gt')){
    //     prev.animate({top:'-=30'})
    //   prev.animate({top:'+=30'})
    //  }

		}else{
       if (prev.attr('num1')==$(this).attr('num1')) {
            $(this).animate({top:'+=30'}) 
       	}else{
       		$(this).animate({top:'-=30'})
       		$(prev).add(this).animate({top:'+=30'})
       	// }	 
            }
        			
      }
  prev=null
     }


 }else{
    	// 第一张牌不是13
    	 	 prev=$(this)
    	// if ($(this).attr('id')) {
 	  $(prev).animate({top:'-=30'}) 


 	// };  
     	}
})

// $('.screns').on('mousedown','.pai',function(e){
// 	var el=e.target
// 	$(el).on('mouseenter',function(){
// 		el.removeClass().addClass('pus')
// 	})
//   console.log(el)
// })
//不知道点击是那一个。通过委派完成
// 13的消除创建一个记录牌数字的标识，通过获取到的数字判断是不是值为是13.是13 直接移出当前的牌，如果不是13，先记录第一张牌的值，判断第二种选中的值两者相加是不是13，是13消除。
//压牌问题的解决：通过创建一个标识记录每张牌的位置（i，j）,通过判断他们的前面是否有牌压着，压着不执行点击事件，
})