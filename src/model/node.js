goog.provide('sb.Node');

goog.require('sb.NodeType');
goog.require('sb.NodeTypeHelper');
goog.require('sb.model.Element');
goog.require('sb.Port');

/**
 * Class for the nodes. Do not use the constructor, use sb.Document.prototype.createNode instead.
 * @see sb.Document#createNode
 * @param {!sb.Document} document the document to bind
 * @constructor
 * @extends sb.model.Element
 * @export
 */
sb.Node = function (document) {
    goog.base(this,document);

};

goog.inherits(sb.Node, sb.model.Element);

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
 * Setter/getter of node label.
 * @param {string=} opt_label label value to set
 * @return {string|sb.Node} current label or sb.Node instance for chaining
 * @export
 */
sb.Node.prototype.label = function (opt_label) {
    return /** @type{string|sb.Node}*/this.attr('label', opt_label);
};

///**
// * Setter/getter of clone marker attribute.
// * @param {boolean=} opt_clone boolean value to set
// * @return {boolean|sb.Node} current clone marker attribute value or sb.Node instance for chaining
// * @export
// */
//sb.Node.prototype.clone = function (opt_clone) {
//    return /** @type{boolean|sb.Node}*/this.attr('clone', opt_clone);
//};


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
 * Create a port as a child of current node.
 * @param opt_id Optional id of node.
 * @return {sb.Port}
 * @export
 */
sb.Node.prototype.createPort = function (opt_id) {
    var port = this.document_.createPort(opt_id);
    this.addChild(port);
    return port;
};
