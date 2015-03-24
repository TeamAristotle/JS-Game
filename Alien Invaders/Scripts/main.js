var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

var image = new Image();
image.src = "Images/ship.png";
var player = new Ship(315, 500, image, 10);
var input = new Input();
listener(input);

function render(ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.draw(ctx);
}

function tick() {
    //to add sw space
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
    
    player.update();
}

function update() {
    tick();
    render(ctx);
    requestAnimationFrame(update);

}

update();