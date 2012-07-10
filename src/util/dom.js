goog.provide('sb.util.dom');

goog.require('goog.dom');
goog.require('goog.array');

/**
 * Calls a function for each child element of a DOM element.
 * @param {Element} domElement
 * @param {function} f The function to call for every element. It should take one argument(the element).
 * @param {object=} opt_obj The object to be used as the value of 'this' within f.
 */
sb.util.dom.forEachElement = function (domElement, f, opt_obj) {
    var elementChildren = goog.dom.getChildren(domElement);
    goog.array.forEach(elementChildren, f, opt_obj);
};


/**
 * Calls a function for each name matched child element of a DOM element.
 * @param {Element} domElement
 * @param {string} name The name to match
 * @param {function} f The function to call for every element. It should take one argument(the element).
 * @param {object=} opt_obj The object to be used as the value of 'this' within f.
 */
sb.util.dom.forEachElementByName = function (domElement, name, f, opt_obj) {
    var elementChildren = goog.array.filter(goog.dom.getChildren(domElement), function (element) {
        return element.tagName == name
    });
    goog.array.forEach(elementChildren, f, opt_obj);
};
