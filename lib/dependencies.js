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
    try {
        var result = JSON.parse(fs.readFileSync(dbFile, 'utf8'));
    }
    catch (err) {
        result = null;
    }
    return result;
}
function dependencies(dbFile, cwd) {
    var data = inject_1.inject('dependenciesData', function () { return dependenciesData; })(cwd);
    if (!dbFile) {
        dbFile = utils_1.dbFileName(path_1.resolve('pkg.dependencies.json'));
    }
    var existsSync = inject_1.inject('existsSync', function () { return fs.existsSync; });
    var update = function () {
        inject_1.inject('saveFile', function () { return utils_1.saveFile; })(dbFile, JSON.stringify(data, null, 2));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwZW5kZW5jaWVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2RlcGVuZGVuY2llcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsdUNBQXNDO0FBRXRDLGlDQUErQztBQUMvQyx1QkFBMEI7QUFDMUIsNkJBQStCO0FBQy9CLElBQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUNwQyxJQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFXMUMsMEJBQTBCLEdBQVk7SUFDbEMsSUFBSSxDQUFDO1FBQ0QsSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNYLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUNELE1BQU0sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDO0FBQzVCLENBQUM7QUFFRCw0QkFBNEIsTUFBYztJQUN0QyxJQUFJLENBQUM7UUFDRCxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDWCxNQUFNLEdBQUcsSUFBSSxDQUFDO0lBQ2xCLENBQUM7SUFDRCxNQUFNLENBQUMsTUFBTSxDQUFDO0FBQ2xCLENBQUM7QUFFRCxzQkFBNkIsTUFBZSxFQUFFLEdBQVk7SUFDdEQsSUFBTSxJQUFJLEdBQUcsZUFBTSxDQUFDLGtCQUFrQixFQUFFLGNBQU0sT0FBQSxnQkFBZ0IsRUFBaEIsQ0FBZ0IsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3JFLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNWLE1BQU0sR0FBRyxrQkFBVSxDQUFDLGNBQU8sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUNELElBQU0sVUFBVSxHQUFHLGVBQU0sQ0FBQyxZQUFZLEVBQUUsY0FBTSxPQUFBLEVBQUUsQ0FBQyxVQUFVLEVBQWIsQ0FBYSxDQUFDLENBQUM7SUFDN0QsSUFBTSxNQUFNLEdBQUc7UUFDWCxlQUFNLENBQUMsVUFBVSxFQUFFLGNBQU0sT0FBQSxnQkFBUSxFQUFSLENBQVEsQ0FBQyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM5RSxDQUFDLENBQUM7SUFDRixFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEIsTUFBTSxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLFFBQUEsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQztJQUMvRCxDQUFDO0lBQ0QsSUFBTSxNQUFNLEdBQUcsZUFBTSxDQUFDLG9CQUFvQixFQUFFLGNBQU0sT0FBQSxrQkFBa0IsRUFBbEIsQ0FBa0IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzlFLElBQUksYUFBYSxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQztJQUNoRSxFQUFFLENBQUMsQ0FBQyxNQUFNLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztRQUN2QyxJQUFNLElBQUksR0FBRyxVQUFVLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3RDLElBQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUM1QyxhQUFhLEdBQUcsRUFBRSxJQUFJLE1BQUEsRUFBRSxNQUFNLFFBQUEsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUM7SUFDckQsQ0FBQztJQUNELE1BQU0sY0FBTSxhQUFhLElBQUUsTUFBTSxRQUFBLElBQUc7QUFDeEMsQ0FBQztBQXBCRCxvQ0FvQkMifQ==