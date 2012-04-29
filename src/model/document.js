goog.provide('sb.Document');

goog.require('sb.Node');
goog.require('sb.Arc');

goog.require('goog.structs.Map');

/**
 * Class for the root structure of a system biology document.
 * @param {string=} opt_id Optional id of the document.
 * @constructor
 * @export
 */
sb.Document = function (opt_id) {
    this.id = opt_id;

    /**
     * The sequence variable used to name node id.
     * @type {number}
     * @private
     */
    this.nodeIdSeq_ = 1;

    /**
     * The sequence variable used to name arc id.
     * @type {number}
     * @private
     */
    this.arcIdSeq_ = 1;

    /**
     * Node map
     * @type {Object.<string, sb.Node>}
     * @private
     */
    this.nodes_ = new goog.structs.Map();

    /**
     * Arc map
     * @type {Object.<string, sb.Arc>}
     * @private
     */
    this.arcs_ = new goog.structs.Map();
};

/**
 * Create a new node within the document.
 * @param {string=} opt_id Optional id of node.
 * @return {sb.Node}
 * @export
 */
sb.Document.prototype.createNode = function (opt_id) {
    var id = opt_id ? opt_id : this.nextNodeId_();
//    if (this.nodes_.containsKey(id)) {
//        throw new Error("Given id " + id + " already exists.");
//    }
    return /** @type{sb.Node} */(new sb.Node(this).id(id));
};

/**
 * Get next unused node id.
 * @return {string}
 * @private
 */
sb.Document.prototype.nextNodeId_ = function () {
    var nextNodeId_ = "node" + this.nodeIdSeq_++;
    if (this.node(nextNodeId_)) {
        return this.nextNodeId_();
    } else {
        return nextNodeId_;
    }
};

/**
 * Readonly. Get all nodes within the document.
 * @return {Array.<sb.Node>}
 * @export
 */
sb.Document.prototype.nodes = function () {
    return this.nodes_.getValues();
};

/**
 * Return the node of given id.
 * @param id
 * @return {sb.Node}
 * @export
 */
sb.Document.prototype.node = function (id) {
    return this.nodes_.get(id);
};

/**
 * Create a new arc within the document.
 * @param {string=} opt_id Optional id of arc.
 * @return {sb.Arc}
 * @export
 */
sb.Document.prototype.createArc = function (opt_id) {
    var id = opt_id ? opt_id : this.nextArcId_();
    return /** @type{sb.Arc}*/(new sb.Arc(this).id(id));
};

/**
 * Create an arc from two nodes
 * @param {sb.Node} source
 * @param {sb.Node} target
 * @return {sb.Arc}
 * @export
 */
sb.Document.prototype.connect=function(source,target){
    var arc=this.createArc();
    arc.source(source).target(target);
    return arc;
};

/**
 * Get next unused arc id.
 * @return {string}
 * @private
 */
sb.Document.prototype.nextArcId_ = function () {
    var nextArcId_ = "arc" + this.arcIdSeq_++;
    if (this.arc(nextArcId_)) {
        return this.nextArcId_();
    } else {
        return nextArcId_;
    }
};


/**
 * Readonly. Get all arcs within the document.
 * @return {Array.<sb.Arc>}
 * @export
 */
sb.Document.prototype.arcs = function () {
    return this.arcs_.getValues();
};

/**
 * Return the arc of given id.
 * @param id
 * @return {sb.Arc}
 * @export
 */
sb.Document.prototype.arc = function (id) {
    return this.arcs_.get(id);
};

/**
 * sb.Node and sb.Arc will call this method when attribute of their value is changed.
 * @param object{sb.Node|sb.Arc} The object(sb.Node or sb.Arc) which attribute is changed.
 * @param key{string} Attribute name
 * @param oldValue{string} The old value of attribute
 * @param newValue{string} The new value of attribute
 * @protected
 */
sb.Document.prototype.onAttrChange = function (object, key, oldValue, newValue) {
    if (key == 'id' && oldValue) {
        if (object instanceof sb.Node) {
            this.nodes_.remove(oldValue);
            this.nodes_.set(newValue, object);
        } else if (object instanceof sb.Arc) {
            this.arcs_.remove(oldValue);
            this.arcs_.set(newValue, object);
        }
    }
};