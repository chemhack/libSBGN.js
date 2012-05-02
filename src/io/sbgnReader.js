goog.provide('sb.io.SbgnReader');

goog.require('sb.io.XmlReader');
goog.require('sb.Document');
goog.require('sb.util.Stack');
goog.require('goog.array');
goog.require('sb.Box');
goog.require('goog.asserts');
goog.require('goog.debug.Logger');

/**
 * Reader of sbgn class
 * @constructor
 * @extends sb.io.XmlReader
 * @export
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

/**
 *
 * @param text
 * @return {sb.Document}
 * @export
 */
sb.io.SbgnReader.prototype.parseText = function (text) {
    this.logger.info('Parsing xml size:' + text.length);
    this.objStack_ = new sb.util.Stack();
    this.document_ = new sb.Document();
    this.compartments_ = [];
    this.parseXmlText(text);
    goog.asserts.assert(this.objStack_.array().length == 0);
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
    } else if (tagName == 'bbox') {
        var box = new sb.Box(Number(xmlNode.getAttribute('x')), Number(xmlNode.getAttribute('y')), Number(xmlNode.getAttribute('w')), Number(xmlNode.getAttribute('h')));
        topElementInStack.attr('box', box);
        if (topElementInStack.type() != sb.NodeType.Compartment) {
            goog.array.forEach(this.compartments_, function (compartment) {
                if (compartment.attr('box').contains(box)) {
                    compartment.addChild(topElementInStack);
                }
            }, this);
        }
    } else if (tagName == 'start' || tagName == 'end') {
        if (topElementInStack instanceof sb.Arc) {
            topElementInStack.attr(tagName, new sb.Point(Number(xmlNode.getAttribute('x')), Number(xmlNode.getAttribute('y'))));
        }
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