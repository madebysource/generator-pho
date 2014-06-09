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
      this.app.options['skip-install'] = true;

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
      '.jscsrc',
      'bower.json',
      'src/humans.txt',
      'gulpfile.js',
      'gulpfile-production.js',
      'package.json',
      'post-deploy.sh',
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
      'src/images/sprites'
    ];

    helpers.mockPrompt(this.app, {
      'tests': true,
      'e2e': true,
      'unit': true,
      'type': 'Web Application',
      'stylesPreprocessor': 'Less'
    });

    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });

  it('creates Less directory structure', function (done) {
    var expected = [
      'src/styles/animations.less',
      'src/styles/helpers.less',
      'src/styles/main.less',
      'src/styles/base/fonts.less',
      'src/styles/base/global.less',
      'src/styles/base/links.less',
      'src/styles/base/normalize.less',
      'src/styles/components/column.less',
      'src/styles/components/component.less',
      'src/styles/modules/module.less',
    ];

    helpers.mockPrompt(this.app, {
      'tests': true,
      'e2e': true,
      'unit': true,
      'type': 'Web Application',
      'stylesPreprocessor': 'Less',
      'baseStyleStructure': true
    });

    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });

  it('creates Sass directory structure', function (done) {
    var expected = [
      'sass-support.js',
      'src/styles/animations.scss',
      'src/styles/helpers.scss',
      'src/styles/main.scss',
      'src/styles/base/fonts.scss',
      'src/styles/base/global.scss',
      'src/styles/base/links.scss',
      'src/styles/base/normalize.scss',
      'src/styles/components/column.scss',
      'src/styles/components/component.scss',
      'src/styles/modules/module.scss',
    ];

    helpers.mockPrompt(this.app, {
      'tests': true,
      'e2e': true,
      'unit': true,
      'type': 'Web Application',
      'stylesPreprocessor': 'Sass',
      'baseStyleStructure': true
    });

    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });
});
