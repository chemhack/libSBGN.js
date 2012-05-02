goog.provide('sb.io.JsbgnReader');

goog.require('sb.Document');
goog.require('goog.array');
goog.require('sb.Box');
goog.require('sb.Point');
goog.require('goog.asserts');
goog.require('goog.debug.Logger');

/**
 * Reader of jsbgn
 * @constructor
 * @export
 */
sb.io.JsbgnReader = function () {

    /**
     * The sb.Document to work on.
     * @type {sb.Document}
     * @private
     */
    this.document_ = null;

    /**
     * Temp array used to store compartments
     * @type {Array.<sb.Node>}
     * @private
     */
    this.compartments_ = null;

};


sb.io.JsbgnReader.prototype.logger = goog.debug.Logger.getLogger('sb.io.JsbgnReader');

/**
 *
 * @param text
 * @return {sb.Document}
 * @export
 */
sb.io.SbgnReader.prototype.parseText = function (text) {
    this.objStack_ = new sb.util.Stack();
    this.document_ = new sb.Document();
    this.compartments_ = [];
    return this.document_;
};

