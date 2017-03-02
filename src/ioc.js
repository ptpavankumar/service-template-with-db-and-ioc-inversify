const inversify = require('inversify');
require('reflect-metadata');

const knex = require('knex');

const dbConfig = require('./config/dbconfig');
const TYPES = require('./models').types;
const repositories = require('./repository');

// Declare as injectable and its dependencies
inversify.decorate(inversify.injectable(), repositories.UserRepository);
inversify.decorate(inversify.injectable(), repositories.AddressRepository);
inversify.decorate(inversify.inject(TYPES.Knex), repositories.UserRepository, 0);
inversify.decorate(inversify.inject(TYPES.Knex), repositories.AddressRepository, 0);

const stack = process.env.STACK || 'development';

module.exports = () => {
  const container = new inversify.Container();
  const knexInstance = knex(dbConfig[stack]);

  inversify.decorate(inversify.injectable(), knexInstance);

  // Register all the repositories
  container.bind(TYPES.Address).to(repositories.AddressRepository);
  container.bind(TYPES.User).to(repositories.UserRepository);
  container.bind(TYPES.Knex).toConstantValue(knexInstance);

  return container;
};
