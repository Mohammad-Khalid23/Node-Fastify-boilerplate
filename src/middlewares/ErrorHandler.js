const fp = require('fastify-plugin');

const errorHandler = (fastify, opt, next) => {

    fastify.setErrorHandler((error, request, reply) => {
        Console.log('Error ',error);
    });
    next();
};

module.exports = fp(errorHandler,{
    name:'node-errorHandler',
    fastify:'2.x'
})
