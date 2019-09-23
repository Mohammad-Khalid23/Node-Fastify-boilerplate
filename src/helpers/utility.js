'use strict';

const ITERATIONS = 1000,
    secureKey = "bspZmdcJJ5",
    BYTES = 32,
    jwt = require('jsonwebtoken'),
    // configs = require('../../config'),
    // sendgrid = require('sendgrid')(configs.sendgrid.secret),
    // sendgridHelper = require('sendgrid').mail;
    bcrypt = require('bcrypt'),
    // const sgMail = require('@sendgrid/mail');
    // sgMail.setApiKey('send grid api key will me here');
    moment = require('moment');
var randtoken = require('rand-token');

module.exports.generateToken = () => {
    const token1 = randtoken.generate(16),
        token2 = randtoken.generate(16),
        token3 = randtoken.generate(16);
    console.log(token1 + token2 + token3, "Token");
    return token1 + token2 + token3;
}

module.exports.generate_JWT_Token = (email) => {
    let token = jwt.sign({
        email: email
    }, 'secret', { expiresIn: '5 days' });
    return 'Bearer ' + token;
}

module.exports.validate_JWT_Token = (email) => {
    let token = jwt.sign({
        email: email
    }, 'secret', { expiresIn: '5 days' });
    return 'Bearer ' + token;
}

module.exports.validatePassword = (password) => {
    var regex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
    return regex.test(password);
}

module.exports.validateName = (name) => {
    var regexp = new RegExp(/^[a-z,',-]+/i);
    return regexp.test(name)
}

module.exports.validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

module.exports.validateDoB = (date) => {
    var currentTime = moment(new Date(), 'YYYY,MM,DD');
    let dob = moment(new Date(date), 'YYYY,MM,DD');
    var a = moment(currentTime);
    var b = moment(dob);
    console.log(a.diff(b, 'years'), "DIFFERANCE")
    console.log(dob);
    let diff = a.diff(b, 'years');
    if (diff < 5) {
        console.log("You are not eligible");
        return false;
    } else {
        console.log("You are eligible");
        return true;
    }
}


module.exports.hashPassword = (password) => {
    // Generate a salt
    var salt = bcrypt.genSaltSync(16);
    // Hash the password with the salt
    var hash = bcrypt.hashSync(password, salt);
    return hash;
}

module.exports.comparePassword = (password, hash, cb) => {
    bcrypt.compare(password, hash, function (err, res) {
        return cb(res, err)
    });
}

// module.exports.sendMail = (to, from, msg, token) => {
//     console.log(token, "Token in send mail");
//     const resetPassword = {
//         to: to,
//         from: from,
//         subject: 'Reser your password',
//         link: token,
//         html: '<h2>Welcome to Learning Node</h2><div>Click Link Below to Reset your password</div><a href="www.google.com" target="_blank">Click to Reset Password</a>',
//     };
//     const verifyEmail = {
//         to: to,
//         from: from,
//         subject: 'Confirm your Email',
//         link: token,
//         html: '<h2>Welcome to Learning Node</h2><div>Click Link Below to Reset your password</div><a href="www.google.com" target="_blank">Click to Reset Password</a>',
//     };
//     if (msg === 'verify') {
//         sgMail.send(verifyEmail);
//     } else {
//         sgMail.send(resetPassword);
//     }
// }


// ===================================
// Check Require Fields
module.exports.checkRequire = (data, req_fields, cb) => {
    var non_existField = null;

    req_fields.forEach((value) => {
        if (data[value] == '' || data[value] == null || !data[value]) {
            non_existField = value;
            return true;
        }
    });

    if (non_existField != null) {
        cb({
            code: 400,
            success: false,
            message: non_existField+" Not Found",
            key: non_existField
        });
    } else {
        cb(false)
    }

}
// End
// ===================================

// ===================================
// Success Response
module.exports.successResponse = (data, req_fields) => {
    console.log("\x1b[34m", "------------------------------------");
    console.log("\x1b[0m", "== > Method", "app.services._successResponse");
    console.log('== > DateTime', new Date());
    console.log("== > data", JSON.stringify(data));
    console.log("\x1b[34m", "------------------------------------\n \n");
    console.log("\x1b[0m")
    var _responseData = {};
    if (data) {
        req_fields.forEach((value) => {
            if (data[value]) {
                _responseData[value] = data[value];
            }
        });
    }

    return (_responseData);
}
// End
// ===================================

// ===================================
// Error Response
module.exports.errorResponse = (error) => {
    console.log("\x1b[34m", "------------------------------------");
    console.log("== > Method", "app.services._errorResponse");
    console.log('== > DateTime', new Date());
    console.log("== > error", JSON.stringify(error));
    console.log("\x1b[34m", "------------------------------------\n \n");
    console.log("\x1b[0m")
    if (error.code == 11000) {
        return ({
            code: 409,
            success: false,
            message: error.message
        });
    } else {
        return ({
            code: 409,
            success: false,
            message: 'Duplicate entity require unique'
        })
    }
}
// End
// ===================================


// ===================================
// Check Exist Item
// module.exports.encryptPassword = (password, callBack) => {

//     console.log("\x1b[34m", "------------------------------------");
//     console.log("== > Method", "app.services._encryptPassword");
//     console.log('== > DateTime', new Date());
//     console.log("== > data", password);
//     console.log("\x1b[34m", "------------------------------------\n \n");
//     console.log("\x1b[0m");
//     crypto.pbkdf2(password, secureKey, ITERATIONS, BYTES, 'sha1', (err, derivedKey) => {
//         if (err) {
//             callBack(err);
//         } else {
//             var hexEncodedKey = new Buffer(derivedKey).toString('hex');
//             callBack(null, hexEncodedKey);
//         }
//     });
// }

// End
// ===================================

// module.exports.comparePassword = (password, db_hashPassword, cb) => {
//     encryptPassword(password, (err, hash) => {
//         if (hash & hash === db_hashPassword) {
//             cb(true);
//         }
//         else {
//             cb(false)
//         }
//     })
// }

// ===================================
// Only allow specific fileds
module.exports.onlyAllow = (_data_sample, _data) => {
    var allowData = {};
    for (var key in _data_sample) {
        if (typeof _data[key] == _data_sample[key]) {
            allowData[key] = _data[key];
        }
    }

    return allowData;
}
// const _sendMail = (to, from, content, subject, toSubstitute, templateId, cb) => {
//     content = content || ' ';
//     let from_email = new sendgridHelper.Email(from);
//     let to_email = new sendgridHelper.Email(to);
//     let contentObj = new sendgridHelper.Content('text/html', content);
//     let mail = new sendgridHelper.Mail(from_email, subject, to_email, contentObj);
//     if (toSubstitute) {
//         for (let prop in toSubstitute) {
//             if (toSubstitute.hasOwnProperty(prop))
//                 mail.personalizations[0].addSubstitution(
//                     new sendgridHelper.Substitution('-' + prop + '-', toSubstitute[prop]));
//         }
//     }
//     if (templateId) {
//         mail.setTemplateId(templateId);
//     }
//     let request = sendgrid.emptyRequest({
//         method: 'POST',
//         path: '/v3/mail/send',
//         body: mail.toJSON()
//     });
//     sendgrid.API(request, function (error, response) {
//         if (error) {
//             cb(error);
//         }
//         else {
//             cb(null, response);
//         }
//     });
// }

