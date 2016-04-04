myApp.factory('DataFactory', ['$http', function($http) {

  //PRIVATE

  var newWord = undefined;

  // post info from the word view
  var saveNewWord = function(newWord) {
    //console.log('factory word', newWord);
    var promise = $http.post('/word/', newWord).then(function(response) {
    });
    return promise;
  };

  var retrieveWord = function() {
    var promise = $http.get('/word/').then(function(response) { // go to the GET in word module and wait for a response. then use that data in this next function.
      newWord = response.data; // save those results to the word variable and go back to the controller
      //console.log("inside the retrieveWord", newWord); // newWord is an array of word objects
    });
    return promise; // needed to wrap up this function
  };

  //var deleteFromWordList = function(data) {
  //  console.log(data);
  //  var promise = $http.delete('/word/wordList' + data).then(function(response) {
  //  });
  //  return promise;
  //};



  //PUBLIC

  var dataFactoryOutput = {

    sendNewWord: function(newWord) {
      return saveNewWord(newWord);
    },
    getNewWord: function() {
      return retrieveWord();
    },
    getWordVariable: function() {
      return newWord;
      //console.log('in getWordVariable' + newWord);
    }
  };

  return dataFactoryOutput;
}]);