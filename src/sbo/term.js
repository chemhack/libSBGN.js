goog.provide('sb.sbo.NodeTypeMapping');
goog.provide('sb.sbo.ArcTypeMapping');
goog.provide('sb.sbo.ReverseNodeTypeMapping');
goog.provide('sb.sbo.ReverseArcTypeMapping');

goog.require('goog.object');
/**
 * Node type to sbo id mapping
 * @type {Object}
 * @export
 */
sb.sbo.NodeTypeMapping = {};
/**
 * Arc type to sbo id mapping
 * @type {Object}
 * @export
 */
sb.sbo.ArcTypeMapping = {};

//PD
//---------------------------------------
//Unit of information Not applicable.
//State variable  Not applicable.
//Clone marker    Not applicable.
sb.sbo.NodeTypeMapping[sb.NodeType.UnspecifiedEntity] = 285; // ! material entity of unspecified nature"
sb.sbo.NodeTypeMapping[sb.NodeType.SimpleChemical] = 247; // ! simple chemical"
sb.sbo.NodeTypeMapping[sb.NodeType.Macromolecule] = 245; // ! macromolecule"
sb.sbo.NodeTypeMapping[sb.NodeType.NucleicAcidFeature] = 354; // ! informational molecule segment"
sb.sbo.NodeTypeMapping[sb.NodeType.MacromoleculeMultimer] = 420; // ! multimer of macromolecules"
sb.sbo.NodeTypeMapping[sb.NodeType.ComplexMultimer] = 418; // ! multimer of complexes"
sb.sbo.NodeTypeMapping[sb.NodeType.NucleicAcidFeatureMultimer] = 419; // ! multimer of informational molecule segments"
sb.sbo.NodeTypeMapping[sb.NodeType.SimpleChemicalMultimer] = 421; // ! multimer of simple chemicals""
sb.sbo.NodeTypeMapping[sb.NodeType.Complex] = 253; // ! non-covalent complex"
sb.sbo.NodeTypeMapping[sb.NodeType.SourceAndSink] = 291; // ! empty set"
sb.sbo.NodeTypeMapping[sb.NodeType.Perturbation] = 405; // ! perturbing agent"
// FIXME sb.sbo.NodeTypeMapping[sb.NodeType.Tag] = "Tag" //"Not applicable."
sb.sbo.NodeTypeMapping[sb.NodeType.Compartment] = 290; // ! physical compartment"
sb.sbo.NodeTypeMapping[sb.NodeType.Submap] = 395; // ! encapsulating process"
sb.sbo.NodeTypeMapping[sb.NodeType.Process] = 375; // ! process"
sb.sbo.NodeTypeMapping[sb.NodeType.OmittedProcess] = 397 // - omitted process."
sb.sbo.NodeTypeMapping[sb.NodeType.UncertainProcess] = 396; // ! uncertain process."
sb.sbo.NodeTypeMapping[sb.NodeType.Association] = 177; // ! non-covalent binding."
sb.sbo.NodeTypeMapping[sb.NodeType.Dissociation] = 180; // ! dissociation."
sb.sbo.NodeTypeMapping[sb.NodeType.Phenotype] = 358; // ! phenotype"
sb.sbo.ArcTypeMapping[sb.ArcType.Consumption] = 394; // ! consumption."
sb.sbo.ArcTypeMapping[sb.ArcType.Production] = 393; // ! production."
sb.sbo.ArcTypeMapping[sb.ArcType.Modulation] = 168; // ! control."
sb.sbo.ArcTypeMapping[sb.ArcType.Stimulation] = 170; // ! stimulation."
sb.sbo.ArcTypeMapping[sb.ArcType.Catalysis] = 172; // ! catalysis."
sb.sbo.ArcTypeMapping[sb.ArcType.Inhibition] = 169; // ! inhibition."
sb.sbo.ArcTypeMapping[sb.ArcType.NecessaryStimulation] = 171; // ! necessary stimulation."
sb.sbo.ArcTypeMapping[sb.ArcType.LogicArc] = 398; // ! logical relationship."
//FIXME sb.sbo.ArcTypeMapping[sb.ArcType.EquivalenceArc] = "Equivalence arc" //"Not applicable."
sb.sbo.NodeTypeMapping[sb.NodeType.And] = 173; // ! and."
sb.sbo.NodeTypeMapping[sb.NodeType.Or] = 174; // ! or."
sb.sbo.NodeTypeMapping[sb.NodeType.Not] = 238; // ! not."

//ER  
//---------------------------------------
sb.sbo.NodeTypeMapping[sb.NodeType.Entity] = 245; // ! entity"
sb.sbo.NodeTypeMapping[sb.NodeType.Outcome] = 409; // ! interaction outcome"
sb.sbo.NodeTypeMapping[sb.NodeType.And] = 173; // ! and."
sb.sbo.NodeTypeMapping[sb.NodeType.Or] = 174; // ! or."
sb.sbo.NodeTypeMapping[sb.NodeType.Not] = 238; // ! not."
sb.sbo.NodeTypeMapping[sb.NodeType.Delay] = 225; // ! delay."
sb.sbo.NodeTypeMapping[sb.NodeType.PerturbingAgent] = 405; // ! perturbing agent"
sb.sbo.NodeTypeMapping[sb.NodeType.Assignment] = 464; // ! state variable assignment"
sb.sbo.NodeTypeMapping[sb.NodeType.Interaction] = 342; // ! molecular or genetic interaction"
sb.sbo.NodeTypeMapping[sb.NodeType.Phenotype] = 358; // ! phenotype"
sb.sbo.ArcTypeMapping[sb.ArcType.Modulation] = 168; // ! control."
sb.sbo.ArcTypeMapping[sb.ArcType.Stimulation] = 170; // ! stimulation."
sb.sbo.ArcTypeMapping[sb.ArcType.Inhibition] = 169; // ! inhibition."
sb.sbo.ArcTypeMapping[sb.ArcType.NecessaryStimulation] = 171; // ! necessary stimulation."
sb.sbo.ArcTypeMapping[sb.ArcType.AbsoluteInhibition] = 407; // ! absolute inhibition."
sb.sbo.ArcTypeMapping[sb.ArcType.AbsoluteStimulation] = 411; // ! absolute stimulation"
sb.sbo.ArcTypeMapping[sb.ArcType.LogicArc] = 398; // ! logical relationship."
//FIXME sb.sbo.NodeTypeMapping[sb.NodeType.Annotation] = "Annotation" //"Not applicable."
//State variable   Not applicable.
//Variable value   Not applicable.

//AF  
//---------------------------------------
sb.sbo.NodeTypeMapping[sb.NodeType.BiologicalActivity] = 412; // ! biological activity"
sb.sbo.NodeTypeMapping[sb.NodeType.Perturbation] = 357; // ! perturbation"
sb.sbo.NodeTypeMapping[sb.NodeType.Phenotype] = 358; // ! phenotype"
//Unit of information  Not applicable.
sb.sbo.NodeTypeMapping[sb.NodeType.Compartment] = 290; // ! functional compartment"
sb.sbo.NodeTypeMapping[sb.NodeType.Submap] = 395; // ! encapsulating process"
sb.sbo.ArcTypeMapping[sb.ArcType.PositiveInfluence] = 170; // ! stimulation"
sb.sbo.ArcTypeMapping[sb.ArcType.NegativeInfluence] = 169; // ! inhibition"
sb.sbo.ArcTypeMapping[sb.ArcType.UnknownInfluence] = 168; // ! control"
sb.sbo.ArcTypeMapping[sb.ArcType.NecessaryStimulation] = 171; // ! necessary stimulation"
sb.sbo.ArcTypeMapping[sb.ArcType.LogicArc] = 398; // ! logical relationship."
//FIXME sb.sbo.ArcTypeMapping[sb.ArcType.EquivalenceArc] = "Equivalence arc" //"Not applicable."
sb.sbo.NodeTypeMapping[sb.NodeType.And] = 173; // ! and."
sb.sbo.NodeTypeMapping[sb.NodeType.Or] = 174; // ! or."
sb.sbo.NodeTypeMapping[sb.NodeType.Not] = 238; // ! not."
sb.sbo.NodeTypeMapping[sb.NodeType.Delay] = 225; // ! delay.
/**
 * Sbo id to node type mapping
 * @type {Object}
 * @export
 */
sb.sbo.ReverseNodeTypeMapping=goog.object.transpose(sb.sbo.NodeTypeMapping);
/**
 * Sbo id to arc type mapping;
 * @type {Object}
 * @export
 */
sb.sbo.ReverseArcTypeMapping=goog.object.transpose(sb.sbo.NodeTypeMapping);

