# is-changed
Designed to track dependencies in package.json and check file modification time.
Result is saved to local files, but not memory.
Useful for task runners and builders, when you need to know is it necessary run rebuild someting.

## CLI
Check dependencies in package.json, run command `npm run build:libs` if changes found.
Snapshot will be stored in `.libs.dat`.
```sh
is-changed --dependencies -t .libs.dat -u "npm run build:libs"
```

Check file `src/style.scss` time modification, execute `npm run build:style` if time is different from latest saved snapshot to `.style.dat`.
```sh
is-changed -f src/style.scss -t .style.dat -u "npm run build:style"
```

## API
```ts
changed.file({ targetFile: string, databaseFile?: string }): Result
type Result = {
    result: boolean; // is file modified
    update: () => void; // update filemtime
};
```
```ts
changed.dependenciesdependencies({ databaseFile?: string, cwd?: string }): Result
type Result = {
    result: boolean; // has changed
    update: () => void; // update filemtime
    initial: boolean; // indicates first run
    diff: Dict | null; // result difference
};
type Dict = { [name: string]: { $set: any, $was: any } };
```

## EXAMPLES
```
const changed = require('is-changed');
const Path = require('path');
const buildPath = 'dist';
```
#### Example 1: File changed
```ts
const styleChanged = changed.file(`src/style.scss`, Path.resolve(buildPath, '.style.dat'));
// do something useful with src/style.scss...
styleChanged.update();
```
#### Example 2: Track dependencies
```ts
const libsChanged = changed.dependencies(Path.resolve(buildPath, '.libs.dat'));
// do something...
styleChanged.update();
```
