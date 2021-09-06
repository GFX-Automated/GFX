angular
    .module('demoApp', ['mobiscroll-form', 'mobiscroll-cards', 'mobiscroll-listview'])
    .controller('demoController', ['$scope', function ($scope) {

        var collapsibles = document.querySelectorAll('[data-collapsible]');

        $scope.data = [{
                email: 'adeline-s@bigcorp.com',
                phone: '(202) 555-0147',
            },
            {
                email: 'carl.h@washaway.com',
                phone: '(202) 553-5247',
            },
            {
                email: 'hortense@tinker.com',
                phone: '(202) 555-0137',
            },
            {
                email: 'barry.ly@roads.com',
                phone: '(302) 663-5247',
            }
        ];

        $scope.lvSettings = {
            swipe: false,
            enhance: true
        }

        $scope.settings = {
            theme: 'ios',
            themeVariant: 'light'
        };

        $scope.hideAll = function () {
            for (var i = 0; i < collapsibles.length; ++i) {
                mobiscroll.instances[collapsibles[i].id].hide();
            }
        }

        $scope.toggleLast = function () {
            mobiscroll.instances[collapsibles[3].id].toggle();
        }

    }]);