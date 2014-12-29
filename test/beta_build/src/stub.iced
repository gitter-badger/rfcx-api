

describe "booting up in example", ->
  it "should be cool", (done)->
    setTimeout ->
      c "it's cool"
      done()
    , 5000