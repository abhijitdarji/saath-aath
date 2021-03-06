(function () {
    'use strict';

    var moduleID = 'saathaath.card';
    var dirID = 'saathaathCard';
    var ctrlID = 'SaathaathCardController';

    angular
        .module(moduleID)
        .directive(dirID, SaathaathCard)
        .controller(ctrlID, SaathaathCardController);

    SaathaathCard.$inject = ['$window'];

    SaathaathCardController.$inject = ['$scope'];

    function SaathaathCard($window) {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            restrict: 'E',
            templateUrl: 'app/card/card.directive.html',
            scope: {
                card: '=',
                cardIndex: '@',
                getCard: '&'
            },
            controller: 'SaathaathCardController',
            controllerAs: 'vm',
            bindToController: true
        };
        return directive;

    }


    function SaathaathCardController($scope) {
        var vm = this;
        vm.hoverCard = false;
        vm.toggleHover = function () { vm.hoverCard = !vm.hoverCard; }
        vm.onCardSelected = function () {
            vm.getCard({card:vm.card});
        };

        vm.init = function () {
            vm.displayCard();

            // $scope.$watchCollection('vm.card', function (newC, oldC) {
            //     vm.displayCard();
            // });
        };

        vm.displayCard = function () {
            
            vm.cardIndexClass = 'card-index-' + vm.cardIndex;
        };

        vm.init();
    }
})();
