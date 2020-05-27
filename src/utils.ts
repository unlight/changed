import fs from 'fs';
import os from 'os';
import { dirname } from 'path';
import mkdirp from 'mkdirp';
const filenamify = require('filenamify');

type DatabaseFileNameArguments = {
    targetFile: string;
    tmpdir?: typeof os.tmpdir;
};

export function databaseFileName(databaseFileNameArguments: DatabaseFileNameArguments) {
    const { targetFile, tmpdir = os.tmpdir } = databaseFileNameArguments;
    return `${tmpdir()}/${encodeURI(filenamify(targetFile))}`;
}

export function saveFile(targetFile: string, data: string) {
    const directory = dirname(targetFile);
    mkdirp.sync(directory);
    fs.writeFileSync(targetFile, data);
}
