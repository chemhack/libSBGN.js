goog.provide('sb.model.portTest');

goog.require('goog.testing.jsunit');
goog.require('sb.Document');
goog.require('sb.Port');

var doc;

function setUp() {
    doc = new sb.Document();
}

function testPort(){
    var port1 = doc.createPort();
    var port2 = doc.createPort();
    var port3 = doc.createPort();
    assertEquals('port1',port1.id());
    assertEquals('port2',port2.id());
    assertEquals('port3',port3.id());
}