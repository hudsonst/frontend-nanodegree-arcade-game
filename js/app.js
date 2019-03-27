// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    //randomize starting point of enemy
    this.x = Math.floor(Math.random() * 1000);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    let random = Math.floor(Math.random() * 300) * dt;
    if (this.x < 420) {
        this.x = random + this.x;
    } else if (this.x > 420) {
        this.x = 0
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor(char, x, y) {
        this.char = char;
        this.x = x;
        this.y = y;
    }

    update(dt) {
        //Check collisions
        // loop thru allEnemies
        allEnemies.forEach(function(enemy) {
            let enemyX1 = Math.round(enemy.x) - 50;
            let enemyX2 = Math.round(enemy.x) + 50;
            let enemyY1 = enemy.y - 50;
            let enemyY2 = enemy.y + 50;
            if ((player.x >= enemyX1 && player.x <= enemyX2) && (player.y >= enemyY1 && player.y <= enemyY2)) {
                console.log("collision!");
                player.resetPlayer();
            };
        })

    }

    render() {
        ctx.drawImage(Resources.get(this.char), this.x, this.y);
    }

    handleInput(key) {
        if (key == 'left' && this.x > 0) {
            this.x = this.x - 35;
        };
        if (key == 'left' && this.x <= 0) {
            this.x = 0;
        };
        if (key == 'up' && this.y <= 440) {
            this.y = this.y - 30;
        };
        if (key == 'up' && this.y <= 0) {
            player.win();
            player.resetPlayer();
        };
        if (key == 'right' && this.x < 420) {
            this.x = this.x + 35;
        };
        if (key == 'right' && this.x > 420) {
            this.x = 420;
        };
        if (key == 'down' && this.y < 440) {
            this.y = this.y + 30
        };
        if (key == 'down' && this.y > 440) {
            this.y = 425;
        };
    }
    //Check win
    win() {
        if (player.y <= 0) {
            const modal = document.querySelector('.modal');
            modal.style.display = 'block';
            player.resetPlayer();
        };
    }

    resetPlayer() {
        this.x = 205;
        this.y = 425;
    }

}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let allEnemies = [];
/*function to create three enemy objects with y locations
and push them into allEnemies array*/
(function createEnemies() {
    startEnemies = [60, 130, 210];
    startEnemies.forEach(function(y) {
        let startEn = new Enemy();
        startEn.y = y;
        allEnemies.push(startEn);
    });
})();

const player = new Player('images/char-pink-girl.png', 205, 425);
let wins = 0;
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});