$(function(){
	var arr = [];
	$('.mask').click(function(e){
		if(arr.length >= 3 ){
				$('.mask').unbind('click');	
				alert('兄台好体力，女神已经被翻得受不了了，明天再来翻吧');
				return;
			}
		if($(this).hasClass('hidden')){
			$(this).animate({top:'-255px'},'slow');
			$(this).removeClass('hidden');
			$(this).parent().find('.job_info').first().animate({bottom:'-120px'},'slow');
			$(this).parent().find('.job_info').first().css('cursor','pointer');
			if($(this).hasClass('blur')){
				$(this).removeClass('blur');
				var imgId = $(this).parent().find('.srcImage').first().attr('id');
			    var canId = $(this).parent().find('.srcCanvas').first().attr('id');
			    var radius = 34;
			    stackBlurImage(imgId,canId	, 34, true);
			    var timer = setInterval(function(){
				    radius --;
				    stackBlurImage(imgId,canId,radius,false);
			    },10);
			    if(Math.floor(radius) <= 0){	
				    clearInterval(timer);
			    }
			}
			
			var id = $(this).parent().attr('jobId');
			var isContain = false;
			for(var i = 0; i < arr.length; i ++){
				if(arr[i] == id){
					isContain = true;
				}
			}
			if(!isContain){
				arr.push(id);
			}
		}	
	});
	$('.job_info').click(function(e){
		var mask =$(this).parent().find('.mask').first();
		if(!mask.hasClass('hidden')){
			mask.addClass('hidden');
			$(this).animate({bottom:'0px'},'slow');
			$(this).parent().find('.mask').first().animate({top:'0px'},'slow');
			$(this).css('cursor','default');
			isCover = true;
		}
		
	});
});