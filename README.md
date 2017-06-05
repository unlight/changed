changed
---
Designed to track dependencies in package.json and check file modification time.
Result is saved to local files, but not memory.
Useful for task runners and builders, when you need to know is it necessary run rebuild someting.

API
---
```ts
changed.file(targetFile: string, dbFile?: string): Result
type Result = {
    result: boolean; // is file modified
    update: () => void; // update filemtime
};
```
```ts
changed.dependenciesdependencies(dbFile?: string, cwd?: string): Result
type Result = {
    result: boolean; // has changed
    update: () => void; // update filemtime
    initial: boolean; // indicates first run
    diff: Dict | null; // result difference
};
type Dict = { [name: string]: { $set: any, $was: any } };
```

EXAMPLES
---
```
const changed = require('@epam/changed');
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
