// "use strict";
// // var JwtStrategy = require('passport-jwt').Strategy,
// //   ExtractJwt = require('passport-jwt').ExtractJwt,
//  var FacebookStrategy = require('passport-facebook').Strategy,
//   GoogleTokenStrategy = require('passport-google-token').Strategy,
//   GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
//   FacebookTokenStrategy = require('passport-facebook-token');


// // load up the user model
// var User = require('../models/user');
// var config = require('./db');
// // load the auth variables
// var configAuth = require('./auth');
// // var logger = require('./logger');
// var util = require('util');

// module.exports = function (passport) {
//   // console.log("passport",passport);

//   // used to serialize the user for the session
//   passport.serializeUser(function (user, done) {
//     // console.log("no login");
//     done(null, user.id);
//   });

//   // used to deserialize the user
//   passport.deserializeUser(function (id, done) {
//     // console.log("no login");
//     User.findById(id, function (err, user) {
//       done(err, user);
//     });
//   });

//   // JWT
// //   var opts = {};
// //   opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("Bearer");
// //   opts.secretOrKey = config.secret;
// //   opts.passReqToCallback = true;
// //   passport.use(new JwtStrategy(opts, function (req, jwt_payload, done) {
// //     User.findOne({ _id: jwt_payload.id, token: "Bearer " + opts.jwtFromRequest(req), isBanned: false })
// //       .select('-password -google -token -braintree_customer_id ')
// //       .exec(function (err, user) {
// //         if (err) {
// //           return done(err, false);
// //         }
// //         if (user) {
// //           done(null, user);
// //         } else {
// //           done(null, false);
// //         }
// //       });
// //   }));

//   passport.use(new FacebookStrategy({
//     clientID: configAuth.facebookAuth.clientID,
//     clientSecret: configAuth.facebookAuth.clientSecret,
//     callbackURL: configAuth.facebookAuth.callbackURL,
//     profileFields: ['id', 'first_name', 'last_name', 'email']
//   },
//     // facebook will send back the token and profile
//     function (accessToken, refreshToken, profile, done) {
//       // console.log("accessToken of fb",accessToken);
//       // asynchronous
//       process.nextTick(function () {
//         // find the user in the database based on their facebook id
//         User.findOne({ 'email': profile.email }, function (err, user) {
//           // if there is an error, stop everything and return that
//           // ie an error connecting to the database
//           if (err)
//             return done(err);

//           // if the user is found, then log them in
//           if (user) {
//             return done(null, user); // user found, return that user
//           } else {
//             // if there is no user found with that facebook id, create them
//             var newUser = new User();

//             // set all of the facebook information in our user model
//             newUser.facebook_id = profile.id;
//             newUser.first_name = profile.first_name;
//             newUser.last_name = profile.last_name;
//             newUser.email = profile.email; // facebook can return multiple emails so we'll take the first

//             // save our user to the database
//             newUser.save(function (err) {
//               if (err)
//                 throw err;

//               // if successful, return the new user
//               return done(null, newUser);
//             });
//           }

//         });
//       });

//     }));

//   passport.use(new FacebookTokenStrategy({
//     clientID: configAuth.facebookAuth.clientID,
//     clientSecret: configAuth.facebookAuth.clientSecret,
//     profileFields: ['id', 'first_name', 'last_name', 'email', 'picture']
//   },
//     function (accessToken, refreshToken, profile, done) {
//       // asynchronous
//       process.nextTick(function () {
//         profile = profile["_json"];
//         // logger.info("========profile========", profile);
//         // find the user in the database based on their facebook id
//         let query = { $or: [{ 'facebook.id': profile.id }] };
//         if (profile.email) {
//           query.$or.push({ 'email': profile.email })
//         }
//         User.findOne(query, function (err, user) {
//           // if there is an error, stop everything and return that
//           // ie an error connecting to the database
//           if (err)
//             return done(err);

//           // if the user is found, then log them in
//           if (user) {
//             user.facebook = {
//               id: profile.id,
//             }
//             if (user.avatar) {
//               return done(null, user); // user found, return that user
//             } else {
//               user.avatar = util.format('http://graph.facebook.com/%s/picture?type=large', profile.id);
//               user.save(function (err, data) {
//                 if (err)
//                   throw err;

//                 // if successful, return the user
//                 return done(null, data);
//               });
//             }

//           } else {
//             // if there is no user found with that facebook id, create them
//             var newUser = new User();

//             // set all of the facebook information in our user model
//             newUser.facebook.id = profile.id;
//             newUser.facebook.token = accessToken;
//             newUser.first_name = profile.first_name;
//             newUser.last_name = profile.last_name;
//             newUser.email = profile.email;
//             newUser.avatar = util.format('http://graph.facebook.com/%s/picture?type=large', profile.id);
//             newUser.is_new = true;

//             // save our user to the database
//             newUser.save(function (err) {
//               if (err)
//                 throw err;

//               // if successful, return the new user
//               return done(null, newUser);
//             });
//           }

//         });
//       });
//     }));

// //   passport.use(new GoogleTokenStrategy({
// //     clientID: configAuth.googleAuth.clientID,
// //     clientSecret: configAuth.googleAuth.clientSecret
// //   },
// //     function (accessToken, refreshToken, profile, done) {
// //       // info("=========profile============: ", profile);
// //       process.nextTick(function () {
// //         profile = profile["_json"];
// //         // logger.info("=========profile============: ", profile);
// //         // find the user in the database based on their facebook id
// //         User.findOne({ 'email': profile.email }, function (err, user) {
// //           // if there is an error, stop everything and return that
// //           // ie an error connecting to the database
// //           if (err)
// //             return done(err);

// //           // if the user is found, then log them in
// //           if (user) {
// //             return done(null, user); // user found, return that user
// //           } else {
// //             // if there is no user found with that facebook id, create them
// //             var newUser = new User();

// //             // set all of the facebook information in our user model
// //             newUser.facebook.id = profile.id;
// //             newUser.facebook.token = accessToken;
// //             newUser.first_name = profile.given_name;
// //             newUser.last_name = profile.family_name;
// //             newUser.email = profile.email;
// //             newUser.avatar = profile.picture

// //             // save our user to the database
// //             newUser.save(function (err) {
// //               if (err)
// //                 throw err;

// //               // if successful, return the new user
// //               return done(null, newUser);
// //             });
// //           }

// //         });
// //       });

// //     }));

// //   passport.use(new GoogleStrategy({
// //     clientID: configAuth.googleAuth.clientID,
// //     clientSecret: configAuth.googleAuth.clientSecret,
// //     callbackURL: configAuth.googleAuth.callbackURL
// //   },
// //     function (accessToken, tokenSecret, profile, done) {
// //       process.nextTick(function () {
// //         var email = profile.emails[0].value;
// //         // console.log("google accessToken: ", accessToken);
// //         User.findOne({ 'email': email }, function (err, user) {
// //           if (err) {
// //             return done(err);
// //           }

// //           if (user) {
// //             return done(null, user);
// //           } else {
// //             // if there is no user found with that facebook id, create them
// //             var newUser = new User();

// //             // set all of the facebook information in our user model
// //             newUser.google.id = profile.id;
// //             newUser.google.token = accessToken;
// //             newUser.first_name = profile.name.givenName;
// //             newUser.last_name = profile.name.familyName;
// //             newUser.email = profile.emails[0].value;

// //             // save our user to the database
// //             newUser.save(function (err) {
// //               if (err)
// //                 throw err;

// //               // if successful, return the new user
// //               return done(null, newUser);
// //             });
// //           }
// //         });
// //       })
// //     })
// //   );
// };
