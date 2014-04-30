// module pattern
//
// object pattern designed to create singleton objects with private data
var yourObject = (function() {
	// private data variables
	return {
		// public methods and properties
	};
}());

// an example of the module pattern
var person = (function() {
	var age = 20;

	return {
		name: "Justin",

		getAge: function() {
			return age;
		},

		growOlder: function() {
			age++;
		}
	};
}());

// a variation would be to use the revealing module pattern
// the functions are assinged to an object outside the immediately
// invoked functione expression
var person2 = (function() {
	var age = 21;

	var getAge = function() {
		return age;
	};

	var growOlder = function() {
		age++;
	};

	return {
		name: "Justin",
		getAge: getAge,
		growOlder: growOlder
	};
}());

// if you want private data to be available across instances:
var Person3 = (function() {
	var age = 25;

	var InnerPerson = function(name) {
		this.name = name;
	};

	InnerPerson.prototype.getAge = function() {
		return age;
	};

	InnerPerson.prototype.growOlder = function() {
		age++;
	};

	// by returning inner person, we have the ability of
	// accessing a person within the global scope that can share
	// a common property of age between instances
	return InnerPerson;
}());
