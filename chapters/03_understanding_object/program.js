var App = function(global) {
	var person = {};

	Object.defineProperty(person, "name", {
		value: "Nicholas",
		enumerable: true,
		configurable: true,
		writable: true
	});

	return person;
};

// setters and getters while defining properties
var App1 = (function() {
	var person1 = {
		_name: "Nicholas",
	get name() {
		console.log("Reading name");
		return this._name;
	},
	set name(value) {
		console.log("Setting the name to %s", value);
		this._name = value;
	}
	};

	return person1;
})();

// App1 can be re-written as follows for using the object
// define property method
var App2 = (function () {
	var person1 = {
		_name: "Justin"
	};

	Object.defineProperty(person1, "name", {
		get: function() {
			console.log("Reading name");
			return this._name;
		},
		set: function() {
			console.log("Setting the name to %s", value);
			this._name = value;
		},
		enumerable: true,
		configurable: true
	});

	return person1;
})();

// accessing multiple properties
var App3 = (function() {
	var person3 = {};
	Object.defineProperties(person3, {
		_name: {
			value: "Nicholas",
			enumerable: true,
			configurable: true,
			writable: true
		},

		// getter and setter properties defined as properties of person
		// getter and setter implied, you just need to call
		// person3.name = "justin" to set and person3.naem to get
		name: {
			get: function() {
				console.log("Reading name");
				return this._name;
			},
			set: function() {
				console.log("Setting the name to %s", value);
				this._name = value;
			},
			enumerable: true,
			configurable: true
		}
	});

	return person3;
})();

