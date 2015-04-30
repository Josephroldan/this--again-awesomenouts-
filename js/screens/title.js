game.TitleScreen = me.ScreenObject.extend({
    /**	
     *  action to perform on state change
     */
    onResetEvent: function() {
        me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('title')), -10); // TODO



        me.game.world.addChild(new (me.Renderable.extend({
            init: function() {
                this._super(me.Renderable, "init", [470, 240, 300, 50]);
// draws the font and adds clicking event to change screen
                this.font = new me.Font("Arial", 46, "white");
                me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(this), true);
            },
            // allows to make the game to reset
            draw: function(renderer) {
                this.font.draw(renderer.getContext(), "START NEW GAME", this.pos.x, this.pos.y);
            },
            update: function(dt) {
                return true;
            },
            newGame: function() {
                me.input.releasePointerEvent('pointerdown', this);
                // sets to make registration possible
                me.state.change(me.state.NEW);
            }
        })));

        me.game.world.addChild(new (me.Renderable.extend({
            init: function() {
                this._super(me.Renderable, "init", [380, 340, 250, 50]);
// draws continue screen 
                this.font = new me.Font("Arial", 46, "white");
                me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(this), true);
            },
            // draws link to continue to load screen
            draw: function(renderer) {
                this.font.draw(renderer.getContext(), "CONTINUE", this.pos.x, this.pos.y);
            },
            update: function(dt) {
                return true;
            },
            newGame: function() {

                me.input.releasePointerEvent('pointerdown', this);
                me.state.change(me.state.LOAD);
            }
        })));




    },
    /**	
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {

    }
});
