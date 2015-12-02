(function () {
    'use strict';

    var moduleID = 'saathaath.game';
    var ctrlID = 'GameController';

    angular
        .module(moduleID)
        .controller(ctrlID, GameController);

    GameController.$inject = ['$timeout', '$mdDialog', '$mdToast', 'PlayerService', 'CardService', 'GameService', 'BrainService'];

    function GameController($timeout, $mdDialog, $mdToast, PlayerService, CardService, GameService, BrainService) {
        var game = this;

        /**
         * Initialize our controller data
         */
        game.init = function () {

            game.started = false;
            game.showResults = false;
            game.selectTrump = false;
            game.canPlay = false;
            game.deck = CardService.newDeck();
            game.trump = '';
            game.getNames();
        };

        game.getNames = function () {
            $mdDialog.show({
                controller: DialogController,
                controllerAs: 'dm',
                templateUrl: 'app/game/dialog.tmpl.html',
                parent: angular.element(document.body),
                clickOutsideToClose: false,
                escapeToClose: false
            }).then(function (names) {
                game.start(names.fname, names.sname, names.type);
            });
            DialogController.$inject = ['$scope', '$mdDialog'];
            function DialogController($scope, $mdDialog) {
                var dm = this;
                dm.fname;
                dm.sname = "Computer";
                dm.selectedOpponent = 0;
                dm.start = function (fname, sname, type) {
                    $mdDialog.hide({ fname: fname, sname: sname, type: type });
                };
            }
        }
        /**
         * Starts a game by creating a new player
         */
        game.start = function (firstPlayer, secondPlayer, opponentType) {
            game.showMessage('Starting Game!');
            game.player1 = PlayerService.newPlayer(firstPlayer, 0);
            game.player2 = PlayerService.newPlayer(secondPlayer, 0);
            //add brain if computer player
            if (opponentType == 0) { BrainService.addBrain(game.player2, game); }

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
            game.showMessage('Deciding 7-8!');
            game.deck.reset();
            var card;
            var player;

            var loop = {
                next: function () {
                    card = game.deck.deal();
                    player = game.nextPlayer();

                    if (card.rank.name !== 'jack' && card.suit.name !== 'heart') {
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

            game.dealHand();
        }


        game.dealHand = function () {
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
                    $timeout(function () {
                        game.showMessage('The one with 8 selects Trump!');
                        game.selectTrump = true;
                    }, 500);
                }
            }
            loop.next();

            //game.play();
        };

        game.setTrump = function (trump) {
                game.trump = trump;
                game.selectTrump = false;
                game.dealTable();
        }

        game.dealTable = function () {

            //Deal the cards
            var i = 0;
            var loop = {
                next: function () {
                    if (i < 10) {
                        $timeout(function () {
                            game.hit(false);
                            game.nextPlayer();
                            loop.next();
                        }, 500);
                        i++;
                    }
                    if (i >= 10 && i < 20) {
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
                    $timeout(function () {
                        game.canPlay = true;
                    }, 8000);
                }
            }
            loop.next();
        };

        game.getTrumpSuit = function () {
            var suit;
            //UTF-8 character value
            switch (escape(game.trump)) {
                case '%u2663':
                    suit = 'club'
                    break;
                case '%u2666':
                    suit = 'diamond'
                    break;
                case '%u2660':
                    suit = 'spade'
                    break;
                case '%u2665':
                    suit = 'heart'
                    break;
                default:
                    break;
            }

            return suit;
        }

        game.play = function (card, player) {
            var end = false;

            if (game.canPlay && game.currentPlayer === player) {

                var idx = game.currentPlayer.cards.indexOf(card);

                game.currentPlayCards.push(game.currentPlayer.playCard(card))

                //show the hidden card when top card is played
                if (idx > 9 && idx <= 14) {
                    game.currentPlayer.cards[idx - 5].hideValue = false;
                }

                if (game.currentPlayCards.length === 2) {

                    var winCard = GameService.checkWinningCard(game.currentPlayCards[0], game.currentPlayCards[1], game.getTrumpSuit());

                    if (winCard == game.currentPlayCards[0]) {
                        game.players[0].changeScore(1);
                        game.showMessage(game.players[0].name + ' got the hand!');
                    }
                    else {
                        game.currentPlayer.changeScore(1);
                        game.showMessage(game.currentPlayer.name + ' got the hand!');
                        $timeout(function () {
                            game.nextPlayer();
                        }, 1200);
                        //game.nextPlayer();
                    }

                    if (game.currentPlayer.cardsLeft() == 0)
                        end = true;

                    winCard = null;
                    game.canPlay = false;

                    $timeout(function () {
                        game.currentPlayCards = [];
                        game.canPlay = true;
                    }, 1000);

                }

                if (!end) {
                    game.nextPlayer();
                }
                else {
                    $timeout(function () {
                        game.end();
                    }, 500);
                }

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
                card.hideValue = true;
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
            game.results = game.currentPlayer.name;
            game.results += " WINS!";

            $timeout(function () {
                game.showResults = true;
            }, 500);
        };

        game.showMessage = function (msg) {
            $mdToast.show(
                $mdToast.simple()
                    .content(msg)
                    .position('top right')
                    .hideDelay(1000)
                );
        }

        game.showRules = function () {
            var alert = $mdDialog.alert({
                title: 'Game Rules!',
                content: '<p>1) In this game 30 card will be used out of 52 cards in the deck.<br/>'
                + '   2) Selected cards are 7 to King and Ace of hearts and spade and 8 to King and Ace of diamonds and clubs.<br/>'
                + '   3) Then we decide who would make 7 sets and 8 sets.<br/>'
                + '   4) Then we give 5 cards to each and the person making 8 sets decides the trump.<br/>'
                + '   5) Then the rest of the cards are distributed.The player who has to make 8 sets plays the first card.<br/>'
                + '   6) Other player has to play the same type of card played by the 1st player or if he does not have that type of card then he can play the trump card.<br/>'
                + '   7) Whoever’s card is the highest wins that set.<br/>'
                + '   8) Player who has won the last set continues the game by playing card of his choice.<br/>'
                + '   9) If both player plays the trump card then the higher card wins the set.<br/>'
                + '  10) If the player for e.g.who has to make 8 sets could make only 6 then in the next round he needs to give 2 sets which he wins in that round to his opponent.Or he can allow the other player to take 2 cards randomly from his cards and take back the card which he' + '   gives.</p>',
                ok: 'Close'
            });
            $mdDialog
                .show(alert)
                .finally(function () {
                    alert = undefined;
                });
        }

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
