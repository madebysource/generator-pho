// For all available options, see node_modules/pho-dev-stack/config.js
var gulp = require('gulp');
require('pho-devstack')(gulp, {
  dist: {
    markupDir: 'dist/',
    scriptDir: 'dist/scripts/',
    styleDir: 'dist/styles/',
    scriptFiles: '*.js',
    styleFiles: '*.css'
  },
  src: {
    markupDir: 'src/',
    scriptDir: 'src/scripts/',
    styleDir: 'src/styles/',
    specDir: 'spec/',
    imageDir: 'src/images/',
    e2eDir: 'e2e/',
    markupMain: 'index.html',
    scriptMain: 'main.js',
    styleMain: 'main.less',
    scriptFiles: '**/*.js',
    styleFiles: '**/*.less',
    specFiles: '**/*Spec.js',
    imageFiles: '**/*.{png,jpg,jpeg}'
  }
});

// If needed, redefine tasks here
