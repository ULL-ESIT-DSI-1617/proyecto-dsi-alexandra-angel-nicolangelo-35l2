(function (exports) {
    "use strict";
    function main() {
        console.log("Entrando en main.js");
        var valor = document.getElementById('convert').value,
            elemento = document.getElementById('converted');
        elemento.innerHTML = Medida.convertir(valor);
        return false;
    }
    exports.main = main;
})(this);

/*Estandar de manejo de cookies */
/*cname nombre de la cookie, cvalue valor del contenido, exdays tiempo de expiracion*/
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


//Si el usuario no está logueado, lo enviamos al login. Sino mostramos su nombre en la página actual
function checkIfUserIsLoged() {
    var user = getCookie("username");
    if (user == null) {
        window.location.href = "../pages/login.html";
    } else {
        document.getElementById("username").innerHTML = user;
    }
}

//Hacemos logout (borramos cookie y redirigimos)
function doLogout() {
    /*Coge las cookies que tiene en ese documento*/
    document.cookie = "username=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    console.log(getCookie("username"))
    window.location.href = "../pages/login.html";
}