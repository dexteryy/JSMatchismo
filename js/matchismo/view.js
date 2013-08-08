
(function(doc){
    'use strict';

    var MATCHES_SELECTOR = [
        'webkitMatchesSelector', 
        'mozMatchesSelector', 
        'matchesSelector'
    ].filter(function(name){
        return this[name];
    }, doc.body)[0];

    var TPL_CARD = '<div class="front">{{contents}}</div>';

    var clickEvents = {

        '.card, .card *': function(){
            var sender = this;
            if (!sender.classList.contains('card')) {
                sender = sender.parentNode;
            }
            if (sender.disabled) {
                return;
            }
            var index = Array.prototype.indexOf.call(view.cardButtons, sender);
            view.action.fire('card:filp', [index]);
        }
    
    };

    var view = {

        action: pubsub(), // event(), notify(), ...

        init: function(opt){
            this.flipsLabel = doc.querySelector('.count');
            this.scoreLabel = doc.querySelector('.score');
            this.cardButtons = doc.querySelectorAll('.card');
            this.updateCardButtons(function(){
                return opt.cardData && opt.cardData() || {};
            });
            delegate(doc.body, 'click', clickEvents);
        },

        updateCardButtons: function(fn, context){
            Array.prototype.forEach.call(this.cardButtons, function(cardButton, i){
                var data = fn.call(context, i);
                cardButton.innerHTML = format(TPL_CARD, data);
                cardButton.classList.add('animated');
                if (data.isFaceUp) {
                    cardButton.classList.add('selected');
                    cardButton.classList.add('flipInY');
                } else {
                    cardButton.classList.remove('selected');
                    cardButton.classList.remove('flipInY');
                }
                cardButton.disabled = data.isUnplayalbe;
            });
        },

        updateScoreLabel: function(data){
            this.scoreLabel.innerHTML = format("Score: {{score}}", data);
        },

        updateFlipsLabel: function(data){
            this.flipsLabel.innerHTML = format("Flip: {{count}}", data);
        }

    };

    function format(str, data){
        return str.replace(/\{\{(\w+)\}\}/g, function($0, $1){
            return data[$1] != null ? data[$1] : "";
        });
    }

    function delegate(elm, subject, table){
        var selectors = Object.keys(table);
        elm.addEventListener(subject, function(e){
            var target = e.target;
            selectors.forEach(function(selector){
                if (target[MATCHES_SELECTOR](selector)) {
                    this[selector].call(target, e);
                }
            }, table);
        });
    }

    function pubsub(){
        var lib = {};
        return {
            fire: function(subject, args){
                if (lib[subject]) {
                    lib[subject].forEach(function(handler){
                        handler.apply(this, args);
                    });
                }
            },
            on: function(subject, handler){
                var observer = lib[subject];
                if (!observer) {
                    observer = lib[subject] = [];
                }
                observer.push(handler);
            },
            off: function(subject, handler){
                var observer = lib[subject];
                if (observer) {
                    if (handler) {
                        var i = observer.indexOf(handler);
                        if (i !== -1) {
                            observer.splice(i, 1);
                        }
                    } else {
                        observer.length = 0;
                    }
                }
            }
        };
    }

    window.view = view;

})(window.document);

