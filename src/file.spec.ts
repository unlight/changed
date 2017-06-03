import assert = require('assert');
import { inject, injector } from '@epam/inject';
import { file } from './';

describe('file', () => {

    it('file smoke test', () => {
        assert(file);
    });

    beforeEach(() => {
        injector.clear();
        injector.mock('existsSync', () => { throw 'existsSync not mocked' });
        injector.mock('statSync', () => { throw 'statSync not mocked' });
        injector.mock('writeFileSync', () => { throw 'writeFileSync not mocked' });
        injector.mock('readFileSync', () => { throw 'readFileSync not mocked' });
        injector.mock('fileMtime', () => { throw 'fileMtime not mocked' });
    });

    it('if target file do not exists throw error', () => {
        injector.mock('existsSync', () => () => false);
        assert.throws(() => {
            file('');
        })
    });

    it('if db file do not exists result should be true', () => {
        injector.mock('statSync', () => () => new Date());
        injector.mock('existsSync', () => (file) => {
            if (file === 'db') return false;
            return true;
        });
        const { result, update } = file('foo', 'db');
        assert(result);
    });

    it('filemtime same result should be false', () => {
        injector.mock('existsSync', () => () => true);
        injector.mock('fileMtime', () => (file) => {
            if (file === 'target') return 100;
            return Math.random();
        });
        injector.mock('readFileSync', () => (file) => {
            if (file === 'db') return '100';
            return Math.random();
        });
        const { result, update } = file('target', 'db');
        assert(result === false);
    });

    it('filemtime is different result should be true', () => {
        injector.mock('existsSync', () => () => true);
        injector.mock('fileMtime', () => (file) => {
            if (file === 'target') return 100;
            return { mtime: { getTime: () => Math.random() } };
        });
        injector.mock('readFileSync', () => (file) => {
            if (file === 'db') return '200';
            return Math.random();
        });
        const { result, update } = file('target', 'db');
        assert(result === true);
    });

});
