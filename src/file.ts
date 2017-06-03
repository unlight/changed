import { inject } from '@epam/inject';
import { dbFileName } from './utils';
import fs = require('fs');

declare type Result = {
    result: boolean;
    update: () => void;
};

function fileMtime(targetFile: string) {
    return fs.statSync(targetFile).mtime.getTime();
}

export function file(targetFile: string, dbFile?: string): Result {
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
