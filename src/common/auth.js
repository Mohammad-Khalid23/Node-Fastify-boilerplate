// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth': {
        'clientID': process.env.FACEBOOK_API_KEY, // your App ID
        'clientSecret': process.env.FACEBOOK_API_SECRET, // your App Secret
        'callbackURL': 'http://localhost:3000/auth/facebook/callback'
    },

    'twitterAuth': {
        'consumerKey': 'your-consumer-key-here',
        'consumerSecret': 'your-client-secret-here',
        'callbackURL': 'http://localhost:3000/auth/twitter/callback'
    },

    'googleAuth': {
        'clientID': '',
        'clientSecret': '',
        'callbackURL': 'http://localhost:3000/auth/google/callback'
    },
    'linkedIn': {
        'clientID': '',
        'clientSecret': '',
        'callbackURL': 'http://localhost:3000/auth/linkedIn/callback'
    },

    geocoding: {
        apiKey: ''
    },
    adminEmail: {
        email: 'hello@rentit.com'
    }
};
