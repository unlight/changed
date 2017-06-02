"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inject_1 = require("@epam/inject");
var fs_1 = require("fs");
var fs_2 = require("fs");
var fs_3 = require("fs");
var fs_4 = require("fs");
var os_1 = require("os");
function file(targetFile, dbFile) {
    var existsSync = inject_1.inject('existsSync', function () { return fs_1.existsSync; });
    if (!(targetFile && existsSync(targetFile))) {
        throw new TypeError("Target file does not exists " + targetFile);
    }
    if (!dbFile) {
        var tmpdir = inject_1.inject('tmpdir', function () { return os_1.tmpdir; });
        dbFile = tmpdir() + "/" + encodeURI(targetFile);
    }
    var update = function () {
        var statSync = inject_1.inject('statSync', function () { return fs_2.statSync; });
        var writeFileSync = inject_1.inject('writeFileSync', function () { return fs_3.writeFileSync; });
        var mtime = statSync(targetFile).mtime.getTime();
        writeFileSync(dbFile, mtime);
    };
    if (!existsSync(dbFile)) {
        return { result: true, update: update };
    }
    var statSync = inject_1.inject('statSync', function () { return fs_2.statSync; });
    var mtime = statSync(targetFile).mtime.getTime();
    var readFileSync = inject_1.inject('readFileSync', function () { return fs_4.readFileSync; });
    var prevMtime = Number(readFileSync(dbFile, 'utf8'));
    if (prevMtime !== mtime) {
        return { result: true, update: update };
    }
    return { result: false, update: function () { } };
}
exports.file = file;
