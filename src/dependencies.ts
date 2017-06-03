import { inject } from '@epam/inject';
import { tmpdir as osTmpdir } from 'os';
import { dbFileName } from './utils';
import fs = require('fs');
import { resolve } from 'path';
const readPkg = require('read-pkg');
const objectDiff = require('object-diff');

declare type Dict = { [name: string]: string };

declare type Result = {
    result: boolean;
    update: () => void;
    initial: boolean;
    diff: Dict | null;
};

function dependenciesData(cwd?: string): Dict {
    const pkg = readPkg.sync(cwd);
    return pkg.dependencies;
}

function dbDependenciesData(dbFile: string) {
    return JSON.parse(fs.readFileSync(dbFile, 'utf8'));
}

export function dependencies(dbFile?: string, cwd?: string): Result {
    const data = inject('dependenciesData', () => dependenciesData)(cwd);
    if (!dbFile) {
        dbFile = dbFileName(resolve('pkg.dependencies.json'));
    }
    const existsSync = inject('existsSync', () => fs.existsSync);
    const update = () => {
        const writeFileSync = inject('writeFileSync', () => fs.writeFileSync);
        writeFileSync(dbFile, data);
    };
    if (!existsSync(dbFile)) {
        return { result: true, update, initial: true, diff: null };
    }
    const dbData = inject('dbDependenciesData', () => dbDependenciesData)(dbFile);
    const diff = objectDiff(dbData, data);
    let result = Object.keys(diff).length > 0;
    return { result, update, diff, initial: false };
}
