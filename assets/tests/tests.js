var assert = chai.assert;

suite('temperature', function() {
    test('32F = 0 Celsius', function() {
        convert.value = "32F to C";
        main();
        assert.deepEqual(converted.innerHTML, "0 Celsius");
    });
    test('45C = 113.0 Farenheit', function() {
        convert.value = "45C F";
        main();
        assert.deepEqual(converted.innerHTML, "113.0 Farenheit");
    });
    test('5X = error', function() {
        convert.value = "5X";
        main();
        assert.match(converted.innerHTML, /ERROR/);
    });
});