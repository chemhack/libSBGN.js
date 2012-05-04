goog.provide('sb.model.attributeObjectTest');

goog.require('goog.testing.jsunit');
goog.require('sb.model.AttributeObject');

var attrObj;
function setUp(){
    attrObj=new sb.model.AttributeObject()
}

function testAttr(){
    attrObj.attr('key1','value1');
    assertEquals('value1',attrObj.attr('key1'));
}

