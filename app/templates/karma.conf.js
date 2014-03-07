module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],

    files: [
      'src/bower_components/angular/angular.js',
      'dist/scripts/*.js',

      'spec/unit/exampleSpec.js'
    ],

    exclude: [
    ],

    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,

    browsers: ['Chrome']
  });
};
