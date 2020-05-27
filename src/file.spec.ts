/* tslint:disable:insecure-random no-identical-functions no-any */
import { file } from './file';

it('if db file do not exists result should be true', () => {
    const existsSync = (file) => {
        if (file === 'db') {
            return false;
        }
        return true;
    };
    const { result } = file({
        targetFile: 'foo',
        databaseFile: 'db',
        existsSync,
    });
    expect(result).toBeTruthy();
});

it('filemtime same result should be false', () => {
    const existsSync = () => true;
    const fileMtime = (file) => {
        if (file === 'target') {
            return 100;
        }
        return Math.random();
    };
    const readFileSync = (file): any => {
        if (file === 'db') {
            return '100';
        }
        return Math.random();
    };
    const { result } = file({
        targetFile: 'target',
        databaseFile: 'db',
        existsSync,
        fileMtime,
        readFileSync,
    });
    expect(result).toBe(false);
});

it('filemtime is different result should be true', () => {
    const existsSync = () => true;
    const fileMtime = (file): any => {
        if (file === 'target') {
            return 100;
        }
        return { mtime: { getTime: () => Math.random() } };
    };
    const readFileSync = (file): any => {
        if (file === 'db') {
            return '200';
        }
        return Math.random();
    };
    const { result } = file({
        targetFile: 'target',
        databaseFile: 'db',
        existsSync,
        fileMtime,
        readFileSync,
    });
    expect(result).toBe(true);
});
