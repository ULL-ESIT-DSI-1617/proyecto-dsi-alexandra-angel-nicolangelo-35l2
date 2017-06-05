(function(){
  
    var measures = Medida.measures || {};
  
    function Temperatura(valor,tipo)
    {
      console.log("Accedo a clase Temperatura");
      Medida.call(this,valor,tipo);
      /* tipo es opcional. Debería admitir new Medida("45.2 F") */
    }
    Temperatura.prototype = new Medida();
    Temperatura.prototype.constructor = Temperatura;

  // ----------------------------------------------------- //

    function Celsius(valor)
    {
      var c_tof = 0;
      var c_tok = 0;
      console.log("Accedo a clase Celsius");
      Temperatura.call(this,valor,'c');
    }
    Celsius.prototype = new Temperatura;
    Celsius.prototype.constructor = Celsius;
    measures.c = Celsius;
    Celsius.prototype.toFarenheit = function()
    {
      var c_tof = (this.valor * 9/5) + 32;
      return new Farenheit(c_tof);
    }
    Celsius.prototype.toKelvin = function()
    {
      var f_toK = (this.valor + 273.15);
      return new Kelvin(f_toK);
    }
    
    
  // ----------------------------------------------------- //
  
    function Farenheit(valor)
    {
      var f_toC = 0;
      var f_toK = 0;
      console.log("Accedo a la clase Fahrenheit.");
      Temperatura.call(this,valor,'f');
    }
    Farenheit.prototype = new Temperatura;
    Farenheit.prototype.constructor = Farenheit;
    measures.f = Farenheit;
    Farenheit.prototype.toCelsius = function()
    {
        var f_toC = (this.valor - 32) * 5/9;
        return new Celsius(f_toC);
    }
    Farenheit.prototype.toKelvin = function()
    {
      var f_toK = (this.toCelsius().valor + 273.15);
      return new Kelvin(f_toK);
    }

  // ----------------------------------------------------- //
  
    function Kelvin(valor)
    {
      var k_toC = 0;
      var k_toF = 0;
      console.log("Accedo a clase Kelvin");
      Temperatura.call(this,valor,'k');
    }
    Kelvin.prototype = new Temperatura;
    Kelvin.prototype.constructor = Kelvin;
    measures.k = Kelvin;
    Kelvin.prototype.toCelsius = function()
    {
      var k_toC = (this.valor - 273.15);
      return new Celsius(k_toC);
    }
    Kelvin.prototype.toFarenheit = function()
    {
      var k_toF = (this.toCelsius().valor * 9/5) + 32;
      return new Farenheit(k_toF);
    }

})(this);