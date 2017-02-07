/* -------------------------------------------------------------------------- */
/** 
 *    @fileoverview
 *       make an object to be observable.
 *
 *    @version rev001.2007-02-04
 *    @requires observable.js
 */
/* -------------------------------------------------------------------------- */

/**
 * interactiveItem
 * $Id$
 *
 * @constructor
 */
function interactiveItem() {
	this.callBackChains = {};
	this.id = "";
	this.className = "active";
	this.available = false;
	this.node = null;
}
interactiveItem.prototype = new BAObservable;
interactiveItem.prototype.attachNode = function(node) {
	this.node = node;
}
interactiveItem.prototype.getId = function() {
	return this.id;
}
interactiveItem.prototype.setId = function(id) {
	this.id = id;
	return id;
}
interactiveItem.prototype.isAvailable = function() {
	return this.available;
}
interactiveItem.prototype.enable = function() {
	this.available = true;
	if (this.node) {
		this.node.appendClassNameBA(this.className);
	}
}
interactiveItem.prototype.disable = function() {
	this.available = false;
	if (this.node) {
		this.node.removeClassNameBA(this.className);
	}
}
interactiveItem.prototype.callBack = function(e) {
	this.doCallBack("change", this.getId(), e);
}


/**
 * interactiveManager
 * $Id$
 *
 * @constructor
 */
function interactiveManager() {
	this.callBackChains = {};
	this.id = "";
	this.store = -1;
	this.items = [];
	this.switchers = [];
}
interactiveManager.prototype = new BAObservable;
interactiveManager.prototype.addItem = function(item, switcher) {
	var id = this.items.length;

	item.setId(id);
	item.disable();
	item.setCallBack("change", this.callBack, this);
	this.items[id] = item;

	if (switcher) {
		switcher.setId(id);
		switcher.disable();
		switcher.setCallBack("change", this.callBack, this);
		this.switchers[id] = switcher;
	}
}
interactiveManager.prototype.getId = function() {
	return this.id;
}
interactiveManager.prototype.setId = function(id) {
	this.id = id;
	return id;
}
interactiveManager.prototype.select = function(id) {
	if (id == this.store) {
		return;
	}
	if (this.items[this.store]) {
		this.items[this.store].disable();
		if (this.switchers && this.switchers[this.store]) {
			this.switchers[this.store].disable();
		}
	}
	if (this.items[id]) {
		this.items[id].enable();
		if (this.switchers && this.switchers[id]) {
			this.switchers[id].enable();
		}
	}
	this.store = id;
}
interactiveManager.prototype.callBack = function(id, e) {
	e.preventDefault();
	this.select(id);
}


