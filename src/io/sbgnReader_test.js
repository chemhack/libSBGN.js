goog.provide('sb.io.sbgnReaderTest');

goog.require('goog.testing.jsunit');
goog.require('sb.io.SbgnReader');
goog.require('goog.dom');
goog.require('goog.array');
goog.require('goog.object');
goog.require('goog.string');
goog.require('goog.ui.tree.TreeControl');
goog.require('sb.util.log');
goog.require('sb.NodeType');


function setUp() {

}


function testER1() {
    var reader = new sb.io.SbgnReader();
    var doc = reader.parseText(_allData['sbgn/ER/absolute_stimulation.sbgn'].content);
    assertEquals('entity relationship',doc.attr('language'));
    assertEquals('Sense',doc.node('g1').label());
    assertEquals(sb.NodeType.UnitOfInformation,doc.node('g1_1').type());
    assertEquals(doc.node('g2'),doc.arc('a1').target());
    dumpDocument(doc);
}

function testAllFilesHasNoError() {
//    var reader = new sb.io.SbgnReader();
//    goog.object.forEach(_allData, function (value, key, object) {
//        if (goog.string.startsWith(key, "sbgn/")) {
//            try {
//                reader.parseText(value.content);
//            } catch (ex) {
//                fail(key + "\t" + ex);
//            }
//        }
//    }, this);
}


function dumpDocument(doc) {
    var treeConfig = goog.ui.tree.TreeControl.defaultConfig;
    var tree = new goog.ui.tree.TreeControl('root', treeConfig);
    treeConfig['cleardotPath'] = '../../third-party/closure-library/closure/goog/images/tree/cleardot.gif';
    var nodeNode = tree.createNode('');
    nodeNode.setText('Nodes:');
    dumpElements_(tree, nodeNode, doc.nodes(true));
    tree.add(nodeNode);
    var arcNode = tree.createNode('');
    arcNode.setText('Arcs:');
    dumpArcs_(tree, arcNode, doc.arcs());
    tree.add(arcNode);
    tree.render(goog.dom.getElement('dump'));
    tree.expandAll();
}

function dumpElements_(tree, treeNode, nodes) {
    goog.array.forEach(nodes, function (element) {
        var treeChildNode = tree.createNode('');
        if(element instanceof sb.Node){
            treeChildNode.setText(element.id() + " " + element.type());
        }else if(element instanceof sb.Arc){
            treeChildNode.setText(element.id() + " " + element.type()+" From: "+element.source().id()+" To: "+element.target().id());
        }else if(element instanceof sb.Port){
            treeChildNode.setText(element.id());
        }

        treeNode.add(treeChildNode);
        dumpElements_(tree, treeChildNode, element.children());
    });
}

function dumpArcs_(tree, treeNode, arcs) {
    goog.array.forEach(arcs, function (arc) {
        var treeChildNode = tree.createNode('');
        treeNode.add(treeChildNode);
        dumpElements_(tree, treeChildNode, arc.children());
    });
}



