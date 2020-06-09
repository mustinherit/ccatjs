#! /usr/bin/env node

const lib = require("../index.js");
const fs = require("fs");

// Get arguments without the first two.
var args = process.argv.splice(2);

// Vars.
var _entryFile;
var _destFile;

// Process args.
processArgs();

// Process ccatjs.
lib.concatJs(_entryFile, _destFile);

function processArgs()
{
    if (args.length >= 1)
    {

        // Help.
        if (args.indexOf("-h") != -1 || args.indexOf("--help") != -1)
        {
            showHelp();
            process.exit();
        }

        // Version.
        if (args.indexOf("-v") != -1 || args.indexOf("--version") != -1)
        {
            showVersion();
            process.exit();
        }
    }

    // Minimal two required.
    if (args.lenght < 2) {
        console.error("Missing required arguments. Use -h or --help for help.");
        process.exit(1);
    }

    // Set and validate entryFile.
    _entryFile = args[0];
    if (!fs.existsSync(_entryFile)) {
        console.error("Cannot find part of the `entryFile` path: `" + _entryFile + "`.");
        process.exit(1);
    }

    // Set destFile.
    _destFile = args[1];

}

function showHelp()
{
    console.log("");
    console.log("Usage: ccatjs <source> <dest> [options]");
    console.log("");
    console.log("<source> \t The entry js file to process.");
    console.log("<dest> \t\t The destination js file.");
    console.log("");
    console.log("Options:");
    console.log("-h, --help \t\t Prints help.");
    console.log("-v, --version \t\t Prints current version.");  
    console.log("");
}

function showVersion()
{
    var pk = require("../package.json");
    console.log(pk.version);
}