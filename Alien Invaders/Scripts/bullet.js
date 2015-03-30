var Bullet = (function () {
    function Bullet(x, y, image, speed, directionUp) {
        this.x = x;
        this.y = y;
        this.image = image;
        this.speed = speed;
        this.width = 2;
        this.height = 14;
        this.goingUp = directionUp;
        this.boundingBox = new Rectangle(x, y, this.width, this.height);
    }

    Bullet.prototype.update = function () {
        if (this.goingUp) {
            this.y -= this.speed;
            this.boundingBox.y -= this.speed;
        } else { //Going down;
            this.y += this.speed;
            this.boundingBox.y += this.speed;
        }
    };

    Bullet.prototype.draw = function (ctx) {
        ctx.drawImage(this.image, this.x, this.y);
    };

    return Bullet;

})();