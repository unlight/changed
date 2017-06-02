"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
var inject_1 = require("@epam/inject");
var _1 = require("./");
it('file smoke test', function () {
    assert(_1.file);
});
beforeEach(function () {
    inject_1.injector.mock('existsSync', function () { throw 'existsSync not mocked'; });
    inject_1.injector.mock('statSync', function () { throw 'statSync not mocked'; });
    inject_1.injector.mock('writeFileSync', function () { throw 'writeFileSync not mocked'; });
    inject_1.injector.mock('readFileSync', function () { throw 'readFileSync not mocked'; });
});
it('if target file do not exists throw error', function () {
    inject_1.injector.mock('existsSync', function () { return function () { return false; }; });
    assert.throws(function () {
        _1.file('');
    });
});
it('if db file do not exists result should be true', function () {
    inject_1.injector.mock('statSync', function () { return function () { return new Date(); }; });
    inject_1.injector.mock('existsSync', function () { return function (file) {
        if (file === 'db')
            return false;
        return true;
    }; });
    var _a = _1.file('foo', 'db'), result = _a.result, update = _a.update;
    assert(result);
});
