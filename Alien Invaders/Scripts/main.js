var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

//Game is running;
var running = true,
    multiplierSpeed = 1,
    multiplierFire = 15,
    score = 0,
    gameMusic = document.getElementById('backgroundMusic'),
    musicPlaying = true,
    level = 0;

gameMusic.play();

//Player and bonuses;
var shipImg = new Image();
var rng = Math.floor(Math.random() * 3 + 1);
shipImg.src = "Images/ship" + rng + ".png";
var playerSpeed = 20,
    defPlayerSpeed = 20,
    player = new Ship(315, 500, shipImg, 3, playerSpeed),
    bonuses = [],
    bonusActive = false,
    fireBonusTimer = 1,
    bulletsActive = false,
    superBulletsTimer = 1,
    bonusSpeed = false,
    speedTimer = 1,
    freezeActive = false,
    freezeTimer = 1;

//Enemies;
var enemyImg = new Image(),
    waveSpeed = 0.2,
    defWaveSpeed = 0.2,
    waveY = 20,
    waveX = 100,
    rowPos = 1,
    fireRate = 500,
    hp = 1,
    waveReady = 1,
    enemies = [];

//Bullets and Bombs;
var greenBullet = new Image();
greenBullet.src = "Images/bullet.png";
var redBullets = new Image();
redBullets.src = "Images/bullet_enemy.png";
var playerBullets = [],
    readyToShoot = 0,
    enemyBullets = [],
    playerBulletSpeed = 1,
    defBulletSpeed = 1,
    enemyBulletSpeed = 1,
    bombs = [];

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
    document.getElementById('level').innerHTML = level;
    //Start game;
    update();
}

function restart() {
    if (!running) {
        running = true;
        //Stats;
        multiplierSpeed = 1;
        multiplierFire = 15;
        score = 0;
        level = 0;
        hp = 1;
        waveReady = 1;
        waveSpeed = 0.2;
        readyToShoot = 0;
        document.getElementById('score').innerHTML = score;
        document.getElementById('score-over').innerHTML = score;
        //Objs;
        rng = Math.floor(Math.random() * 3 + 1);
        shipImg.src = "Images/ship" + rng + ".png";
        player = new Ship(315, 500, shipImg, 3, 20);
        playerBullets = [];
        enemyBullets = [];
        enemies = [];
        bonuses = [];
        bombs = [];
        //Styles;
        document.getElementById('playerHealth').innerHTML = player.hp;
        document.getElementById('restart').style.display = 'none';
        document.getElementById('btn-restart').style.display = 'none';
        document.getElementById('level').innerHTML = level;
        //Clear bonuses; 
        bonusActive = false;
        bonusSpeed = false;
        freezeActive = false;
        bulletsActive = false;
        //Start the game;
        start();
    }
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

//Generate new waves;
function newWave() {
    //Check if the field is clear;
    if (enemies.length === 0 && bombs.length === 0) {
        //Clear canvas of bullets;
        enemyBullets = [];
        playerBullets = [];
        //Delay spawn;
        if (waveReady % 120 === 0) {
            //Stats;
            level++;
            document.getElementById('level').innerHTML = level;
            //Background;
            rng = Math.floor((Math.random() * 4));
            document.getElementById('body').style.backgroundImage = 'url("Images/Backgrounds/background' + rng + '.jpg")';
            //Enemies wave;
            rng = Math.floor((Math.random() * 4));
            enemyImg.src = "Images/enemy" + rng + ".png";
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
            //Wave timer reset;
            waveReady = 1;
            //Buff enemies;
            multiplierSpeed += 0.5;
            multiplierFire += 15;
            hp++;
            if (multiplierFire >= 300) {
                multiplierFire = 300;
            }
        }
        waveReady++;
    }
}

function spawnBonus(x, y) {
    var rngJesus = Math.floor(Math.random() * 10);
    //var rngJesus = 0;
    if (!rngJesus) {
        var bonus = new Bonus(x, y);
        bonuses.push(bonus);
        //console.log(bonus);
    }
}

function spawnBomb(x, y) {
    var rngJesus = Math.floor(Math.random() * 40);
    //var rngJesus = 0;
    if (!rngJesus) {
        var bomb = new Bomb(x, y, 0.25);
        bombs.push(bomb);
        //console.log(bomb);
    }
}

function removeEnemy(enemy) {
    enemies.remove(enemy);
    if (musicPlaying) {
        var enemyExplosion = document.getElementById('enemyExplosion');
        enemyExplosion.play();
    }
    //Bonus;
    spawnBonus(enemy.x, enemy.y);
    //Bomb;
    spawnBomb(enemy.x, enemy.y);
    //Increase score;
    score += (1 * level);
    document.getElementById('score').innerHTML = score;
}

function delayRestartBtn() {
    setTimeout(function () {
        document.getElementById('canvas').style.display = 'none';
        document.getElementById('info').style.display = 'none';
        document.getElementById('btn-restart').style.display = 'flex';
    }, 2000);
}

function gameOver(boomed) {
    console.log("Game Over");
    running = false;
    //Music;
    //gameMusic.pause();
    //gameMusic.currentTime = 0;
    //Styles;
    document.getElementById('score-over').innerHTML = score;
    document.getElementById('restart').style.display = 'block';
    document.getElementById('overlay').style.display = 'flex';
    if (boomed) {
        document.getElementById('body').style.backgroundImage = 'url("Images/Backgrounds/boom.jpg")';
        delayRestartBtn();
    } else {
        document.getElementById('body').style.backgroundImage = 'url("Images/Backgrounds/planets.jpg")';
        delayRestartBtn();
    }

}

function render(ctx) {
    //Clear;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //Redraw;
    bombs.forEach(function (bomb) {
        bomb.draw(ctx);
    });
    player.draw(ctx);
    //player.boundingBox.draw(ctx);
    enemies.forEach(function (enemy) {
        enemy.draw(ctx);
        //enemy.boundingBox.draw(ctx);
    });
    playerBullets.forEach(function (bullet) {
        bullet.draw(ctx);
        if (bulletsActive) {
            bullet.boundingBox.draw(ctx);
        }
        //bullet.boundingBox.draw(ctx);
    });
    enemyBullets.forEach(function (bullet) {
        bullet.draw(ctx);
        //bullet.boundingBox.draw(ctx);
    });
    bonuses.forEach(function (bonus) {
        bonus.draw(ctx);
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
            if (bonusSpeed) {
                playerBulletSpeed = defBulletSpeed * 2;
                player.fireRate = defPlayerSpeed / 2;
            } else {
                playerBulletSpeed = defBulletSpeed;
                player.fireRate = defPlayerSpeed;
            }
            if (bonusActive) {
                var bulletLeft = new Bullet(player.x + 5, player.y - 12, greenBullet, playerBulletSpeed, true);
                var bulletRight = new Bullet(player.x + 31, player.y - 12, greenBullet, playerBulletSpeed, true);
                playerBullets.push(bulletLeft);
                playerBullets.push(bulletRight);
            } else {
                var bullet = new Bullet(player.x + 18, player.y - 12, greenBullet, playerBulletSpeed, true);
                playerBullets.push(bullet);
            }
            var shootSound = document.getElementById('shoot');
            if (musicPlaying) {
                shootSound.play();
            }
        }
        readyToShoot++;
    } else {
        readyToShoot = 0;
    }
    //Bonus timer;
    if (fireBonusTimer === 600) {
        fireBonusTimer = 1;
        bonusActive = false;
    } else {
        fireBonusTimer++;
    }
    if (superBulletsTimer === 200) {
        superBulletsTimer = 1;
        bulletsActive = false;
    } else {
        superBulletsTimer++;
    }
    if (speedTimer === 400) {
        speedTimer = 1;
        bonusSpeed = false;
    } else {
        speedTimer++;
    }
    //console.log(freezeTimer);
    if (freezeTimer === 240) {
        freezeTimer = 1;
        freezeActive = false;
    } else {
        freezeTimer++;
    }
    //Update objs;
    player.update();
    enemies.forEach(function (enemy) {
        enemy.update();
        //Enemy fire;
        var fire = Math.floor((Math.random() * enemy.fireRate));
        if (freezeActive) {
            fire = 1;
            enemy.speed = 0;
        } else {
            enemy.speed = defWaveSpeed * multiplierSpeed;
        }
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
                //console.log("hit");
                if (bulletsActive) {
                    removeEnemy(enemy);
                } else {
                    if (enemy.hp === 0) {
                        removeEnemy(enemy);
                    } else {
                        enemy.removeHp();
                        if (enemy.hp === 0) {
                            removeEnemy(enemy);
                        }
                    }
                    playerBullets.remove(bullet);
                }
            }
        });
        //Hit enemy bullet;
        enemyBullets.map(function (enemyBullet) {
            if (enemyBullet.boundingBox.intersects(bullet.boundingBox)) {
                playerBullets.remove(bullet);
                enemyBullets.remove(enemyBullet);
            }
        });
        //Hit bomb;
        bombs.map(function (bomb) {
            if (bomb.boundingBox.intersects(bullet.boundingBox)) {
                if (bomb.hp === 0) {
                    bombs.remove(bomb);
                } else {
                    bomb.removeHp();
                }
                playerBullets.remove(bullet);
            }
        });
    });
    //Enemy bullets;
    enemyBullets.map(function (bullet) {
        bullet.update();
        //Remove bullets gone outside of the canvas;
        if (bullet.y > 560 || bullet.y < 0) {
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
                gameOver();
            }
        }
    });
    bonuses.map(function (bonus) {
        bonus.update();
        //Caught;
        if (player.boundingBox.intersects(bonus.boundingBox)) {
            bonuses.remove(bonus);
            rng = Math.floor(Math.random() * 5);
            //rng = 4;
            //Random bonuses;
            if (rng === 0) {
                bonusActive = true;
                fireBonusTimer = 1;
            }
            else if (rng === 1) {
                player.hp++;
                //Update hp;
                document.getElementById('playerHealth').innerHTML = player.hp;
            }
            else if (rng === 2) {
                bulletsActive = true;
                superBulletsTimer = 1;
            }
            else if (rng === 3) {
                bonusSpeed = true;
                speedTimer = 1;
            }
            else if (rng === 4) {
                freezeActive = true;
                freezeTimer = 1;
            }
            //console.log('caught');
        }
        //Going out of the canvas;
        if (bonus.y > 560) {
            bonuses.remove(bonus);
        }
    });
    bombs.map(function (bomb) {
        bomb.update();
        //Going out of the canvas;
        if (bomb.y > 510) {
            gameOver(true);
            //console.log("boom");
        }
        if (player.boundingBox.intersects(bomb.boundingBox)) {
            gameOver(true);
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
