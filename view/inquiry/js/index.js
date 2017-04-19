
var CONTACT_REGION_BLOCK_ENABLED  = (typeof(BA) == "object" && BA.ua.DOMok && !BA.ua.isMacIE);
var CONTACT_REQUIRED_FORM_ENABLED = (typeof(BA) == "object" && BA.ua.DOMok);

function contactRegionList() {
	this.label        = "";
	this.value        = "";
	this.available    = true;
	this.regions      = null;
	this.selected     = -1;
}
contactRegionList.prototype = {
	_createUnit : function(data) {
		var unit = document.createElementBA("div");
		unit.appendClassNameBA("form-blockA01-unit");

		var dl = document.createElementBA("dl");
		unit.appendChildBA(dl);

		var dt = document.createElementBA("dt");
		dl.appendChildBA(dt);

		var span = document.createElementBA("span");
		dt.appendChildBA(span);

		var label = document.createElementBA("label");
		label.setAttributeBA("for", data.name);
		if (BA.ua.isWinIE) {
			label.setAttributeBA("htmlFor", data.name);
		}
		span.appendChildBA(label);
		if (data.required) {
			var req = document.createElementBA("em");
			req.appendClassNameBA("required");
			req.innerHTML = "*";
			label.appendChildBA(req);
			
			var em = document.createElementBA("em");
			em.innerHTML = data.label;
			label.appendChildBA(em);
//			var br = document.createElementBA("br");
//			label.appendChildBA(br);
//			label.appendChildBA("(required)");
		} else {
			label.innerHTML = data.label;
		}

		var dd = document.createElementBA("dd");
		dl.appendChildBA(dd);

		var p = document.createElementBA("p");
		dd.appendChildBA(p);
		if (data.description) {
			p.appendChildBA(data.description);
			var br = document.createElementBA("br");
			p.appendChildBA(br);
		}

		return unit;
	},
	init : function(config, data) {
		this.node = document.getElementById(config.id);
		if (!this.node) return;
		this.node.removeAllChildrenBA();

		if (config.heading) {
			var heading = document.createElementBA("h3");
			heading.appendClassNameBA("form-headingA01");
			heading.innerHTML = config.heading;
			this.node.appendChildBA(heading);
		}

		if (config.description) {
			var descriptionBlock = document.createElementBA("div");
			descriptionBlock.appendClassNameBA("textA01");
			this.node.appendChildBA(descriptionBlock);

			var description = document.createElementBA("p");
			description.innerHTML = config.description;
			descriptionBlock.appendChildBA(description);
		}

		var container = document.createElementBA("div");
//		container.appendClassNameBA("form-blockA01");
		this.node.appendChildBA(container);

		var regionBlock  = this._createUnit(config.region);
		this.regionListContainer = regionBlock.getElementsByTagNameBA("p")[0];
		container.appendChildBA(regionBlock);
		
		/*
		if (config.description) {
			var descriptionBlock = document.createElementBA("div");
			descriptionBlock.appendClassNameBA("textA01");
			this.node.appendChildBA(descriptionBlock);

			var description = document.createElementBA("p");
			description.innerHTML = config.description;
			descriptionBlock.appendChildBA(description);
		}
		*/

		this.regions = new contactMenuList;
		this.regions.init(config.region.name, data);
		this.regions.node.addEventListenerBA("change", this.callback, this);
		this.regionListContainer.appendChildBA(this.regions.node);

		var countryBlock = this._createUnit(config.country);
		container.appendChildBA(countryBlock);
		this.countryListContainer = countryBlock.getElementsByTagNameBA("p")[0];

		var othersBlock = this._createUnit(config.others);
		var othersMenuContainer = othersBlock.getElementsByTagNameBA("p")[0];
		var input = document.createElementBA("input");
		input.setAttributeBA("type", "text");
		input.setAttributeBA("name", config.others.name);
		input.setAttributeBA("id",   config.others.name);
		input.appendClassNameBA("form-str");
		othersMenuContainer.appendChildBA(input);
		container.appendChildBA(othersBlock);

		for (var i = 0, n = data.length; i < n; i++) {
			var countryList = new contactMenuList;
			countryList.init(config.country.name, data[i].children);
			if (countryList.hasChild) {
				countryList.enable();
			} else {
				countryList.disable();
			}
			var region = this.regions.items[i];
			region.countryList = countryList;
		}

		this.select(0);
		this.node.appendClassNameBA("enable");
		return this.regions;
	},
	select : function(id) {
		if (isNaN(id)) id = -1;
		if (this.selected == id) return;
		if (id != -1) {
			var oldRegion = this.regions.items[this.selected];
			if (oldRegion && oldRegion.countryList) {
				this.countryListContainer.removeChildBA(oldRegion.countryList.node);
			}
			var newRegion = this.regions.items[id];
			if (newRegion && newRegion.countryList) {
				this.countryListContainer.appendChildBA(newRegion.countryList.node);
				newRegion.countryList.select(0);
			}
		}
		this.selected = id;
	},
	callback : function(e) {
		this.select(this.regions.getSelectedIndex());
	}
}




function contactMenuList() {
	this.id           = "";
	this.label        = "";
	this.value        = "";
	this.available    = true;
	this.node         = null;
	this.items        = [];
	this.selected     = -1;
	this.hasChild     = false;
}
contactMenuList.prototype = {
	init : function(name, data) {
		this.node = document.createElementBA("select");
		this.node.setAttributeBA("name", name);
		this.node.setAttributeBA("id",   name);
		for (var i = 0, n = data.length; i < n; i++) {
			var item = new contactMenuItem;
			item.init(data[i]);
			this.addItem(item);
		}
		this.select(0);
		return this.node;
	},
	addItem : function(item) {
		item.setId(this.items.length);
		this.node.appendChildBA(item.node);
		this.items.push(item);
		this.hasChild = (item.getValue() || this.hasChild);
		return this.items.length;
	},
	getId : function() {
		return this.id;
	},
	setId : function(id) {
		this.id = id;
		return this.id;
	},
	getSelectedIndex : function() {
		return this.node.selectedIndex;
	},
	getValue : function() {
		return this.value;
	},
	setValue : function(value) {
		if (!value) value = "";
		this.value = value;
		this.node.setAttributeBA("value", value);
		return value;
	},
	enable : function() {
		this.available = true;
		if (typeof(this.node.removeAttribute) == "object" || typeof(this.node.removeAttribute) == "function") {
			this.node.removeAttribute("disabled");
		} else {
			this.node.disabled = false;
		}
	},
	disable : function() {
		this.available = false;
		if (typeof(this.node.removeAttribute) == "object" || typeof(this.node.removeAttribute) == "function") {
			this.node.setAttributeBA("disabled", "disabled");
		} else {
			this.node.disabled = true;
		}
	},
	select : function(id) {
		if (isNaN(id)) id = -1;
		this.node.selectedIndex = id;
		this.selected = id;
		return id;
	},
	isAvailable : function() {
		return this.available;
	}
}



function contactMenuItem() {
	this.id        = "";
	this.label     = "";
	this.value     = "";
	this.available = true;
	this.node      = null;
}
contactMenuItem.prototype = {
	init : function(data) {
		this.node = document.createElementBA("option");
		this.setLabel(data.label);
		this.setValue(data.value);
		return this.node;
	},
	getId : function() {
		return this.id;
	},
	setId : function(id) {
		this.id = id;
		return this.id;
	},
	getLabel : function() {
		return this.label;
	},
	setLabel : function(label) {
		if (!label) label = "";
		this.label = label;
		this.node.innerHTML = label;
		return label;
	},
	getValue : function() {
		return this.value;
	},
	setValue : function(value) {
		if (!value) value = "";
		this.value = value;
		this.node.setAttributeBA("value", value);
		return value;
	},
	enable : function() {
		this.available = true;
		if (typeof(this.node.removeAttribute) == "object" || typeof(this.node.removeAttribute) == "function") {
			this.node.removeAttribute("disabled");
		} else {
			this.node.disabled = false;
		}
	},
	disable : function() {
		this.available = false;
		if (typeof(this.node.removeAttribute) == "object" || typeof(this.node.removeAttribute) == "function") {
			this.node.setAttributeBA("disabled", "disabled");
		} else {
			this.node.disabled = true;
		}
	},
	isAvailable : function() {
		return this.available;
	}
}



function reuiredForm() {
	this.node   = null;
	this.fields = [];
}
reuiredForm.prototype = {
	init : function(node, config) {
		this.attachNode(node);
		for (var i = 0, n = config.length; i < n; i++) {
			var item = new reuiredField;
			item.init(config[i]);
			this.fields.push(item);
		}
	},
	attachNode : function(node) {
		this.node = node;
		BARegisterDOMMethodsTo(node);
		this.node.addEventListenerBA("submit", this.check, this);
	},
	check : function(e) {
		var messages = [];
		var ids = [];
		for (var i = 0, n = this.fields.length; i < n; i++) {
			var obj_wk = document.getElementById(this.fields[i].getId());
			if (obj_wk != null && obj_wk.className != null){
			//                              alert(obj_wk+"::"+this.fields[i].getId());
				obj_wk.className = obj_wk.className.replace("error","");
				if (this.fields[i].getId()=='contentOfInquiry0'
				||	this.fields[i].getId()=='receiveAnswer0'
				){
					var obj1 = document.getElementsByTagName("label");
					for (var j=0; j < obj1.length; j++) {
						var name = obj1[j].getAttribute('name');
						if (name=='required'){
							obj1[j].className = obj1[j].className.replace("error","");
						}
					}
				document.getElementById("contentOfInquiry1").className = document.getElementById("contentOfInquiry1").className.replace("error","");
				document.getElementById("contentOfInquiry2").className = document.getElementById("contentOfInquiry2").className.replace("error","");
				document.getElementById("contentOfInquiry3").className = document.getElementById("contentOfInquiry3").className.replace("error","");
				document.getElementById("contentOfInquiry4").className = document.getElementById("contentOfInquiry4").className.replace("error","");
				if(document.getElementById("contentOfInquiry5")){
					document.getElementById("contentOfInquiry5").className = document.getElementById("contentOfInquiry5").className.replace("error","");
				}
				document.getElementById("receiveAnswer1").className = document.getElementById("receiveAnswer1").className.replace("error","");
				document.getElementById("receiveAnswer2").className = document.getElementById("receiveAnswer2").className.replace("error","");
				document.getElementById("receiveAnswer3").className = document.getElementById("receiveAnswer3").className.replace("error","");
				}
				
			}
			var message = this.fields[i].hasValue();
			if (message) {
				messages.push(message);
				ids.push(this.fields[i].getId());
			}
		}
		if (messages.length >= 1) {
			e.preventDefault();
//			alert(messages.join("\x0A"));
			for (var i = 0, n = ids.length; i < n; i++) {
				var obj = document.getElementById(ids[i]);
				
				if (ids[i]=='contentOfInquiry0'
				){
					var obj1 = document.getElementsByTagName("Label");
					for (var j=0; j < obj1.length; j++) {
						var name = obj1[j].getAttribute('name');
						var forVal = obj1[j].getAttribute('for');
						if ( name=='required' && forVal == 'contentOfInquiry' ){
							obj1[j].className += " error"
						}
					}
					document.getElementById("contentOfInquiry1").className += " error";
					document.getElementById("contentOfInquiry2").className += " error";
					document.getElementById("contentOfInquiry3").className += " error";
					document.getElementById("contentOfInquiry4").className += " error";
					if( document.getElementById("contentOfInquiry5") ){
						document.getElementById("contentOfInquiry5").className += " error";
					}
				}else if ( ids[i]=='receiveAnswer0' ){
					var obj1 = document.getElementsByTagName("Label");
					for (var j=0; j < obj1.length; j++) {
						var name = obj1[j].getAttribute('name');
						var forVal = obj1[j].getAttribute('for');
						if ( name=='required' && forVal == 'receiveAnswer' ){
							obj1[j].className += " error"
						}
					}
					document.getElementById("receiveAnswer1").className += " error";
					document.getElementById("receiveAnswer2").className += " error";
					document.getElementById("receiveAnswer3").className += " error";
				}
				
				obj.className += " error";
				
//				alert(obj.className);
			}
			document.title = FORM_NAME + ' : Confirm | Omron by Kyoto engineering &amp; Automation';
			var addTitleText = document.getElementById('addTitleText');
			addTitleText.innerHTML = ' : Confirm';
			var addTitleTextH2 = document.getElementById('addTitleTextH2');
			addTitleTextH2.innerHTML = ' : Confirm';
			
			var attentionBlock = document.getElementById('attention-block');
			attentionBlock.style.display = '';
			var attentionList = document.getElementById('attention-list');
			attentionList.innerHTML = '<li>' + messages.join('</li><li>') + '</li>';
			
			window.location.hash = "page-top"
		}
	}
}

function reuiredField() {
	this.node    = null;
	this.id      = "";
	this.related = [];
	this.group   = [];
}
reuiredField.prototype = {
	init : function(config) {
		this.setId(config.id);
		this.setMessage(config.message);
		if (config.related) {
			for (var i = 0, n = config.related.length; i < n; i++) {
				var item = new reuiredField;
				item.init(config.related[i]);
				this.related.push(item);
			}
		}
		if (config.group) {
			for (var i = 0, n = config.group.length; i < n; i++) {
				var groupItem = config.group[i];
				groupItem.message = config.group[i].message || "1";
				var item = new reuiredField;
				item.init(groupItem);
				this.group.push(item);
			}
		}
	},
	attachNode : function(id) {
		var node = document.getElementById(id);
		if (node && node.getAttributeBA("id") != id) {
			var nodes = document.getElementsByName(id);
			for (var i = 0, n = nodes.length; i < n; i++) {
				BARegisterDOMMethodsTo(nodes[i]);
				if (nodes[i].getAttributeBA("id") == id) {
					node = nodes[i];
					break;
				}
			}
		}
		this.node = node;
	},
	setMessage : function(message) {
		this.message = message;
	},
	getMessage : function() {
		return this.message;
	},
	setId : function(id) {
		this.id = id;
	},
	getId : function() {
		return this.id;
	},
	hasNode : function() {
		return (this.node);
	},
	hasValue : function() {
		this.attachNode(this.getId());
		if (!this.hasNode()) return "";

		var messages = [];

		var disabled = false;
		if (typeof(this.node.removeAttribute) == "object" || typeof(this.node.removeAttribute) == "function") {
			disabled = (this.node.getAttributeBA("disabled") == "disabled" || this.node.getAttributeBA("disabled") == true);
		} else {
			disabled = this.node.disabled;
		}

		var flg = true;
		if (!disabled) {
			if (this.node.nodeName.match(/input/i)) {
				if (this.node.getAttributeBA("type") == "text") {
					flg = (this.node.value.replace(/\n|\s|\t/g, ""));
				} else if (this.node.getAttributeBA("type") == "hidden") {
					flg = (this.node.checked);
				} else if (this.node.getAttributeBA("type") == "checkbox") {
//					flg = requiredCheckboxes(this.node.getAttributeBA("name"));
//					alert("flg : " + flg);
//					alert(document.inputForm:contentOfInquiryItems:5:contentItemChecked.value);
//					alert(document.inputForm.contentItemChecked.value);
// alert(document.getElementsByName("inputForm:contentOfInquiryItems:5:contentItemChecked.value").value);

					flg = (this.node.checked);
				} else if (this.node.getAttributeBA("type") == "radio") {
					flg = (this.node.checked);
				}
			} else if (this.node.nodeName.match(/select/i)) {
				var selected = this.node.selectedIndex;
				flg = (selected >= 0 && this.node.options[selected] && this.node.options[selected].value);
			} else if (this.node.nodeName.match(/textarea/i)) {
				flg = (this.node.value.replace(/\n|\s|\t/g, ""));
			}
		}

		var groupflg = false;
		for (var i = 0, n = this.group.length; i < n; i++) {
			groupflg = (groupflg || (!this.group[i].hasValue() && this.group[i].hasNode()));
		}
		if (!flg && !groupflg) {
			messages.push(this.getMessage());
		}

		if (flg && !groupflg) {
			for (var i = 0, n = this.related.length; i < n; i++) {
				var message = this.related[i].hasValue();
				if (message) {
					messages.push(message);
				}
			}
		}

		return messages.join("\x0A");
	}
}


function replaceAll( _targetStr_, _searchStr_, _replaceStr_ ){ 

_replaceAll_ary_ = _targetStr_.split(_searchStr_);
return _replaceAll_ary_.join(_replaceStr_);

}
function getSpanTextValue(targetId) {
	// http://ajax.atmarkit.co.jp/jsicdb/main/index/19
	var targetSpan = document.getElementById(targetId);
	var spanText;
	if (targetSpan.innerText != undefined) {
	    spanText = targetSpan.innerText;
	} else {
	    spanText = targetSpan.textContent;
	}
	if (targetSpan.childNodes[0] != undefined && (spanText == null || spanText == "")) {
	    spanText = targetSpan.childNodes[0].data;
	}
//	alert("spanText = " + spanText);
	spanText = replaceAll(spanText,"@+","\n");
	return spanText;

//// DOM1-HTML, DOM2-Core (IE, Gecko, Opera, Safari)
//document.getElementById ('id1').childNodes[0].data;
//// DOM3-Core (Gecko, Opera)
//document.getElementById ('id1').textContent;
//// DOM2-Range (Gecko, Opera, Safari)
//var r = document.createRange (); r.selectNodeContents (document.getElementById ('id1')); r;
//// DOM3-XPath (Gecko, Opera)
//document.evaluate ('id("test0")', document, null, XPathResult.STRING_TYPE, null).stringValue;
//// IE extension (IE, Opera, Safari)
//document.getElementById ('id1').innerText;
//// IE extension (IE, Gecko, Opera, Safari)
//document.getElementById ('id1').innerHTML;

} 


function funLoad(regionList) {
//	alert("funLoad() start!");

	var initValues = getSpanTextValue("initValues");
//	alert("initValues = " + initValues);
	
	var initValuesList = initValues.split("@;");
	for (var i=0; i < initValuesList.length; i++) {
		var initValueDetailList = initValuesList[i].split("@=");
		var key = initValueDetailList[0];
		var val = initValueDetailList[1];
		var elements = document.getElementsByName(key);
		if (elements == null || elements.length == 0) {
			continue;
		}
		if (val != null && val != "") {
			if (key == "country") {
//				alert("!!!" + regionList.regions.getSelectedIndex());
				regionList.select(regionList.regions.getSelectedIndex());
			}
			if (elements.length > 1) {
				var len = elements.length;
				for (var j=0; j < len; j++) {
					if (elements[j].value == val || (val.indexOf("/") != -1 && val.indexOf(elements[j].value) != -1)) {
						elements[j].checked = val;
					} else {
						elements[j].checked = false;
					}
				}
			} else {
				var target = elements.item(0);
				if (target.type == "checkbox") {
					target.checked = val;
				} else if (target.type == "radio") {
					target.checked = val;
				} else {
					target.value = val;
				}
			}
		} else {
			if (elements.length > 1) {
				var len = elements.length;
				for (var j=0; j < len; j++) {
					elements[j].checked = false;
				}
			} else {
				var target = elements.item(0);
				if (target.type == "checkbox") {
					target.checked = false;
				} else if (target.type == "radio") {
					target.checked = false;
				} else {
					target.value = "";
				}
			}
		}
	}
}


if (CONTACT_REGION_BLOCK_ENABLED) {
	BAAppendCSS("/contact/css/regionBlock.css", "", "all");
	BAAddOnload(function () {
			var regionList = new contactRegionList;
			regionList.init(CONTACT_REGION_BLOCK_CONFIG, CONTACT_REGION_LIST);
			//alert("SET funLoad");
			funLoad(regionList);
	});
}
if (CONTACT_REQUIRED_FORM_ENABLED) {
	BAAddOnload(function () {
			var formNode = document.getElementById(CONTACT_FORM_ID);
			var contactForm = new reuiredForm;
			contactForm.init(formNode, CONTACT_REQUIRED_FIELD);
	});
}


function productTypeEnable(){
	if( !document.inputForm ){
		return;
	}
	
	if( document.inputForm && document.inputForm.inquiryType.value == "Product" ){
		document.inputForm.productsType.disabled = false;
	}else{
		document.inputForm.productsType.disabled = true;
	}
}

function requiredCheckboxes(arg){
	var maxloop = 0;
	var str = arg.split(":");
	var cb_name0 = str[1];
	var cb_name1 = str[3];
	
//	if( cb_name1 == "contentItemChecked" ){
	if( cb_name0 == "contentOfInquiryItems" ){
		maxloop = 6;
//	}else if( cb_name1 == "receiveAnswerChecked" ){
	}else if( cb_name0 == "receiveAnswerItems" ){
		maxloop = 4;
	}
	for( var i=0; i<maxloop; i++){
		var ele = document.getElementsByName("inputForm:" + cb_name0 + ":" + i + ":" + cb_name1)[0];
		if(ele.checked){
			return true;
		}
	}
	return false;	
}


productTypeEnable();
