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
            $http.jsonp(ws + 'findAll' + callback)
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
                if (pokemon.id == null)
                    url += 'insert/' + pokemon.name + '/' + pokemon.cp;
                else
                    url += 'update/' + pokemon.id + '/' + pokemon.name + '/' + pokemon.cp;

                $http.jsonp(url + callback)
                    .success(function(response) {
                        if (response.insertId != 0) { //INSERT
                            showToast(pokemon.name + ' inserted!<br>ID = ' + response.insertId);

                            $scope.pokemons.push({
                                id: response.insertId,
                                name: $scope.pokemon.name,
                                cp: $scope.pokemon.cp,
                            });
                        } else { //UPDATE
                            $http.jsonp(ws + 'findAll' + callback)
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
            $http.jsonp(ws + 'remove' + '/' + pokemon.id + callback)
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