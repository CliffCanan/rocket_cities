app.controller('PostsCtrl', ['$rootScope', '$scope', '$filter', '$http',
  function ($rootScope, $scope, $filter, $http) {

      $('#posts-summary').DataTable({
          sAjaxSource: 'data/posts.json',
          aoColumns: [
              { mData: 'id'},
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
              { className: "text-center", targets: [ 2, 3, 4, 5, 6 ] },
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