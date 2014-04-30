// Mixins -copying one object acquires the properties of another without
// modifying the prototype chain
var mixin = function(receiver, supplier) {
	for (var property in supplier) {
		if (supplier.hasOwnProperty(property)) {
			receiver[property] = supplier[property];
		}
	}
	return receiver;
};

// an application of this could be used to add new behaviors to an already
// exisiting object

var EventTarget = function() {
};

EventTarget.prototype = {
	constructor: EventTarget,

	addListener: function(type, listener) {
		if (!this.hasOwnProperty("_listeners")) {
			this._listeners = [];
		}
		if (typeof this._listeners[type] == "undefined") {
			this._listeners[type] = [];
		}
		this._listeners[type].push(listener);
	},

	fire: function(event) {
		if (!event.target) {
			event.target = this;
		}

		if (!event.type) {
			throw new Error("Event object missing 'type' property.");
		}

		if (this._listeners && this._listeners[event.type] instanceof Array) {
			var listeners = this._listeners[event.type];
			for (var i = 0, l = listeners.length; i < l; i ++) {
				listeners[i].call(this, event);
			}
		}
	},

	removeListener: function(type, listener) {
		if (this._listeners && this._listeners[type] instanceof Array) {
			var listeners = this._listeners[type];
			for (var i = 0, l = listeners.length; i < l; i ++) {
				if (listeners[i] === listener) {
					listeners.splice(i, 1);
					break;
				}
			}
		}
	}
};

// we will add a listener and then fire an event.
var target = new EventTarget();
target.addListener("message", function(event) {
	console.log("Message is " + event.data);
});
target.fire({
	type: "message",
	data: "Hello World!"
});

// to add support for events to a different object involes a few options.
// first, you can create a new isntance of EvenTarget and then
// add on the properties that you want
//
// doing this, however, means that the person is actually an instance of EventTarget
// instead of Object or a custom type.
var person = new EventTarget();
person.name = "Zelda";
person.sayName = function() {
	console.log(this.name);
	this.fire({type: "namesid", name: name});
};


// to fix this, we can use pseudoclassical inheritance
var Person = function(name) {
	this.name = name;
};

Person.prototype = Object.create(EventTarget.prototype);
Person.prototype.constructor = Person;

Person.prototype.sayName = function() {
	console.log(this.name);
	this.fire({type: "namesid", name: name });
};


// however, in teh case of person, the relationship doesn't make sense
// a type of person and event? By using a mixim instead, you can reduce the amount of code
// necessary yo assign those new properties to the prototype
var Person_Mixin = function(name) {
	this.name = name;
};

mixin(Person_Mixin.prototype, new EventTarget());
mixin(Person_Mixin.prototype, {
	constructor: Person_Mixin,
	sayName: function() {
		console.log(this.name);
		this.fire({type: "namesid", name: name });
	}
});


// you may not want a constructor of psuedoclassical inheritance at all
var Person_4 = mixin(new EventTarget(), {
	name: "Justin",
	sayName: function() {
		console.log(this.name);
		this.fire({type: "namesid", name: name });
	}
});

// here a new instance of event target is mixed in with some new properties to create
// the person object without affecting person's prototype chain
//
// one thing to keep in mind about using mixins in this way is that accessor properties
// on the supplier become data properties on the receiver,
// which means you can overwrite them if you're not careful

// to fix this issue, we can take advantage of adjusting our mixin so we check
// for keys. Doing so, we can define an object property for the receiver and
// not data properties which can be overwritten
var mixin_object = function(receiver, supplier) {
	// get an  array of enumerable own properties on supplier
	// foreach method is used to iterate over those properties
	Object.keys(supplier).forEach(function(property) {
		// the property descriptor for each is retrieved and then added
		var descriptor = Object.getOwnPropertyDescriptor(supplier, property);
		Object.defineProperty(receiver, property, descriptor);
	});

	// the following propcess ensures all the relevant property information is
	return receiver;
	// transferred to receiver, not just the value.
};

var person_5 = mixin_object(new EventTarget(), {
	get name() {
		return "Justin";
	},

	sayName: function() {
		console.log(this.name);
		this.fire({type: "namesid", name: name });
	}
});

// scope safe constructors tackles the problem of developers ommitting the 'new' call
// generally, you want to assume that a new instance is needed when creating a new instance
// of an object. Especially if the first word is capitalized.

// the basis of a scope-safe constructor, is used, because without it a person would not be an
// instance of Person nor a typeof it's own variable --it would belong to the global scope
// since calling this without new defaults back to the global scope
var Person_Safe_Scope = function(name) {
	if (this instanceof Person_Safe_Scope) {
		this.name = name;
	} else {
		// recursively call to maintain a new single instance
		// if the scope is not an instance of Person_Safe_Scope
		return new Person_Safe_Scope(name);
	}
}


