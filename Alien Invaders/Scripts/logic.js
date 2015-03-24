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