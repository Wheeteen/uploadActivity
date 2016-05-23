
// 点击登录的时候登录框，注册框等等出现，叉掉的时候登录框等消失
$(function(){
// 再次刷新的时候还是保持登录的状态
	$.ajax({
		url:'../html/userCenter_new.php',
		dataType:'json',
		data:{
			'select':0
		},
		type:'POST',
		success:function(data){         
           if(data.status=='session1'){
           	//记录有没有登录或注册
           	$('.change').val('have');
           	
              if(data.type=='user'){
              	$('.click_reg').hide();
                $('.have-login img').fadeIn();
               	$('.have-login').mouseenter(function(){
			     	$('.user_mes').show();
			    }).mouseleave(function(){
			     	$('.user_mes').hide();
			    })

			 }else{
			 	$('.click_reg').hide();
                $('.have-login img').fadeIn();
               	$('.have-login').mouseenter(function(){
			     	$('.busi_mes').show();
			     }).mouseleave(function(){
			     	$('.busi_mes').hide();
			     })
			 }
             
			  
           }else{
           	 $('.click_reg').show();
           	 $('.have-login img').hide();
           	 $('.user_mes').hide();
             $('.busi_mes').hide();
           }
          
		}

	})
	$('.enter').on('click',function(){
		$('.s_register').slideDown();
		$('.user_frame').fadeIn();
		$('.register_frame').hide();
		$('.click_log').css('color','#ed9e41');
		$('.click_rt').css('color','#3e393b');
		 $('.grey').show();
	})
	$('.cha').on('click',function(){
        $('.s_register').fadeOut();
        $('.reset_pwd').slideUp(); 
        $('.grey').hide();
	})
	$('.click_log').on('click',function(){
		$('.user_frame').fadeIn();
		$('.register_frame').hide();
		$('.click_log').css('color','#ed9e41');
		$('.click_rt').css('color','#3e393b');
	})
	$('.click_rt').on('click',function(){
		$('.user_frame').hide();
		$('.register_frame').fadeIn();
		$('.click_rt').css('color','#ed9e41');
		$('.click_log').css('color','#3e393b');
	})
	$('.fget_pwd').on('click',function(){
		$('.s_register').hide();
		$('.reset_pwd').slideDown();
	})
     $('.search_button').on('click',function(){
     	$('.search').slideDown();
     	$('.search').addClass('active-search');
     })
     $('.close-s').on('click',function(){
     	$('.search').slideUp();
     	$('.search').removeClass('active-search');
     })    
// 点击我的资料和我的收藏或头像的时候跳转到个人页面
     $('.have-login img,.pic_name,.favorite').on('click',function(){
     	location.href='../html/username.html';

     })
     $('.busi_mes .add-acti').on('click',function(){
     	location.href='../html/upload.html';
     })

})

// 验证表单是否为空，ajax调数据
$(function(){
	// 验证各输入框是否为空
    // 表单验证

    // 判断text是否为空的函数
    function ifEmpty(clsName) {
	 var username = $.trim($(clsName).val());
	 if(username==""||username==null) {
	  return 0;
	 }
	  return 1;
	} 
	// 判断email框是否正确的函数
	function validate_email(email)
	{
	 var pattern = new RegExp(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+(com|cn)$/);
	  return pattern.test(email);

	}

	//按下回车键
	function get_enter(c_btn,target){
		$(c_btn).on('keydown',function(event){
			var e=event||window.event|| arguments.callee.caller.arguments[0];
			var keycode=e.which||e.keyCode;	
			if(keycode==13){			
				$(target).click();
				e.preventDefault();  
			}	 
		})
	}
	//对登录框按下回车键
	get_enter('.user_frame','.log');
	//对注册框按下回车键
	get_enter('.register_frame','.c_frm');
	//对重置密码框按下回车键
	get_enter('.reset_pwd','.get_num');
	// 验证登录框的内容是否为空
	$('.log').on('click',function(){
		
		var iText=ifEmpty('.user');
		var iPwd=ifEmpty('.password');

		var val=$('input[name="select"]:checked').val();
		var text=$('.user').val();
        var pwd=$('.password').val();
		var checkbox=$('input[name="keep"]:checked').val();

		if(iText==0){
			$('.user01').html('用户名不能为空');
			return false;
		}else{
			$('.user01').html('');
			if(iPwd==0){
				$('.pwd01').html('密码不能为空');
				return false;
			}
			else{
				$('.pwd01').html('');
		// ajax验证用户名是否存在，密码是否正确
				$.ajax({
					url:'../html/login.php',
					dataType:'json',
					type:'POST',
					data:{
						'username':text,
						'password':pwd,
						'selectType':val,
						'keep':checkbox
					},
					success:function(data){
					   if(val=='user'){
					   	if(data.status=='login1'){	
					   	    $('.change').val('have');
                            $('.grey').hide();			   		
				   			$('.click_reg').hide();
                            $('.have-login img').fadeIn();
                           	$('.have-login').mouseenter(function(){
						     	$('.user_mes').show();
						     }).mouseleave(function(){
						     	$('.user_mes').hide();
						     })
						     $('.s_register').fadeOut();
						 }else if(data.status=='username0'){
					 		$('.user01').html('用户名不存在');
					    	return false;
					    }else{
					    	  $('.pwd01').html('密码不正确');
				    		  return false;
					    }
					   }else{
					   	   if(data.status=='login1'){	
					   	        $('.change').val('have');
					   	        $('.grey').hide();			
					   	   	    $('.click_reg').hide();
	                            $('.have-login img').fadeIn();

	                           	$('.have-login').mouseenter(function(){
							     	$('.busi_mes').show();
							     }).mouseleave(function(){
							     	$('.busi_mes').hide();
							     })
							     $('.s_register').fadeOut();
					   	   }else if(data.status=='username0'){
					   	   	   $('.user01').html('用户名不存在');
					    	   return false;
					   	   }else{
					   	   	    $('.pwd01').html('密码不正确');
				    		    return false;
					   	   }
					   }
					}
				})
			}
		}
	})

	// 验证注册框的内容是否为空
	$('.c_frm').on('click',function(){
		var iText=ifEmpty('.user02');
		var iEmail=ifEmpty('.email');

		var val=$('input[name="selectType"]:checked').val();
		var text=$('.user02').val();
		var Email=$('.email').val();
		var pwd=$('.password02').val();
		var iPwd=ifEmpty('.password02');
		if(iText==0){
			$('.user03').html('用户名不能为空');
			return false;
		}else{
			$('.user03').html('');
			if(iEmail==0){
				$('.exist_email').html('邮箱不能为空');
				return false;
			}else{
				$('.exist_email').html('');
				var emailVal=$('.email').val();
				var isFormated=validate_email(emailVal);
				if(isFormated){
                  if(iPwd==0){
                  	$('.pwd02').html('密码不能为空');
                  	return false;
                  }
                  else{
                  	$('.pwd02').html('');
           	// ajax验证注册框的用户名是否重复，邮箱是否重复
                  	$.ajax({
						url:'../html/register.php',
						data:{
							'username':text,
							'email':Email,
							'password':pwd,
							'selectType':val

						},
						dataType:'json',
						type:'POST',
						success:function(data){
						    if(val=="user"){			
						    	if(data.status=='name0'){
						    		$('.user03').html('用户名重复');
						    		return false;
						    	}else{
                     
                                    if(data.status=='email0'){
                                    	$('.exist_email').html('邮箱重复');
                                    	return false;
                                    }else{
                                    	$('.change').val('have');
                                    	$('.grey').hide();
                                        $('.click_reg').hide();
		                                $('.have-login img').fadeIn();
		                               	$('.have-login').mouseenter(function(){
									     	$('.user_mes').show();
									     }).mouseleave(function(){
									     	$('.user_mes').hide();
									     })
									     $('.s_register').fadeOut();
                                    }
						    	}
						    }else if(val=='shopkeeper'){
						    	if(data.status=='name0'){
						    		$('.user03').html('用户名重复');
						    		return false;
						    	}else{
                     
                                    if(data.status=='email0'){
                                    	$('.exist_email').html('邮箱重复');
                                    	return false;
                                    }else{
                                    	$('.change').val('have');
                                    	$('.grey').hide();
                                        $('.click_reg').hide();
		                                $('.have-login img').fadeIn();
		                                 $('.have-login').mouseenter(function(){
									     	$('.busi_mes').show();
									     }).mouseleave(function(){
									     	$('.busi_mes').hide();
									     })
		                               	 $('.s_register').fadeOut();
                                    }
						    	}
						    }
			             
						}
					})
                  }
				}else{
					$('.exist_email').html('请输入正确的邮箱');
					return false;
				}
			}
		}
	})


  // 重置密码框点击获取验证码来获取验证码,ajax调数据
	$('.get_num').on('click',function(){
		var iEmail=ifEmpty('.add');
		var val=$('input[name="select_again"]:checked').val();

		// 首先验证邮箱地址是否为空，格式是否正确
		if(iEmail==0){
			$('.none_email').html('邮箱不能为空');
			return false;
		}else{
			$('.none_email').html('');
			var emailVal=$('.add').val();
			var isFormated=validate_email(emailVal);
			if(isFormated){
			  getNum(emailVal,val);				
			}else{
				$('.none_email').html('请输入正确的邮箱');
				return false;
			}
		}
	})

  // 将点击获取验证码的ajax封装成函数

	function getNum(emailVal,val){
		$.ajax({
			url:'../phpmailer/sendmail_new.php',
			data:{
				'email':emailVal,
				'selectType':val
			},
			dataType:'json',
		    type:'POST',
		    success:function(data){    
		    console.log(data);                 
		      if(val=='user'){
		      	if(data.status=='email0'){
		          	$('.none_email').html('邮箱不存在');
		          	return false;
		          }else{
		          	if(data.status=='send1'){
		          		$('.wrong_num').html('验证码已发到您的邮箱');
		          		$('.hidden').val(data.code);	       	
		          	}else{
		               $('.wrong_num').html('验证码发送错误');
		               return false;
		          	}	                         
		          }
		        }else{
		        	if(data.status=='email0'){
			          	$('.none_email').html('邮箱不存在');
			          	return false;
			        }else{
			        	if(data.status=='send1'){
			          		$('.wrong_num').html('验证码已发到您的邮箱');
			          		$('.hidden').val(data.code);
			          	}else{
			               $('.wrong_num').html('验证码发送错误');
			               return false;
			          	}
			        }
		        }
		    }
		})
	    
	}
	// 验证重置密码框内容是否为空,重置密码和验证码内容是否正确
	$('.confirm01').on('click',function(){
		var iText=ifEmpty('.num');
		var iEmail=ifEmpty('.add');
		var iPwd=ifEmpty('.rst_pwd');

		var val=$('input[name="select_again"]:checked').val();
		var text=$('.num').val();
        var email=$('.add').val();
        var pwd=$('.rst_pwd').val();

		if(iEmail==0){
			$('.none_email').html('邮箱不能为空');
			return false;
		}else{
			$('.none_email').html('');
            var emailVal=$('.add').val();
            var isFormated=validate_email(emailVal);
            if(isFormated){
            	if(iText==0){
                    $('.wrong_num').html('验证码不能为空');
                    return false;
                }else{
                	$('.wrong_num').html('');
                    // 调用Get_true_num函数来获取验证码
                    // 判断验证码是否正确
                    if(text==$('.hidden').val()){
                       if(iPwd==0){
                        $('.pwd03').html('重置密码不能为空');
                        return false;
                       }else{
                       	 $('.pwd03').html('');                     
                        // ajax验证重置密码框的重置密码设置是否与原密码不一样
                         $.ajax({
                         	url:'../html/changepw.php',
                         	data:{
                                'password':pwd,
                                'selectType':val
                            },
                            dataType:'json',
                            type:'POST',
                            success:function(data){
                                if(data.status=='updated 1'){
                                	
                                    $('.pwd03').html('重置密码成功');
                                }else{
                                    $('.pwd03').html('重置密码不成功');
                                    return false;
                                }
                            }
                         })
                       }
                    }else{
                    	$('.wrong_num').html('验证码不正确');
                        return false;
                    }
                }
            }else{
            	$('.none_email').html('请输入正确的邮箱');
                return false;
            }
		}
	})
})
// 搜索框
$(function(){
	// 查看详细里面的×，将弹出的页面关闭
	$('.close-s').on('click',function(){
	  $('.s-detail').slideUp();
	  $('body').css('overflow-y','auto');//将页面垂直方向上滚动条复原
    })

    //通过这个来确认是第几次点击按钮
    var off=true;
	//点击搜索按钮键的时候触发
	$('.img_search').on('click',function(){
		var val=$('.search_text').val();
		if(off){
			off=false;
			get_search(val);

		}else{			
			$('.s_content .g_container').empty();
			get_search(val);
		}
	})

	//按下回车键
	$('.search_text').on('keydown',function(event){
		var e=event||window.event|| arguments.callee.caller.arguments[0];
		var keycode=e.which||e.keyCode;	
		if(keycode==13){			
			$('.img_search').click();
				e.preventDefault();  
		}	 
	})


	//get_search的函数，获取搜索的值
	function get_search(val){
		$.ajax({
			url:'../html/search.php',
			data:{
				'keywords':val
			},
			dataType:'json',
			type:'POST',
			success:function(data){
				location.hash='#'+val;
				$('#posterTvGrid86804,.main,.footer,.banner,.video,.content,.detail').remove();
                $('.search_result').addClass('search_result_active');
	            if(data.result=='No result'){
	             $('.s_content .g_container').html('对不起，没有您想要的结果，请搜索别的内容');
	            }else{
	            	//如果有展览的
	            	$(data.zhanlan).each(function(index,value){
	            		search_pic(data.zhanlan[index].img1,data.zhanlan[index].type,'look');
                        click_look('.look',index,data.zhanlan[index].title,data.zhanlan[index].img,data.zhanlan[index].description);
                        // 点击星星的收藏信息功能
                        var lovezl='lovezl';
                        if($('.change').val()==='have'){
				          
				           love_pic(index,$('.xing').eq(index),data.zhanlan[index].id,lovezl); 
				        }else{
				           $('.xing').eq(index).on('click',function(){
				             alert('请先登录再点赞！');
				           })
				        }

	            	})

	            	//如果有公益的
                    $(data.gongyi).each(function(index,value){
	            		search_pic(data.gongyi[index].img1,data.gongyi[index].type,'look01');
                        click_look('.look01',index,data.gongyi[index].title,data.gongyi[index].img,data.gongyi[index].description);
                        // 点击星星的收藏信息功能
                        var lovezl='lovegy';
                         if($('.change').val()==='have'){
				          
				           love_pic(index,$('.xing').eq(index),data.gongyi[index].id,lovezl); 
				        }else{
				           $('.xing').eq(index).on('click',function(){
				             alert('请先登录再点赞！');
				           })
				        } 

	            	})

	            	//如果有讲座的
	            	$(data.jiangzuo).each(function(index,value){
	            		search_pic(data.jiangzuo[index].img,data.jiangzuo[index].type,'look02');
                        $('.look02').eq(index).on('click',function(){
						    $('.s-detail').slideDown();
						    $('body').css('overflow-y','hidden');//将下面页面的滚动条设置不能滚动，只剩下弹出的页面可以滚动
						    $('.main_detail').html('');
						    var main=$('<div>').appendTo($('.main_detail')).addClass('main_dil');
						    var h1=$('<h1>').html(data.jiangzuo[index].title).addClass('h_title').appendTo(main);
						    var oUl=$('<ul>').appendTo(main).addClass('oul');
						    var iLi=$('<li>').appendTo(oUl).addClass('oli');
						    var oImg=$('<img/>').appendTo(iLi).addClass('dimg');
						    $(oImg).attr('src',data.jiangzuo[index].img);
						    var textarea=$('<textarea>').appendTo(main).addClass('textarea').html(data.jiangzuo[index].description);
						})
                        // 点击星星的收藏信息功能
                        var lovezl='lovejz';
                         if($('.change').val()==='have'){
				          
				           love_pic(index,$('.xing').eq(index),data.jiangzuo[index].id,lovezl); 
				        }else{
				           $('.xing').eq(index).on('click',function(){
				             alert('请先登录再点赞！');
				           })
				        } 

	            	})

	            }
			}
		})
	}

	//搜索生成页面内容的函数
	function search_pic(img1,type,clsname){
		 var section=$('<div>').appendTo($('.s_content .g_container')).addClass('section');
	     var image=$('<img/>').appendTo(section).addClass('image');
	     $(image).attr('src',img1);
	     var before=$('<div>').appendTo(section).addClass('s_before');
	     var middle=$('<div>').appendTo(before).addClass('s_middle');
	     var p1=$('<p>').appendTo(middle).html(type);
	     var p2=$('<p>').appendTo(middle).html('查看详细').addClass(clsname);
	     var xing_wrap=$('<div>').appendTo(before).addClass('xing');
	     var xing=$('<div>').appendTo(xing_wrap).addClass('xing-img');

	}
	//搜索的点击查看详细
  function click_look(look,index,title,img,description){
    $(look).eq(index).on('click',function(){
	    $('.s-detail').slideDown();
	    $('body').css('overflow-y','hidden');//将下面页面的滚动条设置不能滚动，只剩下弹出的页面可以滚动
	    $('.main_detail').html('');
	    var main=$('<div>').appendTo($('.main_detail')).addClass('main_dil');
	    var h1=$('<h1>').html(title).addClass('h_title').appendTo(main);
	    var oUl=$('<ul>').appendTo(main).addClass('oul');
	    for(var i=0;i<img.length;i++){
	       var iLi=$('<li>').appendTo(oUl).addClass('oli');
	       var oImg=$('<img/>').appendTo(iLi).addClass('dimg');
	       $(oImg).attr('src',img[i]);
	    }
	    var textarea=$('<textarea>').appendTo(main).addClass('textarea').html(description);
	})
  }

  //收藏的函数
  
  function love_pic(index,i,id,lovezl){
     var active=1;
     var re_active=0;
     $('.xing').eq(index).on('click',function(){
      if($('.xing').eq(index).is('.active-xing')){
          remove_xing(i,id,lovezl,re_active);
      }
      else{
          get_xing(i,id,lovezl,active);
      }
     })
  }
   // 收藏的ajax函数
  // 收藏到个人信息处
 
   function get_xing(heart,index,lovezl,a){
   $.ajax({
      url:'../html/collect.php',
      data:{
        'id':index,
        'type':lovezl,
        'act':a
      },
      dataType:'json',
      type:'POST',
      success:function(data){      
          heart.addClass('active-xing');    
      }
   })
  }
  // 移出收藏
  
   function remove_xing(heart,index,lovezl,b){
    $.ajax({
        url:'../html/collect.php',
        data:{
          'id':index,
          'type':lovezl,
          'act':b
        },
        dataType:'json',
        type:'POST',
        success:function(data){         
            heart.removeClass('active-xing');
        }
    })
  }
})


