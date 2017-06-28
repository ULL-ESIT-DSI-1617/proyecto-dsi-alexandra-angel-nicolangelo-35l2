/*global XRegExp*/
(function(exports){
  var regexp = '^(\\s*)                                       ' +
                '(?<valor> [-+]?[0-9]+(?:\\.[0-9]+)?(?:e[+-]?[0-9]+)?) ' +
                '(\\s*)                                               ' +
                '(?<tipo> [a-z][a-z0-9]*)                              ' +
                '(\\s*)';

  function Medida(valor,tipo)
  {
    console.log("Accedo a clase Medida");
    if(tipo)
    {
      this.valor = valor || 0;
      this.tipo  = tipo;
    }
    else
    {
      var expresion;
      console.log("RegExp:"+regexp);
      expresion = XRegExp.exec(valor,XRegExp(regexp,'ix'));
      console.log("Expresion:"+expresion);
      if(expresion)
      {
        var numero = expresion.valor;
        numero = parseFloat(numero);
        var tipo = expresion.tipo;
        tipo = tipo.toLowerCase();
        this.valor = numero;
        this.tipo = tipo;
        console.log("Valor: " + this.valor + ", Tipo: " + this.tipo);
      }
    }
  }
  Medida.constructor = Medida;
  Medida.measures = Medida.measures || {};

  Medida.match = function(valor)
  {
    var exp_regular = '(to)?'+
                      '(\\s*)'+
                      '(?<to> [a-z][a-z0-9]* )'+
                      '(\\s*)$';

    var res = XRegExp.exec(valor,XRegExp(regexp.concat(exp_regular),'ix'));
    console.log("Numero:"+res.valor+", tipo: "+res.tipo+", Destino:"+res.to);
    return res;
  }

  Medida.convertir = function(valor) {
    var measures = Medida.measures;
    var match = Medida.match(valor);
    if (match) {
      var numero = match.valor,
          tipo   = match.tipo,
          destino = match.to;
      tipo = tipo.toLowerCase();
      destino = destino.toLowerCase();
      console.log("Numero:"+numero+",Tipo:"+tipo+",Destino:"+destino);
      try {
        var source = new measures[tipo](numero);  // new Fahrenheit(32)
        console.log("Source:"+source);
        var target = "to"+measures[destino].name; // "toCelsius"
        console.log("Target:"+target);
        console.log("Return:"+source[target]().valor);
        return source[target]().valor + " "+measures[destino].name; // "0 Celsius"
      }
      catch(err) {
        if (tipo == destino){
          return numero + " " + destino;
        }
        else{
          return 'Desconozco como convertir desde "'+tipo+'" hasta "'+destino+'"';
        }
      }
    }
    else
      return "Introduzca una temperatura valida: 330e-1 F to C";
  };

  exports.Medida = Medida;

})(this);