// For all available options, see node_modules/pho-devstack/config.js
// These are development build settings, see gulpfile-production.js for production settings
var gulp = require('gulp');
var through = require('through2');

// get stream of filenames in directory
var files = function(path, format) {
  return function() {
    return gulp.src(path, { read: false })
    .pipe(through.obj(function(file, enc, callback) {
      this.push(format(file.relative));
      callback();
    }));
  };
};

require('pho-devstack')(gulp, {
  substituter: {
    livereload: function() {
      return gulp.src('src/partials/livereload.txt');
    },

    js: files('dist/scripts/**/*.js', function(name) {
      return '<script src="scripts/' + name + '"></script>';
    }),

    css: files('dist/styles/**/*.css', function(name) {
      return '<link rel="stylesheet" href="styles/' + name + '">';
    })
  },

  copy: ['sprites/**/*']
});

// If needed, redefine tasks here
