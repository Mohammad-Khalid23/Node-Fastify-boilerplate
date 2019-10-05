const mongodb = require('./mongodb');

module.exports = (server, config) => ({
    db: mongodb(server, config)
})