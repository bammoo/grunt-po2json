/*
 * grunt-po2json
 * https://github.com/rkitamura/grunt-po2json
 *
 * Copyright (c) 2013 Rocky Kitamura
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.registerMultiTask('po2json', 'Convert PO to JSON files', function() {
    var options = this.options();

    var path = require('path');
    var po2json = require('po2json');

    this.files.forEach(function(line) {
      line.src.forEach(function(file) {
        grunt.log.writeln('File "' + file + '" waiting.');

        var jsonData = '';
        try {
          jsonData = po2json.parseFileSync(file, {format: 'jed'});
          var filename = path.basename(file, (path.extname(file)));
          var dest = path.join(line.dest, filename + '.json');
          grunt.file.write(dest, JSON.stringify(jsonData));
          grunt.log.writeln('File "' + dest + '" created.');
        } catch (e) {}

        // po2json.parseFileSync(file, {format: 'jed' }, function (err, jsonData) {
        // });
      });
    });

  });

};
