goog.provide('sb.io');

goog.require('sb.io.SbgnReader');
goog.require('sb.io.SbgnWriter');
goog.require('sb.io.Jsonp');
goog.require('sb.io.JsbgnWriter');
goog.require('sb.io.JsbgnReader');
goog.require('sb.io.SbmlReader');
goog.require('goog.debug.Logger');
goog.require('goog.json');
goog.require('goog.array');

sb.io.logger_ = goog.debug.Logger.getLogger('sb.io');

/**
 * Read a sb.Document from file content
 * @param {string} text File content in string.
 * @param {string} format  'sbgn-ml','jsbgn' and 'sbml' is supported, if not given, will try auto-detection.
 * @return {sb.Document}
 * @export
 */
sb.io.read = function (text, format) {
    if (format) {
        return sb.io.read_(text, format);
    } else {
        var result;
        goog.array.find(['jsbgn', 'sbgn-ml', 'rxncon', 'sbml'], function (formatToTest) {
            try {
                var doc = sb.io.read_(text, formatToTest);
                if (doc) {
                    result = doc;
                    return true;
                }
            } catch (e) {
            }
            return false;
        }, this);
        return result;
    }
};

/**
 * Read a sb.Document from file content
 * @param {string} text File content in string.
 * @param {string} format  'sbgn-ml','jsbgn' and 'sbml' is supported
 * @return {sb.Document}
 * @private
 */
sb.io.read_ = function (text, format) {
    sb.io.logger_.fine("Reading format: " + format);
    var reader;
    if (format == 'sbgn-ml') {
        reader = new sb.io.SbgnReader();
        sb.io.logger_.fine("using sb.io.SbgnReader");
    } else if (format == 'jsbgn') {
        reader = new sb.io.JsbgnReader();
        sb.io.logger_.fine("using sb.io.JsbgnReader");
    } else if (format == 'rxncon') {
        reader = new sb.io.RxnconReader();
        sb.io.logger_.fine("using sb.io.RxnconReader");
    } else if (format == 'sbml') {
        reader = new sb.io.SbmlReader();
        sb.io.logger_.fine("using sb.io.SbmlReader");
    }
    else {
        throw new Error("Format " + format + " not supported");
    }
    sb.io.logger_.fine('Parsing xml size:' + text.length);
    return reader.parseText(text);
};

/**
 * Load a document from a url. NOTE: The data will go through our proxy server.
 * @param {string} url URL of file to load. Only http and https is supported. Can be on any server.
 * @param {string} format currently only 'sbgn-ml' is supported
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

/**
 * Write a sb.Document to text string
 * @param {sb.Document} doc document to write
 * @param {string} format currently only 'jsbgn' and 'sbgn-ml' is supported
 * @return {sb.Document}
 * @export
 */
sb.io.write = function (doc, format) {
    var writer;
    if (format == 'jsbgn') {
        writer = new sb.io.JsbgnWriter();
        sb.io.logger_.fine("using sb.io.JsbgnWriter");
    } else if (format == 'sbgn-ml') {
        writer = new sb.io.SbgnWriter();
        sb.io.logger_.fine("using sb.io.SbgnWriter");
    } else {
        throw new Error("Format " + format + " not supported");
    }
    return writer.write(doc);
};
