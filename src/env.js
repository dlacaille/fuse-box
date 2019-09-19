"use strict";
exports.__esModule = true;
var appRoot = require("app-root-path");
var path = require("path");
var utils_1 = require("./utils/utils");
var VERSION = require('./../package.json').version;
var FUSE_ROOT = appRoot.path;
exports.env = {
    FUSE_ROOT: FUSE_ROOT,
    APP_ROOT: appRoot.path,
    VERSION: VERSION,
    isTest: !!process.env.JEST_TEST,
    CACHE: {
        ROOT: path.join(appRoot.path, 'node_modules/.fusebox', VERSION),
        PACKAGES: 'packages',
        PROJET_FILES: 'project-files'
    },
    SCRIPT_PATH: path.dirname(require.main.filename),
    SCRIPT_FILE: require.main.filename,
    FUSE_MODULES: path.join(FUSE_ROOT, 'modules')
};
function getDevelopmentApi() {
    var contents = utils_1.readFile(path.join(exports.env.FUSE_MODULES, 'fuse-loader/index.js'));
    return "(function(){\n    " + contents + "\n})();";
}
exports.getDevelopmentApi = getDevelopmentApi;
function openDevelopmentApi() {
    var contents = utils_1.readFile(path.join(exports.env.FUSE_MODULES, 'fuse-loader/index.js'));
    return "(function(){\n    var FuseBox = (function(){\n      " + contents + "\n      return FuseBox;\n    })()\n";
}
exports.openDevelopmentApi = openDevelopmentApi;
function closeDevelopmentApi() {
    return "\n})();";
}
exports.closeDevelopmentApi = closeDevelopmentApi;
