(function () {
    'use strict';

    var moduleID = 'saathaath.card';
    var factID = 'CardService';

    angular
        .module(moduleID)
        .factory(factID, CardService);


    function CardService() {
        
        var SUIT = {
            club: {
                name: 'club',
                symbol: '♣',
                color: 'black'
            },
            diamond: {
                name: 'diamond',
                symbol: '♦',
                color: 'red'
            },
            spade: {
                name: 'spade',
                symbol: '♠',
                color: 'black'
            },
            heart: {
                name: 'heart',
                symbol: '♥',
                color: 'red'
            }
        };

        var SUITS = [SUIT.club, SUIT.diamond, SUIT.spade, SUIT.heart];

        var RANK = {
            ace: {
                name: 'ace',
                symbol: 'A',
                value: 14
            },
            two: {
                name: 'two',
                symbol: '2',
                value: 2
            },
            three: {
                name: 'three',
                symbol: '3',
                value: 3
            },
            four: {
                name: 'four',
                symbol: '4',
                value: 4
            },
            five: {
                name: 'five',
                symbol: '5',
                value: 5
            },
            six: {
                name: 'six',
                symbol: '6',
                value: 6
            },
            seven: {
                name: 'seven',
                symbol: '7',
                value: 7
            },
            eight: {
                name: 'eight',
                symbol: '8',
                value: 8
            },
            nine: {
                name: 'nine',
                symbol: '9',
                value: 9
            },
            ten: {
                name: 'ten',
                symbol: '10',
                value: 10
            },
            jack: {
                name: 'jack',
                symbol: 'J',
                value: 11
            },
            queen: {
                name: 'queen',
                symbol: 'Q',
                value: 12
            },
            king: {
                name: 'king',
                symbol: 'K',
                value: 13
            }
        };

        var RANKS = [RANK.ace, RANK.two, RANK.three, RANK.four, RANK.five, RANK.six, RANK.seven, RANK.eight, RANK.nine, RANK.ten, RANK.jack, RANK.queen, RANK.king];

        ////////////////
        
        var service = {
            newDeck: newDeck,
            Deck: Deck,
            Card: Card,
            Suits: SUITS,
            Ranks: RANKS
        };

        ////////////////

        function newDeck() {
            var deck = new Deck();
            return deck;
        }

        function Deck() {
            var deck = this;
            this.cards = [];
            this.dealt = [];

            deck.suits.forEach(function (suit) {
                deck.ranks.forEach(function (rank) {
                    if (deck.ignoredCards.indexOf(rank.symbol) === -1 && deck.ignoredCards.indexOf(rank.symbol + suit.name) === -1) {
                        var card = new Card(rank, suit);
                        deck.cards.push(card);
                    }
                })
            });

            deck.shuffle();
        }

        Deck.prototype.suits = SUITS;

        Deck.prototype.ranks = RANKS;

        Deck.prototype.ignoredCards = ['2', '3', '4', '5', '6', '7club', '7diamond'];

        Deck.prototype.deal = function () {
            var card = this.cards.shift();
            if (angular.isDefined(card)) {
                this.dealt.push(card);
                return card;
            }
            else {
                return false;
            }

        };

        Deck.prototype.shuffle = function () {
            /**
             * Knuth Shuffle Implementation
             * https://github.com/coolaj86/knuth-shuffle
             */
            var currentIndex = this.cards.length;
            var temporaryValue, randomIndex;

            // While there remain elements to shuffle...
            while (0 !== currentIndex) {

                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                // And swap it with the current element.
                temporaryValue = this.cards[currentIndex];
                this.cards[currentIndex] = this.cards[randomIndex];
                this.cards[randomIndex] = temporaryValue;
            }
        };

        Deck.prototype.reset = function () {
            this.cards = this.cards.concat(this.dealt);
            this.dealt = [];
            this.shuffle();
        };

        function Card(rank, suit) {
            this.rank = rank;
            this.suit = suit;
        }

        Card.prototype.name = function () {
            return this.rank + ' ' + this.suit;
        };


        return service;

    }

})();
