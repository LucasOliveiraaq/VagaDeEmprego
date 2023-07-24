const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'postgres',
    username: 'postgres',
    password: 'postgre',
    database: 'VagaDeEmprego',
    host: 'localhost', 
    port: 5432, 
    storage: './db/app.db', 
});

module.exports = sequelize;