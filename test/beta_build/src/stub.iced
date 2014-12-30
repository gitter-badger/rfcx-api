

describe "booting up in example", ->
  it "should be cool", (done)->
    setTimeout ->
      c "it's cool"
      done()
    , 5

describe 'something with supertest<-->express', ->
  it "should get the endpoint", (done)->
    #scope= nock('localhost:8080')
      #.get('/v1/users/gate')
    request(app)
      .get("/v1/users/gate")
      .expect(200)
      .end (err, res)->
        c "res on gate get", err, res, res.body
    done()
  it "should be able to login with good credences", (done)->
    request(app)
      .post("/v1/users/gate")
      .send username: 'wylie', password: 'snth'
      .expect('good')
      .end (err, res)->
        c err, res
    done()