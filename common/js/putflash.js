/*______________________________________

	putFlash Version 0.8 r20
	Last updated on 2008-10-17

______________________________________*/


var secure = (location.protocol && location.protocol.indexOf('https') == 0);

var pluginspages = new Array();
pluginspages[0] = (secure ? 'https' : 'http') + "://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash"; // English
pluginspages[1] = (secure ? 'https' : 'http') + "://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash&Lang=Japanese"; // Japanese

var pluginVer = 0;

function pfAltAction(Obj) {
	if (Obj.nonflashSW == 1) location.href = Obj.nonFlashSRC;
	return Obj.nonFlashSRC;
}

function pfAltContent(Obj) {
	if (Obj.nonflashSW == 1) return "";
	return Obj.nonFlashSRC;
}


function pfFlashPlayerMeetRequiredVersion(requiredVer) {
	var plugin = (navigator.mimeTypes && navigator.mimeTypes["application/x-shockwave-flash"]) ?
		navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin : null;
	if (plugin) {
		if (plugin.description.match(/([0-9]+)\./)) {
			pluginVer = parseInt(RegExp.$1);
		}
	} else {
		// for Win MSIE
		if (!arguments.callee.__alreadyExecuted___) {
			arguments.callee.__alreadyExecuted___ = true;
			document.writeln('<script type="text/vbscript">');
			document.writeln('On Error Resume Next');
			document.writeln('Private swfEnableFlag');
			document.writeln('swfEnableFlag = false');
			document.writeln('swfEnableFlag = IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash.' + requiredVer + '"))');
			document.writeln('If swfEnableFlag Then');
			document.writeln('pluginVer = ' + requiredVer);
			document.writeln('End If');
			document.writeln('</script>');
		}
	}
	return (pluginVer >= requiredVer);
}


function putflash (Obj) {
	if (!Obj.dir) Obj.dir = '';
	if (!Obj.id) Obj.id = 'putflash';
	if (!Obj.requiredVer) Obj.requiredVer = 6;
	if (!Obj.bgcolor) Obj.bgcolor = "#ffffff";
	if (!Obj.quality) Obj.quality = "high";
	if (!Obj.language) Obj.language = 0;
	if (!Obj.macie4exec && Obj.macie4exec != "0") Obj.macie4exec = 0;
	if (!Obj.moz_exec && Obj.moz_exec != "0") Obj.moz_exec = 1;
	if (!Obj.opera_exec && Obj.opera_exec != "0") Obj.opera_exec = 0;
	if (!Obj.nonflashSW && Obj.nonflashSW != "0") Obj.nonflashSW = 0;
	if (!Obj.nonFlashSRC) Obj.nonFlashSRC = "";
	if (!Obj.swLiveConnect) Obj.swLiveConnect = "false";
	if (!Obj.menu) Obj.menu = "false";
	if (!Obj.disableCodebase) Obj.disableCodebase = 0;
	if (!Obj.allowScriptAccess) Obj.allowScriptAccess ="always";
	if (!Obj.className) Obj.className ="flash";
	if (!Obj.disableEmbed) Obj.disableEmbed = 0;

	if (Obj.hedSRC) document.write(Obj.hedSRC);
	if (pfFlashPlayerMeetRequiredVersion(Obj.requiredVer)){
 		document.write(pfGetObjectElement(Obj));
	} else {
		document.write(pfAltAction(Obj));
	}
	if (Obj.fotSRC) document.write(Obj.fotSRC);
}




function pfGetObjectElement(Obj){
	if (window.opera && Obj.opera_exec != 1) {
		return pfAltAction(Obj);
	}

	if (!Obj.file || !Obj.width || !Obj.height || !Obj.id) {
		return "";
	}
	var result = "";
	var noembedFlg = (Obj.disableEmbed && !((navigator.appVersion.indexOf('Win',0) != -1 && navigator.appName.indexOf("Microsoft Internet Explorer",0) != -1) && !window.opera));

	result += '<object';
	if (!noembedFlg) {
		result += ' classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"';
		if(!Obj.disableCodebase){
			result += ' codebase="' + (secure ? 'https' : 'http') + '://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0"';
		}
	} else {
		result += ' data="' + Obj.dir + Obj.file + '" type="application/x-shockwave-flash"';
	}
	var classAttr = (Obj.className) ? ' class="' + Obj.className + '"' : '';
	result += ' id="' + Obj.id + '" width="' + Obj.width + '" height="' + Obj.height + '" name="' + Obj.id + '"' + classAttr + '>';
	if (!noembedFlg) {
		result += '<param name="movie" value="' + Obj.dir + Obj.file + '">';
	}
	result += '<param name="quality" value="' + Obj.quality + '">';
	result += '<param name="bgcolor" value="' + Obj.bgcolor + '">';
	if (Obj.wmode) { result += '<param name="wmode" value="' + Obj.wmode + '">'; }
	result += '<param name="menu" value="' + Obj.menu + '"' + '>';
	if (Obj.salign)    result += '<param name="salign" value="' + Obj.salign + '"' + '>';
	if (Obj.scale)     result += '<param name="scale" value="' + Obj.scale + '"' + '>';
	if (Obj.FlashVars) result += '<param name="FlashVars" value="' + Obj.FlashVars + '"' + '>';
	if (Obj.allowScriptAccess) result += '<param name="allowScriptAccess" value"' + Obj.allowScriptAccess + '"' + '>';


	if ((navigator.appVersion.indexOf('Win',0) != -1 && navigator.appName.indexOf("Microsoft Internet Explorer",0) != -1) && !window.opera){
		result += pfAltContent(Obj);
	} else if (!noembedFlg) {
		result += pfGetEmbedElement(Obj);
	} else {
		result += pfAltContent(Obj);
	}
	result += '</object>';
	return result;
}



function pfGetEmbedElement(Obj){
	if (Obj.moz_exec != 1 && (navigator.userAgent.indexOf("Gecko/") != -1)) return pfAltAction(Obj);

	if (Obj.macie4exec != 1 && (navigator.appVersion.indexOf('Mac',0) != -1)){
		if (navigator.appVersion.indexOf('MSIE 4.',0) != -1) return pfAltAction(Obj);
		if (navigator.appVersion.indexOf('MSIE 3.',0) != -1) return pfAltAction(Obj);
	}

	var ua = navigator.userAgent;
	var reviseFlag = false;
	if (ua.match(/Gecko\//)) {
		var key = 'rv:';
		var sRv = ua.substr(ua.indexOf(key) + key.length, 4);
		var fRv = parseFloat(sRv);
		reviseFlag = (fRv > 1.4 && (fRv < 1.7 || sRv == '1.7a'));
	}

	var result = "";
	result += '<embed src="' + Obj.dir + Obj.file + '"';
	result += ' menu="' + Obj.menu + '"';
	result += ' quality="' + Obj.quality + '"';
	result += ' swLiveConnect="' + Obj.swLiveConnect + '"';
	result += ' bgcolor="' + Obj.bgcolor + '"';
	if (Obj.wmode) { result += ' wmode="' + Obj.wmode + '"'; }
	result += ' width="' + Obj.width + '"';
	result += ' height="' + Obj.height + '"';
	if (Obj.scale && !reviseFlag) result += ' scale="' + Obj.scale + '"';
	if (Obj.salign)               result += ' salign="' + Obj.salign + '"';
	if (Obj.scale && reviseFlag)  result += ' scale="' + Obj.scale + '"';
	if (Obj.FlashVars)            result += ' FlashVars="' + Obj.FlashVars + '"';
	if (Obj.allowScriptAccess)    result += ' allowScriptAccess="' + Obj.allowScriptAccess + '"';
	result += ' type="application/x-shockwave-flash"';
	result += ' pluginspage="' + pluginspages[Obj.language] + '"';
	result += ' name="' + Obj.id + '"';
	result += (Obj.className) ? ' class="' + Obj.className + '"' : '';
	result += '></embed><br>';
	return result;
}



function pfHideAlternateBlock(Obj) {
	var required = Obj.requiredVer;
	var swfCName = Obj.className    || 'flash';
	var altCName = Obj.altClassName || 'flash-alternate';

	var ua       = navigator.userAgent;
	var isGecko  = ua.match(/Gecko\//);
	var isSafari = ua.match(/AppleWebKit/);

	if (pfFlashPlayerMeetRequiredVersion(required)) {
		if (isGecko) {
			document.write('<style type="text/css" media="screen">.' + altCName + ' { display: none }</style>');
			document.write('<style type="text/css" media="print">.'  + swfCName + ' { display: none }</style>');
		} else {
			document.write('<style type="text/css" media="all">.'    + altCName + ' { display: none }</style>');
		}
	}
}



