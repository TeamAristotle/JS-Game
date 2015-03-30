var Bomb = (function () {
    function Bomb(x, y, speed) {
        this.x = x;
        this.y = y;
        this.image = new Image();
        this.image.src = 'Images/bomb.png';
        this.hp = 10;
        this.width = 50;
        this.height = 50;
        this.speed = speed;
        this.boundingBox = new Rectangle(x, y, this.width, this.height);
    }

    Bomb.prototype.removeHp = function () {
        this.hp--;
    };

    Bomb.prototype.update = function () {
        this.y += this.speed;
        this.boundingBox.y += this.speed;
    };

    Bomb.prototype.draw = function (ctx) {
        ctx.drawImage(this.image, this.x, this.y);
    };

    return Bomb;
})();