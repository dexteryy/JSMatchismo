
(function(deck, playingCard){
    'use strict';

    var PlayingCard = playingCard.PlayingCard;

    function PlayingCardDeck(){
        this.superClass = deck.Deck;
        this.superClass.call(this);
        this.constructor = PlayingCardDeck;
        Object.keys(PlayingCard.validSuits()).forEach(function(suit){
            var card;
            for (var rank = 1, l = PlayingCard.maxRank(); rank <= l; rank++) {
                card = playingCard();
                card.rank(rank);
                card.suit(suit);
                this.addCard(card, {
                    atTop: true
                });
            }
        }, this);
    }

    PlayingCardDeck.prototype = Object.create(deck.Deck.prototype);

    function exports(){
        return new PlayingCardDeck();
    }

    exports.PlayingCardDeck = PlayingCardDeck;

    window.playingCardDeck = exports;

})(window.deck, window.playingCard);
