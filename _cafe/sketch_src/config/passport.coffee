# config passport config
c= console.log
LocalStrategy= require('passport-local').Strategy
#User= require('../app/models/user')

module.exports= (passport)->
  c "here"


  #passport.use 'local-signup', 

  # passport.serializeUser(function(user,done){
  #   done(null,user.id);
  # });

  # passport.deserializeUser(function(id,done){
  #   User.findById(id,function(err,user){
  #     done(err,user);
  #   });
  # });

  # passport.use('local‐signup',new LocalStrategy({
  #   usernameField:'email',
  #   passwordField:'password',
  #   passReqToCallback:true
  # }, function(req,email,password,done){
  #   process.nextTick(function(){
  #     User.findOne({'local.email': email},function(err,user){
  #       if (err) return done(err);
  #       if (user){
  #         return done(null,false,req.flash('signupMessage','Thatemail isalreadytaken.'));
  #       } else {
  #         var newUser = new User();
  #         newUser.local.email = email;
  #         newUser.local.password = newUser.generateHash(password);
  #         newUser.save(function(err){
  #           if (err) throw err;
  #           return done(null,newUser);
  #         });
  #       }
  #     });
  #   })
  # }));
