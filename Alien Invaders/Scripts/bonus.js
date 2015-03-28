var Bonus = (function () {
    function Bonus(x, y) {
        this.x = x;
        this.y = y;
        this.image = new Image();
        this.image.src = 'Images/bonus.png';
        this.width = 15;
        this.height = 20;
        this.speed = 2;
        this.boundingBox = new Rectangle(x, y, this.width, this.height);
    }

    Bonus.prototype.update = function () {
        this.y += this.speed;
        this.boundingBox.y += this.speed;
    };

    Bonus.prototype.draw = function (ctx) {
        ctx.drawImage(this.image, this.x, this.y);
    };

    return Bonus;
})();