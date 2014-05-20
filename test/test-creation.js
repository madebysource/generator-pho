/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;


describe('pho generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('pho:app', [
        '../../app'
      ]);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      // add files you expect to exist here.
      '.bowerrc',
      '.editorconfig',
      '.gitignore',
      '.jshintrc',
      'bower.json',
      'humans.txt',
      'gulpfile.js',
      'gulpfile-production.js',
      'package.json',
      'karma.conf.js',
      'src/index.html',
      'src/scripts/main.js',
      'src/scripts/home/index.js',
      'src/scripts/home/HomeCtrl.js',
      'src/styles/main.less',
      'spec/e2e/example.js',
      'spec/unit/exampleSpec.js',

      'dist/',
      'src/',
      'src/images',
      'src/sprites'
    ];

    helpers.mockPrompt(this.app, {
      'tests': true,
      'e2e': true,
      'unit': true,
      'angular': true
    });

    this.app.options['skip-install'] = true;

    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });
});
