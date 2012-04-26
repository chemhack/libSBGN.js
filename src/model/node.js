goog.provide('sb.Node');

goog.require('sb.NodeType');

/**
 * Class for the nodes.
 * @param {string=} opt_id Optional id of the node.
 * @constructor
 * @export
 */
sb.Node = function (opt_id) {
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
    this.type = sb.NodeType.UnspecifiedEntity;
};

/**
 * Returns the node type
 * @return {sb.NodeType}
 * @export
 */
sb.Node.prototype.getType = function () {
    return this.type;
};
/**
 * Set node type, a error will be thrown if the node type is invalid, see sb.NodeType
 * @param {sb.NodeType|string} type
 * @export
 */
sb.Node.prototype.setType = function (type) {
    if (!sb.NodeTypeHelper.isNodeTypeSupported(type)) {
        throw new Error('Given node type ' + type + ' is not supported.');
    }
    this.type = /** @type{sb.NodeType} */ (type); //make sure node type is checked
};