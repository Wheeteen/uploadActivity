$(function(){
	
	$(window).scroll(function(){
		if($(window).scrollTop()>155){
			$('.section_1').animate({
				left:'-10px'
			},2000)
		}
		if($(window).scrollTop()>162){
			$('.section_2').animate({
				left:'15px'
			},2000)
		}
	})

	// 下面五个圆点击的时候页面跳转
	$('.w_1').on('click',function(){
		location.href='../html/exhibition.html';
	})
	$('.w_2').on('click',function(){
		location.href='../html/exhibition.html';
	})
	$('.w_3').on('click',function(){
		location.href='../html/exhibition.html';
	})
	$('.w_4').on('click',function(){
		location.href='../html/recommend.html';
	})

})