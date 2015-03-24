var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

//Player;
var shipImg = new Image();
shipImg.src = "Images/ship.png";
var player = new Ship(315, 500, shipImg, 5, 20);

//Enemies;
var enemyImg = new Image();
enemyImg.src = "Images/enemy.png";
var waveSpeed = 0.1;
var waveY = 20;
var waveX = 100;
var rowPos = 1;
var enemies =
[
    new Enemy(waveX, 1, waveY, enemyImg, waveSpeed),
    new Enemy(waveX, 2, waveY, enemyImg, waveSpeed),
    new Enemy(waveX, 3, waveY, enemyImg, waveSpeed),
    new Enemy(waveX, 4, waveY, enemyImg, waveSpeed),
    new Enemy(waveX, 5, waveY, enemyImg, waveSpeed),
    new Enemy(waveX, 6, waveY, enemyImg, waveSpeed),
    new Enemy(waveX, 7, waveY, enemyImg, waveSpeed),
    new Enemy(waveX, 8, waveY, enemyImg, waveSpeed),
    new Enemy(waveX, 1, waveY + 50, enemyImg, waveSpeed),
    new Enemy(waveX, 2, waveY + 50, enemyImg, waveSpeed),
    new Enemy(waveX, 3, waveY + 50, enemyImg, waveSpeed),
    new Enemy(waveX, 4, waveY + 50, enemyImg, waveSpeed),
    new Enemy(waveX, 5, waveY + 50, enemyImg, waveSpeed),
    new Enemy(waveX, 6, waveY + 50, enemyImg, waveSpeed),
    new Enemy(waveX, 7, waveY + 50, enemyImg, waveSpeed),
    new Enemy(waveX, 8, waveY + 50, enemyImg, waveSpeed),
    new Enemy(waveX, 1, waveY + 100, enemyImg, waveSpeed),
    new Enemy(waveX, 2, waveY + 100, enemyImg, waveSpeed),
    new Enemy(waveX, 3, waveY + 100, enemyImg, waveSpeed),
    new Enemy(waveX, 4, waveY + 100, enemyImg, waveSpeed),
    new Enemy(waveX, 5, waveY + 100, enemyImg, waveSpeed),
    new Enemy(waveX, 6, waveY + 100, enemyImg, waveSpeed),
    new Enemy(waveX, 7, waveY + 100, enemyImg, waveSpeed),
    new Enemy(waveX, 8, waveY + 100, enemyImg, waveSpeed),
    new Enemy(waveX, 1, waveY + 150, enemyImg, waveSpeed),
    new Enemy(waveX, 2, waveY + 150, enemyImg, waveSpeed),
    new Enemy(waveX, 3, waveY + 150, enemyImg, waveSpeed),
    new Enemy(waveX, 4, waveY + 150, enemyImg, waveSpeed),
    new Enemy(waveX, 5, waveY + 150, enemyImg, waveSpeed),
    new Enemy(waveX, 6, waveY + 150, enemyImg, waveSpeed),
    new Enemy(waveX, 7, waveY + 150, enemyImg, waveSpeed),
    new Enemy(waveX, 8, waveY + 150, enemyImg, waveSpeed)
];

//Bullets;
var greenBullet = new Image();
greenBullet.src = "Images/bullet.png";
var allBullets = [];
var readyToShoot = 0;

//Input;
var input = new Input();
listener(input);

function render(ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.draw(ctx);
    //player.boundingBox.draw(ctx);
    enemies.forEach(function (enemy) {
        enemy.draw(ctx);
        //enemy.boundingBox.draw(ctx);
    });
    allBullets.forEach(function (bullet) {
        bullet.draw(ctx);
        //bullet.boundingBox.draw(ctx);
    });
}

function tick() {
    //Move directions;
    if (input.d) {
        player.moveRight = true;

    } else {
        player.moveRight = false;
    }
    if (input.a) {
        player.moveLeft = true;

    } else {
        player.moveLeft = false;
    }
    if (input.s) {
        player.moveUp = true;

    } else {
        player.moveUp = false;

    }
    if (input.w) {
        player.moveDown = true;

    } else {
        player.moveDown = false;
    }
    //Fire;
    if (input.space) {
        //Delay Fire rate;
        if (readyToShoot % player.fireRate === 0) {
            var bullet = new Bullet(player.x + 18, player.y - 12, greenBullet, true);
            allBullets.push(bullet);
        }
        readyToShoot++;
    } else {
        readyToShoot = 0;
    }

    //Update objs;
    player.update();
    enemies.forEach(function (enemy) {
        enemy.update();
    });
    allBullets.map(function (bullet) {
        bullet.update();
        //Remove bullets gone outside of the canvas;
        if (bullet.y > 560 || bullet.y < 0) {
            //console.log("f");
            allBullets.remove(bullet);
        }
        //Hit;
        enemies.map(function (enemy) {
            if (enemy.boundingBox.intersects(bullet.boundingBox)) {
                //console.log("hit");
                enemies.remove(enemy);
                allBullets.remove(bullet);
            }
        });
    });

}

function update() {
    tick();
    render(ctx);
    requestAnimationFrame(update);
}

update();