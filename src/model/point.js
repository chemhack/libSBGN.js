goog.provide('sb.Point');

/**
 * Class for representing coordinates and positions.
 * @param {number=} opt_x Left, defaults to 0.
 * @param {number=} opt_y Top, defaults to 0.
 * @constructor
 * @export
 */
sb.Point = function (opt_x, opt_y) {
    /**
     * X-value
     * @public
     * @type {number}
     */
    this.x = goog.isDef(opt_x) ? opt_x : 0;

    /**
     * Y-value
     * @type {number}
     * @public
     */
    this.y = goog.isDef(opt_y) ? opt_y : 0;
};

///**
// * Returns a new copy of the coordinate.
// * @return {!sb.Point} A clone of this coordinate.
// * @export
// */
//sb.Point.prototype.clone = function () {
//    return new sb.Point(this.x, this.y);
//};
