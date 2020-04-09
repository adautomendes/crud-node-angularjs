const { Sequelize } = require("sequelize");

const conexao = require("../database/Conexao");

const Pokemon = conexao.define('pokemon',
    {
        nome: Sequelize.TEXT,
        cp: Sequelize.INTEGER
    },
    {
        timestamps: false,
        tableName: 'pokemon'
    }
);

module.exports = Pokemon;