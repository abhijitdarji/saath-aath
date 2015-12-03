(function () {
    'use strict';

    var moduleID = 'saathaath.game';
    var factID = 'GameService';

    angular
        .module(moduleID)
        .factory(factID, GameService);

    function GameService() {

        var service = {
            checkWinningCard: checkWinningCard
        };

        return service;
        ////////////////////

       
        function checkWinningCard(cardA, cardB, trump) {

            if (cardA.suit === trump && cardB.suit !== trump) {
                return cardA;
            }
            else if (cardA.suit !== trump && cardB.suit === trump) {
                return cardB;
            }
            else if (cardB.suit !== cardA.suit) {
                return cardA;
            }
            else {
                return cardA.rank.value > cardB.rank.value ? cardA : cardB;
            }
        }

    }
})();
