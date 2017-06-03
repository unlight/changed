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
        var writeFileSync = inject_1.inject('writeFileSync', function () { return fs.writeFileSync; });
        var mtime = inject_1.inject('fileMtime', function () { return fileMtime; })(targetFile);
        writeFileSync(dbFile, mtime);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9maWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUNBQXNDO0FBQ3RDLGlDQUFxQztBQUNyQyx1QkFBMEI7QUFPMUIsbUJBQW1CLFVBQWtCO0lBQ2pDLE1BQU0sQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUNuRCxDQUFDO0FBRUQsY0FBcUIsVUFBa0IsRUFBRSxNQUFlO0lBQ3BELElBQU0sVUFBVSxHQUFHLGVBQU0sQ0FBdUIsWUFBWSxFQUFFLGNBQU0sT0FBQSxFQUFFLENBQUMsVUFBVSxFQUFiLENBQWEsQ0FBQyxDQUFDO0lBQ25GLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLElBQUksVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFDLE1BQU0sSUFBSSxTQUFTLENBQUMsaUNBQStCLFVBQVksQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDVixNQUFNLEdBQUcsa0JBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBQ0QsSUFBTSxNQUFNLEdBQUc7UUFDWCxJQUFNLGFBQWEsR0FBRyxlQUFNLENBQTBCLGVBQWUsRUFBRSxjQUFNLE9BQUEsRUFBRSxDQUFDLGFBQWEsRUFBaEIsQ0FBZ0IsQ0FBQyxDQUFDO1FBQy9GLElBQU0sS0FBSyxHQUFHLGVBQU0sQ0FBQyxXQUFXLEVBQUUsY0FBTSxPQUFBLFNBQVMsRUFBVCxDQUFTLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMvRCxhQUFhLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2pDLENBQUMsQ0FBQztJQUNGLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0QixNQUFNLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sUUFBQSxFQUFFLENBQUM7SUFDcEMsQ0FBQztJQUNELElBQU0sS0FBSyxHQUFHLGVBQU0sQ0FBQyxXQUFXLEVBQUUsY0FBTSxPQUFBLFNBQVMsRUFBVCxDQUFTLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUMvRCxJQUFNLFlBQVksR0FBRyxlQUFNLENBQXlCLGNBQWMsRUFBRSxjQUFNLE9BQUEsRUFBRSxDQUFDLFlBQVksRUFBZixDQUFlLENBQUMsQ0FBQztJQUMzRixJQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ3ZELEVBQUUsQ0FBQyxDQUFDLFNBQVMsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLE1BQU0sQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxRQUFBLEVBQUUsQ0FBQztJQUNwQyxDQUFDO0lBQ0QsTUFBTSxDQUFDLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsY0FBUSxDQUFDLEVBQUUsQ0FBQztBQUNoRCxDQUFDO0FBdkJELG9CQXVCQyJ9