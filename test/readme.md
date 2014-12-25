

#### mocha / chai unit testing.

- introducing some coffee files in source form



#### example calls for vJS

`mocha "./test/master_build/**/*.iced" --timeout 10000 --require test/master_build/init.js`




#### example calls 
_(these with cS; will also test vJS on the core, just getting started here )_



`mocha --compilers coffee:iced-coffee-script/register "./test/alpha_build/_cafe_sketch_src/**/*.iced" --timeout 10000 --require test/alpha_build/init.coffee`