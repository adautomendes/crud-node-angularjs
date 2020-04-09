/* Chamada das Packages que iremos precisar para a nossa aplicação */
const express = require('express'); //chamando o pacote express
const cors = require('cors')
const app = express(); //definção da nossa aplicação através do express
const bodyParser = require('body-parser'); //chamando o pacote body-parser

/* Importação da model do Sequelize */
const Pokemon = require('./models/Pokemon');

/** Configuração da variável 'app' para usar o 'bodyParser()'.
 * Ao fazermos isso nos permitirá retornar os dados a partir de um POST
 */
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/** Definição da porta onde será executada a nossa aplicação */
const port = process.env.PORT || 3000;

//Rotas da nossa API:
//==============================================================

/* Aqui o 'pokemon' irá pegar as instâncias das Rotas do Express */
const pokemon = express.Router();

/* Todas as nossas rotas serão prefixadas com '/pokemon' */
app.use('/pokemon', pokemon);

/* Funções das rotas */
pokemon.post('/', async (req, res) => {
    // Desestruturação do body
    const { name, cp } = req.body;

    let pokemon = await Pokemon.create(
        {
            name,
            cp
        }
    );

    let pokemonCriado = await Pokemon.findByPk(pokemon.id);

    res.json(pokemonCriado);
});

pokemon.patch('/:id', async (req, res) => {
    const id = req.params.id;
    const { name, cp } = req.body;

    await Pokemon.update(
        {
            name,
            cp
        },
        {
            where: { id: id }
        }
    );

    let pokemonAtualizado = await Pokemon.findByPk(id);

    res.json(pokemonAtualizado);
});

pokemon.get('/', async (req, res) => {
    let id = req.query.id;
    let name = req.query.name;

    if (id) {
        //Busca por id
        let pokemons = await Pokemon.findByPk(id);
        res.json(pokemons);
    } else if (name) {
        //Busca por marca e modelo
        let pokemons = await Pokemon.findAll(
            {
                where: {
                    name
                }
            }
        );
        res.json(pokemons);
    } else {
        //Buscar todos
        let pokemons = await Pokemon.findAll();
        res.json(pokemons);
    }
});

pokemon.delete('/:id', async (req, res) => {
    const id = req.params.id;

    let nExcluidos = await Pokemon.destroy(
        {
            where: { id: id }
        }
    );

    res.json(
        {
            nExcluidos: nExcluidos
        }
    );
});

//Iniciando o Servidor (Aplicação):
//==============================================================
app.listen(port, () => {
    console.log('Iniciando a aplicação na porta ' + port);
});