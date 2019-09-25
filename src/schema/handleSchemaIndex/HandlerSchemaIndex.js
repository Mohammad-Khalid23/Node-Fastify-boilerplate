const path = require('path');

module.exports = class HandlerSchemaIndex {
    constructor(_joi) {
        this.Joi = _joi;
        this.indexPath = 'body';
    }

    getSchema(_class, body){
        const [name, schema] = _class.constructor.name.split('Handler');
        
        const className = `${name}Handler${schema}Index`;
        
        const requiredClass = require(path.join(__dirname,this.indexPath,className));

        const bodyIndex = new requiredClass(this.Joi);

        return bodyIndex[body]();
    };
};