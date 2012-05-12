goog.provide('sb.model.Element');

goog.require('sb.model.AttributeObject');

/**
 * Base class for sb.Node and sb.Arc.
 * @extends sb.model.AttributeObject
 * @param {!sb.Document} document the document to bind
 * @constructor
 * @export
 */
sb.model.Element=function(document){
    goog.base(this);

    /**
     * @protected
     * @type {sb.Document}
     */
    this.document_ = document;

    /**
     *
     * @type {Array.<sb.model.Element>}
     * @private
     */
    this.children_ = [];

    /**
     * The parent node.
     * @type {sb.model.Element}
     */
    this.parent = null;

};

goog.inherits(sb.model.Element,sb.model.AttributeObject);

/**
 * Setter/getter of arc id.
 * @param {string=} opt_id id value to set
 * @return {string|sb.model.Element} current id or sb.model.Element instance for chaining
 * @export
 */
sb.model.Element.prototype.id = function (opt_id) {
    if (goog.isDef(opt_id)) {
        this.assertIdUnique_(opt_id);
    }
    return /** @type{string|sb.model.Element}*/this.attr('id', opt_id, this.document_);
};


/**
 * Make sure no other element has the same id.
 * @param elementId Id to check.
 * @private
 */
sb.model.Element.prototype.assertIdUnique_ = function (elementId) {
    var arc = this.document_.element(elementId);
    if (arc && arc != this) {
        throw new Error('Given element id ' + elementId + ' already existed');
    }
};
/**
 * The element to be added as child.
 * @param {sb.model.Element} element
 * @export
 */
sb.model.Element.prototype.addChild = function (element) {
    if (element.parent) {
        element.parent.removeChild(element);
    }
    goog.array.insert(this.children_, element);
    element.parent = this;
};

/**
 * Remove child element from current element.
 * @param {sb.model.Element} element
 * @export
 */
sb.model.Element.prototype.removeChild = function (element) {
    goog.array.remove(this.children_, element);
    element.parent = null;
};

/**
 * Return array of child nodes. The array should be treated as read-only. Use sb.model.Element.prototype.addChild and sb.model.Element.prototype.removeChild to modify the child elements.
 * @return {Array.<sb.model.Element>}
 * @export
 */
sb.model.Element.prototype.children = function () {
    return this.children_;
};

