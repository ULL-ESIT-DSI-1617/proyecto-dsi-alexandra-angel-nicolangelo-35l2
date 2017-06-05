(function(exports) {
  "use strict";
  function main() {
      console.log("Entrando en main.js");
      var valor     = document.getElementById('convert').value,
          elemento  = document.getElementById('converted');
      elemento.innerHTML = Medida.convertir(valor);
      return false;
  }
  exports.main = main;
})(self);