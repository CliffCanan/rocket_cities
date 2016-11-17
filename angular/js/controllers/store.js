app.controller('StoreCntrlr', ['$rootScope', '$scope', '$templateCache', '$timeout',
  function StoreCntrlr($rootScope, $scope, $templateCache, $timeout) {

      /*--------------------------------
           Gallery
       --------------------------------*/

      var $portfolio_selectors = $('.portfolio-filter > li > a');
      var $portfolio = $('.portfolio-items');

      $portfolio.isotope({
          itemSelector: '.portfolio-item',
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

      $timeout(function () {
          $('.portfolio-filter li:first-child a').click();
      }, 200);

  }]);
