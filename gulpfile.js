var gulp = require("gulp");
var inject = require("gulp-inject"); //for injecting js or css files
var sass = require("gulp-sass"); //for parsing sass to css
var browserSync = require("browser-sync");
var reload = browserSync.reload;

//gulp create a server
gulp.task("serve", ["parseSass"],function(){

  gulp.start("parseSass");
  //gulp.start("loadScriptsAndCSS");

  browserSync({
    server:{  //create server
      baseDir: "."//set the dir for index.html
    }
  });

  //watch for changes in html and reload
  gulp.watch("*.html",reload);

});

//gulp.watch for live reloading
gulp.watch(['./app/*.scss', './app/components/*/*.scss', './app/components/*/*/*.scss'], ["parseSass"]);

//inject .js and .css to index.html
// gulp.task("loadScriptsAndCSS", function(){

//   var target = gulp.src('./index.html');
//   var sources = gulp.src(['./app/*.js', './app/components/*.js', './app/components/*/*/*.js', './assets/css/*/*.css', './assets/css/*/*/*.css'], {read: false});

//   return target.pipe(inject(sources))
//     .pipe(gulp.dest('./'));

// });

//parse scss to css
gulp.task("parseSass",function(){

  var source = gulp.src(['./app/*.scss', './app/components/*/*.scss', './app/components/*/*/*.scss']);
  source.pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest("./assets/css"));

  reload(); //each time after parsing, reload

});
