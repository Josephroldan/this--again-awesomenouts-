game.EnemyCreep = me.Entity.extend({
    init: function(x, y, settings) {
        this._super(me.Entity, 'init', [x, y, {
                //places creep image and size
                image: "creep1",
                width: 32,
                height: 64,
                spritewidth: "32",
                spriteheight: "64",
                getShape: function() {
                    return(new me.Rect(0, 0, 32, 64)).toPolygon();
                }

            }]);
        this.health = game.data.enemyCreepHealth;
        this.attacking = false;
        //identifies enemy movement is attacking
        this.alwaysUpdate = true;
        this.now = new Date().getTime();
        this.lastAttacking = new Date().getTime();
        this.lastHit = new Date().getTime();
        this.body.setVelocity(3, 20);
        // sets movement speed
        this.type = "EnemyCreep";

//sets walking animation
        this.renderable.addAnimation("walk", [3, 4, 5], 80);
        this.renderable.setCurrentAnimation("walk");

    },
    //places ability for losehealth
    loseHealth: function(damage) {
        this.health = this.health - damage;

    },
    update: function(delta) {
        if (this.health <= 0) {
            me.game.world.removeChild(this);
        }
//removes creep if it dies
        this.now = new Date().getTime();

        this.body.vel.x -= this.body.accel.x * me.timer.tick;


        me.collision.check(this, true, this.collideHandler.bind(this), true);

        this.body.update(delta);


        this._super(me.Entity, "update", [delta]);



        return true;
    },
    collideHandler: function(response) {
        if (response.b.type === 'PlayerBaseEntity') {
            this.attacking = true;
            this.lastAttacking = this.now;
            this.body.vel.x = 0;
            this.pos.x = this.pos.x + 1;
            if ((this.now - this.lastHit >= 1000)) {
                this.lastHit = this.now;
                response.b.loseHealth(game.data.enemyCreepAttack);
                // tells to attack player base if in contact
            }



        } else if (response.b.type === 'PlayerEntity') {

            var ydif = this.pos.y - response.b.pos.y;
            var xdif = this.pos.x - response.b.pos.x;



            this.attacking = true;
            this.lastAttacking = this.now;
            if (xdif > 0) {
                this.pos.x = this.pos.x + 1;
                this.body.vel.x = 0;
            }
// sets in positions and values to attack players
            this.pos.x = this.pos.x + 1;
            if ((this.now - this.lastHit >= 1000) && xdif > 0) {
                this.lastHit = this.now;
                response.b.loseHealth(game.data.enemyCreepAttack);
            }

        }

    }

});


