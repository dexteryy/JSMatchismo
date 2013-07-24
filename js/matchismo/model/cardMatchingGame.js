
(function(){
    'use strict';

    var MATCH_BONUS = 4,
        MISMATCH_PENALTY = 2,
        FLIP_COST = 1;

    function CardMatchingGame(opt){
        this._cards = [];
        this._score = 0;
        var card;
        for (var i = 0; i < opt.count; i++) {
            card = opt.usingDeck.drawRandomCard();
            this._cards.push(card);
        }
    }

    CardMatchingGame.prototype = {

        score: function(){
            return this._score;
        },

        cardAtIndex: function(index){
            return this._cards[index];
        },

        flipCardAtIndex: function(index){
            var card = this.cardAtIndex(index);
            if (!card.isUnplayalbe) {
                if (!card.isFaceUp) {
                    var otherCard, matchScore;
                    for (var i = 0, l = this._cards.length; i < l; i++) {
                        otherCard = this._cards[i];
                        if (otherCard.isFaceUp && !otherCard.isUnplayalbe) {
                            matchScore = card.match(otherCard);
                            if (matchScore) {
                                otherCard.isUnplayalbe = true;
                                card.isUnplayalbe = true;
                                this._score += matchScore * MATCH_BONUS;
                            } else {
                                otherCard.isFaceUp = false;
                                this._score -= MISMATCH_PENALTY;
                            }
                            break;
                        }
                    }
                    this._score -= FLIP_COST;
                }
                card.isFaceUp = !card.isFaceUp;
            }
        }
    
    };

    function exports(opt){
        return new CardMatchingGame(opt);
    }

    exports.CardMatchingGame = CardMatchingGame;

    window.cardMatchingGame = exports;

})();
