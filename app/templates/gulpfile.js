// For all available options, see node_modules/pho-devstack/config.js
// These are development build settings, see gulpfile-production.js for production settings
var gulp = require('gulp');
require('pho-devstack')(gulp, {
  fileInsert: {
    enabled: true,
    '%% LIVERELOAD %%': 'src/partials/livereload.txt'
  },
  copy: ['sprites/**/*']
});

// If needed, redefine tasks here
