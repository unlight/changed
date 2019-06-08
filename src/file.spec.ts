/* tslint:disable:insecure-random no-identical-functions */
import { injector } from 'njct';
import { file } from './';

beforeEach(() => {
    injector.clear();
    injector.mock('existsSync', () => { throw new Error('existsSync not mocked'); });
    injector.mock('statSync', () => { throw new Error('statSync not mocked'); });
    injector.mock('readFileSync', () => { throw new Error('readFileSync not mocked'); });
    injector.mock('fileMtime', () => { throw new Error('fileMtime not mocked'); });
});

it('if target file do not exists throw error', () => {
    injector.mock('existsSync', () => () => false);
    expect(() => file('')).toThrow();
});

it('if db file do not exists result should be true', () => {
    injector.mock('statSync', () => () => new Date());
    injector.mock('existsSync', () => (file) => {
        if (file === 'db') {
            return false;
        }
        return true;
    });
    const { result } = file('foo', 'db');
    expect(result).toBeTruthy();
});

it('filemtime same result should be false', () => {
    injector.mock('existsSync', () => () => true);
    injector.mock('fileMtime', () => (file) => {
        if (file === 'target') {
            return 100;
        }
        return Math.random();
    });
    injector.mock('readFileSync', () => (file) => {
        if (file === 'db') {
            return '100';
        }
        return Math.random();
    });
    const { result } = file('target', 'db');
    expect(result).toBe(false);
});

it('filemtime is different result should be true', () => {
    injector.mock('existsSync', () => () => true);
    injector.mock('fileMtime', () => (file) => {
        if (file === 'target') {
            return 100;
        }
        return { mtime: { getTime: () => Math.random() } };
    });
    injector.mock('readFileSync', () => (file) => {
        if (file === 'db') {
            return '200';
        }
        return Math.random();
    });
    const { result } = file('target', 'db');
    expect(result).toBe(true);
});
