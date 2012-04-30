goog.provide('sb.io.SbgnReader');

goog.require('sb.io.XmlReader');
goog.require('sb.Document');
goog.require('sb.util.log');
goog.require('sb.util.Stack');

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
    this.objStack_ = new sb.util.Stack();

    /**
     * The sb.Document to work on.
     * @type {sb.Document}
     * @private
     */
    this.document_ = new sb.Document();
};

goog.inherits(sb.io.SbgnReader, sb.io.XmlReader);

sb.io.SbgnReader.prototype.logger = goog.debug.Logger.getLogger('sb.io.SbgnReader');

sb.io.SbgnReader.prototype.parseText = function (text) {
    this.parseXmlText(text);
    return this.document_;
};

/**
 * @inheritDoc
 * @override
 */
sb.io.SbgnReader.prototype.onNodeOpen = function (xmlNode) {
    var tagName = xmlNode.tagName;
    this.logger.finer('xmlNode open: ' + tagName);
    if (tagName == 'glyph') {
        var glyph_id = xmlNode.getAttribute('id');
        this.logger.finest('glyph glyph_id: ' + glyph_id);
        var node = this.document_.createNode(glyph_id);
        var glyph_class = xmlNode.getAttribute('class');
        this.logger.finest('glyph glyph_class: ' + glyph_class);
        node.type(glyph_class);
        this.objStack_.push(node);
    }
    if (tagName == 'arc') {
        var arc_id = xmlNode.getAttribute('id');
        this.logger.finest('arc arc_id: ' + arc_id);
        var arc = this.document_.createArc(arc_id);
        var arc_class = xmlNode.getAttribute('class');
        this.logger.finest('arc arc_class: ' + arc_class);
        arc.type(arc_class);
        var arc_target = xmlNode.getAttribute('target');
        this.logger.finest('arc arc_target: ' + arc_target);
        var arc_source = xmlNode.getAttribute('source');
        this.logger.finest('arc arc_source: ' + arc_source);
        arc.source(arc_source).target(arc_target);
        this.objStack_.push(arc);
    }
    else if (tagName == 'label') {
        this.objStack_.peek().label(xmlNode.getAttribute('text'));
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