"use strict";
exports.__esModule = true;
var Validation;
(function (Validation) {
    var StringValidator = /** @class */ (function () {
        function StringValidator(name) {
            this.name = name;
        }
        return StringValidator;
    }());
    Validation.StringValidator = StringValidator;
})(Validation || (Validation = {}));
console.log(new Validation.StringValidator('hello'));
function hello(name) {
    return 1;
}
exports.hello = hello;
