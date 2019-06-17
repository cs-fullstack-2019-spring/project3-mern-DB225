var express = require('express');
var router = express.Router();
var userTweetCollection = require('../models/TweetSchema');

var bCrypt = require('bcrypt-nodejs');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  userTweetCollection.findById(id, function(err, user) {
    done(err, user);
  });
});

var isValidPassword = function(user, password){
  return bCrypt.compareSync(password, user.password);
};

var createHash = function(password){
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};


/*******************************************************/
/**************** REGISTERING / NEW USER **************/
/*******************************************************/

//Build the strategy
passport.use('signup', new LocalStrategy(
    {passReqToCallback : true},
    function(req, username, password, done) {
      findOrCreateUser = function(){
        userTweetCollection.findOne({'username':username},function(err, user) {
          if (err){
            console.log('Error in SignUp: '+err);
            return done(err);
          }
          // if the user already exists
          if (user) {
            console.log('User already exists');
            return done(null, false,
                { message: 'User already exists.' }
            );
          } else {
            console.log(req.body);
            // create the user
            var newUser = new userTweetCollection();
            // set the user's local credentials
            newUser.username = req.body.username;
            newUser.password = createHash(req.body.password);
            newUser.image = req.body.image;
            newUser.background_image = req.body.background_image;

            // save the user. Works like .create, but for an object of a schema
            newUser.save(function(err) {
              if (err){
                console.log('Error in Saving user: '+err);
                throw err;
              }
              console.log('User Registration succesful');

              return done(null, newUser);
            });
          }
        });
      };
      process.nextTick(findOrCreateUser);
    })
);

//route to create the new user
router.post('/newuser',
    passport.authenticate('signup',
        {failureRedirect: '/users/failNewUser'}
    ),
    // If the signup strategy is successful, send "User Created!!!"
    function(req, res) {
      res.send('GOOD JOB!!!');
    });

// If a new user signup strategy failed, it's redirected to this route
router.get('/failNewUser', (req, res)=>{
  res.send('Failure..!!!');
});


//******************************************************************
// ***************   Check if a user exists    *********************
//******************************************************************

// This is the "strategy" for checking for an existing user. If we don't assign a name to the strategy it defaults to local
passport.use(new LocalStrategy(
    function(username, password, done) {
      console.log("Local Strat");
      // find a user in Mongo with provided username. It returns an error if there is an error or the full entry for that user
      userTweetCollection.findOne({ username: username }, function (err, user) {
        // If there is a MongoDB/Mongoose error, send the error
        if (err) {console.log("1");
          return done(err); }
        // If there is not a user in the database, it's a failure and send the message below
        if (!user) {
          console.log("2");
          return done(null, false, { message: 'Incorrect username.' });
        }
        // Check to see if the password typed into the form and the user's saved password is the same.
        if (!isValidPassword(user, password)) {
          console.log("3");
          return done(null, false, { message: 'Incorrect password.' });
        }
        console.log("4");
        console.log(user);
        return done(null, user, { user: user.username });
      });
    }
));

// If someone tries to login, run this route.
router.post('/',
    passport.authenticate('local',
        {failureRedirect: '/users/loginfail' }),

    // If this function gets called, authentication was successful.
    function(req, res) {
      console.log(req.body);
      req.session.username=req.user.username;
      res.send({
          username: req.user.username,
          image:req.user.image,
          background_image:req.user.background_image,
      });
    });

// If the route authentication fails send an empty collection
router.get('/loginfail', (req, res)=>{
  res.send({});
});

// This route is called when the use clicks the Log Out button and is used to clear the cookies
router.get('/', (req, res, next) => {
  console.log(req.session);
  // Clearing the session (cookie) to get rid of the saved username
  req.session = null;
});


//Show the personal tweets
router.post('/mytweets', (req, res)=>{
    // finds one user name from the cookie (session) data
    userTweetCollection.findOne({username: req.body.username}, (errors, results)=>{
        // If there are returned results from finding a user, the results are returned to the client (res.send)
        console.log(req.body.username);
        if(results){ return res.send(results); }
        else{return res.send({message: "Didn't find a user!!!"})}
    })
});

router.post('/allTweets', (req,res)=>{
    userTweetCollection.find({}, (errors,results)=>{
        if(errors) res.send(errors);
        else res.send(results)
    })
});

// This is from fetch '/users/addTweet' run from the client side as a post.
router.post('/addTweet', (req,res)=>{
    userTweetCollection.findOneAndUpdate({username: req.body.username},
        {$push: {tweet: req.body.tweet}}, (errors, results)=>{
        console.log(req.body);
        console.log(req.body.tweet);
            if(errors) res.send(errors);
            else res.send("DONE!!!");
        });
});

//Edit a tweet
router.post('/editTweet', (req,res)=>{
    userTweetCollection.findOneAndUpdate(
        {_id: req.body.tweet},
        {
            $set: {
                'inputText.$': req.body.inputText,
                'image.$': req.body.image,
            }
        },
        (errors, results)=>{
            if(errors) res.send(errors);
            else res.send("Updated");
        });
});


router.post('/searchUsers', (req, res) => {
    userTweetCollection.findOne({username: req.body.username}, (errors, results) => {
        if (errors) res.send(errors);
        else {
            res.send(results);
            console.log(results)
        }
    })
});

router.post('/search', (req, res) => {
    userTweetCollection.find(
        {"tweet.inputText": {"$regex": req.body.searchBar, "$options": "i"}}, (errors, results) => {
            if (errors) res.send(errors);
            else {
                let allresults = [];
                let searchResults = [];
                for (let i = 0; i < results.length; i++) {
                    for (let j = 0; j < results[i].tweet.length; j++) {
                        allresults.push(
                            {
                                inputText:results[i].tweet[j].inputText,
                                image:results[i].tweet[j].image,
                            }
                        )
                    }
                }
                for(let i=0; i<allresults.length; i++){
                    if(allresults[i].inputText.includes(req.body.searchBar)){
                        searchResults.push(allresults[i])
                    }
                }
                res.send(searchResults);
            }
        })
});



module.exports = router;
