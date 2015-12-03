(function () {
    'use strict';

    var moduleID = 'saathaath.ai';
    var factID = 'BrainService';

    angular
        .module(moduleID)
        .factory(factID, BrainService);

    BrainService.$inject = ['$rootScope', '$timeout'];

    function BrainService($rootScope, $timeout) {
        var service = {
            addBrain: addBrain
        };
        
        /////////////
        
        /**
         * Brain Object
         * @param playerName
         * @constructor
         */
        function addBrain(player, game) {
            Brain.call(player);
            angular.extend(player.constructor.prototype, Brain.prototype)

            $rootScope.$watch(function () {
                return game.currentPlayer;
            }, function watchCallback(newValue, oldValue) {
                if (game.canPlay && player.name === newValue.name) {

                    $timeout(function () {
                        var card = player.decideCard();
                        game.play(card, player);
                    }, 1500);

                }
            });

            $rootScope.$watch(function () {
                return game.canPlay;
            }, function watchCallback(newValue, oldValue) {
                if (game.canPlay && player.name === game.currentPlayer.name) {

                    $timeout(function () {
                        var card = player.decideCard();
                        game.play(card, player);
                    }, 1500);

                }
            });

            $rootScope.$watch(function () {
                return game.selectTrump;
            }, function watchCallback(newValue, oldValue) {
                if (game.selectTrump && player.getHandsTodo() == 8) {

                    $timeout(function () {
                        var trump = player.decideTrump(game.suits);
                        game.setTrump(trump);
                    }, 1500);

                }
            });
        }

        function Brain() {
            this.message = "I got brain!! - " + this.name;
        }

        Brain.prototype.decideCard = function () {
            var card;
            var cardsLeft = this.cards.filter(function (n) { return n != undefined && !n.hideValue });
            card = cardsLeft[Math.floor(Math.random() * cardsLeft.length)];
            return card;
        }

        Brain.prototype.decideTrump = function (suits) {
            var suit;
            suit = suits[Math.floor(Math.random() * suits.length)];
            return suit;
        }

        return service;
    }

})();
