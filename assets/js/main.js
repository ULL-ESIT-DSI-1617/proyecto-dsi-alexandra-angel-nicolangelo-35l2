
(function (exports) {
    "use strict";
    function main() {
        console.log("Entrando en main.js");
        var valor = document.getElementById('convert').value,
            elemento = document.getElementById('converted');
        elemento.innerHTML = Medida.convertir(valor);
        //enviamos al index la temperatura final para su inclusion en la base de datos
        t_convertida = document.getElementById("estesi").value = Medida.convertir(valor);
        return t_convertida;
    }
    exports.main = main;
})(this);