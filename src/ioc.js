const inversify = require('inversify');
require('reflect-metadata');

const knex = require('knex');

const dbConfig = require('./config/dbconfig');
const TYPES = require('./models').types;
const repositories = require('./repository');

const container = new inversify.Container();

const stack = process.env.STACK || 'development';
const knexInstance = knex(dbConfig[stack]);

// Declare as injectable and its dependencies
inversify.decorate(inversify.injectable(), knexInstance);
inversify.decorate(inversify.injectable(), repositories.UserRepository);
inversify.decorate(inversify.injectable(), repositories.AddressRepository);
inversify.decorate(inversify.inject(TYPES.Knex), repositories.UserRepository, 0);
inversify.decorate(inversify.inject(TYPES.Knex), repositories.AddressRepository, 0);

// Register all the repositories
container.bind(TYPES.Address).to(repositories.AddressRepository);
container.bind(TYPES.User).to(repositories.UserRepository);
container.bind(TYPES.Knex).toConstantValue(knexInstance);
module.exports = container;
