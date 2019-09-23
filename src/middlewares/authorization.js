// const Session = require('../models/session');


// exports.authenticate = (req, res, next) => {
//     console.log(req,"Check Authorized")
//     if (req && req.headers) {
//         let header = req.headers;
//         if (header.authorization) {
//             let token = header.authorization;
//             Session.findOne({ access_token: token }).populate("user_id").then(result => {
//                 console.log(result,"response of session checking")
//                if(result){
//                    req.user = result._doc.user_id;
//                    next()
//                } else {
//                    res.status(401).json({
//                        message: "Unauthorize User"
//                    })
//                }
//             }).catch(err => {
//                     res.status(401).json({
//                         error: err,
//                         message:"Unauthorizes"
//                     })
//                 })
//         } else {
//             res.status(401).json({
//                 message: "Unauthorizes"
//             })
//         }
//     }else{
//         console.log("nosd")
//     }
// }
