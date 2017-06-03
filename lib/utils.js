"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var os_1 = require("os");
var inject_1 = require("@epam/inject");
var filenamify = require('filenamify');
function dbFileName(targetFile) {
    var tmpdir = inject_1.inject('tmpdir', function () { return os_1.tmpdir; });
    return tmpdir() + "/" + encodeURI(filenamify(targetFile));
}
exports.dbFileName = dbFileName;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx5QkFBd0M7QUFDeEMsdUNBQXNDO0FBQ3RDLElBQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUV6QyxvQkFBMkIsVUFBa0I7SUFDekMsSUFBTSxNQUFNLEdBQUcsZUFBTSxDQUFrQixRQUFRLEVBQUUsY0FBTSxPQUFBLFdBQVEsRUFBUixDQUFRLENBQUMsQ0FBQztJQUNqRSxNQUFNLENBQUksTUFBTSxFQUFFLFNBQUksU0FBUyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBRyxDQUFDO0FBQzlELENBQUM7QUFIRCxnQ0FHQyJ9