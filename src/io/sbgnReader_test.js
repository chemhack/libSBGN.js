goog.provide('sb.io.sbgnReaderTest');

goog.require('goog.testing.jsunit');
goog.require('sb.io.SbgnReader');
goog.require('sb.io.sbgnReaderTest.data');
goog.require('goog.dom');
goog.require('goog.array');
goog.require('goog.ui.tree.TreeControl');
goog.require('sb.util.log');


function setUp() {

}

function testSbgnReader() {
    var reader = new sb.io.SbgnReader();
    var doc = reader.parseText(sb.io.sbgnReaderTest.data.sbgnXML1);
    dumpDocument(doc);
}

function dumpDocument(doc) {
    var treeConfig = goog.ui.tree.TreeControl.defaultConfig;
    var tree = new goog.ui.tree.TreeControl('root', treeConfig);
    treeConfig['cleardotPath'] = '../../third-party/closure-library/closure/goog/images/tree/cleardot.gif';
    var nodeNode = tree.createNode('');
    nodeNode.setText('Nodes:');
    dumpNodes_(tree, nodeNode, doc.nodes(true));
    tree.add(nodeNode);
    tree.render(goog.dom.getElement('dump'));
    tree.expandAll();
}

function dumpNodes_(tree, treeNode, nodes) {
    goog.array.forEach(nodes, function (node) {
        var treeChildNode = tree.createNode('');
        treeChildNode.setText(node.id() + " " + node.type());
        treeNode.add(treeChildNode);
        dumpNodes_(tree, treeChildNode, node.children());
    });
}


