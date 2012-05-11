goog.provide('sb.NodeArcList');

/**
 * All node type and arc types in ER diagrams. See <a href="http://www.sbgn.org/Image:Refcard-ER.png">SBGN Refcard</a>
 * @type {Array}
 */
sb.NodeArcList.ER = [
    //Interactors
    sb.NodeType.Entity,
    sb.NodeType.Outcome,

    sb.NodeType.PerturbingAgent,

    //Logical Operators
    sb.NodeType.And,
    sb.NodeType.Or,
    sb.NodeType.Not,
    sb.NodeType.Delay,

    //Auxiliary units
    sb.NodeType.UnitOfInformation,
    sb.NodeType.StateVariable,
    sb.NodeType.Existence,
    sb.NodeType.Location,

    sb.NodeType.VariableValue,

    //Statements
    sb.ArcType.Assignment,
    sb.NodeType.Phenotype,
    sb.NodeType.Interaction,

    //RelationNodes
    sb.NodeType.Annotation,

    //Influence
    sb.ArcType.Modulation,
    sb.ArcType.Stimulation,
    sb.ArcType.NecessaryStimulation,
    sb.ArcType.AbsoluteStimulation,
    sb.ArcType.Inhibition,
    sb.ArcType.AbsoluteInhibition,
    sb.ArcType.LogicArc
];

/**
 * All node type and arc types in PD diagrams. See <a href="http://www.sbgn.org/Image:Refcard-PD.png">SBGN Refcard</a>
 * @type {Array}
 */
sb.NodeArcList.PD = [
    //Entity Pool Nodes
    sb.NodeType.UnspecifiedEntity,
    sb.NodeType.SimpleChemical,
    sb.NodeType.SimpleChemicalMultimer,
    sb.NodeType.Macromolecule,
    sb.NodeType.MacromoleculeMultimer,
    sb.NodeType.NucleicAcidFeature,
    sb.NodeType.NucleicAcidFeatureMultimer,
    sb.NodeType.PerturbingAgent,
    sb.NodeType.SourceAndSink,
    sb.NodeType.Complex,
    sb.NodeType.ComplexMultimer,

    //Auxiliary units
    sb.NodeType.UnitOfInformation,
    sb.NodeType.StateVariable,
    //clone marker is modeled as an attribute instead of node

    //Process Nodes
    sb.NodeType.Process,
    sb.NodeType.OmittedProcess,
    sb.NodeType.UncertainProcess,
    sb.NodeType.Association,
    sb.NodeType.Dissociation,
    sb.NodeType.Phenotype,

    //Container Nodes
    sb.NodeType.Compartment,

    //Connecting Arcs
    sb.ArcType.Consumption,
    sb.ArcType.Production,
    sb.ArcType.Modulation,
    sb.ArcType.Stimulation,
    sb.ArcType.Catalysis,
    sb.ArcType.Inhibition,
    sb.ArcType.NecessaryStimulation,
    sb.ArcType.LogicArc,
    sb.ArcType.EquivalenceArc,

    //Reference Nodes,
    sb.NodeType.Submap,
    sb.NodeType.Tag,

    //Logical Operators
    sb.NodeType.And,
    sb.NodeType.Or,
    sb.NodeType.Not

];

/**
 * All node type and arc types in AF diagrams. See <a href="http://www.sbgn.org/Image:Refcard-AF.png">SBGN Refcard</a>
 * @type {Array}
 */
sb.NodeArcList.AF = [
    //Activity Nodes
    sb.NodeType.BiologicalActivity,
    sb.NodeType.Phenotype,
    sb.NodeType.Perturbation,

    //Logical Operators
    sb.NodeType.And,
    sb.NodeType.Or,
    sb.NodeType.Not,
    sb.NodeType.Delay,

    //Modulating Arcs
    sb.ArcType.PositiveInfluence,
    sb.ArcType.NegativeInfluence,
    sb.ArcType.UnknownInfluence,
    sb.ArcType.NecessaryStimulation,
    sb.ArcType.LogicArc,
    sb.ArcType.EquivalenceArc,

    //Reference Nodes,
    sb.NodeType.Submap,

    //Auxiliary units
    sb.NodeType.Macromolecule,
    sb.NodeType.SimpleChemical,
    sb.NodeType.NucleicAcidFeature,
    sb.NodeType.UnspecifiedEntity, //??This one?
    sb.NodeType.Complex,

    //Container Nodes
    sb.NodeType.Compartment

];

