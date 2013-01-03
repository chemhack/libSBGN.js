goog.provide('sb.io.JsbgnWriter');

goog.require('sb.Document');
goog.require('sb.sbo.NodeTypeMapping');
goog.require('goog.json');
goog.require('goog.array');
goog.require('goog.object');
goog.require('goog.asserts');
goog.require('goog.debug.Logger');

/**
 * Writer of jsbgn
 * @constructor
 * @export
 */
sb.io.JsbgnWriter = function () {

};


sb.io.JsbgnWriter.prototype.logger = goog.debug.Logger.getLogger('sb.io.JsbgnWriter');

sb.io.JsbgnWriter.sbgnlangMapping_ = [];
sb.io.JsbgnWriter.sbgnlangMapping_[sb.Language.ER] = 'ER';
sb.io.JsbgnWriter.sbgnlangMapping_[sb.Language.AF] = 'AF';
sb.io.JsbgnWriter.sbgnlangMapping_[sb.Language.PD] = 'PD';

/**
 *
 * @param {sb.Document} doc
 * @return {string}
 */
sb.io.JsbgnWriter.prototype.write = function (doc) {
    var jsbgn = {};
    jsbgn['nodes'] = []; //Always use ['key'] to avoid closure compiler renaming it
    jsbgn['edges'] = [];
    if (doc.lang()) {
        jsbgn['sbgnlang'] = sb.io.JsbgnWriter.sbgnlangMapping_[doc.lang()];
    }
    goog.array.forEach(doc.nodes(), function (node) {
        if (node instanceof sb.Port) {
            return;
        }
        if (goog.array.contains([sb.NodeType.UnitOfInformation, sb.NodeType.StateVariable], node.type())) {
            return;
        }

        var nodeObj = {};
        nodeObj['id'] = node.id();
        nodeObj['sbo'] = sb.sbo.NodeTypeMapping[node.type()];
        nodeObj['type'] = "node: "+node.type();
        nodeObj['is_abstract'] = false;
        var nodeData = {};
        nodeObj['data'] = nodeData;

        if (node.attr('clone')) {
            nodeData['clone'] = true;
        }
        if (node.label()) {
            nodeData['label'] = node.label();
        }
        var bbox = node.attr('box');
        if (bbox) {
            nodeData['x'] = bbox.x;
            nodeData['y'] = bbox.y;
            nodeData['width'] = bbox.width;
            nodeData['height'] = bbox.height;
        }
        goog.array.forEach(node.children(), function (subNode) {
            if (subNode instanceof sb.Port) {
                return;
            }
            if (subNode.type() == sb.NodeType.UnitOfInformation) {
                if (!nodeData['unitofinformation']) {
                    nodeData['unitofinformation'] = [];
                }
                goog.array.insert(nodeData['unitofinformation'], subNode.label() ? subNode.label() : "");
            } else if (subNode.type() == sb.NodeType.StateVariable) {
                if (!nodeData['statevariable']) {
                    nodeData['statevariable'] = [];
                }
                goog.array.insert(nodeData['statevariable'], subNode.attr('variable'));
            } else {
                if (!nodeData['subnodes']) {
                    nodeData['subnodes'] = [];
                }
                goog.array.insert(nodeData['subnodes'], subNode.id());
            }
        }, this);

        if (goog.object.isEmpty(nodeData)) {
            goog.object.remove(nodeObj, 'data');
        }

        goog.array.insert(jsbgn['nodes'], nodeObj);
    }, this);
    goog.array.forEach(doc.arcs(), function (arc) {
        var arcObj = {};
        arcObj['id'] = arc.id();
        arcObj['sbo'] = sb.sbo.ArcTypeMapping[arc.type()];
        arcObj['type'] = "arc: "+arc.type();
        arcObj['source'] = arc.source().id();
        var target = arc.target();
        var targetId = target.id();
        if (target.type() == sb.NodeType.StateVariable) { //source and targets are of the format node_id:subnode_id if the node contains a state variable
            targetId = target.parent().id() + ":" + target.id();
        }
        arcObj['target'] = targetId;
        var arcData = {};
        arcObj['data'] = arcData;
        if (goog.object.isEmpty(arcData)) {
            goog.object.remove(arcObj, 'data');
        }
        goog.array.insert(jsbgn['edges'], arcObj);
    }, this);
    return goog.json.serialize(jsbgn);
};

