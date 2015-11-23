(function () {
    'use strict';

    var moduleID = 'saathaath.player';
    var factID = 'PlayerService';

    angular
        .module(moduleID)
        .factory(factID, PlayerService);

    function PlayerService() {
        var service = {
            newPlayer: newPlayer
        };
        
        /////////////
        
        /**
         * New Player Object
         * @param playerName
         * @param initialScore
         * @constructor
         */
        function Player(playerName, initialScore) {
            this.score = initialScore;
            this.initialScore = initialScore;
            this.name = playerName;
            this.cards = [];
            this.handsTodo;
        }

        /**
         * Change the score by amount
         * @param amountToChange
         */
        Player.prototype.changeScore = function (amountToChange) {
            if (!angular.isDefined(this.score)) {
                this.score = this.initialScore;
            }

            this.score += amountToChange;
        };
        
        Player.prototype.getScore = function () {
            return  this.score;
        };

        /**
         * Resets the score of a player back to initial score.
         */
        Player.prototype.resetScore = function () {
            this.score = this.initialScore;
        };

        Player.prototype.addCard = function (card) {
            if (angular.isObject(card))
                this.cards.push(card);
        }

        Player.prototype.playCard = function (card) {
            var playedCard;
            if (this.cards.indexOf(card) != -1) {
                playedCard = this.cards.splice(this.cards.indexOf(card), 1);
            }
            return playedCard[0];
        }

        Player.prototype.updateHandsTodo = function (hands) {
            if (angular.isNumber(hands))
                this.handsTodo = hands;
        }

        Player.prototype.getHandsTodo = function () {
            return this.handsTodo;
        }

        Player.prototype.resetCards = function () {
            this.cards = [];
        };

        /**
         * Creates a new player object
         * @param playerName
         * @param initialScore
         * @returns {PlayerService.Player}
         */
        function newPlayer(playerName, initialScore) {
            var player = new Player(playerName, initialScore);
            return player;
        }

        return service;
    }
})();
