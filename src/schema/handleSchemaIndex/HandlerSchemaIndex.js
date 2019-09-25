const path = require('path');

module.exports = class HandlerSchemaIndex {
    constructor(_joi) {
        this.Joi = _joi;
        this.indexPath = 'body';
    }

/*
  * This method is use to get and validate schema of body and header from their respective folder and file.
*/

    getSchema(_class, body){
        const [name, schema] = _class.constructor.name.split('Handler'); //Getting name and schema from class from which this function called e.g User and Schema
        
        const className = `${name}Handler${schema}Index`; // Creating a className by joining name and schema e.g UserHandlerSchemaIndex 
        
        const requiredClass = require(path.join(__dirname,this.indexPath,className)); // Creating a required class to call a specific validation function.

        const bodyIndex = new requiredClass(this.Joi); // Passing Joi Validator to the Class.

        return bodyIndex[body](); // Calling Validation function to validate the body e.g create()
    };
};