// TODO
game.PlayerEntity = me.Entity.extend({
    init: function(x, y, settings) {
        this.setSuper();
        this.setPlayerTimers();
        this.setAttributes();
        this.setFlags();
        this.addAnimation();
        this.type = "PlayerEntity";

// keeps track of direction
        




        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
        this.renderable.setCurrentAnimation("idle"); 
    },
    setSuper: function() {
        this._super(me.Entity, 'init', [x, y, {
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
        this.lastAttack = new Date().getTime();
    },
    
    setAttributes: function() {
        this.health = game.data.playerHealth;
        this.body.setVelocity(game.data.playerMoveSpeed, 20);
        this.attack = game.data.playerAttack;


    },
    
    setFlags:function(){
        this.facing = "right";
        this.dead = false;
    },
    
    addAnimation: function(){
         this.renderable.addAnimation("idle", [78]);
        this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
        this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);
      
    },
    
    
    update: function(delta) {
        this.now = new Date().getTime();
        this.dead = checkIfDead();
        
       


        if (me.input.isKeyPressed("right")) {
            //sets x position by adding value set in set velocity
            //multiplying by me.timer.tick 
            //me.timer.tick smooths movement
            this.body.vel.x += this.body.accel.x * me.timer.tick;
            this.facing = "right";
            this.flipX(true);
        }
        else if (me.input.isKeyPressed("left")) {
            //tells character to move left
            this.facing = "left";
            this.flipX(false);
            // flips animations for moving right
            this.body.vel.x -= this.body.accel.x * me.timer.tick;
            // sets velocity and speed for moving left
        }
        else {
            this.body.vel.x = 0;
        }

        if (me.input.isKeyPressed("jump")) {
            if (!this.body.jumping && !this.body.falling) {
                this.body.vel.y = -this.body.maxVel.y * me.timer.tick;
                this.body.jumping = true;
            }
        }


        if (me.input.isKeyPressed("attack")) {
            if (!this.renderable.isCurrentAnimation("attack")) {

                //sets animation to attack and idle after
                this.renderable.setCurrentAnimation("attack", "idle");
                //resets animation process
                this.renderable.setAnimationFrame();
            }


        }




        else if (this.body.vel.x !== 0 && !this.renderable.isCurrentAnimation("attack")) {
            if (!this.renderable.isCurrentAnimation("walk")) {

                this.renderable.setCurrentAnimation("walk");
            }

        } else if (!this.renderable.isCurrentAnimation("attack")) {
            this.renderable.setCurrentAnimation("idle");
        }
        me.collision.check(this, true, this.collideHandler.bind(this), true);
        this.body.update(delta);
        this._super(me.Entity, "update", [delta]);
        return true;
    },
    
    checkIfDead:function(){
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

            }

        } else if (response.b.type === 'EnemyCreep') {

            var ydif = this.pos.y - response.b.pos.y;
            var xdif = this.pos.x - response.b.pos.x;

            if (xdif > 0) {
                this.pos.x = this.pos.x + 1;
                if (this.facing === "left") {
                    this.body.vel.x = 0;
                }
            } else {
                if (this.facing === "right") {
                    this.body.vel.x = 0;
                }
                this.pos.x = this.pos.x - 1;
            }
            if (this.renderable.isCurrentAnimation("attack") && this.now - this.lastHit >= game.data.playerAttackTimer
                    && (Math.abs(ydif) <= 40) &&
                    (((xdif > 0) && this.facing === "left") || ((xdif < 0) && this.facing === "right"))
                    ) {

                this.lastHit = this.now;

                if (response.b.health <= game.data.playerAttack) {
                    game.data.gold += 1;
                }

                response.b.loseHealth(game.data.playerAttack);
            }


        }
    }



});






