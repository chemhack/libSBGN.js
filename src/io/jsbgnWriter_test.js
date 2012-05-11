goog.provide('sb.io.jsbgnWriterTest');

goog.require('goog.testing.jsunit');
goog.require('sb.io.JsbgnWriter');

var writer;
function setUp() {
    writer=new sb.io.JsbgnWriter();
}

function testWriteDocument(){
    var doc=new sb.Document();
    doc.createNode('node1').type(sb.NodeType.SimpleChemical).label('a simple chemical');
    var jsbgnText=writer.write(doc);
    document.write(jsbgnText);
}

