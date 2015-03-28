//Credits to Bi0GaMe. Used https://github.com/BogomilDimitrov/JavaScriptGameFramework as backbone for this;

var Input = (function () {
    function Input() {
        this.a = false;
        this.s = false;
        this.d = false;
        this.w = false;
        this.space = false;
    }

    return Input;
}());

function listener(input) {

    document.documentElement.onkeydown = function (e) {
        var keycode;
        if (window.event)
            keycode = window.event.keyCode;
        else if (e)
            keycode = e.which;

        switch (keycode) {
            case 32:
                input.space = true;
                break;
            case 65:
                input.a = true;
                break;
            case 68:
                input.d = true;
                break;
            case 83:
                input.s = true;
                break;
            case 87:
                input.w = true;
                break;
        }
    };

    document.documentElement.onkeyup = function (e) {
        var keycode;
        if (window.event)
            keycode = window.event.keyCode;
        else if (e)
            keycode = e.which;

        switch (keycode) {
            case 32:
                input.space = false;
                break;
            case 65:
                input.a = false;
            case 68:
                input.d = false;
                break;
            case 83:
                input.s = false;
                break;
            case 87:
                input.w = false;
                break;
        }
    };
}

var Rectangle = (function () {
    function Rectangle(x, y, w, h) {

        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.color = "#0000ff";
    }

    /**
     * @param x
     * @param y
     * @returns {boolean}
     */
    Rectangle.prototype.contains = function (x, y) {
        return !!(x >= this.x && x <= this.x + this.width &&
        y >= this.y && y <= this.y + this.height);
    };

    /**
     * @param shape
     * @returns {boolean}
     */
    Rectangle.prototype.intersects = function (shape) {
        var offset = 0;

        if (shape.radius) {
            offset = shape.radius;
        }

        if (this.contains(shape.x - offset, shape.y - offset) ||
            this.contains(shape.x + shape.width - offset, shape.y - offset) ||
            this.contains(shape.x - offset, shape.y + shape.height - offset) ||
            this.contains(shape.x + shape.width - offset, shape.y + shape.height - offset)) {
            return true;
        } else if (shape.contains(this.x - offset, this.y - offset) ||
            shape.contains(this.x + this.width - offset, this.y - offset) ||
            shape.contains(this.x - offset, this.y + this.height - offset) ||
            shape.contains(this.x + this.width - offset, this.y + this.height - offset)) {
            return true;
        }
        return false;
    };

    /**
     * @param ctx
     */
    Rectangle.prototype.draw = function (ctx) {
        ctx.strokeStyle = this.color;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    };

    return Rectangle;
}());

Array.prototype.remove = function (arg, all) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == arg) {
            this.splice(i, 1);

            if (all == null || !all)
                break;
            else
                i--;
        }
    }
};