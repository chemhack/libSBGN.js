goog.provide('sb.sbo.NodeTypeMapping');
goog.provide('sb.sbo.ArcTypeMapping');

/**
 * Node type to sbo id mapping
 * @type {Object}
 * @export
 */
sb.sbo.NodeTypeMapping = {};

sb.sbo.NodeTypeMapping[sb.NodeType.UnspecifiedEntity] = 285;
sb.sbo.NodeTypeMapping[sb.NodeType.Compartment] = 290;
sb.sbo.NodeTypeMapping[sb.NodeType.Macromolecule] = 245;
sb.sbo.NodeTypeMapping[sb.NodeType.MacromoleculeMultimer] = 420;
sb.sbo.NodeTypeMapping[sb.NodeType.SimpleChemical] = 247;
sb.sbo.NodeTypeMapping[sb.NodeType.SimpleChemicalMultimer] = 421;
sb.sbo.NodeTypeMapping[sb.NodeType.Complex] = 253;
sb.sbo.NodeTypeMapping[sb.NodeType.ComplexMultimer] = 418;
sb.sbo.NodeTypeMapping[sb.NodeType.Process] = 375;
sb.sbo.NodeTypeMapping[sb.NodeType.OmittedProcess] = 379;
sb.sbo.NodeTypeMapping[sb.NodeType.UncertainProcess] = 396;
sb.sbo.NodeTypeMapping[sb.NodeType.Annotation] = 110003;
sb.sbo.NodeTypeMapping[sb.NodeType.Phenotype] = 358;
sb.sbo.NodeTypeMapping[sb.NodeType.NucleicAcidFeature] = 250; // should it be 354? http://precedings.nature.com/documents/3721/version/4/files/npre20113721-4.pdf 2.4.4 Glyph: Nucleic acid feature SBO:0000354 ! informational molecule segment
sb.sbo.NodeTypeMapping[sb.NodeType.NucleicAcidFeatureMultimer] = 250;// should be SBO:0000419 ! multimer of informational molecule segments
sb.sbo.NodeTypeMapping[sb.NodeType.Association] = 177;
sb.sbo.NodeTypeMapping[sb.NodeType.Dissociation] = 180;
sb.sbo.NodeTypeMapping[sb.NodeType.Entity] = 245;
sb.sbo.NodeTypeMapping[sb.NodeType.Submap] = 395;
sb.sbo.NodeTypeMapping[sb.NodeType.Terminal] = 110004; //?
sb.sbo.NodeTypeMapping[sb.NodeType.PerturbingAgent] = 405;
sb.sbo.NodeTypeMapping[sb.NodeType.VariableValue] = 110001; //?
sb.sbo.NodeTypeMapping[sb.NodeType.ImplicitXor] = -1; // what's this? can't find in spec.
sb.sbo.NodeTypeMapping[sb.NodeType.Tag] = 110002; //?
sb.sbo.NodeTypeMapping[sb.NodeType.And] = 173;
sb.sbo.NodeTypeMapping[sb.NodeType.Or] = 174;
sb.sbo.NodeTypeMapping[sb.NodeType.Not] = 238;
sb.sbo.NodeTypeMapping[sb.NodeType.Delay] = 225;
sb.sbo.NodeTypeMapping[sb.NodeType.SourceAndSink] = 291;
sb.sbo.NodeTypeMapping[sb.NodeType.Perturbation] = 405;
sb.sbo.NodeTypeMapping[sb.NodeType.BiologicalActivity] = 412;

/**
 * Arc type to sbo id mapping
 * @type {Object}
 * @export
 */
sb.sbo.ArcTypeMapping = {};
sb.sbo.ArcTypeMapping[sb.ArcType.Production] = 393;
sb.sbo.ArcTypeMapping[sb.ArcType.EquivalenceArc] = 15; //in spec, SBO Term: Not applicable.
sb.sbo.ArcTypeMapping[sb.ArcType.LogicArc] = 15; //should be SBO:0000398 ! logical relationship.
sb.sbo.ArcTypeMapping[sb.ArcType.NecessaryStimulation] = 461; //should be SBO:0000171 ! necessary stimulation.
sb.sbo.ArcTypeMapping[sb.ArcType.Assignment] = 464;
sb.sbo.ArcTypeMapping[sb.ArcType.Interaction] = 342;
sb.sbo.ArcTypeMapping[sb.ArcType.AbsoluteInhibition] = 407;
sb.sbo.ArcTypeMapping[sb.ArcType.Modulation] = 168;
sb.sbo.ArcTypeMapping[sb.ArcType.Inhibition] = 169;
sb.sbo.ArcTypeMapping[sb.ArcType.AbsoluteStimulation] = 411;
sb.sbo.ArcTypeMapping[sb.ArcType.UnknownInfluence] = 168;
sb.sbo.ArcTypeMapping[sb.ArcType.PositiveInfluence] = 170; //?
sb.sbo.ArcTypeMapping[sb.ArcType.NegativeInfluence] = 169;
sb.sbo.ArcTypeMapping[sb.ArcType.Stimulation] = 170;
sb.sbo.ArcTypeMapping[sb.ArcType.Catalysis] = 172;
sb.sbo.ArcTypeMapping[sb.ArcType.Consumption] = 15;
sb.sbo.ArcTypeMapping[sb.ArcType.Production] = 393;
sb.sbo.ArcTypeMapping[sb.ArcType.Catalysis] = 13;

