'use strict';

angular.module('ngMorris', [])
.directive('barChart', function(){
	return {
		restrict: 'A',
		scope: {
			x: '@barX',
			y: '@barY',
			barData: '='
		},
		link: function(scope, elem, attrs){
			scope.$watch('barData', function(){

				if (scope.barData ){
					new Morris.Bar({
						element: elem,
						data: scope.barData,
						xkey: scope.x,
						ykeys: JSON.parse(scope.y),
						labels: ['Series a','Series b','Series c','Series d'],
						xLabelMargin: 2,
				             resize: true,	
				             barColors: ['#E91E63', '#673AB7', '#3f51b5','#FFC107']
					})
				}
			})
		}
	}
})
.directive('donutChart', function(){
	return {
		restrict: 'A',
		scope: {
			donutData: '='
		},
		link: function(scope, elem, attrs){
			scope.$watch('donutData', function(){
				if (scope.donutData){
					new Morris.Donut({
						element: elem,
						data: scope.donutData,
				            resize: true,
				            backgroundColor: '#ffffff',
				            labelColor: '#999999',
				            colors: [
				                '#E91E63', '#673AB7', '#3f51b5','#FFC107'
				            ],
					})
				}
			})
		}
	}
})
.directive('lineChart', function(){
	return {
		restrict: 'A',
		scope: {
			lineData: '=',
			lineXkey: '=',
			lineYkeys: '=',
			lineLabels: '=',
			hideHover: '=?',
			parseTime: '=?'	// optional: http://stackoverflow.com/questions/18784520/angular-directive-with-default-options
		},
		link: function (scope, elem, attrs){
			scope.$watch('lineData', function(){

				if(scope.lineData){			
					new Morris.Line({
						element: elem,
						data: scope.lineData,
				             resize: true,
						xkey: scope.lineXkey,
						ykeys: scope.lineYkeys,
						labels: scope.lineLabels,
				             lineColors: ['#E91E63', '#673AB7'],
				             pointFillColors: ['#FFC107'],
						hideHover: scope.hideHover || false,
						parseTime: scope.parseTime || false
					})
				}
			})
		}
	}
})