'use strict';
var yeoman = require('yeoman-generator');

var Generator = yeoman.generators.Base.extend({
  constructor: function(args, options) {
    yeoman.generators.Base.apply(this, arguments);

    console.log(this.yeoman);

    this.pkg = require('../package.json');

    this.on('end', function () {
      this.installDependencies({ skipInstall: options['skip-install'] });
    });
  },

  askForApplicationType: function() {
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
  },

  askForMetatags: function() {
    var cb = this.async();

    var prompts = [
      {
        type: 'confirm',
        name: 'metatags',
        message: 'metatags'
      },
      {
        type: 'confirm',
        name: 'analytics',
        message: 'google analytics'
      },
      {
        type: 'confirm',
        name: 'baseStyleStructure',
        message: 'generate base less strucure'
      }
    ];

    this.prompt(prompts, function(props) {
      this.metatags = props.metatags;
      this.analytics = props.analytics;
      this.baseStyleStructure = props.baseStyleStructure;

      cb();
    }.bind(this));
  },

  askForAngular: function() {
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
  },

  projectFiles: function() {
    this.copy('bowerrc', '.bowerrc');
    this.copy('gitignore', '.gitignore');
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
    this.copy('_bower.json', 'bower.json');
    this.copy('substitute-config.js', 'substitute-config.js');
    this.copy('_package.json', 'package.json');
    this.copy('humans.txt', 'humans.txt');
  },

  app: function() {
    this.mkdir('src/images/sprites');
    this.mkdir('dist');

    this.copy('src/scripts/main.js', 'src/scripts/main.js');

    this.copy('gulpfile.js', 'gulpfile.js');
    this.copy('gulpfile-production.js', 'gulpfile-production.js');

    this.template('src/index.html', 'src/index.html');

    if (this.angular) {
      this.copy('src/scripts/home/index.js', 'src/scripts/home/index.js');
      this.copy('src/scripts/home/HomeCtrl.js', 'src/scripts/home/HomeCtrl.js');
    }
  },

  styles: function() {
    this.copy('src/styles/main.less', 'src/styles/main.less');

    if (this.baseStyleStructure) {
      this.copy('src/styles/base/fonts.less', 'src/styles/base/fonts.less');
      this.copy('src/styles/base/global.less', 'src/styles/base/global.less');
      this.copy('src/styles/base/links.less', 'src/styles/base/links.less');
      this.copy('src/styles/base/normalize.less', 'src/styles/base/normalize.less');
      this.copy('src/styles/components/column.less', 'src/styles/components/column.less');
      this.copy('src/styles/components/component.less', 'src/styles/components/component.less');
      this.copy('src/styles/modules/module.less', 'src/styles/modules/module.less');
      this.copy('src/styles/animations.less', 'src/styles/animations.less');
      this.copy('src/styles/helpers.less', 'src/styles/helpers.less');
      this.copy('src/styles/lesshat.less', 'src/styles/lesshat.less');
      this.copy('src/styles/main.less', 'src/styles/main.less');
    }
  },

  tests: function() {
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
  }
});

module.exports = Generator;

