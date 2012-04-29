goog.provide('sb.io.sbgnReaderTest');

goog.require('goog.testing.jsunit');
goog.require('sb.io.SbgnReader');
goog.require('sb.io.sbgnReaderTest.data');


function setUp(){

}

function testSbgnReader(){
    var reader=new sb.io.SbgnReader();
    reader.parseXmlText(sb.io.sbgnReaderTest.data.sbgnXML1);
}