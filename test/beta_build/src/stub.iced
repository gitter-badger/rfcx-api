

describe "booting up in example", ->
  it "should be cool", (done)->
    setTimeout ->
      c "it's cool"
      done()
    , 5000

describe 'something with supertest<-->express', ->
  it "should get the endpoint", (done)->
    #scope= nock('localhost:8080')
      #.get('/v1/users/gate')
    request(app)
      .get("localhost:8080/v1/users/gate")
      .expect(200)
    done()
  it "should be able to login with good credences", (done)->
    request(app)
      .post("localhost:8080/v1/users/gate")
      .set('username', 'wylie')
      .set('password', 'snth')
      .expect('good')
    done()