/* -------------------------------------------------------------------------- */
/** 
 *    @fileoverview
 *       make an object to be observable.
 *
 *    @version rev001.2007-01-24
 *    @requires common.js
 */
/* -------------------------------------------------------------------------- */

/**
 * BAObservable
 * $Id$
 *
 * @constructor
 */
function BAObservable() {
    this.callBackChains = {};
};


/**
 *
 * @param {String} name
 */
BAObservable.prototype.doCallBack = function (name) {
    if (this.callBackChains[name] == null)
        return null;
    
    var retVal;
    var args = [];
    for (var i = 1, n = arguments.length; i < n; i++) {
        args.push(arguments[i]);
    }
    this.callBackChains[name].forEach(function(f) {
        f.apply(args);
    });
    
    return retVal;
};

/**
 *
 * @param {String} name
 * @param {Function} func
 * @param {Object} aThisObject
 */
BAObservable.prototype.setCallBack = function (name, func, aThisObject) {
    if (this.callBackChains[name] == null)
        this.callBackChains[name] = [];
    
    this.callBackChains[name].push(new CallBackFunc(name, BACreateDelegate(func, aThisObject)));
};

/**
 *
 * @param {String} name
 * @param {Function} func
 * @constructor
 */
function CallBackFunc(name, func) {
    this.name = name;
    this.callBack = func;
}

/**
 *
 * @param {Array} argsArray
 * @return
 */
CallBackFunc.prototype.apply = function (argsArray) {
    return this.callBack.apply(null, argsArray);
};