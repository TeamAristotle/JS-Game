var goRight = false;
var goDown = true;
var Enemy = (function () {
    function Enemy(x, rowPos, y, image, speed) {
        this.rowPos = rowPos;
        this.x = x + rowPos * 50;
        this.y = y;
        this.image = image;
        this.speed = speed;
        this.hp = 1;
        this.width = 38;
        this.height = 28;
        //this.boundingBox = new Rectangle(x, y, this.width, this.height);
    }

    Enemy.prototype.update = function () {
        //Moving up and down;
        if (goDown) {
            this.y += this.speed * 2;
        } else {
            this.y -= this.speed;
        }
        if (this.y > 400) {
            this.y = 400;
            goDown = false;
        }
        if (this.y < 20) {
            this.y = 20;
            goDown = true;
        }
        //Move left to right;
        if (goRight) {
            this.x += this.speed / 2;
        } else {
            this.x -= this.speed / 2;
        }
        if (this.x > 650) {
            this.x = 650;
            goRight = false;
        }
        if (this.x < 5) {
            this.x = 5;
            goRight = true;
        }
    };

    Enemy.prototype.draw = function (ctx) {
        ctx.drawImage(this.image, this.x, this.y);
    };
    return Enemy;
})();