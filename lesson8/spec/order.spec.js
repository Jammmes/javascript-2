'use strict';

describe('Объект Order', function () {
  var order;

  beforeEach(function () {
    order = order = new Order([]);
  });

  it('Проверка получения данных о заказе из DOM элементов', function () {
    loadFixtures('index_spec.html');
    order.getOrder();
    expect(order.consist.length).toBe(3);
  });

  it('Проверка создания бургера по заказу', function () {
    loadFixtures('index_spec.html');
    order.getOrder();
    order.createBurger();
    expect(order.burger.size).toBe('SIZE_SMALL');
    expect(order.burger.stuffing).toBe('STUFFING_CHEESE');
  });

  it('Проверка отображения заказа', function () {
    loadFixtures('index_spec.html');
    order.getOrder();
    order.createBurger();
    order.renderOrder();
    expect($(infoSize)).toHaveText('SIZE_SMALL');
    expect($(infoStuffing)).toHaveText('STUFFING_CHEESE');
    expect($(infoTopping)).toHaveText('TOPPING_SPICE, 15 rub., 0 cal.');
    expect($(infoCalories)).toHaveText('40');
    expect($(infoPrice)).toHaveText('75');
  });
})