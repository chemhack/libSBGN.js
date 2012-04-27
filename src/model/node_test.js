goog.provide('sb.model.nodeTest');

goog.require('goog.testing.jsunit');
goog.require('sb.Node');

var doc;

function setUp(){
    doc=new sb.Document();
}

function testNodeId(){
    var node=doc.createNode().id('glyph01');
    assertEquals('glyph01',node.id());
    node.id('glyph02');
    assertEquals('glyph02',node.id());
}
function testEmptyNodeId(){
    var node=doc.createNode();
    assertEquals(undefined,node.id());
    node.id('glyph02');
    assertEquals('glyph02',node.id());
}
function testNodeTypeHelper(){
    assertTrue(sb.NodeTypeHelper.isNodeTypeSupported(sb.NodeType.SimpleChemical));
    assertFalse(sb.NodeTypeHelper.isNodeTypeSupported('other irrelevant things'));
    assertFalse(sb.NodeTypeHelper.isNodeTypeSupported(123412));
}
function testNodeType(){
    var node=doc.createNode().id('glyph01');
    node.type(sb.NodeType.SimpleChemical);
    assertEquals(sb.NodeType.SimpleChemical,node.type());
    node.type('macromolecule');
    assertEquals(sb.NodeType.Macromolecule,node.type());
}
function testNonExistNodeType(){
    var node=doc.createNode().id('glyph01');
    assertThrows(function(){
       node.setType('not supported type')
    });
}
function testChaining(){
    var node=doc.createNode().id('glyph01').type(sb.NodeType.SimpleChemical).label('ethanol');
    assertEquals('ethanol',node.label());
    assertEquals(sb.NodeType.SimpleChemical,node.type());
}
function testAttribute(){
    var node=doc.createNode().id('glyph01').type(sb.NodeType.SimpleChemical).label('ethanol');
    assertEquals('glyph01',node.attr('id'));
    assertEquals('ethanol',node.attr('label'));
}