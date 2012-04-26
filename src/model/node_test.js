goog.provide('sb.model.nodeTest');

goog.require('goog.testing.jsunit');
goog.require('sb.Node');

function testNodeId(){
    var node=new sb.Node('glyph01');
    assertEquals('glyph01',node.id);
    node.id='glyph02';
    assertEquals('glyph02',node.id);
}
function testEmptyNodeId(){
    var node=new sb.Node();
    assertEquals(null,node.id);
    node.id='glyph02';
    assertEquals('glyph02',node.id);
}
function testNodeTypeHelper(){
    assertTrue(sb.NodeTypeHelper.isNodeTypeSupported(sb.NodeType.SimpleChemical));
    assertFalse(sb.NodeTypeHelper.isNodeTypeSupported('other irrelevant things'));
    assertFalse(sb.NodeTypeHelper.isNodeTypeSupported(123412));
}
function testNodeType(){
    var node=new sb.Node('glyph01');
    node.setType(sb.NodeType.SimpleChemical);
    assertEquals(sb.NodeType.SimpleChemical,node.getType());
    node.setType('macromolecule');
    assertEquals(sb.NodeType.Macromolecule,node.getType());
}
function testNonExistNodeType(){
    var node=new sb.Node('glyph01');
    assertThrows(function(){
       node.setType('not supported type')
    });
}