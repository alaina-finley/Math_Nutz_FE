(function(angular) {
  var AppController = function($scope, Student) {
    Student.query(function(response) {
      $scope.students = response ? response : [];
    });

    $scope.addStudent = function(username, password) {
      new Student({
        username: username,
        password: password,
        total: 0,
        correct: 0
      }).$save(function(student) {
        $scope.students.push(student);
      });
      $scope.credentials = [];
    };

    $scope.updateStudent = function(student) {
      student.$update();
    };

    $scope.deleteStudent = function(student) {
      student.$remove(function() {
        $scope.students.splice($scope.students.indexOf(student), 1);
      });
    };
  };

  AppController.$inject = ['$scope', 'Student'];
  angular.module("myApp.controllers").controller("AppController", AppController);
}(angular));
