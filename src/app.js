const fastify = require('fastify');
const hapiJOI = require('@hapi/joi');
// hapiJOI.objectId = require('joi-objectid')(hapiJOI);
const fastifyBoom = require('fastify-boom');
const awilix = require('awilix');
const mongoose = require('mongoose');
const helpers = require('./helpers');
const routes = require('./routes/routes');
const requestHandler = require('./handlers/index');
const errorHandler = require('./middlewares/ErrorHandler');
const adapters = require('./adapters/index');

// creating dependency injection container
const container = awilix.createContainer({
    injectionMode:awilix.InjectionMode.CLASSIC
});

const initAdapter  = async(logger)=>await adapters(logger);

//configuring dependency injections
const configureDI = async (server) => {
    console.log('------Configuring Awilix-------');
    const dbAdapter = await initAdapter(server.log);

    container.register({
        _logger: awilix.asValue(server.log),
        // helpers: awilix.asValue(helpers),
        mongoose : awilix.asValue(mongoose),
        _joi: awilix.asFunction(() => hapiJOI).singleton(),
        db:awilix.asFunction(()=>dbAdapter.db).singleton()
    });

    container.loadModules(
        [
            './schema/handleSchemaIndex/*.js',
            './models/**/*.js',
            './entities/**/*.js',
            './services/**/*.js',
            './providers/**/*.js',
            [
                './schema/*.js',
                {
                    register: awilix.asClass,
                    lifetime: awilix.Lifetime.SINGLETON,
                    injector: () => ({ _handlers: requestHandler }),
                },
            ],
        ],
        {
            cwd: __dirname,
            formatName: 'camelCase',
            resolverOptions: {
                lifetime: awilix.Lifetime.SINGLETON,
                register: awilix.asClass,
            },
        },
    );
};

const middlewares = async (server) => {

    server.register(errorHandler);

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
            console.log('Server listen at port:8000')
        } catch (error) {
            console.log('-----Error in starting server-----',error);
        }
    };

    start();
};