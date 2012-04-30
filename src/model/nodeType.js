goog.provide('sb.NodeType');
goog.provide('sb.NodeTypeHelper');

goog.require('goog.object');

/**
 * The enum of support node type.
 * @enum {string}
 * @export
 */
sb.NodeType={
    UnspecifiedEntity:'unspecified entity',
    SimpleChemical:'simple chemical',
    Macromolecule:'macromolecule',
    NucleicAcidFeature:'nucleic acid feature',
    SimpleChemicalMultimer:'simple chemical multimer',
    MacromoleculeMultimer:'macromolecule multimer',
    NucleicAcidFeatureMultimer:'nucleic acid feature multimer',
    Complex:'complex',
    ComplexMultimer:'complex multimer',
    SourceAndSink:'source and sink',
    Perturbation:'perturbation',
    BiologicalActivity:'biological activity',
    PerturbingAgent:'perturbing agent',
    Compartment:'compartment',
    Submap:'submap',
    Tag:'tag',
    Terminal:'terminal',
    Process:'process',
    OmittedProcess:'omitted process',
    UncertainProcess:'uncertain process',
    Association:'association',
    Dissociation:'dissociation',
    Phenotype:'phenotype',
    And:'and',
    Or:'or',
    Not:'not',
    StateVariable:'state variable',
    UnitOfInformation:'unit of information',
    Stoichiometry:'stoichiometry',
    Entity:'entity',
    Outcome:'outcome',
    Observable:'observable',
    Interaction:'interaction',
    InfluenceTarget:'influence target',
    Annotation:'annotation',
    VariableValue:'variable value',
    ImplicitXor:'implicit xor',
    Delay:'delay',
    Existence:'existence',
    Location:'location',
    Cardinality:'cardinality',
    Port:'port' //Special node type for sbgn-ml port. TODO: discuss about the implementation
};

/**
 * Helper method to check if the node type is supported;
 * @param nodeType {string} String presentation of node type.
 * @return {boolean} true if supported
 * @export
 */
sb.NodeTypeHelper.isNodeTypeSupported=function(nodeType){
   return goog.object.containsValue(sb.NodeType,nodeType);
};
