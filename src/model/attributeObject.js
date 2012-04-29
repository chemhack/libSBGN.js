goog.provide('sb.model.AttributeObject');

goog.require('goog.structs.Map');

/**
 * Base class for attribute support
 * @constructor
 */
sb.model.AttributeObject=function(){

    /**
     * Internal attribute map
     * @type {goog.structs.Map}
     * @private
     */
    this.attrs_ = new goog.structs.Map();
};

/**
 * Setter/getter of attribute.
 * @param {string} key key
 * @param {*=} opt_value label value to set
 * @param {*=} opt_notifyObject object to notify, the object should implement onAttrChange(object, key, oldValue, newValue) method.
 * @return {*} current attributeValue or class instance for chaining
 * @export
 */
sb.model.AttributeObject.prototype.attr = function (key, opt_value, opt_notifyObject) {
    if (goog.isDef(opt_value)) {
        var oldValue = this.attrs_.get(key);
        this.attrs_.set(key, opt_value);
        if(opt_notifyObject){
            opt_notifyObject.onAttrChange(this, key, oldValue, opt_value);
        }
        return this;
    } else {
        return this.attrs_.get(key);
    }
};
