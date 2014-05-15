// For all available options, see node_modules/pho-dev-stack/config.js
// These are production build settings, see gulpfile.js for development settings
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
  browserify: {
    debug: false,
    transforms: {
      "browserify-ngmin": true,
      uglifyify: true
    }
  },
  less: {
    sourceMap: false
  },
  livereload: {
    enabled: false
  },
  plumber: {
    enabled: false
  },
  rename: {
    enabled: true
  },
  watch: {
    enabled: false
  },
  'sprites-preprocessor': {
    enabled: true,
    prefix: '../sprites/' // change this to prefix path before sprites. '/sprites/' for absolute paths
  },
  base64: {
    enabled: true,
    // baseDir: 'src' // uncomment if you are using absolute paths
  },

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
});

// If needed, redefine tasks here
