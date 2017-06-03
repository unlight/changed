"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inject_1 = require("@epam/inject");
var utils_1 = require("./utils");
var fs = require("fs");
var path_1 = require("path");
var readPkg = require('read-pkg');
var objectDiff = require('object-diff');
function dependenciesData(cwd) {
    var pkg = readPkg.sync(cwd);
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
    var existsSync = inject_1.inject('existsSync', function () { return fs.existsSync; });
    var update = function () {
        var writeFileSync = inject_1.inject('writeFileSync', function () { return fs.writeFileSync; });
        writeFileSync(dbFile, JSON.stringify(data, null, 2));
    };
    if (!existsSync(dbFile)) {
        return { result: true, update: update, initial: true, diff: null };
    }
    var dbData = inject_1.inject('dbDependenciesData', function () { return dbDependenciesData; })(dbFile);
    var diff = objectDiff(dbData, data);
    var result = Object.keys(diff).length > 0;
    return { result: result, update: update, diff: diff, initial: false };
}
exports.dependencies = dependencies;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwZW5kZW5jaWVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2RlcGVuZGVuY2llcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVDQUFzQztBQUV0QyxpQ0FBcUM7QUFDckMsdUJBQTBCO0FBQzFCLDZCQUErQjtBQUMvQixJQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDcEMsSUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBVzFDLDBCQUEwQixHQUFZO0lBQ2xDLElBQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDOUIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUM7QUFDNUIsQ0FBQztBQUVELDRCQUE0QixNQUFjO0lBQ3RDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDdkQsQ0FBQztBQUVELHNCQUE2QixNQUFlLEVBQUUsR0FBWTtJQUN0RCxJQUFNLElBQUksR0FBRyxlQUFNLENBQUMsa0JBQWtCLEVBQUUsY0FBTSxPQUFBLGdCQUFnQixFQUFoQixDQUFnQixDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDckUsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ1YsTUFBTSxHQUFHLGtCQUFVLENBQUMsY0FBTyxDQUFDLHVCQUF1QixDQUFDLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBQ0QsSUFBTSxVQUFVLEdBQUcsZUFBTSxDQUFDLFlBQVksRUFBRSxjQUFNLE9BQUEsRUFBRSxDQUFDLFVBQVUsRUFBYixDQUFhLENBQUMsQ0FBQztJQUM3RCxJQUFNLE1BQU0sR0FBRztRQUNYLElBQU0sYUFBYSxHQUFHLGVBQU0sQ0FBQyxlQUFlLEVBQUUsY0FBTSxPQUFBLEVBQUUsQ0FBQyxhQUFhLEVBQWhCLENBQWdCLENBQUMsQ0FBQztRQUN0RSxhQUFhLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3pELENBQUMsQ0FBQztJQUNGLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0QixNQUFNLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sUUFBQSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDO0lBQy9ELENBQUM7SUFDRCxJQUFNLE1BQU0sR0FBRyxlQUFNLENBQUMsb0JBQW9CLEVBQUUsY0FBTSxPQUFBLGtCQUFrQixFQUFsQixDQUFrQixDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDOUUsSUFBTSxJQUFJLEdBQUcsVUFBVSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN0QyxJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDMUMsTUFBTSxDQUFDLEVBQUUsTUFBTSxRQUFBLEVBQUUsTUFBTSxRQUFBLEVBQUUsSUFBSSxNQUFBLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDO0FBQ3BELENBQUM7QUFqQkQsb0NBaUJDIn0=