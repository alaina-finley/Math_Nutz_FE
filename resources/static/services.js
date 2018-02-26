(function(angular) {
  var StudentFactory = function($resource) {
    return $resource('/students/:id', {
      id: '@id'
    }, {
      update: {
        method: "PUT"
      },
      remove: {
        method: "DELETE"
      }
    });
  };

  StudentFactory.$inject = ['$resource'];
  angular.module("myApp.services").factory("Student", StudentFactory);
}(angular));
