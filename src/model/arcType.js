goog.provide('sb.ArcType');
goog.provide('sb.ArcTypeHelper');

goog.require('goog.object');

/**
 * The enum of support arc type.
 * @enum {string}
 * @export
 */
sb.ArcType = {};

/**
 * @export
 */
sb.ArcType.Production = 'production';
/**
 * @export
 */
sb.ArcType.Consumption = 'consumption';
/**
 * @export
 */
sb.ArcType.Catalysis = 'catalysis';
/**
 * @export
 */
sb.ArcType.Modulation = 'modulation';
/**
 * @export
 */
sb.ArcType.Stimulation = 'stimulation';
/**
 * @export
 */
sb.ArcType.Inhibition = 'inhibition';
/**
 * @export
 */
sb.ArcType.Assignment = 'assignment';
/**
 * @export
 */
sb.ArcType.Interaction = 'interaction';
/**
 * @export
 */
sb.ArcType.AbsoluteInhibition = 'absolute inhibition';
/**
 * @export
 */
sb.ArcType.AbsoluteStimulation = 'absolute stimulation';
/**
 * @export
 */
sb.ArcType.PositiveInfluence = 'positive influence';
/**
 * @export
 */
sb.ArcType.NegativeInfluence = 'negative influence';
/**
 * @export
 */
sb.ArcType.UnknownInfluence = 'unknown influence';
/**
 * @export
 */
sb.ArcType.EquivalenceArc = 'equivalence arc';
/**
 * @export
 */
sb.ArcType.NecessaryStimulation = 'necessary stimulation';
/**
 * @export
 */
sb.ArcType.LogicArc = 'logic arc';

/**
 * Helper method to check if the arc type is supported;
 * @param arcType {string} String presentation of node type.
 * @return {boolean} true if supported
 * @export
 */
sb.ArcTypeHelper.isArcTypeSupported = function (arcType) {
    return goog.object.containsValue(sb.ArcType, arcType);
};
