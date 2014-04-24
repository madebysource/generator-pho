// For all available options, see node_modules/pho-dev-stack/config.js
// These are production build settings, see gulpfile.js for development settings
var gulp = require('gulp');
require('pho-devstack')(gulp, {
  browserify: {
    debug: false,
    transforms: {
      "browserify-ngmin": true,
      uglifyify: true
    }
  },
  fileInsert: {
    enabled: true,
    '%% LIVERELOAD %%': 'src/partials/empty.txt'
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
  }
});

// If needed, redefine tasks here
