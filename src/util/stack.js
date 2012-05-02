goog.provide('sb.util.Stack');

goog.require('goog.array');

/**
 * A stack data structure
 * @constructor
 */
sb.util.Stack = function () {
    /**
     * Internal array for stack implementation
     * @type {Array}
     * @private
     */
    this.array_ = [];
};

/**
 * Push an element into stack
 * @param {*} element
 */
sb.util.Stack.prototype.push = function (element) {
    //TODO check goog.array.insert
    this.array_.push(element);
};

/**
 * Pop the last element.
 * @return {*}
 */
sb.util.Stack.prototype.pop = function () {
    return this.array_.pop();
};

/**
 * Return the last element, but do not delete it.
 * @return {*}
 */
sb.util.Stack.prototype.peek = function () {
    return goog.array.peek(this.array_);
};

/**
 * Return the underlying array
 * @return {Array}
 */
sb.util.Stack.prototype.array = function () {
    return this.array_;
};

