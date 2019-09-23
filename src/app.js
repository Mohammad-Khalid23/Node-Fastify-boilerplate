const fastify = require('fastify');
const hapiJoi = require('@hapi/joi');
const fastifyBoom = require('fastify-boom');
const awilix = require('awilix');
const helpers = require('./helpers');
const routes = require('./routes/routes');


// creating dependency injection container
const container = awilix.createContainer({
    injectionMode:awilix.InjectionMode.CLASSIC
});


//configuring dependency injections
const configureDI = async (server) => {
    console.log('------Configuring Awilix-------');

    container.register({
        _logger: awilix.asValue(server.log),
        helpers: awilix.asValue(helpers),
        _joi: awilix.asFunction(() => hapiJoi).singleton()
    });

    container.loadModules(
        [

            './schema/body/*.js',
            './models/*.js',
            './services/*.js',
            [
                './schema/*.js',
                {
                    register: awilix.asClass,
                    lifetime: awilix.Lifetime.SINGLETON,
                    injector: () => ({ _handler: requestHandler }),
                },
            ],
        ],
        {
            cwd: __dirname,
            formatName: 'camelCase',
            resolverOptions: {
                lifetime: awilix.Lifetime.SINGLETON, //resolve option is using to auto loading modules
                register: awilix.asClass,
            },
        }
    );
};

const middlewares = async (server) => {

    server.register(fastifyBoom); //injection fastisyBoom in fastify instance

    server.decorate('node_di', () => container); //injecting awilix dependency injection in fastify instance

    /* more modules can be inject */
};

const routing = async (server) => {
    const apiPrefix = server.node_di();

    server.register(routes, { prefix: '/v1' });
};

module.exports = (process)=>{
    const server = fastify({
        logger: { level: 10 },
        prettyPrint: true,
    });

    const start = async ()=>{
        try {
            console.log('started server')
            await configureDI(server);
            await middlewares(server);
            await routing(server);
            await server.listen(8000);
        } catch (error) {
            console.log('-----Error in starting server-----',error);
        }
    };

    start();
};