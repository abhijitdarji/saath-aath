/**
 * saath-aath - Popular Indian Card Game 78.
 * @authors 
 * @version v1.0.0
 * @link https://github.com/abhijitdarji/saath-aath#readme
 * @license ISC
 */
!function(){"use strict";var a="saathaath";angular.module(a,["ngMaterial","ngAnimate","saathaath.card","saathaath.game","saathaath.player","saathaath.ai"]).config(["$mdThemingProvider",function(a){a.theme("default").primaryPalette("indigo").accentPalette("orange")}])}(),function(){"use strict";var a="saathaath.ai";angular.module(a,[])}(),function(){"use strict";var a="saathaath.card";angular.module(a,[])}(),function(){"use strict";var a="saathaath.game";angular.module(a,[])}(),function(){"use strict";var a="saathaath.player";angular.module(a,[])}(),function(){"use strict";function a(a,e,t){function n(t,n){r.call(t),angular.extend(t.constructor.prototype,r.prototype),a.$watch(function(){return n.currentPlayer},function(a,r){n.canPlay&&t.name===a.name&&e(function(){var a=t.decideCard();n.play(a,t)},1500)}),a.$watch(function(){return n.canPlay},function(a,r){n.canPlay&&t.name===n.currentPlayer.name&&e(function(){var a=t.decideCard();n.play(a,t)},1500)}),a.$watch(function(){return n.selectTrump},function(a,r){n.selectTrump&&8==t.getHandsTodo()&&e(function(){var a=t.decideTrump();n.setTrump(a)},1500)})}function r(){this.message="I got brain!! - "+this.name}var s={addBrain:n};return r.prototype.decideCard=function(){var a,e=this.cards.filter(function(a){return void 0!=a&&!a.hideValue});return a=e[Math.floor(Math.random()*e.length)]},r.prototype.decideTrump=function(){var a;return a=t.Suits[Math.floor(Math.random()*t.Suits.length)],a.symbol},s}var e="saathaath.ai",t="BrainService";angular.module(e).factory(t,a),a.$inject=["$rootScope","$timeout","CardService"]}(),function(){"use strict";function a(){var a={restrict:"E",template:'<div class="compareCards"><saathaath-card ng-repeat="card in cards track by $index" card="card" class="compare-index-{{$index}}" card-index="0"></saathaath-card></div>',scope:{cards:"="}};return a}var e="saathaath.card",t="saathaathCompare";angular.module(e).directive(t,a)}(),function(){"use strict";function a(a){var e={restrict:"E",templateUrl:"app/card/card.directive.html",scope:{card:"=",cardIndex:"@",getCard:"&"},controller:"SaathaathCardController",controllerAs:"vm",bindToController:!0};return e}function e(a){var e=this;e.hoverCard=!1,e.toggleHover=function(){e.hoverCard=!e.hoverCard},e.onCardSelected=function(){e.getCard({card:e.card})},e.init=function(){e.displayCard()},e.displayCard=function(){e.cardIndexClass="card-index-"+e.cardIndex},e.init()}var t="saathaath.card",n="saathaathCard",r="SaathaathCardController";angular.module(t).directive(n,a).controller(r,e),a.$inject=["$window"],e.$inject=["$scope"]}(),function(){"use strict";function a(){var a={restrict:"E",template:'<div class="playingCards"><saathaath-card ng-repeat="card in ch.cards track by $index" card="card" card-index="{{$index}}" get-card="ch.callback({card:card})"></saathaath-card></div>',scope:{cards:"=",callback:"&"},controller:function(){},controllerAs:"ch",bindToController:!0};return a}var e="saathaath.card",t="saathaathHand";angular.module(e).directive(t,a)}(),function(){"use strict";function a(){function a(){var a=new e;return a}function e(){var a=this;this.cards=[],this.dealt=[],a.suits.forEach(function(e){a.ranks.forEach(function(n){if(-1===a.ignoredCards.indexOf(n.symbol)&&-1===a.ignoredCards.indexOf(n.symbol+e.name)){var r=new t(n,e);a.cards.push(r)}})}),a.shuffle()}function t(a,e){this.rank=a,this.suit=e}var n={club:{name:"club",symbol:"♣",color:"black"},diamond:{name:"diamond",symbol:"♦",color:"red"},spade:{name:"spade",symbol:"♠",color:"black"},heart:{name:"heart",symbol:"♥",color:"red"}},r=[n.club,n.diamond,n.spade,n.heart],s={ace:{name:"ace",symbol:"A",value:14},two:{name:"two",symbol:"2",value:2},three:{name:"three",symbol:"3",value:3},four:{name:"four",symbol:"4",value:4},five:{name:"five",symbol:"5",value:5},six:{name:"six",symbol:"6",value:6},seven:{name:"seven",symbol:"7",value:7},eight:{name:"eight",symbol:"8",value:8},nine:{name:"nine",symbol:"9",value:9},ten:{name:"ten",symbol:"10",value:10},jack:{name:"jack",symbol:"J",value:11},queen:{name:"queen",symbol:"Q",value:12},king:{name:"king",symbol:"K",value:13}},i=[s.ace,s.two,s.three,s.four,s.five,s.six,s.seven,s.eight,s.nine,s.ten,s.jack,s.queen,s.king],c={newDeck:a,Deck:e,Card:t,Suits:r,Ranks:i};return e.prototype.suits=r,e.prototype.ranks=i,e.prototype.ignoredCards=["2","3","4","5","6","7club","7diamond"],e.prototype.deal=function(){var a=this.cards.shift();return angular.isDefined(a)?(this.dealt.push(a),a):!1},e.prototype.shuffle=function(){for(var a,e,t=this.cards.length;0!==t;)e=Math.floor(Math.random()*t),t-=1,a=this.cards[t],this.cards[t]=this.cards[e],this.cards[e]=a},e.prototype.reset=function(){this.cards=this.cards.concat(this.dealt),this.dealt=[],this.shuffle()},t.prototype.name=function(){return this.rank+" "+this.suit},c}var e="saathaath.card",t="CardService";angular.module(e).factory(t,a)}(),function(){"use strict";function a(a,e,t,n,r,s,i){var c=this;c.init=function(){c.started=!1,c.showResults=!1,c.selectTrump=!1,c.canPlay=!1,c.deck=r.newDeck(),c.trump="",c.getNames()},c.getNames=function(){function a(a,e){var t=this;t.fname,t.sname="Computer",t.selectedOpponent=0,t.start=function(a,t,n){e.hide({fname:a,sname:t,type:n})}}e.show({controller:a,controllerAs:"dm",templateUrl:"app/game/dialog.tmpl.html",parent:angular.element(document.body),clickOutsideToClose:!1,escapeToClose:!1}).then(function(a){c.start(a.fname,a.sname,a.type)}),a.$inject=["$scope","$mdDialog"]},c.start=function(a,e,t){c.showMessage("Starting Game!"),c.player1=n.newPlayer(a,0),c.player2=n.newPlayer(e,0),0==t&&i.addBrain(c.player2,c),c.players=[c.player1,c.player2],c.currentPlayer,c.currentPlayCards=[],c.started=!0,c.showResults=!1,c.decide8()},c.nextPlayer=function(){var a;return a=c.players.shift(),c.players.push(a),c.currentPlayer=a,a},c.decide8=function(){c.showMessage("Deciding 7-8!"),c.deck.reset();var a,e,t={next:function(){a=c.deck.deal(),e=c.nextPlayer(),"jack"!==a.rank.name&&"heart"!==a.suit.name?t.next():t.done()},done:function(){e.updateHandsTodo(8),c.players[0].updateHandsTodo(7)}};t.next(),c.deck.reset(),c.dealHand()},c.dealHand=function(){c.currentPlayer.changeScore(0),c.deck.reset();var e=0,t={next:function(){10>e?(a(function(){c.hit(!0),c.nextPlayer(),t.next()},500),e++):t.done()},done:function(){a(function(){c.showMessage("The one with 8 selects Trump!"),c.selectTrump=!0},500)}};t.next()},c.setTrump=function(a){c.trump=a,c.selectTrump=!1,c.dealTable()},c.dealTable=function(){var e=0,t={next:function(){10>e&&(a(function(){c.hit(!1),c.nextPlayer(),t.next()},500),e++),e>=10&&20>e?(a(function(){c.hit(!0),c.nextPlayer(),t.next()},500),e++):t.done()},done:function(){a(function(){c.canPlay=!0},8e3)}};t.next()},c.getTrumpSuit=function(){var a;switch(escape(c.trump)){case"%u2663":a="club";break;case"%u2666":a="diamond";break;case"%u2660":a="spade";break;case"%u2665":a="heart"}return a},c.play=function(e,t){var n=!1;if(c.canPlay&&c.currentPlayer===t){var r=c.currentPlayer.cards.indexOf(e);if(c.currentPlayCards.push(c.currentPlayer.playCard(e)),r>9&&14>=r&&(c.currentPlayer.cards[r-5].hideValue=!1),2===c.currentPlayCards.length){var i=s.checkWinningCard(c.currentPlayCards[0],c.currentPlayCards[1],c.getTrumpSuit());i==c.currentPlayCards[0]?(c.players[0].changeScore(1),c.showMessage(c.players[0].name+" got the hand!")):(c.currentPlayer.changeScore(1),c.showMessage(c.currentPlayer.name+" got the hand!"),a(function(){c.nextPlayer()},1200)),0==c.currentPlayer.cardsLeft()&&(n=!0),i=null,c.canPlay=!1,a(function(){c.currentPlayCards=[],c.canPlay=!0},1e3)}n?a(function(){c.end()},500):c.nextPlayer()}},c.hit=function(a){var e=c.deck.deal();c.dealCardToPlayer(e,a,function(){})},c.dealCardToPlayer=function(e,t,n){t?(e.hideValue=!0,c.currentPlayer.addCard(e),a(function(){e.hideValue=!1,n()},250)):(e.hideValue=!0,c.currentPlayer.addCard(e),n())},c.end=function(){c.currentPlayer=c.player1.getScore()>c.player2.getScore()?c.player1:c.player2,c.results=c.currentPlayer.name,c.results+=" WINS!",a(function(){c.showResults=!0},500)},c.showMessage=function(a){t.show(t.simple().content(a).position("top right").hideDelay(1e3))},c.showRules=function(){var a=e.alert({title:"Game Rules!",content:"<p>1) In this game 30 card will be used out of 52 cards in the deck.<br/>   2) Selected cards are 7 to King and Ace of hearts and spade and 8 to King and Ace of diamonds and clubs.<br/>   3) Then we decide who would make 7 sets and 8 sets.<br/>   4) Then we give 5 cards to each and the person making 8 sets decides the trump.<br/>   5) Then the rest of the cards are distributed.The player who has to make 8 sets plays the first card.<br/>   6) Other player has to play the same type of card played by the 1st player or if he does not have that type of card then he can play the trump card.<br/>   7) Whoever’s card is the highest wins that set.<br/>   8) Player who has won the last set continues the game by playing card of his choice.<br/>   9) If both player plays the trump card then the higher card wins the set.<br/>  10) If the player for e.g.who has to make 8 sets could make only 6 then in the next round he needs to give 2 sets which he wins in that round to his opponent.Or he can allow the other player to take 2 cards randomly from his cards and take back the card which he   gives.</p>",ok:"Close"});e.show(a)["finally"](function(){a=void 0})},c.reset=function(){c.player1=null,c.player2=null,c.init()},c.init()}var e="saathaath.game",t="GameController";angular.module(e).controller(t,a),a.$inject=["$timeout","$mdDialog","$mdToast","PlayerService","CardService","GameService","BrainService"]}(),function(){"use strict";function a(){return{restrict:"E",templateUrl:"app/game/game.directive.html",controller:"GameController",controllerAs:"game"}}var e="saathaath.game",t="saathaathGame";angular.module(e).directive(t,a)}(),function(){"use strict";function a(){function a(a,e,t){return a.suit.name===t&&e.suit.name!==t?a:a.suit.name!==t&&e.suit.name===t?e:e.suit.name!==a.suit.name?a:a.rank.value>e.rank.value?a:e}var e={checkWinningCard:a};return e}var e="saathaath.game",t="GameService";angular.module(e).factory(t,a)}(),function(){"use strict";function a(){function a(a,e){this.score=e,this.initialScore=e,this.name=a,this.cards=[],this.handsTodo}function e(e,t){var n=new a(e,t);return n}var t={newPlayer:e};return a.prototype.changeScore=function(a){angular.isDefined(this.score)||(this.score=this.initialScore),this.score+=a},a.prototype.getScore=function(){return this.score},a.prototype.resetScore=function(){this.score=this.initialScore},a.prototype.addCard=function(a){angular.isObject(a)&&this.cards.push(a)},a.prototype.playCard=function(a){var e,t=this.cards.indexOf(a);return-1!=t&&(e=this.cards[t],this.cards[t]=null),e},a.prototype.updateHandsTodo=function(a){angular.isNumber(a)&&(this.handsTodo=a)},a.prototype.getHandsTodo=function(){return this.handsTodo},a.prototype.resetCards=function(){this.cards=[]},a.prototype.cardsLeft=function(){return this.cards.filter(function(a){return void 0!=a}).length},t}var e="saathaath.player",t="PlayerService";angular.module(e).factory(t,a)}(),angular.module("saathaath").run(["$templateCache",function(a){a.put("app/card/card.directive.html",'<md-card class="card md-whiteframe-3dp {{vm.cardIndexClass}}" ng-class="{\'md-whiteframe-15dp\' : vm.hoverCard}" ng-if="vm.card != null && !vm.card.hideValue" ng-mouseenter=vm.toggleHover() ng-mouseleave=vm.toggleHover() ng-click=vm.onCardSelected()><div class=card-{{vm.card.rank.name}} style=color:{{vm.card.suit.color}}><div class="corner top"><span class=number>{{vm.card.rank.symbol}}</span> <span>{{vm.card.suit.symbol}}</span></div><span class="suit top_left" ng-if="([4,5,6,7,8,9,10].indexOf(vm.card.rank.value) > -1)">{{vm.card.suit.symbol}}</span> <span class="suit top_center" ng-if="([2].indexOf(vm.card.rank.value) > -1)">{{vm.card.suit.symbol}}</span> <span class="suit top_right" ng-if="([4,5,6,7,8,9,10].indexOf(vm.card.rank.value) > -1)">{{vm.card.suit.symbol}}</span> <span class="suit middle_top_left" ng-if="([9,10].indexOf(vm.card.rank.value) > -1)">{{vm.card.suit.symbol}}</span> <span class="suit middle_top_center" ng-if="([10].indexOf(vm.card.rank.value) > -1)">{{vm.card.suit.symbol}}</span> <span class="suit middle_left" ng-if="([6,7,8].indexOf(vm.card.rank.value) > -1)">{{vm.card.suit.symbol}}</span> <span class="suit middle_top" ng-if="([7,8].indexOf(vm.card.rank.value) > -1)">{{vm.card.suit.symbol}}</span> <span class="suit middle_center" ng-if="([3,5,9].indexOf(vm.card.rank.value) > -1)">{{vm.card.suit.symbol}}</span> <span class="suit middle_top_right" ng-if="([9,10].indexOf(vm.card.rank.value) > -1)">{{vm.card.suit.symbol}}</span> <span class="suit middle_bottom" ng-if="([8].indexOf(vm.card.rank.value) > -1)">{{vm.card.suit.symbol}}</span> <span class="suit middle_right" ng-if="([6,7,8].indexOf(vm.card.rank.value) > -1)">{{vm.card.suit.symbol}}</span> <span class="suit bottom_left" ng-if="([4,5,6,7,8,9,10].indexOf(vm.card.rank.value) > -1)">{{vm.card.suit.symbol}}</span> <span class="suit bottom_center" ng-if="([2].indexOf(vm.card.rank.value) > -1)">{{vm.card.suit.symbol}}</span> <span class="suit bottom_right" ng-if="([4,5,6,7,8,9,10].indexOf(vm.card.rank.value) > -1)">{{vm.card.suit.symbol}}</span> <span class="suit middle_bottom_left" ng-if="([9,10].indexOf(vm.card.rank.value) > -1)">{{vm.card.suit.symbol}}</span> <span class="suit middle_bottom_center" ng-if="([10].indexOf(vm.card.rank.value) > -1)">{{vm.card.suit.symbol}}</span> <span class="suit middle_bottom_right" ng-if="([9,10].indexOf(vm.card.rank.value) > -1)">{{vm.card.suit.symbol}}</span><span class="face middle_center" ng-if="([11,12,13].indexOf(vm.card.rank.value) > -1)"><img ng-src=images/faces/face-{{vm.card.rank.name}}-{{vm.card.suit.name}}.png></span><span class="suit middle_center" ng-if="([14].indexOf(vm.card.rank.value) > -1)">{{vm.card.suit.symbol}}</span><div class="corner bottom"><span class=number>{{vm.card.rank.symbol}}</span> <span>{{vm.card.suit.symbol}}</span></div></div></md-card><md-card class="card back" ng-class=vm.cardIndexClass ng-if="vm.card != null && vm.card.hideValue"></md-card>'),a.put("app/game/dialog.tmpl.html",'<md-dialog aria-label=Players ng-cloak><form name=userForm><md-toolbar class=md-accent><div class=md-toolbar-tools><h2>Players</h2></div></md-toolbar><md-dialog-content style=min-width:200px;min-height:100px;><div class=md-dialog-content layout=row><md-input-container><label>You</label> <input ng-model=dm.fname aria-label=You md-autofocus></md-input-container><md-radio-group ng-model=dm.selectedOpponent><label>Opponent</label><md-radio-button disabled value=0 class=md-primary>Computer</md-radio-button><md-radio-button disabled value=1>Human</md-radio-button><md-input-container><input ng-model=dm.sname aria-label=Opponent disabled></md-input-container></md-radio-group></div></md-dialog-content><div class=md-actions layout=row><md-button ng-click=dm.start(dm.fname,dm.sname,dm.selectedOpponent) ng-class="{\'md-raised md-accent\': (userForm.$dirty && userForm.$valid)}" ng-disabled="userForm.$pristine || userForm.$invalid">Start</md-button></div></form></md-dialog>'),a.put("app/game/game.directive.html",'<div layout-fill><div class=card-table><div class=game-results ng-if=game.showResults><div class=result-text>{{game.results}}</div></div><div class=select-trump ng-if=game.selectTrump><div class=title>:Select Trump:</div><div class=trump-text><span ng-click="game.setTrump(\'&clubs;\')">&clubs;</span> <span style=color:red; ng-click="game.setTrump(\'&diams;\')">&diams;</span> <span ng-click="game.setTrump(\'&spades;\')">&spades;</span> <span style=color:red; ng-click="game.setTrump(\'&hearts;\')">&hearts;</span></div></div><div class=playing-area><div class=hand><saathaath-hand cards=game.player2.cards callback=game.play(card,game.player2)></saathaath-hand></div><div class=hand-spacer><div style=float:left;><saathaath-compare cards=game.currentPlayCards></saathaath-compare></div></div><div class="player-hand hand"><saathaath-hand cards=game.player1.cards callback=game.play(card,game.player1)></saathaath-hand></div></div><div class=scoreboard ng-if=game.started ng-class="{scorecontent: game.currentPlayer === game.player1}"><p class=title>Player:</p><p class=detail>{{game.player1.name}}</p><p class=title>HandsToDo:</p><p class=detail>{{game.player1.getHandsTodo()}}</p><p class=title>Score:</p><p class=detail>{{game.player1.getScore()}}</p></div><div class=gametrump ng-if="game.started && game.trump"><p class=title>Trump</p><p class=detail ng-style="[\'&diams;\',\'&hearts;\'].indexOf(game.trump) > -1 ? {color:\'red\'}:{color:\'black\'}">{{game.trump}}</p></div><div class=scoreboard2 ng-if=game.started ng-class="{scorecontent: game.currentPlayer === game.player2}"><p class=title>Player:</p><p class=detail>{{game.player2.name}}</p><p class=title>HandsToDo:</p><p class=detail>{{game.player2.getHandsTodo()}}</p><p class=title>Score:</p><p class=detail>{{game.player2.getScore()}}</p></div><div class=action-bar></div></div></div>'),a.put("app/layout/shell.html",'<md-content><section layout=row><md-toolbar><div class=md-toolbar-tools><md-button ng-click="shellvm.toggleSidenav(\'left\')" hide-gt-sm class=md-icon-button><md-icon aria-label=Menu>menu</md-icon></md-button><h1><md-icon aria-label=Phone>games</md-icon>Saath Aath</h1><span flex></span><md-button class="md-fab md-mini" aria-label=Restart ng-click=game.reset()><md-tooltip md-direction=left>Restart</md-tooltip><md-icon>replay</md-icon></md-button><md-button class="md-fab md-mini" aria-label=Rules ng-click=game.showRules()><md-tooltip md-direction=left>Rules</md-tooltip><md-icon>info</md-icon></md-button></div></md-toolbar></section><section><saathaath-game></saathaath-game></section></md-content>')}]);