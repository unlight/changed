import { inject, injector } from 'njct';
import { dependencies } from './';

beforeEach(() => {
    injector.clear();
    injector.mock('dependenciesData', () => { throw new Error('dependenciesData not mocked'); });
    injector.mock('existsSync', () => { throw new Error('existsSync not mocked'); });
    injector.mock('dbDependenciesData', () => { throw new Error('dbDependenciesData not mocked'); });
});

it('initial case when db is not exists', () => {
    const packageDeps = { a: '1' };
    injector.mock('dependenciesData', () => () => packageDeps);
    injector.mock('existsSync', () => () => false);
    const { result, update, initial } = dependencies('db');
    expect(result).toBe(true);
    expect(initial).toBe(true);
});

it('when db exists but no changes', () => {
    const packageDeps = { a: '1' };
    injector.mock('dependenciesData', () => () => ({ ...packageDeps }));
    injector.mock('existsSync', () => () => true);
    injector.mock('dbDependenciesData', () => () => ({ ...packageDeps }));
    const { result, update, initial } = dependencies('db');
    expect(result).toBe(false);
    expect(initial).not.toBe(true);
});

it('when db exists and has changes in pkg dependencies', () => {
    const packageDeps = { a: '1' };
    injector.mock('dependenciesData', () => () => ({ ...packageDeps, b: '2' }));
    injector.mock('existsSync', () => () => true);
    injector.mock('dbDependenciesData', () => () => ({ ...packageDeps }));
    const { result, update, initial, diff } = dependencies('db');
    expect(initial).not.toBe(true);
    expect(result).toBe(true);
    expect(diff).toEqual({ b: { $set: '2' } });
});

it('update should write string data', () => {
    injector.mock('dependenciesData', () => () => ({ a: '1' }));
    injector.mock('existsSync', () => () => false);
    injector.mock('saveFile', () => (dbFile, data) => {
        expect(typeof data).toBe('string');
    });
    const { result, update, initial } = dependencies('db');
    update();
});

it('if data dependencies fails', () => {
    injector.mock('dependenciesData', () => () => ({ a: '1' }));
    injector.mock('dbDependenciesData', () => () => null);
    injector.mock('existsSync', () => () => true);
    const { result, update, initial } = dependencies('db');
    expect(initial).toBe(true);
    expect(result).toBe(true);
});

it('if data dependencies removed', () => {
    injector.mock('dependenciesData', () => () => ({ a: '1' }));
    injector.mock('dbDependenciesData', () => () => ({ a: '1', b: '2' }));
    injector.mock('existsSync', () => () => true);
    const { result, update, initial, diff } = dependencies('db');
    expect(initial).toBe(false);
    expect(result).toBe(true);
});
