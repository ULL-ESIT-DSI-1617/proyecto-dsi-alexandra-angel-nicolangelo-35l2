"use strict";

(function(exports) {
	"use strict";
	function main() {
		var valor = document.getElementById('original').value;
		result.value = operated.innerHTML = Operation.operate(valor);
		return false;
	}
	exports.main = main;
})(this);