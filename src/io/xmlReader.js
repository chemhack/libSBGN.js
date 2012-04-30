goog.provide('sb.io.XmlReader');

goog.require('goog.dom.xml');
goog.require('goog.dom.NodeType');
goog.require('goog.array');
goog.require('goog.debug');
goog.require('goog.debug.Logger');
goog.require('goog.debug.FancyWindow');

var logWindow=new goog.debug.FancyWindow('main');
logWindow.setEnabled(true);
logWindow.init();

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
 * @return {*}
 */
sb.io.XmlReader.prototype.parseXmlText = function (xmlText) {
    this.logger.info('Parsing xml size:' + xmlText.length);
    var document = goog.dom.xml.loadXml(xmlText);
    var rootElement = document.documentElement;
    this.traverse(rootElement);
    return document;
};

/**
 *
 * @param {Element} node
 */
sb.io.XmlReader.prototype.traverse = function (node) {
    goog.array.forEach(node.childNodes, function (child) {
        if (child.nodeType == goog.dom.NodeType.ELEMENT) {
            this.traverse(child);
        }
    }, this);
};


