

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
        #c "res on gate get", err, res, res.body
    done()
  it "should be able to login with good credences", (done)->
    request(app)
      .post("/v1/users/gate")
      .send username: 'wylie', password: 'snth'
      #.expect('good')
      .end (err, res)->
        #c err, res
        #expect (_.has(res.body, 'tokeen'))
        assert (_.has(res.body, 'tokeen')) is false
        assert (_.has(res.body, 'token')) is true
        global.goodToken= res.body.token
        done()
  it "go to jwt test with the token", (done)->
    request(app)
      .get("/v1/users/jwt_test?token=#{goodToken}")
      .end (err, res)->
        #c "res on jwt_test", res
        res.text.should.equal 'good'
        done()