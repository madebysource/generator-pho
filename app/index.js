'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var SourceGenerator = module.exports = function SourceGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(SourceGenerator, yeoman.generators.Base);

SourceGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [];
  // [{
  //  type: 'confirm',
  //  name: 'someOption',
  //  message: 'Would you like to enable this option?',
  //  default: true
  // }];

  this.prompt(prompts, function (props) {
    this.someOption = props.someOption;

    cb();
  }.bind(this));
};

SourceGenerator.prototype.projectfiles = function projectfiles() {
  this.mkdir('src');
  this.mkdir('src/images');
  this.mkdir('dist');
  this.mkdir('spec');
  this.mkdir('spec/e2e');
  this.mkdir('spec/unit');

  this.copy('bowerrc', '.bowerrc')
  this.copy('gitignore', '.gitignore');;
  this.copy('editorconfig', '.editorconfig');
  this.copy('karma.conf.js', 'karma.conf.js');
  this.copy('jshintrc', '.jshintrc');
  this.copy('_bower.json', 'bower.json');
  this.copy('gulpfile.js', 'gulpfile.js');
  this.copy('gulpfile-production.js', 'gulpfile-production.js');
  this.copy('_package.json', 'package.json');
  this.copy('src/index.html', 'src/index.html');
  this.copy('src/partials/empty.txt', 'src/partials/empty.txt');
  this.copy('src/partials/livereload.txt', 'src/partials/livereload.txt');
  this.copy('src/scripts/main.js', 'src/scripts/main.js');
  this.copy('src/scripts/home/index.js', 'src/scripts/home/index.js');
  this.copy('src/scripts/home/HomeCtrl.js', 'src/scripts/home/HomeCtrl.js');
  this.copy('src/styles/main.less', 'src/styles/main.less');
  this.copy('spec/unit/exampleSpec.js', 'spec/unit/exampleSpec.js');
  this.copy('spec/e2e/example.js', 'spec/e2e/example.js');
};
