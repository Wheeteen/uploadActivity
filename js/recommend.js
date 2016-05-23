$(function(){
	$.ajax({
		url:'../html/Recommand.php',
		dataType:'json',
		success:function(result){
			$.each(result,function(index,value){
				var section=$('<div>').appendTo($('.content')).addClass('part');
				var t_logo=$('<div>').appendTo(section).addClass('t-logo');
				var c_logo=$('<div>').appendTo(t_logo).addClass('c-logo');
				var f_date=$('<span>').appendTo(c_logo).addClass('f_num').html(result[index].logo1);
				var s_date=$('<span>').appendTo(c_logo).html(result[index].logo2);
                var main=$('<div>').appendTo(section).addClass('main-pic');
				var pic=$('<div>').appendTo(main).addClass('pic');
				var img=$('<img/>').appendTo(pic).addClass('pic_img');
				$(img).attr('src',result[index].pic);
                var para=$('<div>').appendTo(main).addClass('para');
				var title=$('<h1>').appendTo(para).addClass('title').html('活动详情');
				var p01=$('<p>').appendTo(para).html(result[index].p1);
				var p02=$('<p>').appendTo(para);			                
				var p02_address=$('<span>').appendTo(p02).addClass('address');
				var p02_area=$('<span>').appendTo(p02).addClass('pa').html(result[index].p2_1);
				var p02_district=$('<span>').appendTo(p02).addClass('pa').html(result[index].p2_2);
				var p02_concrete=$('<span>').appendTo(p02).addClass('pa').html(result[index].p2_3);
				var p03=$('<p>').appendTo(para);
				var p03_time=$('<span>').appendTo(p03).addClass('time');
				var p03_date=$('<span>').appendTo(p03).addClass('pa').html(result[index].p3_1);
				var p03_clock=$('<span>').appendTo(p03).addClass('pa').html(result[index].p3_2);
			})
		}
	})
})
