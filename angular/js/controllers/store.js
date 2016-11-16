app.controller('StoreCntrlr', ['$http', '$scope', '$rootScope', '$templateCache',
  function StoreCntrlr($http, $scope, $rootScope) {

      /*--------------------------------
           Gallery
       --------------------------------*/
      $scope.isotopeGallery = function () {
          if ($.isFunction($.fn.isotope))
          {

              var $portfolio_selectors = $('.portfolio-filter >li>a');
              var $portfolio = $('.portfolio-items');
              $portfolio.isotope({
                  itemSelector: '.portfolio-item',
                  layoutMode: 'sloppyMasonry'
              });

              $portfolio_selectors.on('click', function () {
                  $portfolio_selectors.removeClass('active');
                  $(this).addClass('active');
                  var selector = $(this).attr('data-filter');
                  $portfolio.isotope({
                      filter: selector
                  });
                  return false;
              });
          }
      };
  }]);
