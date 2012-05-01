goog.provide('sb.Box');

goog.require('goog.math.Box');

/**
 *
 * @param {number} opt_x
 * @param {number} opt_y
 * @param {number} opt_width
 * @param {number} opt_height
 * @constructor
 * @export
 */
sb.Box = function (opt_x, opt_y, opt_width, opt_height) {
    //TODO: need to investigate more about closure compiler renaming. maybe too risky without export
    this.x = goog.isDef(opt_x) ? opt_x : 0;
    this.y = goog.isDef(opt_y) ? opt_y : 0;
    this.width = goog.isDef(opt_width) ? opt_width : 0;
    this.height = goog.isDef(opt_width) ? opt_width : 0;
};

