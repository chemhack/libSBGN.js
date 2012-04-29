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
    var arc = this.document_.arc(arcId);
    if (arc && arc != this) {
        throw new Error('Given arc id ' + arcId + ' already existed');
    }
};

/**
 * Setter/getter of arc id.
 * @param {string=} opt_id id value to set
 * @return {string|sb.Arc} current id or sb.Arc instance for chaining
 * @export
 */
sb.Arc.prototype.id = function (opt_id) {
    if (goog.isDef(opt_id)) {
        this.assertIdUnique_(opt_id);
    }
    return /** @type{string|sb.Arc}*/this.attr('id', opt_id, this.document_);
};

/**
 * Setter/getter of arc source.
 * @param {sb.Node=} opt_source
 * @return {sb.Node|sb.Arc} current id or sb.Arc instance for chaining
 * @export
 */

sb.Arc.prototype.source=function(opt_source){
    return /** @type{sb.Node|sb.Arc}*/this.attr('source', opt_source);
};

/**
 * Setter/getter of arc target.
 * @param {sb.Node=} opt_target
 * @return {sb.Node|sb.Arc} current id or sb.Arc instance for chaining
 * @export
 */

sb.Arc.prototype.target=function(opt_target){
    return /** @type{sb.Node|sb.Arc}*/this.attr('target', opt_target);
};
