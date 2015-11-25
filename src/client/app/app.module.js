(function () {
    'use strict';

    var moduleID = 'saathaath';

    angular.module(moduleID, [
        'ngMaterial',
        'ngAnimate',
        'saathaath.card',
        'saathaath.game',
        'saathaath.player'
    ]).config(function ($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('indigo')
            .accentPalette('orange');
    });


})();