rename= require 'gulp-rename'
ignore= require 'gulp-ignore'
changed= require 'gulp-changed'
coffee= require 'gulp-coffee'
gulp= require 'gulp'


paths=
  coffee_sketch_src: './_cafe/sketch_src/**/*.coffee'
  coffee_sketch_dest: './_cafe/sketch_dest/'



gulp.task 'coffee-sketch', ->
  gulp.src(paths.coffee_sketch_src)
    .pipe(changed(paths.coffee_sketch_dest, {hasChanged: changed.compareSha1Digest}))
    .pipe(coffee({bare: false}))
    .pipe(gulp.dest(paths.coffee_sketch_dest))


gulp.task 'watch', ->
  gulp.watch(paths.coffee_sketch_src, ['coffee-sketch'])




gulp.task 'coffee-mocha', ->


gulp.task 'coffee-hard-write', ->


# send the destination files 


gulp.task 'iced-sketch', ->


gulp.task 'iced-hard-write', ->