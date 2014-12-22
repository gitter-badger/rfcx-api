

rename= require 'gulp-rename'
ignore= require 'gulp-ignore'
changed= require 'gulp-changed'
coffee= require 'gulp-coffee'
gulp= require 'gulp'


gulp.task 'coffee-mocha', ->
  gulp.src('./_cafe_src/') # 


gulp.task 'coffee-sketch', ->
  gulp.src('./_cafe_src/sketch/**/*.coffee')
  #gulp.dest   will be ./_cafe_sketch_dest/


gulp.task 'coffee-hard-write', ->
  gulp.src # _cafe_src/hard-write/**/*.coffee

# send the destination files 


gulp.task 'iced-sketch', ->


gulp.task 'iced-hard-write', ->