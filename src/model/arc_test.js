goog.provide('sb.model.arcTest');

goog.require('goog.testing.jsunit');
goog.require('sb.Document');

var doc;

function setUp(){
    doc=new sb.Document();
}

function testArcId(){
    var arc=doc.createArc().id('arc01');
    assertEquals('arc01',arc.id());
    arc.id('arc02');
    assertEquals('arc02',arc.id());
}
function testArcTypeHelper(){

}
function testArcType(){

}
function testNonExistArcType(){

}
function testChaining(){
    var arc=doc.createArc().id('arc01').attr('key','value');
    assertEquals('arc01',arc.id());
    assertEquals('value',arc.attr('key'));
}

function testArcIdDuplication(){
    doc.createArc().id('arc01');
    var arc2=doc.createArc().id('arc02');
    assertThrows(function(){
        arc2.id('arc01');
    });

}