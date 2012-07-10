goog.provide('sb.ArcGroup');

goog.require('sb.Arc');
goog.require('sb.ArcType');
goog.require('sb.ArcTypeHelper');
goog.require('sb.model.AttributeObject');


/**
 * Class for arc groups. Do not use the constructor, use sb.Document.prototype.createArcGroup instead.
 * @param {!sb.Document} document the document to bind
 * @constructor
 * @extends sb.model.Element
 * @export
 */
sb.ArcGroup = function (document) {
    goog.base(this,document);
};

goog.inherits(sb.ArcGroup, sb.model.Element);

//TODO: finish the class, add relevant methods in document