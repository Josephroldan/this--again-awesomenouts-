game.EnemyBaseEntity = me.Entity.extend({
    init: function(x, y, settings) {
        this._super(me.Entity, 'init', [x, y, {
                // places tower image and size for use
                image: "tower",
                width: 100,
                height: 100,
                spritewidth: "100",
                spriteheight: "100",
                getShape: function() {
                    return(new me.Rect(0, 0, 100, 70)).toPolygon();

                    this.body.onCollision = this.onCollision.bind(this);
                }
            }]);
        this.type = "EnemyBaseEntity";
        this.broken = false;
        //tells that the tower is not dead
        this.health = game.data.enemyBaseHealth;
        //uses global variable for health
        this.alwaysUpdate = true;
        this.renderable.addAnimation("idle", [0]);
        this.renderable.addAnimation("broken", [1]);
        this.renderable.setCurrentAnimation("idle");
        //adds and sets animations for tower
    },
    update: function(delta) {
        if (this.health <= 0) {
            this.broken = true;
            game.data.win = true;
            //says you win and tells if broken if health is = to 0
            this.renderable.setCurrentAnimation("broken");
        }
        this.body.update(delta);
        this._super(me.Entity, "update", [delta]);
        return true;

    },
    onCollision: function() {

    },
    loseHealth: function() {
        this.health--;
    }








});

