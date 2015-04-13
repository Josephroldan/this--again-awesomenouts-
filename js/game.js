
/* Game namespace */
var game = {
    // an object where to store game information
    data: {
        // score
        score: 0,
        enemyBaseHealth: 10,
        playerBaseHealth: 10,
        enemyCreepHealth: 5,
        playerHealth: 10,
        enemyCreepAttack: 1,
        playerAttack: 1,
        enemyCreepAttackTimer: 1000,
        playerAttackTimer: 1000,
        playerMoveSpeed: 5,
        creepMoveSpeed: 5,
        gameManager: "",
        heroDeathManager:"",
        player: "",
        exp: 0,
        gold: 0,
        exp1: 0,
        exp2: 0,
        exp3: 0,
        win:""








   },
    // Run on page load.
    "onload": function() {
        // Initialize the video.
        if (!me.video.init("screen", me.video.CANVAS, 1067, 600, true, '1.0')) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }

        // add "#debug" to the URL to enable the debug Panel
        if (document.location.hash === "#debug") {
            window.onReady(function() {
                me.plugin.register.defer(this, debugPanel, "debug");
            });
        }


me.save.add({ exp1: 0, exp2: 0, exp3: 0});

game.data.exp



        // Initialize the audio.
        me.audio.init("mp3,ogg");

        // Set a callback to run when loading is complete.
        me.loader.onload = this.loaded.bind(this);

        // Load the resources.
        me.loader.preload(game.resources);

        // Initialize melonJS and display a loading screen.
        me.state.change(me.state.LOADING);
    },
    // Run on game resources loaded.
    "loaded": function() {
        me.pool.register("player", game.PlayerEntity, true);
        me.pool.register("PlayerBase", game.PlayerBaseEntity, true);
        me.pool.register("EnemyBase", game.EnemyBaseEntity, true);
        me.pool.register("EnemyCreep", game.EnemyCreep, true);
        me.pool.register("GameManager", game.GameManager, true);
         me.pool.register("HeroDeathManager", game.HeroDeathManager, true);
 me.pool.register("ExperienceManager", game.ExperienceManager, true);

        me.state.set(me.state.MENU, new game.TitleScreen());
        me.state.set(me.state.PLAY, new game.PlayScreen());

        // Start the game.
        me.state.change(me.state.MENU);
    }
};
