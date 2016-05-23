// 我的资料
$(function(){
//初始化页面的信息
	$.ajax({
		url:'../html/userCenter_new.php',
		data:{
           'select':0
		},
		dataType:'json',
		type:'POST',
		success:function(data){
			console.log(data);
			$('.new_name').html(data.username);
			$('.new_email').html(data.email);
            // 初始化展览的信息
			 // 展览的                     
          	$(data.lovezl).each(function(index,value){
				console.log(data);
        		get_pic(data.lovezl[index].img[0],data.lovezl[index].type);
                get_detail(index,data.lovezl[index].title,data.lovezl[index].img,data.lovezl[index].description);
                // 点击星星的取消收藏信息功能
                var lovezl='lovezl';
                remove_love(index,data.lovezl[index].id,lovezl); 
        	})
 
		}
	})
  
  //生成展览，公益，讲座等页面内容
  function get_pic(img1,type){
  	 var section=$('<div>').appendTo($('.favorite_pic ul')).addClass('section01');
     var image=$('<img/>').appendTo(section).addClass('image01');
     $(image).attr('src',img1);
     var before=$('<div>').appendTo(section).addClass('s_before01');
     var middle=$('<div>').appendTo(before).addClass('s_middle01');
     var p1=$('<p>').appendTo(middle).html(type);
     var p2=$('<p>').appendTo(middle).html('查看详细').addClass('look04');
     var xing_wrap=$('<div>').appendTo(before).addClass('xing01');
     var xing=$('<div>').appendTo(xing_wrap).addClass('xing-img01');

  }
  //查看详细
  function get_detail(index,title,img,description){
  	$('.look04').eq(index).on('click',function(){
  		$('.detail01').slideDown();
        $('body').css('overflow-y','hidden');//将下面页面的滚动条设置不能滚动，只剩下弹出的页面可以滚动
        $('.main_detail01').html('');
        var main=$('<div>').appendTo($('.main_detail01')).addClass('main_dil01');
        var h1=$('<h1>').html(title).addClass('h_title01').appendTo(main);
        var oUl=$('<ul>').appendTo(main).addClass('oul01');
        for(var i=0;i<img.length;i++){
           var iLi=$('<li>').appendTo(oUl).addClass('oli01');
           var oImg=$('<img/>').appendTo(iLi).addClass('dimg01');
           $(oImg).attr('src',img[i]);
        }
        var textarea=$('<textarea>').appendTo(main).addClass('textarea01').html(description);
  	})
  }

  //点击取消收藏
  function remove_love(index,id,lovezl){
  	var cancel=0;
  	$('.xing01').eq(index).on('click',function(){
  		remove_xing(index,id,lovezl,cancel);
  	})
  }
  //取消收藏
   function remove_xing(which,index,l_type,b){
    $.ajax({
        url:'../html/collect.php',
        data:{
          'id':index,
          'type':l_type,
          'act':b
        },
        dataType:'json',
        type:'POST',
        success:function(data){
          $('.section01').eq(which).remove();
        }
    })
  }
	// 修改用户名的按钮
	$('.change_name').on('click',function(){
		$('.s_1').hide();
		$('.appear01').fadeIn();
		var s_val=$('.new_name').html();
		$('.p_text').val(s_val);
			
	})
	// 修改邮箱的按钮
	$('.change_email').on('click',function(){
		$('.s_2').hide();
		$('.appear02').fadeIn();
		var e_val=$('.new_email').html();
		$('.p_email').val(e_val);
		
	})

	// 点击确定的时候
	$('.btn_sure').on('click',function(){
	   var url='changeInfo.php';
	   var iText=ifEmpty('.p_text');
	   var iEmail=ifEmpty('.p_email');

       var username=$('.p_text').val();
       var email=$('.p_email').val();       

       //只修改用户名
       if($('.change_name').is(':hidden') && $('.change_email').is(':visible')){
           if(iText==0){
           	  $('.same_name').html('用户名不能为空');
       	      return false;
           }else{
              $('.same_name').html('');
           	  $.ajax({
                 url:url,
                 data:{
                 	'newName':username
                 },
                 dataType:'json',
	          	 type:'POST',
	          	 success:function(data){
	          	 	if(data.status=='RepeatName'){
	          			$('.same_name').html('用户名不能重复');
	          			return false;
	          		}else{
	          			if(data.status=='Success'){
          					$('.s_1').fadeIn();
							$('.appear01').hide();						
							$('.new_name').html(data.newName);//新修改的名字							
          				}
	          		}
	          	 }

           	  })
           }

       }

       //只修改邮箱
       if($('.change_email').is(':hidden') && $('.change_name').is(':visible')){
       	   if(iEmail==0){
       	 	 $('.add_correct').html('邮箱不能为空');
       	 	 return false;
       	 }else{
             $('.add_correct').html('');
             var isFormated=validate_email(email);
	         if(isFormated){
                $.ajax({
                 url:url,
                 data:{
                 	'newEmail':email
                 },
                 dataType:'json',
	          	 type:'POST',
	          	 success:function(data){
	          	 	if(data.status=='RepeatEmail'){
	          			 $('.add_correct').html('邮箱不能重复');
	          			 return false;
	          		}else{
	          			if(data.status=='Success'){
          					$('.s_2').fadeIn();
							$('.appear02').hide();
                            $('.new_email').html(data.newEmail); //新修改的邮箱
          				}
	          		}
	          	 }

           	  })
	         }else{
	         	 $('.add_correct').html('请输入正确的邮箱地址');
	       	     return false;
	         }
       	 }
       }

       //两个都修改
        if($('.change_name').is(':visible') && $('.change_email').is(':visible')){
        	 if(iText==0){
		        $('.same_name').html('用户名不能为空');
		        return false;
	        }else{
	       	  $('.same_name').html('');
	       	  if(iEmail==0){
	       	 	 $('.add_correct').html('邮箱不能为空');
	       	 	 return false;
	       	 }else{
	       	   var isFormated=validate_email(email);
		       if(isFormated){
		          $.ajax({
		          	url:'changeInfo.php',
		          	data:{
						'newName':username,
		          		'newEmail':email
		          	},
		          	dataType:'json',
		          	type:'POST',
		          	success:function(data){
		          		if(data.status=='RepeatName'){
		          			$('.same_name').html('用户名不能重复');
		          			return false;
		          		}else{
		          			if(data.status=='RepeatEmail'){
		          				 $('.add_correct').html('邮箱不能重复');
		          				 return false;
		          			}else{
		          				if(data.status=='Success'){
		          					$('.s_1').fadeIn();
									$('.appear01').hide();
									$('.s_2').fadeIn();
									$('.appear02').hide();
									$('.new_name').html(data.newName);//新修改的名字
									$('.new_email').html(data.newEmail); //新修改的邮箱
		          				}
		          			}
		          		}
		          	}
		          })
		       }else{
		       	  $('.add_correct').html('请输入正确的邮箱地址');
		       	  return false;
		       }
	       	 }
	       	}
        }
       
	})

	// 判断email框是否正确的函数
	function validate_email(email)
	{
	 var pattern = new RegExp(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+(com|cn)$/);
	  return pattern.test(email);

	}
     // 判断text是否为空的函数
    function ifEmpty(clsName) {
	 var username = $.trim($(clsName).val());
	 if(username==""||username==null) {
	  return 0;
	 }
	  return 1;
	} 



   // 我的收藏

 // 查看详细里面的×，将弹出的页面关闭
  $('.close-s').on('click',function(){
    $('.detail01').slideUp();
    $('body').css('overflow-y','auto');//将页面垂直方向上滚动条复原
  })
  
    // 点击展览收藏
    $('.love_1').on('click',function(){
    	 $('.favorite_pic ul').empty();
   	  	$.ajax({
			url:'../html/userCenter_new.php',
			data:{
				'select':0
			},
			dataType:'json',
			type:'POST',
			success:function(data){
				console.log(data);
               if(data.lovezl=='No result'){
               	 $('.favorite_pic ul').html('您还没有收藏过展览的信息呢');
               }else{
               	 // 讲座的   
           	      $(data.lovezl).each(function(index,value){
           	      	get_pic(data.lovezl[index].img[0],data.lovezl[index].type);
	                get_detail(index,data.lovezl[index].title,data.lovezl[index].img,data.lovezl[index].description);
	                // 点击星星的取消收藏信息功能
	                var lovezl='lovezl';
	                remove_love(index,data.lovezl[index].id,lovezl); 
           	      })       
               	  
               }
			}
		})
    })
    // 点击公益收藏
     $('.love_2').on('click',function(){
    	$('.favorite_pic ul').empty();
   	  	$.ajax({
			url:'../html/userCenter_new.php',
			data:{
				'select':1
			},
			dataType:'json',
			type:'POST',
			success:function(data){
				console.log(data);
               if(data.lovegy=='No result'){
               	 $('.favorite_pic ul').html('您还没有收藏过展览的信息呢');
               }else{
               	 // 讲座的   
           	      $(data.lovegy).each(function(index,value){
           	      	get_pic(data.lovegy[index].img[0],data.lovegy[index].type);
	                get_detail(index,data.lovegy[index].title,data.lovegy[index].img,data.lovegy[index].description);
	                // 点击星星的取消收藏信息功能
	                var lovezl='lovegy';
	                remove_love(index,data.lovegy[index].id,lovezl); 
           	      })       
               	  
               }
			}
		})
    })
  // 点击讲座收藏
   $('.love_3').on('click',function(){
   	  $('.favorite_pic ul').empty();
   	  	$.ajax({
			url:'../html/userCenter_new.php',
			data:{
				'select':2
			},
			dataType:'json',
			type:'POST',
			success:function(data){
				console.log(data);
               if(data.lovejz=='No result'){
               	 $('.favorite_pic ul').html('您还没有收藏过讲座的信息呢');
               }else{
               	 // 讲座的   
           	      $(data.lovejz).each(function(index,value){
           	      	get_pic(data.lovejz[index].img,data.lovejz[index].type);
           	      	//点击查看详细
           	      	$('.look04').eq(index).on('click',function(){
				  		$('.detail01').slideDown();
				        $('body').css('overflow-y','hidden');//将下面页面的滚动条设置不能滚动，只剩下弹出的页面可以滚动
				        $('.main_detail01').html('');
				        var main=$('<div>').appendTo($('.main_detail01')).addClass('main_dil01');
				        var h1=$('<h1>').html(data.lovejz[index].title).addClass('h_title01').appendTo(main);
				        var oUl=$('<ul>').appendTo(main).addClass('oul01');
				        var iLi=$('<li>').appendTo(oUl).addClass('oli01');
				        var oImg=$('<img/>').appendTo(iLi).addClass('dimg01');
				        $(oImg).attr('src',data.lovejz[index].img);
				        var textarea=$('<textarea>').appendTo(main).addClass('textarea01').html(data.lovejz[index].description);
				  	})

				  	// 点击星星的取消收藏信息功能
	                var lovezl='lovejz';
	               remove_love(index,data.lovejz[index].id,lovezl); 
           	      })       
               	  
               }
			}
		})

   })

})

