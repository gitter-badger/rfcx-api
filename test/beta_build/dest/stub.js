(function() {
  describe("booting up in example", function() {
    return it("should be cool", function(done) {
      return setTimeout(function() {
        c("it's cool");
        return done();
      }, 5);
    });
  });

  describe('something with supertest<-->express', function() {
    it("should get the endpoint", function(done) {
      request(app).get("/v1/users/gate").expect(200).end(function(err, res) {
        return c("res on gate get", err, res, res.body);
      });
      return done();
    });
    return it("should be able to login with good credences", function(done) {
      request(app).post("/v1/users/gate").send({
        username: 'wylie',
        password: 'snth'
      }).expect('good').end(function(err, res) {
        return c(err, res);
      });
      return done();
    });
  });

}).call(this);
