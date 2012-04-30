goog.provide('sb.util.stackTest');

goog.require('goog.testing.jsunit');
goog.require('sb.util.Stack');


function setUp() {

}

function testStack() {
    var stack=new sb.util.Stack();
    stack.push(1);
    stack.push(2);
    stack.push(3);
    assertEquals(3,stack.peek());
    assertEquals(3,stack.pop());
    assertEquals(2,stack.pop());
    assertEquals(1,stack.pop());

}