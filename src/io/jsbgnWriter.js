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
        nodeObj['type'] = this.toJsbgnTypeString(node.type());
        nodeObj['sbo']=sb.sbo.NodeTypeMapping[node.type()];
        goog.array.insert(jsbgn['nodes'],nodeObj);
    }, this);
    return "var network = " + goog.json.serialize(jsbgn);
};

/**
 *
 * @param {sb.NodeType} nodeType
 */
sb.io.JsbgnWriter.prototype.toJsbgnTypeString = function (nodeType) {
    switch (nodeType) {
        case sb.NodeType.SimpleChemical:
        case sb.NodeType.SimpleChemicalMultimer:
        case sb.NodeType.Macromolecule:
        case sb.NodeType.MacromoleculeMultimer:
            return 'simple_species';
        case sb.NodeType.Complex:
        case sb.NodeType.ComplexMultimer:
            return 'complex_species';
        case sb.NodeType.Compartment:
            return 'compartment';
        case sb.NodeType.And:
        case sb.NodeType.Or:
        case sb.NodeType.Not:
            return 'info';
    }
};