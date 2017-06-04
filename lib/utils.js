"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inject_1 = require("@epam/inject");
var fs = require("fs");
var os = require("os");
var path_1 = require("path");
var filenamify = require('filenamify');
var mkdirp = require("mkdirp");
function dbFileName(targetFile) {
    var tmpdir = inject_1.inject('tmpdir', function () { return os.tmpdir; });
    return tmpdir() + "/" + encodeURI(filenamify(targetFile));
}
exports.dbFileName = dbFileName;
function saveFile(targetFile, data) {
    var dir = path_1.dirname(targetFile);
    mkdirp.sync(dir);
    fs.writeFileSync(targetFile, data);
}
exports.saveFile = saveFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FBc0M7QUFDdEMsdUJBQTBCO0FBQzFCLHVCQUEwQjtBQUMxQiw2QkFBK0I7QUFDL0IsSUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ3pDLCtCQUFrQztBQUVsQyxvQkFBMkIsVUFBa0I7SUFDekMsSUFBTSxNQUFNLEdBQUcsZUFBTSxDQUFDLFFBQVEsRUFBRSxjQUFNLE9BQUEsRUFBRSxDQUFDLE1BQU0sRUFBVCxDQUFTLENBQUMsQ0FBQztJQUNqRCxNQUFNLENBQUksTUFBTSxFQUFFLFNBQUksU0FBUyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBRyxDQUFDO0FBQzlELENBQUM7QUFIRCxnQ0FHQztBQUVELGtCQUF5QixVQUFrQixFQUFFLElBQVk7SUFDckQsSUFBTSxHQUFHLEdBQUcsY0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2hDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDakIsRUFBRSxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDdkMsQ0FBQztBQUpELDRCQUlDIn0=