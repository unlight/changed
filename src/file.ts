import { inject } from '@epam/inject';
import { existsSync as fsExistsSync } from 'fs';
import { statSync as fsStatSync } from 'fs';
import { writeFileSync as fsWriteFileSync } from 'fs';
import { readFileSync as fsReadFileSync } from 'fs';
import { tmpdir as osTmpdir } from 'os';
import { basename } from 'path';

declare type FileResult = {
    result: boolean;
    update: () => void;
};

function dbFileName(targetFile: string) {
    const tmpdir = inject<typeof osTmpdir>('tmpdir', () => osTmpdir);
    return `${tmpdir()}/${encodeURI(targetFile)}`;
}

function getFileMtime(targetFile: string) {
    return fsStatSync(targetFile).mtime.getTime();
}

export function file(targetFile: string, dbFile?: string): FileResult {
    const existsSync = inject<typeof fsExistsSync>('existsSync', () => fsExistsSync);
    if (!(targetFile && existsSync(targetFile))) {
        throw new TypeError(`Target file does not exists ${targetFile}`);
    }
    if (!dbFile) {
        dbFile = dbFileName(targetFile);
    }
    const update = () => {
        const writeFileSync = inject<typeof fsWriteFileSync>('writeFileSync', () => fsWriteFileSync);
        const mtime = inject('getFileMtime', () => getFileMtime)(targetFile);
        writeFileSync(dbFile, mtime);
    };
    if (!existsSync(dbFile)) {
        return { result: true, update };
    }
    const mtime = inject('getFileMtime', () => getFileMtime)(targetFile);
    const readFileSync = inject<typeof fsReadFileSync>('readFileSync', () => fsReadFileSync);
    const prevMtime = Number(readFileSync(dbFile, 'utf8'));
    if (prevMtime !== mtime) {
        return { result: true, update };
    }
    return { result: false, update: () => { } };
}
