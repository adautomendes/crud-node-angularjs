var ws = 'http://127.0.0.1:5000/';

function PokemonController($scope, PokemonService) {
    $scope.pokemons = [];

    $scope.init = function() {
        /* Carregando lista 
        $.ajax({
            url: ws + 'findAll',
            success: function(data) {
                $scope.pokemons = data;
            },
            error: function(data) {
                showToast('Algo de errado não está certo<br>init()');
            }
        });*/

        PokemonService
            .success(function(data) {
                console.log('Data: ', data);
                $scope.pokemons = data;
            })
            .error(function(err) {
                console.log('Erro: ', err);
            });
    };

    $scope.save = function() {
        /* Inserindo na lista */

        $.ajax({
            url: ws + 'insert/' + $scope.pokemon.name + '/' + $scope.pokemon.cp,
            success: function(data) {
                showToast($scope.pokemon.name + ' inserido! ID = ' + data.insertId);
            },
            error: function(data) {
                showToast('Algo de errado não está certo<br>insert()');
            },
            complete: function(data) {
                $scope.pokemons.push({
                    id: data.insertId,
                    name: $scope.pokemon.name,
                    cp: $scope.pokemon.cp,
                });
            }
        });
    };

    $scope.edit = function(pokemon) {
        $scope.pokemon = pokemon;
    };

    $scope.remove = function(pokemon) {
        /* Removendo da lista */
        $.ajax({
            url: ws + 'remove/' + $scope.pokemon.id,
            success: function(data) {
                showToast($scope.pokemon.name + ' removido!');

                var index = $scope.pokemons.indexOf(pokemon);
                $scope.pokemons.splice(index, 1);
            },
            error: function(data) {
                showToast('Algo de errado não está certo<br>remove()');
            }
        });
    };
}

function PokemonService($http) {
    var REQ = {
        url: ws + 'findAll',
        method: 'GET'
    };

    return $http(REQ);
}

function showToast(text) {
    Materialize.toast(text, 4000, 'rounded');
}

// Dependencias
PokemonService.$inject = ['$http'];
PokemonController.$inject = ['$scope', 'PokemonService'];