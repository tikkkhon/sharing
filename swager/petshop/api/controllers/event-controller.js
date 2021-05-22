'use strict';
/*
 'use strict' is not required but helpful for turning syntactical errors into true errors in the program flow
 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
*/

/*
 Modules make it possible to import JavaScript files into your application.  Modules are imported
 using 'require' statements that give you a reference to the module.
  It is a good idea to list the modules that your application depends on in the package.json in the project root
 */
  var util = require("util");
  var faker = require("faker");
  const chance = new require("chance").Chance();
  const { fake } = require("faker");
  
/*
 Once you 'require' a module you can reference the things that it exports.  These are defined in module.exports.
 For a controller in a127 (which this is) you should export the functions referenced in your Swagger document by name.
 Either:
  - The HTTP Verb of the corresponding operation (get, put, post, delete, etc)
  - Or the operationId associated with the operation in your Swagger document
  In the starter/skeleton project the 'get' operation on the '/hello' path has an operationId named 'hello'.  Here,
  we specify that in the exports of this module that 'hello' maps to the function named 'hello'
 */
module.exports = {
  events: getEvents
};


function generateComment() {
  return {
    id: "" + faker.company.companyName({min: 100, max: 1000}),
    city: chance.city(),
    adress: chance.address(),
    text: chance.sentence(),
    paragraph: chance.paragraph(),
    name: chance.name(),
    date: chance.date(),
    weekday: chance.weekday(),
    hour: chance.hour(),
    year: chance.year({min: 2000, max: 2030}),
    coordinates :chance.coordinates(),
    long: "" + faker.datatype.number(),
    cash: chance.dollar({min: 1 ,max: 5}),
  };
}

function generateComments(number) {
  const array = [];

  for (let i = 0; i < number; i++) {
    array.push(generateComment());
  }
  
  return array;
}
/*
  Functions in a127 controllers used for operations should take two parameters:
  Param 1: a handle to the request object
  Param 2: a handle to the response object
 */
function getEvents(req, res) {
  // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
  var date = req.swagger.params.date.value || '2020-03-01';
  var name = util.format('Festival %s', date);

  // this sends back a JSON response which is a single string
 
res.json(generateComments(4));
}
