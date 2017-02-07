/* -------------------------------------------------------------------------- */
/** 
 *    @fileoverview
 *       Common Script Libraries.
 *
 *    @version rev011.2007-02-14
 */
/* -------------------------------------------------------------------------- */

var BA;
var BA_STATUSMSG;
var BA_KEYEQUIV;



/* ============================== Common preparations ============================== */

/* --------------- Constructor : BAEnvironment --------------- */
/**
 * constructor of 'BA' global single object.
 * @class common settings and environment variables set.
 * @constructor
 */
function BAEnvironment() {
	/** debug mode flag
	    @type Boolean */
	this.debugMode = false;

	/** document
	    @type Document @const @private */
	var d  = document;
	/** document.implementation
	    @type Object @const @private */
	var di = d.implementation;
	/** document.documentElement
	    @type Node @const @private */
	var de = d.documentElement;
	/** navigator.userAgent
	    @type String @const @private */
	var ua = navigator.userAgent;
	/** location.protocol
	    @type String @const @private */
	var lp = location.protocol;
	/** location.hostname
	    @type String @const @private */
	var lh = location.hostname;

	/** associative array of urls/paths to frequently used directories.
	    @type Object @const  */
	this.url = {};
	this.url.commonDir   = BAGetCommonDir('shared');
	this.url.cssDir      = this.url.commonDir + 'css/';
	this.url.jsDir       = this.url.commonDir + 'js/';

	/** associative array of frequently used namespaces.
	    @type Object @const  */
	this.ns = {};
	this.ns.defaultNS    = (de && de.namespaceURI) ? de.namespaceURI : (de && de.tagUrn) ? de.tagUrn : null;
	this.ns.xhtml1       = 'http://www.w3.org/1999/xhtml';
	this.ns.xhtml2       = 'http://www.w3.org/2002/06/xhtml2';
	this.ns.bAattrs      = 'urn:bA.attrs';

	/** associative array of frequently used namespace prefixes.
	    @type Object @const  */
	this.prefix = {};
	this.prefix.bAattrs  = 'bAattrs:';

	/** associative array of browser distinction results.
	    @type Object @const  */
	this.ua = {};
	this.ua.isGecko      = ua.match(/Gecko\//);
	this.ua.isSafari     = ua.match(/AppleWebKit/);
	this.ua.isOpera      = window.opera;
	this.ua.isIE         = (d.all && !this.ua.isGecko && !this.ua.isSafari && !this.ua.isOpera);
	this.ua.isIE40       = (this.ua.isIE && ua.match(/MSIE 4\.0/));     // IE 4.0x
	this.ua.isIE45       = (this.ua.isIE && ua.match(/MSIE 4\.5/));     // IE 4.5x
	this.ua.isIE50       = (this.ua.isIE && ua.match(/MSIE 5\.0/));     // IE 5.0x
	this.ua.isIE55       = (this.ua.isIE && ua.match(/MSIE 5\.5/));     // IE 5.5x
	this.ua.isIE60       = (this.ua.isIE && ua.match(/MSIE 6\.0/));     // IE 6.0x
	this.ua.isIE70       = (this.ua.isIE && ua.match(/MSIE 7\.0/));     // IE 7.0x
	this.ua.isIE80       = (this.ua.isIE && ua.match(/MSIE 8\.0/));     // IE 8.0x
	this.ua.isIE90       = (this.ua.isIE && ua.match(/MSIE 9\.0/));     // IE 9.0x
	this.ua.isNN4        = d.layers;                                    // NN 4.x
	this.ua.isMac        = ua.match(/Mac/);
	this.ua.isWin        = ua.match(/Win/);
	this.ua.isWinIE      = this.ua.isWin && this.ua.isIE;
	this.ua.isMacIE      = this.ua.isMac && this.ua.isIE;
	this.ua.productSub   = navigator.productSub;
	this.ua.revision     = (this.ua.isIE    ) ? parseFloat(ua.match(/MSIE ([\d\.]+)/)[1])         :
	                       (this.ua.isGecko ) ? parseFloat(ua.match(/; rv:([\d\.]+)/)[1])         :
	                       (this.ua.isSafari) ? parseFloat(ua.match(/AppleWebKit\/([\d\.]+)/)[1]) :
	                       (this.ua.isOpera ) ? parseFloat(ua.match(/Opera.([\d\.]+)/)[1])        :
	                                            0;
	this.ua.DOMok        = (di) ? di.hasFeature('HTML','1.0') : (this.ua.isIE && de);

	/** associative array of misc environment values.
	    @type Object @const  */
	this.env = {};
	this.env.online      = (lp == 'http:' || lp == 'https:');
	this.env.referer     = (typeof document.referrer == 'string') ? document.referrer : '';

	/** associative array of revise css settings.
	    @type Object @const  */
	this.css = {};
	this.css.revise      = {
//		'Safari'   : 'revise_safari.css',
//		'IE50.Win' : 'revise_winie50.css'
	};
	this.css.reviseTitle = '';

	/** associative array of browser geometries.
	    @type Object @see Window#BAGetGeometry  */
	this.geom            = {};
}



/* --------------- EventHandler : window.onerror --------------- */
/**
 * on debug mode, show alert when error occurred.
 * @return true (suppress browser-native error dialog)
 * @type Boolean
 */
window.onerror = function() {
	if (typeof BA == 'object') {
		if (BA.debugMode) {
			var msg = 'Error: ' + arguments[0] + '\n' +
			          'File: '  + arguments[1] + '\n' + 
			          'Line: '  + arguments[2];
			alert(msg);
		}
		return true;
	}
}






/* ==================== Custom methods / Shortage methods of built-in objects ==================== */

/* ----- Function.apply() ----- */

if (!window.encodeURIComponent) {
	/**
	 * do URI encode (implement emulation for WinIE5.0/MacIE5.x).
	 * @param {String} str    string to encode.
	 * @return encoded string
	 * @@type String
	 */
	window.encodeURIComponent = function(str) {
		return escape(str);
	}
}

/* ----- Function.apply() ----- */

if (!Function.prototype.apply) {
	/**
	 * allows you to apply the method of another object in the context of a different object (the calling object).
	 * (implement emulation of the method defined in ECMA-262 Edition 3)
	 * @param {Object} aThisObject the object that will be a global object ('this') in aCallBack func.
	 * @param {Array}  anArray     the Array to apply to the function.
	 * @param {Object} anArray     the 'arguments' object.
	 * @return returned value from the applied func.
	 * @@type AnyType
	 */
	Function.prototype.apply = function(aThisObject, anArray) {
		if (typeof anArray != 'null' && typeof anArray != 'undefined' && typeof anArray != 'object') {
			throw 'Function.apply: second argument must be an array.';
		} else {
			if (typeof aThisObject != 'object' || !aThisObject) {
				aThisObject = window;
			}
			if (!anArray) {
				anArray = [];
			}
			var prop = '__Function_Apply_stored__';
			var args = [];
			for (var i = 0, n = anArray.length; i < n; i++) {
				args.push('anArray[' + i + ']');
			}

			aThisObject[prop] = this;
			var ret = eval('aThisObject.' + prop + '(' + args.join(',') + ')');
			try {
				delete aThisObject[prop];
			} catch(err) {
				aThisObject[prop] = null;
			}
			return ret;
		}
	}
}

/* ----- Function.call() ----- */

if (!Function.prototype.call) {
	/**
	 * allows you to call (execute) a method of another object in the context of a different object (the calling object).
	 * (implement emulation of the method defined in ECMA-262 Edition 3)
	 * @param {Object}  aThisObject the object that will be a global object ('this') in aCallBack func.
	 * @param {AnyType} args        the arguments for called function.
	 * @return returned value from the called func.
	 * @@type AnyType
	 */
	Function.prototype.call = function(aThisObject /* , arg1, arg2 ... */) {
		var args = [];
		for (var i = 1, n = arguments.length; i < n; i++) {
			args.push(arguments[i]);
		}
		return this.apply(aThisObject, args);
	}
}

/* ----- Array.pop() ----- */

if (!Array.prototype.pop) {
	/**
	 * removes the last element from an array and returns that element.
	 * (implement emulation of the method defined in ECMA-262 Edition 3)
	 * @return last element of the array.
	 * @type Object
	 */
	Array.prototype.pop = function() {
		if (!this.length) {
			return null;
		} else {
			var last = this[this.length - 1];
			--this.length;
			return last;
		}
	}
}

/* ----- Array.push() ----- */

if (!Array.prototype.push) {
	/**
	 * adds one or more elements to the end of an array and returns the new length of the array. 
	 * (implement emulation of the method defined in ECMA-262 Edition 3)
	 * @param {Object} args    any kind of object(s) to add to array (required)
	 * @return the number of elements in the array after processing.
	 * @type Number
	 */
	Array.prototype.push = function(args) {
		for (var i = 0, n = arguments.length; i < n; i++) {
			this[this.length] = arguments[i];
		}
		return this.length;
	}
}

/* ----- Array.shift() ----- */

if (!Array.prototype.shift) {
	/**
	 * removes the first element from an array and returns that element.
	 * (implement emulation of the method defined in ECMA-262 Edition 3)
	 * @return first element of the array.
	 * @type Object
	 */
	Array.prototype.shift = function() {
		if (!this.length) {
			return null;
		} else {
			this.reverse();
			var ret = this.pop();
			this.reverse();
			return ret;
		}
	}
}

/* ----- Array.unshift() ----- */

if (!Array.prototype.unshift) {
	/**
	 * adds one or more elements to the front of an array and returns the new length of the array.
	 * (implement emulation of the method defined in ECMA-262 Edition 3)
	 * @param {Object} args    any kind of object(s) to add to array (required)
	 * @return the number of elements in the array after processing.
	 * @type Number
	 */
	Array.prototype.unshift = function(args) {
		this.reverse();
		for (var i = arguments.length - 1; i >= 0; i--) {
			this.push(arguments[i]);
		}
		this.reverse();
		return this.length;
	}
}

/* ----- Array.splice() ----- */

if (!Array.prototype.splice) {
	/**
	 * changes the content of an array, adding new elements while removing old elements.
	 * (implement emulation of the method defined in ECMA-262 Edition 3)
	 * @param {Object} index      index at which to start changing the array. (required)
	 * @param {Object} howMany    an integer indicating the number of old array elements to remove.
	 *                            if howMany is 0, no elements are removed.
	 *                            in this case, you should specify at least one new element.
	 * @param {Object} elements   the elements to add to the array.
	 *                            if you don't specify any elements, splice simply removes elements from the array.
	 * @return an array containing the removed elements
	 * @type Array
	 */
	Array.prototype.splice = function(index, howMany /* , element1, element2 ... */) {
		index     = (index < 0) ? Math.max(index + this.length, 0) : Math.min(index, this.length);
		howMany   = Math.min(Math.max(howMany || this.length, 0), this.length - index);
		var left  = this.slice(0, index);
		var right = this.slice(index + howMany);
		var ret   = this.slice(index, index + howMany);
		Array.prototype.slice.call(arguments, 2).forEach(function(item) { left.push(item) });
		this.length = 0;
		this.push.apply(this, left );
		this.push.apply(this, right);
		return ret;
	}
}

/* ----- Array.indexOf() ----- */

if (!Array.prototype.indexOf) {
	/**
	 * returns the first index of an element within the array equal to the specified value, or -1 if none is found.
	 * (implement emulation of the method defined in JavaScript1.6)
	 * @param {Object} aSearchElement    the item to search (required)
	 * @param {Object} aFromIndex        index number to start searching
	 * @return index number
	 * @type Number
	 */
	Array.prototype.indexOf = function(aSearchElement, aFromIndex) {
		if (typeof aFromIndex != 'number') {
			aFromIndex = 0;
		} else if (aFromIndex < 0) {
			aFromIndex = this.length + aFromIndex;
		}
		for (var i = aFromIndex, n = this.length; i < n; i++) {
			if (this[i] === aSearchElement) {
				return i;
			}
		}
		return -1;
	}
}

/* ----- Array.lastIndexOf() ----- */

if (!Array.prototype.lastIndexOf) {
	/**
	 * returns the last index of an element within the array equal to the specified value, or -1 if none is found. 
	 * (implement emulation of the method defined in JavaScript1.6)
	 * @param {Object} aSearchElement    the item to search (required)
	 * @param {Object} aFromIndex        index number to start searching
	 * @return index number
	 * @type Number
	 */
	Array.prototype.lastIndexOf = function(aSearchElement, aFromIndex) {
		if (typeof aFromIndex != 'number') {
			aFromIndex = this.length - 1;
		} else if (aFromIndex < 0) {
			aFromIndex = this.length + aFromIndex;
		}
		for (var i = aFromIndex; i >= 0; i--) {
			if (this[i] === aSearchElement) {
				return i;
			}
		}
		return -1;
	}
}

/* ----- Array.forEach() ----- */

if (!Array.prototype.forEach) {
	/**
	 * calls a function for each element in the array.
	 * (implement emulation of the method defined in JavaScript1.6)
	 * @param {Function} aCallBack      the function to exec for every element (required)
	 * @param {Object}   aThisObject    the object that will be a global object ('this') in aCallBack func.
	 */
	/*! arguments of callback function 'aCallBack(anElement, anIndex, anArray)' :
	 *      {Object} anElement    current processing element of the Array.
	 *      {Number} anIndex      current processing index-num of the Array.
	 *      {Array}  anArray      the Array itself.
	 */
	Array.prototype.forEach = function(aCallBack, aThisObject) {
		for (var i = 0, n = this.length; i < n; i++) {
			aCallBack.call(aThisObject, this[i], i, this);
		}
	}
}

/* ----- Array.map() ----- */

if (!Array.prototype.map) {
	/**
	 * creates a new array with the results of calling a provided function on every element in this array. 
	 * (implement emulation of the method defined in JavaScript1.6)
	 * @param {Function} aCallBack      the function to exec for every element (required)
	 * @param {Object}   aThisObject    the object that will be a global object ('this') in aCallBack func.
	 * @return array that consisted of returned values.
	 * @type Array
	 */
	/*! arguments of callback function 'aCallBack(anElement, anIndex, anArray)' :
	 *      {Object} anElement    current processing element of the Array.
	 *      {Number} anIndex      current processing index-num of the Array.
	 *      {Array}  anArray      the Array itself.
	 *
	 *      return value must be : {Object} result value of 'aCallBack' function.
	 */
	Array.prototype.map = function(aCallBack, aThisObject) {
		var ret = [];
		for (var i = 0, n = this.length; i < n; i++) {
			ret.push(aCallBack.call(aThisObject, this[i], i, this));
		}
		return ret;
	}
}

/* ----- Array.filter() ----- */

if (!Array.prototype.filter) {
	/**
	 * creates a new array with all of the elements of this array for which the provided filtering function returns true. 
	 * (implement emulation of the method defined in JavaScript1.6)
	 * @param {Function} aCallBack      the function to test all elements (required)
	 * @param {Object}   aThisObject    the object that will be a global object ('this') in aCallBack func.
	 * @return array that consisted of only adapted elements.
	 * @type Array
	 */
	/*! arguments of callback function 'aCallBack(anElement, anIndex, anArray)' :
	 *      {Object} anElement    current processing element of the Array.
	 *      {Number} anIndex      current processing index-num of the Array.
	 *      {Array}  anArray      the Array itself.
	 *
	 *      return value must be : {Boolean} result value of 'aCallBack' function.
	 */
	Array.prototype.filter = function(aCallBack, aThisObject) {
		var ret = [];
		for (var i = 0, n = this.length; i < n; i++) {
			if (aCallBack.call(aThisObject, this[i], i, this)) {
				ret.push(this[i]);
			}
		}
		return ret;
	}
}

/* ----- Array.some() ----- */

if (!Array.prototype.some) {
	/**
	 * returns true if at least one element in this array satisfies the provided testing function.
	 * (implement emulation of the method defined in JavaScript1.6)
	 * @param {Function} aCallBack      the function to test condition of the elements (required)
	 * @param {Object}   aThisObject    the object that will be a global object ('this') in aCallBack func.
	 * @return did some elements satisfy the condition?
	 * @type Boolean
	 */
	/*! arguments of callback function 'aCallBack(anElement, anIndex, anArray)' :
	 *      {Object} anElement    current processing element of the Array.
	 *      {Number} anIndex      current processing index-num of the Array.
	 *      {Array}  anArray      the Array itself.
	 *
	 *      return value must be : {Boolean} result value of 'aCallBack' function.
	 */
	Array.prototype.some = function(aCallBack, aThisObject){
		for (var i = 0, n = this.length; i < n; i++) {
			if (aCallBack.call(aThisObject, this[i], i, this)) return true;
		}
		return false;
	}
}

/* ----- Array.every() ----- */

if (!Array.prototype.every) {
	/**
	 * returns true if every element in this array satisfies the provided testing function.
	 * (implement emulation of the method defined in JavaScript1.6)
	 * @param {Function} aCallBack      the function to test condition of the elements (required)
	 * @param {Object}   aThisObject    the object that will be a global object ('this') in aCallBack func.
	 * @return did all elements satisfy the condition?
	 * @type Boolean
	 */
	/*! arguments of callback function 'aCallBack(anElement, anIndex, anArray)' :
	 *      {Object} anElement    current processing element of the Array.
	 *      {Number} anIndex      current processing index-num of the Array.
	 *      {Array}  anArray      the Array itself.
	 *
	 *      return value must be : {Boolean} result value of 'aCallBack' function.
	 */
	Array.prototype.every = function(aCallBack, aThisObject){
		for (var i = 0, n = this.length; i < n; i++) {
			if(!aCallBack.call(aThisObject, this[i], i, this)) return false;
		}
		return true;
	}
}

/* ----- Array.equal() ----- */

if (!Array.prototype.equal) {
	/**
	 * returns true if all elements of the arrays accord each other.
	 * (private experimental implementation)
	 * @param {Array} anArray      the comparison array (required)
	 * @return did all elements accord each other?
	 * @type Boolean
	 */
	Array.prototype.equal = function(anArray) {
		if (!anArray || this.length != anArray.length) {
			return false;
		} else {
			return this.every(function(value, i) {
				return (value === anArray[i]);
			});
		}
	}
}

/* ----- Number.formatNumberBA() ----- */
/**
 * simple number formatter.
 * @param {String} format     fomatter string (required)
 * @return formatted string
 * @type String
 */
/*!
 *  example      '56'   .formatNumberBA(      '000'    ) ->        '056'
 *           '123456'   .formatNumberBA(      '###'    ) ->        '456'
 *           '123456.78'.formatNumberBA('#,###,###'    ) ->    '123,457'
 *           '123456.78'.formatNumberBA('#,###,###.#'  ) ->    '123,456.8'
 *          '-123456.78'.formatNumberBA('0,###,###.000') -> '-0,123,456.780'
 */
Number.prototype.formatNumberBA = function(format) {
	if (!format || typeof format != 'string') {
		throw 'Number.formatNumberBA: first argument must be a formatting string.';
	} else {
		var ret       = [];
		var intFormat = format.split('.')[0].split('');
		var decFormat = format.split('.')[1] || '';
		var value     = (decFormat) ? Math.abs(this) : Math.round(Math.abs(this));
		var sign      = (this < 0) ? '-' : '';
		var intValue  = value.toString().split('.')[0].split('');
		do {
			var _value  = intValue .pop() || '';
			var _format = intFormat.pop() || '';
			switch (_format) {
				case '0' : ret.push(_value  ? _value : '0');                        break;
				case '#' : ret.push(_value  ? _value : '' );                        break;
				case ''  : /* exit do-while loop */          intValue = [];         break;
				default  : ret.push(_format               ); intValue.push(_value); break;
			}
		} while (intValue.length > 0 || intFormat.length > 0);
		ret = ret.reverse().join('').replace(/^\D+/, '');
		if (decFormat) {
			var scale     = Math.pow(10, decFormat.length);
			var rounded   = Math.round(value * scale) / scale;
			if (rounded - ret == 1) {
				ret++;
			}
			var decValue  = rounded.toString().split('.')[1] || '0';
			    decValue  = decValue .split('').reverse().join('');
			    decFormat = decFormat.split('').reverse().join('');
			    ret       = ret + '.' + decValue.formatNumberBA(decFormat).split('').reverse().join('');
		}
		if (decFormat.startsWithBA('#') && ret.endsWithBA('.0')) {
			ret = ret.getBeforeBA('.0');
		}
		return sign + ret;
	}
}

/* ----- String.formatNumberBA() ----- */
/**
 * simple number formatter.
 * @param {String} format     fomatter string (required)
 * @return formatted string
 * @type String
 * @see Number#formatNumberBA
 */
/*!
 *  example      '56'   .formatNumberBA(      '000'    ) ->        '056'
 *           '123456'   .formatNumberBA(      '###'    ) ->        '456'
 *           '123456.78'.formatNumberBA('#,###,###'    ) ->    '123,457'
 *           '123456.78'.formatNumberBA('#,###,###.#'  ) ->    '123,456.8'
 *          '-123456.78'.formatNumberBA('0,###,###.000') -> '-0,123,456.780'
 */
String.prototype.formatNumberBA = function(format) {
	var num = parseFloat(this, 10);
	if (isNaN(num)) {
		throw 'String.formatNumberBA: this string is not a number string.';
	} else {
		return num.formatNumberBA(format);
	}
}

/* ----- String.formatTextBA() ----- */
/**
 * simple text formatter. (super tiny!)
 * @param {Array} strArray    an array of strings
 * @return formatted (replaced) strings.
 * @type String
 */
/*!
 *  example '${0}HOGE${1}FUGA${2}'.formatTextBA(['xxxx', 'yyyy', 'zzzz'])
 *      -> 'xxxxHOGEyyyyFUGAzzzz'
 */
String.prototype.formatTextBA = function(strArray) {
	var str = this;
	if (strArray && strArray.constructor == Array) {
		for (var i = 0, n = strArray.length; i < n; i++) {
			str = str.replace(new RegExp('\\$\\{' + i + '\\}', 'g'), strArray[i]);
		}
	}
	return str;
}

/* ----- String.getBeforeBA() ----- */
/**
 * get string before specified keyword.
 * @param {String}  str        find keyword (requred)
 * @param {Boolean} include    flag to include 'str' in returned string
 * @return found string.
 * @type String
 */
String.prototype.getBeforeBA = function(str, include) {
	var idx = this.indexOf(str);
	return (idx == -1) ? '' : this.substring(0, idx) + (include ? str : '');
}

/* ----- String.getAfterBA() ----- */
/**
 * get string after specified keyword.
 * @param {String}  str        find keyword (requred)
 * @param {Boolean} include    flag to include 'str' in returned string
 * @return found string.
 * @type String
 */
String.prototype.getAfterBA = function(str, include) {
	var idx = this.indexOf(str);
	return (idx == -1) ? '' : (include ? str : '') + this.substring(idx + str.length, this.length);
}

/* ----- String.startsWithBA() ----- */
/**
 * returns true if the string is started with specified keyword.
 * @param {String}  str    checking keyword (requred)
 * @return is the string started with the keyword?
 * @type Boolean
 */
String.prototype.startsWithBA = function(str) {
	return (this.indexOf(str) == 0);
}

/* ----- String.endsWithBA() ----- */
/**
 * returns true if the string is ended with specified keyword.
 * @param {String}  str    checking keyword (requred)
 * @return is the string ended with the keyword?
 * @type Boolean
 */
String.prototype.endsWithBA = function(str) {
	var idx = this.lastIndexOf(str);
	return (idx > -1 && idx + str.length == this.length);
}

/* ----- String.relToAbsBA() ----- */
/**
 * convert relative path/URL to absolute path/URL.
 * @param {String} base    absolute path/URL as a base.
 * @return absolute path/URL
 * @type String
 */
/*!
 *  example '../target/'.relToAbsBA('/path/to/base/'      ) -> '/path/to/target/'
 *          '../target/'.relToAbsBA('http://path/to/base/') -> 'http://path/to/target/'
 */
String.prototype.relToAbsBA = function(base) {
	var b   = base.split('/');
	var t   = this.split('/');
	var ptn = /^(\/|\w+:)/;
	if (!base.match(ptn)) {
		throw 'String.relToAbsBA: first argument must be an absolute path/URL.';
	} else if (this.match(ptn)) {
		return this;
	} else if (this.charAt(0) == '#' || this.charAt(0) == '?') {
		return base + this;
	} else if (t[0] == '.' || t[0] == '..') {
		return t.slice(1, t.length).join('/').relToAbsBA(b.slice(0, b.length - t[0].length).join('/') + '/');
	} else {
		return b.slice(0, b.length - 1).join('/') + '/' + this;
	}
}

/* ----- String.absToRelBA() ----- */
/**
 * convert absolute path/URL to relative path/URL.
 * @param {String} base    absolute path/URL as a base.
 * @return relative path/URL
 * @type String
 */
/*!
 *  example       '/path/to/target/'.absToRelBA('/path/to/base/'      ) -> '../target/'
 *          'http://path/to/target/'.absToRelBA('http://path/to/base/') -> '../target/'
 */
String.prototype.absToRelBA = function(base) {
	var ptn = /^(\/|\w+:)/;
	if (!base.match(ptn)) {
		throw 'String.absToRelBA: first argument must be an absolute path/URL.';
	} else if (!this.match(ptn)) {
		throw 'String.absToRelBA: String must be an absolute path/URL.';
	} else {
		return _compare(base, this) || base;
	}

	function _compare(base, trgt) {
		var b = base.split('/');
		var t = trgt.split('/');
		if (!base) {
			return trgt;
		} else if (!trgt) {
			return _goup(base);
		} else if (b[0] != t[0]) {
			return _goup(base) + trgt;
		} else {
			return arguments.callee(b.slice(1, b.length).join('/'), t.slice(1, t.length).join('/'));
		}
	}
	
	function _goup(path) {
		path = path.split('/');
		path.shift();
		path.forEach(function(elem, idx) { path[idx] = '..' });
		return path.join('/') + '/';
	}
}

/* ----- String.getSanitizedStringBA() ----- */
/**
 * get sanitized string.
 * @return sanitized string
 * @type String
 */
String.prototype.getSanitizedStringBA = function() {
	var pairs = {
		"&"      : "&amp;",
		"<"      : "&lt;",
		">"      : "&gt;",
		"\u0022" : "&quot;",
		"\u0027" : "&apos;"
	};
	var ret = this;
	for (var key in pairs) {
		ret = ret.replace(new RegExp(key, "g"), pairs[key]);
	}
	return ret;
}






/* ==================== Custom DOM methods for built-in DOM objects ==================== */

/* ---------- Constructor : BADOM (Abstract Class) ---------- */
/**
 * custom DOM methods for cross-browser-integrated handling, useful shortcuts.
 * @class this class is an abstract class, and used as container of prototypes of custom DOM methods.
 * @constructor
 */
function BADOM() {
	/** alternate for 'instanceof' operator (MacIE cannot understand that operator)
	    @type String @const */
	this.instanceOf = 'BAElement';
}

/* ----- BADOM.addEventListenerBA() ----- */
/**
 * cross-browser-integrated addEventListener().
 * @param {String}   type           event type (required)
 * @param {Function} listener       function or method as event listener (required)
 * @param {Object}   aThisObject    the object that will be a global object ('this') in the event listener function
 */
BADOM.prototype.addEventListenerBA = function(type, listener, aThisObject) {
	/**
	 * construct a fake event object for IE.
	 * @class fake of standard DOM's Event object for IE.
	 * @constructor
	 * @param {BAElement} _node     reference to object that added event listener (required)
	 */
	function _event_IE(_node) {
		var e  = window.event;
		var de = document.documentElement;
		var db = document.body;
		this.currentTarget   = _node;
		if (!e) return;
		this.type            = e.type;
		this.target          = e.srcElement;
		this.relatedTarget   = (e.srcElement == e.toElement) ? e.fromElement : e.toElement;
		this.clientX         = e.clientX;
		this.clientY         = e.clientY;
		this.pageX           = (de.scrollLeft ? de.scrollLeft : (db ? db.scrollLeft : 0)) + e.clientX;
		this.pageY           = (de.scrollTop  ? de.scrollTop  : (db ? db.scrollTop  : 0)) + e.clientY;
		this.charCode        = /* (this.type == 'keypress') ? */ e.keyCode /* : 0 */;
		this.keyCode         = /* (this.type != 'keypress') ? */ e.keyCode /* : 0 */;
		this.ctrlKey         = e.ctrlKey;
		this.shiftKey        = e.shiftKey;
		this.altKey          = e.altKey;
		this.metaKey         = e.metaKey;
		this.detail          = e.detail;
		this.wheelDelta      = e.wheelDelta;
		this.stopPropagation = function() { e.cancelBubble = true  };
		this.preventDefault  = function() { e.returnValue  = false };
	}

	/**
	 * call stored event listeners.
	 * @param {Event} e     event object (required)
	 */
	function _callListeners(e) {
		var stored = this.__addEventListenerBA_stored__;
		var type   = e.type;
		if (BA.ua.isGecko && type == 'DOMMouseScroll') {
			e.wheelDelta = e.detail * -40;
		} else if (BA.ua.isSafari && BA.ua.revision < 412) { // preventDefault() doesn't work on Safari before 2.0.4
			e.preventDefault = function() { this.currentTarget['on' + this.type] = function() { return false } };
		}
		if (stored && stored[type]) {
			stored[type].forEach(function(func) { func.call(null, e) });
		}
	}

	// preparations.
	if (!type || typeof type != 'string') {
		throw 'BADOM.addEventListenerBA: first argument must be a string (event type).';
	} else if (!listener || typeof listener != 'function') {
		throw 'BADOM.addEventListenerBA: second argument must be a function (event listener).';
	} else if (BA.ua.isOpera && BA.ua.revision < 9.02 && type == 'mousewheel') {
		return;  // Opera before 9.02 has a bug on 'mousewheel' event (user cannot scroll-up by mousewheel).
	} else if (BA.ua.isGecko && type == 'mousewheel') {
		type = 'DOMMouseScroll';
	}

	// create event caller.
	var stored = this.__addEventListenerBA_stored__;
	if (!stored) {
		stored = this.__addEventListenerBA_stored__ = {};
	}
	var funcs = stored[type];
	if (!funcs) {
		funcs = stored[type] = [];
		if (this.addEventListener) { // standard compliant browsers
			this.addEventListener(type, _callListeners, false);
		} else {                     // WinIE/MacIE
			var _this  = (this.window) ? this.window : this; // workaround for WinIE
			var exists = _this['on' + type];
			_this['on' + type] = (exists) ?
				function() { exists(); _callListeners.call(_this, new _event_IE(_this)) } :
				function() {           _callListeners.call(_this, new _event_IE(_this)) } ;
		}
	}

	// register event listener.
	if (funcs.indexOf(listener) > -1) {
		return;
	} else if (typeof aThisObject == 'object' && aThisObject != null) {
		funcs.push(BACreateDelegate(listener, aThisObject));
	} else {
		funcs.push(listener);
	}

	// preparations for BACleanUpEventListeners()
	var nodes = window.BA_EVENTLISTENER_STORED_NODES;
	if (!nodes) {
		nodes = window.BA_EVENTLISTENER_STORED_NODES = [];
	}
	if (nodes.indexOf(this) == -1) {
		nodes.push(this);
	}
}

/* ----- BADOM.removeEventListenerBA() ----- */
/**
 * cross-browser-integrated removeEventListenerBA().
 * @param {String}   type        event type (required)
 * @param {Function} listener    event listener function/method to be removed (required)
 */
BADOM.prototype.removeEventListenerBA = function(type, listener) {
	// preparations.
	if (!type || typeof type != 'string') {
		throw 'BADOM.removeEventListenerBA: first argument must be a string (event type).';
	} else if (!listener || typeof listener != 'function') {
		throw 'BADOM.removeEventListenerBA: second argument must be a function (event listener).';
	} else if (BA.ua.isGecko && type == 'mousewheel') {
		type = 'DOMMouseScroll';
	}

	// remove event listener.
	var stored = this.__addEventListenerBA_stored__;
	if (stored && stored[type] && stored[type].length > 0) {
		var funcs = stored[type];
		var index = funcs.indexOf(listener);
		if (index > -1) {
			funcs.splice(index, 1);
		}
	}
}

/* ----- BADOM.dispatchEventBA() ----- */
/**
 * cross-browser-integrated dispatchEvent().
 * (incomplete)
 * @param {Event} e    event object
 */

BADOM.prototype.dispatchEventBA = function(e) {
	if (!e || typeof e != 'object') {
		throw 'BADOM.dispatchEventBA: first argument must be an Event object.';
	} else if (this.dispatchEvent) {
		this.dispatchEvent(e);
	} else if (this.fireEvent) {
		this.fireEvent('on' + e.type);
	} else if (this['on' + e.type]) {
		this['on' + e.type]();
	}
}



/* ---------- Constructor : BAWindow (Abstract Class) inherits BADOM ---------- */
/**
 * custom DOM methods for cross-browser-integrated handling, useful shortcuts.
 * @class this class is an abstract class, and used as container of prototypes of custom DOM methods.
 * @constructor
 */
function BAWindow() { }

BAWindow.prototype = new BADOM;



/* ---------- Constructor : BADocument (Abstract Class) inherits BADOM ---------- */
/**
 * custom DOM methods for cross-browser-integrated handling, useful shortcuts.
 * @class this class is an abstract class, and used as container of prototypes of custom DOM methods.
 * @constructor
 */
function BADocument() { }

BADocument.prototype = new BADOM;

/* ----- BADocument.getElementsByTagNameBA() ----- */
/**
 * namespace handlings and cross-browser integrated getElementsByTagName().
 * @param {String} tagName     element name to get NodeList (required)
 * @return node list (but difference from original NodeList is that returned list is sometimes 'static'.)
 * @type NodeList/{@link Array}
 */
/*! specifying tagName example:
 *   - 'elmName'    ... elements 'elmName' (in HTML), or 'elmName' of default namespace (in XML).
 *   - 'NS:elmName' ... elements 'NS:elmName' (in HTML), or 'elmName' of 'NS' namespace (in XML).
 *  notice: specifying with namespace prefix in HTMLdoc is not available in Safari 1.2.x or earlier.
 */
BADocument.prototype.getElementsByTagNameBA = function(tagName) {
	var ret = [];
	if (!tagName || typeof tagName != 'string') {
		throw 'BADocument.getElementsByTagNameBA: first argument must be a string (tagName).';
	} else if (tagName == '*') {
		ret = this.getElementsByTagName(tagName);
		if (BA.ua.isIE || ret.length == 0) {
			ret = (document.all && this === document) ?
				document.all :
				(function(_node) {
					var _nodes = _node.childNodes;
					var _ret   = [];
					for (var i = 0, n = _nodes.length; i < n; i++) {
						var __node = _nodes[i];
						if (__node.nodeType == 1 && __node.nodeName != '!') {
							_ret.push(__node);
						}
						_ret = _ret.concat(arguments.callee(__node));
					}
					return _ret;
				})(this);
		}
	} else if (tagName.indexOf(":") != -1) {
		var prfx = tagName.split(':')[0];
		var name = tagName.split(':')[1];
		     ret = (BA.ns.defaultNS && this.getElementsByTagNameNS) ?
		           	this.getElementsByTagNameNS(BA.ns[prfx], name) :
		           	this.getElementsByTagName(tagName) ;
		if (ret.length == 0) {
			       ret = (name == '*') ? this.getElementsByTagNameBA(name) : this.getElementsByTagName(name);
			var _nodes = [];
			for (var i = 0, n = ret.length; i < n; i++){
				var _node = ret[i];
				if (BA.ns.defaultNS && _node.namespaceURI == BA.ns[prfx] || _node.tagUrn == BA.ns[prfx]) {
					_nodes.push(_node);
				}
			}
			if (_nodes.length == 0) {
				       ret = (name == '*') ? ret : this.getElementsByTagNameBA('*');
				var _nodes = [];
				for (var i = 0, n = ret.length; i < n; i++) {
					var _node = ret[i];
					var _prfx = _node.nodeName.split(':')[0];
					var _name = _node.nodeName.split(':')[1];
					if (_name && _prfx == prfx && (name == '*' || _name.toLowerCase() == name.toLowerCase())) {
						_nodes.push(_node);
					}
				}
			}
			ret = _nodes;
		}
	} else {
		ret = (BA.ns.defaultNS && this.getElementsByTagNameNS) ?
		      	this.getElementsByTagNameNS(BA.ns.defaultNS, tagName) :
		      	(tagName.match(/^body$/i) && document.body) ?
		      		/* workaround for Netscape7.1 */ [document.body] :
		      		this.getElementsByTagName(tagName) ;
		if (typeof document.documentElement.tagUrn == 'string') {
			var _nodes = [];
			for (var i = 0, n = ret.length; i < n; i++){
				var _node = ret[i];
				if (!_node.tagUrn || _node.tagUrn == BA.ns.defaultNS) {
					_nodes.push(_node);
				}
			}
			ret = _nodes;
		}
	}

	['indexOf', 'lastIndexOf', 'forEach', 'map', 'filter', 'some', 'every', 'equal'].forEach(function(method) {
		if (!ret[method]) ret[method] = function() { return Array.prototype[method].apply(this, arguments) }
	});
	if (BA.ua.isWinIE && BA.ua.revision < 7) {
		ret.forEach(BARegisterDOMMethodsTo);
	}
	return ret;
}

/* ----- BADocument.getElementsByClassNameBA() ----- */
/**
 * get element node list by class name (and element name).
 * @param {String} className     class name to get (required)
 * @param {String} tagName       element name to narrow down
 * @return an array as a 'static' node list.
 * @type Array
 * @see #getElementsByTagNameBA
 */
BADocument.prototype.getElementsByClassNameBA = function(className, tagName) {
	if (!className || typeof className != 'string') {
		throw 'BADocument.getElementsByClassNameBA: first argument must be a string (className).';
	} else {
		var nodes = this.getElementsByTagNameBA(tagName || '*');
		var func = function(node) {
			return (node.hasClassNameBA && node.hasClassNameBA(className));
		}
		if (typeof(nodes.filter) != "function") {
			return Array.prototype.filter.apply(nodes, [func]);
		} else {
			return this.getElementsByTagNameBA(tagName || '*').filter(func);
		}
	}
}

/* ----- BADocument.createElementBA() ----- */
/**
 * namespace handlings integrated createElement().
 * @param {String} tagName     element name to create (required)
 * @return new element node
 * @type BAElement
 * @see Window#BARegisterDOMMethodsTo
 */
/*! specifying tagName example:
 *   - 'elmName'    ... elements 'elmName' (in HTML), or 'elmName' of default namespace (in XML).
 *   - 'NS:elmName' ... elements 'NS:elmName' (in HTML), or 'elmName' of 'NS' namespace (in XML).
 *  notice: specifying with namespace prefix in HTMLdoc is not available in Safari 1.2.x or earlier.
 */
BADocument.prototype.createElementBA = function(tagName) {
	if (!tagName || typeof tagName != 'string') {
		throw 'BADocument.createElementBA: first argument must be a string (tagName).';
	} else {
		var node = (BA.ns.defaultNS && document.createElementNS && tagName.match(/:/)) ?
		           	document.createElementNS(BA.ns[tagName.split(':')[0]], tagName.split(':')[1]) :
		           	(BA.ns.defaultNS && document.createElementNS) ?
		           		document.createElementNS(BA.ns.defaultNS, tagName) : 
		           		document.createElement(tagName) ;
		return BARegisterDOMMethodsTo(node);
	}
}

/* ----- BADocument.createDocumentFragmentBA() ----- */
/**
 * cross-browser-integrated createDocumentFragment().
 * @return new document fragment node or its alternate ('ins' element which has "__DOCUMENT_FRAGMENT_BA_NODE__" property)
 * @type BAElement
 * @see Window#BARegisterDOMMethodsTo
 */
BADocument.prototype.createDocumentFragmentBA = function() {
	if (!document.createDocumentFragment || !BA.ua.isMacIE) {
		return BARegisterDOMMethodsTo(document.createDocumentFragment());
	} else {
		var node = document.createElementBA('ins');
		node.__DOCUMENT_FRAGMENT_BA_NODE__ = true;
		return node;
	}
}



/* ---------- Constructor : BAElement (Abstract Class) inherits BADocument ---------- */
/**
 * custom DOM methods for cross-browser-integrated handling, useful shortcuts.
 * @class this class is an abstract class, and used as container of prototypes of custom DOM methods.
 * @constructor
 */
function BAElement() { }

BAElement.prototype = new BADocument;

/** this method is unavailable. @private */
BAElement.prototype.createElementBA = function() { }

/** this method is unavailable. @private */
BAElement.prototype.createDocumentFragmentBA = function() { };

/* ----- BAElement.appendChildBA() ----- */
/**
 * append node or string to element node as it's last child.
 * if literal string is given, a textNode that has specified string as nodeValue will be create,
 * then the textNode will be appended to the node.
 * @param {Node}    content        node object to append    (required)
 * @param {BATag}   content        BATag instance to append (required)
 * @param {String}  content        literal string to append (required)
 * @param {Boolean} forceAsHTML    if true and first argument is String, force to treat it as HTML string.
 * @return a node added.
 * @type BAElement
 */
BAElement.prototype.appendChildBA = function(content, forceAsHTML) {
	if (typeof content == 'undefined' || typeof content == 'object' && !content) {
		throw 'BAElement.appendChildBA: first argument must be a node or a string or a BATag instance.';
	} else if (content.nodeType == 1 || content.nodeType == 3 || content.nodeType == 11) {
		if (content.__DOCUMENT_FRAGMENT_BA_NODE__) {
			while (content.hasChildNodes()) {
				this.appendChild(content.firstChild);
			}
			return content;
		} else {
			return this.appendChild(content);
		}
	} else if (content.instanceOf == 'BATag' || forceAsHTML) {
		content = content.toString();
		if (document.createRange) {            // Gecko/Safari
			var range = document.createRange();
			range.selectNode(this);
			content = range.createContextualFragment(content); // createContextualFragment() is not standard-DOM?
			this.appendChild(content);
		} else if (this.insertAdjacentHTML) {  // WinIE/MacIE
			this.insertAdjacentHTML('beforeEnd', content);
		} else {                               // Others
			this.innerHTML += content;
		}
		BARegisterDOMMethodsTo(this, true);
		return content;
	} else if (content.toString) {
		content  = content.toString();
		var node = document.createTextNode(content);
		if (this.insertAdjacentText) {         // WinIE/MacIE
			this.insertAdjacentText('beforeEnd', content);
			return node;
		} else {                               // Others
			return this.appendChild(node);
		}
	}
}

/* ----- BAElement.removeChildBA() ----- */
/**
 * remove specified child node.
 * (temporary impletemtation for the future)
 * @param {Node} node    node object to remove (required)
 * @return a node removed.
 * @type BAElement
 */
BAElement.prototype.removeChildBA = function(node) {
	if (!node || typeof node.nodeType != 'number') {
		throw 'BAElement.removeChildBA: first argument must be a DOM node.';
	} else {
		return BARegisterDOMMethodsTo(this.removeChild(node));
	}
}

/* ----- BAElement.removeAllChildrenBA() ----- */
/**
 * remove all child nodes.
 * return an array containing the removed nodes (BAElement nodes)
 * @type Array
 */
BAElement.prototype.removeAllChildrenBA = function() {
	var ret = [];
	while (this.hasChildNodes()) {
		ret.push(this.removeChildBA(this.firstChild));
	}
	return ret;
}

/* ----- BAElement.getInnerTextBA() ----- */
/**
 * get whole inner texts (within alt texts) in the node.
 * @return whole inner texts.
 * @type String
 */
BAElement.prototype.getInnerTextBA = function() {
	var nodes = this.childNodes;
	var ret   = [];
	for (var i = 0, n = nodes.length; i < n; i++) {
		if (nodes[i].hasChildNodes()) {
			ret.push(nodes[i].getInnerTextBA());
		} else if (nodes[i].nodeType == 3) {
			ret.push(nodes[i].nodeValue);
		} else if (nodes[i].alt) {
			ret.push(nodes[i].alt);
		}
	}
	return ret.join('').replace(/\s+/g, ' ');
}

/* ----- BAElement.getAttributeBA() ----- */
/**
 * namespace handlings and cross-browser integrated getAttribute().
 * @param {String} attr     attribute name to get value (required)
 * @return attribute value
 * @type String
 */
BAElement.prototype.getAttributeBA = function(attr) {
	if (!attr || typeof attr != 'string') {
		throw 'BAElement.getAttributeBA: first argument must be a string (atribute name).';
	} else {
		if (BA.ua.isIE && attr == 'class') {
			// BUGFIX refs#2553 2012/10/30 inou@spc
			//if (!BA.ua.isIE80) {
			if (BA.ua.isIE40 || BA.ua.isIE45 || BA.ua.isIE50 || BA.ua.isIE55 || BA.ua.isIE60 || BA.ua.isIE70) {
				attr += 'Name';
			}
		}
		var ret = this.getAttribute(attr);
		if (!ret && this.getAttributeNS && attr.match(/:/)) {
			var prfx = attr.split(':')[0];
			var attr = attr.split(':')[1];
			return this.getAttributeNS(BA.ns[prfx], attr)
		}
		return ret;
	}
}

/* ----- BAElement.setAttributeBA() ----- */
/**
 * namespace handlings and cross-browser integrated setAttribute().
 * @param {String} attr     attribute name to set value (required)
 * @param {String} value    attribute value to set      (required)
 */
BAElement.prototype.setAttributeBA = function(attr, value) {
	if (!attr || typeof attr != 'string') {
		throw 'BAElement.setAttributeBA: first argument must be a string (atribute name).';
	} else if (attr.match(/:/)) {
		var prfx = attr.split(':')[0];
		var attr = attr.split(':')[1];
		if (this.setAttributeNS && this.namespaceURI || BA.ua.isSafari) {
			this.setAttributeNS(BA.ns[prfx], attr, value);
		} else {
			this.setAttribute('xmlns:' + prfx, BA.ns[prfx]);
			this.setAttribute(prfx + ':' + attr, value);
		}
	} else {
		if (BA.ua.isIE && attr == 'class') {
			// BUGFIX refs#2553 2012/10/30 inou@spc
			//if (!BA.ua.isIE80) {
			if (BA.ua.isIE40 || BA.ua.isIE45 || BA.ua.isIE50 || BA.ua.isIE55 || BA.ua.isIE60 || BA.ua.isIE70) {
				attr += 'Name';
			}
		}
		this.setAttribute(attr, value);
	}
}

/* ----- BAElement.hasClassNameBA() ----- */
/**
 * examine existence of specified class name.
 * @param {String} className     value to examine existence (required)
 * @return boolean
 * @type Boolean
 * @see #getAttributeBA
 */
BAElement.prototype.hasClassNameBA = function(className) {
	if (!className || typeof className != 'string') {
		throw 'BAElement.hasClassNameBA: first argument must be a string (className).';
	} else if (this.nodeType != 1) {
		return false;
	} else {
		return (this.getAttributeBA('class') || '').split(' ').some(function(name) { return (name == className) });
	}
}

/* ----- BAElement.appendClassNameBA() ----- */
/**
 * add specified class name to the node.
 * @param {String} className     class name to add (required)
 * @see #hasClassNameBA
 * @see #setAttributeBA
 */
BAElement.prototype.appendClassNameBA = function(className) {
	if (!className || typeof className != 'string') {
		throw 'BAElement.appendClassNameBA: first argument must be a string (className).';
	} else if (!this.hasClassNameBA(className)) {
		var cname = (this.getAttributeBA('class') || '').split(' ');
		cname.push(className);
		this.setAttributeBA('class', cname.join(' '));
	}
},

/* ----- BAElement.removeClassNameBA() ----- */
/**
 * remove only specified class name from the node.
 * @param {String} className     class name to remove (required)
 * @see #hasClassNameBA
 * @see #getAttributeBA
 * @see #setAttributeBA
 */
BAElement.prototype.removeClassNameBA = function(className) {
	if (!className || typeof className != 'string') {
		throw 'BAElement.removeClassNameBA: first argument must be a string (className).';
	} else if (this.hasClassNameBA(className)) {
		var cname = this.getAttributeBA('class').split(' ');
		var index = cname.indexOf(className);
		if (index > -1) {
			cname.splice(index, 1);
			this.setAttributeBA('class', cname.join(' '));
		}
	}
}


/* ----- BAElement.getAbsoluteOffsetBA() ----- */
/**
 * get horizontal/vertical offset length from topleft of the page.
 * @return associative array of {X, Y}
 * @type Object
 */
BAElement.prototype.getAbsoluteOffsetBA = function() {
	var offset = { X : this.offsetLeft, Y : this.offsetTop };
	if (this.offsetParent) {
		var op = this.offsetParent.getAbsoluteOffsetBA();
		// IE returns wrong value if 'offsetParent block' is position-relative...
		offset.X += op.X;
		offset.Y += op.Y;
	}
	return offset;
}



/* ======================================== Global Functions ======================================== */

/* --------------- Function : BARegisterDOMMethodsTo --------------- */
/**
 * register custom DOM methods to specified node. 
 * after this process, the node becomes a 'BAElement' element.
 * @param {Element} node     node to regist (required)
 * @param {Boolean} deep     process recursive node tree?
 * @return 'BAElement' node that custom methods were registered.
 * @type BAElement
 * @see BAElement
 */
function BARegisterDOMMethodsTo(node, deep) {
	if (node && node.instanceOf != 'BAElement' && (node.nodeType == 1 || node.nodeType == 11)) {
		for (var i in BAElement.prototype) {
			node[i] = BAElement.prototype[i];
		}
	}
	if (deep === true && deep && node.hasChildNodes()) {
		for (var i = 0, n = node.childNodes.length; i < n; i++) {
			arguments.callee(node.childNodes[i], true);
		}
	}
	return node;
}



/* --------------- Function : BAAddOnload --------------- */
/**
 * add func to window.onload functions stack.
 * @param {Function} func     function/method (required)
 * @see BADOM#addEventListenerBA
 */
function BAAddOnload(func) {
	var target = (BA.ua.isGecko || BA.ua.isOpera) ? document           : window;
	var type   = (BA.ua.isGecko)                  ? 'DOMContentLoaded' : 'load';
	target.addEventListenerBA(type, func);
}



/* --------------- Function : BAAddDuringLoad --------------- */
/**
 * periodic execute functions during page loading.
 * @param {Function} func     function/method   (required)
 * @param {Number}   wait     periodic interval in milisecond
 * @see Window#BAAddOnload
 */
function BAAddDuringLoad(func, wait) {
	if (!wait) wait = 500;
	var oFunc = arguments.callee;
	    oFunc.__store__ = [];
	    oFunc.__store__.push(new BASetInterval(func, wait));
	BAAddOnload(func);
	BAAddOnload(function() {
		for (var i = 0, n = oFunc.__store__.length; i < n; i++) {
			oFunc.__store__[i].clearTimer();
		}
	});
}



/* --------------- Function : BAAddOnunload --------------- */
/**
 * add func to window.onunload functions stack.
 * @param {Function} func     function/method (required)
 * @see BADOM#addEventListenerBA
 */
function BAAddOnunload(func) {
	window.addEventListenerBA('unload', func);
}



/* --------------- Function : BAGetCommonDir --------------- */
/**
 * get URL of common directory. (At least one external CSS that placed in 'common dir' is linked from HTML)
 * @param {String} dirName     name of common directory (required)
 * @return absolute URL of common directory.
 * @type String
 */
function BAGetCommonDir(dirName) {
	var sheets = BAGetStyleSheets();
	var ret    = '';
	if (sheets && sheets[0]) {
		var dir  = '/' + dirName + '/';
		var href = sheets[0].href || '';
		if (!href.match(/^(\.\.?\/|\w+:)/) && !href.startsWithBA('/')) {
			href = '/' + href;
		}
		if (href.indexOf(dir) > -1) {
			ret = href.getBeforeBA(dir, true);
			if (!ret.match(/^\w+:/)) {   // if ret is not absolute url (workaround for IE)
				var base = document.getElementsByTagName('base')[0];
				var burl = (base) ? base.href : location.href;
				if (ret.startsWithBA('/')) {
					ret = burl.match(/^\w+:\/*[^\/]+/) + ret;
				} else {
					ret = ret.relToAbsBA(burl);
				}
			}
		}
	}
	return ret;
}



/* --------------- Function : BAGetStyleSheets --------------- */
/**
 * get stylesheet collection.
 * @param {String} dirName     name of common directory (required)
 * @return get native document.styleSheets (in Safari, an array of 'link' nodes)
 * @type StyleSheetList/Array
 */
function BAGetStyleSheets() {
	var sheets = document.styleSheets;

	// workaround for Safari's lack of implement of document.styleSheets!
	if (sheets && sheets.length == 0 && document.getElementsByTagName) {
		var nodes  = document.getElementsByTagName('link');
            sheets = [];
		for (var i = 0, n = nodes.length; i < n; i++) {
			var rel = nodes[i].getAttribute('rel') || '';
			if (rel.endsWithBA('stylesheet')) {
				sheets.push(nodes[i]);
			}
		}
	}

	return sheets;
}



/* --------------- Function : BAGetActiveCSSTitle --------------- */
/**
 * get active style title.
 * @return active style title
 * @type String
 */
function BAGetActiveCSSTitle() {
	var sheets = BAGetStyleSheets();
	var ret    = '';
	if (sheets) {
		for (var i = 0, n = sheets.length; i < n; i++) {
			if (!sheets[i].disabled && sheets[i].title) {
				ret = sheets[i].title;
				break;
			}
		}
	}
	return ret;
}



/* --------------- Function : BASingleton --------------- */
/**
 * create object as single instance. or put existing instance.
 * @param {Function} _constructor     constructor (required)
 * @return single instance.
 * @type Object
 */
function BASingleton(_constructor) {
	return _constructor.__BASingleInstance__ || (_constructor.__BASingleInstance__ = new _constructor());
}



/* --------------- Function : BACreateDelegate --------------- */
/**
 * create delegate function to change 'this' scope.
 * @param {Function} func         function for delegate (required)
 * @param {Object}   aThisObject  the object that will be a global object ('this') in the function
 * @return delegate function.
 * @type Function
 */
function BACreateDelegate(func, aThisObject){
	var delegate = function(){
		return func.apply(aThisObject, arguments);
	};
	delegate.func        = func;
	delegate.aThisObject = aThisObject;
	return delegate; 
}



/* --------------- Function : BAAlreadyApplied --------------- */
/**
 * return 'true' if the browser not supports DOM, or
 * function/method has already applied.
 * @param {Function} func     typically 'arguments.callee' (required)
 * @return boolean
 * @type Boolean
 */
function BAAlreadyApplied(func) {
	if (!BA.ua.DOMok || func.__BAAlreadyApplied__) return true;
	func.__BAAlreadyApplied__ = true;
	return false;
}



/* --------------- Function : BAConcatNodeList --------------- */
/**
 * concat complex node lists to single plain node list array.
 * @param {Object} arguments     Node/NodeList/Array objects to concat (required)
 * @return array of nodes
 * @type Array
 */
function BAConcatNodeList() {
	var nodes = [];
	(function(list) {
		for (var i = 0, n = list.length; i < n; i++) {
			if (list[i].nodeType == 1) {
				nodes.push(list[i]);
			} else if (list[i].length > 0) {
				arguments.callee(list[i]);
			}
		}
	})(arguments);
	return nodes;
}



/* --------------- Function : BAPreloadImage --------------- */
/**
 * create Image object (load image).
 * @param {String} src     image url to load (required)
 * @return image object
 * @type Image
 */
function BAPreloadImage(src) {
	var img = new Image();
	img.src = src;
	return img;
}



/* --------------- Function : BAOpenWindow --------------- */
/**
 * open new window.
 * @param {String}  url          url to open in new window      (required)
 * @param {String}  target       window target name
 * @param {Number}  width        width of new window
 * @param {Number}  height       height of new window
 * @param {String}  options      window options wo/width,height
 * @param {Boolean} moveFlag     window options wo/width,height
 * @return new window object
 * @type Window
 */
function BAOpenWindow(url, target, width, height, options, moveFlag) {
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



/* --------------- Function : BAOpenFullscreenWindow --------------- */
/**
 * open new fullscreen window.
 * @param {String} url         url to open in new window      (required)
 * @param {String} target      window target name
 * @param {String} options     window options wo/width,height
 * @return new window object
 * @type Window
 */
function BAOpenFullscreenWindow(url, target, options) {
	options = options || 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no';
	return BAOpenWindow(url, target, screen.availWidth, screen.availHeight, options, true);
}



/* --------------- Function : BAAppendJS --------------- */
/**
 * append (load) external JavaScript file.
 * @param {String} src     script's URL to load (required)
 * @see BATag
 */
function BAAppendJS(src) {
	var E = new BATag('script');
	E.setAttributeBA('type', 'text/javascript');
	E.setAttributeBA('src' , src.replace(/~/g, '%7E'));
	E.appendChildBA('');
	document.write(E.toString());
}



/* --------------- Function : BAAppendCSS --------------- */
/**
 * append (load) external CSS file.
 * @param {String} href     CSS url to load (required)
 * @param {String} title    style title
 * @param {String} media    style media
 * @see BATag
 */
function BAAppendCSS(href, title, media) {
	var act = BAGetActiveCSSTitle();
	var E   = new BATag('link');
	E.setAttributeBA('rel', ((!title || !act || title == act) ? 'stylesheet' : 'alternate stylesheet'));
	E.setAttributeBA('type', 'text/css');
	E.setAttributeBA('media', (media || 'all'));
	E.setAttributeBA('href', href.replace(/~/g, '%7E'));
	if (title) E.setAttributeBA('title', title);
	document.write(E.toString());
}



/* --------------- Function : BAAppendStateClassName --------------- */
/**
 * append class name to the body element to distinct browser states.
 * @param {String} className    class name to set (required)
 * @see Window#BARemoveStateClassName
 */
function BAAppendStateClassName(className) {
	if (typeof className != 'string' || !className) {
		throw 'BASetStateClassName: argument must be a string.';
	} else {
		var body = document.getElementsByTagNameBA('body')[0];
		if (!body) {
			throw 'BASetStateClassName: <body> element not exists.';
		} else {
			body.appendClassNameBA(className);
		}
	}
}



/* --------------- Function : BARemoveStateClassName --------------- */
/**
 * remove class name from the body.
 * @param {String} className    class name to set (required)
 * @see Window#BAAppendStateClassName
 */
function BARemoveStateClassName(className) {
	if (typeof className != 'string' || !className) {
		throw 'BASetStateClassName: argument must be a string.';
	} else {
		var body = document.getElementsByTagNameBA('body')[0];
		if (!body) {
			throw 'BASetStateClassName: <body> element not exists.';
		} else {
			body.removeClassNameBA(className);
		}
	}
}



/* --------------- Function : BAGetGeometry --------------- */
/**
 * get window geometry and store to 'BA.geom' object.
 * @param {Event} e     exists when called as event handler.
 * @see Window#BAStartGeometryMeasure
 */
function BAGetGeometry(e) {
	var w = window;
	var d = document.documentElement;
	var b = document.getElementsByTagNameBA('body')[0];
	var isWinIEqm = BA.ua.isWinIE && (!document.compatMode || document.compatMode == 'BackCompat');
	var isMacIE   = BA.ua.isMacIE;
	var isSafari  = BA.ua.isSafari;

	BA.geom.scrollBar = _getScrollBarWidth();
	BA.geom.scrollX   = w.scrollX     || d.scrollLeft || b.scrollLeft || 0;
	BA.geom.scrollY   = w.scrollY     || d.scrollTop  || b.scrollTop  || 0;
	BA.geom.windowW   = w.innerWidth  || (isMacIE ? b.scrollWidth  : d.offsetWidth );
	BA.geom.windowH   = w.innerHeight || (isMacIE ? b.scrollHeight : d.offsetHeight);
	BA.geom.pageW     = (isMacIE) ? d.offsetWidth  : (isWinIEqm) ? b.scrollWidth  : d.scrollWidth ;
	BA.geom.pageH     = (isMacIE) ? d.offsetHeight : (isWinIEqm) ? b.scrollHeight : d.scrollHeight;
	BA.geom.windowX   = (!e) ? (BA.geom.windowX  ||  0) : e.clientX - ( isSafari ? BA.geom.scrollX : 0);
	BA.geom.windowY   = (!e) ? (BA.geom.windowY  ||  0) : e.clientY - ( isSafari ? BA.geom.scrollY : 0);
	BA.geom.mouseX    = (!e) ? (BA.geom.mouseX   ||  0) : e.clientX + (!isSafari ? BA.geom.scrollX : 0);
	BA.geom.mouseY    = (!e) ? (BA.geom.mouseY   ||  0) : e.clientY + (!isSafari ? BA.geom.scrollY : 0);
	BA.geom.nodeName  = (!e) ? (BA.geom.nodeName || '') : e.target.nodeName;

	if (BA.debugMode) {
		var arr = [BA.geom.windowW, BA.geom.windowH, BA.geom.pageW , BA.geom.pageH , BA.geom.windowX, BA.geom.windowY,
		           BA.geom.scrollX, BA.geom.scrollY, BA.geom.mouseX, BA.geom.mouseY, BA.geom.nodeName];
		var msg ='window: ${0} x ${1} | page: ${2} x ${3} | scroll: ${6}, ${7} | pos (viewport): ${4}, ${5} | pos (absolute): ${8}, ${9} | node: ${10}';
		BA_STATUSMSG.set('[Debug Mode: ON] | ' + msg.formatTextBA(arr));
	}

	function _getScrollBarWidth() {
		var id   = 'BAGetGeometry_getScrollBarWidth_testNode';
		var node = document.getElementById(id);
		if (!node) {
			node = document.createElementBA('ins');
			node.id = id;
			node.style.display    = 'block';
			node.style.visibility = 'hidden';
			node.style.overflow   = 'scroll';
			node.style.position   = 'absolute';
			node.style.border     = 'none';
			node.style.top        = node.style.left    = '-10000px';
			node.style.width      = node.style.height  = '100px';
			node.style.margin     = node.style.padding = '0';
			b.appendChildBA(node);
		}
		return (node.offsetWidth - node.clientWidth);
	}
}



/* ----- Function : BAGetZoomRatio ----- */
/**
 * get zoom ratio of the viewport (for WinIE 7.0)
 * @return current zoom ratio (0 - 1)
 * @type Number
 */
function BAGetZoomRatio() {
	var per = 1;
	if (BA.ua.isIE70) {
		if (!document.compatMode || document.compatMode == 'BackCompat') {
			per = document.documentElement.offsetWidth / document.body.offsetWidth;
		} else {
			BAGetGeometry();
			var ins = document.createElementBA('ins');
			ins.style.display  = 'block';
			ins.style.position = 'absolute';
			ins.style.top      = '-100px';
			ins.style.left     = '0px';
			ins.style.width    = (BA.geom.pageW * 10) + 'px';
			document.body.appendChildBA(ins);
			BAGetGeometry();
			per = BA.geom.pageW / ins.offsetWidth;
			document.body.removeChildBA(ins);
		}
	}
	return per;
}



/* --------------- Function : BASetWording --------------- */
/**
 * register wording data to hierarchic wording object.
 * @param {String} expression    expression of store point
 * @param {String} str           string to store
 */
function BASetWording(expression, str) {
	if (typeof expression != 'string' || typeof str != 'string') {
		throw 'BASetWording: argument type must be string.';
	} else if (!expression) {
		throw 'BASetWording: not enough arguments.';
	} else {
		var props  = expression.split('.');
		var target = 'window';
		while (props.length > 1) {
			var type    = null;
			    target += '.' + props.shift();
			try {
				type = (typeof eval(target));
			} catch(err) { }
			switch (type) {
				case 'undefined' :
					eval(target + ' = {}');
					break;
				case 'object' :
					break;
				default  : 
					throw 'BASetWording: specified expression is unavailable.';
					return;
			}
		}
		var type = null;
		try {
			type = typeof eval('window.' + expression);
		} catch(err) {
			throw 'BASetWording: specified expression is unavailable.';
		}
		if (type == 'undefined' || type == 'string') {
			eval(expression + ' = "' + str + '"');
		}
	}
}






/* ============================ Other Constructors ============================ */

/* --------------- Constructor : BASetTimeout --------------- */
/**
 * an alternate method of 'setTimeout()'.
 * @class extended 'setTimeout'
 * @constructor
 * @param {Function} func           function / method       (required)
 * @param {Number}   ms             milliseconds to timeout (required)
 * @param {Object}   aThisObject    the object that will be a global object ('this') in the func
 */
function BASetTimeout(func, ms, aThisObject) {
	/** index number of stored func.
	    @type String */
	this.storeIndex = 0;
	/** timer ID.
	    @type Number @private */
	this.timer      = null;
	/** store point name of the callback functions.
	    @type String @const @private */
	this.storeName   = 'BA_SETTIMEOUT_STOREDFUNC';
	/** store point name of the remover functions.
	    @type String @const @private */
	this.removerName = 'BA_SETTIMEOUT_STOREDFUNC_REMOVER';

	if (arguments.length) this.storeFunc(func, ms, aThisObject);
}

BASetTimeout.prototype = {
	/**
	 * store func to the entry point, and set timeout timer.
	 * @param {Function} func           function / method       (required)
	 * @param {Number}   ms             milliseconds to timeout (required)
	 * @param {Object}   aThisObject    the object that will be a global object ('this') in the func
	 * @private
	 */
	storeFunc : function(func, ms, aThisObject) {
		if (!window[this.storeName]) {
			window[this.removerName] = [];
			window[this.storeName]   = [];
			window[this.storeName].remove = function(_idx) {
				this[_idx] = null;
			};
		}

		this.storeIndex = window[this.storeName].push(BACreateDelegate(func, aThisObject));
		this.storeIndex--;
		this.setTimer(ms);
	},

	/**
	 * set timeout timer.
	 * @param {Number} ms    milliseconds to timeout (required)
	 * @private
	 */
	setTimer : function(ms) {
		var lang; if (BA.ua.isIE) lang = 'JScript'; // workaround to the page weaved with vbscript.
		this.timer = setTimeout('window.' + this.storeName + '[' + this.storeIndex + ']()', ms, lang);
		this.removeFunc(ms);
	},
	
	/**
	 * clear timer.
	 */
	clearTimer : function() {
		if (this.timer) {
			this.clearTimerMain();
			clearTimeout(window[this.removerName][this.storeIndex]);
			this.timer = null;
			this.removeFunc(0);
		}
	},

	/**
	 * clear timeout timer.
	 * @private
	 */
	clearTimerMain : function() {
		clearTimeout(this.timer);
	},

	/**
	 * remove stored func.
	 * @param {Number} delay    remove delay (milliseconds) (required)
	 * @private
	 */
	removeFunc : function(delay) {
		var lang; if (BA.ua.isIE) lang = 'JScript'; // workaround to the page weaved with vbscript.
		window[this.removerName][this.storeIndex]
			= setTimeout('window.' + this.storeName + '.remove(' + this.storeIndex + ')', delay + 1000, lang);
	}
}



/* --------------- Constructor : BASetInterval inherits BASetTimeout --------------- */
/**
 * an alternate method of 'setInterval()'.
 * @class extended 'setInterval'
 * @constructor
 * @param {Function} func           function / method         (required)
 * @param {Number}   ms             milliseconds for interval (required)
 * @param {Object}   aThisObject    the object that will be a global object ('this') in the func
 */
function BASetInterval(func, ms, aThisObject) {
	/** store point name of the callback functions.
	    @type String @const @private */
	this.storeName   = 'BA_SETINTERVAL_STOREDFUNC';
	/** store point name of the remover functions.
	    @type String @const @private */
	this.removerName = 'BA_SETINTERVAL_STOREDFUNC_REMOVER';

	if (arguments.length) this.storeFunc(func, ms, aThisObject);
}

BASetInterval.prototype = new BASetTimeout;

/**
 * set interval timer
 * @param {Number} ms    milliseconds for interval (required)
 * @private
 */
BASetInterval.prototype.setTimer = function(ms) {
	var lang; if (BA.ua.isIE) lang = 'JScript'; // workaround to the page weaved with vbscript.
	this.timer = setInterval('window.' + this.storeName + '[' + this.storeIndex + ']()', ms, lang);
}

/**
 *  clear interval timer.
 * @private
 */
BASetInterval.prototype.clearTimerMain = function() {
	clearInterval(this.timer);
}



/* --------------- Constructor : BAStatusDisplay --------------- */
/**
 * provides status display system.
 * @class status display
 * @constructor
 */
function BAStatusDisplay() {
	/** element node to display status
	    @type BAElement @private */
	this.node         = null;
	/** default message of status display.
	    @type String @private */
	this.msg          = '';
	/** default message of status display.
	    @type String @private */
	this.defaultMsg   = '';
	/** time for delaying (ms).
	    @type Number @private */
	this.delay        = 0;
	/** time for sustaining (ms).
	    @type Number @private */
	this.sustain      = 0;
	/** store point of delay timeout timer.
	    @type BASetTimeout @private */
	this.delayTimer   = null;
	/** store point of sustain timeout timer.
	    @type BASetTimeout @private */
	this.sustainTimer = null;
}

BAStatusDisplay.prototype = {
	/**
	 * initialize.
	 * @param {BAElement} node          element node to display status (required)
	 * @param {String}    defaultMsg    default status string
	 * @return status display node.
	 * @type BAElement
	 */
	init : function(node, defaultMsg) {
		this.setStatusDisplayNode(node);
		this.setDefaultMsg((typeof defaultMsg == 'string') ? defaultMsg : this.node.getInnerTextBA());
		this.node.removeAllChildrenBA();
		this.node.appendChildBA('');
		this.unset();
		return node;
	},

	/**
	 * get status display node.
	 * @return status display node.
	 * @type BAElement
	 */
	getStatusDisplayNode : function() {
		return this.node;
	},

	/**
	 * set status display node.
	 * @param {BAElement} node    element node to display status (required)
	 * @return status display node.
	 * @type BAElement
	 * @private
	 */
	setStatusDisplayNode : function(node) {
		if (!node || !node.nodeType || node.nodeType != 1) {
			throw 'BAStatusDisplay.setStatusDisplayNode: first argument must be an element node.';
		} else {
			this.node = node;
			return node;
		}
	},

	/**
	 * get default message text.
	 * @return default message text
	 * @type String
	 */
	getDefaultMsg : function() {
		return this.defaultMsg;
	},

	/**
	 * set default message text.
	 * @param {String} msg    message as default (required)
	 * @return default message text
	 * @type String
	 */
	setDefaultMsg : function(msg) {
		if (typeof msg != 'string') {
			throw 'BAStatusDisplay.setDefaultMsg: first argument must be an string.';
		} else {
			this.defaultMsg = msg;
			return msg;
		}
	},

	/**
	 * set and indicate status message.
	 * @param {String} msg         message to indicate (required)
	 * @param {Number} delay       indicate delay      (ms) 
	 * @param {Number} sustain     indicate sustain    (ms)
	 * @return message text
	 * @type String
	 */
	set : function(msg, delay, sustain) {
		if (typeof msg != 'string') {
			throw 'BAStatusDisplay.set: first argument must be an string.';
		} else {
			this.msg     = msg;
			this.delay   = (typeof delay   == 'number' && delay   > 0) ? delay   :  0;
			this.sustain = (typeof sustain == 'number' && sustain > 0) ? sustain :  0;
			if (this.delay > 0) {
				this.delayTimer = new BASetTimeout(this.setProcess, this.delay, this);
			} else {
				this.setProcess();
			}
			return msg;
		}
	},

	/**
	 * remove status message immediately.
	 */
	unset : function() {
		this.clearTimer();
		this.unsetMsg();
	},

	/**
	 * set or unset message, and set sustain timer.
	 * @private
	 */
	setProcess : function() {
		this.clearTimer();
		if (this.msg) {
			this.setMsg();
			if (this.sustain > 0) {
				this.sustainTimer = new BASetTimeout(this.unset, this.sustain, this);
			}
		} else {
			this.unset();
		}
	},

	/**
	 * set message to the node 
	 * @private
	 */
	setMsg : function() {
		if (this.node) {
			this.node.removeAllChildrenBA();
			this.node.appendChildBA(this.msg);
		}
	},

	/**
	 * unset (reset to default) msessage
	 * @private
	 */
	unsetMsg : function() {
		if (this.node) {
			this.node.removeAllChildrenBA();
			this.node.appendChildBA(this.defaultMsg);
		}
	},

	/**
	 * clear timers
	 * @private
	 */
	clearTimer : function() {
		if (this.delayTimer  ) this.delayTimer.clearTimer();
		if (this.sustainTimer) this.sustainTimer.clearTimer();
	}
}



/* --------------- Constructor : BAStatusMsg inherits BAStatusDisplay --------------- */
/**
 * constructor of 'BA_STATUSMSG' object that will be used as singleton.
 * provide status bar messaging system: constructor of 'BA_STATUSMSG' single object.
 * @class window.status message controller.
 * @constructor
 */
function BAStatusMsg() {
	/** element node not needed.
	    @type BAElement @private */
	this.node         = window.defaultStatus || '';
	/** default message of window.status.
	    @type String @private */
	this.msg          = '';
	/** default message of window.status.
	    @type String @private */
	this.defaultMsg   = '';
	/** time for delaying (ms).
	    @type Number @private */
	this.delay        = 0;
	/** time for sustaining (ms).
	    @type Number @private */
	this.sustain      = 0;
	/** store point of delay timeout timer.
	    @type BASetTimeout @private */
	this.delayTimer   = null;
	/** store point of sustain timeout timer.
	    @type BASetTimeout @private */
	this.sustainTimer = null;
}

BAStatusMsg.prototype = new BAStatusDisplay;

/**
 * initialize.
 * @param {String} msg    message as default
 * @private
 */
BAStatusMsg.prototype.init = function(defaultMsg) {
	if (typeof defaultMsg == 'string') {
		this.setDefaultMsg(defaultMsg)
	}
	this.unset();
}

/**
 * do nothing.
 * @private
 */
BAStatusMsg.prototype.getStatusDisplayNode = function() { }

/**
 * do nothing.
 * @private
 */
BAStatusMsg.prototype.setStatusDisplayNode = function() { }

/**
 * set message to 'window.status'
 * @private
 */
BAStatusMsg.prototype.setMsg = function() {
	window.status = this.msg;
}

/**
 * unset (reset to default) msessage
 * @private
 */
BAStatusMsg.prototype.unsetMsg = function() {
	window.status = this.defaultMsg;
}



/* --------------- Constructor : BATimer --------------- */
/**
 * construct elapsed timer object.
 * @class simple elapsed timer.
 * @constructor
 */
function BATimer() { 
	this.reset();
}

BATimer.prototype = {
	/**
	 * reset timer.
	 */
	reset : function() {
		this.startTime = (new Date()).getTime();
	},
	
	/**
	 * get acquire time progress in milisecond.
	 * @return acquire time progress in milisecond.
	 * @type Number
	 */
	getTime : function() {
		return (new Date()).getTime() - this.startTime;
	},
	
	/**
	 * get acquire time progress in second.
	 * @return acquire time progress in second.
	 * @type Number
	 */
	getSeconds : function() {
		return this.getTime() / 1000;
	}
}



/* --------------- Constructor : BATag --------------- */
/**
 * create tag string object for document.write().
 * @class tagstring as element object.
 * @constructor
 * @param {String} tagName     element name to create (required)
 * @param {Object} attrs       associative array { attr1 : value1, attr2 : value2 ... }
 */
function BATag(tagName, attrs) {
	/** tag name (element name) to create
	    @type String @const */
	this.tagName    = tagName;
	/** associative array of attributes. { attr1 : value1, attr2 : value2 ... }
	    @type Object */
	this.attributes = attrs || {};
	/** array of childNodes instances (BATag instances).
	    @type Array */
	this.childNodes = [];
	/** alternate for 'instanceof' operator (MacIE cannot understand that operator)
	    @type String @const */
	this.instanceOf = 'BATag';
}

BATag.prototype = {
	/**
	 * set attribute value.
	 * @param {String} attrName     attribute name (required)
	 * @param {String} value        value to set   (required)
	 */
	setAttributeBA : function(attrName, value) {
		this.attributes[attrName] = value;
	},

	/**
	 * append child instance.
	 * arg is valid also BATag and String.
	 * @param {BATag}  arg     BATag instance to append as child node (required)
	 * @param {String} arg     string to append as child text node    (required)
	 */
	appendChildBA : function(arg) {
		this.childNodes.push(arg);
	},

	/**
	 * output instance data as tag string. typically to use document.write().
	 * @param {Boolean} debug     debug mode - escaped output
	 * @return HTML tag string
	 * @type String
	 */
	toString : function(debug) {
		var tagOpen    = (debug) ? '&lt;' : '<';
		var tagClose   = (debug) ? '&gt;' : '>';
		var tag        = tagOpen + this.tagName;
		var content    = (this.childNodes.length) ? '' : null;
		for (var i = 0, n = this.childNodes.length; i < n; i++) {
			content += this.childNodes[i].toString(debug);
		}
		for (var attr in this.attributes) {
			tag += ' ' + attr + '="' + this.attributes[attr] + '"';
		}
		tag += (content != null) ?
		       	tagClose + content + tagOpen + '/' + this.tagName + tagClose :
		       	' /' + tagClose;
		return tag;
	}
}



/* --------------- Constructor : BAKeyEquivalents --------------- */
/**
 * provide keyboard equivalents system: constructor of 'BA_KEYEQUIV' single object.
 * @class keyboard equivalents
 * @constructor
 */
function BAKeyEquivalents() {
	/** associative array of key asign. { keymark : { aliasName, keyCode, DOMName }, ... }
	    @type Object @const @private */
	this.keyAlias = {
		'$' : { aliasName : 'Shift'    , keyCode : 16, DOMName : 'shiftKey' },  
		'%' : { aliasName : 'Ctrl'     , keyCode : 17, DOMName : 'ctrlKey'  },  
		'~' : { aliasName : 'Alt'      , keyCode : 18, DOMName : 'altKey'   },  /* alt (Win), option  (Mac) */
		'&' : { aliasName : 'Meta'     , keyCode : 91, DOMName : null       },  /* win (Win), command (Mac) (no browsers work this..?) */
		'#' : { aliasName : 'Enter'    , keyCode : 13, DOMName : null       },
		'|' : { aliasName : 'Tab'      , keyCode :  9, DOMName : null       },
		'!' : { aliasName : 'Esc'      , keyCode : 27, DOMName : null       },
		'<' : { aliasName : '\u2190'   , keyCode : 37, DOMName : null       },  /* left  */
		'{' : { aliasName : '\u2191'   , keyCode : 38, DOMName : null       },  /* up    */
		'>' : { aliasName : '\u2192'   , keyCode : 39, DOMName : null       },  /* right */
		'}' : { aliasName : '\u2193'   , keyCode : 40, DOMName : null       }   /* down  */
	}
	/** associative array of key equivalents. { name : { key, aCallBack, aThisObject }, ... }
	    @type Object @private */
	this.equivalents = {};
	/** number of equivalents
	    @type Number @private */
	this.numOfEquivs = 0;
}

BAKeyEquivalents.prototype = {
	/**
	 * initialize. (call this after window.onload)
	 * @private
	 */
	init : function() {
		document.addEventListenerBA('keydown', BACreateDelegate(this.dispatchEvent, this));
	},

	/**
	 * register key equivalent for function call.
	 * @param {String}   key            key bind setting string     (required)
	 * @param {String}   name           name for the equivalent
	 * @param {Function} aCallBack      function for the equivalent (required)
	 * @param {Object}   aThisObject    the object that will be a global object ('this') in aCallBack func
	 * @return name of the equivalent
	 * @type String
	 */
	addKeyEquivalent : function(key, name, aCallBack, aThisObject) {
		this.numOfEquivs++;
		if (!name) name = 'BAKeyEquivalents' + this.numOfEquivs;
		this.equivalents[name] = { key : key, aCallBack : aCallBack, aThisObject : aThisObject };
		return name;
	},
	
	/**
	 * get key bind string in human readable format.
	 * @param {String} name    equivalent name (required)
	 * @return key bind string
	 * @type String
	 */
	getKeybind : function(name) {
		var equiv = this.equivalents[name];
		var keys  = equiv.key.split('');
		var ret   = [];
		for (var i = 0, n = keys.length; i < n; i++) {
			ret.push(this.keyAlias[keys[i]] ? this.keyAlias[keys[i]].aliasName : keys[i].toUpperCase());
		}
		return ret;
	},
	
	/**
	 * call registered function in purpose (without key operation).
	 * @param {String} name    equivalent name (required)
	 * @param {Event}  e       event object    (required)
	 * @private
	 */
	doCallBack : function(name, e) {
		if (name && this.equivalents[name]) {
			var equiv = this.equivalents[name];
			equiv.aCallBack.call(equiv.aThisObject, e);
		}
	},
	
	/**
	 * call registered function by event driven.
	 * @param {Event} e    event object
	 * @private
	 */
	dispatchEvent : function(e) {
		for (var name in this.equivalents) {
			var equiv = this.equivalents[name];
			var keys  = equiv.key.split('');
			var flag  = true;
			for (var i = 0, n = keys.length; (i < n && flag); i++) {
				var key      = keys[i].toLowerCase();
				var keyAlias = this.keyAlias[key];
				if (keyAlias && keyAlias.DOMName) {
					flag = (flag && e[keyAlias.DOMName]);
				} else if (keyAlias && keyAlias.keyCode) {
					flag = (flag && (e.keyCode == keyAlias.keyCode));
				} else {
					var chr = String.fromCharCode(e.charCode ? e.charCode : e.keyCode).toLowerCase();
					flag = (flag && (key == chr));
				}
			}
			if (flag) {
				this.doCallBack(name, e);
			}
		}
	}
}






/* =============== Startup Functions (non-DOM / pre onload) =============== */

/* ----- BARegisterDOMMethods ----- */
/**
 * register custom DOM methods.
 * this process uses OOP way at browsers whose have good implements,
 * but other poor browsers need 'round-robin way' after page onload.
 * @see BADOM
 * @see Window#BARegisterDOMMethodsTo
 * @see Window#BARegisterDOMMethodsRoundRobin
 */
function BARegisterDOMMethods() {
	// register as Node prototypes
	if ((typeof Node == 'object' || typeof Node == 'function') && Node.prototype) {
		for (var name in BAElement.prototype) {
			Node.prototype[name] = BAElement.prototype[name];
		}
	}
	
	// register to Document object
	for (var name in BADocument.prototype) {
		document[name] = BADocument.prototype[name];
	}

	// register to Window object
	for (var name in BAWindow.prototype) {
		window[name] = BAWindow.prototype[name];
	}
}

/* ----- BAAppendReviseCSS ----- */
/**
 * Load revise CSS file for specific browsers.
 * @see Window#BAAppendCSS
 */
function BAAppendReviseCSS() {
	for (var i in BA.css.revise) {
		var ua = i.split('.')[0];
		var os = i.split('.')[1];
		if (os && BA.ua['is' + os] && BA.ua['is' + ua] || !os && BA.ua['is' + ua]) {
			BAAppendCSS(BA.url.cssDir + BA.css.revise[i], BA.css.reviseTitle);
			break;
		}
	}
}






/* =============== Startup Functions (DOM / post onload) =============== */

/* ----- BARegisterDOMMethodsRoundRobin ----- */
/**
 * add custom methods to all existing nodes by 'round-robin way'.
 * this process is used for WinIE/MacIE/Safari/Opera/etc, those can't use OOP way.
 * @see Window#BARegisterDOMMethodsTo
 */
function BARegisterDOMMethodsRoundRobin() {
	if ((typeof Node == 'object' || typeof Node == 'function') && Node.prototype) return;
	if (BAAlreadyApplied(arguments.callee)) return;
	document.getElementsByTagNameBA('*').forEach(BARegisterDOMMethodsTo);
}

/* ----- BAScrollToFragmentIDTarget ----- */
/**
 * auto scroll to the block that specified by fragment identifier of URL (Safari only).
 * why needed this, Safari fails native cue scroll in the case of
 * stylesheet(s) is/are dynamically appended by 'document.write'! (that in BAAppendCSS())
 */
function BAScrollToFragmentIDTarget() {
	if (BAAlreadyApplied(arguments.callee)) return;
	if (!BA.ua.isSafari || !BA.css.revise.Safari) return;

	var target = location.hash                   || '';
	    target = target.split('#')[1]            || '';
	    target = document.getElementById(target) || null;
	if (target) {
		window.scrollTo(0, target.getAbsoluteOffsetBA().Y);
	}
}

/* ----- BAStartGeometryMeasure ----- */
/**
 * start measuring window geometry.
 * @see Window#BAGetGeometry
 */
function BAStartGeometryMeasure() {
	if (!BA.debugMode || BAAlreadyApplied(arguments.callee)) return;

	BAGetGeometry();
	document.addEventListenerBA('mousemove' , BAGetGeometry);
	document.addEventListenerBA('mousewheel', BAGetGeometry);
}






/* =============== Postprocess Functions (DOM / onunload) =============== */

/* ----- BACleanUpEventListeners ----- */
/**
 * Clean-up event listeners of the nodes.
 * @see BADOM#addEventListenerBA
 */
function BACleanUpEventListeners() {
	if (BA_EVENTLISTENER_STORED_NODES) {
		BA_EVENTLISTENER_STORED_NODES.forEach(function(node) {
			for (var type in node.__addEventListenerBA_stored__) {
				if (type != 'unload') {
					node['on' + type] = null;
				}
			}
			node.__addEventListenerBA_stored__ = null;
		});
	}
}






/* ============================== Main ============================== */

BA           = BASingleton(BAEnvironment);
BA_STATUSMSG = BASingleton(BAStatusMsg);
BA_KEYEQUIV  = BASingleton(BAKeyEquivalents);

BARegisterDOMMethods();
BAAppendReviseCSS();
if (BA.ua.isWinIE && BA.ua.revision < 7) {
	document._getElementById = document.getElementById;
	document.getElementById = function(id) {
		var node = document._getElementById(id);
		if (node) {
			BARegisterDOMMethodsTo(node);
		}
		return node;
	}
}
BAAddOnload(function() {
	if (BA.ua.isWinIE && BA.ua.revision < 7) {
		BARegisterDOMMethodsTo(document.documentElement);
		BARegisterDOMMethodsTo(document.body);
	} else {
		BARegisterDOMMethodsRoundRobin();
	}
	BAScrollToFragmentIDTarget();
	BAStartGeometryMeasure();
	BA_KEYEQUIV.init();
	BA_STATUSMSG.unset();
});

BAAddOnunload(function() {
	BACleanUpEventListeners();
});