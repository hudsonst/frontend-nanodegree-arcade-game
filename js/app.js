"use strict";
class Enemy {
    constructor(y) {
        this.sprite = 'images/enemy-bug.png';
        //randomize starting point of enemy
        this.x = Math.floor(Math.random() * 1000);
        this.y = y;
        this.speed = Math.floor((Math.random() * 150) + 100);
    }



    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.

        if (this.x < 420) {
            this.x = (this.speed * dt) + this.x;
        } else if (this.x > 420) {
            this.x = 0;
        }
    }

    // Draw the enemy on the screen, required method for game
    render = function () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
}
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
        allEnemies.forEach((enemy) => {
            let enemyX1 = Math.round(enemy.x) - 50;
            let enemyX2 = Math.round(enemy.x) + 50;
            let enemyY1 = enemy.y - 50;
            let enemyY2 = enemy.y + 50;
            if ((this.x >= enemyX1 && this.x <= enemyX2) && (this.y >= enemyY1 && this.y <= enemyY2)) {
                //console.log("collision!");
                this.resetPlayer();
            }
        });

    }

    render() {
        ctx.drawImage(Resources.get(this.char), this.x, this.y);
    }

    handleInput(key) {
        if (key == 'left' && this.x > 0) {
            this.x = this.x - 35;
        }
        if (key == 'left' && this.x <= 0) {
            this.x = 0;
        }
        if (key == 'up' && this.y <= 440) {
            this.y = this.y - 30;
        }
        if (key == 'up' && this.y <= 0) {
            this.win();
            this.resetPlayer();
        }
        if (key == 'right' && this.x < 420) {
            this.x = this.x + 35;
        }
        if (key == 'right' && this.x > 420) {
            this.x = 420;
        }
        if (key == 'down' && this.y < 440) {
            this.y = this.y + 30;
        }
        if (key == 'down' && this.y > 440) {
            this.y = 425;
        }
    }

    //Check win
    win() {
        if (this.y <= 0) {
            modal.style.display = 'block';
            document.querySelector(".modalButton").addEventListener('click', reloadGame);
        }
    }

    resetPlayer() {
        this.x = 205;
        this.y = 425;
    }
}


function reloadGame() {
    modal.style.display = 'none';
    allEnemies.length = 0;
    newbugs();
}

function newbugs() {
    let bug1 = new Enemy(60);
    let bug2 = new Enemy(130);
    let bug3 = new Enemy(210);
    allEnemies.push(bug1, bug2, bug3);
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let allEnemies = [];
newbugs();


const player = new Player('images/char-pink-girl.png', 205, 425);
const modal = document.querySelector('.modal');
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});