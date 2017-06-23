var assert = chai.assert;

suite('temperature', function() {
    test('32F = 0 Celsius', function() {
        var valor = Medida.convertir("32F to C");
        assert.deepEqual(valor, "0 Celsius");
    });
    test('0.32F = 255.55 Kelvin', function() {
        var valor = Medida.convertir("0.32F to K");
        assert.deepEqual(valor, "255.54999999999998 Kelvin");
    });
    test('300K = 80.33 Farenheit', function() {
        var valor = Medida.convertir("300K to F");
        assert.deepEqual(valor, "80.33000000000004 Kelvin");
    });
    test('273.15K = 0 Celsius', function() {
        var valor = Medida.convertir("273.15K to C");
        assert.deepEqual(valor, "0 Celsius");
    });
    test('45C = 113.0 Farenheit', function() {
        var valor = Medida.convertir("45C to F");
        assert.deepEqual(valor, "113 Farenheit");
    });
    test('0F = 273.15 Kelvin', function() {
        var valor = Medida.convertir("0F to K");
        assert.deepEqual(valor, "273.14999999999998 Kelvin");
    });
    test('5X = error', function() {
        var valor = Medida.convertir("5X to F");
        assert.match(valor, /Desconozco como convertir desde "x" hasta "f"/);
    });
    test('5Y = error', function() {
        var valor = Medida.convertir("5Y to K");
        assert.match(valor, /Desconozco como convertir desde "y" hasta "k"/);
    });
    test('5Z = error', function() {
        var valor = Medida.convertir("5Z to C");
        assert.match(valor, /Desconozco como convertir desde "z" hasta "c"/);
    });
});

//funciona pls vamos
