var ws = 'http://127.0.0.1:5000/pokemon/';
var callback = '?callback=JSON_CALLBACK';

/**
 * Main AngularJS Web Application
 */
var pokeApp = angular.module('pokeApp', []);

pokeApp.controller('PokemonController',
    function PokemonController($scope, $http) {
        $scope.pokemons = [];

        $scope.init = function() {
            $http.get(ws + 'findAll')
                .success(function(response) {
                    $scope.pokemons = response;
                    showToast('Load completed!');
                })
                .error(function(response) {
                    console.log('Error (init) -> ' + response);
                });
        };

        $scope.new = function() {
            delete $scope.pokemon;
        };

        $scope.save = function() {
            if($scope.pokemon == null) {
                showToast('Enter pokemon name and CP');
                return;
            }

            var pokemon = {
                id: $scope.pokemon.id,
                name: $scope.pokemon.name,
                cp: $scope.pokemon.cp
            };

            if (pokemon.name != null && pokemon.cp != null) {
                var url = ws;

                /** Definindo dados a serem enviados e qual operação */
                var data;
                if (pokemon.id == null) {
                    url += 'insert'
                     data = {
                        name: pokemon.name,
                        cp: pokemon.cp
                    };
                } else {
                    url += 'update';
                    data = {
                        id: pokemon.id,
                        name: pokemon.name,
                        cp: pokemon.cp
                    };
                }

                /** Definindo headers da request */
                var config = {}

                $http.post(url, data)
                    .success(function(response) {
                        if (response.insertId != 0) { //INSERT
                            showToast(pokemon.name + ' inserted!<br>ID = ' + response.insertId);

                            $scope.pokemons.push({
                                id: response.insertId,
                                name: $scope.pokemon.name,
                                cp: $scope.pokemon.cp,
                            });
                        } else { //UPDATE
                            $http.get(ws + 'findAll')
                                .success(function(response) {
                                    $scope.pokemons = response;
                                    showToast(pokemon.name + ' updated!');
                                })
                                .error(function(response) {
                                    console.log('Error (save -> findAll) -> ' + response);
                                });
                        }
                        delete $scope.pokemon;
                    })
                    .error(function(response) {
                        console.log('Error (save) -> ' + response);
                    });
            } else {

            }
        };

        $scope.edit = function(pokemon) {
            $scope.pokemon = pokemon;
        };

        $scope.remove = function(pokemon) {
            var url = ws + 'remove';
            var data = {
                id: pokemon.id
            }

            //Requests DELETE em Angular só aceita Body no campo de Options (header e body no mesmo paramêtro)
            //Para ficar mais fácil, usaremos POST mesmo ;)
            $http.post(url, data)
                .success(function(response) {
                    var index = $scope.pokemons.indexOf(pokemon);
                    $scope.pokemons.splice(index, 1);

                    showToast(pokemon.name + ' removed!');
                })
                .error(function(response) {
                    console.log('Erro (remove) -> ' + response);
                });

        };
    }
);

function showToast(text) {
    Materialize.toast(text, 4000, 'rounded');
}