goog.provide('sb.Document');

/**
 * Class for the root structure of a system biology document.
 * @param {string=} opt_id Optional id of the document.
 * @constructor
 */
sb.Document=function(opt_id){
    this.id=opt_id;
};

/**
 * Create a new node within the document.
 * @return {sb.Node}
 */
sb.Document.prototype.createNode=function(){
    return new sb.Node(this);
};



