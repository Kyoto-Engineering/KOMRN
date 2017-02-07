BAAddOnload(function () {
	function getNodeList(cName, tName, target) {
		var parents = document.getElementsByClassNameBA(cName, tName);
		var nodes = [];
		for (var i = 0, n = parents.length; i < n; i++) {
			nodes = BAConcatNodeList(
				nodes,
				parents[i].getElementsByTagNameBA(target)
			);
		}
		return nodes;
	}
	var inputs = BAConcatNodeList(
		getNodeList("sequential-linkA01", "div", "a"),
		getNodeList("link-listE01"      , "div", "input")
	);
	for (var i = 0, n = inputs.length; i < n; i++) {
		var _this = inputs[i];
		if (!_this.BAROti && !_this.hasClassNameBA("button") && !_this.hasClassNameBA("rollover")) {
			_this.addEventListenerBA("mouseover", function(){
				if (!this._isActive) {
					this.appendClassNameBA("hover");
				}
				this.removeClassNameBA("focus");
				this._isHover = true;
			}, _this);
			_this.addEventListenerBA("mouseout" , function(){
				this.removeClassNameBA("hover");
				this._isHover = false;
				this.removeClassNameBA("active");
				this._isActive = false;
				if (this._isFocus) {
					this.appendClassNameBA("focus");
				}
			}, _this);
			_this.addEventListenerBA("focus", function(){
				if (!this._isActive && !this._isHover) {
					this.appendClassNameBA("focus");
				}
				this._isFocus = true;
			}, _this);
			_this.addEventListenerBA("blur" , function(){
				this.removeClassNameBA("focus");
				this._isFocus = false;
				this.removeClassNameBA("active");
				this._isActive = false;
				if (this._isHover) {
					this.appendClassNameBA("hover");
				}
			}, _this);
			_this.addEventListenerBA("mousedown", function(){
				this.removeClassNameBA("hover");
				this.removeClassNameBA("focus");
				this.appendClassNameBA("active");
				this._isActive = true;
			}, _this);
			_this.addEventListenerBA("mouseup"  , function(){
				if (this._isHover) {
					this.appendClassNameBA("hover");
				}
				if (this._isFocus) {
					this.appendClassNameBA("focus");
				}
				this.removeClassNameBA("active");
				this._isActive = false;
			}, _this);
		}
	}
});
