//Global var so the entire row can move together;
var goRight = false,
    goDown = true;

var Enemy = (function () {
    function Enemy(x, rowPos, y, image, speed, fireRate, hp) {
        this.rowPos = rowPos;
        this.x = x + rowPos * 50;
        this.y = y;
        this.image = image;
        this.speed = speed;
        this.fireRate = fireRate;
        this.hp = hp;
        this.width = 38;
        this.height = 28;
        this.boundingBox = new Rectangle(x + rowPos * 50, y, this.width, this.height);
    }

    Enemy.prototype.update = function () {
        //Moving up and down;
        if (goDown) {
            this.y += this.speed * 2;
            this.boundingBox.y += this.speed * 2;
        } else {
            this.y -= this.speed;
            this.boundingBox.y -= this.speed;
        }
        if (this.y > 400) {
            this.y = 400;
            this.boundingBox.y = 400;
            goDown = false;
        }
        if (this.y < 20) {
            this.y = 20;
            this.boundingBox.y = 20;
            goDown = true;
        }
        //Move left to right;
        if (goRight) {
            this.x += this.speed / 2;
            this.boundingBox.x += this.speed / 2;
        } else {
            this.x -= this.speed / 2;
            this.boundingBox.x -= this.speed / 2;
        }
        if (this.x > 650) {
            this.x = 650;
            this.boundingBox.x = 650;
            goRight = false;
        }
        if (this.x < 5) {
            this.x = 5;
            this.boundingBox.x = 5;
            goRight = true;
        }
    };

    Enemy.prototype.removeHp = function () {
        this.hp--;
    };

    Enemy.prototype.draw = function (ctx) {
        ctx.drawImage(this.image, this.x, this.y);
    };
    return Enemy;
})();