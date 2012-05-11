goog.provide('sb.sbo.NodeTypeMapping');

/**
 * Node type to sbo id mapping
 * @type {Object}
 */
sb.sbo.NodeTypeMapping = {
    'compartment':290,
    'macromolecule':245,
    'macromolecule multimer':245, //FIXME
    'simple chemical':247,
    'simple chemical multimer':247, //FIXME
    'complex':253,
    'process':375,
    'omitted process':379,
    'uncertain process':396,
    'annotation':110003,
    'phenotype':358,
    'nucleic acid feature':250,
    'nucleic acid feature multimer':250, //FIXME
    'association':177,
    'dissociation':180,
    'entity':245,
    'submap':395,
    'terminal':110004,
    'perturbing agent':405,
    'variable value':110001,
    'implicit xor':-1,
    'tag':110002,
    'and':173,
    'or':174,
    'not':238,
    'delay':225,
    'source and sink':291,
    'stimulation':459,
    'consumption':15,
    'production':393,
    'catalysis':13,
    'equivalence arc':15,
    'logic arc':15,
    'necessary stimulation':461,
    'assignment':464,
    'interaction':342,
    'absolute inhibition':407,
    'modulation':168,
    'inhibition':169,
    'absolute stimulation':411,
    'biological activity':412,
    'unknown influence':168,
    'positive influence':170,
    'negative influence':169,
    'perturbation':405
};