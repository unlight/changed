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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2ZpbGUuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtCQUFrQztBQUNsQyx1Q0FBZ0Q7QUFDaEQsdUJBQTBCO0FBRTFCLFFBQVEsQ0FBQyxNQUFNLEVBQUU7SUFFYixFQUFFLENBQUMsaUJBQWlCLEVBQUU7UUFDbEIsTUFBTSxDQUFDLE9BQUksQ0FBQyxDQUFDO0lBQ2pCLENBQUMsQ0FBQyxDQUFDO0lBRUgsVUFBVSxDQUFDO1FBQ1AsaUJBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNqQixpQkFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsY0FBUSxNQUFNLHVCQUF1QixDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckUsaUJBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLGNBQVEsTUFBTSxxQkFBcUIsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pFLGlCQUFRLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxjQUFRLE1BQU0seUJBQXlCLENBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6RSxpQkFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsY0FBUSxNQUFNLHNCQUFzQixDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdkUsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsMENBQTBDLEVBQUU7UUFDM0MsaUJBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLGNBQU0sT0FBQSxjQUFNLE9BQUEsS0FBSyxFQUFMLENBQUssRUFBWCxDQUFXLENBQUMsQ0FBQztRQUMvQyxNQUFNLENBQUMsTUFBTSxDQUFDO1lBQ1YsT0FBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2IsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxnREFBZ0QsRUFBRTtRQUNqRCxpQkFBUSxDQUFDLElBQUks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