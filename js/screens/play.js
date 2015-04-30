game.PlayScreen = me.ScreenObject.extend({
    /**
     *  action to perform on state change
     */
    onResetEvent: function() {
        // reset the score
        game.data.score = 0;

        me.levelDirector.loadLevel("level01");

        this.resetPlayer(0, 420);


        //puts starting coordinates
        var gamemanager = me.pool.pull("GameManager", 0, 0, {});
        me.game.world.addChild(gamemanager, 0);

        var heroDeathmanager = me.pool.pull("HeroDeathManager", 0, 0, {});
        me.game.world.addChild(heroDeathmanager, 0);


        var experienceManager = me.pool.pull("ExperienceManager", 0, 0, {});
        me.game.world.addChild(experienceManager, 0);

        var spendGold = me.pool.pull("SpendGold", 0, 0, {});
        me.game.world.addChild(spendGold, 0);








        me.input.bindKey(me.input.KEY.ESC, "buy");

        me.input.bindKey(me.input.KEY.Q, "skill1");
        me.input.bindKey(me.input.KEY.W, "skill2");
        me.input.bindKey(me.input.KEY.E, "skill3");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
//binds all of these keys for spec
        me.input.bindKey(me.input.KEY.LEFT, "left");
        // binds left arrow key for left direction
        me.input.bindKey(me.input.KEY.UP, "jump");

        me.input.bindKey(me.input.KEY.A, "attack");


        //binds movement to right arrow key
        // add our HUD to the game world
        this.HUD = new game.HUD.Container();
        me.game.world.addChild(this.HUD);
    },
    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
        // remove the HUD from the game world
        me.game.world.removeChild(this.HUD);


    },
    resetPlayer: function(x, y) {
        game.data.player = me.pool.pull("player", x, y, {});
        me.game.world.addChild(game.data.player, 20);
    }




});
