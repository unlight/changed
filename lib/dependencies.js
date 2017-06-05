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
var differenceJson = require('difference-json');
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
        var diff = differenceJson(dbData, data);
        var result = Object.keys(diff).length > 0;
        partialResult = { diff: diff, result: result, initial: false };
    }
    return __assign({}, partialResult, { update: update });
}
exports.dependencies = dependencies;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwZW5kZW5jaWVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2RlcGVuZGVuY2llcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsdUNBQXNDO0FBRXRDLGlDQUErQztBQUMvQyx1QkFBMEI7QUFDMUIsNkJBQStCO0FBQy9CLElBQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUNwQyxJQUFNLGNBQWMsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQVdsRCwwQkFBMEIsR0FBWTtJQUNsQyxJQUFJLENBQUM7UUFDRCxJQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ1gsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBQ0QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUM7QUFDNUIsQ0FBQztBQUVELDRCQUE0QixNQUFjO0lBQ3RDLElBQUksQ0FBQztRQUNELElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNYLE1BQU0sR0FBRyxJQUFJLENBQUM7SUFDbEIsQ0FBQztJQUNELE1BQU0sQ0FBQyxNQUFNLENBQUM7QUFDbEIsQ0FBQztBQUVELHNCQUE2QixNQUFlLEVBQUUsR0FBWTtJQUN0RCxJQUFNLElBQUksR0FBRyxlQUFNLENBQUMsa0JBQWtCLEVBQUUsY0FBTSxPQUFBLGdCQUFnQixFQUFoQixDQUFnQixDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDckUsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ1YsTUFBTSxHQUFHLGtCQUFVLENBQUMsY0FBTyxDQUFDLHVCQUF1QixDQUFDLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBQ0QsSUFBTSxVQUFVLEdBQUcsZUFBTSxDQUFDLFlBQVksRUFBRSxjQUFNLE9BQUEsRUFBRSxDQUFDLFVBQVUsRUFBYixDQUFhLENBQUMsQ0FBQztJQUM3RCxJQUFNLE1BQU0sR0FBRztRQUNYLGVBQU0sQ0FBQyxVQUFVLEVBQUUsY0FBTSxPQUFBLGdCQUFRLEVBQVIsQ0FBUSxDQUFDLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzlFLENBQUMsQ0FBQztJQUNGLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0QixNQUFNLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sUUFBQSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDO0lBQy9ELENBQUM7SUFDRCxJQUFNLE1BQU0sR0FBRyxlQUFNLENBQUMsb0JBQW9CLEVBQUUsY0FBTSxPQUFBLGtCQUFrQixFQUFsQixDQUFrQixDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDOUUsSUFBSSxhQUFhLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDO0lBQ2hFLEVBQUUsQ0FBQyxDQUFDLE1BQU0sSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLElBQU0sSUFBSSxHQUFHLGNBQWMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDMUMsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQzFDLGFBQWEsR0FBRyxFQUFFLElBQUksTUFBQSxFQUFFLE1BQU0sUUFBQSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQztJQUNyRCxDQUFDO0lBQ0QsTUFBTSxjQUFNLGFBQWEsSUFBRSxNQUFNLFFBQUEsSUFBRztBQUN4QyxDQUFDO0FBcEJELG9DQW9CQyJ9