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
        message: 'Select your project type:',
        choices: ['Landing Page', 'Web Application']
      }
    ];

    this.prompt(prompts, function(props) {
      this.type = props.type;
      this.angular = this.type === 'Web Application';

      cb();
    }.bind(this));
  },

  askForMetatags: function() {
    var cb = this.async();

    var prompts = [
      {
        type: 'list',
        name: 'cssPreprocessor',
        message: 'Which preprocessor do you use?',
        choices: ['Less', 'Sass']
      },
      {
        type: 'confirm',
        name: 'baseStyleStructure',
        message: 'Will you use styles directory structure based on SMACSS?'
      },
      {
        type: 'confirm',
        name: 'metatags',
        message: 'Do you want to include meta tags for social networks?'
      },
      {
        type: 'confirm',
        name: 'analytics',
        message: 'Should I generate Google Analytics code?'
      },
      {
        type: 'list',
        name: 'javascriptTranspiler',
        message: 'Which JavaScript transpiler do you use?',
        choices: ['None', 'CoffeeScript']
      }
    ];

    this.prompt(prompts, function(props) {
      this.less = props.cssPreprocessor === 'Less';
      this.sass = props.cssPreprocessor === 'Sass';
      this.coffee = props.javascriptTranspiler === 'CoffeeScript';

      this.baseStyleStructure = props.baseStyleStructure;
      this.metatags = props.metatags;
      this.analytics = props.analytics;

      cb();
    }.bind(this));
  },

  projectFiles: function() {
    this.copy('bowerrc', '.bowerrc');
    this.copy('editorconfig', '.editorconfig');
    this.copy('gitignore', '.gitignore');
    this.copy('jshintrc', '.jshintrc');
    this.copy('jscsrc', '.jscsrc');
    this.copy('_bower.json', 'bower.json');
    this.copy('gulpfile.js', 'gulpfile.js');
    this.copy('gulpfile-production.js', 'gulpfile-production.js');
    this.copy('_package.json', 'package.json');
    this.copy('post-deploy.sh', 'post-deploy.sh');
    this.copy('substitute-config.js', 'substitute-config.js');
    this.copy('src/humans.txt', 'src/humans.txt');
    this.template('src/index.html', 'src/index.html');

    this.mkdir('src/images/sprites');
    this.mkdir('dist');
  },

  scripts: function() {
    var ext;

    if (this.coffee) {
      ext = 'coffee';
    }
    else {
      ext = 'js';
    }

    this.copy('src/scripts/main.' + ext, 'src/scripts/main.' + ext);

    if (this.angular) {
      this.copy('src/scripts/home/index.' + ext, 'src/scripts/home/index.' + ext);
      this.copy('src/scripts/home/HomeCtrl.' + ext, 'src/scripts/home/HomeCtrl.' + ext);
    }
  },

  styles: function() {
    var ext;

    if (this.less) {
      ext = 'less';
    }
    else if (this.sass) {
      ext = 'scss';
      this.copy('sass-support.js', 'sass-support.js');
    }

    this.copy('src/styles/main.less', 'src/styles/main.' + ext);

    if (this.baseStyleStructure) {
      this.copy('src/styles/base/fonts.less', 'src/styles/base/fonts.' + ext);
      this.copy('src/styles/base/global.less', 'src/styles/base/global.' + ext);
      this.copy('src/styles/base/links.less', 'src/styles/base/links.' + ext);
      this.copy('src/styles/base/normalize.css', 'src/styles/base/normalize.' + ext);
      this.copy('src/styles/components/column.less', 'src/styles/components/column.' + ext);
      this.copy('src/styles/components/component.less', 'src/styles/components/component.' + ext);
      this.copy('src/styles/modules/module.less', 'src/styles/modules/module.' + ext);
      this.copy('src/styles/animations.less', 'src/styles/animations.' + ext);
      this.copy('src/styles/helpers.less', 'src/styles/helpers.' + ext);
      this.copy('src/styles/main.less', 'src/styles/main.' + ext);
    }
  }
});

module.exports = Generator;

