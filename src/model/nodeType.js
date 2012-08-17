goog.provide('sb.NodeType');
goog.provide('sb.NodeTypeHelper');

goog.require('goog.object');

/**
 * The enum of support node type.
 * @enum {string}
 * @export
 */
sb.NodeType = {};
/**
 * @export
 */
sb.NodeType.UnspecifiedEntity = 'unspecified entity';
/**
 * @export
 */
sb.NodeType.SimpleChemical = 'simple chemical';
/**
 * @export
 */
sb.NodeType.Macromolecule = 'macromolecule';
/**
 * @export
 */
sb.NodeType.NucleicAcidFeature = 'nucleic acid feature';
/**
 * @export
 */
sb.NodeType.SimpleChemicalMultimer = 'simple chemical multimer';
/**
 * @export
 */
sb.NodeType.MacromoleculeMultimer = 'macromolecule multimer';
/**
 * @export
 */
sb.NodeType.NucleicAcidFeatureMultimer = 'nucleic acid feature multimer';
/**
 * @export
 */
sb.NodeType.Complex = 'complex';
/**
 * @export
 */
sb.NodeType.ComplexMultimer = 'complex multimer';
/**
 * @export
 */
sb.NodeType.SourceAndSink = 'source and sink';
/**
 * @export
 */
sb.NodeType.Perturbation = 'perturbation';
/**
 * @export
 */
sb.NodeType.BiologicalActivity = 'biological activity';
/**
 * @export
 */
sb.NodeType.PerturbingAgent = 'perturbing agent';
/**
 * @export
 */
sb.NodeType.Compartment = 'compartment';
/**
 * @export
 */
sb.NodeType.Submap = 'submap';
/**
 * @export
 */
sb.NodeType.Tag = 'tag';
/**
 * @export
 */
sb.NodeType.Terminal = 'terminal';
/**
 * @export
 */
sb.NodeType.Process = 'process';
/**
 * @export
 */
sb.NodeType.OmittedProcess = 'omitted process';
/**
 * @export
 */
sb.NodeType.UncertainProcess = 'uncertain process';
/**
 * @export
 */
sb.NodeType.Association = 'association';
/**
 * @export
 */
sb.NodeType.Dissociation = 'dissociation';
/**
 * @export
 */
sb.NodeType.Phenotype = 'phenotype';
/**
 * @export
 */
sb.NodeType.And = 'and';
/**
 * @export
 */
sb.NodeType.Or = 'or';
/**
 * @export
 */
sb.NodeType.Not = 'not';
/**
 * @export
 */
sb.NodeType.StateVariable = 'state variable';
/**
 * @export
 */
sb.NodeType.UnitOfInformation = 'unit of information';
/**
 * @export
 */
sb.NodeType.Stoichiometry = 'stoichiometry';
/**
 * @export
 */
sb.NodeType.Entity = 'entity';
/**
 * @export
 */
sb.NodeType.Outcome = 'outcome';
/**
 * @export
 */
sb.NodeType.Observable = 'observable';
/**
 * @export
 */
sb.NodeType.Interaction = 'interaction';
/**
 * @export
 */
sb.NodeType.InfluenceTarget = 'influence target';
/**
 * @export
 */
sb.NodeType.Annotation = 'annotation';
/**
 * @export
 */
sb.NodeType.VariableValue = 'variable value';
/**
 * @export
 */
sb.NodeType.ImplicitXor = 'implicit xor';
/**
 * @export
 */
sb.NodeType.Delay = 'delay';
/**
 * @export
 */
sb.NodeType.Existence = 'existence';
/**
 * @export
 */
sb.NodeType.Location = 'location';
/**
 * @export
 */
sb.NodeType.Cardinality = 'cardinality';

/**
 * Helper method to check if the node type is supported;
 * @param nodeType {string} String presentation of node type.
 * @return {boolean} true if supported
 * @export
 */
sb.NodeTypeHelper.isNodeTypeSupported = function (nodeType) {
    return goog.object.containsValue(sb.NodeType, nodeType);
};
