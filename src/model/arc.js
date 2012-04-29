goog.provide('sb.Arc');

/**
 * Class for the arcs. Do not use the constructor, use sb.Document.prototype.createArc instead.
 * @param {!sb.Document} document the document to bind
 * @constructor
 * @extends {sb.model.AttributeObject}
 */
sb.Arc = function (document) {
    goog.base(this);
    /**
     * @private
     * @type {sb.Document}
     */
    this.document_ = document;
};

goog.inherits(sb.Arc, sb.model.AttributeObject);

/**
 * Make sure no other arc has the same id.
 * @param arcId Id to check.
 * @private
 */
sb.Arc.prototype.assertIdUnique_ = function (arcId) {
    var node = this.document_.arc(arcId);
    if (node && node != this) {
        throw new Error('Given arc id ' + arcId + ' already existed');
    }
};

/**
 * Setter/getter of node id.
 * @param {string=} opt_id id value to set
 * @return {string|sb.Arc} current id or sb.Node instance for chaining
 * @export
 */
sb.Arc.prototype.id = function (opt_id) {
    if (goog.isDef(opt_id)) {
        this.assertIdUnique_(opt_id);
    }
    return /** @type{string|sb.Arc}*/this.attr('id', opt_id, this.document_);
};

