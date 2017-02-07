var COUNTRY_WEBSITES_SHADE   = (BA.ua.isWinIE && BA.ua.revision < 7);
var COUNTRY_WEBSITES_ENABLED = (typeof(BA) == "object" && BA.ua.DOMok && !BA.ua.isMacIE);

function regionManager() {
	this.node    = null;
	this.list    = null;
	this.timer   = null;
	this.delay   = 200;
	this.enableClassName = "enabled";
}
regionManager.prototype = {
	init : function(area, list) {
		this.area = area;
		if (!area) return;
		this.list = list;
		if (!list) return;
		this.area.addEventListenerBA("mouseover", this.callback_enable,  this);
		this.area.addEventListenerBA("mouseout",  this.callback_disable, this);
		var children = BAConcatNodeList(
			[this.area],
			this.area.getElementsByTagNameBA("*")
		);
		for (var i = 0, n = children.length; i < n; i++) {
			children[i]._isCountryWebSites = true;
		}
		if (COUNTRY_WEBSITES_SHADE) {
			this.shade = document.createElementBA("<iframe src=\"/common/img/country_websites_mask.gif\" frameborder=\"0\"></iframe>");
			this.shade._isCountryWebSites = true;
			this.list.addEventListenerBA("resize", function(){
				this.shade.style.height = this.list.offsetHeight + "px";
			}, this);
			this.area.appendChildBA(this.shade);
		}
		this.disable();
	},
	enable : function() {
		this.list.appendClassNameBA(this.enableClassName);
		if (this.shade) {
			this.shade.appendClassNameBA(this.enableClassName);
		}
	},
	disable : function() {
		this.list.removeClassNameBA(this.enableClassName);
		if (this.shade) {
			this.shade.removeClassNameBA(this.enableClassName);
		}
	},
	clearTimer : function() {
		if (this.timer) {
			this.timer.clearTimer();
			this.timer = null;
		}
	},
	callback_enable : function(e) {
		if (e.relatedTarget && !e.relatedTarget._isCountryWebSites) {
			if (e.relatedTarget.nodeType != 1 && e.relatedTarget.parentNode._isCountryWebSites) {
				return;
			}
			e.stopPropagation();
			this.clearTimer();
			this.timer = new BASetTimeout(this.enable, this.delay, this);
		}
	},
	callback_disable : function(e) {
		if (e.relatedTarget && !e.relatedTarget._isCountryWebSites) {
			if (e.relatedTarget.nodeType != 1 && e.relatedTarget.parentNode._isCountryWebSites) {
				return;
			}
			e.stopPropagation();
			this.clearTimer();
			this.disable();
		}
	}
}

if (COUNTRY_WEBSITES_ENABLED) {
	BAAddOnload(function () {
		var countryWebsites = new regionManager;
		countryWebsites.init(document.getElementById("country-websites"), document.getElementById("region-list"));
	});
}


//new window
function funcPutLog(obj) {
	window.open("/view/log/redirect/index.cgi?url=" + obj.href);
	return false;
}

//same window
function funcPutLog2(obj) {
	location.href="/view/log/redirect/index.cgi?url=" + obj.href;
	return false;
}



