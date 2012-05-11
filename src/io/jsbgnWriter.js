goog.provide('sb.io.JsbgnWriter');

goog.require('sb.Document');
goog.require('sb.sbo.NodeTypeMapping');
goog.require('goog.json');
goog.require('goog.array');
goog.require('goog.asserts');
goog.require('goog.debug.Logger');

/**
 * Reader of jsbgn
 * @constructor
 * @export
 */
sb.io.JsbgnWriter = function () {

};


sb.io.JsbgnWriter.prototype.logger = goog.debug.Logger.getLogger('sb.io.JsbgnWriter');

/**
 *
 * @param {sb.Document} document
 * @return {string}
 */
sb.io.JsbgnWriter.prototype.write = function (document) {
    var jsbgn = {};
    jsbgn['nodes'] = []; //Always use ['key'] to avoid closure compiler renaming it
    jsbgn['edges'] = [];
    goog.array.forEach(document.nodes(), function (node) {
        var nodeObj = {};
        nodeObj['id'] = node.id();
        nodeObj['sbo']=sb.sbo.NodeTypeMapping[node.type()];
        nodeObj['is_abstract']=false;
        var nodeData={};
        nodeObj['data']=nodeData;

        if(node.clone()){
            nodeData['clone']=true;
        }
        if(node.label()){
            nodeData['label']=node.label();
        }
        if(node.children().length>0){

        }
        goog.array.insert(jsbgn['nodes'],nodeObj);
    }, this);
    goog.array.forEach(document.arcs(), function (arc) {
        var arcObj = {};
        arcObj['id'] = arc.id();
        arcObj['sbo']= 0; //TODO: do the sbo mapping
        arcObj['source']=arc.source().id();
        arcObj['target']=arc.target().id(); //TODO: deal with state vars, etc
        var arcData={};
        arcObj['data']=arcData;

        goog.array.insert(jsbgn['edges'],arcObj);
    }, this);
    return "var network = " + goog.json.serialize(jsbgn);
};

