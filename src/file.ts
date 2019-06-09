import * as utils from './utils';
import fs = require('fs');

declare type Result = {
    result: boolean;
    update(): void;
};

function fsfileMtime(targetFile: string) {
    return fs.statSync(targetFile).mtime.getTime();
}

type FileArguments = {
    targetFile: string;
    databaseFile?: string;
    existsSync?: typeof fs.existsSync;
    fileMtime?: typeof fsfileMtime;
    saveFile?: typeof utils.saveFile;
    readFileSync?: typeof fs.readFileSync;
};

export function file(fileArguments: FileArguments): Result {
    const { targetFile } = fileArguments;
    const { databaseFile = utils.databaseFileName({ targetFile }),
        existsSync = fs.existsSync,
        fileMtime = fsfileMtime,
        saveFile = utils.saveFile,
        readFileSync = fs.readFileSync,
    } = fileArguments;
    if (!(targetFile && existsSync(targetFile))) {
        throw new TypeError(`Target file does not exists ${targetFile}`);
    }
    const update = () => {
        const mtime = fileMtime(targetFile);
        saveFile(databaseFile, String(mtime));
    };
    if (!existsSync(databaseFile)) {
        return { result: true, update };
    }
    const mtime = fileMtime(targetFile);
    const previousMtime = Number(readFileSync(databaseFile, 'utf8'));
    if (previousMtime !== mtime) {
        return { result: true, update };
    }
    return { result: false, update: Function };
}
