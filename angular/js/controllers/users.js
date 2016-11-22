app.controller('SubscribersCtrl', ['$rootScope', '$scope', '$filter', '$http',
  function ($rootScope, $scope, $filter, $http) {

      $http.get('data/topsubscribers.json').success(function (data) {
          $scope.topSubscribers = data;
      });


      $('#posts-summary').DataTable({
          sAjaxSource: 'data/posts.json',
          aoColumns: [
              { mData: 'id' },
              { mData: 'week' },
              { mData: 'posts' },
              { mData: 'views' },
              { mData: 'likes' },
              { mData: 'comments' },
              { mData: 'score' }
          ],
          paging: false,
          //scrollY: 220,
          searching: false,
          orderFixed: [0, 'desc'],
          columnDefs: [
              { targets: 0, visible: false }, // Hides the "ID" column"
              { className: "text-center", targets: [2, 3, 4, 5, 6] },
              {
                  targets: -1,
                  render: function (data, type, row, meta) {
                      var score = parseInt(row.posts) + parseInt(row.views) + parseInt(row.likes);

                      var icon = 'fa-thumbs-down';
                      var color = 'text-danger';
                      var labelColor = 'label-danger';
                      var badge = 'Rookie';

                      if (score > 60)
                      {
                          icon = 'fa-thumbs-up';
                          color = 'text-success';
                          labelColor = 'label-success';
                          badge = 'Pro';
                      }
                      else if (row.views > 30)
                      {
                          icon = 'fa-thumbs-up';
                          color = 'text-warning';
                          labelColor = 'label-warning';
                          badge = 'Solid';
                      }

                      return '<i class="fa ' + icon + ' ' + color + '"></i><span class="label ' + labelColor + ' m-l-5">Rookie</span><span class="text-muted m-l-5">' + score + '</span>';
                  }
              }
          ],
          columns: [
              { "name": "id" },
              { "name": "week" },
              { "name": "posts" },
              { "name": "views" },
              { "name": "likes" },
              { "name": "comments" },
              { "name": "score" },
          ]
      });

  }]);


app.controller('LineCtrl', ['$rootScope', '$scope',
    function ($rootScope, $scope) {

        $scope.labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

        $scope.data = [
            [4, 13, 25, 35, 46, 51, 59],
            [4, 9, 12, 10, 11, 5, 8]
        ];

        $scope.series = ['TOTAL', 'NEW'];


        $scope.onClick = function (points, evt) {
            // UNUSED - Could be called from the <canvas> on clicking a point
            //console.log(points, evt);
        };

        $scope.onHover = function (points) {
            // UNUSED - Could be called from the <canvas> on hovering
        };

        $scope.colors = [{ // Series 1
            fillColor: $rootScope.app.color.primaryLight,
            strokeColor: $rootScope.app.color.primary,
            pointColor: $rootScope.app.color.primary,
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: $rootScope.app.color.primary
        }, { // Series 2
            fillColor: $rootScope.app.color.infoLight,
            strokeColor: $rootScope.app.color.info,
            pointColor: $rootScope.app.color.info,
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: $rootScope.app.color.info
        }];


        $('input[type=radio][name=timeframe]').change(function () {

            var val = this.value;

            $scope.$apply(function () {
                if (val == "week")
                {
                    $scope.labels = ['Nov 1-7', 'Nov 8-13', 'Nov 14-20', 'Nov 21-27', 'Nov 28-Dec 3', 'Dec 4-10', 'Dec 11-17'];
                    $scope.data = [
                        [49, 100, 162, 240, 360, 451, 571],
                        [49, 51, 62, 78, 80, 91, 120]
                    ];
                }
                else if (val == "day")
                {
                    $scope.labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                    $scope.data = [
                        [4, 13, 25, 35, 46, 51, 59],
                        [4, 9, 12, 10, 11, 5, 8]
                    ];
                }
                else if (val == "month")
                {
                    $scope.labels = ['June', 'July', 'August', 'September', 'October', 'November', 'December'];
                    $scope.data = [
                        [300, 622, 923, 1300, 1680, 1905, 2200],
                        [300, 322, 301, 377, 380, 215, 295]
                    ];
                }
            });
        });
    }]);