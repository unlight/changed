import { inject } from '@epam/inject';
import fs = require('fs');
import os = require('os');
import { dirname } from 'path';
const filenamify = require('filenamify');
import mkdirp = require('mkdirp');

export function dbFileName(targetFile: string) {
    const tmpdir = inject('tmpdir', () => os.tmpdir);
    return `${tmpdir()}/${encodeURI(filenamify(targetFile))}`;
}

export function saveFile(targetFile: string, data: string) {
    const dir = dirname(targetFile);
    mkdirp.sync(dir);
    fs.writeFileSync(targetFile, data);
}
