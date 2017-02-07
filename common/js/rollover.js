function RollOverImages(targetAreas,targetClass,ois,ais,fis){
	if(!document.BARO) document.BARO = this;
	this.targetClass = targetClass;
	this.ois = ois;
	this.ais = ais;
	this.fis = fis || ois || "";
	this.targetAreas = targetAreas || new Array();
	this.pli = new Array();
	if(targetClass && (ois || ais || fis)) this.init();
}

RollOverImages.prototype.preloadImg = function(srcs){
	var ret = new Array();
	if(!document.images || !srcs) return;
	for(var i=0;i<srcs.length;i++){
		(new Image()).src = srcs[i];
		ret.push(srcs[i]);
	}
}

RollOverImages.prototype.swap = function(names,status){
	for(var i=0;i<names.length;i++){
		var tempobj = (document.all)? document.all[names[i]] : document.getElementById(names[i]);
		if(tempobj[status]) tempobj.src = tempobj[status];
	}
}

RollOverImages.prototype.setEvent = function(tn){
	var tn = tn;
	var ois = this.ois;
	var ais = this.ais;
	var fis = this.fis;
	if(ois && !tn.onmouseover) tn.onmouseover = function(){
		if(ais){
			this._onfocus = this.onfocus;
			this.onfocus = '';
		}
		document.BARO.swap(this.BAROti,'o');
	};
	if(ois && !tn.onmouseout) tn.onmouseout = function(){
		var status = (this.focused) ? 'f' : 'u';
		if(ais){
			this.onfocus = this._onfocus;
		}
		document.BARO.swap(this.BAROti,status);
	};
	if(ais && !tn.onmousedown) tn.onmousedown = function(){document.BARO.swap(this.BAROti,'a');};
	if(ois && ais && !tn.onmouseup) tn.onmouseup = function(){document.BARO.swap(this.BAROti,'o');};
	if(fis && !tn.onfocus) {
		tn.onfocus = function(e){
			var _this = this;
			if (!e) e = window.event;
			if (!this.BAROti) {
				_this = e.srcElement;
			}
			document.BARO.swap(_this.BAROti,'f');
			_this.focused = true;
		};
	} else if(ois && !tn.onfocus) {
		tn.onfocus = function(e){
			var _this = this;
			if (!e) e = window.event;
			if (!this.BAROti) {
				_this = e.srcElement;
			}
			document.BARO.swap(this.BAROti,'o');
		};
	}
	if(!tn.onblur) tn.onblur = function(e){
		var _this = this;
		if (!e) e = window.event;
		if (!this.BAROti) {
			_this = e.srcElement;
		}
		document.BARO.swap(_this.BAROti,'u');
		_this.focused = false;
	};
	if(ais && !tn.onkeypress) tn.onkeypress = function(){document.BARO.swap(this.BAROti,'a');};
	if(ois && ais && !tn.onkeyup) tn.onkeyup = function(){
		var status = (this.focused) ? 'f' : 'o';
		document.BARO.swap(this.BAROti,status);
	};
}


RollOverImages.prototype.init = function(){
	if(!document.getElementById && document.all) return;
	if(!document.images) return;
	var pli = this.pli;
	var ois = this.ois;
	var ais = this.ais;
	var fis = this.fis;
	var idprefix = 'BARO_';
	var objs = [];
	if (this.targetAreas.length) {
		for (var i = 0, n = this.targetAreas.length; i < n; i++) {
			var area = document.getElementById(this.targetAreas[i]);
			if (!area) {
				area = document.getElementsByClassNameBA(this.targetAreas[i],'div')[0];
			}
			if (area) {
				objs = BAConcatNodeList(
					objs,
					area.getElementsByClassNameBA(this.targetClass,'input'),
					area.getElementsByClassNameBA(this.targetClass,'img')
				);
			}
		}
	} else {
		var objinput = document.getElementsByClassNameBA(this.targetClass,'input');
		var objimg = document.getElementsByClassNameBA(this.targetClass,'img');
		var objs = BAConcatNodeList(objinput,objimg);
	}
	for(var i=0;i<objs.length;i++){
		var tempimg = objs[i];
		
		tempimg.id = (tempimg.id)? tempimg.id : (idprefix + this.targetClass + '_' + i);
		
		var basesrc = tempimg.src;
		var imgtype = basesrc.substring(basesrc.lastIndexOf('.'));
		var basename = basesrc.substring(0,basesrc.length - imgtype.length);
		var temppli = new Object();
		tempimg.u = basesrc;
		if(ois){
			tempimg.o = temppli.o = basename + ois + imgtype;
			if(pli.indexOf(temppli.o) == -1) pli.push(temppli.o);
		}
		if(ais){
			tempimg.a = temppli.a = basename + ais + imgtype;
			if(pli.indexOf(temppli.a) == -1) pli.push(temppli.a);
		}
		if(fis){
			tempimg.f = temppli.f = basename + fis + imgtype;
			if(pli.indexOf(temppli.f) == -1) pli.push(temppli.f);
		}
		
		if(tempimg.tagName.toLowerCase() == 'img'){
			var pa = tempimg.parentNode;
			for(var j=0;j<10;j++){
				if(pa && pa.tagName && pa.tagName.toLowerCase() == 'a'){
					if(!pa.BAROti) pa.BAROti = new Array();
					pa.BAROti.push(tempimg.id);
					this.setEvent(pa);
					break;
				}else if(pa.parentNode){
					pa = pa.parentNode;
				}else{
					break;
				}
			}
		}else if(tempimg.tagName.toLowerCase() == 'input'){
			tempimg.BAROti = new Array(tempimg.id);
			this.setEvent(tempimg);
		}
	}
	this.preloadImg(pli);
}

BAAddOnload(function(){new RollOverImages(['country-websites','header-area','lead-area','primary-contents-area','related-info-area','iweb-login-area'], 'rollover','_o')});
BAAddOnload(function(){new RollOverImages(['country-websites','header-area','lead-area','primary-contents-area','exist-primary-contents-area','related-info-area','iweb-login-area'], 'button','_o','_a','_f')});
