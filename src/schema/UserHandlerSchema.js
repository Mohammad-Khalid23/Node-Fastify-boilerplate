module.exports = class UserHandlerSchema{
    constructor(_joi,_handlers,handlerSchemaIndex) {
        this.Joi = _joi;
        this.handlers = _handlers,
        this.schemaIndex = handlerSchemaIndex;
    }
    welcome(){
        const schema = {
            method:'GET',
            url:'/',
            schema:{
            },
            handler : (request,reply)=>{
                try {
                    console.log('request===>>',request);
                    reply.send('Hello your serving is running fine...!!!')
                } catch (error) {
                    console.log('error in api',error);
                }
            }
        };
    return schema;
    };

    createUser(){
        const schema = {
            method:'POST',
            url:'/user',
            schema:{
                body: this.schemaIndex.getSchema(this, 'create'),
            },
            handler : this.handlers.user.createUser 
            // handler : 
            // (request,reply)=>{
            //     try {
            //         console.log('request===>>',request);
            //         reply.send(request.body);
            //     } catch (error) {
            //         console.log('error in api',error);
            //         reply.send('Error',error);
            //     }
            // }
        };
        console.log('schema', schema);
    return schema;
    };
};
