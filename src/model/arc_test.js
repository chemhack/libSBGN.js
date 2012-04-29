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
    assertTrue(sb.ArcTypeHelper.isArcTypeSupported(sb.ArcType.Consumption));
    assertFalse(sb.ArcTypeHelper.isArcTypeSupported('other irrelevant things'));
    assertFalse(sb.ArcTypeHelper.isArcTypeSupported(123412));
}
function testArcType(){
    var arc=doc.createArc();
    arc.type(sb.ArcType.Catalysis);
    assertEquals(sb.ArcType.Catalysis,arc.type());
    arc.type('inhibition');
    assertEquals(sb.ArcType.Inhibition,arc.type());

}
function testNonExistArcType(){
    var arc=doc.createArc();
    assertThrows(function(){
       arc.type('not supported type');
    });
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