goog.provide('sb.Port');

goog.require('sb.model.Element');

/**
 * Class for port.
 * @param {!sb.Document} document the document to bind
 * @constructor
 * @extends sb.model.Element
 * @export
 */
sb.Port = function (document) {
    goog.base(this,document);
};

goog.inherits(sb.Port, sb.model.Element);