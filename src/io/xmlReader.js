goog.provide('sb.io.XmlReader');

goog.require('goog.dom.xml');

/**
 * Base class for xml-based format file reader
 * @constructor
 */
sb.io.XmlReader = function () {

};

/**
 *
 * @param xmlText
 * @return {*}
 */
sb.io.XmlReader.prototype.parseXmlText = function (xmlText) {
    return goog.dom.xml.loadXml(xmlText);
};