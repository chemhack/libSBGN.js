goog.provide('sb.io.jsbgnWriterTest');

goog.require('goog.testing.jsunit');
goog.require('sb.io.JsbgnWriter');
goog.require('sb.io.SbgnReader');

var writer;
var sbgnReader;
function setUp() {
    writer=new sb.io.JsbgnWriter();
    sbgnReader=new sb.io.SbgnReader();
}

function testWriteDocument(){
    var doc=sbgnReader.parseText(_allData['sbgn/AF/activity-nodes.sbgn'].content);
    var jsbgnText=writer.write(doc);
}

function test_reactionVertex_7741852(){
    var doc=sbgnReader.parseText(_allData['sbgn/bugs/React69620.sbgnml.xml'].content);
    var jsbgnText=writer.write(doc);
    assertTrue(jsbgnText.indexOf("reactionVertex_7741852.1")<0);
}

