myApp.controller('WordController', ['$scope', '$http', 'DataFactory', function($scope, $http, DataFactory) {

  $scope.dataFactory = DataFactory;

  // GET runs when html file loads via ng-repeat
  $scope.dataFactory.getNewWord().then(function() { //go to the data factory and run this function. come back to write the .then when you have the results stored in the data factory.
    $scope.words = $scope.dataFactory.getWordVariable(); // get the data from this function in the data factory and assign it to words (ng-repeat variable) to use in the html ng-repeat
  });

  // send newWord to the data factory
  $scope.saveNewWord = function() {
    var newWord = { // set ng-model variable to variable newWord
      newWord: $scope.newWord,
      description: $scope.description
    };
    //console.log('info in controller', newWord);
    $scope.dataFactory.sendNewWord(newWord).then(function() {
      $scope.dataFactory.getNewWord().then(function() { //go to the data factory and run this function. come back to write the .then when you have the results stored in the data factory.
        $scope.words = $scope.dataFactory.getWordVariable(); // get the data from this function in the data factory and assign it to words (ng-repeat variable) to use in the html ng-repeat
      });
    }); // send newWord variable to this function in the data factory

    $scope.newWord = '';
    $scope.description = '';
  };


  // remove word
  $scope.deleteWord = function(id) {
    $scope.dataFactory.deleteWord(id).then(function() {
      $scope.dataFactory.getNewWord().then(function() {
        $scope.words = $scope.dataFactory.getWordVariable();
      }); // put up on the DOM
    });
  };

}]);