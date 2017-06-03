import { inject } from '@epam/inject';
import { tmpdir as osTmpdir } from 'os';
import { basename } from 'path';
import fs = require('fs');

declare type FileResult = {
    result: boolean;
    update: () => void;
};

function dbFileName(targetFile: string) {
    const tmpdir = inject<typeof osTmpdir>('tmpdir', () => osTmpdir);
    return `${tmpdir()}/${encodeURI(targetFile)}`;
}

function fileMtime(targetFile: string) {
    return fs.statSync(targetFile).mtime.getTime();
}

export function file(targetFile: string, dbFile?: string): FileResult {
    const existsSync = inject<typeof fs.existsSync>('existsSync', () => fs.existsSync);
    if (!(targetFile && existsSync(targetFile))) {
        throw new TypeError(`Target file does not exists ${targetFile}`);
    }
    if (!dbFile) {
        dbFile = dbFileName(targetFile);
    }
    const update = () => {
        const writeFileSync = inject<typeof fs.writeFileSync>('writeFileSync', () => fs.writeFileSync);
        const mtime = inject('fileMtime', () => fileMtime)(targetFile);
        writeFileSync(dbFile, mtime);
    };
    if (!existsSync(dbFile)) {
        return { result: true, update };
    }
    const mtime = inject('fileMtime', () => fileMtime)(targetFile);
    const readFileSync = inject<typeof fs.readFileSync>('readFileSync', () => fs.readFileSync);
    const prevMtime = Number(readFileSync(dbFile, 'utf8'));
    if (prevMtime !== mtime) {
        return { result: true, update };
    }
    return { result: false, update: () => { } };
}
