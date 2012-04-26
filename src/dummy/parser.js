goog.provide('sb.dummy');

goog.require('goog.array');
goog.require('goog.dom.xml');

sb.dummy.onload=function(xmlText){
    var doc1 = goog.dom.xml.loadXml(xmlText);
    var maps = doc1.documentElement.firstElementChild.childNodes;
    goog.array.forEach(maps, function (node) {
        if (node.tagName == "glyph") {
            document.write("Glyph ID:" + node.getAttribute('id') + " Class:" + node.getAttribute("class") + "</br>");
        } else if (node.tagName == "arc") {
            document.write("Arc Source:" + node.getAttribute('source') + " Target:" + node.getAttribute("target") + " Class:" + node.getAttribute("class") + "</br>");
        }
    });
};
goog.exportSymbol('sb.dummy.onload', sb.dummy.onload);