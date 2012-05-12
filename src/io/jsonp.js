//Although closure library has jsonp itself, and the implementation is very robust, but has a large dependency. We will go for our own little dirty jsonp implementation, to save 10KB.
goog.provide('sb.io.Jsonp');


/**
 * Class for cross-domain jsonp requests.
 * @param {string} url
 * @param {Object} params
 * @param {Function} callback
 * @constructor
 * @export
 */
sb.io.Jsonp = function (url, params, callback) {
    this.url = url;
    this.callback = callback;
    this.internalCallback = this.generateCallback();
    // Drop the script on the page
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    var query = '';
    params = params || {};
    var key;
    for (key in params) {
        if (params.hasOwnProperty(key)) {
            query += encodeURIComponent(key) + "=" + encodeURIComponent(params[key]) + "&";
        }
    }
    script.setAttribute('src', url + '?' + query + 'callback=sb.io.Jsonp.' + this.internalCallback);
    this.script = document.getElementsByTagName('head')[0].appendChild(script);
};
/**
 * Fire a jsonp request
 * @param {string} url
 * @param {Object} params
 * @param {Function} callback
 * @export
 */
sb.io.Jsonp.call=function(url,params,callback){
   new sb.io.Jsonp(url,params,callback);
};

sb.io.Jsonp.prototype.generateCallback = function () {
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var randomName = '';

    for (var i = 0; i < 15; i++) {
        randomName += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    var self = this;

    sb.io.Jsonp[randomName] = function (data) {
        self.callback(data);

        // Cleanup
        delete sb.io.Jsonp[randomName];
        self.script.parentNode.removeChild(self.script);
    };

    return randomName;
};