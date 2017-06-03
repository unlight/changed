import assert = require('assert');
import { inject, injector } from '@epam/inject';
import { dependencies } from './';

describe('dependencies', () => {

    it('smoke', () => {
        assert(dependencies);
    });

    beforeEach(() => {
        injector.clear();
        injector.mock('dependenciesData', () => { throw 'dependenciesData not mocked' });
        injector.mock('existsSync', () => { throw 'existsSync not mocked' });
        injector.mock('dbDependenciesData', () => { throw 'dbDependenciesData not mocked' });
    });

    it('initial case when db is not exists', () => {
        let packageDeps = { a: '1' };
        injector.mock('dependenciesData', () => () => packageDeps);
        injector.mock('existsSync', () => () => false);
        const { result, update, initial } = dependencies('db');
        assert(result === true, 'result must be true');
        assert(initial === true, 'initial must be true');
    });

    it('when db exists but no changes', () => {
        let packageDeps = { a: '1' };
        injector.mock('dependenciesData', () => () => ({ ...packageDeps }));
        injector.mock('existsSync', () => () => true);
        injector.mock('dbDependenciesData', () => () => ({ ...packageDeps }));
        const { result, update, initial } = dependencies('db');
        assert(result === false, 'result must be false');
        assert(initial !== true, 'initial must be not true');
    });

    it('when db exists and has changes in pkg dependencies', () => {
        let packageDeps = { a: '1' };
        injector.mock('dependenciesData', () => () => ({ ...packageDeps, b: '2' }));
        injector.mock('existsSync', () => () => true);
        injector.mock('dbDependenciesData', () => () => ({ ...packageDeps }));
        const { result, update, initial, diff } = dependencies('db');
        assert(initial !== true, 'initial expected to be not true');
        assert(result === true, 'initial expected to be true');
        assert.deepEqual(diff, { b: '2' }, 'diff must contain b:2');
    });
});
