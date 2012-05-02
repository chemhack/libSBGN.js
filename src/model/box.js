goog.provide('sb.Box');

goog.require('goog.math.Box');

/**
 * Class representing a box.
 * @param {number} opt_x
 * @param {number} opt_y
 * @param {number} opt_width
 * @param {number} opt_height
 * @constructor
 * @export
 */
sb.Box = function (opt_x, opt_y, opt_width, opt_height) {
    //TODO: need to investigate more about closure compiler renaming. maybe too risky without export
    /**
     * Top left corner, x coordinate
     * @type {number}
     * @public
     */
    this.x = goog.isDef(opt_x) ? opt_x : 0;
    /**
     * Top left corner, y coordinate
     * @type {number}
     * @public
     */
    this.y = goog.isDef(opt_y) ? opt_y : 0;
    /**
     * Width of the box.
     * @type {number}
     * @public
     */
    this.width = goog.isDef(opt_width) ? opt_width : 0;
    /**
     * Height of the box.
     * @type {number}
     * @public
     */
    this.height = goog.isDef(opt_height) ? opt_height : 0;
};


/**
 * Test if this box contains another box.
 * @param {sb.Box} anotherBox
 * @return {boolean}
 */
sb.Box.prototype.contains = function (anotherBox) {
    return (anotherBox.x >= this.x) && (anotherBox.y >= this.y) && (this.x + this.width) >= (anotherBox.x + anotherBox.width) && (this.y + this.height) >= (anotherBox.y + anotherBox.height);
};