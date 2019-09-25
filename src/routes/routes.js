module.exports = (fastify, opts, next) => {
    const di = fastify.node_di();

    console.log('---fastify',fastify);

    const {
        userHandlerSchema,
        _joi
    } = di.cradle;

    console.log('auth shcema',userHandlerSchema);

    const schemaCompiler = schema => data => _joi.validate(data,schema);

    fastify.route({...userHandlerSchema.createUser(),schemaCompiler});

    fastify.route({...userHandlerSchema.welcome()});

    
    next();

};