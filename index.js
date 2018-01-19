#!/usr/bin/env node

'use strict';

const fs = require('fs');
const exec = require('child_process').exec;
const program = require('commander');

const pkg = require('./package.json');

//
// ---------------------------------------------------------------
//

const app = {};

app.uuid_prefix = '.0FEFC2FF211E40EA806E84205540F8B8'

app.cli_hide = (filename) => {
    fs.rename(filename, app.uuid_prefix + filename, function (err, msg) {
        if (err) {
            console.log('\x1b[31mError occured when hiding "%s". Does it exist?\x1b[0m', filename);
        } else {
            console.log('\x1b[32mSuccessfully hid "%s"\x1b', filename);
        }
    });
};

app.cli_release = () => {
    exec('ls -1a | grep "\\.0FEFC2FF211E40EA806E84205540F8B8"', function (err, stdout, stderr) {
        if (stdout) {
            console.log('Released hidden file%s:', stdout.trim().split('\n').length > 1 ? 's' : '');
            console.log(stdout.trim().split('\n').map(filename => filename.replace('.0FEFC2FF211E40EA806E84205540F8B8', '')).join('\n'));
            stdout.trim().split('\n').map(function (filename) {
                fs.rename(filename, filename.slice(33), function () {});
            });
        };
    });
};

//
// ---------------------------------------------------------------
//

program.usage('file_1 file_2 ...');

program.option('-a, --all', 'hide all files in current dicrectory');
program.option('-r, --release', 'release all hidden files and directories in current directory');

program.parse(process.argv);

if (program.release) {
    app.cli_release();
} else if (program.all) {
    exec('ls -1', function (err, stdout, stderr) {
        if (stdout) {
            stdout.trim().split('\n').map(app.cli_hide);
        };
    });
} else {
    program.args.map(app.cli_hide);
};
