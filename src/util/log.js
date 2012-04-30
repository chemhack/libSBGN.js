/**
 * Helper to provide logging window.
 */

goog.provide('sb.util.log');

goog.require('goog.debug.FancyWindow');

if (goog.DEBUG) {
    var logWindow = new goog.debug.FancyWindow('main');
    logWindow.setEnabled(true);
    logWindow.init();
}
