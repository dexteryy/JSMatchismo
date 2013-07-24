
(function(view, playingCardDeck, cardMatchingGame){
    'use strict';

    var _flipCount = 0;

    view.action.on('card:filp', function(index){
        app.game().flipCardAtIndex(index);
        _flipCount++;
        app.updateUI();
    });

    var app = {

        init: function(){
            view.init({
                //setCardsForSelected: function(){
                    //var card = this.deck().drawRandomCard();
                    //return {
                        //contents: card.contents()
                    //};
                //}.bind(this)
            });
            this.updateUI();
        },

        //deck: function(){
            //return this._deck || (this._deck = playingCardDeck());
        //},

        game: function(){
            return this._game || (this._game = cardMatchingGame({
                count: view.cardButtons.length,
                usingDeck: playingCardDeck()
            }));
        },

        updateUI: function(){
            view.updateCardButtons(function(i){
                var card = this.game().cardAtIndex(i);
                return {
                    contents: card.contents(),
                    isFaceUp: card.isFaceUp,
                    isUnplayalbe: card.isUnplayalbe
                };
            }, this);
            view.updateFlipsLabel({
                count: _flipCount
            });
            view.updateScoreLabel({
                score: this.game().score()
            });
        }

    };

    window.app = app;

})(window.view, window.playingCardDeck, window.cardMatchingGame);

