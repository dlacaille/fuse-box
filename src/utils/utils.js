"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var fs = require("fs");
var fsExtra = require("fs-extra");
var path = require("path");
var env_1 = require("../env");
var prettyTime = require("pretty-time");
var offsetLinesModule = require("offset-sourcemap-lines");
var CACHED_PATHS = new Map();
function path2Regex(path) {
    if (CACHED_PATHS.get(path)) {
        return CACHED_PATHS.get(path);
    }
    path = path.replace(/(\.|\/)/, '\\$1');
    var re = new RegExp(path);
    CACHED_PATHS.set(path, re);
    return re;
}
exports.path2Regex = path2Regex;
function matchAll(regex, str, cb) {
    var matches;
    while ((matches = regex.exec(str))) {
        cb(matches);
    }
}
exports.matchAll = matchAll;
function removeFolder(userPath) {
    fsExtra.removeSync(userPath);
}
exports.removeFolder = removeFolder;
function beautifyBundleName(absPath) {
    absPath = absPath.replace(/(\.\w+)$/i, '');
    var items = absPath.split(/(\/|\\)/);
    var l = items.length;
    var _a = [items[l - 1], items[l - 3]], a = _a[0], b = _a[1];
    var suggested = b ? b + "-" + a : a;
    if (suggested.length > 20) {
        suggested = suggested.slice(suggested.length, 20);
    }
    return suggested.toLowerCase();
}
exports.beautifyBundleName = beautifyBundleName;
function offsetLines(obj, amount) {
    return offsetLinesModule(obj, amount);
}
exports.offsetLines = offsetLines;
function isRegExp(input) {
    return !!(input && typeof input.test === 'function');
}
exports.isRegExp = isRegExp;
function createRequireConst(name, variable) {
    return "var " + (variable ? variable : name) + " = require(\"" + name + "\");";
}
exports.createRequireConst = createRequireConst;
function createRequireConstWithObject(name, variable, obj) {
    return "var " + (variable ? variable : name) + " = require(\"" + name + "\")." + obj + ";";
}
exports.createRequireConstWithObject = createRequireConstWithObject;
function createStringConst(name, value) {
    return "const " + name + " = " + JSON.stringify(value) + ";";
}
exports.createStringConst = createStringConst;
function createVarString(name, value) {
    return "var " + name + " = " + JSON.stringify(value) + ";";
}
exports.createVarString = createVarString;
function ensurePublicExtension(url) {
    var ext = path.extname(url);
    if (ext === '.ts') {
        url = replaceExt(url, '.js');
    }
    if (ext === '.tsx') {
        url = replaceExt(url, '.jsx');
    }
    return url;
}
exports.ensurePublicExtension = ensurePublicExtension;
function parseVersion(version) {
    var re = /v?(\d+)/g;
    var matcher;
    var versions = [];
    while ((matcher = re.exec(version))) {
        versions.push(parseInt(matcher[1]));
    }
    return versions;
}
exports.parseVersion = parseVersion;
function replaceExt(npath, ext) {
    if (!npath) {
        return npath;
    }
    if (/\.[a-z0-9]+$/i.test(npath)) {
        return npath.replace(/\.[a-z0-9]+$/i, ext);
    }
    else {
        return npath + ext;
    }
}
exports.replaceExt = replaceExt;
function extractFuseBoxPath(homeDir, targetPath) {
    homeDir = ensureFuseBoxPath(homeDir);
    targetPath = ensureFuseBoxPath(targetPath);
    var result = targetPath.replace(homeDir, '');
    if (result[0] === '/') {
        result = result.slice(1);
    }
    return result;
}
exports.extractFuseBoxPath = extractFuseBoxPath;
exports.fileExists = fs.existsSync;
function readFile(file) {
    return fs.readFileSync(file).toString();
}
exports.readFile = readFile;
function readFileAsBuffer(file) {
    return fs.readFileSync(file);
}
exports.readFileAsBuffer = readFileAsBuffer;
function removeFile(file) {
    return fs.unlinkSync(file);
}
exports.removeFile = removeFile;
function copyFile(file, target) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, fsExtra.copy(file, target)];
        });
    });
}
exports.copyFile = copyFile;
function isObject(obj) {
    return typeof obj === 'object';
}
exports.isObject = isObject;
function pathJoin() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return path.join.apply(path, args);
}
exports.pathJoin = pathJoin;
function getExtension(file) {
    return path.extname(file);
}
exports.getExtension = getExtension;
function ensureDir(dir) {
    fsExtra.ensureDirSync(dir);
    return dir;
}
exports.ensureDir = ensureDir;
function fileStat(file) {
    return fs.statSync(file);
}
exports.fileStat = fileStat;
function makeFuseBoxPath(homeDir, absPath) {
    return homeDir && ensurePublicExtension(extractFuseBoxPath(homeDir, absPath));
}
exports.makeFuseBoxPath = makeFuseBoxPath;
function measureTime(group) {
    var startTime = process.hrtime();
    return {
        end: function () {
            return prettyTime(process.hrtime(startTime));
        }
    };
}
exports.measureTime = measureTime;
function cleanExistingSourceMappingURL(contents) {
    return contents.replace(/\/*#\s*sourceMappingURL=\s*([^\s]+)\s*\*\//, '');
}
exports.cleanExistingSourceMappingURL = cleanExistingSourceMappingURL;
function findReplace(str, re, fn) {
    return str.replace(re, function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return fn(args);
    });
}
exports.findReplace = findReplace;
function path2RegexPattern(input) {
    if (!input) {
        return;
    }
    if (typeof input === 'string') {
        var r = '';
        for (var i = 0; i < input.length; i++) {
            switch (input[i]) {
                case '.':
                    r += '\\.';
                    break;
                case '/':
                    r += '(\\/|\\\\)';
                    break;
                case '\\': // window paths
                    r += '(\\/|\\\\)';
                    break;
                case '*':
                    r += '.*';
                    break;
                default:
                    r += input[i];
            }
        }
        return new RegExp(r);
    }
    return input;
}
exports.path2RegexPattern = path2RegexPattern;
function ensureUserPath(userPath, root) {
    if (!path.isAbsolute(userPath)) {
        userPath = path.join(root, userPath);
    }
    userPath = path.normalize(userPath);
    var dir = path.dirname(userPath);
    fsExtra.ensureDirSync(dir);
    return userPath;
}
exports.ensureUserPath = ensureUserPath;
exports.Concat = require('fuse-concat-with-sourcemaps');
function createConcat(generateSourceMap, outputFileName, seperator) {
    return new exports.Concat(generateSourceMap, outputFileName, seperator);
}
exports.createConcat = createConcat;
function ensureAbsolutePath(userPath, root) {
    if (!path.isAbsolute(userPath)) {
        return path.join(root, userPath);
    }
    return userPath;
}
exports.ensureAbsolutePath = ensureAbsolutePath;
function getPathRelativeToConfig(props) {
    var target = props.fileName ? path.dirname(props.fileName) : props.dirName;
    var fileName = props.fileName && path.basename(props.fileName);
    if (!path.isAbsolute(target)) {
        target = path.join(env_1.env.SCRIPT_PATH, target);
    }
    if (props.ensureDirExist) {
        var baseDir = path.dirname(target);
        ensureDir(baseDir);
    }
    return fileName ? path.join(target, fileName) : target;
}
exports.getPathRelativeToConfig = getPathRelativeToConfig;
function ensureFuseBoxPath(input) {
    return input.replace(/\\/g, '/').replace(/\/$/, '');
}
exports.ensureFuseBoxPath = ensureFuseBoxPath;
function joinFuseBoxPath() {
    var any = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        any[_i] = arguments[_i];
    }
    var includesProtocol = any[0].includes('://');
    var joinedPath = !includesProtocol
        ? path.join.apply(path, any) : any[0].replace(/([^/])$/, '$1/') + path.join.apply(path, any.slice(1));
    return ensureFuseBoxPath(joinedPath);
}
exports.joinFuseBoxPath = joinFuseBoxPath;
function writeFile(name, contents) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    ensureDir(path.dirname(name));
                    fs.writeFile(name, contents, function (err) {
                        if (err)
                            return reject(err);
                        return resolve();
                    });
                })];
        });
    });
}
exports.writeFile = writeFile;
function fastHash(text) {
    var hash = 0;
    if (text.length == 0)
        return '';
    for (var i = 0; i < text.length; i++) {
        var char = text.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    var result = hash.toString(16).toString();
    if (result.charAt(0) === '-') {
        result = result.replace(/-/, '0');
    }
    return result;
}
exports.fastHash = fastHash;
