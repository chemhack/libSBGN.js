goog.provide('sb.io.XmlReader');

goog.require('goog.dom.xml');
goog.require('goog.dom.NodeType');
goog.require('goog.array');
goog.require('goog.debug');
goog.require('goog.debug.Logger');


/**
 * Base class for xml-based format file reader
 * @constructor
 */
sb.io.XmlReader = function () {

};

/**
 *
 * @type {goog.debug.Logger}
 * @protected
 */
sb.io.XmlReader.prototype.logger = goog.debug.Logger.getLogger('sb.io.XmlReader');

/**
 *
 * @param xmlText
 */
sb.io.XmlReader.prototype.parseXmlText = function (xmlText) {
    this.logger.info('Parsing xml size:' + xmlText.length);
    var document = goog.dom.xml.loadXml(xmlText);
    var rootElement = document.documentElement;
    this.traverse(rootElement);
};

/**
 *
 * @param {Element} xmlNode
 */
sb.io.XmlReader.prototype.traverse = function (xmlNode) {
    this.onNodeOpen(xmlNode);
    goog.array.forEach(xmlNode.childNodes, function (child) {
        if (child.nodeType == goog.dom.NodeType.ELEMENT) {
            this.traverse(child);
        }
    }, this);
    this.onNodeClose(xmlNode);
};

/**
 * @param {Node} xmlNode
 * @protected
 */
sb.io.XmlReader.prototype.onNodeOpen=goog.abstractMethod;

/**
 * Called on nodeOpen
 * @param {Node} xmlNode
 * @protected
 */
sb.io.XmlReader.prototype.onNodeClose=goog.abstractMethod;
