var ws = 'http://127.0.0.1:3000/pokemon/';

/**
 * Main AngularJS Web Application
 */
var pokeApp = angular.module('pokeApp', []);

pokeApp.controller('PokemonController',
    function PokemonController($scope, $http) {
        $scope.pokemons = [];

        $scope.init = function () {
            $http.get(ws)
                .then(function (response) {
                    $scope.pokemons = response.data;
                    showToast('Load completed!');
                }, function (err) {
                    console.log('Error (init) -> ' + err);
                });
        };

        $scope.new = function () {
            delete $scope.pokemon;
        };

        $scope.save = function () {
            if ($scope.pokemon == null) {
                showToast('Enter pokemon name and CP');
                return;
            }

            var pokemon = {
                id: $scope.pokemon.id,
                name: $scope.pokemon.name,
                cp: $scope.pokemon.cp
            };

            if (pokemon.name != null && pokemon.cp != null) {
                /** Definindo dados a serem enviados e qual operação */
                var data;

                /** Definindo headers da request */
                var config = {}

                if (pokemon.id == null) {
                    //INSERT
                    data = {
                        name: pokemon.name,
                        cp: pokemon.cp
                    };

                    $http.post(ws, data)
                        .then(function (response) {
                            let data = response.data;
                            showToast(pokemon.name + ' inserted!<br>ID = ' + data.id);

                            $scope.pokemons.push({
                                id: data.id,
                                name: data.name,
                                cp: data.cp
                            });
                        }, function (err) {
                            console.log('Error (insert) -> ' + err);
                        });
                } else {
                    //UPDATE
                    data = {
                        id: pokemon.id,
                        name: pokemon.name,
                        cp: pokemon.cp
                    };

                    $http.patch(ws + '/' + data.id, data)
                        .then(function (response) {
                            let data = response.data;
                            showToast(pokemon.name + ' updated!<br>ID = ' + data.id);
                        }, function (err) {
                            console.log('Error (update) -> ' + err);
                        });
                }

                $scope.pokemon = null;
            } else {
                showToast('Enter pokemon name and CP');
                return;
            }
        };

        $scope.edit = function (pokemon) {
            $scope.pokemon = pokemon;
        };

        $scope.remove = function (pokemon) {
            var data = {
                id: pokemon.id
            }

            $http.delete(ws + '/' + data.id, data)
                .then(function (response) {
                    var index = $scope.pokemons.indexOf(pokemon);
                    $scope.pokemons.splice(index, 1);

                    showToast(pokemon.name + ' removed!');
                }, function (err) {
                    console.log('Erro (remove) -> ' + err);
                });

        };
    }
);

function showToast(text) {
    M.toast({ html: text, classes: 'rounded' });
}