import { inject } from 'njct';
import { dbFileName, saveFile } from './utils';
import fs = require('fs');
import { resolve } from 'path';
const readPkg = require('read-pkg');
const differenceJson = require('difference-json');

declare type Dict = { [name: string]: { $set: any, $was: any } };

declare type Result = {
    result: boolean;
    update: () => void;
    initial: boolean;
    diff: Dict | null;
};

function dependenciesData(cwd?: string): Dict | null {
    try {
        var pkg = readPkg.sync(cwd); // tslint:disable-line prefer-const
    } catch (error) {
        return null;
    }
    return pkg.dependencies;
}

function dbDependenciesData(dbFile: string) {
    try {
        var result = JSON.parse(fs.readFileSync(dbFile, 'utf8'));
    } catch (error) {
        result = null;
    }
    return result;
}

export function dependencies(dbFile?: string, cwd?: string): Result {
    const data = inject('dependenciesData', () => dependenciesData)(cwd);
    if (!dbFile) {
        dbFile = dbFileName(resolve('pkg.dependencies.json'));
    }
    const existsSync = inject('existsSync', () => fs.existsSync);
    const update = () => {
        const saveFileImpl = inject('saveFile', () => saveFile);
        saveFileImpl(dbFile!, JSON.stringify(data, null, 2));
    };
    if (!existsSync(dbFile)) {
        return { result: true, update, initial: true, diff: null };
    }
    const dbData = inject('dbDependenciesData', () => dbDependenciesData)(dbFile);
    let partialResult = { diff: null, result: true, initial: true };
    if (dbData && typeof dbData === 'object') {
        const diff = differenceJson(dbData, data);
        const result = Object.keys(diff).length > 0;
        partialResult = { diff, result, initial: false };
    }
    return { ...partialResult, update };
}
