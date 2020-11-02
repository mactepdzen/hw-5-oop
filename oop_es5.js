// <--MENU-->
Hamburger.SIZE_SMALL = {
    name: 'Small',
    price: 50,
    calories: 20,
}
Hamburger.SIZE_LARGE = {
    name: 'Large',
    price: 100,
    calories: 40,
}
Hamburger.STUFFING_CHEESE = {
    name: 'cheese',
    price: 10,
    calories: 20,
}
Hamburger.STUFFING_SALAD = {
    name: 'salad',
    price: 20,
    calories: 5,
}
Hamburger.STUFFING_POTATO = {
    name: 'potato',
    price: 15,
    calories: 10,
}

Salad.CAESAR = {
    name: 'Caesar',
    price: 100,
    calories: 20,
}
Salad.RUSSIAN_SALAD = {
    name: 'Russian salad',
    price: 50,
    calories: 80,
}

Drink.COLA = {
    name: 'Cola',
    price: 50,
    calories: 40,
}
Drink.COFFEE = {
    name: 'Coffee',
    price: 80,
    calories: 20,
}


// <--IMPLEMENTATION-->
function MenuUnit(price, calories) {
    this.price = price;
    this.calories = calories;
}
MenuUnit.prototype.calculatePrice = function () {
    return this.price;
}
MenuUnit.prototype.calculateCalories = function () {
    return this.calories;
}


function Hamburger(size, stuffing) {
    MenuUnit.call(this);
    this.size = size.name;
    this.stuffing = stuffing.name;
    this.price = size.price + stuffing.price;
    this.calories = size.calories + stuffing.calories;
}
Hamburger.prototype = Object.create(MenuUnit.prototype);
Hamburger.prototype.constructor = Hamburger;
Hamburger.prototype.getName = function () {
    return this.size + ' hamburger with ' + this.stuffing;
}
Hamburger.prototype.getStuffing = function () {
    return this.stuffing;
}


function Salad(salad, weight) {
    MenuUnit.call(this);
    this.name = salad.name;
    this.weight = weight || 100;
    this.price = this.weight / 100 * salad.price;
    this.calories = this.weight / 100 * salad.calories;
}
Salad.prototype = Object.create(MenuUnit.prototype);
Salad.prototype.constructor = Salad;
Salad.prototype.getName = function () {
    return this.name;
}


function Drink(drink) {
    MenuUnit.call(this);
    this.name = drink.name;
    this.price = drink.price;
    this.calories = drink.calories;
}
Drink.prototype = Object.create(MenuUnit.prototype);
Drink.prototype.constructor = Drink;
Drink.prototype.getName = function () {
    return this.name;
}


function Order(items) {
    this.items = items;
    this.paid = false;
}
Order.prototype.getOrder = function () {
    var order = [];

    this.items.forEach(function (item) {
        order.push(item.getName());
    });

    return 'Your order is: ' + order.join(', ') + '.\n';
}
Order.prototype.isPaid = function () {
    this.paid = true;
    Object.defineProperty(this, 'items', {
        writable: false,
        configurable: false,
    });
    Object.defineProperty(this, 'paid', {
        writable: false,
        configurable: false,
    });
}
Order.prototype.addItem = function (item) {
    if(this.paid) {
        console.log('The purchase was completed. If you want to buy something else, please make a new order.');
    }
    return this.items.push(item);
}
Order.prototype.deleteItem = function (item) {
    if(this.paid) {
        console.log('The purchase was completed. We cannot delete item from your order.');
    }
    return this.items.splice(this.items.indexOf(item), 1);
}
Order.prototype.calculateOrderPrice = function () {
    var price = 0;

    this.items.forEach(function (element) {
        price += element.calculatePrice();
    });

    return 'Total price: ' + price;
}
Order.prototype.calculateOrderCalories = function () {
    var calories = 0;

    this.items.forEach(function (element) {
        calories += element.calculateCalories();
    });

    return 'Total calories: ' + calories;
}

// <--TEST-->
var hamburger1 = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE);
var salad1 = new Salad(Salad.CAESAR);
var drink1 = new Drink(Drink.COLA);

var order1 = new Order([hamburger1, salad1, drink1]);


var hamburger1_1 = new Hamburger(Hamburger.SIZE_LARGE, Hamburger.STUFFING_POTATO);

order1.addItem(hamburger1_1);
console.log(order1.getOrder());
console.log(order1.calculateOrderPrice());
console.log(order1.calculateOrderCalories() + '\n');

order1.isPaid();

var hamburger1_2 = new Hamburger(Hamburger.SIZE_LARGE, Hamburger.STUFFING_SALAD);

order1.deleteItem(hamburger1_1);
order1.addItem(hamburger1_2);