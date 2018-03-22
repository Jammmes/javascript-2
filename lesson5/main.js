(function($) {
    $(function() {

        /** Получаем список товаров и вызываем функцию отрисовки списка
         * 
         * 
         */
        function createGoodsList() {
            //
            $.ajax({
                url: "http://localhost:3000/goods",
                dataType: 'json',
                success: function(goods) {
                    renderGoodsList(goods);
                }
            })
        }

        /** Получаем содержимое корзины и вызываем отрисовку элементов
         *  Вызываем отрисовку итогов по корзине
         * 
         */
        function getCartContent() {
            //
            $.ajax({
                url: "http://localhost:3000/cart",
                dataType: 'json',
                success: function(goodsInCart) {
                    renderCart(goodsInCart);
                }
            })
            getCartSummary();
        }

        /** Удаляем товар из корзины
         * 
         * 
         * @param {any} goodId - ID товара, который нужно удалить из корзины
         */
        function deleteFromCart(goodId) {
            //
            var setUrl = 'http://localhost:3000/cart/' + goodId;
            $.ajax({
                url: setUrl,
                dataType: 'json',
                type: 'DELETE',
                contentType: 'application/json',
                success: function() {
                    console.log('success delete from cart');
                }
            });
        }

        /**Добавляем товар в корзину
         * 
         * 
         * @param {any} goodId - ID товара, который нужно добавить в корзину 
         */
        function addToCart(newGood) {
            //
            $.ajax({
                url: "http://localhost:3000/cart",
                dataType: 'json',
                type: 'POST',
                contentType: 'application/json',
                data: newGood,
                success: function() {
                    console.log('success add to cart');
                }
            });
        }

        /** Получаем данные по корзине и вызываем отрисовку итогов
         * 
         * 
         */
        function getCartSummary() {
            //
            $.ajax({
                url: "http://localhost:3000/cart",
                dataType: 'json',
                success: function(goodsInCart) {
                    renderSummary(goodsInCart);
                }
            })
        }

        /** Отрисовка списка товаров
         * 
         * 
         * @param {any} goods - массив с данными о товарах 
         */
        function renderGoodsList(goods) {
            var $ul = $('<ul/>', {
                class: 'list',
                id: 'goodsList'
            });
            goods.forEach(function(good) {
                var $li = $('<li/>').addClass('list__item');
                //Собираем первый блок
                var $itemBlockId = $('<div/>').addClass('itemBlock');
                var $goodsId = $('<div/>', {
                    class: 'goodsID',
                    text: good.id
                });
                //Добавим первый блок
                $li.append($itemBlockId);
                $itemBlockId.append($goodsId);
                //Собираем второй блок
                var $itemBlockButton = $('<div/>').addClass('itemBlock');
                var $addButton = $('<button/>', {
                    class: 'button btnAdd',
                    text: 'add to cart',
                    'data-id': good.id
                });
                //Установим обрабтчик на нажатие
                $addButton.on('click', function(e) {
                        var parent = ($(this).parent()).parent();
                        //Сначала соберем данные в JSON
                        var newGood = JSON.stringify({
                                id: $(parent).find('.goodsID')[0].textContent,
                                name: $(parent).find('.goodsName')[0].textContent,
                                price: $(parent).find('.goodsPrice')[0].textContent,
                                quantity: $(parent).find('.goodsQuantity')[0].value
                            })
                            //вызываем функцию добавления товара в корзину
                        addToCart(newGood);
                        //перерисовываем корзину
                        getCartContent();
                    })
                    //добавим второй блок
                $itemBlockButton.append($addButton);
                $li.append($itemBlockButton);
                //Собираем первую строку второго блока
                var $itemBlockAttr = $('<div/>').addClass('itemBlock');
                var $itemBlockLine1 = $('<div/>').addClass('itemBlock__line');
                var $labelName = $('<div/>', {
                    class: 'label',
                    text: 'Name:'
                });
                var $goodsName = $('<div/>', {
                    class: 'goodsName',
                    text: good.name
                });
                //Добавим первую строку в третий блок
                $itemBlockAttr.append($itemBlockLine1);
                $itemBlockLine1.append($labelName, $goodsName);
                //Собираем вторую строку третьего блока
                var $itemBlockLine2 = $('<div/>').addClass('itemBlock__line');
                var $labelPrice = $('<div/>', {
                    class: 'label',
                    text: 'Price:'
                });
                var $goodsPrice = $('<div/>', {
                    class: 'goodsPrice',
                    text: good.price
                });
                //Добавим вторую строку в третий блок
                $itemBlockAttr.append($itemBlockLine2);
                $itemBlockLine2.append($labelPrice, $goodsPrice);
                //Собираем третью строку третьего блока
                var $itemBlockLine3 = $('<div/>').addClass('itemBlock__line');
                var $labelQuant = $('<div/>', {
                    class: 'label',
                    text: 'Quantity:'
                });
                var $goodsQuant = $('<input/>', {
                    class: 'goodsQuantity',
                    placeholder: 'input quantity',
                    type: 'number',
                    value: 0
                });
                //Добавим третью строку в третий блок
                $itemBlockAttr.append($itemBlockLine3);
                $itemBlockLine3.append($labelQuant, $goodsQuant);
                //Добавим третий блок
                $li.append($itemBlockAttr);
                //Добавим блок с данными о товаре в список
                $ul.append($li);
            });
            $('#goodsContainer').append($ul);
        }

        /** Суммируем количество и цены товаров в карзине, отрисовываем элементы
         * 
         * 
         * @param {any} goodsInCart 
         */
        function renderSummary(goodsInCart) {
            //Подсчитаем сумму и количество
            var sum = 0,
                quant = 0;
            goodsInCart.forEach(function(good) {
                sum += +good.price;
                quant += +good.quantity;
            });
            //
            //Очистим предыдущее содержимое
            $('#summary').empty();
            //                   
            var $titleLine = $('<div/>').addClass('summary__line');
            var $title = $('<div/>', {
                class: 'label_grand',
                text: 'Summary:'
            });
            //
            var $summLine = $('<div/>').addClass('summary__line');
            var $quant_lbl = $('<div/>', {
                class: 'label',
                text: 'Quantity:'
            });
            var $quant = $('<div/>', {
                class: 'quantity',
                text: quant
            });
            var $summ_lbl = $('<div/>', {
                class: 'label',
                text: 'Summ:'
            });
            var $summ = $('<div/>', {
                class: 'goodsPrice',
                text: sum
            });
            $titleLine.append($title);
            $summLine.append($quant_lbl, $quant, $summ_lbl, $summ);
            $('#summary').append($titleLine, $summLine);
        };

        /** Отрисовка корзины
         * 
         * 
         * @param {any} goodsInCart 
         */
        function renderCart(goodsInCart) {
            var $ul = $('<ul/>', {
                class: 'list',
                id: 'cartList'
            });
            var goodsCount = 1;
            goodsInCart.forEach(function(good) {
                var $li = $('<li/>', {
                    class: 'list__item'
                });
                var $itemBlockId = $('<div/>', {
                    class: 'itemBlock'
                });
                var $goodsNum = $('<div/>', {
                    class: 'goodsNum',
                    text: goodsCount
                });
                //Добавим первый блок
                $li.append($itemBlockId);
                $itemBlockId.append($goodsNum);
                //Собираем второй блок
                var $itemBlockButton = $('<div/>', {
                    class: 'itemBlock'
                });
                var $deleteButton = $('<button/>', {
                        class: 'button btnDelete',
                        text: 'delete',
                        'data-id': good.id
                    })
                    //Установим обработчик на нажатие
                $deleteButton.on('click', function(e) {
                        //Очистим старое содержимое
                        var parent = ($(this).parent()).parent();
                        parent.empty();
                        //Удаляем элемент из корзины
                        deleteFromCart($(this).attr('data-id'));
                        //Обновим итоги
                        getCartSummary();
                    })
                    //добавим второй блок
                $itemBlockButton.append($deleteButton);
                $li.append($itemBlockButton);
                //Собираем первую строку
                var $itemBlockAttr = $('<div/>', {
                    class: 'itemBlock'
                });
                var $itemBlockLine1 = $('<div/>', {
                    class: 'itemBlock__line'
                });
                var $labelName = $('<div/>', {
                    class: 'label',
                    text: 'Name:'
                });
                var $goodsName = $('<div/>', {
                    class: 'goodsName',
                    text: good.name
                });
                //Добавим первую строку в третий блок
                $itemBlockAttr.append($itemBlockLine1);
                $itemBlockLine1.append($labelName);
                $itemBlockLine1.append($goodsName);
                //Собираем вторую строку
                var $itemBlockLine2 = $('<div/>', {
                    class: 'itemBlock__line'
                });
                var $labelPrice = $('<div/>', {
                    class: 'label',
                    text: 'Price:'
                });
                var $goodsPrice = $('<div/>', {
                    class: 'goodsPrice',
                    text: good.price
                });
                //Добавим вторую строку в третий блок
                $itemBlockAttr.append($itemBlockLine2);
                $itemBlockLine2.append($labelPrice);
                $itemBlockLine2.append($goodsPrice);
                //Собираем третью строку
                var $itemBlockLine3 = $('<div/>', {
                    class: 'itemBlock__line'
                });
                var $labelQuant = $('<div/>', {
                    class: 'label',
                    text: 'Quantity:'
                });
                var $goodsQuant = $('<div/>', {
                    class: 'goodsQuantity',
                    text: good.quantity
                });
                //Добавим третью строку в третий блок
                $itemBlockAttr.append($itemBlockLine3);
                $itemBlockLine3.append($labelQuant);
                $itemBlockLine3.append($goodsQuant);
                //Добавим третий блок
                $li.append($itemBlockAttr);

                //Конец обхода каждого элемента
                goodsCount++;
                $ul.append($li);
            });
            $('#cartContainer').append($ul);
        }

        //Создаем список товаров
        createGoodsList();
        //Отрисовываем содержимое карзины
        getCartContent();
    });

})(jQuery)