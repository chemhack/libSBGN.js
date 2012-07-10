
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
    this.compartments_ = [];
    this.delayedArcArray_ = [];
    var xmlDocument = this.parseXmlText(text);
    goog.asserts.assert(xmlDocument.documentElement);
    //this.traverse(xmlDocument.documentElement);
    //this.onElementOpen(element);
    this.logger.finer('test ing');
    sb.util.dom.forEachElementByName(xmlDocument.documentElement.childNodes, 'model', function (model){
        /*sb.util.dom.forEachElementByName(model, 'listOfReactions', function(reaction){
            console.log('reaction: 'reaction.getAttribute('id'));
            /*sb.util.dom.forEachElementByName(reaction, 'listOfReactants', function(item){
                console.log('reactand: '+item.getAttribute('species'));
            });
            sb.util.dom.forEachElementByName(reaction, 'listOfProducts', function(item){
                console.log('prodct: '+item.getAttribute('species'));
            });
            sb.util.dom.forEachElementByName(reaction, 'listOfModifiers', function(item){
                console.log('modifier: '+item.getAttribute('species'));
            });
        }, this);
        */
    }, this);
    /*
    goog.array.forEach(xmlDocument.documentElement.childNodes, function (model) {//get model
        if (model.nodeType == goog.dom.NodeType.ELEMENT) {
            var tagName = model.tagName;
            tagName = tagName ? tagName.toLocaleLowerCase() : null;
            if (tagName == 'model'){

                goog.array.forEach(model.childNodes, function (xmlElement) {
                    if (xmlElement.nodeType == goog.dom.NodeType.ELEMENT) {
                        tagName = xmlElement.tagName;
                        tagName = tagName ? tagName.toLocaleLowerCase() : null;
                        if (tagName == 'listofreactions'){

                            goog.array.forEach(xmlElement.childNodes, function (xmlElement1) {
                                if (xmlElement1.nodeType == goog.dom.NodeType.ELEMENT) {
                                    tagName = xmlElement1.tagName;
                                    console.log('t '+tagName+ ' id: '+ xmlElement1.getAttribute('id'));
                                    tagName = tagName ? tagName.toLocaleLowerCase() : null;
                                    // ********************************** 
                                    var node = this.document_.createNode(xmlElement1.getAttribute('id'));
                                    var glyph_class = xmlElement.getAttribute('process');
                                    //var arc = this.document_.createArc(nodeId);
                                    //arc.type(arc_class);
                                    // ********************************** 
                                    //var node = this.document_.createNode(xmlElement1.getAttribute('id'));
                                    //var glyph_class = xmlElement1.getAttribute('class');

                                    goog.array.forEach(xmlElement1.childNodes, function (xmlElement2) {
                                        //if (xmlElement2.nodeType == goog.dom.NodeType.ELEMENT) {
                                            //console.log('bla '+xmlElement2.nodeType);
                                            tagName = xmlElement2.tagName;
                                            if (tagName == 'listOfReactants'){
                                                goog.array.forEach(xmlElement2.childNodes, function (xmlElement3) {
                                                    if (xmlElement3.nodeType == goog.dom.NodeType.ELEMENT) console.log('reactand: '+xmlElement3.getAttribute('species'));
                                                }, this);
                                            }
                                            if (tagName == 'listOfProducts'){
                                                goog.array.forEach(xmlElement2.childNodes, function (xmlElement3) {
                                                    if (xmlElement3.nodeType == goog.dom.NodeType.ELEMENT) console.log('product: '+xmlElement3.getAttribute('species'));
                                                }, this);
                                            }
                                            if (tagName == 'listOfModifiers'){
                                                goog.array.forEach(xmlElement2.childNodes, function (xmlElement3) {
                                                    if (xmlElement3.nodeType == goog.dom.NodeType.ELEMENT) console.log('modifier: '+xmlElement3.getAttribute('species'));
                                                }, this);
                                            }
                                        //}
                                    }, this);
                                }
                            }, this);
                            //foobar
                        }
                    }
                }, this);
            }
        }
    }, this);
    */

    //this.onElementClose(element);
    /*
    goog.asserts.assert(this.objStack_.array().length == 0);
    goog.array.forEach(this.delayedArcArray_, function (xmlElement) {
        var arc_id = xmlElement.getAttribute('id');
        var arc = this.document_.arc(arc_id);
        this.logger.finest('arc id: ' + arc_id);
        var arc_target = xmlElement.getAttribute('target');
        this.logger.finest('arc arc_target: ' + arc_target);
        var arc_source = xmlElement.getAttribute('source');
        this.logger.finest('arc arc_source: ' + arc_source);
        arc.source(arc_source).target(arc_target);
    }, this);
    */
    return this.document_;
};

sb.io.SbmlReader.glyphPropertyMap_ = {

};

//TODO: arcgroup??

/**
 * @inheritDoc
 * @override
 */
sb.io.SbmlReader.prototype.onElementOpen = function (xmlElement) {
    var tagName = xmlElement.tagName;
    tagName = tagName ? tagName.toLocaleLowerCase() : null;
    var nodeId = xmlElement.getAttribute('id');
    this.logger.finer('xmlElement open: ' + tagName);
    var topElementInStack = this.objStack_.peek();

    if (tagName == 'glyph') {
        this.logger.finest('glyph glyph_id: ' + nodeId);
        var node = (topElementInStack instanceof sb.Node) ? topElementInStack.createSubNode(nodeId) : this.document_.createNode(nodeId);
        var glyph_class = xmlElement.getAttribute('class');
        this.logger.finest('glyph glyph_class: ' + glyph_class);
        node.type(glyph_class);
        this.objStack_.push(node);
        if (glyph_class == 'compartment') {
            goog.array.insert(this.compartments_, node);
        }
    } else if (tagName == 'port') {
        this.logger.finest('port port_id: ' + nodeId);
        if (topElementInStack instanceof sb.Node || topElementInStack instanceof sb.Arc) {
            topElementInStack.createPort(nodeId);
        }
    } else if (tagName == 'arc') {
        this.logger.finest('arc arc_id: ' + nodeId);
        var arc = this.document_.createArc(nodeId);
        if(!nodeId){
            xmlElement.setAttribute('id',arc.id());
            this.logger.finest('no arc id, arc_id automatically set to: ' + xmlElement.getAttribute('id'));
        }
        var arc_class = xmlElement.getAttribute('class');
        this.logger.finest('arc arc_class: ' + arc_class);
        arc.type(arc_class);
        this.objStack_.push(arc);
        goog.array.insert(this.delayedArcArray_, xmlElement);
    } else if (tagName == 'label') {
        topElementInStack.label(xmlElement.getAttribute('text'));
    } else if (tagName == 'bbox') {
        var box = new sb.Box(Number(xmlElement.getAttribute('x')), Number(xmlElement.getAttribute('y')), Number(xmlElement.getAttribute('w')), Number(xmlElement.getAttribute('h')));
        if (xmlElement.parentNode.tagName.toLocaleLowerCase() == 'label') {
            topElementInStack.attr('label.pos', box);
        } else {
            topElementInStack.attr('box', box);
            if ((topElementInStack instanceof sb.Node) && (topElementInStack.type() != sb.NodeType.Compartment)) {
                goog.array.forEach(this.compartments_, function (compartment) {
                    if (compartment.attr('box').contains(box)) {
                        compartment.addChild(topElementInStack);
                    }
                }, this);
            }
        }
    } else if (tagName == 'start' || tagName == 'end') {
        if (topElementInStack instanceof sb.Arc) {
            topElementInStack.attr(tagName, new sb.Point(Number(xmlElement.getAttribute('x')), Number(xmlElement.getAttribute('y'))));
        }
    } else if (tagName == 'map') {
        var language = xmlElement.getAttribute('language');
        if (language) {
            this.document_.lang(language);
        }
        this.objStack_.push(this.document_);
    } else if (tagName == 'entity') {
        topElementInStack.attr('entity', xmlElement.getAttribute('name'));
    }
};

/**
 * @inheritDoc
 * @override
 */
sb.io.SbmlReader.prototype.onElementClose = function (xmlElement) {
    var tagName = xmlElement.tagName;
    this.logger.finer('node close: ' + tagName);
    if (tagName == 'glyph' || tagName == 'arc' || tagName == 'map') {
        this.objStack_.pop();
    }
};
