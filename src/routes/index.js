const healthcheckRouter = require('./healthcheckrouter');
const userRouter = require('./userrouter');
const addressRoute = require('./addressrouter');

module.exports = [
  healthcheckRouter,
  userRouter,
  addressRoute,
];
