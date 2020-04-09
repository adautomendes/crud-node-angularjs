const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('pokemon_go', 'admin', 'admin',
    {
        host:'localhost',
        dialect:'mysql'
    }
);

module.exports = sequelize;