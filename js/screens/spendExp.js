game.SpendExp = me.ScreenObject.extend({
    /**	
     *  action to perform on state change
     */
    onResetEvent: function() {
        me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('EXP')), -10); // TODO

        me.input.bindKey(me.input.KEY.F1, "F1");
        me.input.bindKey(me.input.KEY.F2, "F2");
        me.input.bindKey(me.input.KEY.F3, "F3");
        me.input.bindKey(me.input.KEY.F4, "F4");
        var exp1cost = (Number(game.data.exp1 + 1) * 10);
        me.game.world.addChild(new (me.Renderable.extend({
            init: function() {
                this._super(me.Renderable, "init", [10, 10, 300, 50]);

                this.font = new me.Font("Arial", 26, "white");

            },
            draw: function(renderer) {
// shows description for available purchases 
                this.font.draw(renderer.getContext(), "PRESS F1-F3 AND F4 TO SKIP", this.pos.x, this.pos.y);
                this.font.draw(renderer.getContext(), "CURRENT EXP: " + game.data.exp.toString(), this.pos.x + 100, this.pos.y + 50);
                this.font.draw(renderer.getContext(), "1: increase GOLD PRODUCTION CURRENT LEVEL: " + game.data.exp1.toString() + " COST: " + exp1cost, this.pos.x, this.pos.y + 100);
                this.font.draw(renderer.getContext(), "2: INCREASE STRENGTH ", this.pos.x, this.pos.y + 150);
                this.font.draw(renderer.getContext(), " 3: INCREASE HEALTH", this.pos.x, this.pos.y + 200);
            }

        })));

        this.handler = me.event.subscribe(me.event.KEYDOWN, function(action, keyCode, edge) {
            if (action === "F1") {
                if (game.data.exp >= exp1cost) {
                    game.data.exp1 += 1;
                    game.data.exp -= exp1cost;
                    me.state.change(me.state.PLAY);
                    // increases the gold production in game 
                } else {
                    console.log("not enough");
                }
            } else if (action === "F2") {

            } else if (action === "F3") {

            } else if (action === "F4") {
                me.state.change(me.state.PLAY);
            }
            //blank commands for other abilities
        });




    },
    /**	
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
        me.input.bindKey(me.input.KEY.F1, "F1");
        me.input.unbindKey(me.input.KEY.F2, "F2");
        me.input.unbindKey(me.input.KEY.F3, "F3");
        me.input.unbindKey(me.input.KEY.F4, "F4");
        me.event.unsubscribe(this.handler);
        // unbinds the keys so you dont make accidental purchases
    }
});



