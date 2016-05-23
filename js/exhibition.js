
// 在展览的主页上添加展览的图片信息
$(function(){
  // 生成页面图片（即主要内容）
  function data_pic(img1,type){
     var section=$('<div>').appendTo($('.content .g_container')).addClass('section');
     var image=$('<img/>').appendTo(section).addClass('image');
     $(image).attr('src',img1);
     var before=$('<div>').appendTo(section).addClass('s_before');
     var middle=$('<div>').appendTo(before).addClass('s_middle');
     var p1=$('<p>').appendTo(middle).html(type);
     var p2=$('<p>').appendTo(middle).html('查看详细').addClass('look');
     var xing_wrap=$('<div>').appendTo(before).addClass('xing');
     var xing=$('<div>').appendTo(xing_wrap).addClass('xing-img');
  }
  // 点击查看详细
  function click_look(index,title,img,description){
    $('.look').eq(index).on('click',function(){
        $('.detail').slideDown();
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
  function love_pic(index,i,id){
     var lovezl='lovezl';
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

   // 查看详细里面的×，将弹出的页面关闭
  $('.close-s').on('click',function(){
    $('.detail').slideUp();
    $('body').css('overflow-y','auto');//将页面垂直方向上滚动条复原
  })


// 初始化
   $.ajax({
    url:'../html/getZhanlan_new.php',
    dataType:'json',
    success:function(result){
      console.log(result);
      $.each(result,function(index,value){
         // 展览首页添加展览图片的信息，上面包括点击查看详细的按钮
         data_pic(result[index].img[0],result[index].type);
        // 点击每张图片的查看详细
         click_look(index,result[index].title,result[index].img,result[index].description);
         init();
         // 点击星星的收藏信息功能
         if($('.change').val()==='have'){
          
           love_pic(index,$('.xing').eq(index),result[index].id); 
         }else{
           $('.xing').eq(index).on('click',function(){
             alert('请先登录再点赞！');
           })
         }
               

      })
 
    }
   });
   
  function init(){
    if($('.change').val()==='have'){
      $.ajax({
        url:'../html/userCenter_new.php',
        dataType:'json',
        data:{
          'select':0
        },
        type:'POST',
        success:function(data){
          $(data.lovezl).each(function(index,value){
            $('.section').eq(data.lovezl[index].id-1).find($('.xing')).addClass('active-xing');
          })
        }
      })
    }
  }

// 点击个展、动漫、摄影、书画等分类ajax出页面内容

//分类
  var Url='../html/switch.php';
  // 对分类封装函数
  function type(selector,describe){
     $(selector).on('click',function(){
        $('.content .g_container').empty();
        $.ajax({
          url:Url,
          data:{
             'type':'zhanlan',
             'field': describe
          },
          dataType:'json',
          type:'POST',
          success:function(result){
            $.each(result,function(index,value){
               // 展览首页添加展览图片的信息，上面包括点击查看详细的按钮
               data_pic(result[index].img[0],result[index].type);
               // 点击每张图片的查看详细
               click_look(index,result[index].title,result[index].img,result[index].description);

               // 点击星星的收藏信息功能
               if($('.change').val()==='have'){
                 love_pic(index,$('.xing').eq(index),result[index].id); 
               }else{
                 $('.xing').eq(index).on('click',function(){
                   alert('请先登录再点赞！');
                 })
               }      
            })
          }
        })
    })
  }
// 个展的
  type('.type01','个展');    
// 雕塑的
  type('.type02','雕塑');  
// 摄影的
  type('.type03','摄影');  
// 书画的
  type('.type04','书画');  
})
