
$(function(){
	/*
	Tab Change
	------------------------------------------------------------------------------*/
	var tabChange = function() {

		this.doin = function(clickObj) {
			var thisHash = $(clickObj).attr('href');
			var tabNode = $(clickObj).parents().find('.tabpanel-blockA01');
			var curParent = $(clickObj).parent();
	
			if($(curParent).attr('class')=="active"){ return; }
			$(tabNode).find('.editable-block').hide();
			$(tabNode).find('li').removeClass();
			$(curParent).addClass('active');
			$(thisHash).show();

		} //doin

		this.init = function() {
			var $tabpanel = $(".tabpanel-blockA01");
			var $edittable = $(".editable-block");

			//tab panel current
			$tabpanel.find(".tabs a").click(function(event){
        tc.doin(this);
		    if (event.preventDefault) { //except for IE
		      event.preventDefault();
		    } else if(window.event) { //IE
		      window.event.returnValue = false;
		    }
			});
			$tabpanel.find("li").eq(0).addClass('active');
			//tab contents current
			$edittable.each(function(num){
				if(num) {
					$(this).css("display","none");
				}
			});
			
		} //init
	}
	
	var tc = new tabChange();
	tc.init();

});




