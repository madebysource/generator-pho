'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var SourceGenerator = module.exports = function SourceGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  // have Yeoman greet the user.
  console.log(this.yeoman);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(SourceGenerator, yeoman.generators.Base);

SourceGenerator.prototype.askFor = function() {
  var cb = this.async();

  var prompts = [
    {
      type: 'list',
      name: 'type',
      message: 'type',
      choices: ['web app', 'landing page']
    }
  ];

  this.prompt(prompts, function(props) {
    this.type = props.type;

    cb();
  }.bind(this));
};

SourceGenerator.prototype.askForMetatags = function() {
  var cb = this.async();

  var prompts = [
    {
      type: 'confirm',
      name: 'metatags',
      message: 'metatags'
    },
    {
      type: 'input',
      name: 'analytics',
      message: 'google analytics (UA-XXXXX-X)'
    }
  ];

  this.prompt(prompts, function(props) {
    this.metatags = props.metatags;
    this.analytics = props.analytics;

    cb();
  }.bind(this));
};

SourceGenerator.prototype.askForAngular = function() {
  var cb = this.async();

  var prompts = [];

  if (this.type === 'web app') {
    prompts = [
      {
        type: 'confirm',
        name: 'angular',
        message: 'angular'
      },
      {
        type: 'confirm',
        name: 'tests',
        message: 'tests',
        when: function(props) {
          return props.angular;
        }
      },
      {
        type: 'confirm',
        name: 'unit',
        message: 'unit testing (jasmine)',
        when: function(props) {
          return props.tests;
        }
      },
      {
        type: 'confirm',
        name: 'e2e',
        message: 'e2e testing (casper.js)',
        when: function(props) {
          return props.tests;
        }
      }
    ];
  }

  this.prompt(prompts, function(props) {
    this.angular = props.angular;
    this.tests = props.tests;
    this.unit = props.unit;
    this.e2e = props.e2e;

    cb();
  }.bind(this));
};

SourceGenerator.prototype.projectfiles = function projectfiles() {
  this.mkdir('src');
  this.mkdir('src/images');
  this.mkdir('src/sprites');
  this.mkdir('dist');

  if (this.e2e || this.unit) {
    this.mkdir('spec');

    if (this.e2e) {
      this.mkdir('spec/e2e');
      this.copy('spec/e2e/example.js', 'spec/e2e/example.js');
    }

    if (this.unit) {
      this.copy('karma.conf.js', 'karma.conf.js');

      this.mkdir('spec/unit');
      this.copy('spec/unit/exampleSpec.js', 'spec/unit/exampleSpec.js');
    }
  }

  this.copy('bowerrc', '.bowerrc');
  this.copy('gitignore', '.gitignore');
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
  this.copy('_bower.json', 'bower.json');
  this.copy('gulpfile.js', 'gulpfile.js');
  this.copy('gulpfile-production.js', 'gulpfile-production.js');
  this.copy('substitute-config.js', 'substitute-config.js');
  this.copy('_package.json', 'package.json');

  this.template('src/index.html', 'src/index.html');

  this.copy('src/styles/main.less', 'src/styles/main.less');
  this.copy('src/scripts/main.js', 'src/scripts/main.js');

  if (this.angular) {
    this.copy('src/scripts/home/index.js', 'src/scripts/home/index.js');
    this.copy('src/scripts/home/HomeCtrl.js', 'src/scripts/home/HomeCtrl.js');
  }
};
