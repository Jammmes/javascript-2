window.onload = function() {
    //создание бургера
    burger = new Hamburger('SIZE_SMALL', 'STUFFING_CHEESE');
    burger.addTopping('TOPPING_MAYO');
    burger.addTopping('TOPPING_SPICE');

    var buttonOrder = document.getElementById('buttonOrder');
    buttonOrder.addEventListener('click', makeBurger);
}

function makeBurger() {
    ///
    updateInfo();
}

function updateInfo() {
    //find info elements
    var infoSize = document.getElementById('infoSize');
    var infoStuffing = document.getElementById('infoStuffing');
    var infoTopping = document.getElementById('infoTopping');
    var infoCalories = document.getElementById('infoCalories');
    var infoPrice = document.getElementById('infoPrice');

    var size = burger.getSize();
    var calories = burger.calculateCalories();
    var price = burger.calculatePrice();
    var stuffing = burger.getStuffing();
    var topping = burger.getToppings();

    infoSize.innerText = size;
    infoCalories.innerText = calories;
    infoPrice.innerText = price;
    infoStuffing.innerText = stuffing;
    infoTopping.innerText = topping;
}