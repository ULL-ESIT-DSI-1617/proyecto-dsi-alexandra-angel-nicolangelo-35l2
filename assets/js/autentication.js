function doLogin() {
    console.log(getCookie("username"));
    /*Recoge los valores de usuario y contraseña*/
    var usernameInput = document.getElementById("username").value;
    var passwordInput = document.getElementById("password").value;

    /*Campo obligatorio para usuario */
    if (usernameInput == "") {
        document.getElementById("emptyUsername").style.setProperty("display", "inline");
    } else {
        document.getElementById("emptyUsername").style.setProperty("display", "none");
    }

    /*Campo obligatorio para password */
    if (passwordInput == "") {
        document.getElementById("emptyPassword").style.setProperty("display", "inline");
    } else {
        document.getElementById("emptyPassword").style.setProperty("display", "none");
    }

    if(usernameInput != "" && passwordInput != ""){
        checkIfExist(usernameInput, passwordInput);
    }
}

/* Función que, tras comprobar que el usuario ha introducido datos, intenta hacer login */
function  checkIfExist(username, password){   
    /*Guarda usuarios que se pueden loguear*/
    var users = {
        juan: "juanpassword",
        pedro: "pedropassword",
        antonio: "antoniopassword",
        amy: "amyspassword"
    };

    var correct = false;
    /*Comprobamos que el usuario y la contraseña son algunos de los que tenemos */
    for(user in users){
        if(username == user && password == users[user]) {
            correct = true;
            setCookie("username", username, 2);
            console.log("Usuario logueado: ", getCookie("username"))
            /*Cambiamos de página */
            window.location.href = "../pages/index.html";
            break;
        }
    }
    /*En el caso de que sea incorrecto, imprimimos por pantalla el mensaje wrongInfo */
    if(!correct) {
        document.getElementById("wrongInfo").style.setProperty("display", "inline");    
    }
}
