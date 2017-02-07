function XmlHttp(){
    this.initialize.apply(this, arguments);
}
XmlHttp.prototype = {
	initialize: function(){
		this.name = "xmlhttp";
		this.isXHR = (window.XMLHttpRequest ? true : false);
		this.isWinIE = (navigator.userAgent.match(/MSIE.+Windows/) ? true : false);
		this.isWinSafari = (navigator.userAgent.match(/Windows.+AppleWebKit/) ? true : false);
		this.isSafari = (!this.isWinSafari && navigator.userAgent.match(/AppleWebKit/) ? true : false);
		this.isMozilla = (!this.isWinSafari && !this.isSafari && navigator.userAgent.match(/Gecko/) ? true : false);
		this.isOpera = (navigator.userAgent.match(/Opera/) ? true : false);
		this.req = new Array();
		this.res = new Array();
		this.dateObj = new Date();
		
	},
	newRequest : function(){
			var obj = null;
			if (window.XMLHttpRequest) {
				obj = new XMLHttpRequest();
			}
			else 
				if (window.ActiveXObject) {
					try {
						obj = new ActiveXObject("Msxml2.XMLHTTP");
					} 
					catch (e) {
						try {
							obj = new ActiveXObject("Microsoft.XMLHTTP");
						} 
						catch (e) {
						}
					}
				}
			return obj;
		},
		
	loadDoc : function(url){
			var xmlhttpobj = this;
			this.req[url] = new this.newRequest();
			if (this.req[url] != null) {
				this.req[url].onreadystatechange = function(){
					xmlhttpobj.processReqChange(url);
				};
				var requrl = url + (url.indexOf('?') > -1 ? '&' : '?') + 't=' + this.dateObj.getTime();
				this.req[url].open("GET", requrl, true);
				if (this.isWinIE) {
					this.req[url].send();
				}
				else {
					this.req[url].send(null);
				}
			}
		},
		processReqChange : function(url){
				if (this.req[url].readyState == 4) {
				if (this.req[url].status < 400) {
					try {
						this.res[url].XML = this.req[url].responseXML;
						var objXml = this.req[url].responseXML;
						this.res[url].exec();
					} 
					catch (e) {
					}
					delete this.req[url];
				}
			}
		}
}

function Suggest(){
    this.initialize.apply(this, arguments);
}

Suggest.prototype = {
	initialize: function(thisObjName, inputTextID, otherInputTextID, suggestSwitchID,suggestSwitchAreaID, b5suggestID, b7suggestID, idPrefix,footerFlg,b7suggestFlg,otherSuggestCheckBoxID){
		 
		this.name = thisObjName;
		this.xmlhttp = new XmlHttp();
		this.maxItems = 10;
		this.timerLimit = 300;
		
		this.inputTextID = inputTextID;
		this.otherInputTextID = otherInputTextID;
		this.suggestSwitchAreaID = suggestSwitchAreaID;
		this.suggestSwitchID = suggestSwitchID;
		this.b5suggestID = b5suggestID;
		this.b7suggestID = b7suggestID;
		this.idPrefix = idPrefix;
		this.footerFlg = footerFlg;
		if (typeof(b7suggestFlg) != 'undefined' && b7suggestFlg === true){
			this.onlyB7SuggestFlg = true;
		} else {
			this.onlyB7SuggestFlg = false;
		}
		this.otherSuggestCheckBoxID = otherSuggestCheckBoxID;
		this.itemUrl = new Array();
		this.inputValue = '';
		this.lastInputValue = '';
		this.selectedB5 = '';
		this.selectedB5num = '';
		this.scrollCount = 0;
		this.focusedItem = {
			'b5': -1,
			'b7': -1
		};
		this.suggestListCnt = {
			'b5': -1,
			'b7': -1
		};
		this.IsOnmouseKeyword = 0;
		this.IsOnmouseB5 = 0;
		this.IsOnmouseB7 = 0;
		this.IsSuggestEnableArea = 0;
		
		this.b5ItemArray = new Array();
		this.focused = '';  // now selected suggest panel
		this.timerObj = null;
		this.suggestEnable = true;
		this.forceUpdate = false;
		
		this.Host = window.location.protocol + '//' + window.location.hostname ;
		
	},
	createB5Url : function(start,input){
		var url = '/teeda.ajax?component=suggestSearch&action=searchB5'
			+ '&length=' + this.maxItems 
			+ '&input=' + input
			+ '&start=' + (start+1);	
		return url;
	},
	createB7Url : function(start,b5id,input){
		var url =  '/teeda.ajax?component=suggestSearch&action=searchB7'
			+ '&length=' + this.maxItems 
			+ '&b5id=' + b5id
			+ '&start=' + (start+1)
			+ (typeof(input) == 'undefined' ? '' : '&input=' + input);
		return url;
	},
	timerTerm : function(){
		var num = this.focusedItem["b5"];
		if (num == -1 || num === this.selectedB5num || this.focused == 'b7') {
			return;
		}
		var lid = this.idPrefix + 'suggest-b5-' + this.selectedB5num;
		var lobj = new Object();
		if (lobj = document.getElementById(lid)) {
			lobj.className = '';
		}
		if (typeof(this.b5ItemArray[num]) == 'undefined') {
			return;
		}
		this.selectedB5num = num;
		var b5id = this.b5ItemArray[num].b5id;
		var name = this.b5ItemArray[num].name;
		this.selectedB5 = b5id;
		this.setInputValue(name, 1);
		this.loadB7(b5id + "_@_" + this.inputValue, 0, false);
	},
	checkValue : function(val, str){
		val = ('' + val).toLowerCase();
		str = ('' + str).toLowerCase();
		return (val.indexOf(str) > -1 ? true : false);
	} ,
	getNodeValue : function(obj, id){
		var nod = null;
		if (nod = obj.getElementsByTagName(id)) {
			return nod[0].firstChild.nodeValue;
		}
		return nod;
	},
	getSuggestEnable : function(){
		if (this.getCookie('SuggestEnable') == '0') {
			document.getElementById(this.inputTextID).setAttribute("autocomplete", "on");
			if (this.otherInputTextID != "") {
				document.getElementById(this.otherInputTextID).setAttribute("autocomplete", "on");
			}
			document.getElementById(this.suggestSwitchID).checked = false;
			this.suggestEnable = false;
		}
		else {			
			document.getElementById(this.inputTextID).setAttribute("autocomplete", "off");
			if (this.otherInputTextID != "") {
				document.getElementById(this.otherInputTextID).setAttribute("autocomplete", "off");
			}
			document.getElementById(this.suggestSwitchID).checked = true;
			this.suggestEnable = true;
		}
	},
	setSuggestEnable : function(){
		if (document.getElementById(this.suggestSwitchID).checked) {
			if(typeof(this.otherSuggestCheckBoxID) !='undefined' && this.otherSuggestCheckBoxID!=null){
				document.getElementById(this.otherSuggestCheckBoxID).checked = true;
			}
			document.getElementById(this.inputTextID).setAttribute("autocomplete", "off");
			if (this.otherInputTextID != "") {
				document.getElementById(this.otherInputTextID).setAttribute("autocomplete", "off");
			}
			this.setCookie('SuggestEnable', '1', '/');
			this.suggestEnable = true;
			this.checkInput(2);
			if (this.onlyB7SuggestFlg == false) {
				this.updateB5(this.inputValue, 0);
			}else{
				this.checkInputForB7(2);
			}
		}
		else {
			if(typeof(this.otherSuggestCheckBoxID) !='undefined' && this.otherSuggestCheckBoxID!=null){
				document.getElementById(this.otherSuggestCheckBoxID).checked = false;
			}
			document.getElementById(this.inputTextID).setAttribute("autocomplete", "on");
			if (this.otherInputTextID != "") {
				document.getElementById(this.otherInputTextID).setAttribute("autocomplete", "on");
			}
			this.setCookie('SuggestEnable', '0', '/');
			this.suggestEnable = false;
			this.resetB5();
		}
	},
	outputSearchForm : function(){
		var suggest = this;
		if(suggest.xmlhttp.isXHR || suggest.xmlhttp.isWinIE){
			suggest.getSuggestEnable();
			document.getElementById(this.suggestSwitchID).onclick = function(){
				suggest.setSuggestEnable();
			}			
			if(suggest.onlyB7SuggestFlg === false) {
				if(suggest.xmlhttp.isMozilla || suggest.xmlhttp.isOpera || suggest.xmlhttp.isSafari) {
					document.getElementById(this.inputTextID).onkeypress = function(event){
						return suggest.checkKey(event);
					}
				}else{
					document.getElementById(this.inputTextID).onkeydown = function(){
						return suggest.checkKey(event);
					}
				}
				document.getElementById(this.inputTextID).onkeyup = function(){
					return suggest.checkInput(0);
				}
			}else{
				if(suggest.xmlhttp.isMozilla || suggest.xmlhttp.isOpera || suggest.xmlhttp.isSafari){
					document.getElementById(this.inputTextID).onkeypress = function(event){
						return suggest.checkKeyForB7(event);
					}
				}else{
					document.getElementById(this.inputTextID).onkeydown = function(){
						return suggest.checkKeyForB7(event);
					}
				}
				document.getElementById(this.inputTextID).onkeyup = function(){
					return suggest.checkInputForB7(0);
				}				
			}
			if (this.b5suggestID != null && document.getElementById(this.b5suggestID) != null) {
				document.getElementById(this.b5suggestID).onclick = function(){
					document.getElementById(suggest.inputTextID).focus();
				}
			}
			document.getElementById(this.b7suggestID).onclick = function(){
				document.getElementById(suggest.inputTextID).focus();
			}
			if (this.b5suggestID != null && document.getElementById(this.b5suggestID) != null) {
				document.getElementById(this.b5suggestID).onmouseover = function(){
					suggest.IsOnmouseB5 = 1;
				}
				document.getElementById(this.b5suggestID).onmouseout = function(){
					suggest.IsOnmouseB5 = 0;
				}
			}
			document.getElementById(this.b7suggestID).onmouseover = function(){
				suggest.IsOnmouseB7 = 1;
			}
			document.getElementById(this.b7suggestID).onmouseout = function(){
				suggest.IsOnmouseB7 = 0;
			}
			document.getElementById(this.inputTextID).onmouseover = function(){
				suggest.IsOnmouseKeyword = 1;
			}
			document.getElementById(this.inputTextID).onmouseout = function(){
				suggest.IsOnmouseKeyword = 0;
			}
			document.getElementById(this.suggestSwitchAreaID).onmouseover = function(){
				suggest.IsSuggestEnableArea = 1;
			}
			document.getElementById(this.suggestSwitchAreaID).onmouseout = function(){
				suggest.IsSuggestEnableArea = 0;
			}
			document.getElementById(this.inputTextID).onfocus = function(){
				if (suggest.onlyB7SuggestFlg == true){
					if(document.getElementById(suggest.b7suggestID).style.display == 'none'){
						suggest.checkInputForB7(2);
					}
				} else {
					if (document.getElementById(suggest.b5suggestID).style.display == 'none'){
						suggest.checkInput(2);
					}
				}
				return true;
			}
			if (window.addEventListener) {
				document.addEventListener('mousedown', function(){
					if (suggest.IsOnmouseB5 == 0 && suggest.IsOnmouseB7 == 0 && suggest.IsOnmouseKeyword == 0 && suggest.IsSuggestEnableArea == 0) {						
						suggest.lastInputValue='';
						suggest.resetB5();
					}
				}, false);
			} else {
				//IE
				document.attachEvent('onmousedown',function(){
					if (suggest.IsOnmouseB5 == 0 && suggest.IsOnmouseB7 == 0 && suggest.IsOnmouseKeyword == 0 && suggest.IsSuggestEnableArea == 0) {
						suggest.lastInputValue='';
						suggest.resetB5();
					}
					}
				);
			}
		}
	},
	setListHtml : function(param, listItems){
		var type = param['type'];
		var updateFunc = param['updateFunc'];
		var resetFunc = param['resetFunc'];
		var start = param['start'];
		var totalItem = param['totalItem'];
		var input = param['input'];
		var tgt = this.b5suggestID;
		if (type != 'b5') {
			tgt = this.b7suggestID;
		}
		var prev = start - this.maxItems;
		var next = start + this.maxItems;
		var htmlElementHead = '';
		var htmlElementBody = '';
		var htmlElement = '';
		
		htmlElementHead += '<p>';
		if (type == 'b5') {
			htmlElementHead += '<span class="count"><em>Catalogue<\/em> ';
			this.b5ItemArray = new Array();
		}
		else {
			htmlElementHead += '<span class="count"><em>Item<\/em> ';
		}
		if (totalItem > 0) {
			htmlElementHead += start + 1;
			end = start + this.maxItems;
			if (totalItem < end) {
				end = totalItem;
			}
			htmlElementHead += ' - ';
			htmlElementHead += end;
			htmlElementHead += ' of ';
		}
		htmlElementHead += totalItem;
		htmlElementHead += '<\/span>';
		
		htmlElementHead += '<span class="navi">';
		
		if (start > 0) {
			//prev
			htmlElementHead += '<span class="on" id="' + this.idPrefix + 'suggest-' + type + '-prev"' + ' onclick="' + updateFunc + '(\'' + input + '\', ' + prev + ');"><img class="iconA01" src="/common/img/icon_12.gif" alt="" height="9" width="3" />Prev 10<\/span>';
		}
		else {
			htmlElementHead += '<span>Prev 10<\/span>';
		}
		htmlElementHead += '&nbsp;&nbsp;';
		if (typeof(end) != "undefined" && totalItem > end) {
			//next
			htmlElementHead += '<span class="on" id="' + this.idPrefix + 'suggest-' + type + '-next"' + ' onclick="' + updateFunc + '(\'' + input + '\', ' + next + ');">Next 10<img class="iconA02" src="/common/img/icon_01.gif" alt="" height="9" width="3" /><\/span>';
		}
		else {
			htmlElementHead += '<span>Next 10<\/span>';
		}
		htmlElementHead += '<\/span>';
		htmlElementHead += '<\/p>';
		
		var ulclass = 'digit1';
		if (typeof(end) != "undefined" && end >= 1000) {
			ulclass = 'digit4';
		}
		else 
			if (typeof(end) != "undefined" && end >= 100) {
				ulclass = 'digit3';
			}
			else 	if (typeof(end) != "undefined" && end >= 10) {
					ulclass = 'digit2';
			}
		htmlElementBody += '<ul class="' + ulclass + '">';
		this.suggestListCnt[type] = listItems.length;
		if (listItems.length > 0) {
			for (var i = 0; i < listItems.length; i++) {
				var id = listItems[i]['id'];
				var itemLeft = listItems[i]['itemLeft'];
				var itemRight = listItems[i]['itemRight'];
				var selectFunc = listItems[i]['selectFunc'];
				var listNum = i;
				var itemNum = start + i + 1;
				htmlElementBody += '<li id="' + this.idPrefix + 'suggest-' +
				type +
				'-' +
				listNum +
				'" class="suggest-link" onclick="' +
				selectFunc +
				'" onmouseover="' + this.name + '.focusItem(\'' +
				type +
				'\',' +
				listNum +
				',\'view\');" onmouseout="' + this.name + '.focusItem(\'' +
				type +
				'\',-1,\'view\');"><span class="col1">' +
				itemNum +
				'.</span><span class="col2">' +
				itemLeft +
				'<\/span>';
				if (itemRight != '') {
					htmlElementBody += '<span class="col3">' + itemRight + '<\/span>';
				}
				htmlElementBody += '<\/li>';
				if (type == 'b5') {
					this.b5ItemArray[listNum] = new Object();
					this.b5ItemArray[listNum].b5id = id;
					this.b5ItemArray[listNum].name = itemLeft;
				}
			}
		}
		else {
			htmlElementBody += '<li><span class="col4">No match<\/span><\/li>';
			this.resetB7();
		}
		htmlElementBody += '<\/ul>';
		if (!this.footerFlg){
			htmlElement = htmlElementHead + htmlElementBody;
		} else {
			htmlElement = htmlElementBody + htmlElementHead ;
		}
		document.getElementById(tgt).innerHTML = htmlElement;
		document.getElementById(tgt).style.display = '';
	},
	setBlankHtml : function(type){
		var tgt = this.b5suggestID
		if (type == 'b7') {
			tgt = this.b7suggestID;
		}
		this.focusItem(type, -1);
		if (tgt !=null && typeof(document.getElementById(tgt)) != 'undefined') {
			document.getElementById(tgt).innerHTML = '';
			document.getElementById(tgt).style.display = 'none';
		}
	},
	loadB5 : function(key, start, input, updateFlag){
		var _suggestObj = this;
		if (typeof(start)=='undefined') {
			start = 1;
		}
		var url = this.createB5Url(start, input);

		this.itemUrl[key] = url;
		this.xmlhttp.res[url] = new Object();
		if (updateFlag) {
			this.xmlhttp.res[url].exec = function(){
				_suggestObj._updateB5(key);
			};
		}
		else {
			this.xmlhttp.res[url].exec = function(){
				void (0);
			};
		}
		this.xmlhttp.loadDoc(url);
	},
	updateB5 : function(input, start){
		if( !document.getElementById(this.suggestSwitchID).checked){
			return true;
		}
		if (this.selectedB5 != '') {
			this.resetB7();
		}
		if (input == '') {
			this.resetB5();
			return void (0);
		}
		var key = input + '_@_' + start;
		if (typeof(this.itemUrl[key]) == 'undefined') {
			this.loadB5(key, start, input, 1);
			this.selectedB5num='';
		}
		else {
			this._updateB5(key);
			this.selectedB5num='';
		}
		document.getElementById(this.inputTextID).focus();
	},
	_updateB5 : function(key){
		var url = this.itemUrl[key];
		var tmp = key.split('_@_');
		var input = tmp[0];
		var start = 1 * tmp[1];
		var id = '';
		var name = '';
		var volume = '';
		var volumeLavel = 'Items';
		if (typeof(this.xmlhttp.res[url].XML) != 'object') {
			return void (0);
		}
		var input_text = this.getNodeValue(this.xmlhttp.res[url].XML, 'input-text');
		var formInput = document.getElementById(this.inputTextID);
		formInput = formInput.value.toLowerCase();
		if( formInput != input_text){
			return false;
		}
		var items = this.xmlhttp.res[url].XML.getElementsByTagName("b5");
		var listCats = new Array();
		var totalItem = 0;
		if (items.length > 0) {
			var limit = (items.length < this.maxItems ? items.length : this.maxItems);
			totalItem = this.getNodeValue(this.xmlhttp.res[url].XML, 'total-cnt');
			for (var i = 0; i < limit; i++) {
				id = this.getNodeValue(items[i], 'b5id');
				name = this.getNodeValue(items[i], 'name');
				volume = this.getNodeValue(items[i], 'b7-volume');
				
				var linkurl = this.Host + '/view/log/redirect/suggestsearch/index.cgi?'
							+ 'url=' + this.Host + '/product/family/' + id + '/index_fea.html&'
							+ 'keyword=' + formInput + '&'
							+ 'id=' + id + '&'
							+ 'kind=B5';
				
				if (volume == 1) {
					volumeLavel = volume + 'Item';
				} else if (volume <= 0){
					volumeLavel = '---';
				} else {
					volumeLavel = volume + 'Items';
				}
				listCats[i] = {
					'id': id,
					'itemLeft': name,
					'itemRight': volumeLavel,
					'selectFunc': ('' + this.name + '.selectB5(\'' + linkurl + '\');')
				};
			}
		}
		var param = {
			'type': 'b5',
			'updateFunc': '' + this.name + '.updateB5',
			'resetFunc': '' + this.name + '.resetB5',
			'start': start,
			'totalItem': totalItem,
			'input': input
		};
		this.setListHtml(param, listCats);

		var nextStart = start + this.maxItems;
		var nextKey = input + '_@_' + nextStart;
		while(typeof(this.itemUrl[nextKey]) == 'undefined') {
			this.loadB5(nextKey, nextStart, input, 0);
			if( totalItem < nextStart ){
				break;
			}
			nextStart = nextStart + this.maxItems;
			nextKey = input + '_@_' + nextStart;
		}
	
		if(start == 0 && listCats.length == 1){
			this.forceUpdate = true;
			this.loadB7(id + '_@_' + input,0);
		}else{
			this.focusedItem['b5'] = -1;
		}
	},
	resetB5 : function(){
		this.resetB7();
		this.setBlankHtml('b5');
		this.focused='';
	},
	selectB5 : function(linkurl){
		document.location.href = linkurl;
	},
	loadB7 : function(key, start){
		var tmp = key.split('_@_');
		var b5id = tmp[0];
		var input = tmp[1];
		var newKey = b5id + "_@_" + input + "_@_" + start;
		if (typeof(this.itemUrl[newKey]) == 'undefined') {
			var url = this.createB7Url(start,b5id,input);
			this.itemUrl[newKey] = url;
			this.xmlhttp.res[url] = new Object();
			this.xmlhttp.res[url].key = newKey;
			var _suggestObj = this;
			this.xmlhttp.res[url].exec = function(){
				_suggestObj.updateB7(this.key, start);
			};
			this.xmlhttp.loadDoc(url);
		}
		else {
			this.updateB7(newKey, start);
		}
	},
	loadB7ForB7 : function(start){
		var b5id = document.getElementById("suggest_param_id").getAttribute("content");
		var input = document.getElementById(this.inputTextID).value;
		var key = b5id + "_@_" + input + "_@_" + start;
		this.forceUpdate = true;
		if (typeof(this.itemUrl[key]) == 'undefined') {
			var url = this.createB7Url(start,b5id,input);
			this.itemUrl[key] = url;
			this.xmlhttp.res[url] = new Object();
			this.xmlhttp.res[url].key = key;
			var _suggestObj = this;
			this.xmlhttp.res[url].exec = function(){
				_suggestObj.updateB7(this.key, start);
			};
			this.xmlhttp.loadDoc(url);
		}
		else {			
			this.updateB7(key, start);
		}
	},
	updateB7: function(key, start, force){
		var req_b5id = this.selectedB5;
		var url = this.itemUrl[key];
		if (typeof(this.xmlhttp.res[url].XML) != 'object') {
			return void (0);
		}				
		var items = this.xmlhttp.res[url].XML.getElementsByTagName("b7");
		var listItems = new Array();
		var nextItem = 0;
		var totalItem = this.getNodeValue(this.xmlhttp.res[url].XML, 'total-cnt');
		
		var input_text = this.getNodeValue(this.xmlhttp.res[url].XML, 'input-text');
		var formInput = document.getElementById(this.inputTextID);
		formInput = formInput.value.toLowerCase();
		
		
		var res_b5id = this.getNodeValue(this.xmlhttp.res[url].XML, 'b5id');
		if (!this.forceUpdate) {
			if (req_b5id != res_b5id) {
				return false;
			}
		}
		
		if (items.length > 0) {
			var limit = this.maxItems + start;
			var i = 0;
			for (var j = 0; j < items.length; j++) {
				var name = this.getNodeValue(items[j], 'name');
				var b7id = this.getNodeValue(items[j], 'b7id');
				b7id = b7id.toLowerCase();
				
				var linkurl = this.Host + '/view/log/redirect/suggestsearch/index.cgi?'
							+ 'url=' + this.Host + '/product/item/' + b7id + '/index.html&'
							+ 'keyword=' + formInput + '&'
							+ 'id=' + b7id + '&'
							+ 'kind=B7';
	
				listItems[j] = {
					'itemLeft': name,
					'itemRight': '',
					'selectFunc': ('' + this.name + '.selectB7(\'' + linkurl + '\');')
				};
			}
		}
		var param = {
			'type': 'b7',
			'updateFunc': '' + this.name + '.loadB7',
			'resetFunc': '' + this.name + '.resetB7',
			'start': start,
			'totalItem': totalItem,
			'input': key
		};
		this.setListHtml(param, listItems);
		if (this.focused == 'b7') {
			this.focusItem('b7', 0, 'view');
		}
		document.getElementById(this.inputTextID).focus();
	},
	selectB7 : function(linkurl){
		document.location.href = linkurl;
	},
	resetB7 : function(){
		this.selectedB5 = '';
		this.setBlankHtml('b7');
		this.focused='b5';
	},
	checkInput : function(action){
		if (!this.suggestEnable && !document.getElementById(this.suggestSwitchID).checked){
			return true;
		}
		
		var suggestInput = document.getElementById(this.inputTextID);
		var input = suggestInput.value;
		if (input ==''){
			this.resetB5();
		}
		var flag = false;
		if (action == 2) {
			flag = true;
		}
		else 
			if (this.inputValue != input) {
				if (action || !input.match(/[^ -~]/)) {
					flag = true;
				}
			}
		if (flag) {
			if (this.lastInputValue != input){
				this.lastInputValue = input;
				this.inputValue = input;
				this.resetB7();
				this.updateB5(this.inputValue, 0,'view');
			}
			if (this.selectedB5 != '') {
				if (this.lastSelectedB5 != this.selectedB5) {
					this.lastSelectedB5 = this.selectedB5;
					this.updateB7(this.selectedB5 + "_@_" + input, 0);
				}
			}			
		}		
	},
	checkInputForB7 : function(action){
		if (!this.suggestEnable) {
			return true;
		}
		var suggestInput = document.getElementById(this.inputTextID);
		var input = suggestInput.value;
		if (input ==''){
			this.resetB7();
		}
		var flag = false;
		if (action == 2) {
			flag = true;
		}else if (this.inputValue != input) {
			if (action || !input.match(/[^ -~]/)) {
				flag = true;
			}
		}
		if (flag) {
			this.inputValue = input;			
			if (input != '') {
				this.loadB7ForB7(0);
			}
		}		
	},
	checkKey : function(ev){
		if (!this.suggestEnable) {
			return true;
		}
		this.timerObj = null;
		var fitem = this.focusedItem[this.focused];
		if (this.focused ==''){
			fitem =-1;
		}
		if (ev.keyCode == 13) { 
			if ((typeof(this.selectedB5num)=='undefined' || this.selectedB5num=='' || this.selectedB5num < 0) &&
				(typeof(this.focusedItem[this.focused])=='undefined' || this.focusedItem[this.focused]==-1)) {				
				return true;
			}
			else {
				var currentItem = fitem;
				var focused = this.focused;
				if (currentItem==-1){
					currentItem = this.selectedB5num;
					focused = 'b5';
				}
				var res = this.selectItem(focused, currentItem);
				if (!res) {
					this.checkInput(2);
				}
				return false;
			}
		}else if (this.focused == 'b5' && fitem > -1 && (ev.keyCode == 39 || ev.keyCode == 63235)) { 
			if (this.suggestListCnt['b7'] > 0) {
				this.focusItem('b7', 0);
			}
		}else if (ev.keyCode == 27 || (fitem > -1 && (ev.keyCode == 37 || ev.keyCode == 63234))) {
			if (this.focused == 'b5') {
				return true;
			}else{
				this.focusItem('b7', -1);
				this.focusItem('b5', this.focusedItem['b5']);
			}
			return false;
		}else if (ev.keyCode == 38 || ev.keyCode == 40 || ev.keyCode == 63232 || ev.keyCode == 63233) {						
			if (this.xmlhttp.isSafari) {
				this.scrollCount += 1;
				if (this.scrollCount % 2 == 0) {
					return void (0);
				}
			}
			var num;
			if (this.footerFlg && fitem == -1 && this.selectedB5num=='' && (ev.keyCode == 38 || ev.keyCode == 63232)) {
				num = fitem + 1;
			}else {	
				if (fitem==-1 && this.selectedB5num!=''){
					fitem = this.selectedB5num;
				}						
				num = fitem + ((ev.keyCode == 40 || ev.keyCode == 63233) ? 1 : -1);
			}
			var tgt = this.focused;
			if (typeof(tgt) == 'undefined' || tgt =='') {
				tgt = 'b5';
			}
			var res = this.focusItem(tgt, num, 'view');
			if (!res) {
				this.selectItem(this.focused, ((ev.keyCode == 40 || ev.keyCode == 63233) ? 'next' : 'prev'));							
				this.focusItem(tgt, (ev.keyCode == 40 || ev.keyCode == 63233) ? 0 : this.suggestListCnt[tgt] -1 , 'view');
			}
			return false;
		}else {
			return true;
		}
	},
	checkKeyForB7 : function(ev){
		if (!this.suggestEnable) {
			return true;
		}
		this.timerObj = null;
		var fitem = this.focusedItem['b7'];
		if (this.focused ==''){
			fitem =-1;
		}
		if (ev.keyCode == 13) { 
			if (fitem==-1){
				return true;
			} else {
				var res = this.selectItem('b7', fitem);
				if (!res) {
					this.checkInputForB7(2);
				}
				return false;
			}			
		}else if(ev.keyCode == 38 || ev.keyCode == 40 || ev.keyCode == 63232 || ev.keyCode == 63233) {
			if (this.xmlhttp.isSafari) {
				this.scrollCount += 1;
				if (this.scrollCount % 2 == 0) {
					return void (0);
				}
			}
			var num = fitem + ((ev.keyCode == 40 || ev.keyCode == 63233) ? 1 : -1);
			var tgt = 'b7';
			if (typeof(tgt) == 'undefined' || tgt == '') {
				tgt = 'b7';
			}
			var res = this.focusItem(tgt, num, 'view');
			if (!res) {
				this.selectItem(this.focused, ((ev.keyCode == 40 || ev.keyCode == 63233) ? 'next' : 'prev'));
				this.focusItem(tgt, (ev.keyCode == 40 || ev.keyCode == 63233) ? 0 : this.suggestListCnt[tgt] - 1, 'view');
			}
			return false;
		}else {
			return true;
		}			
				
	},
	focusItem : function(ctg, num, viewflg){
		var res = false;
		var lid = '';
		var lobj = new Object();
		var b5lid = '';
		var b5lobj = new Object();
		this.focused = ctg;

		var i;
		for(i=0;i<10;i++){
			if (!(ctg == 'b5' && this.selectedB5num == i)) {
				lid = this.idPrefix + 'suggest-' + ctg + '-' + i;
				if (lobj = document.getElementById(lid)) {
					if (typeof(lobj) != 'undefined') {
						lobj.className = '';
					}
				}
			}
		}
		lid = this.idPrefix + 'suggest-' + ctg + '-' + num;
		if (lobj = document.getElementById(lid)) {
			if (typeof(lobj) != 'undefined') {
				lobj.className = 'stay';
				if( (this.selectedB5num != undefined || this.selectedB5num != "" || this.selectedB5num >= 0) && ctg == 'b7' && this.idPrefix != ""){
					b5lid = this.idPrefix + 'suggest-b5-' + this.selectedB5num;
					if (b5lobj = document.getElementById(b5lid)) {
						b5lobj.className = 'active';
					}
				}			}
			res = true;
		}
		else {
			num = -1;
		}
		this.focusedItem[ctg] = num;
		
		if (ctg == 'b5' && num > -1 && typeof(viewflg) != 'undefined') {
			if (this.timerObj != "not timer"){
				clearTimeout(this.timerObj);
			}				
			var _suggestObj = this;
			this.timerObj = setTimeout(function(){
			_suggestObj.timerTerm();
			} , this.timerLimit);
		}
		
		return res;
	},
	selectItem : function(ctg, num){
		var res = false;
		var lid = this.idPrefix + 'suggest-' + ctg + '-' + num;
		var lobj = new Object();
		if (lobj = document.getElementById(lid)) {
			if (typeof(lobj.onclick) != 'undefined') {
				lobj.onclick();
				res = true;
			}
		}
		return res;
	},
	setInputValue : function(value, inputFlag){
		var suggestInput = document.getElementById(this.inputTextID);
		var input = suggestInput.value;
		suggestInput.focus();
	},
	getCookie : function(name){
		var gc = name + "=";
		var Cookie = document.cookie;
		if (Cookie.length > 0) {
			var start = Cookie.indexOf(gc);
			if (start != -1) {
				start += gc.length;
				terminus = Cookie.indexOf(";", start);
				if (terminus == -1) 
					terminus = Cookie.length;
				return unescape(Cookie.substring(start, terminus));
			}
		}
		return '';
	},
	setCookie : function(key, val, path){
		if (!path) {
			path = '/';
		}
		var exp = new Date();
		exp.setYear(exp.getYear() + 1901);
		var sc = key + "=" + escape(val) + "; path=" + path + ";expires=" + new Date(exp).toUTCString() + ";";
		document.cookie = sc;
	}
	

	
	

}
