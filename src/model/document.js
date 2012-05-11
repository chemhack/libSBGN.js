goog.provide('sb.Document');

goog.require('sb.Node');
goog.require('sb.Arc');

goog.require('goog.structs.Map');
goog.require('goog.array');

/**
 * Class for the root structure of a system biology document.
 * @param {string=} opt_id Optional id of the document.
 * @constructor
 * @extends sb.model.AttributeObject
 * @export
 */
sb.Document = function (opt_id) {
    goog.base(this);

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
     * The sequence variable used to name port id.
     * @type {number}
     * @private
     */
    this.portIdSeq_ = 1;

    /**
     * Id-Object map of all elements.
     * @type {goog.structs.Map}
     * @private
     */
    this.elementMap_ = new goog.structs.Map();

    /**
     * Node map
     * @type {Array.<sb.Node>}
     * @private
     */
    this.nodes_ = [];

    /**
     * Arc map
     * @type {Array.<sb.Arc>}
     * @private
     */
    this.arcs_ = [];
};

goog.inherits(sb.Document,sb.model.AttributeObject);

/**
 * Create a new node within the document.
 * @param {string=} opt_id Optional id of node.
 * @return {sb.Node}
 * @export
 */
sb.Document.prototype.createNode = function (opt_id) {
    var id = opt_id ? opt_id : this.nextNodeId_();
    var node = /** @type{sb.Node} */ new sb.Node(this).id(id);
    goog.array.insert(this.nodes_,node);
    return node;
};

/**
 * Get next unused node id.
 * @return {string}
 * @private
 */
sb.Document.prototype.nextNodeId_ = function () {
    var nextNodeId_ = "node" + this.nodeIdSeq_++;
    if (this.element(nextNodeId_)) {
        return this.nextNodeId_();
    } else {
        return nextNodeId_;
    }
};

/**
 * Readonly. Get all nodes within the document.
 * @param {boolean=} opt_noSubNodes If set to true, only nodes without a parent node will be returned.
 * @return {Array.<sb.Node>}
 * @export
 */
sb.Document.prototype.nodes = function (opt_noSubNodes) {
    if (opt_noSubNodes) {
        return goog.array.filter(this.nodes_, function (node, idx, arr) {
            return node.parent ? false : true;
        });
    }
    return this.nodes_;
};

/**
 * Return the node of given id.
 * @param id
 * @return {sb.Node}
 * @export
 */
sb.Document.prototype.node = function (id) {
    var element = this.element(id);
    if(element instanceof sb.Node){
        return element;
    }
    return null;
};

/**
 * Return the element of given id.
 * @param id
 * @return {sb.model.Element}
 */
sb.Document.prototype.element = function (id) {
    return  /** @type{sb.model.Element}*/ this.elementMap_.get(id);
};

/**
 * Create a new arc within the document.
 * @param {string=} opt_id Optional id of arc.
 * @return {sb.Arc}
 * @export
 */
sb.Document.prototype.createArc = function (opt_id) {
    var id = opt_id ? opt_id : this.nextArcId_();
    var arc = /** @type{sb.Arc}*/ new sb.Arc(this).id(id);
    goog.array.insert(this.arcs_,arc);
    return arc;
};

/**
 * Create an arc from two nodes
 * @param {sb.Node} source
 * @param {sb.Node} target
 * @return {sb.Arc}
 * @export
 */
sb.Document.prototype.connect = function (source, target) {
    var arc = this.createArc();
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
    if (this.element(nextArcId_)) {
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
    return this.arcs_;
};

/**
 * Return the arc of given id.
 * @param id
 * @return {sb.Arc}
 * @export
 */
sb.Document.prototype.arc = function (id) {
    var element = this.element(id);
    if(element instanceof sb.Arc){
        return element;
    }
    return null;
};

/**
 * sb.model.Element will call this method when attribute of their value is changed. This is primiarly used to maintain id-element maps.
 * @param object{sb.model.Element} The object which attribute is changed.
 * @param key{string} Attribute name
 * @param oldValue{string} The old value of attribute
 * @param newValue{string} The new value of attribute
 * @protected
 */
sb.Document.prototype.onAttrChange = function (object, key, oldValue, newValue) {
    if (key == 'id') {
        if (oldValue) {
            this.elementMap_.remove(oldValue);
        }
        this.elementMap_.set(newValue, object);
    }
};

/**
 * Get next unused port id.
 * @return {string}
 * @private
 */
sb.Document.prototype.nextPortId_ = function () {
    var nextPortId_ = "port" + this.portIdSeq_++;
    if (this.element(nextPortId_)) {
        return this.nextPortId_();
    } else {
        return nextPortId_;
    }
};

/**
 * Create a new port within the document.
 * @param {string=} opt_id Optional id of port.
 * @return {sb.Port}
 * @export
 */
sb.Document.prototype.createPort = function (opt_id) {
    var id = opt_id ? opt_id : this.nextPortId_();
    var port = /** @type{sb.Port} */ new sb.Port(this).id(id);
//    goog.array.insert(this.nodes_,node); TODO: decide if a this.ports_ is needed
    return port;
};
