"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
var inject_1 = require("@epam/inject");
var _1 = require("./");
describe('dependencies', function () {
    it('smoke', function () {
        assert(_1.dependencies);
    });
    beforeEach(function () {
        inject_1.injector.clear();
        inject_1.injector.mock('dependenciesData', function () { throw 'dependenciesData not mocked'; });
        inject_1.injector.mock('existsSync', function () { throw 'existsSync not mocked'; });
        inject_1.injector.mock('dbDependenciesData', function () { throw 'dbDependenciesData not mocked'; });
    });
    it('initial case when db is not exists', function () {
        var packageDeps = { a: '1' };
        inject_1.injector.mock('dependenciesData', function () { return function () { return packageDeps; }; });
        inject_1.injector.mock('existsSync', function () { return function () { return false; }; });
        var _a = _1.dependencies('db'), result = _a.result, update = _a.update, initial = _a.initial;
        assert(result === true, 'result must be true');
        assert(initial === true, 'initial must be true');
    });
    it('when db exists but no changes', function () {
        var packageDeps = { a: '1' };
        inject_1.injector.mock('dependenciesData', function () { return function () { return (__assign({}, packageDeps)); }; });
        inject_1.injector.mock('existsSync', function () { return function () { return true; }; });
        inject_1.injector.mock('dbDependenciesData', function () { return function () { return (__assign({}, packageDeps)); }; });
        var _a = _1.dependencies('db'), result = _a.result, update = _a.update, initial = _a.initial;
        assert(result === false, 'result must be false');
        assert(initial !== true, 'initial must be not true');
    });
    it('when db exists and has changes in pkg dependencies', function () {
        var packageDeps = { a: '1' };
        inject_1.injector.mock('dependenciesData', function () { return function () { return (__assign({}, packageDeps, { b: '2' })); }; });
        inject_1.injector.mock('existsSync', function () { return function () { return true; }; });
        inject_1.injector.mock('dbDependenciesData', function () { return function () { return (__assign({}, packageDeps)); }; });
        var _a = _1.dependencies('db'), result = _a.result, update = _a.update, initial = _a.initial, diff = _a.diff;
        assert(initial !== true, 'initial expected to be not true');
        assert(result === true, 'result expected to be true');
        assert.deepEqual(diff, { b: { $set: '2' } }, 'diff must contain b:2');
    });
    it('update should write string data', function () {
        inject_1.injector.mock('dependenciesData', function () { return function () { return ({ a: '1' }); }; });
        inject_1.injector.mock('existsSync', function () { return function () { return false; }; });
        inject_1.injector.mock('saveFile', function () { return function (dbFile, data) {
            assert.equal(typeof data, 'string', 'data must be typeof string');
        }; });
        var _a = _1.dependencies('db'), result = _a.result, update = _a.update, initial = _a.initial;
        update();
    });
    it('if data dependencies fails', function () {
        inject_1.injector.mock('dependenciesData', function () { return function () { return ({ a: '1' }); }; });
        inject_1.injector.mock('dbDependenciesData', function () { return function () { return null; }; });
        inject_1.injector.mock('existsSync', function () { return function () { return true; }; });
        var _a = _1.dependencies('db'), result = _a.result, update = _a.update, initial = _a.initial;
        assert(initial === true, 'initial expected to be true');
        assert(result === true, 'result expected to be true');
    });
    it('if data dependencies removed', function () {
        inject_1.injector.mock('dependenciesData', function () { return function () { return ({ a: '1' }); }; });
        inject_1.injector.mock('dbDependenciesData', function () { return function () { return ({ a: '1', b: '2' }); }; });
        inject_1.injector.mock('existsSync', function () { return function () { return true; }; });
        var _a = _1.dependencies('db'), result = _a.result, update = _a.update, initial = _a.initial, diff = _a.diff;
        assert(initial === false, 'initial expected to be true');
        assert(result === true, 'result expected to be true');
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwZW5kZW5jaWVzLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvZGVwZW5kZW5jaWVzLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLCtCQUFrQztBQUNsQyx1Q0FBZ0Q7QUFDaEQsdUJBQWtDO0FBRWxDLFFBQVEsQ0FBQyxjQUFjLEVBQUU7SUFFckIsRUFBRSxDQUFDLE9BQU8sRUFBRTtRQUNSLE1BQU0sQ0FBQyxlQUFZLENBQUMsQ0FBQztJQUN6QixDQUFDLENBQUMsQ0FBQztJQUVILFVBQVUsQ0FBQztRQUNQLGlCQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDakIsaUJBQVEsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsY0FBUSxNQUFNLDZCQUE2QixDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakYsaUJBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLGNBQVEsTUFBTSx1QkFBdUIsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JFLGlCQUFRLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLGNBQVEsTUFBTSwrQkFBK0IsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3pGLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLG9DQUFvQyxFQUFFO1FBQ3JDLElBQUksV0FBVyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQzdCLGlCQUFRLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLGNBQU0sT0FBQSxjQUFNLE9BQUEsV0FBVyxFQUFYLENBQVcsRUFBakIsQ0FBaUIsQ0FBQyxDQUFDO1FBQzNELGlCQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxjQUFNLE9BQUEsY0FBTSxPQUFBLEtBQUssRUFBTCxDQUFLLEVBQVgsQ0FBVyxDQUFDLENBQUM7UUFDekMsSUFBQSwwQkFBZ0QsRUFBOUMsa0JBQU0sRUFBRSxrQkFBTSxFQUFFLG9CQUFP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