goog.provide('sb.Arc');

goog.require('sb.ArcType');
goog.require('sb.ArcTypeHelper');
goog.require('sb.model.Element');


/**
 * Class for the arcs. Do not use the constructor, use sb.Document.prototype.createArc instead.
 * @param {!sb.Document} document the document to bind
 * @constructor
 * @extends sb.model.Element
 * @export
 */
sb.Arc = function (document) {
    goog.base(this, document);
};

goog.inherits(sb.Arc, sb.model.Element);

/**
 * Setter/getter of node type. An error will be thrown if the node type is invalid, see sb.ArcType
 * @param {sb.ArcType|string=} opt_type
 * @return {sb.ArcType|sb.Arc} current node type or sb.Node instance for chaining
 * @export
 */
sb.Arc.prototype.type = function (opt_type) {
    if (goog.isDef(opt_type)) {
        if (!sb.ArcTypeHelper.isArcTypeSupported(opt_type)) {
            throw new Error('Given arc type ' + opt_type + ' is not supported.');
        }
    }
    return /** @type{sb.ArcType|sb.Arc}*/this.attr('type', opt_type);
};


/**
 * Setter/getter of arc source.
 * @param {string|sb.model.Element=} opt_source node or its id
 * @return {sb.model.Element|sb.Arc} current source or sb.Arc instance for chaining
 * @export
 */

sb.Arc.prototype.source = function (opt_source) {
    if (opt_source && goog.isString(opt_source)) {
        var element = this.document_.element(opt_source);
        if (!element) {
            throw new Error('Element ' + opt_source + ' do not exist.');
        }
        opt_source = element;
    }
    return /** @type{sb.model.Element|sb.Arc}*/this.attr('source', opt_source);
};

/**
 * Setter/getter of arc target.
 * @param {string|sb.model.Element=} opt_target
 * @return {sb.model.Element|sb.Arc} current target or sb.Arc instance for chaining
 * @export
 */

sb.Arc.prototype.target = function (opt_target) {
    if (opt_target && goog.isString(opt_target)) {
        var element = this.document_.element(opt_target);
        if (!element) {
            throw new Error('Element ' + opt_target + ' do not exist.');
        }
        opt_target = element;
    }
    return /** @type{sb.model.Element|sb.Arc}*/this.attr('target', opt_target);
};

/**
 * Setter/getter of arc start point.
 * @param {sb.Point=} opt_startPoint
 * @return {sb.Point|sb.Arc}
 */
//TODO: support start(x,y)
sb.Arc.prototype.start = function (opt_startPoint) {
    return /** @type{sb.Point|sb.Arc}*/this.attr('start', opt_startPoint);
};

/**
 * Setter/getter of arc end point.
 * @param {sb.Point=} opt_endPoint
 * @return {sb.Point|sb.Arc}
 */
//TODO: support start(x,y)
sb.Arc.prototype.end = function (opt_endPoint) {
    return /** @type{sb.Point|sb.Arc}*/this.attr('end', opt_endPoint);
};

//TODO: add middle point support