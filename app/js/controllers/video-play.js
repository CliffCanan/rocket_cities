app.controller('VideoPlayCntrlr', ['$http', '$scope', '$rootScope', '$templateCache', '$sce', '$state', '$window', '$uibModal',
    function VideoPlayCntrlr($http, $scope, $rootScope, $apply, $sce, $state, $window, $modal) {

      if ($rootScope.screenWidth > 968)
          $rootScope.app.settings.showSideMenu = false;

      // Get Video Data
      $http.get('data/video-feed.json')
          .success(function (data) {
              $scope.videos = data;
          });

      $scope.trustSrc = function (src) {
          //console.log(src);
          return $sce.trustAsResourceUrl(src);
      }

      $scope.influencer = {
          'socialUrls': {
              'twitterUrl': 'NoochMoney',
              'fbUrl': 'NoochMoney',
              'gplusUrl': 'NoochMoney'
          }
      }

      // To control the 'Fans Only' button for hover effects
      $scope.mouseenterBox = function ($event) {
          //console.log('Mouse Enter!');

          $($event.currentTarget).find('.access-container .btn')
                 .removeClass('btn-border').addClass('btn-primary swing')
                 .find('span').text('Get Access');
      }

      $scope.mouseleaveBox = function ($event) {
          //console.log('Mouse Leave!');

          $($event.currentTarget).find('.access-container .btn')
                 .removeClass('btn-primary swing')
                 .addClass('btn-border')
                 .find('span').text('Fans Only');
      }


      $scope.joinCity = function () {
          // If the user is logged in already, display Join City Modal
          if ($rootScope.app.isLoggedIn)
          {
              $scope.city = {
                  'name': 'AwesomeTown',
                  'cover_img': 'favicon.png'
              };

              var modalInstance = $modal.open({
                  templateUrl: 'partials/modal-join-city.html',
                  controller: 'JoinCityModalCtrl',
                  //windowClass: 'animated fadeInDown',
                  //size: 'lg',
                  resolve: {
                      city: function () {
                          return $scope.city;
                      }
                  }
              });

              modalInstance.result.then(function (result) {
                  alert(result);
              }, function () {
                  $log.info('Modal dismissed at: ' + new Date());
              });
          }
          else // Otherwise, send the user to the Registration screen (need to remember where the user came from & send user back to this city after signing up)
          {
              $state.go('access.register');
          }
      }

      // Social Media profile button clicked
      $scope.goToSocialProfile = function (dest) {
          if (dest == 'twitter')
          {
              $window.open('//twitter.com/' + $scope.influencer.socialUrls.twitterUrl);
          }
          else if (dest == 'fb')
          {
              $window.open('//facebook.com/' + $scope.influencer.socialUrls.twitterUrl);
          }
          else if (dest == 'gplus')
          {
              $window.open('//gplus.com/' + $scope.influencer.socialUrls.twitterUrl);
          }
      }


      // Trigger File Input for BG Cover Image Upload
      $scope.clickUploadCoverPic = function () {
          setTimeout(function () {
              document.getElementById('coverPicUpload').click()
              $scope.clicked = true;
          }, 0);
      };
  }]);


// For the 'Join City' Modal
app.controller('JoinCityModalCtrl', ['$scope', '$uibModalInstance', 'city', '$http',
    function ($scope, $modalInstance, city, $http) {
    $scope.city = city;

    $scope.ok = function () {
        // ADD CALL TO SERVER TO JOIN THIS CITY
        $http.get('data/video-feed.json') // example URL - update to server method for joining a City
            .success(function (data) {

                // Temp hard-coding server response for testing
                var res = {
                    'status': 'ok'
                }

                // Return the status from the server
                $modalInstance.close(res.status);
            });
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);