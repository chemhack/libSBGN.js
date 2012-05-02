goog.provide('sb.io');

goog.require('sb.io.SbgnReader');
goog.require('sb.io.Jsonp');
goog.require('goog.debug.Logger');
goog.require('goog.json');

/**
 * Read a sb.Document from file content
 * @param {string} text File content in string.
 * @param {string} format currently only 'sbgn' is supported
 * @return {sb.Document}
 * @export
 */
sb.io.read = function (text, format) {
    sb.io.logger_.fine("Reading format: " + format);
    var reader;
    if (format == 'sbgn') {
        reader = new sb.io.SbgnReader();
        sb.io.logger_.fine("using sb.io.SbgnReader");
    } else {
        throw new Error("Format " + format + " not supported");
    }
    sb.io.logger_.fine('Parsing xml size:' + text.length);

    return reader.parseText(text);
};

sb.io.logger_ = goog.debug.Logger.getLogger('sb.io');

/**
 * Load a document from a url. NOTE: The data will go through our proxy server.
 * @param {string} url URL of file to load. Only http and https is supported. Can be on any server.
 * @param {string} format currently only 'sbgn' is supported
 * @export
 */
sb.io.readUrl = function (url, format, callback_Success) {
    var proxyUrl = 'http://chemhack.com/jsonp/ba-simple-proxy.php';
    new sb.io.Jsonp(proxyUrl, {'url':url}, function (data) {
            sb.io.logger_.fine(goog.json.serialize(data));
            if (data['status']['http_code'] == 200) {
                var doc = sb.io.read(data['contents'], format);
                callback_Success(doc);
            }
        }
    );
};