goog.provide('sb.Node');

goog.require('sb.Document');
goog.require('sb.NodeType');
goog.require('sb.util.property');

/**
 * Class for the nodes. Do not use the constructor, use sb.Document.prototype.createNode instead.
 * @param {!sb.Document} document the document to bind
 * @param {string=} opt_id id of the node.
 * @constructor
 */
sb.Node = function (document) {
    /**
     * @private
     * @type {sb.Document}
     */
    this.document_ = document;
    /**
     * @private
     * @type {?string}
     */
    this.id_ = null;
    /**
     * The type of the node, see sb.NodeType
     * @private
     * @type {sb.NodeType}
     */
    this.type_ = sb.NodeType.UnspecifiedEntity;

    /**
     * Label of the node
     * @type {string}
     * @private
     */
    this.label_ = null;
};

/**
 * Setter/getter of node type. An error will be thrown if the node type is invalid, see sb.NodeType
 * @param {sb.NodeType|string} type
 * @return {sb.NodeType|sb.Node} current node type or sb.Node instance for chaining
 * @export
 */
sb.Node.prototype.type = function (type) {
    if (goog.isDef(type)) {
        if (!sb.NodeTypeHelper.isNodeTypeSupported(type)) {
            throw new Error('Given node type ' + type + ' is not supported.');
        }
        this.type_ = /** @type{sb.NodeType} */ (type); //make sure node type is checked
        return this;
    } else {
        return this.type_;
    }
};

/**
 * Setter/getter of node id.
 * @param {string=} opt_id id value to set
 * @return {string|sb.Node} current id or sb.Node instance for chaining
 */
sb.Node.prototype.id = function (opt_id) {
    if (goog.isDef(opt_id)) {
        this.id_=opt_id;
        return this;
    } else {
        return this.id_;
    }
};

/**
 * Setter/getter of node label.
 * @param {string=} opt_label label value to set
 * @return {string|sb.Node} current label or sb.Node instance for chaining
 */
sb.Node.prototype.label = function (opt_label) {
    if (goog.isDef(opt_label)) {
        this.label_=opt_label;
        return this;
    } else {
        return this.label_;
    }
};

