goog.provide('sb.io.JsbgnReader');

goog.require('sb.Document');
goog.require('goog.array');
goog.require('goog.json');
goog.require('sb.Box');
goog.require('sb.Point');
goog.require('sb.util.Stack');
goog.require('goog.asserts');
goog.require('goog.debug.Logger');
goog.require('sb.sbo.ReverseNodeTypeMapping');

/**
 * Reader of jsbgn
 * @constructor
 * @export
 */
sb.io.JsbgnReader = function () {

    /**
     * The sb.Document to work on.
     * @type {sb.Document}
     * @private
     */
    this.document_ = null;

    /**
     * Temp array used to store compartments
     * @type {Array.<sb.Node>}
     * @private
     */
    this.compartments_ = null;

};


sb.io.JsbgnReader.prototype.logger = goog.debug.Logger.getLogger('sb.io.JsbgnReader');

/**
 *
 * @param text
 * @return {sb.Document}
 * @export
 */
sb.io.JsbgnReader.prototype.parseText = function (text) {
    this.objStack_ = new sb.util.Stack();
    this.document_ = new sb.Document();
    this.compartments_ = [];
    var jsonObj = goog.json.parse(text);
    if (jsonObj && jsonObj['edges'] && jsonObj['nodes']) {
        this.logger.fine('jsbgn JSON parsed');
        var edges = [];
        var json_edges = jsonObj['edges'];
        var json_nodes = jsonObj['nodes'];

        //Do two passes, first create all nodes and arcs, and then fix parent-children relation and write attributes.
        goog.array.forEach(json_nodes, function (json_node) {
            this.document_.createNode(String(json_node['id']));
        }, this);
        goog.array.forEach(json_edges, function (json_edge) {
            this.document_.createArc(String(json_edge['id']));
        }, this);
        goog.array.forEach(json_nodes, function (json_node) {
            var node = this.document_.node(String(json_node['id']));
            node.attr('jsbgn.sbo', json_node['sbo']); //original jsbgn attributes before transformation are always kept, with a suffix jsbgn.
            node.type(sb.sbo.ReverseNodeTypeMapping[json_node['sbo']]);
            node.attr('jsbgn.is_abstract', json_node['is_abstract']);
            node.attr('jsbgn.type', json_node['type']);
            var json_data = json_node['data'];
            if (json_data) {
                if (json_data['label']) {
                    node.label(json_data['label']);
                }
                if (json_data['clone_marker']) {
                    node.attr('clone', true);
                }
                if (json_data['x'] && json_data['y']) {
                    node.attr('jsbgn.data.x', json_data['x']);
                    node.attr('jsbgn.data.y', json_data['y']);
                    if (json_data['width'] && json_data['height']) {
                        node.attr('jsbgn.data.width', json_data['width']);
                        node.attr('jsbgn.data.height', json_data['height']);
                        var box = new sb.Box(Number(json_data['x']), Number(json_data['y']), Number(json_data['width']), Number(json_data['height']));
                        node.attr('box', box);
                    }
                }
                if (json_data['radius']) {
                    node.attr('jsbgn.data.radius', json_data['radius']);
                }
                if (json_data['subnodes']) {
                    node.attr('jsbgn.data.subnodes', json_data['subnodes']);
                    goog.array.forEach(json_data['subnodes'], function (childNodeId) {
                        var childNode = this.document_.node(childNodeId);
                        if (childNode) {
                            node.addChild(childNode);
                        }
                    }, this);
                }
                if (json_data['compartment']) { //we don't need to extract this piece of information as nodes' parent/child relation has been reconstructed, only the raw jsbgn data is kept.
                    node.attr('jsbgn.data.compartment', json_data['compartment']);
                }
                if (json_data['modifications']) {
                    node.attr('jsbgn.data.modifications', json_data['modifications']);
                    //TODO: extract modification arcs
                }
                if (json_data['statevariable']) {
                    node.attr('jsbgn.data.statevariable', json_data['statevariable']);
                    goog.array.forEach(json_data['statevariable'], function (stateVariableId) {
                        var childNode = node.createSubNode(node.id() + ":" + stateVariableId);
                        childNode.type(sb.NodeType.StateVariable);
                        childNode.attr('variable', stateVariableId);
                    }, this);
                }
                if (json_data['unitofinformation']) {
                    node.attr('jsbgn.data.unitofinformation', json_data['unitofinformation']);
                    goog.array.forEach(json_data['unitofinformation'], function (unitofinformationId) {
                        var childNode = node.createSubNode(node.id() + ":" + unitofinformationId);
                        childNode.type(sb.NodeType.UnitOfInformation);
                        childNode.attr('label', unitofinformationId);
                    }, this);
                }
                if (json_data['cssClasses']) {
                    node.attr('jsbgn.data.cssClasses', json_data['cssClasses']);
                }
            }
        }, this);

        goog.array.forEach(json_edges, function (json_edge) {
            var arc = this.document_.arc(String(json_edge['id']));
            arc.attr('jsbgn.sbo', json_edge['sbo']);
            arc.type(sb.sbo.ReverseArcTypeMapping[json_edge['sbo']]);
            arc.source(json_edge['source']);
            arc.target(json_edge['target']);
            var json_data = json_edge['data']; //handle optional attributes
            if (json_data) {
                if (json_data['type']) {
                    arc.attr('jsbgn.data.type', json_data['type']);
                }
                if (json_data['style']) {
                    arc.attr('jsbgn.data.style', json_data['style']);
                }
                if (json_data['thickness']) {
                    arc.attr('jsbgn.data.thickness', json_data['thickness']);
                }
                if (json_data['label']) {
                    arc.label(json_data['label']);
                }
                //TODO: extract coordinates
                if (json_data['label_x']) {
                    arc.attr('jsbgn.data.label_x', json_data['label_x']);
                }
                if (json_data['label_y']) {
                    arc.attr('jsbgn.data.label_y', json_data['label_y']);
                }
                if (json_data['handles']) {
                    arc.attr('jsbgn.data.handles', json_data['handles']);
                }
                if (json_data['pairs']) {
                    arc.attr('jsbgn.data.pairs', json_data['pairs']);
                }
            }
        }, this);

    } else {
        throw 'jsbgn JSON format error, it is not a valid JSON string';
    }
    return this.document_;
};

