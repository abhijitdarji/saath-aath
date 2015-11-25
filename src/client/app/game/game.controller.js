(function () {
    'use strict';

    var moduleID = 'saathaath.game';
    var ctrlID = 'GameController';

    angular
        .module(moduleID)
        .controller(ctrlID, GameController);

    GameController.$inject = ['$timeout', 'PlayerService', 'CardService', 'GameService'];

    function GameController($timeout, PlayerService, CardService, GameService) {
        var game = this;

        /**
         * Initialize our controller data
         */
        game.init = function () {

            game.started = false;
            game.showResults = false;
            game.selectTrump = false;
            game.deck = CardService.newDeck();
            game.trump = '';
        };

        /**
         * Starts a game by creating a new player
         */
        game.start = function () {
            game.player1 = PlayerService.newPlayer('Player1', 0);
            game.player2 = PlayerService.newPlayer('Player2', 0);
            game.players = [game.player1, game.player2];
            game.currentPlayer;
            game.currentPlayCards = [];
            game.started = true;
            game.showResults = false;

            game.decide8();
        };

        game.nextPlayer = function () {
            var player;
            player = game.players.shift();
            game.players.push(player);
            game.currentPlayer = player;
            return player;
        }

        game.decide8 = function () {
            game.deck.reset();
            var card;
            var player;

            var loop = {
                next: function () {
                    card = game.deck.deal();
                    player = game.nextPlayer();

                    if (card.rank !== 'J' && card.suit !== 'H') {
                        loop.next();
                    }
                    else {
                        loop.done();
                    }

                },
                done: function () {
                    player.updateHandsTodo(8);
                    game.players[0].updateHandsTodo(7);
                }
            };
            loop.next();

            game.deck.reset();

            game.deal();
        }


        game.deal = function () {
            //Initialize values each game

            game.currentPlayer.changeScore(0);

            //Shuffle before dealing
            game.deck.reset();


            //Deal the cards
            var i = 0;
            var loop = {
                next: function () {

                    if (i < 10) {
                        $timeout(function () {
                            game.hit(true);
                            game.nextPlayer();
                            loop.next();
                        }, 500);
                        i++;
                    }
                    else {
                        loop.done();
                    }
                },
                done: function () {
                    console.log('done');
                }
            }
            loop.next();


            game.selectTrump = true;
            game.play();
        };

        game.setTrump = function (trump) {
            game.trump = trump;
            game.selectTrump = false;
        }

        game.getTrumpSuit = function () {
            var suit;
            //UTF-8 character value
            switch (escape(game.trump)) {
                case '%u2663':
                    suit = 'C'
                    break;
                case '%u2666':
                    suit = 'D'
                    break;
                case '%u2660':
                    suit = 'S'
                    break;
                case '%u2665':
                    suit = 'H'
                    break;
                default:
                    break;
            }

            return suit;
        }

        game.play = function (card, player) {
            var end = false;
            if (game.currentPlayer === player) {

                game.currentPlayCards.push(game.currentPlayer.playCard(card))

                if (game.currentPlayCards.length === 2) {

                    var winCard = GameService.checkWinningCard(game.currentPlayCards[0], game.currentPlayCards[1], game.getTrumpSuit());

                    if (winCard == game.currentPlayCards[0]) {
                        game.players[0].changeScore(1);
                    }
                    else {
                        game.currentPlayer.changeScore(1);
                        game.nextPlayer();
                    }

                    if (game.currentPlayer.cards.length == 0)
                        end = true;

                    winCard = null;
                    $timeout(function () {
                        game.currentPlayCards = [];
                    }, 1000);

                }

                if (!end)
                    game.nextPlayer();
                else
                    game.end();
            }

        }
        
        /**
         * Adds a card to our hand and calculates value.
         * @param animate - Animate the card in
         */
        game.hit = function (animate) {

            var card = game.deck.deal();
            game.dealCardToPlayer(card, animate, function () {

            });

        };

        /**
         *
         * @param card
         * @param animate
         * @param callback
         */
        game.dealCardToPlayer = function (card, animate, callback) {
            if (animate) {
                card.hideValue = true;
                game.currentPlayer.addCard(card);
                $timeout(function () {
                    card.hideValue = false;
                    callback();
                }, 250);
            }
            else {
                game.currentPlayer.addCard(card);
                callback();
            }
        };

        /**
         * Ends the game for the current hand. Checks for wins
         * and 'pays' to player score
         */
        game.end = function () {

            game.currentPlayer = game.player1.getScore() > game.player2.getScore() ? game.player1 : game.player2;
            game.results = game.player1.getScore() > game.player2.getScore() ? game.player1.name : game.player2.name;
            game.results += " WINS!";

            $timeout(function () {
                game.showResults = true;
            }, 500);
        };

        /**
         * Resets our player's score and re-inits
         */
        game.reset = function () {
            game.player1 = null;
            game.player2 = null;
            game.init();
        };

        game.init();
    }
})();
