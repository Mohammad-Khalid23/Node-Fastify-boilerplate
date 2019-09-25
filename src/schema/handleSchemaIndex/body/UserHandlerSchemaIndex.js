module.exports = class UserHandlerSchemaIndex{
    constructor(_joi){
        this.Joi = _joi;
    }

    create(){
        return this.Joi.object().keys({
            user: this.Joi.object().required(),
        })
    }

}