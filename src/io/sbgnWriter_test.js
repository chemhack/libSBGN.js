goog.provide('sb.io.sbgnWriterTest');

goog.require('goog.testing.jsunit');
goog.require('sb.io');
goog.require('sb.io.SbgnWriter');
goog.require('sb.util.log');


function setUp() {
}

function testSomething(){
    var doc = sb.io.read(_allData['sbgn/ER/absolute_stimulation.sbgn'].content,'sbgn');
    var writer=new sb.io.SbgnWriter();
    var result=writer.write(doc);
//    alert(result);
}



