var app = angular.module('artistaModule',[]);
app.controller('artistaControl', function($scope,$http) {

    var url = 'http://localhost:8080/artistas';

    $scope.pesquisarArtista = function() {
        $http.get(url).then(function (response) {
            $scope.artistas = response.data;
        }, function (error) {
            alert(error);
            console.log(error);
        });
    }

    $scope.salvarArtista = function() {
        if (typeof $scope.artista.codigo == 'undefined') {            
            $http.post(url,$scope.artista).then(function (response) {
                $scope.artistas.push(response.data);
                console.log($scope.artistas);
                $scope.novo();
            }, function (error) {
                alert(error);
                console.log(error);
            });
        } else {
            $http.put(url,$scope.artistas).then(function () {
                $scope.pesquisarArtista();
                $scope.novoArtista();
            }, function (error) {
                alert(error);
                console.log(error);
            });
        } 
    }

    $scope.excluirArtista = function() {
        if (typeof $scope.artista.codigo == 'undefined') {
            alert('Escolha um artista');
        } else {
            urlExcluir = url+"/"+$scope.artista.codigo;
            $http.delete(urlExcluir).then(function () {
                $scope.pesquisarArtista();
                $scope.novoArtista();
            }, function (error) {
                alert(error);
                console.log(error);
            }); 
        }
    }

    $scope.novoArtista = function() {
        $scope.artista = {};
    }        

    $scope.selecionaArtista = function(artista) {
        $scope.artista = artista;
    }

    $scope.pesquisarArtista();
    $scope.novoArtista();

});