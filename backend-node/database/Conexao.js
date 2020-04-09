const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('pokemon_go', 'root', '',
    {
        host:'localhost',
        dialect:'mysql'
    }
);

module.exports = sequelize;