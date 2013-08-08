
(function(){
    'use strict';

    function Card(){
        this.isFaceUp = false;
        this.isUnplayalbe = false;
    }

    Card.prototype = {

        contents: function(v){
            if (v === undefined) {
                return this._contents;
            } else {
                return this._contents = v;
            }
        },

        match: function(otherCards){
            var score = 0;
            if (Array.isArray(otherCards)) {
                otherCards.forEach(compare, this);
            } else {
                compare.call(this, otherCards);
            }
            function compare(card){
                if (card.contents() === this.contents()) {
                    score = 1;
                }
            }
            return score;
        }

    };

    function exports(){
        return new Card();
    }

    exports.Card = Card;

    window.card = exports;

})();
