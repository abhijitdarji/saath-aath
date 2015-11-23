(function () {
    'use strict';

    var moduleID = 'saathaath.game';
    var dirID = 'saathaathGame';

    angular
        .module(moduleID)
        .directive(dirID, SaathaathGame);

    function SaathaathGame() {
        return {
            restrict: 'E',
            templateUrl: 'app/game/game.directive.html',
            controller: 'GameController',
            controllerAs: 'game'
        }
    }
})();
