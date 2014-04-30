var book = {
	title: "The principles of OOP JS"
};

var prototype = Object.getPrototypeOf(book);

// prototypal chaining
var Rectangle = function(length, width) {
	this.length = length;
	this.width = width;
};

Rectangle.prototype.getArea = function() {
	return this.length * this.width;
};

Rectangle.prototype.toString = function() {
	return "[Rectangle " + this.length + "x" + this.width + "]";
};

Square = function(size) {
	this.length = size;
	this.width = size;
	// steal the constructor from supertype of Rectangle
	// Rectangle.call(this, size, size);
	// optional: add new properties or override existing ones here
};

Square.prototype = new Rectangle();
Square.prototype.constructor = Square;

Square.prototype.toString = function() {
	return "[Square " + this.length + "x" + this.width + "]";
};

// square instanceof Square => true
// square instanceof Rectangle => true
// square instanceof Object => true

var Rectangle = function(length, width) {
	this.length = length;
	this.width = width;
};

Rectangle.prototype.getArea = function() {
	return this.length * this.width;
};

Rectangle.prototype.toString = function() {
	return "[Rectangle " + this.length + "x" + this.width + "]";
};

var Square = function(size) {
	Rectangle.call(this, size, size);
}

Square.prototype = Object.create(Rectangle.prototype, {
	constructor: {
		configurable: true,
		enumerable: true,
		value: Square,
		writable: true
	}
});

// call the supertype method from Rectangle
Square.prototype.toString = function() {
	var text = Rectangle.prototype.toString.call(this);
	return text.replace("Rectangle", "Square");
};
