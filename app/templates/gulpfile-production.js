// For all available options, see node_modules/pho-devstack/config.js
// These are production build settings, see gulpfile.js for development settings

var gulp = require('gulp');
var extend = require('node.extend');
var substituteConfig = require('./substitute-config');

var pho = require('pho-devstack')(gulp, {
  <% if (coffee || sass) { %>src: {
    <% if (coffee) { %>scriptMain: 'main.coffee',
    scriptFiles: '**/*.coffee'<% } if (coffee && sass) { %>,
    <% } if (sass) { %>styleMain: 'main.{scss,sass}',
    styleFiles: '**/*.{scss,sass}'<% } %>
  },
  <% } %>browserify: {
    debug: false,
    <% if (coffee) { %>extensions: ['.coffee']
  },
  base64: {
    // baseDir: 'src', // uncomment if you are using absolute paths
    enabled: true
  },
  <% if (less) { %>less: {
    sourceMap: false
  },
  <% } %>ngAnnotate: {
    /* Rewrites AngularJS code to be minification-proof */
    enabled: false
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
  spritesPreprocessor: {
    enabled: true,
    prefix: '../images/sprites/' // change this to prefix path before sprites. '/images/sprites/' for absolute paths
  },
  substituter: extend(true, substituteConfig, {
    // cdn: 'http://example.com' // url to your CDN server
    // cdn: '/', // uncomment if you are using absolute paths without CDN
  }),
  uglify: {
    enabled: true
  },
  watch: {
    enabled: false
  },
  copy: ['humans.txt'<% if (angular) { %>, 'bower_components/angular/**/*.{js,map}'<% } %>]
});

// If needed, redefine tasks here
<% if (sass) { %>require('./sass-support')(pho);
<% } %>
