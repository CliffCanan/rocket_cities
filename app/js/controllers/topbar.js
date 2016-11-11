app.controller('MessagesDropDownCtrl', ['$scope', '$http',
  function ($scope, $http) {
      $http.get('data/messages.json').success(function (data) {
          $scope.messages = data;
      });
  }]);


app.controller('NotificationsDropDownCtrl', ['$scope', '$http',
  function ($scope, $http) {
      $http.get('data/notifications.json').success(function (data) {
          $scope.notifications = data;
      });
  }]);


app.controller('NavBarCntrlr', ['$scope', '$rootScope', '$http',
  function ($scope, $rootScope, $http, $apply) {
      $('input[type=radio][name=user-type]').change(function () {
          //console.log('NavBarCntlr --> Starting UserType is: ' + $rootScope.userType);

          var val = this.value;

          $scope.$apply(function () {
              $rootScope.userType = val;
          });
      });
  }]);
