(function () {
    'use strict';

    var moduleID = 'saathaath.card';
    var dirID = 'saathaathCompare';

    angular
        .module(moduleID)
        .directive(dirID, SaathaathCompare);

    function SaathaathCompare() {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            restrict: 'E',
            template: '<div class="compareCards">' +
            '<saathaath-card ng-repeat="card in cards track by $index" card="card" class="compare-index-{{$index}}" card-index="0"></saathaath-card>' +
            '</div>',
            scope: {
                cards: '='
            }
        };
        return directive;

    }
})();
