'use strict'

var readJson = require('read-package-json'),
	util = require('util'),
	exec = require('child_process').exec,
	yargs = require('yargs').argv,
	colors = require('colors');

var child,
	dependencies = "";

readJson('package.json', console.error, false, function(er, data) {
	if (er) {
		console.error("There was an error reading package.json")
		return
	}
	if (yargs.list == true) {
		console.log(data.platDependencies);
	} 
	if (yargs.install == true) {
		var tlength = Object.keys(data.platDependencies).length
		var count = 0;

		for (var i in data.platDependencies) {
			var pkage = i,
				version = data.platDependencies[i];

			count++
			if (count == tlength) {
				dependencies += pkage + "@" + version
			} else {
				dependencies += pkage + "@" + version + " "
			}

		}
		child = exec("npm install -g " + dependencies, function(error, stdout, stderr) {
			console.log(stdout);
			console.log(stderr);
			if (error !== null) {
				console.log(error);
			}
		});
	}
	if (yargs.list!=true || yargs.install!=true || yargs.help==true) {
		console.log('\nnpm-platdependencies'.bold)
		console.log('node global dependencies installation for platform \n'.italic)
		console.log('Synopsis'.bold)
		console.log('platinst [--Options] \n')
		console.log('Options'.bold)
		console.log('--install - Install the platform dependencies')
		console.log('--list - List the platform dependencies')
		console.log('--help - Print this message')
	}
});