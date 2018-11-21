var app = angular.module('app', []);



app.factory('hash', [function() {
return{
	create:function(algoritmo, message){
	    var hashFunction;
    if (algoritmo === 'MD5') {
      hashFunction = CryptoJS.MD5;
    } else if (algoritmo === 'SHA-1') {
      hashFunction = CryptoJS.SHA1;
    } else if (algoritmo === 'SHA-2-256') {
      hashFunction = CryptoJS.SHA256;
    } else if (algoritmo === 'SHA-2-512') {
      hashFunction = CryptoJS.SHA512;
    } else {
      throw Error('El tipo de algoritmo no es válido:' + algoritmo);
    }

      var objHashResult = hashFunction(message);

      var strHashResult = objHashResult.toString(CryptoJS.enc.Base64);

      return strHashResult;
    
	}
}},
]);

app.controller('PruebaController', [
  '$scope',
  'hash',
  function($scope, hash) {
    $scope.password = 's3cret';
	$scope.data = {
    availableOptions: [
      {id: '1', name: 'SHA-1'},
      {id: '2', name: 'MD5'},
      {id: '3', name: 'SHA-2-256'},
	  {id: '4', name: 'SHA-2-512'}
    ],
    selectedOption: {id: '1', name: 'SHA-1'} //This sets the default value of the select in the ui
    };
    $scope.getHash = function() {
      var hashResult = hash.create($scope.data.selectedOption.name, $scope.password);
      return hashResult;
    };
  },
]);