goog.provide('sb.model.documentTest');

goog.require('goog.testing.jsunit');
goog.require('sb.Document');

var doc;

function setUp() {
    doc = new sb.Document();
}

function testNodeIdSeq() {
    var node1 = doc.createNode();
    assertEquals('node1', node1.id());
    var node2 = doc.createNode();
    assertEquals('node2', node2.id());
    node1.id('node3');
    var node3 = doc.createNode();
    assertEquals('node4', node3.id());
}

function testNodes() {
    var node1 = doc.createNode();
    var node2 = doc.createNode();
    var node3 = doc.createNode();
    assertEquals(3, doc.nodes().length);
}


function testNodeIdRename() {
    var node1 = doc.createNode('node1');
    node1.id('node2');
    assertEquals(node1, doc.node('node2'));
}

function testArcIdSeq() {
    var arc1 = doc.createArc();
    assertEquals('arc1', arc1.id());
    var arc2 = doc.createArc();
    assertEquals('arc2', arc2.id());
    arc1.id('arc3');
    var arc3 = doc.createArc();
    assertEquals('arc4', arc3.id());
}

function testArcs() {
    var arc1 = doc.createArc();
    var arc2 = doc.createArc();
    var arc3 = doc.createArc();
    assertEquals(3, doc.arcs().length);
}


function testArcIdRename() {
    var arc1 = doc.createArc('arc1');
    arc1.id('arc2');
    assertEquals(arc1, doc.arc('arc2'));
}

function testConnectNodes() {
    var node1 = doc.createNode('node1');
    var node2 = doc.createNode('node2');
    var arc1 = doc.connect(node1, node2);
    assertEquals(node1, arc1.source());
    assertEquals(node2, arc1.target());

}
