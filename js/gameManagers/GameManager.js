






game.ExperienceManager = Object.extend({
    init: function(x, y, settings) {
        this.alwaysUpdate = true;
        this.gameover = false;
    },
    update: function() {
        if (game.data.win === true && !this.gameover) {
            this.gameOver(true);
            alert(" YOU WON SURPRIESINGLY");
        } else if (game.data.win === false && !this.gameover) {
            alert("you suck!!!");
            this.gameOver(false);
        }






        return true;
    },
    gameOver: function(win) {
        if (win === true) {
            game.data.exp += 10;
            //gives 10 exp for win
        } else {
            game.data.exp += 1;
            //for losses gives one
        }
        console.log(game.data.exp);
        this.gameover = true;
        me.save.exp = game.data.exp;
// saves exp for game





        $.ajax({
            type: "POST",
            url: "php/controller/save-user.php",
            data: {
                exp: game.data.exp,
                exp1: game.data.exp1,
                exp2: game.data.exp2,
                exp3: game.data.exp3,
                exp4: game.data.exp4
            },
            dataType: "text"
        })
                .success(function(response) {
                    if (response === "true") {
                        me.state.change(me.state.MENU);
                    } else {
                        alert(response);
                    }
                })
                .fail(function(response) {
                    alert("Fail");
                });

    }













});


