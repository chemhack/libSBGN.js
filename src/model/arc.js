goog.provide('sb.Arc');

goog.require('sb.ArcType');
goog.require('sb.ArcTypeHelper');
goog.require('sb.model.AttributeObject');


/**
 * Class for the arcs. Do not use the constructor, use sb.Document.prototype.createArc instead.
 * @param {!sb.Document} document the document to bind
 * @constructor
 * @extends sb.model.AttributeObject
 * @export
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
 * Setter/getter of node type. An error will be thrown if the node type is invalid, see sb.ArcType
 * @param {sb.ArcType|string=} opt_type
 * @return {sb.ArcType|sb.Arc} current node type or sb.Node instance for chaining
 * @export
 */
sb.Arc.prototype.type = function (opt_type) {
    if (goog.isDef(opt_type)) {
        if (!sb.ArcTypeHelper.isArcTypeSupported(opt_type)) {
            throw new Error('Given arc type ' + opt_type + ' is not supported.');
        }
    }
    return /** @type{sb.ArcType|sb.Arc}*/this.attr('type', opt_type);
};


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
 * @param {string|sb.Node=} opt_source node or its id
 * @return {sb.Node|sb.Arc} current source or sb.Arc instance for chaining
 * @export
 */

sb.Arc.prototype.source = function (opt_source) {
    if (opt_source && goog.isString(opt_source)) {
        var node = this.document_.node(opt_source);
        if (!node) {
            throw new Error('Node ' + opt_source + ' do not exist.');
        }
        opt_source = node;
    }
    return /** @type{sb.Node|sb.Arc}*/this.attr('source', opt_source);
};

/**
 * Setter/getter of arc target.
 * @param {string|sb.Node=} opt_target
 * @return {sb.Node|sb.Arc} current target or sb.Arc instance for chaining
 * @export
 */

sb.Arc.prototype.target = function (opt_target) {
    if (opt_target && goog.isString(opt_target)) {
        var node = this.document_.node(opt_target);
        if (!node) {
            throw new Error('Node ' + opt_source + ' do not exist.');
        }
        opt_target = node;
    }
    return /** @type{sb.Node|sb.Arc}*/this.attr('target', opt_target);
};
