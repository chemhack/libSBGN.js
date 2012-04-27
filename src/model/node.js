goog.provide('sb.Node');

goog.require('sb.Document');
goog.require('sb.NodeType');
goog.require('sb.util.property');
goog.require('goog.structs.Map');

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
     * The type of the node, see sb.NodeType
     * @private
     * @type {sb.NodeType}
     */
    this.type_ = sb.NodeType.UnspecifiedEntity;

    /**
     * Internal attribute map
     * @type {goog.structs.Map}
     * @private
     */
    this.attrs_=new goog.structs.Map();
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
    return this.attr('id',opt_id);
};

/**
 * Setter/getter of node label.
 * @param {string=} opt_label label value to set
 * @return {string|sb.Node} current label or sb.Node instance for chaining
 */
sb.Node.prototype.label = function (opt_label) {
    return this.attr('label',opt_label);
};

/**
 * Setter/getter of attribute.
 * @param {string} key key
 * @param {*=} opt_value label value to set
 * @return {*|sb.Node} current label or sb.Node instance for chaining
 */
sb.Node.prototype.attr=function(key,opt_value){
    if(goog.isDef(opt_value)){
        this.attrs_.set(key,opt_value);
        return this;
    }else{
        return this.attrs_.get(key);
    }
};
