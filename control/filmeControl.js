var app = angular.module('filmeModule',[]);
app.controller('filmeControl', function($scope,$http) {

    var url = 'http://localhost:8080/filmes';

    $scope.pesquisarFilme = function() {
        $http.get(url).then(function (response) {
            $scope.filmes = response.data;
        }, function (error) {
            alert(error);
            console.log(error);
        });
    }

    $scope.salvarFilme = function() {
        if (typeof $scope.filme.codigo == 'undefined') {            
            $http.post(url,$scope.filme).then(function (response) {
                $scope.filmes.push(response.data);
                console.log($scope.filmes);
                $scope.novo();
            }, function (error) {
                alert(error);
                console.log(error);
            });
        } else {
            $http.put(url,$scope.filmes).then(function () {
                $scope.pesquisarFilme();
                $scope.novoFilme();
            }, function (error) {
                alert(error);
                console.log(error);
            });
        } 
    }

    $scope.excluirFilme = function() {
        if (typeof $scope.filme.codigo == 'undefined') {
            alert('Escolha um filme');
        } else {
            urlExcluir = url+"/"+$scope.filme.codigo;
            $http.delete(urlExcluir).then(function () {
                $scope.pesquisarFilme();
                $scope.novoFilme();
            }, function (error) {
                alert(error);
                console.log(error);
            }); 
        }
    }

    $scope.novoFilme = function() {
        $scope.filme = {};
    }        

    $scope.selecionaFilme = function(filme) {
        $scope.filme = filme;
    }

    $scope.pesquisarFilme();
    $scope.novoFilme();

});