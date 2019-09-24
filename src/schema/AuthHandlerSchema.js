module.exports = class AuthHandlerSchema{

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

    getUser(){
        const schema = {
            method:'POST',
            url:'/user',
            schema:{
                // body:{
                //     name: { type: 'string' }
                // }
            },
            handler : (request,reply)=>{
                try {
                    console.log('request===>>',request);
                    reply.send('Hello your serving is running fine...!!!');
                } catch (error) {
                    console.log('error in api',error);
                    reply.send('Error',error);
                }
            }
        };
        console.log('schema', schema);
    return schema;
    };
};
