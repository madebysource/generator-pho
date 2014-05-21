// For all available options, see node_modules/pho-devstack/config.js
// These are development build settings, see gulpfile-production.js for production settings
var gulp = require('gulp');

var extend = require('node.extend');
var substituteConfig = require('./substitute-config');

require('pho-devstack')(gulp, {
  imagemin: {
    enabled: false
  },

  substituter: extend(true, substituteConfig, {
    livereload: function() {
      return "<script>document.write('<script src=\"http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1\"></' + 'script>')</script>";
    }
  }),

  copy: ['images/sprites/**/*', 'humans.txt']
});

// If needed, redefine tasks here
