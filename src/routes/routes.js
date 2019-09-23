module.exports = (fastify, opts, next) => {
    const di = fastify.node_di();

    console.log('---fastify',fastify);

    const {
        authHandlerSchema,
        _joi
    } = di.cradle;

    console.log('auth shcema',authHandlerSchema);

    const schemaCompiler = schema => data => _joi.validate(data,schema);

    fastify.route({...authHandlerSchema.getUser(),schemaCompiler});

    fastify.route({...authHandlerSchema.welcome()});

    
    next();

};