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

            if (cardA.suit.name === trump && cardB.suit.name !== trump) {
                return cardA;
            }
            else if (cardA.suit.name !== trump && cardB.suit.name === trump) {
                return cardB;
            }
            else if (cardB.suit.name !== cardA.suit.name) {
                return cardA;
            }
            else {
                return cardA.rank.value > cardB.rank.value ? cardA : cardB;
            }
        }

    }
})();
