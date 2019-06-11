#!/usr/bin/env node
import * as meow from 'meow';
import { dependencies } from './dependencies';
import { execSync } from 'child_process';
import { file } from './file';

const scriptName = 'is-changed';

export async function main(): Promise<number> {
    const cliOptions: meow.Options = {
        flags: {
            dependencies: {
                type: 'boolean',
                alias: 'd'
            },
            file: {
                type: 'string',
                alias: 'f'
            },
            track: {
                type: 'string',
                alias: 't'
            },
            update: {
                type: 'string',
                alias: 'u'
            },
        }
    };
    const cli = meow(`
    Usage:
      $ ${scriptName} <options>

    Options:
      --dependencies, -d  Check dependencies
      --file, -f  Check file
      --track, -t  Track data file
      --update, -u  Command if result has changes

    Examples:
      $ ${scriptName} -d -t .libs.dat -u "npm run build:libs"
      $ ${scriptName} -f src/style.scss -t .style.dat -u "npm run build:style"
`, cliOptions);

    const changesMatch = [
        [cli => cli.flags.dependencies, cli => dependencies({ databaseFile: cli.flags.track })],
        [cli => cli.flags.file, cli => file({ targetFile: cli.flags.file, databaseFile: cli.flags.track })],
    ];

    const [match, factory] = changesMatch.find(([match]) => match(cli)) || [undefined, Function];
    if (!match) {
        cli.showHelp(1);
        return 1;
    }
    if (!cli.flags.track) {
        throw new Error('Parameter --track is required');
    }

    const changes = factory(cli);
    if (changes.result) {
        if (cli.flags.update) {
            execSync(cli.flags.update, { stdio: 'inherit' });
        }
        changes.update();
    }
    return 0;
}

if (!module.parent) {
    main()
        .then(code => process.exit(code))
        .catch((error: Error) => {
            console.error(error.message); // eslint-disable-line no-console
            process.exit(1);
        });
}
