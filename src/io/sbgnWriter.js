goog.provide('sb.io.SbgnWriter');

goog.require('sb.Document');
goog.require('goog.dom.xml');
goog.require('goog.debug.Logger');

/**
 * SBGN-ML format writer
 * @constructor
 */
sb.io.SbgnWriter = function () {
    this.xml = null;
};
sb.io.SbgnWriter.prototype.logger = goog.debug.Logger.getLogger('sb.io.SbgnWriter');
/**
 *
 * @param {sb.Document} doc
 * @return {string}
 */
sb.io.SbgnWriter.prototype.write = function (doc) {
    this.xml = goog.dom.xml.createDocument();
    var sbgnElement = this.xml.createElement("sbgn");
    sbgnElement.setAttribute("xmlns", "http://sbgn.org/libsbgn/0.2");
    var mapElement = this.xml.createElement("map");
    var docLanguage = doc.lang();
    if (docLanguage) {
        mapElement.setAttribute("language", docLanguage);
    }
    var nodes = doc.nodes(true);
    goog.array.forEach(nodes, function (node) {
        this.writeNode_(node, mapElement);
    }, this);
    var arcs = doc.arcs();
    goog.array.forEach(arcs, function (arc) {
        this.writeArc_(arc, mapElement);
    }, this);
    sbgnElement.appendChild(mapElement);
    var xmlText = goog.dom.xml.serialize(sbgnElement);
    this.logger.fine(xmlText);
    return xmlText;
};

sb.io.SbgnWriter.prototype.writeNode_ = function (node, parentElement) {
    var classText = node.type();
    var glyphElement = this.xml.createElement("glyph");
    glyphElement.setAttribute("class", classText);
    glyphElement.setAttribute("id", node.id());
    if (node.label()) {
        var labelElement = this.xml.createElement("label");
        labelElement.setAttribute("text", node.label());
        glyphElement.appendChild(labelElement);
    }
    if (node.attr('box')) {
        var boxElement = this.xml.createElement("box");
        var box=node.attr('box');
        boxElement.setAttribute("y",box.x);
//        <bbox y="40.0" x="170.0" h="60.0" w="120.0"/>
//        boxElement.setAttribute("y")
    }
    parentElement.appendChild(glyphElement);
    this.writeChildren_(node, glyphElement);
};

sb.io.SbgnWriter.prototype.writeArc_ = function (arc, parentElement) {
    var classText = arc.type();
    var glyphElement = this.xml.createElement("arc");
    glyphElement.setAttribute("class", classText);
    glyphElement.setAttribute("id", arc.id());
    parentElement.appendChild(glyphElement);
    this.writeChildren_(arc, glyphElement);
};

sb.io.SbgnWriter.prototype.writeChildren_ = function (element, parentElement) {
    goog.array.forEach(element.children(), function (child) {
        if (child instanceof sb.Node) {
            this.writeNode_(child, parentElement);
        } else if (child instanceof sb.Arc) {
            this.writeArc_(child, parentElement);
        }
    }, this);

};