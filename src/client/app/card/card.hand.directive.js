(function () {
    'use strict';

    var moduleID = 'saathaath.card';
    var dirID = 'saathaathHand';

    angular
        .module(moduleID)
        .directive(dirID, SaathaathHand);

    function SaathaathHand() {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            restrict: 'E',
            template: '<div class="playingCards">' +
            '<saathaath-card ng-repeat="card in ch.cards track by $index" card="card" card-index="{{$index}}" get-card="ch.callback({card:card})"></saathaath-card>' +
            '</div>',
            scope: {
                cards: '=',
                callback: '&'
            },
            controller: function () {

            },
            controllerAs: 'ch',
            bindToController: true
        };
        return directive;

    }
})();
