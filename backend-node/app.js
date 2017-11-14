/* Chamada das Packages que iremos precisar para a nossa aplicação */
var express = require('express'); //chamando o pacote express
var cors = require('cors')
var app = express(); //definção da nossa aplicação através do express
var bodyParser = require('body-parser'); //chamando o pacote body-parser
var mysql = require('mysql');

/** Vars for DB config */
var objConn = {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'pokemon_go'
    };

/** Configuração da variável 'app' para usar o 'bodyParser()'.
 * Ao fazermos isso nos permitirá retornar os dados a partir de um POST
 */
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/** Definição da porta onde será executada a nossa aplicação */
var port = process.env.PORT || 5000;

//Rotas da nossa API:
//==============================================================

/* Aqui o 'pokemon' irá pegar as instâncias das Rotas do Express */
var pokemon = express.Router();

/* Rota de Teste para sabermos se tudo está realmente funcionando (acessar através: GET: http://localhost:8000/api) */
pokemon.get('/insert/:name/:cp', function(req, res) {
    var name = req.params.name;
    var cp = req.params.cp;

    var connection = mysql.createConnection(objConn);

    connection.connect();

    var strQuery = "INSERT INTO pokemon (name, cp) VALUES ('" + name + "', '" + cp + "');";

    console.log(strQuery);

    connection.query(strQuery, function(err, rows, fields) {
        if (!err) {
            res.jsonp(rows);
        } else {
            res.jsonp(err);
        }
    });

    connection.end();
});

pokemon.get('/update/:id/:name/:cp', function(req, res) {
    var id = req.params.id;
    var name = req.params.name;
    var cp = req.params.cp;

    var connection = mysql.createConnection(objConn);

    connection.connect();

    var strQuery = "UPDATE pokemon SET name = '" + name + "', cp = '" + cp + "' WHERE id = " + id + ";";

    console.log(strQuery);

    connection.query(strQuery, function(err, rows, fields) {
        if (!err) {
            res.jsonp(rows);
        } else {
            res.jsonp(err);
        }
    });

    connection.end();
});

pokemon.get('/findAll', function(req, res) {
    var connection = mysql.createConnection(objConn);
    connection.connect();

    var strQuery = "SELECT id, name, cp FROM pokemon";

    console.log(strQuery);

    connection.query(strQuery, function(err, rows, fields) {
        if (!err) {
        	res.jsonp(rows);
        } else {
        	res.jsonp(err);
        }
    });

    connection.end();
});

pokemon.get('/findById/:id', function(req, res) {
    var id = req.params.id;

    var connection = mysql.createConnection(objConn);

    connection.connect();

    var strQuery = "SELECT id, name, cp FROM pokemon WHERE id = " + id;

    console.log(strQuery);

    connection.query(strQuery, function(err, rows, fields) {
        if (!err) {
            res.jsonp(rows);
        } else {
            res.jsonp(err);
        }
    });

    connection.end();
});

pokemon.get('/remove/:id', function(req, res) {
    var id = req.params.id;

    var connection = mysql.createConnection(objConn);

    connection.connect();

    var strQuery = "DELETE FROM pokemon WHERE id = " + id;

    console.log(strQuery);

    connection.query(strQuery, function(err, rows, fields) {
        if (!err) {
            res.jsonp(rows);
        } else {
            res.jsonp(err);
        }
    });

    connection.end();
});

/* Todas as nossas rotas serão prefixadas com '/pokemon' */
app.use('/pokemon', pokemon);

//Iniciando o Servidor (Aplicação):
//==============================================================
app.listen(port);
console.log('Iniciando a aplicação na porta ' + port);