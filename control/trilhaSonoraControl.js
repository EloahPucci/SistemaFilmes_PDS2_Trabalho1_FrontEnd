var app = angular.module('trilhaSonoraModule',[]);
app.controller('trilhaSonoraControl', function($scope,$http) {

    var url = 'http://localhost:8080/trilhasSonoras';

    $scope.pesquisarTrilhaSonora = function() {
        $http.get(url).then(function (response) {
            $scope.trilhasSonoras = response.data;
        }, function (error) {
            alert(error);
            console.log(error);
        });
    }

    $scope.salvarTrilhaSonora = function() {
        if (typeof $scope.trilhaSonora.codigo == 'undefined') {            
            $http.post(url,$scope.trilhaSonora).then(function (response) {
                $scope.trilhasSonoras.push(response.data);
                console.log($scope.trilhasSonoras);
                $scope.novo();
            }, function (error) {
                alert(error);
                console.log(error);
            });
        } else {
            $http.put(url,$scope.trilhasSonoras).then(function () {
                $scope.pesquisarTrilhaSonora();
                $scope.novoTrilhaSonora();
            }, function (error) {
                alert(error);
                console.log(error);
            });
        } 
    }

    $scope.excluirTrilhaSonora = function() {
        if (typeof $scope.trilhaSonora.codigo == 'undefined') {
            alert('Escolha uma trilha sonora');
        } else {
            urlExcluir = url+"/"+$scope.trilhaSonora.codigo;
            $http.delete(urlExcluir).then(function () {
                $scope.pesquisarTrilhaSonora();
                $scope.novoTrilhaSonora();
            }, function (error) {
                alert(error);
                console.log(error);
            }); 
        }
    }

    $scope.novoTrilhaSonora = function() {
        $scope.trilhaSonora = {};
    }        

    $scope.selecionaTrilhaSonora = function(trilhaSonora) {
        $scope.trilhaSonora = trilhaSonora;
    }

    $scope.pesquisarTrilhaSonora();
    $scope.novoTrilhaSonora();

});