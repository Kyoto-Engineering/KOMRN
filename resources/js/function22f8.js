var btnObj = {};
var linkListBtn = {};
var accordion = {};


$(function(){
	
	/*
	General Buttons
	------------------------------------------------------------------------------*/
	/* initialize */
	btnObj.init = function(){
		btnObj.clicked = false;	
		$("input[type='submit']").hover(function(e){
			btnObj.action($(this), "hover", "ON", e);
		},function(e){
			btnObj.action($(this), "hover", "OFF", e);
		}).mousedown(function(e) {
			btnObj.clicked = true;
			btnObj.action($(this), "hover", "OFF", e);
			btnObj.action($(this), "active", "ON", e);
		}).mouseup(function(e){
			btnObj.action($(this), "active", "OFF", e);
			btnObj.action($(this), "hover", "ON", e);
			btnObj.clicked = false;
		}).focus(function(e){
			if(!btnObj.clicked) btnObj.action($(this), "focus", "ON", e);
		}).blur(function(e){
			btnObj.action($(this), "focus", "OFF", e);
		});
	}
	
	/* button identify */
	btnObj.identify = function(obj){
		btnObj.property = {"classname":"","btnID":""};
		btnObj.property.classname = obj.attr("class");
		btnObj.property.existClass = "";
		var classArray = obj.attr("class").split(" ");
		for(var i=0; i<classArray.length; i++){
			if(classArray[i].indexOf("submit") == -1 && classArray[i].indexOf("hover") == -1 && classArray[i].indexOf("focus") == -1 && classArray[i].indexOf("active") == -1){
				btnObj.property.existClass += " " + classArray[i];
			}
		}
		
		btnObj.property.btnID = btnObj.property.classname.replace("submit","");
		return btnObj.property;
	}
	
	/* event action */
	btnObj.action = function(obj,eventType,ONOFF,eventObj){
		if(btnObj.identify(obj).classname.indexOf("submit") != -1){
			if(eventObj.srcElement) eventObj.srcElement.hideFocus = true;
			if(ONOFF == "ON"){
				$(obj).addClass(eventType + btnObj.identify(obj).btnID);
			}else if(ONOFF == "OFF"){
				$(obj).removeClass(eventType + btnObj.identify(obj).btnID);
			}
			$(obj).addClass(btnObj.property.existClass);
		}
	}
	
	/*
	link-listB01,link-listB02
	------------------------------------------------------------------------------*/
	linkListBtn.init = function(){
		$(".link-listB01 input").hover(function(e){
			$(e.target).parent().addClass("hover");
		},function(e){
			$(e.target).parent().removeClass("hover");
		});
		
		$(".link-listB02 a").hover(function(e){
			$(e.target).addClass("hover");
		},function(e){
			$(e.target).removeClass("hover");
		});
		
		$(".link-listB01 input").focus(function(e) {
			if($(e).srcElement) e.srcElement.hideFocus = true;
			$(e.target).parent().addClass("focus");
		});
		$(".link-listB01 input").blur(function(e) {
			$(e.target).parent().removeClass("focus");
		});
		
		$(".link-listB02 a").focus(function(e) {
			$(e.target).addClass("focus");
		});
		$(".link-listB02 a").blur(function(e) {
			$(e.target).removeClass("focus");
		});
	}
	
	/*
	Vertical Slide List
	------------------------------------------------------------------------------*/
	//css
	accordion.toggleStyle_close = {"cursor":"pointer","background-image":"url(/resources/images/icon_05_g.gif)","background-repeat":"no-repeat","background-position":"200px 10px"}
	accordion.toggleStyle_open  = {"cursor":"pointer","background-image":"url(/resources/images/icon_03_g.gif)","background-repeat":"no-repeat","background-position":"200px  6px"}
	accordion.listsizeStyle = {"display":"inline","padding":"0","padding-left":"9px"};
	
	/* initialize */
	accordion.init = function(){
		//find target
		$(".vertical-slide ul li").next().has("ul").each(function(index, element) {
			if($(element).prev().has("span")){
				$(element).prev().addClass("toggleObj");
				$(element).hide();
				$(element).prev().children("span").append("<span class='list-size'>(" + $("li",element).size() + ")</span>");
			}
		});
		
		//css
		$("li.toggleObj").css(accordion.toggleStyle_close);
		$("span.list-size").css(accordion.listsizeStyle);
		
		//toggle event
		$("li.toggleObj").toggle(function(){
			$("span.list-size", this).hide();
			$(this).css(accordion.toggleStyle_open).next().slideDown(200);
		},function(){
			$("span.list-size", this).show();
			$(this).css(accordion.toggleStyle_close).next().slideUp(200);
		});
	}
	
	
	btnObj.init();
	linkListBtn.init();
	accordion.init();

});


/*=========================================================================
 ajax
=========================================================================*/

var doXhr = function(reqObj) {
	if (!reqObj.query) reqObj.query = "";
	if (!reqObj.method) reqObj.method = "get";
	jQuery.ajax({
		url	 : reqObj.uri,
		type	: reqObj.method,
		data	: reqObj.query,
		dataType: reqObj.type,
		timeout : 15000,
		cache   : false,
		async   : true,
		beforeSend: function() {
			if (reqObj.loading) $(reqObj.loading).show();
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			reqObj.fnErr({
				"status":XMLHttpRequest.status,
				"text"  :textStatus,
				"thrown":errorThrown,
				"requri":reqObj.uri
			});
		},
		success: function(data) {
			reqObj.fnSuc(data);
		}
	});
}



/*=========================================================================
 general method
=========================================================================*/

/*
openWindow
------------------------------------------------------------------------------*/

function openWindow(url, target, width, height, options, moveFlag) {
	if (!target) target = '_blank';
	var optVariations = {
		'exampleTarget1' : 'toolbar=yes,location=yes,directories=yes,status=yes,menubar=yes,scrollbars=yes,resizable=yes',
		'exampleTarget2' : 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no'
	}
	options = options || optVariations[target] || '';
	width += (options.match('scrollbars=yes')) ? 16 : 0;
	if (width && height) options = 'width=' + width + ',height=' + height + (options ? ',' + options : '');
	var newWin = window.open(url, target, options);
	newWin.focus();
	if (moveFlag) newWin.moveTo(0, 0);
	if (window.event) window.event.returnValue = false;
	return newWin;
}

