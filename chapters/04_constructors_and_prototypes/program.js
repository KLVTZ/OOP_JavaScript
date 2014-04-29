// first constructor
function Person(name) {
	this.name = name;
	this.sayName = function() {
		console.log(this.name);
	};
}

var person1 = new Person("Justin");
person1.sayName();
var person2 = new Person();

// using the defineProperty
function DefinePerson(name) {
	Object.defineProperty(this, "name", {
		get: function() {
			return name;
		},
		set: function(newName) {
			name = newName;
		},
		enumerable: true,
		configurable: true
	});

	this.sayName = function() {
		console.log(this.name);
	};
}

// identify a prototype property
function hasPrototypeProperty(object, name) {
	return name in object && !object.hasOwnProperty(name);
}

// using prototypes with constructors
var __Person = function(name) {
	this.name = name;
};

__Person.prototype.sayName = function() {
	console.log(this.name);
};

// a more succinct pattern is to invole replacing
// the prototype with an object literal
function PersonLiteral(name) {
	this.name = name;
}

PersonLiteral.prototype = {
	// restore proper construcor
	constructor: PersonLiteral,

	sayName: function() {
		console.log(this.name);
	},
	toString: function() {
		return "[Person " + this.name + "]";
	}
};

// to add more properties to edit the prototype:
PersonLiteral.prototype.sayHi = function() {
	console.log("Hi");
};

// alter current prototype functions
Array.prototype.sum = function() {
	// this refers to the array being accessed by that
	// instance -> numbers.sum() calls numbers.reduce()
	return this.reduce(function(previous, current) {
		return previous + current;
	});
};

String.prototype.capitalize = function() {
	return this.charAt(0).toUpperCase() + this.substring(1);
};
