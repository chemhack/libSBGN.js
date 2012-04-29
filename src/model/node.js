goog.provide('sb.Node');

goog.require('sb.Document');
goog.require('sb.NodeType');
goog.require('sb.FuckingAttribute');
goog.require('goog.structs.Map');

/**
 * Class for the nodes. Do not use the constructor, use sb.Document.prototype.createNode instead.
 * @param {!sb.Document} document the document to bind
 * @constructor
 * @extends {sb.AttributeObject}
 */
sb.Node = function (document) {
    sb.FuckingAttribute.call(this);
    /**
     * @private
     * @type {sb.Document}
     */
    this.document_ = document;

    /**
     * The type of the node, see sb.NodeType
     * @private
     * @type {sb.NodeType}
     */
    this.type_ = sb.NodeType.UnspecifiedEntity;

};

goog.inherits(sb.Node,sb.FuckingAttribute);

/**
 * Setter/getter of node type. An error will be thrown if the node type is invalid, see sb.NodeType
 * @param {sb.NodeType|string=} opt_type
 * @return {sb.NodeType|sb.Node} current node type or sb.Node instance for chaining
 * @export
 */
sb.Node.prototype.type = function (opt_type) {
    if (goog.isDef(opt_type)) {
        if (!sb.NodeTypeHelper.isNodeTypeSupported(opt_type)) {
            throw new Error('Given node type ' + opt_type + ' is not supported.');
        }
    }
    return sb.FuckingAttribute.prototype.attr.call(this,'type', opt_type);
};

/**
 * Make sure no other node has the same id.
 * @param nodeId Id to check.
 * @private
 */
sb.Node.prototype.assertIdUnique_ = function (nodeId) {
    var node = this.document_.node(nodeId);
    if (node && node != this) {
        throw new Error('Given node id ' + nodeId + ' already existed');
    }
};

/**
 * Setter/getter of node id.
 * @param {string=} opt_id id value to set
 * @return {*|sb.Node} current id or sb.Node instance for chaining
 */
sb.Node.prototype.id = function (opt_id) {
    if (goog.isDef(opt_id)) {
        this.assertIdUnique_(opt_id);
    }
    return sb.FuckingAttribute.prototype.attr.call(this,'id', opt_id, this.document_);
};

/**
 * Setter/getter of node label.
 * @param {string=} opt_label label value to set
 * @return {*|sb.Node} current label or sb.Node instance for chaining
 */
sb.Node.prototype.label = function (opt_label) {
    return sb.FuckingAttribute.prototype.attr.call(this,'label', opt_label);
};



