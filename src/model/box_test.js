goog.provide('sb.model.boxTest');

goog.require('goog.testing.jsunit');
goog.require('sb.Box');

function setUp() {

}

function testBoxConstructor() {
    var box = new sb.Box(1, 2, 3, 4);
    assertEquals(1, box.x);
    assertEquals(2, box.y);
    assertEquals(3, box.width);
    assertEquals(4, box.height);
}

function testBoxContains() {
    //a box from (1,1) to (5,5)
    var box = new sb.Box(1, 1, 4, 4);
    //a box from (2,2) to (3,3)
    var box2 = new sb.Box(2, 2, 1, 1);
    assertTrue(box.contains(box2));
    assertFalse(box2.contains(box));
    // a box should contains itself
    assertTrue(box.contains(box));

    var box3=new sb.Box(0,0,2,2);
    assertFalse(box.contains(box3));
    assertFalse(box2.contains(box3));
    assertFalse(box3.contains(box));
    assertFalse(box3.contains(box2));

    var box4=new sb.Box(1,2,2,1);
    assertTrue(box.contains(box4));

    var box5=new sb.Box(1,2,2,3);
    assertTrue(box.contains(box5));

    var box6=new sb.Box(1,2,2,4);
    assertFalse(box.contains(box6));

    var box7=new sb.Box(5,5,2,4);
    assertFalse(box.contains(box7));

}