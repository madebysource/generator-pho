// For all available options, see node_modules/pho-dev-stack/config.js
// These are production build settings, see gulpfile.js for development settings
var gulp = require('gulp');

var extend = require('node.extend');
var substituteConfig = require('./substitute-config');

var substituter = extend(true, {}, substituteConfig, {
});

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
  substituter: substituter
});

// If needed, redefine tasks here
