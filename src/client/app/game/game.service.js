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
            var faceRanks = ['J', 'Q', 'K', 'A'];
            var faceValues = {
                'J': 10,
                'Q': 11,
                'K': 12,
                'A': 13
            }

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
                var rank1, rank2;

                rank1 = faceRanks.indexOf(cardA.rank) !== -1 ? Number(faceValues[cardA.rank]) : Number(cardA.rank)
                rank2 = faceRanks.indexOf(cardB.rank) !== -1 ? Number(faceValues[cardB.rank]) : Number(cardB.rank)

                return rank1 > rank2 ? cardA : cardB;
            }
        }

    }
})();
