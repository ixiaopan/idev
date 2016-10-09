import program from 'commander';

import pkgConfig from '../package.json';
import index from '../index';

let started = false;

function getOptions() {
    let obj = {};

    Object.keys(program).forEach(function (name) {
        if (program.optionFor('--' + name)) {
            obj[name] = program[name];
        }
    });

    return obj;
}

program
    .version(pkgConfig.version)
    .usage('<Command> [Options]');

program
    .option('-p, --port [port]', pkgConfig.port + ' by default')
    .option('--debug', 'debug webui');

program
    .command('help')
    .description('Display help information')
    .action(() => {
        started = true;
        program.help();
    });
program
    .command('start')
    .description('start debugger')
    .action(() => {
        started = true;
    });

program.parse(process.argv);

if (!started) {
    console.log('type [idev start] to start debug.');
}

else {
    index(getOptions());
}
