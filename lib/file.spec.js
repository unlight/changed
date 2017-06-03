"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
var inject_1 = require("@epam/inject");
var _1 = require("./");
describe('file', function () {
    it('file smoke test', function () {
        assert(_1.file);
    });
    beforeEach(function () {
        inject_1.injector.clear();
        inject_1.injector.mock('existsSync', function () { throw 'existsSync not mocked'; });
        inject_1.injector.mock('statSync', function () { throw 'statSync not mocked'; });
        inject_1.injector.mock('writeFileSync', function () { throw 'writeFileSync not mocked'; });
        inject_1.injector.mock('readFileSync', function () { throw 'readFileSync not mocked'; });
        inject_1.injector.mock('fileMtime', function () { throw 'fileMtime not mocked'; });
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
    it('filemtime same result should be false', function () {
        inject_1.injector.mock('existsSync', function () { return function () { return true; }; });
        inject_1.injector.mock('fileMtime', function () { return function (file) {
            if (file === 'target')
                return 100;
            return Math.random();
        }; });
        inject_1.injector.mock('readFileSync', function () { return function (file) {
            if (file === 'db')
                return '100';
            return Math.random();
        }; });
        var _a = _1.file('target', 'db'), result = _a.result, update = _a.update;
        assert(result === false);
    });
    it('filemtime is different result should be true', function () {
        inject_1.injector.mock('existsSync', function () { return function () { return true; }; });
        inject_1.injector.mock('fileMtime', function () { return function (file) {
            if (file === 'target')
                return 100;
            return { mtime: { getTime: function () { return Math.random(); } } };
        }; });
        inject_1.injector.mock('readFileSync', function () { return function (file) {
            if (file === 'db')
                return '200';
            return Math.random();
        }; });
        var _a = _1.file('target', 'db'), result = _a.result, update = _a.update;
        assert(result === true);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2ZpbGUuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtCQUFrQztBQUNsQyx1Q0FBZ0Q7QUFDaEQsdUJBQTBCO0FBRTFCLFFBQVEsQ0FBQyxNQUFNLEVBQUU7SUFFYixFQUFFLENBQUMsaUJBQWlCLEVBQUU7UUFDbEIsTUFBTSxDQUFDLE9BQUksQ0FBQyxDQUFDO0lBQ2pCLENBQUMsQ0FBQyxDQUFDO0lBRUgsVUFBVSxDQUFDO1FBQ1AsaUJBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNqQixpQkFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsY0FBUSxNQUFNLHVCQUF1QixDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckUsaUJBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLGNBQVEsTUFBTSxxQkFBcUIsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pFLGlCQUFRLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxjQUFRLE1BQU0sMEJBQTBCLENBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzRSxpQkFBUSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsY0FBUSxNQUFNLHlCQUF5QixDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekUsaUJBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLGNBQVEsTUFBTSxzQkFBc0IsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3ZFLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLDBDQUEwQyxFQUFFO1FBQzNDLGlCQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxjQUFNLE9BQUEsY0FBTSxPQUFBLEtBQUssRUFBTCxDQUFLLEVBQVgsQ0FBVyxDQUFDLENBQUM7UUFDL0MsTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUNWLE9BQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNiLENBQUMs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