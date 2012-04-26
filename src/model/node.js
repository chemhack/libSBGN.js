goog.provide('sb.Node');

goog.require('sb.Document');
goog.require('sb.NodeType');

/**
 * Class for the nodes. Do not use the constructor, use sb.Document.prototype.createNode instead.
 * @param {!sb.Document} document the document to bind
 * @param {string=} opt_id Optional id of the node.
 * @constructor
 */
sb.Node = function (document, opt_id) {
    /**
     * @private
     * @type {sb.Document}
     */
    this.document_ = document;
    /**
     * @public
     * @type {?string}
     */
    this.id = opt_id ? opt_id : null;
    /**
     * The type of node, see sb.NodeType
     * @private
     * @type {sb.NodeType}
     */
    this.type_ = sb.NodeType.UnspecifiedEntity;
};

/**
 * Setter/getter of node type. An error will be thrown if the node type is invalid, see sb.NodeType
 * @param {sb.NodeType|string} type
 * @return {sb.NodeType} always return current node type
 * @export
 */
sb.Node.prototype.type = function (type) {
    if (goog.isDef(type)) {
        if (!sb.NodeTypeHelper.isNodeTypeSupported(type)) {
            throw new Error('Given node type ' + type + ' is not supported.');
        }
        this.type_ = /** @type{sb.NodeType} */ (type); //make sure node type is checked
    }
    return this.type_;
};