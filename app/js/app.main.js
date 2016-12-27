'use strict';
angular.module('app').controller('AppCtrl', ['$scope', '$rootScope',
    function ($scope, $rootScope) {

        var menufold = screenWidth < 767 ? true : false;
        var screenWidth = window.innerWidth;
        $rootScope.screenWidth = screenWidth;

        if (typeof $rootScope.userType == 'undefined')
            $rootScope.userType = 'influencer';


        $rootScope.app = {
            name: 'Rocket Cities',
            version: '0.0.1',
            type: $rootScope.userType,
            color: {
                primary: '#a30303',//'#3f51b5',
                primaryLight: '#fd7373',
                accent: '#E91E63',
                info: '#03A9F4',
                infoLight: '#67d7e5',
                success: '#46be8a',
                successLight: '#7fd2ae',
                warning: '#fdb45d',
                danger: '#F44336',
                secondary: '#a9a9a9',
                text: '#767676'
            },
            settings: {
                showSideMenu: true,
                menuFolded: menufold,
                chatFolded: true,
                searchFocus: false,
                pagetitle: 'Rocket Cities',
            }
        }

        $rootScope.app = $scope.app;

        $scope.menuChatToggle = function (type, value) {
            if (type == "menu" && !value)
                $scope.app.settings.chatFolded = true;
            if (type == "chat" && !value)
                $scope.app.settings.menuFolded = true;
        }

        $scope.changeMenuHeight = function () {
            if ($scope.app.settings.menuFolded == true)
                var navHeight = angular.element("#main-content section.wrapper .content-wrapper").innerHeight() + 90;
            else
                var navHeight = $(window).innerHeight() - 60;

            angular.element("#main-menu-wrapper").height(navHeight);
        }

        $scope.$watch('app.settings.menuFolded', function () {
            $scope.changeMenuHeight();
        });

        $scope.$on('$viewContentLoaded', function (next, current) {
            angular.element(document).ready(function () {
                $scope.changeMenuHeight();
            });
        });

        $scope.ElementInView = function (inview, event, addclass, removeclass) {
            var id = event.inViewTarget.id;
            /*console.log(event);  */
            if (inview && id != "")
            {
                if (addclass != "")
                    $("#" + id).addClass(addclass);
                else
                    $("#" + id).removeClass(removeclass);
            }
            return false;
        }

        $scope.testLines = [];
        for (var i = 20; i >= 0; i--)
        {
            $scope.testLines.push(i);
        };

        $scope.lineInView = function (index, inview, inviewpart, event) {
            /*console.log(inview+" "+index+" "+inviewpart+" "+event);    */
            /*console.log(event.inViewTarget.id);  */
            return false;
        }
    }
]);