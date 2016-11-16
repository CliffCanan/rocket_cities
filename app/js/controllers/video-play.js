app.controller('VideoPlayCntrlr', ['$http', '$scope', '$rootScope', '$templateCache', '$sce',
  function VideoPlayCntrlr($http, $scope, $rootScope, $apply, $sce) {

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


      // Trigger File Input for BG Cover Image Upload
      $scope.clickUploadCoverPic = function () {
          setTimeout(function () {
              document.getElementById('coverPicUpload').click()
              $scope.clicked = true;
          }, 0);
      };
  }]);
