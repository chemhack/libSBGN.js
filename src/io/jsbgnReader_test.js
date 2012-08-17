goog.provide('sb.io.jsbgnReaderTest');

goog.require('goog.testing.jsunit');
goog.require('sb.io.JsbgnReader');
goog.require('goog.array');
goog.require('goog.object');
goog.require('goog.string');
goog.require('sb.util.log');
goog.require('sb.NodeType');


function setUp() {

}


function testApoptosis() {
    var reader = new sb.io.JsbgnReader();
    var doc = reader.parseText(_allData['jsbgn/apoptosis.json'].content);
}


function testAllFilesHasNoError() {
    var reader = new sb.io.JsbgnReader();
    goog.object.forEach(_allData, function (value, key, object) {
        if (goog.string.startsWith(key, "jsbgn/")) {
            reader.parseText(value.content);
        }
    }, this);
}

