
(function(card){
    'use strict';

    var _validSuits,
        _rankStrings = ["?", "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", 
            "J", "Q", "K"];

    function PlayingCard(){
        this.superClass = card.Card;
        this.superClass.call(this);
        this.constructor = PlayingCard;
    }

    PlayingCard.prototype = Object.create(card.Card.prototype);

    var playingCardMethods = {

        contents: function(){
            return _rankStrings[this.rank()] + this.suit();
        },

        match: function(otherCard){
            var score = 0;
            if (otherCard.suit() === this.suit()) {
                score = 1;
            } else if (otherCard.rank() === this.rank()) {
                score = 4;
            }
            return score;
        },

        suit: function(v){
            if (v === undefined) {
                return this._suit ? this._suit : "?";
            } else {
                if (PlayingCard.validSuits()[v]) {
                    this._suit = v;
                }
                return this._suit;
            }
        },

        rank: function(v){
            if (v === undefined) {
                return this._rank;
            } else {
                if (v <= PlayingCard.maxRank()) {
                    this._rank = v;
                }
                return this._rank;
            }
        }

    };

    Object.keys(playingCardMethods).forEach(function(name){
        this[name] = playingCardMethods[name];
    }, PlayingCard.prototype);

    PlayingCard.maxRank = function(){
        return _rankStrings.length - 1;
    };

    PlayingCard.validSuits = function(){
        if (!_validSuits) {
            _validSuits = { "♥": 1, "♦": 1, "♠": 1, "♣": 1 };
        }
        return _validSuits;
    };

    function exports(){
        return new PlayingCard();
    }

    exports.PlayingCard = PlayingCard;

    window.playingCard = exports;

})(window.card);
