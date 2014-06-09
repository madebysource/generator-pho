// styles task override for Sass
module.exports = function (pho) {
  var gulp = require('gulp');
  var path = require('path');
  var gulpSass = require('gulp-sass');

  var $ = pho.$;
  var cache = pho.cache;
  var config = pho.config;

  var sassConfig = {
    /* SASS style file compilation */
    enabled: true,
      errLogToConsole: false,
      includePaths: [               // directories for locating Sass files
      'src/styles/',
      'src/bower_components/'
    ],
    outputStyle: 'compressed'
  };

  gulp.task('styles', function(cb) {
    if (cache.isClean('styles')) { return cb(); }
    cache.setClean('styles');

    var spriteFilter = $.filter('**/*.png');
    var cssFilter = $.filter('**/*.css');

    gulp.src(path.join(config.dist.styleDir, config.dist.styleFiles), { read: false })
      .pipe($.clean())
      .on('end', function() {
        gulp.src(path.join(config.src.styleDir, config.src.styleMain))
          .pipe($.plumber(config.plumber))
          .pipe(gulpSass(sassConfig))
          .on('error', function () {
            // continous error reporting hack
            cb(null);
          })
          .pipe($.base64(config.base64))

          .pipe($.spritesPreprocessor(config.spritesPreprocessor))
          .pipe(spriteFilter)
          .pipe(gulp.dest(config.dist.spriteDir))
          .pipe(spriteFilter.restore())

          .pipe(cssFilter)
          .pipe($.rename({ suffix: '-' + Date.now().toString() }))
          .pipe(gulp.dest(config.dist.styleDir))
          .on('end', cb);
      });
  });
};
