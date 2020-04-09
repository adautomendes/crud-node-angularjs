const { Sequelize } = require("sequelize");

const conexao = require("../database/Conexao");

const Pokemon = conexao.define('pokemon',
    {
        name: Sequelize.TEXT,
        cp: Sequelize.INTEGER
    },
    {
        timestamps: false,
        tableName: 'pokemon'
    }
);

module.exports = Pokemon;