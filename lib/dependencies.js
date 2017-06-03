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
var inject_1 = require("@epam/inject");
var utils_1 = require("./utils");
var fs = require("fs");
var path_1 = require("path");
var readPkg = require('read-pkg');
var objectDiff = require('object-diff');
function dependenciesData(cwd) {
    try {
        var pkg = readPkg.sync(cwd);
    }
    catch (err) {
        return null;
    }
    return pkg.dependencies;
}
function dbDependenciesData(dbFile) {
    return JSON.parse(fs.readFileSync(dbFile, 'utf8'));
}
function dependencies(dbFile, cwd) {
    var data = inject_1.inject('dependenciesData', function () { return dependenciesData; })(cwd);
    if (!dbFile) {
        dbFile = utils_1.dbFileName(path_1.resolve('pkg.dependencies.json'));
    }
    // if (data)
    var existsSync = inject_1.inject('existsSync', function () { return fs.existsSync; });
    var update = function () {
        var writeFileSync = inject_1.inject('writeFileSync', function () { return fs.writeFileSync; });
        writeFileSync(dbFile, JSON.stringify(data, null, 2));
    };
    if (!existsSync(dbFile)) {
        return { result: true, update: update, initial: true, diff: null };
    }
    var dbData = inject_1.inject('dbDependenciesData', function () { return dbDependenciesData; })(dbFile);
    var partialResult = { diff: null, result: true, initial: true };
    if (dbData && typeof dbData === 'object') {
        var diff = objectDiff(dbData, data);
        var result = Object.keys(diff).length > 0;
        partialResult = { diff: diff, result: result, initial: false };
    }
    return __assign({}, partialResult, { update: update });
}
exports.dependencies = dependencies;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwZW5kZW5jaWVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2RlcGVuZGVuY2llcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsdUNBQXNDO0FBRXRDLGlDQUFxQztBQUNyQyx1QkFBMEI7QUFDMUIsNkJBQStCO0FBQy9CLElBQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUNwQyxJQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFXMUMsMEJBQTBCLEdBQVk7SUFDbEMsSUFBSSxDQUFDO1FBQ0QsSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNYLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUNELE1BQU0sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDO0FBQzVCLENBQUM7QUFFRCw0QkFBNEIsTUFBYztJQUN0QyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO0FBQ3ZELENBQUM7QUFFRCxzQkFBNkIsTUFBZSxFQUFFLEdBQVk7SUFDdEQsSUFBTSxJQUFJLEdBQUcsZUFBTSxDQUFDLGtCQUFrQixFQUFFLGNBQU0sT0FBQSxnQkFBZ0IsRUFBaEIsQ0FBZ0IsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3JFLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNWLE1BQU0sR0FBRyxrQkFBVSxDQUFDLGNBQU8sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUNELFlBQVk7SUFDWixJQUFNLFVBQVUsR0FBRyxlQUFNLENBQUMsWUFBWSxFQUFFLGNBQU0sT0FBQSxFQUFFLENBQUMsVUFBVSxFQUFiLENBQWEsQ0FBQyxDQUFDO0lBQzdELElBQU0sTUFBTSxHQUFHO1FBQ1gsSUFBTSxhQUFhLEdBQUcsZUFBTSxDQUFDLGVBQWUsRUFBRSxjQUFNLE9BQUEsRUFBRSxDQUFDLGFBQWEsRUFBaEIsQ0FBZ0IsQ0FBQyxDQUFDO1FBQ3RFLGFBQWEsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekQsQ0FBQyxDQUFDO0lBQ0YsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLE1BQU0sQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxRQUFBLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUM7SUFDL0QsQ0FBQztJQUNELElBQU0sTUFBTSxHQUFHLGVBQU0sQ0FBQyxvQkFBb0IsRUFBRSxjQUFNLE9BQUEsa0JBQWtCLEVBQWxCLENBQWtCLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM5RSxJQUFJLGFBQWEsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7SUFDaEUsRUFBRSxDQUFDLENBQUMsTUFBTSxJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDdkMsSUFBTSxJQUFJLEdBQUcsVUFBVSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN0QyxJQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDNUMsYUFBYSxHQUFHLEVBQUUsSUFBSSxNQUFBLEVBQUUsTUFBTSxRQUFBLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDO0lBQ3JELENBQUM7SUFDRCxNQUFNLGNBQU0sYUFBYSxJQUFFLE1BQU0sUUFBQSxJQUFHO0FBQ3hDLENBQUM7QUF0QkQsb0NBc0JDIn0=