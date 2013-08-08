
(function(){
    'use strict';

    function Deck(){

    }

    Deck.prototype = {

        cards: function(){
            return this._cards || (this._cards = []);
        },

        addCard: function(card, opt){
            opt = opt || {};
            if (opt.atTop) {
                this.cards().unshift(card);
            } else {
                this.cards().push(card);
            }
        },

        drawRandomCard: function(){
            var randomCard,
                cards = this.cards();
            if (cards.length) {
                var index = parseInt(Math.random() * cards.length, 10);
                randomCard = cards[index];
                cards.splice(index, 1);
            }
            return randomCard;
        }

    };

    function exports(){
        return new Deck();
    }

    exports.Deck = Deck;

    window.deck = exports;

})();
