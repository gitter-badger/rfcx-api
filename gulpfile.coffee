rename= require 'gulp-rename'
ignore= require 'gulp-ignore'
changed= require 'gulp-changed'
coffee= require 'gulp-coffee'
iced= require 'gulp-iced-coffee'
gulp= require 'gulp'

paths=
  coffee_mocha_src: './test/_cafe/src/**/*.coffee'
  coffee_mocha_dest: './test/_cafe/build/'
  coffee_refactor_src: './_cafe/refactor_src/**/*.coffee'
  coffee_refactor_dest: './_cafe/refactor_stage-build/'
  coffee_sketch_src: './_cafe/sketch_src/**/*.coffee'
  coffee_sketch_dest: './_cafe/sketch_dest/'

mochaPaths=
  src: './test/beta_build/src/**/*.iced'
  dest: './test/beta_build/dest'


gulp.task 'iced_test_beta_build', ->
  gulp.src(mochaPaths.src)
    .pipe(changed(mochaPaths.dest, hasChanged: changed.compareSha1Digest))
    .pipe(iced(bare: false))
    .pipe(gulp.dest(mochaPaths.dest))
  gulp.src('./test/beta_build/init.coffee')
    #.pipe(changed('./test/beta_build/', hasChanged: changed.compareSha1Digest))
    .pipe(coffee(bare: false))
    .pipe(gulp.dest('./test/beta_build/'))

gulp.task 'coffee-refactor', ->
  gulp.src(paths.coffee_refactor_src)
    .pipe(changed(paths.coffee_refactor_dest, {hasChanged: changed.compareSha1Digest}))
    .pipe(coffee({bare: false}))
    .pipe(gulp.dest(paths.coffee_refactor_dest))

gulp.task 'coffee-sketch', ->
  gulp.src(paths.coffee_sketch_src)
    .pipe(changed(paths.coffee_sketch_dest, {hasChanged: changed.compareSha1Digest}))
    .pipe(coffee({bare: false}))
    .pipe(gulp.dest(paths.coffee_sketch_dest))


gulp.task 'watch-refactor', ->
  gulp.watch(paths.coffee_refactor_src, ['coffee-refactor'])

gulp.task 'watch-sketch', ->
  gulp.watch(paths.coffee_sketch_src, ['coffee-sketch'])




gulp.task 'coffee-mocha', ->


gulp.task 'coffee-hard-write', ->


# send the destination files 


gulp.task 'iced-sketch', ->


gulp.task 'iced-hard-write', ->