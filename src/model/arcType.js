goog.provide('sb.ArcType');
goog.provide('sb.ArcTypeHelper');

goog.require('goog.object');

/**
 * The enum of support arc type.
 * @enum {string}
 * @export
 */
sb.ArcType = {
    Production:'production',
    Consumption:'consumption',
    Catalysis:'catalysis',
    Modulation:'modulation',
    Stimulation:'stimulation',
    Inhibition:'inhibition',
    Assignment:'assignment',
    Interaction:'interaction',
    AbsoluteInhibition:'absolute inhibition',
    AbsoluteStimulation:'absolute stimulation',
    PositiveInfluence:'positive influence',
    NegativeInfluence:'negative influence',
    UnknownInfluence:'unknown influence',
    EquivalenceArc:'equivalence arc',
    NecessaryStimulation:'necessary stimulation',
    LogicArc:'logic arc'
};

/**
 * Helper method to check if the arc type is supported;
 * @param arcType {string} String presentation of node type.
 * @return {boolean} true if supported
 * @export
 */
sb.ArcTypeHelper.isArcTypeSupported = function (arcType) {
    return goog.object.containsValue(sb.ArcType, arcType);
};
