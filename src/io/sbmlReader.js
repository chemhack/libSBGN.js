
goog.provide('sb.io.SbmlReader');

goog.require('sb.io.XmlReader');
goog.require('sb.Document');
goog.require('sb.util.Stack');
goog.require('goog.array');
goog.require('sb.Box');
goog.require('sb.Point');
goog.require('goog.asserts');
goog.require('goog.debug.Logger');
goog.require('sb.util.dom');

/**
 * Reader of sbgn class
 * @constructor
 * @extends sb.io.XmlReader
 * @export
 */
sb.io.SbmlReader = function () {
    goog.base(this);
    /**
     * The stack used to parse xml document.
     * @type {sb.util.Stack}
     * @private
     */
    this.objStack_ = null;

    /**
     * Array used to hold arcs elements in order to set reference after all glyphs are read in.
     * @type {Array.<Element>}
     * @private
     */
    this.delayedArcArray_ = null;

    /**
     * The sb.Document to work on.
     * @type {sb.Document}
     * @private
     */
    this.document_ = null;

    /**
     *  array used to store compartments
     * @type {Array.<sb.Node>}
     * @private
     */
    this.compartments_ = null;

};

goog.inherits(sb.io.SbmlReader, sb.io.XmlReader);

sb.io.SbmlReader.prototype.logger = goog.debug.Logger.getLogger('sb.io.SbmlReader');

/**
 *
 * @param text
 * @return {sb.Document}
 * @export
 */
sb.io.SbmlReader.prototype.parseText = function (text) {
    this.logger.info('Parsing xml size:' + text.length);
    //this.objStack_ = new sb.util.Stack();
    this.document_ = new sb.Document();
    //var document_ = new sb.Document();
    this.compartments_ = [];
    this.delayedArcArray_ = [];
    var xmlDocument = this.parseXmlText(text);
    goog.asserts.assert(xmlDocument.documentElement);
                
    sb.util.dom.forEachElementByName(xmlDocument.documentElement, 'model', function (model){
        sb.util.dom.forEachElementByName(model, 'listOfCompartments', function(lo){
            sb.util.dom.forEachElement(lo, function(species){
                var node = this.document_.createNode(species.getAttribute('id')).type('compartment');
            },this);
        },this);
        sb.util.dom.forEachElementByName(model, 'listOfSpecies', function(lo){
            sb.util.dom.forEachElement(lo, function(species){
                var node = this.document_.createNode(species.getAttribute('id'));
                //FIXME add compartment
                var species_id = species.getAttribute('id');
                var name_and_id = species.getAttribute('id')+species.getAttribute('name');
                if ((name_and_id.toLowerCase().indexOf("sink") != -1)|| (name_and_id.toLowerCase().indexOf('emptyset') != -1)){// guess type by attribute
                    node.type('source and sink');
                }else if ((name_and_id.toLowerCase().indexOf("dna") != -1)|| (name_and_id.toLowerCase().indexOf("rna") != -1)){
                    node.type('nucleic acid feature');
                //}else if(species.hasChild('annotation')){ // check if the species contains an annotation
                    //FIXME
                    /*if 'urn:miriam:obo.chebi' in resource:
                    if 'urn:miriam:pubchem' in resource:
                    if 'urn:miriam:uniprot' in resource:*/
                    //node.type('macromolecule');
                    //node.type('simple chemical');
                }else{
                    node.type('unspecified entity');
                }
            },this);
        },this);
        sb.util.dom.forEachElementByName(model, 'listOfReactions', function (lor){
            sb.util.dom.forEachElementByName(lor,'reaction', function(reaction){
                //console.log('reaction: '+reaction.tagName+ ' : '+reaction.getAttribute('id'));
                var reaction_id = reaction.getAttribute('id');
                var node = this.document_.createNode(reaction_id).type('process');
                var reaction_compartment;
                //FIXME add compartment
                console.log('reaction_id '+reaction_id);
                var has_reactands = false, has_products = false;
                sb.util.dom.forEachElementByName(reaction, 'listOfReactants', function(lo){
                    sb.util.dom.forEachElement(lo, function(item){
                        var source = item.getAttribute('species'); 
                        var target = reaction_id;
                        var arc = this.document_.createArc(source+'_to_'+target).source(source).target(target).type('consumption');
                        has_reactands = true;
                        //reaction_compartment = item.getAttribute('')//FIXME
                    }, this)
                }, this);
                sb.util.dom.forEachElementByName(reaction, 'listOfProducts', function(lo){
                    sb.util.dom.forEachElement(lo, function(item){
                        var source = reaction_id;
                        var target = item.getAttribute('species'); 
                        var arc = this.document_.createArc(source+'_to_'+target).source(source).target(target).type('production');
                        has_products = true;
                    }, this);
                }, this);
                sb.util.dom.forEachElementByName(reaction, 'listOfModifiers', function(lo){
                    sb.util.dom.forEachElement(lo, function(item){
                        var source = item.getAttribute('species'); 
                        var target = reaction_id;
                        var arc = this.document_.createArc(source+'_to_'+target).source(source).target(target).type('modulation');
                        //FIXME look up SBO term for type, which element is SBO term attached to, I hope this one!
                    }, this);
                }, this);
                if (! has_reactands){
                    var source = reaction_id+'_source'; 
                    var node = this.document_.createNode(source).type('source and sink');
                    var target = reaction_id;
                    var arc = this.document_.createArc(source+'_to_'+target).source(source).target(target).type('consumption');
                }
                if (! has_products){
                    var target = reaction_id+'_sink';
                    var node = this.document_.createNode(target).type('source and sink');
                    var source = reaction_id; 
                    var arc = this.document_.createArc(source+'_to_'+target).source(source).target(target).type('production');
                }

                //compartment.addChild(node)//FIXME
            }, this);
        }, this);
        
    }, this);
    return this.document_;
};
