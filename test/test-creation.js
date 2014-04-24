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
      '.jshintrc',
      '.editorconfig',
      'bower.json',
      'gulpfile.js',
      'package.json',
      'karma.conf.js',
      'dist/',
      'src/index.html',
      'src/partials/empty.txt',
      'src/partials/livereload.html',
      'src/scripts/main.js',
      'src/scripts/home/index.js',
      'src/scripts/home/HomeCtrl.js',
      'src/styles/main.less',
      'spec/e2e/example.js',
      'spec/unit/exampleSpec.js'
    ];

    helpers.mockPrompt(this.app, {
      'someOption': true
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });
});
