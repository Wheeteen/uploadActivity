$(function(){
	$('.add_click').on('click',function(){
		$('.main').hide();
		$('.open').fadeIn();

	})
	$('.add_p').on('click',function(){
		$('.main').hide();
		$('.open').fadeIn();
	})
	$('.wrong').on('click',function(){
		$('.open').hide();
		$('.main').fadeIn();
	})

  // 图片预览
  function previewImage(file, prvid) {
    /* file：file控件
     * prvid: 图片预览容器
     */
    var file=document.getElementById(file);
    var tip = "请选择jpg或png的图片"; // 设定提示信息
    var filters = {
        "jpeg"  : "/9j/4",
        "png"   : "iVBORw"
    }
     // var prvbox = document.getElementById(prvid);
    // prvbox.innerHTML = "";
    if (window.FileReader) { // html5方案
        for (var i=0, f; f = file.files[i]; i++) {
            var fr = new FileReader();
            fr.onload = function(e) {
                var src = e.target.result;
                if (!validateImg(src)) {
                    alert(tip)
                } else {
                    showPrvImg(src);
                }
            }
            fr.readAsDataURL(f);
        }
    } else { // 降级处理
        if ( !/\.jpg$|\.png$|\.gif$/i.test(file.value) ) {
            alert(tip);
        } else {
            showPrvImg(file.value);
        }
    }
 
    function validateImg(data) {
        var pos = data.indexOf(",") + 1;
        for (var e in filters) {
            if (data.indexOf(filters[e]) === pos) {
                return e;
            }
        }
        return null;
    }
 
    function showPrvImg(src) {
        var img=$('<img/>').appendTo($(prvid)).addClass('img_file');
        $(img).attr('src',src);
    }
  }
  
  $('#file1').change(function(){
    previewImage('file1','.add_pic01');
  }) 
  $('#file2').change(function(){
    previewImage('file2','.add_pic02');
  }) 
  $('#file3').change(function(){
    previewImage('file3','.add_pic03');
  }) 
  $('#file4').change(function(){
    previewImage('file4','.add_pic04');
  }) 
	// 判断上传内容的框有没有为空
	 // 判断text是否为空的函数
  function ifEmpty(clsName) {
	 var username = $.trim($(clsName).val());
	 if(username==""||username==null) {
	  return false;
	 }
	  return true;
	} 

   getData();//初始化
    function getData(){
      $.ajax({
        url:'../html/shenhe.php',
        dataType:'json',
        success:function(data){
          console.log(data);
          $('.partImg1').attr('src',data[data.length-1].img[0]);
          $('.Type1').html(data[data.length-1].type);
          $('.Count1').html(data[data.length-1].count);
          $('.partImg2').attr('src',data[data.length-2].img[0]);
          $('.Type2').html(data[data.length-2].type);
          $('.Count2').html(data[data.length-2].count);

        }
      })
    }
    // 点击发布的时候（即确认的时候）
    $('.btn_sure').on('click',function(){
        // 检查只要有一个文件上传了就ok啦
	    var fileFlag = false; 
  		$("input[name='upload_pic']").each(function(index,value){ 
    			if($.trim($("input[name='upload_pic']").val()!=='')) { 
      			fileFlag = true; 
      			return false; 
      	  } 
  		})
      var iTopic=ifEmpty('.topic_text');
      var iTextarea=ifEmpty('.explain');

  		var val_type=$('input:radio[name="select_type"]:checked').val();
      console.log(val_type);
  		var topic=$('.topic_text').val();
  		var explain=$('.explain').val();
      
      var form=new FormData();
      form.append( 'file1',$('#file1')[0].files[0]);
      form.append( 'file2',$('#file2')[0].files[0]);
      form.append( 'file3',$('#file3')[0].files[0]);
      form.append( 'file4',$('#file4')[0].files[0]);
      form.append('type',val_type) ;
      form.append('title',topic);
      form.append('description',explain);

        if(fileFlag){
        	$('.tip_pic').html('');
        	if(iTopic){
        		$('.tipTopic').html('');
               if(iTextarea){
                  $('.tip_tarea').html('');
                  // ajax将数据传给后台
                  $.ajax({
                    url:'../html/uploadMain.php',
                    type:'POST',
                    data:form,
                    dataType:'json',
                    processData:false,
                    contentType:false,
                    success:function(data){
                      if(data.status=='Over size'){
                        $('.tip_pic').html('第'+data.number+'张图片超过10M！请更换');
                      }
                      else if(data.status=='Wrong type'){
                        $('.tip_pic').html('请不要上传病毒图片！');
                      }
                      else if(data.status=='Same Name'){
                        $('.tip_pic').html('请不要上传重名的图片！');
                      }
                      else{
                        alert('活动上传成功，审核中');
                         $('.open').hide();
                         $('.main').fadeIn();
                         getData();
                      }
                    }

                  })
               }else{
               	$('.tip_tarea').html('文本框不能为空');
               	return false;
               }
        	}else{
        		$('.tipTopic').html('主题不能为空');
        		return false;
        	}
        }else{
        	$('.tip_pic').html('请上传至少一张图片');
        	return false;
        }

    })
     

})