"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inject_1 = require("@epam/inject");
var utils_1 = require("./utils");
var fs = require("fs");
function fileMtime(targetFile) {
    return fs.statSync(targetFile).mtime.getTime();
}
function file(targetFile, dbFile) {
    var existsSync = inject_1.inject('existsSync', function () { return fs.existsSync; });
    if (!(targetFile && existsSync(targetFile))) {
        throw new TypeError("Target file does not exists " + targetFile);
    }
    if (!dbFile) {
        dbFile = utils_1.dbFileName(targetFile);
    }
    var update = function () {
        var mtime = inject_1.inject('fileMtime', function () { return fileMtime; })(targetFile);
        inject_1.inject('saveFile', function () { return utils_1.saveFile; })(dbFile, String(mtime));
    };
    if (!existsSync(dbFile)) {
        return { result: true, update: update };
    }
    var mtime = inject_1.inject('fileMtime', function () { return fileMtime; })(targetFile);
    var readFileSync = inject_1.inject('readFileSync', function () { return fs.readFileSync; });
    var prevMtime = Number(readFileSync(dbFile, 'utf8'));
    if (prevMtime !== mtime) {
        return { result: true, update: update };
    }
    return { result: false, update: function () { } };
}
exports.file = file;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9maWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUNBQXNDO0FBQ3RDLGlDQUErQztBQUMvQyx1QkFBMEI7QUFPMUIsbUJBQW1CLFVBQWtCO0lBQ2pDLE1BQU0sQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUNuRCxDQUFDO0FBRUQsY0FBcUIsVUFBa0IsRUFBRSxNQUFlO0lBQ3BELElBQU0sVUFBVSxHQUFHLGVBQU0sQ0FBQyxZQUFZLEVBQUUsY0FBTSxPQUFBLEVBQUUsQ0FBQyxVQUFVLEVBQWIsQ0FBYSxDQUFDLENBQUM7SUFDN0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsSUFBSSxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUMsTUFBTSxJQUFJLFNBQVMsQ0FBQyxpQ0FBK0IsVUFBWSxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUNELEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNWLE1BQU0sR0FBRyxrQkFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFDRCxJQUFNLE1BQU0sR0FBRztRQUNYLElBQU0sS0FBSyxHQUFHLGVBQU0sQ0FBQyxXQUFXLEVBQUUsY0FBTSxPQUFBLFNBQVMsRUFBVCxDQUFTLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMvRCxlQUFNLENBQUMsVUFBVSxFQUFFLGNBQU0sT0FBQSxnQkFBUSxFQUFSLENBQVEsQ0FBQyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUM5RCxDQUFDLENBQUM7SUFDRixFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEIsTUFBTSxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLFFBQUEsRUFBRSxDQUFDO0lBQ3BDLENBQUM7SUFDRCxJQUFNLEtBQUssR0FBRyxlQUFNLENBQUMsV0FBVyxFQUFFLGNBQU0sT0FBQSxTQUFTLEVBQVQsQ0FBUyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDL0QsSUFBTSxZQUFZLEdBQUcsZUFBTSxDQUFDLGNBQWMsRUFBRSxjQUFNLE9BQUEsRUFBRSxDQUFDLFlBQVksRUFBZixDQUFlLENBQUMsQ0FBQztJQUNuRSxJQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ3ZELEVBQUUsQ0FBQyxDQUFDLFNBQVMsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLE1BQU0sQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxRQUFBLEVBQUUsQ0FBQztJQUNwQyxDQUFDO0lBQ0QsTUFBTSxDQUFDLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsY0FBUSxDQUFDLEVBQUUsQ0FBQztBQUNoRCxDQUFDO0FBdEJELG9CQXNCQyJ9