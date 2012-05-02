goog.provide('sb.io.ioTest');

goog.require('goog.testing.jsunit');
goog.require('sb.util.log');
goog.require('sb.io');


function setUp() {

}

function testJsonpProxy(){
    sb.io.readUrl('https://libsbgn.svn.sourceforge.net/svnroot/libsbgn/tags/milestone1/example-files/glycolysis.sbgn','sbgn',function(doc){
        console.log(doc);
    });
}
