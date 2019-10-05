 module.exports.userDetails = async function userDetails(request, rule, fastify) {
    const di = fastify.node_di().cradle;

    const { user } = request;

    console.log('Request',request);

};

module.exports.createUser = async function userDetails(request, reply, fastify) {
    const di = fastify.node_di().cradle;

    const { user } = request;

    console.log('Request',request);

};