goog.provide('sb.Node');

goog.require('sb.NodeType');
goog.require('sb.NodeTypeHelper');
goog.require('sb.model.AttributeObject');

/**
 * Class for the nodes. Do not use the constructor, use sb.Document.prototype.createNode instead.
 * @param {!sb.Document} document the document to bind
 * @constructor
 * @extends sb.model.AttributeObject
 * @export
 */
sb.Node = function (document) {
    goog.base(this);
    /**
     * @private
     * @type {sb.Document}
     */
    this.document_ = document;

    /**
     *
     * @type {Array.<sb.Node>}
     * @private
     */
    this.children_ = [];

    /**
     * The parent node.
     * @type {sb.Node}
     */
    this.parent = null;
    //TODO: discuss about multiple parents

};

goog.inherits(sb.Node, sb.model.AttributeObject);

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
    return /** @type{sb.NodeType|sb.Node}*/this.attr('type', opt_type);
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
 * @return {string|sb.Node} current id or sb.Node instance for chaining
 * @export
 */
sb.Node.prototype.id = function (opt_id) {
    if (goog.isDef(opt_id)) {
        this.assertIdUnique_(opt_id);
    }
    return /** @type{string|sb.Node}*/this.attr('id', opt_id, this.document_);
};

/**
 * Setter/getter of node label.
 * @param {string=} opt_label label value to set
 * @return {*|sb.Node} current label or sb.Node instance for chaining
 * @export
 */
sb.Node.prototype.label = function (opt_label) {
    return this.attr('label', opt_label);
};

/**
 * Create a new node as a sub node of current node.
 * @param opt_id Optional id of node.
 * @return {sb.Node}
 * @export
 */
sb.Node.prototype.createSubNode = function (opt_id) {
    var node = this.document_.createNode(opt_id);
    this.addChild(node);
    return node;
};

/**
 * The node to be added as child.
 * @param {sb.Node} node
 * @export
 */
sb.Node.prototype.addChild = function (node) {
    if (node.parent) {
        node.parent.removeChild(node);
    }
    goog.array.insert(this.children_, node);
};

/**
 * Remove child node from current node.
 * @param node
 * @export
 */
sb.Node.prototype.removeChild = function (node) {
    goog.array.remove(this.children_, node);
    node.parent = null;
};

/**
 * Return array of child nodes. The array should be treated as read-only. Use sb.Node.prototype.addChild and sb.Node.prototype.removeChild to modify the child nodes.
 * @return {Array.<sb.Node>}
 */
sb.Node.prototype.children=function(){
    return this.children_;
};