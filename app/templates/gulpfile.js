// For all available options, see node_modules/pho-devstack/config.js
// These are development build settings, see gulpfile-production.js for production settings

var gulp = require('gulp');
var extend = require('node.extend');
var substituteConfig = require('./substitute-config');

var pho = require('pho-devstack')(gulp, {
  <% if (coffee || sass) { %>src: {
    <% if (sass) { %>styleMain: 'main.{scss,sass}',
    styleFiles: '**/*.{scss,sass}'<% } if (coffee && sass) { %>,<% } %>
    <% if (coffee) { %>scriptMain: 'main.coffee',
    scriptFiles: '**/*.coffee'
  },
  dist: {
    scriptMain: 'main.js',<% } %>
  },
  <% } if (coffee) { %>browserify: {
    extensions: ['.coffee'],
    transforms: {
      coffeeify: true
    }
  },
  <% } %>imagemin: {
    enabled: false
  },
  substituter: extend(true, substituteConfig, {
    // cdn: '/', // uncomment if you are using absolute paths
    livereload: function() {
      var liveReloadPort = pho.config.livereload;
      return "<script>document.write('<script src=\"http://' + (location.host || 'localhost').split(':')[0] + ':" + liveReloadPort + "/livereload.js?snipver=1\"></' + 'script>')</script>";
    }
  }),
  copy: ['images/sprites/**/*', 'humans.txt'<% if (angular) { %>, 'bower_components/angular/**/*.{js,map}'<% } %>]
});

// If needed, redefine tasks here
<% if (sass) { %>require('./sass-support')(pho);
<% } %>
