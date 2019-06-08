import { inject } from 'njct';
import { databaseFileName, saveFile } from './utils';
import fs = require('fs');
import { resolve } from 'path';
import { PlainObject } from 'simplytyped'; // tslint:disable-line:no-implicit-dependencies
const readPkg = require('read-pkg');
const differenceJson = require('difference-json');

declare type Dict = { [name: string]: { $set: any; $was: any } };  // tslint:disable-line no-any

declare type Result = {
    result: boolean;
    initial: boolean;
    diff?: Dict;
    update(): void;
};

function dependenciesData(cwd?: string): Dict | undefined {
    try {
        var json = readPkg.sync(cwd); // tslint:disable-line prefer-const
    } catch (error) {
        return undefined;
    }
    return json.dependencies;
}

function databaseDependenciesData(databaseFile: string): PlainObject | undefined {
    try {
        var result = JSON.parse(fs.readFileSync(databaseFile, 'utf8'));
    } catch (error) {
        result = undefined;
    }
    return result;
}

export function dependencies(databaseFile: string, cwd?: string): Result {
    const data = inject('dependenciesData', () => dependenciesData)(cwd);
    if (!databaseFile) {
        databaseFile = databaseFileName(resolve('pkg.dependencies.json'));
    }
    const existsSync = inject('existsSync', () => fs.existsSync);
    const update = () => {
        const saveFileImpl = inject('saveFile', () => saveFile);
        saveFileImpl(databaseFile, JSON.stringify(data, undefined, 2));
    };
    if (!existsSync(databaseFile)) {
        return { result: true, update, initial: true, diff: undefined };
    }
    const databaseData = inject('dbDependenciesData', () => databaseDependenciesData)(databaseFile);
    let partialResult = { diff: undefined, result: true, initial: true };
    if (databaseData && typeof databaseData === 'object') {
        const diff = differenceJson(databaseData, data);
        const result = Object.keys(diff).length > 0;
        partialResult = { diff, result, initial: false };
    }
    return { ...partialResult, update };
}
