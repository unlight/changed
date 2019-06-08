import { inject } from 'njct';
import fs = require('fs');
import os = require('os');
import { dirname } from 'path';
const filenamify = require('filenamify');
import mkdirp = require('mkdirp');

export function databaseFileName(targetFile: string) {
    const tmpdir = inject('tmpdir', () => os.tmpdir);
    return `${tmpdir()}/${encodeURI(filenamify(targetFile))}`;
}

export function saveFile(targetFile: string, data: string) {
    const directory = dirname(targetFile);
    mkdirp.sync(directory);
    fs.writeFileSync(targetFile, data);
}
