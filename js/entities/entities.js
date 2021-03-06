// TODO
game.PlayerEntity = me.Entity.extend({
    init: function(x, y, settings) {
        // calls all of these functions
        this.setSuper(x, y);
        this.setPlayerTimers();
        this.setAttributes();
        this.setFlags();
        this.addAnimation();
        this.type = "PlayerEntity";

// keeps track of direction





        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
        this.renderable.setCurrentAnimation("idle");
    },
    setSuper: function(x, y) {
        this._super(me.Entity, 'init', [x, y, {
                //draws player
                image: "player",
                width: 64,
                height: 64,
                spritewidth: "64",
                spriteheight: "64",
                getShape: function() {
                    return(new me.Rect(0, 0, 64, 64)).toPolygon();
                    //sets player size and shape
                }
            }]);
    },
    setPlayerTimers: function() {
        this.now = new Date().getTime();
        this.lastHit = this.now;
        //set player hit timers
        this.lastAttack = new Date().getTime();
    },
    setAttributes: function() {
        this.health = game.data.playerHealth;
//sets speed health and damage
        this.body.setVelocity(game.data.playerMoveSpeed, 20);
        this.attack = game.data.playerAttack;


    },
    setFlags: function() {
        this.facing = "right";
        this.dead = false;
        this.attacking = false;
    },
    addAnimation: function() {
        this.renderable.addAnimation("idle", [78]);
        this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
        this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);
//sets photos for walking attacking and more
    },
    update: function(delta) {
        this.now = new Date().getTime();
        this.dead = this.checkIfDead();
        this.checkKeyPressesAndMove();

        this.setAnimation();




        me.collision.check(this, true, this.collideHandler.bind(this), true);
        this.body.update(delta);
        this._super(me.Entity, "update", [delta]);
        return true;
    },
    checkKeyPressesAndMove: function() {

        if (me.input.isKeyPressed("right")) {
            this.moveRight();
        }
        else if (me.input.isKeyPressed("left")) {
            this.moveLeft();
        }
        // tells if movement keys were pressed to call functions
        else {
            this.body.vel.x = 0;
        }

        if (me.input.isKeyPressed("jump")) {
            if (!this.body.jumping && !this.body.falling) {
                this.jumping();
            }
            // allows jumping
        }
        this.attacking = me.input.isKeyPressed("attack");

    },
    setAnimation: function() {
        if (this.attacking) {
            if (!this.renderable.isCurrentAnimation("attack")) {

                //sets animation to attack and idle after
                this.renderable.setCurrentAnimation("attack", "idle");
                //resets animation process
                this.renderable.setAnimationFrame();
            }


        } else if (this.body.vel.x !== 0 && !this.renderable.isCurrentAnimation("attack")) {
            if (!this.renderable.isCurrentAnimation("walk")) {

                this.renderable.setCurrentAnimation("walk");
            }
//sets up attacking process
        } else if (!this.renderable.isCurrentAnimation("attack")) {
            this.renderable.setCurrentAnimation("idle");
        }

    },
    moveRight: function() {
        //sets x position by adding value set in set velocity
        //multiplying by me.timer.tick 
        //me.timer.tick smooths movement
        this.body.vel.x += this.body.accel.x * me.timer.tick;
        this.facing = "right";
        this.flipX(true);
    },
    moveLeft: function() {
        //tells character to move left
        this.facing = "left";
        this.flipX(false);
        // flips animations for moving right
        this.body.vel.x -= this.body.accel.x * me.timer.tick;
        // sets velocity and speed for moving left
    },
    jumping: function() {
        this.body.vel.y = -this.body.maxVel.y * me.timer.tick;
        this.body.jumping = true;
    },
    checkIfDead: function() {
        if (this.health <= 0) {
            return true;
        }
        return false;
    },
    loseHealth: function(damage) {
        this.health = this.health - damage;
    },
    collideHandler: function(response) {
        if (response.b.type === 'EnemyBaseEntity') {
            this.collideWithEnemyBase(response);




        } else if (response.b.type === 'EnemyCreep') {
            this.collideWithEnemy(response);



        }
    },
    collideWithEnemyBase: function(response) {



        var ydif = this.pos.y - response.b.pos.y;
        var xdif = this.pos.x - response.b.pos.x;
        if (ydif < -40 && xdif < 70 && xdif > -35) {
            this.body.falling = false;
            this.body.vel.y = -1;
        }
        else if (xdif > -35 && this.facing === 'right' && (xdif < 0)) {
            this.body.vel.x = 0;
            this.pos.x = this.pos.x - 1;
        }
        else if (xdif < 70 && this.facing === 'left' && (xdif > 0)) {
            this.body.vel.x = 0;
            this.pos.x = this.pos.x + 1;
        }
        if (this.renderable.isCurrentAnimation("attack") && this.now - this.lastHit >= game.data.playerAttackTimer) {
            this.lastHit = this.now;
            response.b.loseHealth(game.data.playerAttack);
//sets base collision
        }

    },
    collideWithEnemy: function(response) {

        var ydif = this.pos.y - response.b.pos.y;
        var xdif = this.pos.x - response.b.pos.x;
        this.stopMovement(xdif);


        if (this.checkAttack(xdif, ydif)) {
            this.hitCreep(response);
            console.log("something else");
        }
        ;

    },
    stopMovement: function(xdif) {
        if (xdif > 0) {
            this.pos.x = this.pos.x + 1;
            if (this.facing === "left") {
                this.body.vel.x = 0;
            }
            //sets movement pos
        } else {
            if (this.facing === "right") {
                this.body.vel.x = 0;
            }
            this.pos.x = this.pos.x - 1;
        }
    },
    checkAttack: function(xdif, ydif, response) {

        if (this.renderable.isCurrentAnimation("attack") && (this.now - this.lastHit >= game.data.playerAttackTimer)
                && (Math.abs(ydif) <= 40) &&
                (((xdif > 0) && this.facing === "left") || ((xdif < 0) && this.facing === "right"))
                ) {
            console.log("Hit");
            this.lastHit = this.now;
            return true;
        }
        return false;

    },
    hitCreep: function(response) {
        if (response.b.health <= game.data.playerAttack) {
            game.data.gold += 1;
        }
//sets gold acumulation in fighting creeps
        response.b.loseHealth(game.data.playerAttack);
    }














});






