import { tmpdir as osTmpdir } from 'os';
import { inject } from '@epam/inject';
const filenamify = require('filenamify');

export function dbFileName(targetFile: string) {
    const tmpdir = inject<typeof osTmpdir>('tmpdir', () => osTmpdir);
    return `${tmpdir()}/${encodeURI(filenamify(targetFile))}`;
}
