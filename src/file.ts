import { inject } from 'njct';
import { databaseFileName, saveFile } from './utils';
import fs = require('fs');

declare type Result = {
    result: boolean;
    update(): void;
};

function fileMtime(targetFile: string) {
    return fs.statSync(targetFile).mtime.getTime();
}

export function file(targetFile: string, databaseFile: string = databaseFileName(targetFile)): Result {
    const existsSync = inject('existsSync', () => fs.existsSync);
    if (!(targetFile && existsSync(targetFile))) {
        throw new TypeError(`Target file does not exists ${targetFile}`);
    }
    const update = () => {
        const mtime = inject('fileMtime', () => fileMtime)(targetFile);
        const saveFileImpl = inject('saveFile', () => saveFile);
        saveFileImpl(databaseFile, String(mtime));
    };
    if (!existsSync(databaseFile)) {
        return { result: true, update };
    }
    const mtime = inject('fileMtime', () => fileMtime)(targetFile);
    const readFileSync = inject('readFileSync', () => fs.readFileSync);
    const previousMtime = Number(readFileSync(databaseFile, 'utf8'));
    if (previousMtime !== mtime) {
        return { result: true, update };
    }
    return { result: false, update: Function };
}
