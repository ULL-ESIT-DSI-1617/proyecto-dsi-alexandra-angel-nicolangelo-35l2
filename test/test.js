var assert = chai.assert;

suite('temperature', function() {
    test('32F = 0 Celsius', function() {
        var valor = Medida.convertir("32F to C");
        assert.deepEqual(valor, "0 Celsius");
    });
    test('45C = 113.0 Farenheit', function() {
        var valor = Medida.convertir("45C to F");
        assert.deepEqual(valor, "113 Farenheit");
    });
    test('5X = error', function() {
        var valor = Medida.convertir("5X to F");
        assert.match(valor, /Desconozco como convertir desde "x" hasta "f"/);
    });
});

//funciona pls vamos
