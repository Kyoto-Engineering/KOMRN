$(function() {
	$(".component-blockA01 .image a , .component-blockA02 .image a , .component-blockA03 .image a").each(function(){
		if(this.target == '_blank'){
			var url = $(this).attr('href');
			//var t='<a href="'+url+'" target="_blank" style="display:block;margin-top:10px;"><img src="/resources/images/icon_right_b.gif" width="3" height="9" alt="" class="iconA01">Please click image to enlarge (open in a new window).<img src="/resources/images/icon_blank_b.gif" width="14" height="11" alt="" class=""></a>'
			var w= $(this).parent("div.image").width();
			var t='<div class="img_caption" style="width:'+w+'px;">';
			t=t+'<a href="'+url+'" target="_blank" class="link_list blank_link"><span>Please click image to enlarge (open in a new window).</span></a>';
			t=t+'</div>';
			$(this).after(t);
		}
	});
});