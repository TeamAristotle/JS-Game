var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

//Game is running;
var running = true,
    multiplierSpeed = 1,
    multiplierFire = 100,
    score = 0,
    gameMusic = document.getElementById('backgroundMusic'),
    musicPlaying = true;
    gameMusic.play();

//Player;
var shipImg = new Image();
shipImg.src = "Images/ship5.png";
var player = new Ship(315, 500, shipImg, 3, 20);

//Enemies;
var enemyImg = new Image();
var waveSpeed = 0.2,
    waveY = 20,
    waveX = 100,
    rowPos = 1,
    fireRate = 500,
    hp = 1,
    waveReady = 1,
    enemies = [];

//Bullets;
var greenBullet = new Image();
greenBullet.src = "Images/bullet.png";
var redBullets = new Image();
redBullets.src = "Images/bullet_enemy.png";
var playerBullets = [],
    readyToShoot = 0,
    enemyBullets = [],
    playerBulletSpeed = 1,
    enemyBulletSpeed = 1;

//Input;
var input = new Input();
listener(input);

function start() {
    //Styles;
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('canvas').style.display = 'flex';
    document.getElementById('info').style.display = 'flex';
    document.getElementById('start').style.display = 'none';
    document.getElementById('playerHealth').innerHTML = player.hp;
    //Start game;
    update();
}

function mute() {
    if (musicPlaying) {
        gameMusic.pause();
        musicPlaying = false;
        document.getElementById('mute-btn').value = 'Unmute sound';
    } else {
        gameMusic.play();
        musicPlaying = true;
        document.getElementById('mute-btn').value = 'Mute sound';
    }
}

function restart() {
    if (!running) {
        running = true;
        //Stats;
        multiplierSpeed = 1;
        multiplierFire = 100;
        score = 0;
        document.getElementById('score').innerHTML = score;
        document.getElementById('score-over').innerHTML = score;
        //Objs;
        shipImg.src = "Images/ship5.png";
        player = new Ship(315, 500, shipImg, 3, 20);
        playerBullets = [];
        readyToShoot = 0;
        enemyBullets = [];
        hp = 1;
        waveReady = 1;
        waveSpeed = 0.2;
        enemies = [];
        start();
        //Styles;
        document.getElementById('playerHealth').innerHTML = player.hp;
        document.getElementById('restart').style.display = 'none';
        document.getElementById('btn-restart').style.display = 'none';
    }
}

//Generate new waves;
function newWave() {
    if (enemies.length === 0) {
        if (waveReady % 100 === 0) {
            //Background;
            var rngImg = Math.floor((Math.random() * 4));
            document.getElementById('body').style.backgroundImage = 'url("Images/Backgrounds/background' + rngImg + '.jpg")';
            waveReady = 1;
            //Enemies wave;
            rngImg = Math.floor((Math.random() * 4));
            enemyImg.src = "Images/enemy" + rngImg + ".png";
            enemies =
            [
                new Enemy(waveX, 1, waveY, enemyImg, waveSpeed * multiplierSpeed, fireRate - multiplierFire, hp),
                new Enemy(waveX, 2, waveY, enemyImg, waveSpeed * multiplierSpeed, fireRate - multiplierFire, hp),
                new Enemy(waveX, 3, waveY, enemyImg, waveSpeed * multiplierSpeed, fireRate - multiplierFire, hp),
                new Enemy(waveX, 4, waveY, enemyImg, waveSpeed * multiplierSpeed, fireRate - multiplierFire, hp),
                new Enemy(waveX, 5, waveY, enemyImg, waveSpeed * multiplierSpeed, fireRate - multiplierFire, hp),
                new Enemy(waveX, 6, waveY, enemyImg, waveSpeed * multiplierSpeed, fireRate - multiplierFire, hp),
                new Enemy(waveX, 7, waveY, enemyImg, waveSpeed * multiplierSpeed, fireRate - multiplierFire, hp),
                new Enemy(waveX, 8, waveY, enemyImg, waveSpeed * multiplierSpeed, fireRate - multiplierFire, hp),
                new Enemy(waveX, 1, waveY + 50, enemyImg, waveSpeed * multiplierSpeed, fireRate - multiplierFire, hp),
                new Enemy(waveX, 2, waveY + 50, enemyImg, waveSpeed * multiplierSpeed, fireRate - multiplierFire, hp),
                new Enemy(waveX, 3, waveY + 50, enemyImg, waveSpeed * multiplierSpeed, fireRate - multiplierFire, hp),
                new Enemy(waveX, 4, waveY + 50, enemyImg, waveSpeed * multiplierSpeed, fireRate - multiplierFire, hp),
                new Enemy(waveX, 5, waveY + 50, enemyImg, waveSpeed * multiplierSpeed, fireRate - multiplierFire, hp),
                new Enemy(waveX, 6, waveY + 50, enemyImg, waveSpeed * multiplierSpeed, fireRate - multiplierFire, hp),
                new Enemy(waveX, 7, waveY + 50, enemyImg, waveSpeed * multiplierSpeed, fireRate - multiplierFire, hp),
                new Enemy(waveX, 8, waveY + 50, enemyImg, waveSpeed * multiplierSpeed, fireRate - multiplierFire, hp),
                new Enemy(waveX, 1, waveY + 100, enemyImg, waveSpeed * multiplierSpeed, fireRate - multiplierFire, hp),
                new Enemy(waveX, 2, waveY + 100, enemyImg, waveSpeed * multiplierSpeed, fireRate - multiplierFire, hp),
                new Enemy(waveX, 3, waveY + 100, enemyImg, waveSpeed * multiplierSpeed, fireRate - multiplierFire, hp),
                new Enemy(waveX, 4, waveY + 100, enemyImg, waveSpeed * multiplierSpeed, fireRate - multiplierFire, hp),
                new Enemy(waveX, 5, waveY + 100, enemyImg, waveSpeed * multiplierSpeed, fireRate - multiplierFire, hp),
                new Enemy(waveX, 6, waveY + 100, enemyImg, waveSpeed * multiplierSpeed, fireRate - multiplierFire, hp),
                new Enemy(waveX, 7, waveY + 100, enemyImg, waveSpeed * multiplierSpeed, fireRate - multiplierFire, hp),
                new Enemy(waveX, 8, waveY + 100, enemyImg, waveSpeed * multiplierSpeed, fireRate - multiplierFire, hp),
                new Enemy(waveX, 1, waveY + 150, enemyImg, waveSpeed * multiplierSpeed, fireRate - multiplierFire, hp),
                new Enemy(waveX, 2, waveY + 150, enemyImg, waveSpeed * multiplierSpeed, fireRate - multiplierFire, hp),
                new Enemy(waveX, 3, waveY + 150, enemyImg, waveSpeed * multiplierSpeed, fireRate - multiplierFire, hp),
                new Enemy(waveX, 4, waveY + 150, enemyImg, waveSpeed * multiplierSpeed, fireRate - multiplierFire, hp),
                new Enemy(waveX, 5, waveY + 150, enemyImg, waveSpeed * multiplierSpeed, fireRate - multiplierFire, hp),
                new Enemy(waveX, 6, waveY + 150, enemyImg, waveSpeed * multiplierSpeed, fireRate - multiplierFire, hp),
                new Enemy(waveX, 7, waveY + 150, enemyImg, waveSpeed * multiplierSpeed, fireRate - multiplierFire, hp),
                new Enemy(waveX, 8, waveY + 150, enemyImg, waveSpeed * multiplierSpeed, fireRate - multiplierFire, hp)
            ];
            multiplierSpeed += 0.5;
            multiplierFire += 100;
            hp++;
            if (multiplierFire >= 300) {
                multiplierFire = 300;
            }
        }
        waveReady++;
    }
}

function render(ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.draw(ctx);
    //player.boundingBox.draw(ctx);
    enemies.forEach(function (enemy) {
        enemy.draw(ctx);
        //enemy.boundingBox.draw(ctx);
    });
    playerBullets.forEach(function (bullet) {
        bullet.draw(ctx);
        //bullet.boundingBox.draw(ctx);
    });
    enemyBullets.forEach(function (bullet) {
        bullet.draw(ctx);
        //bullet.boundingBox.draw(ctx);
    });
}

function tick() {
    //Generate new wave;
    newWave();
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
            var bullet = new Bullet(player.x + 18, player.y - 12, greenBullet, playerBulletSpeed, true);
            playerBullets.push(bullet);
            var shootSound = document.getElementById('shoot');
            if (musicPlaying) {
                shootSound.play();
            }
        }
        readyToShoot++;
    } else {
        readyToShoot = 0;
    }

    //Update objs;
    player.update();
    enemies.forEach(function (enemy) {
        enemy.update();
        //Enemy fire;
        var fire = Math.floor((Math.random() * enemy.fireRate));
        //console.log(fire);
        if (fire === 0) {
            //console.log("fire");
            var bullet = new Bullet(enemy.x + 18, enemy.y + 12, redBullets, enemyBulletSpeed, false);
            enemyBullets.push(bullet);
        }
    });
    //Player bullets;
    playerBullets.map(function (bullet) {
        bullet.update();
        //Remove bullets gone outside of the canvas;
        if (bullet.y > 560 || bullet.y < 0) {
            playerBullets.remove(bullet);
        }
        //Hit enemy;
        enemies.map(function (enemy) {
            if (enemy.boundingBox.intersects(bullet.boundingBox)) {
                var enemyExplosion = document.getElementById('enemyExplosion');
                if (musicPlaying) {
                    enemyExplosion.play();
                }
                //console.log("hit");
                if (enemy.hp === 0) {
                    enemies.remove(enemy);
                } else {
                    enemy.removeHp();
                    if (enemy.hp === 0) {
                        enemies.remove(enemy);
                    }
                }
                playerBullets.remove(bullet);
                //increase score;
                score += 100;
                document.getElementById('score').innerHTML = score;
            }
        });
        //Hit enemy bullet;
        enemyBullets.map(function (enemyBullet) {
            if (enemyBullet.boundingBox.intersects(bullet.boundingBox)) {
                playerBullets.remove(bullet);
                enemyBullets.remove(enemyBullet);
            }
        });
    });
    //Enemy bullets;
    enemyBullets.map(function (bullet) {
        bullet.update();
        //Remove bullets gone outside of the canvas;
        if (bullet.y > 560 || bullet.y < 0) {
            //console.log("f");
            enemyBullets.remove(bullet);
        }
        //Hit;
        if (player.boundingBox.intersects(bullet.boundingBox)) {
            var playerExplosion = document.getElementById('playerExplosion');
            if (musicPlaying) {
                playerExplosion.play();
            }
            //console.log("hit");
            enemyBullets.remove(bullet);
            player.removeHp();
            document.getElementById('playerHealth').innerHTML = player.hp;
            //Remove HP and stop game;
            if (player.hp === 0) {
                console.log("Game Over");
                running = false;
                //Music;
                //gameMusic.pause();
                //gameMusic.currentTime = 0;
                //Styles;
                document.getElementById('score-over').innerHTML = score;
                document.getElementById('restart').style.display = 'block';
                document.getElementById('overlay').style.display = 'flex';
                setTimeout(function () {
                    document.getElementById('canvas').style.display = 'none';
                    document.getElementById('info').style.display = 'none';
                    document.getElementById('btn-restart').style.display = 'flex';
                    document.getElementById('body').style.backgroundImage = 'url("Images/Backgrounds/planets.jpg")';
                }, 1500);
            } else {
                shipImg.src = "Images/ship" + player.hp + ".png";
            }
        }
    });
}

function update() {
    tick();
    render(ctx);
    if (running) {
        requestAnimationFrame(update);
    }
}