goog.provide('sb.io.SbgnReader');

goog.require('sb.io.XmlReader');
goog.require('sb.Document');
goog.require('sb.util.log');
goog.require('sb.util.Stack');
goog.require('goog.array');

/**
 * Reader of sbgn class
 * @constructor
 * @extends sb.io.SbgnReader
 */
sb.io.SbgnReader = function () {
    goog.base(this);
    /**
     * The stack used to parse xml document.
     * @type {sb.util.Stack}
     * @private
     */
    this.objStack_ = null;

    /**
     * The sb.Document to work on.
     * @type {sb.Document}
     * @private
     */
    this.document_ = null;

    /**
     * Temp array used to store compartments
     * @type {Array.<sb.Node>}
     * @private
     */
    this.compartments_ = null;

};

goog.inherits(sb.io.SbgnReader, sb.io.XmlReader);

sb.io.SbgnReader.prototype.logger = goog.debug.Logger.getLogger('sb.io.SbgnReader');

sb.io.SbgnReader.prototype.parseText = function (text) {
    this.objStack_ = new sb.util.Stack();
    this.document_ = new sb.Document();
    this.compartments_ = [];
    this.parseXmlText(text);
//    if(goog.DEBUG){
//      TODO: validate stack is empty
//    }
    return this.document_;
};

sb.io.SbgnReader.glyphPropertyMap_ = {

};

/**
 * @inheritDoc
 * @override
 */
sb.io.SbgnReader.prototype.onNodeOpen = function (xmlNode) {
    var tagName = xmlNode.tagName;
    tagName = tagName ? tagName.toLocaleLowerCase() : null;
    var nodeId = xmlNode.getAttribute('id');
    this.logger.finer('xmlNode open: ' + tagName);
    var topElementInStack = this.objStack_.peek();

    if (tagName == 'glyph') {
        this.logger.finest('glyph glyph_id: ' + nodeId);
        var node = (topElementInStack instanceof sb.Node) ? topElementInStack.createSubNode(nodeId) : this.document_.createNode(nodeId);
        var glyph_class = xmlNode.getAttribute('class');
        this.logger.finest('glyph glyph_class: ' + glyph_class);
        node.type(glyph_class);
        this.objStack_.push(node);
        if (glyph_class == 'compartment') {
            goog.array.insert(this.compartments_, node);
        }

    } else if (tagName == 'port') {
        this.logger.finest('port port_id: ' + nodeId);
        if (topElementInStack instanceof sb.Node) {
            topElementInStack.createSubNode(nodeId).type(sb.NodeType.Port);
        }

    } else if (tagName == 'arc') {
        this.logger.finest('arc arc_id: ' + nodeId);
        var arc = this.document_.createArc(nodeId);
        var arc_class = xmlNode.getAttribute('class');
        this.logger.finest('arc arc_class: ' + arc_class);
        arc.type(arc_class);
        var arc_target = xmlNode.getAttribute('target');
        this.logger.finest('arc arc_target: ' + arc_target);
        var arc_source = xmlNode.getAttribute('source');
        this.logger.finest('arc arc_source: ' + arc_source);
        arc.source(arc_source).target(arc_target);
        this.objStack_.push(arc);

    } else if (tagName == 'label') {
        topElementInStack.label(xmlNode.getAttribute('text'));
    }
};

/**
 * @inheritDoc
 * @override
 */
sb.io.SbgnReader.prototype.onNodeClose = function (xmlNode) {
    var tagName = xmlNode.tagName;
    this.logger.finer('node close: ' + tagName);
    if (tagName == 'glyph' || tagName == 'arc') {
        this.objStack_.pop();
    }
};