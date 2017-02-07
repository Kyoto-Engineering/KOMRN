/* 正規表現に関する汎用関数 */
function checkValue(val, str){
	var txt = '' + val;
	var re = new RegExp(str);
	return (txt.match(re) ? true : false);
}
/* 配列に関する汎用関数 */
function array_push(arr,val){
	var num = arr.length;
	arr[num] = val;
	return arr;
}
/* onload処理 */
function class_onloadlib(){
	this.onloadFunc = new Array();
	this.addFunc = addFunc;
	this.exec = exec;
	this.completed = false;
	
	function addFunc(fn){
		this.onloadFunc = array_push(this.onloadFunc, fn);
	}
	function exec(){
		for(var i = 0; i < this.onloadFunc.length; i++){
			eval(this.onloadFunc[i]);
		}
		this.completed = true;
	}
}
var onload_obj = new class_onloadlib();
function onload_add(fn){
	onload_obj.addFunc(fn);
}
function onload_exec(fn){
	onload_obj.exec();
}
window.onload = onload_exec;
/* ウィンドウ&ロケーション */
function win_open(){
	if(arguments[0]){
		var url = arguments[0];
		var tgt = (arguments[1] ? arguments[1] : '_self');
		var prp = '';
		if(arguments.length > 3){
			var scroll = (arguments[2] ? 1 : 0);
			var resize = (arguments[3] ? 1 : 0);
			var width = (arguments[4] > 100 ? arguments[4] : 100);
			var height = (arguments[5] > 100 ? arguments[5] : 100);
			prp = 'toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=' + scroll + ',resizable=' + resize + ',width=' + width + ',height=' + height;
		}
		else if(arguments[2] != null){
			prp = arguments[2];
		}
		
		(arguments[2] ? arguments[2] : '');
		var newWin = new Object();
		if(prp) newWin = window.open(url,tgt,prp);
		else newWin = window.open(url,tgt);
		newWin.focus();
	}
}
/* イメージオブジェクト */
function class_imglib(){
	this.preloadImg = new Array();
	this.setObj = setObj;
	this.changeSrc = changeSrc;
	this.getTargetObj = getTargetObj;
	
	function setObj(pid,srcPath){
		this.preloadImg[pid] = new Image();
		this.preloadImg[pid].src = srcPath;
	}
	function getTargetObj(id){
		//return (document.getElementById(id) ? document.getElementById(id) : document.images[id]);
		return document.images[id];
	}
	function changeSrc(obj,pid){
		var id = (typeof(obj.id) != 'undefined' ? obj.id : obj);
		if(typeof(this.getTargetObj(id)) != 'undefined' && typeof(this.preloadImg[pid]) != 'undefined'){
			(this.getTargetObj(id)).src = this.preloadImg[pid].src;
		}
	}
}
var img_obj = new class_imglib();
function img_set(){
	img_obj.setObj(arguments[0],arguments[1]);
}
function img_change(){
	img_obj.changeSrc(arguments[0],arguments[1]);
}
function img_onmouseoverhandler(){
	img_obj.changeSrc(this.id,(this.id + ':mouseover'));
}
function img_onmouseouthandler(){
	img_obj.changeSrc(this.id,(this.id + ':mouseout'));
}
function img_sethandler(id,movr,mout){
	if(document.getElementById(id) != null){
		img_set(id + ':mouseover', movr);
		img_set(id + ':mouseout' , mout);
		document.getElementById(id).onmouseover = img_onmouseoverhandler;
		document.getElementById(id).onmouseout  = img_onmouseouthandler;
	}
}
/* クッキー */
function class_cookielib(){
	this.getCookie = getCookie;
	this.setCookie = setCookie;
	this.removeCookie = removeCookie;
	
	var expireDate = new Date();
	expireDate.setFullYear(expireDate.getFullYear()+1);
	expireStr = "expires=" + expireDate.toUTCString();

	function getCookie(name){
		var gc=name+"=";
		var Cookie=document.cookie;
		if (Cookie.length>0) {
			var start=Cookie.indexOf(gc);
			if (start!=-1) {
				start+=gc.length;
				terminus=Cookie.indexOf(";",start);
				if (terminus==-1) terminus=Cookie.length;
				return unescape(Cookie.substring(start,terminus));
			}
		}
		return '';
	}
	function setCookie(key,val,path) {
		if(!path){
			path = '/bizit/';
		}
		var sc = key + "=" + escape(val) + "; path=" + path + "; " + expireStr;
		document.cookie = sc;
	}
	function removeCookie(key,path) {
		if(!path){
			path = '/bizit/';
		}
		var rc = key + "=; path=" + path + "; expires=Thu, 1 Jan 1970 00:00:00 UTC";
		document.cookie = rc;
	}
}
/* CSSの振り分け */
var common_css_loc = new Array();
common_css_loc['default'] = '/resource/stylesheet/common/default.css';
common_css_loc['safari']  = '/resource/stylesheet/common/for_safari.css';
function css_setlink(){
	var cls = 'default';
	if(navigator.userAgent.match(/applewebkit/i) != null){
		cls = 'safari';
	}
	document.write('<link rel="stylesheet" type="text/css" href="' + common_css_loc[cls] + '" />');
}
/* NN4対策 */
function onresize_handler(){
	if(document.layers){
		window.location.reload();
	}
}
window.onresize = onresize_handler;

var nn_login = new Object();
nn_login.uri = '';
nn_login.width = 490;
nn_login.height = 31;
function setLoginLayer(uri, width, height){
	//NN4.X
	if(document.layers){
		nn_login.uri = uri;
		nn_login.width = width;
		nn_login.height = height;
	}
}
function outputLoginLayer(){
	//NN4.X
	if(document.layers && nn_login.uri != ''){
		//Height Adjust
		var px = document.layers['nn_login_pos'].pageX;
		var py = document.layers['nn_login_pos'].pageY;
		document.write('<layer name="nn_login" src="' + nn_login.uri + '" z-index="2" width="' + nn_login.width + '" height="' + nn_login.height + '" top="' + py + '" left="' + px + '" visibility="show" clip="0,0,' + nn_login.width + ',' + nn_login.height + '"></layer>');
	}
}

var httpsState = true;
function ad(texturl) {
	if (!httpsState) {
//		texturl = texturl.replace("https://", "http://");
		texturl = "/error/ssl_error.html";
	}
	location.href = texturl;
}

function ad_obj(obj) {
	if (!httpsState) {
		var str = obj.action;
//		obj.action = str.replace("https://", "http://");
		obj.action = "/error/ssl_error.html";
	}
}

function checkHttps(){
	httpsState = false;
}
function getHttpsState(){
	return(httpsState);
}

var reloadFlg = true;
function reloadAction(){
	if(parent.reloadFlg){
		location.reload();
		parent.reloadFlg = false;
	}
}

function iframe_reload(){
	var reload_location = top.opener.parent.login.location.pathname;
	top.opener.parent.login.location = reload_location;
}

var multiSrch = new Object();
multiSrch.selectedTab = 1;
multiSrch.outputTabs = function(){
	document.write('<table id="multi-srch-tabs" border="0" cellspacing="0" cellpadding="0"><tr>\
<td width="41"><img id="multi-srch-tab1" class="multi-srch-tab" onclick="multiSrch.selectTab(1);" src="/resource/image/index/multisrch_tab1_on.gif" border="0" width="37" height="14" alt="全体" /><\/td>\
<td width="41"><img id="multi-srch-tab2" class="multi-srch-tab" onclick="multiSrch.selectTab(2);" src="/resource/image/index/multisrch_tab2.gif" border="0" width="37" height="14" alt="商品" /><\/td>\
<td width="41"><img id="multi-srch-tab3" class="multi-srch-tab" onclick="multiSrch.selectTab(3);" src="/resource/image/index/multisrch_tab3.gif" border="0" width="37" height="14" alt="終了品" /><\/td>\
<td width="37"><img id="multi-srch-tab4" class="multi-srch-tab" onclick="multiSrch.selectTab(4);" src="/resource/image/index/multisrch_tab4.gif" border="0" width="37" height="14" alt="FAQ" /><\/td>\
<\/tr><\/table>');
}

multiSrch.selectTab = function(num){
	var tabId = 'multi-srch-tab' + num;
	if(multiSrch.selectedTab != 0){
		var oldTabObj = new Object();
		if(oldTabObj = document.getElementById('multi-srch-tab' + multiSrch.selectedTab)){
			oldTabObj.src = '/resource/image/index/multisrch_tab' + multiSrch.selectedTab + '.gif';
			multiSrch.selectedTab = 0;
		}
	}
	var tabObj = new Object();
	if(tabObj = document.getElementById(tabId)){
		tabObj.src = '/resource/image/index/multisrch_tab' + num + '_on.gif';
		multiSrch.selectedTab = num;
	}
	var formObj = document.getElementById('multi-srch-form');
	var inputObj = document.getElementById('multi-srch-input');
	var hiddenInputs = document.getElementById('multi-srch-hidden');
	if(num == 1){
		formObj.action = 'http://search.fa.omron.co.jp/search';
		formObj.method = 'get';
		inputObj.name = 'q';
		hiddenInputs.innerHTML = '<input type="hidden" name="output" value="xml_no_dtd" \/>\
<input type="hidden" name="ie" value="Shift_JIS" \/>\
<input type="hidden" name="oe" value="Shift_JIS" \/>\
<input type="hidden" name="filter" value="0" \/>\
<input type="hidden" name="num" value="20" \/>\
<input type="hidden" name="client" value="iweb" \/>\
<input type="hidden" name="proxystylesheet" value="iweb" \/>\
<input type="hidden" name="site" value="iweb" \/>\
<input type="hidden" name="closed" value="0" \/>';
	}
	else if(num == 2){
		formObj.action = '/search/product/search.cgi';
		formObj.method = 'get';
		inputObj.name = 'keyword';
		hiddenInputs.innerHTML = '';
	}
	else if(num == 3){
		formObj.action = 'http://search.fa.omron.co.jp/search';
		formObj.method = 'get';
		inputObj.name = 'q';
		hiddenInputs.innerHTML = '<input type="hidden" name="output" value="xml_no_dtd" \/>\
<input type="hidden" name="ie" value="Shift_JIS" \/>\
<input type="hidden" name="oe" value="Shift_JIS" \/>\
<input type="hidden" name="filter" value="0" \/>\
<input type="hidden" name="num" value="20" \/>\
<input type="hidden" name="client" value="iweb" \/>\
<input type="hidden" name="proxystylesheet" value="iweb" \/>\
<input type="hidden" name="site" value="iweb_closed" \/>\
<input type="hidden" name="closed" value="1" \/>';
	}
	else if(num == 4){
		formObj.action = '/search/faq/search.cgi';
		formObj.method = 'get';
		inputObj.name = 'keyword';
		hiddenInputs.innerHTML = '';
	}
}
