goog.provide('sb.io.XmlReader');

goog.require('goog.dom.xml');
goog.require('goog.dom.NodeType');
goog.require('goog.array');
goog.require('goog.structs.Map');
goog.require('goog.debug');
goog.require('goog.debug.Logger');


/**
 * Base class for xml-based format file reader
 * @constructor
 */
sb.io.XmlReader = function () {
    /**
     * ID-Element Map
     * @type {goog.structs.Map}
     * @private
     */
    this.idMap_ = null;
};

/**
 *
 * @type {goog.debug.Logger}
 * @protected
 */
sb.io.XmlReader.prototype.logger = goog.debug.Logger.getLogger('sb.io.XmlReader');

/**
 *
 * @param {string} xmlText
 * @return {Document}
 */
sb.io.XmlReader.prototype.parseXmlText = function (xmlText) {
    this.logger.info('Parsing xml size:' + xmlText.length);
    this.idMap_=new goog.structs.Map();
    return goog.dom.xml.loadXml(xmlText);
};

/**
 * Traverse the whole document to build a ID:Element Map
 * @param {Element} element
 */
sb.io.XmlReader.prototype.buildIdMap = function (element) {
    var id = element.getAttribute('id');
    if(id){
        this.idMap_.set(id,element);
    }
    goog.array.forEach(element.childNodes, function (child) {
        if (child.nodeType == goog.dom.NodeType.ELEMENT) {
            this.buildIdMap(child);
        }
    }, this);
};

/**
 *
 * @param {Element} element
 */
sb.io.XmlReader.prototype.traverse = function (element) {
    this.onElementOpen(element);
    goog.array.forEach(element.childNodes, function (child) {
        if (child.nodeType == goog.dom.NodeType.ELEMENT) {
            this.traverse(child);
        }
    }, this);
    this.onElementClose(element);
};

/**
 * @param {Node} xmlNode
 * @protected
 */
sb.io.XmlReader.prototype.onElementOpen = goog.abstractMethod;

/**
 * Called on nodeOpen
 * @param {Node} xmlNode
 * @protected
 */
sb.io.XmlReader.prototype.onElementClose = goog.abstractMethod;
