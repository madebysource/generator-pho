// For all available options, see node_modules/pho-dev-stack/config.js
require('pho-dev-stack')({
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
    markupMain: 'index.html',
    scriptMain: 'main.js',
    styleMain: 'main.less',
    scriptFiles: '**/*.js',
    styleFiles: '**/*.less'
  },
});

// If needed, redefine tasks here