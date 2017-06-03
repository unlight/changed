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
        assert(result === true, 'initial expected to be true');
        assert.deepEqual(diff, { b: '2' }, 'diff must contain b:2');
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwZW5kZW5jaWVzLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvZGVwZW5kZW5jaWVzLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLCtCQUFrQztBQUNsQyx1Q0FBZ0Q7QUFDaEQsdUJBQWtDO0FBRWxDLFFBQVEsQ0FBQyxjQUFjLEVBQUU7SUFFckIsRUFBRSxDQUFDLE9BQU8sRUFBRTtRQUNSLE1BQU0sQ0FBQyxlQUFZLENBQUMsQ0FBQztJQUN6QixDQUFDLENBQUMsQ0FBQztJQUVILFVBQVUsQ0FBQztRQUNQLGlCQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDakIsaUJBQVEsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsY0FBUSxNQUFNLDZCQUE2QixDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakYsaUJBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLGNBQVEsTUFBTSx1QkFBdUIsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JFLGlCQUFRLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLGNBQVEsTUFBTSwrQkFBK0IsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3pGLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLG9DQUFvQyxFQUFFO1FBQ3JDLElBQUksV0FBVyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQzdCLGlCQUFRLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLGNBQU0sT0FBQSxjQUFNLE9BQUEsV0FBVyxFQUFYLENBQVcsRUFBakIsQ0FBaUIsQ0FBQyxDQUFDO1FBQzNELGlCQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxjQUFNLE9BQUEsY0FBTSxPQUFBLEtBQUssRUFBTCxDQUFLLEVBQVgsQ0FBVyxDQUFDLENBQUM7UUFDekMsSUFBQSwwQkFBZ0QsRUFBOUMsa0JBQU0sRUFBRSxrQkFBTSxFQUFFLG9CQUFPLENBQXdCO1FBQ3ZELE1BQU0sQ0FBQyxNQUFNLEtBQUssSUFBSSxFQUFFLHFCQUFxQixDQUFDLENBQUM7UUFDL0MsTUFBTSxDQUFDLE9BQU8sS0FBSyxJQUFJLEVBQUUsc0JBQXNCLENBQUMsQ0FBQztJQUNyRCxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQywrQkFBK0IsRUFBRTtRQUNoQyxJQUFJLFdBQVcsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUM3QixpQkFBUSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxjQUFNLE9BQUEsY0FBTSxPQUFBLGNBQU0sV0FBVyxFQUFHLEVBQXBCLENBQW9CLEVBQTFCLENBQTBCLENBQUMsQ0FBQztRQUNwRSxpQkFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsY0FBTSxPQUFBLGNBQU0sT0FBQSxJQUFJLEVBQUosQ0FBSSxFQUFWLENBQVUsQ0FBQyxDQUFDO1FBQzlDLGlCQUFRLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLGNBQU0sT0FBQSxjQUFNLE9BQUEsY0FBTSxXQUFXLEVBQUcsRUFBcEIsQ0FBb0IsRUFBMUIsQ0FBMEIsQ0FBQyxDQUFDO1FBQ2hFLElBQUEsMEJBQWdELEVBQTlDLGtCQUFNLEVBQUUsa0JBQU0sRUFBRSxvQkFBTyxDQUF3QjtRQUN2RCxNQUFNLENBQUMsTUFBTSxLQUFLLEtBQUssRUFBRSxzQkFBc0IsQ0FBQyxDQUFDO1FBQ2pELE1BQU0sQ0FBQyxPQUFPLEtBQUssSUFBSSxFQUFFLDBCQUEwQixDQUFDLENBQUM7SUFDekQsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsb0RBQW9ELEVBQUU7UUFDckQsSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDN0IsaUJBQVEsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsY0FBTSxPQUFBLGNBQU0sT0FBQSxjQUFNLFdBQVcsSUFBRSxDQUFDLEVBQUUsR0FBRyxJQUFHLEVBQTVCLENBQTRCLEVBQWxDLENBQWtDLENBQUMsQ0FBQztRQUM1RSxpQkFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsY0FBTSxPQUFBLGNBQU0sT0FBQSxJQUFJLEVBQUosQ0FBSSxFQUFWLENBQVUsQ0FBQyxDQUFDO1FBQzlDLGlCQUFRLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLGNBQU0sT0FBQSxjQUFNLE9BQUEsY0FBTSxXQUFXLEVBQUcsRUFBcEIsQ0FBb0IsRUFBMUIsQ0FBMEIsQ0FBQyxDQUFDO1FBQ2hFLElBQUEsMEJBQXNELEVBQXBELGtCQUFNLEVBQUUsa0JBQU0sRUFBRSxvQkFBTyxFQUFFLGNBQUksQ0FBd0I7UUFDN0QsTUFBTSxDQUFDLE9BQU8sS0FBSyxJQUFJLEVBQUUsaUNBQWlDLENBQUMsQ0FBQztRQUM1RCxNQUFNLENBQUMsTUFBTSxLQUFLLElBQUksRUFBRSw2QkFBNkIsQ0FBQyxDQUFDO1FBQ3ZELE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFLHVCQUF1QixDQUFDLENBQUM7SUFDaEUsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyJ9