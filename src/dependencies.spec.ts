/* tslint:disable:prefer-type-cast no-any */
import { dependencies } from './dependencies';

it('initial case when db is not exists', () => {
    const packageDependencies = () => ({ a: '1' } as any);
    const existsSync = () => false;
    const { result, initial } = dependencies({ databaseFile: 'db', existsSync, packageDependencies });
    expect(result).toBe(true);
    expect(initial).toBe(true);
});

it('when db exists but no changes', () => {
    const packageDependencies = () => ({ a: '1' } as any);
    const existsSync = () => true;
    const databaseDependencies =  () => ({ a: '1' } as any);
    const { result, initial } = dependencies({ databaseFile: 'db', existsSync, packageDependencies, databaseDependencies });
    expect(result).toBe(false);
    expect(initial).not.toBe(true);
});

it('when db exists and has changes in pkg dependencies', () => {
    const packageDeps = { a: '1' };
    const packageDependencies = () => ({ ...packageDeps, b: '2' } as any);
    const existsSync = () => true;
    const databaseDependencies = () => ({ ...packageDeps });
    const { result, initial, diff } = dependencies({ databaseFile: 'db', existsSync, packageDependencies, databaseDependencies });
    expect(initial).not.toBe(true);
    expect(result).toBe(true);
    expect(diff).toEqual({ b: { $set: '2' } });
});

it('update should write string data', () => {
    const packageDependencies = () => ({ a: '1' } as any);
    const existsSync = () => false;
    const saveFile = (databaseFile, data) => {
        expect(typeof data).toBe('string');
    };
    const { update } = dependencies({ databaseFile: 'db', existsSync, packageDependencies, saveFile });
    update();
});

it('if data dependencies fails', () => {
    const packageDependencies = () => ({ a: '1' } as any);
    const databaseDependencies = () => undefined;
    const existsSync = () => true;
    const { result, initial } = dependencies({ databaseFile: 'db', existsSync, packageDependencies, databaseDependencies });
    expect(initial).toBe(true);
    expect(result).toBe(true);
});

it('if data dependencies removed', () => {
    const packageDependencies = () => ({ a: '1' } as any);
    const databaseDependencies = () => ({ a: '1', b: '2' });
    const existsSync = () => true;
    const { result, initial } = dependencies({ databaseFile: 'db', existsSync, packageDependencies, databaseDependencies });
    expect(initial).toBe(false);
    expect(result).toBe(true);
});
