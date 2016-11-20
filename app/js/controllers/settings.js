app.controller('SettingsCtrl', ['$scope', '$filter', '$http', 'editableOptions', 'editableThemes',
  function ($scope, $filter, $http, editableOptions, editableThemes) {
      editableThemes.bs3.inputClass = 'input-sm';
      editableThemes.bs3.buttonsClass = 'btn-sm';
      editableOptions.theme = 'bs3';

      $scope.html5 = {
          tel: '123-45-67',
          number: 29,
          range: 10,
          url: 'http://example.com',
          search: 'blabla',
          color: '#6a4415',
          date: null,
          time: '12:30',
          datetime: null,
          month: null,
          week: null
      };

      $scope.user = {
          name: 'Cliff Canan',
          display_name: 'genericusername',
          email: 'email@example.com',
          desc: 'Awesome user \ndescription!',
          status: 2,
          agenda: 1,
          remember: false
      };

      $scope.statuses = [
        { value: 1, text: 'status1' },
        { value: 2, text: 'status2' },
        { value: 3, text: 'status3' }
      ];

      $scope.agenda = [
        { value: 1, text: 'male' },
        { value: 2, text: 'female' }
      ];

      $scope.showStatus = function () {
          var selected = $filter('filter')($scope.statuses, { value: $scope.user.status });
          return ($scope.user.status && selected.length) ? selected[0].text : 'Not set';
      };

      $scope.showAgenda = function () {
          var selected = $filter('filter')($scope.agenda, { value: $scope.user.agenda });
          return ($scope.user.agenda && selected.length) ? selected[0].text : 'Not set';
      };

      // editable table
      $scope.users = [
        { id: 1, name: 'awesome user1', status: 2, group: 4, groupName: 'admin' },
        { id: 2, name: 'awesome user2', status: undefined, group: 3, groupName: 'vip' },
        { id: 3, name: 'awesome user3', status: 2, group: null }
      ];

      $scope.groups = [];
      $scope.loadGroups = function () {
          return $scope.groups.length ? null : $http.get('data/groups').success(function (data) {
              $scope.groups = data;
          });
      };

      $scope.showGroup = function (user) {
          if (user.group && $scope.groups.length)
          {
              var selected = $filter('filter')($scope.groups, { id: user.group });
              return selected.length ? selected[0].text : 'Not set';
          }
          else
              return user.groupName || 'Not set';
      };

      $scope.showStatus = function (user) {
          var selected = [];

          if (user && user.status)
              selected = $filter('filter')($scope.statuses, { value: user.status });

          return selected.length ? selected[0].text : 'Not set';
      };

      $scope.saveUser = function (data, id) {
          //$scope.user not updated yet
          angular.extend(data, { id: id });
          // return $http.post('data/saveUser', data);
      };

      // remove user
      $scope.removeUser = function (index) {
          $scope.users.splice(index, 1);
      };

      // add user
      $scope.addUser = function () {
          $scope.inserted = {
              id: $scope.users.length + 1,
              name: '',
              status: null,
              group: null
          };
          $scope.users.push($scope.inserted);
      };

  }]);





app.controller('FileUploadCtrl', ['$scope', 'FileUploader', function ($scope, FileUploader) {

    var uploader = $scope.uploader = new FileUploader({
        url: 'js/controllers/upload.php'
    });

    // FILTERS
    uploader.filters.push({
        name: 'customFilter',
        fn: function (item /*{File|FileLikeObject}*/, options) {
            return this.queue.length < 10;
        }
    });

    // CALLBACKS

    uploader.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/, filter, options) {
        console.info('onWhenAddingFileFailed', item, filter, options);
    };
    uploader.onAfterAddingFile = function (fileItem) {
        console.info('onAfterAddingFile', fileItem);
    };
    uploader.onAfterAddingAll = function (addedFileItems) {
        console.info('onAfterAddingAll', addedFileItems);
    };
    uploader.onBeforeUploadItem = function (item) {
        console.info('onBeforeUploadItem', item);
    };
    uploader.onProgressItem = function (fileItem, progress) {
        console.info('onProgressItem', fileItem, progress);
    };
    uploader.onProgressAll = function (progress) {
        console.info('onProgressAll', progress);
    };
    uploader.onSuccessItem = function (fileItem, response, status, headers) {
        console.info('onSuccessItem', fileItem, response, status, headers);
    };
    uploader.onErrorItem = function (fileItem, response, status, headers) {
        console.info('onErrorItem', fileItem, response, status, headers);
    };
    uploader.onCancelItem = function (fileItem, response, status, headers) {
        console.info('onCancelItem', fileItem, response, status, headers);
    };
    uploader.onCompleteItem = function (fileItem, response, status, headers) {
        console.info('onCompleteItem', fileItem, response, status, headers);
    };
    uploader.onCompleteAll = function () {
        console.info('onCompleteAll');
    };

    console.info('uploader', uploader);
}]);


app.controller('MapCtrl', ['$scope', function ($scope) {

    $scope.myMarkers = [];

    $scope.mapOptions = {
        center: new google.maps.LatLng(35.784, -78.670),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.addMarker = function ($event, $params) {
        $scope.myMarkers.push(new google.maps.Marker({
            map: $scope.myMap,
            position: $params[0].latLng
        }));
    };

    $scope.setZoomMessage = function (zoom) {
        $scope.zoomMessage = 'You just zoomed to ' + zoom + '!';
        console.log(zoom, 'zoomed');
    };

    $scope.openMarkerInfo = function (marker) {
        $scope.currentMarker = marker;
        $scope.currentMarkerLat = marker.getPosition().lat();
        $scope.currentMarkerLng = marker.getPosition().lng();
        $scope.myInfoWindow.open($scope.myMap, marker);
    };

    $scope.setMarkerPosition = function (marker, lat, lng) {
        marker.setPosition(new google.maps.LatLng(lat, lng));
    };
}]);