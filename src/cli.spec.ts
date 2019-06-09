/* tslint:disable:no-floating-promises prefer-type-cast */
const showHelp = jest.fn().mockName('showHelp');
const meowResultDefault: Result = {
    flags: {},
    input: [],
    showHelp: showHelp,
    help: undefined as any,
    pkg: undefined, // eslint-disable-line unicorn/prevent-abbreviations
    showVersion: undefined as any,
};
let meowResult = { ...meowResultDefault };
const meow = jest.fn<Result, any>().mockImplementation(() => meowResult); // tslint:disable-line no-any
const processExit = jest.spyOn(process, 'exit').mockImplementation(<any>((code) => code)); // tslint:disable-line no-any
jest.doMock('meow', () => meow);
jest.mock('./dependencies');
jest.mock('./file');
jest.mock('child_process');

import { main } from './cli';
import { Result } from 'meow';
import { dependencies } from './dependencies';
import { file } from './file';
import { execSync } from 'child_process';

afterEach(() => {
    jest.clearAllMocks();
});

it('cli smoke test', () => {
    expect(main).toBeTruthy();
});

it('on empty arguments shows helps and returns exit code 1', async () => {
    expect(await main()).toEqual(1);
    expect(showHelp).toHaveBeenCalledWith(1);
});

it('flag dependencies without track', async () => {
    meowResult = { ...meowResultDefault, flags: { dependencies: true } };
    expect(main()).rejects.toThrow('Parameter --track is required');
});

it('flag dependencies with track and has changes and update flag', async () => {
    meowResult = { ...meowResultDefault, flags: { dependencies: true, update: 'echo 1', track: 'datafile' } };
    const update = jest.fn();
    (dependencies as jest.Mock<ReturnType<typeof dependencies>, Parameters<typeof dependencies>>)
        .mockImplementation(() => ({ result: true, update, diff: undefined, initial: true }));
    await expect(main()).resolves.toEqual(0);
    expect(update).toHaveBeenCalledWith();
    expect(execSync).toHaveBeenCalledWith('echo 1', expect.anything());
});

it('dependencies with no changes should return code 1', async () => {
    meowResult = { ...meowResultDefault, flags: { dependencies: true, update: 'echo 2', track: 'datafile' } };
    const update = jest.fn();
    (dependencies as jest.Mock<ReturnType<typeof dependencies>, Parameters<typeof dependencies>>)
        .mockImplementation(() => ({ result: false, update, diff: undefined, initial: true }));
    await expect(main()).resolves.toEqual(1);
    expect(update).not.toHaveBeenCalled();
    expect(execSync).not.toHaveBeenCalled();
});

it('flag file without track parameter should throw', async () => {
    meowResult = { ...meowResultDefault, flags: { file: true } };
    await expect(main()).rejects.toThrow('Parameter --track is required');
});
