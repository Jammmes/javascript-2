'use strict';

describe('Объект Hamburger', function () {
  var burger;

  beforeEach(function () {
    burger = new Hamburger('SIZE_SMALL', 'STUFFING_CHEESE');
  });

  it('Проверка определения размера бургера', function () {
    expect(burger.getSize()).toBe('SIZE_SMALL');
  });

  it('Проверка начинки бургера', function () {
    expect(burger.getStuffing()).toBe('STUFFING_CHEESE');
  });

  it('Проверка удаления несуществующей специи бургера', function () {
    expect(burger.removeTopping('TOPPING_MAYO')).toBe('Ошибка удаления. Такой добавки: TOPPING_MAYO нет в наборе.');
  });

  it('Проверка добавления специй бургера', function () {
    burger.addTopping('TOPPING_MAYO');
    burger.addTopping('TOPPING_SPICE');
    expect(burger.topping.length).toBe(2);
  });

  it('Проверка добавления существующей специи бургера', function () {
    burger.addTopping('TOPPING_MAYO');
    expect(burger.addTopping('TOPPING_MAYO')).toBe('Ошибка добавления. Такая добавка: TOPPING_MAYO уже есть в наборе.');
  });

  it('Проверка удаления специи бургера', function () {
    burger.addTopping('TOPPING_MAYO');
    burger.removeTopping('TOPPING_MAYO');
    expect(burger.topping.length).toBe(0);
  });

  it('Проверка рассчета цены бургера', function () {
    burger.addTopping('TOPPING_MAYO');
    burger.addTopping('TOPPING_SPICE');
    expect(burger.calculatePrice()).toBe(95);
  });

  it('Проверка рассчета калорийности бургера', function () {
    burger.addTopping('TOPPING_MAYO');
    burger.addTopping('TOPPING_SPICE');
    expect(burger.calculateCalories()).toBe(45);
  });

})