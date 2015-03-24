var Ship = (function () {
    function Ship(x, y, image, speed) {
        this.x = x;
        this.y = y;
        this.image = image;
        this.speed = speed;
        this.hp = 1;
        this.width = 40;
        this.height = 26;
        this.boundingBox = new Rectangle(x, y, this.width, this.height);
    }

    Ship.prototype.update = function () {
        //Move in directions;
        if (this.moveRight) {
            this.x += this.speed;
            this.boundingBox.x += this.speed;
            //console.log(this.x);
        }
        if (this.moveLeft) {
            this.x -= this.speed;
            this.boundingBox.x -= this.speed;
            //console.log("this.x");
        }
        if (this.moveUp) {
            this.y += this.speed;
            this.boundingBox.y += this.speed;
        }
        if (this.moveDown) {
            this.y -= this.speed;
            this.boundingBox.y -= this.speed;
        }
        //Check if going outside the canvas;
        if (this.x < 5) {
            this.x = 5;
            this.boundingBox.x = 5;
        }
        if (this.x > 655) {
            this.x = 655;
            this.boundingBox.x = 655;
        }
        if (this.y < 470) {
            this.y = 470;
            this.boundingBox.y = 470;
        }
        if (this.y > 520) {
            this.y = 520;
            this.boundingBox.y = 520;
        }
    };

    Ship.prototype.draw = function (ctx) {
        ctx.drawImage(this.image, this.x, this.y);
    };

    return Ship;
})();