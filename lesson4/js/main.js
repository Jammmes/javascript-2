(function($) {
    $(function() {

        /**
         * Создает форму с вкладками
         * @LIMIT - ограничение: 15 вкладок максимум
         * @param {any} JSONdata данные для вкладок в формате JSON
         */
        function createForm(JSONdata) {
            var LIMIT = 15;
            var dataArr = JSON.parse(JSONdata).slice(0, LIMIT);
            var $control = $('<div/>').addClass('control');
            $('#container').append($control);
            var $captions = $('<ul/>').addClass('control__captions').on('click', '.item', function(event) {
                setActive($(this));
            });
            $control.append($captions);
            //
            dataArr.forEach(function(element, i) {
                    var caption = element.caption;
                    var txt = element.text;
                    var $li = $('<li/>', {
                        class: 'item',
                        text: caption
                    });
                    $li.attr('data-capID', i);
                    $captions.append($li);
                    var $content = $('<div/>', {
                        class: 'content',
                        text: txt
                    });
                    $content.attr('data-tabID', i);
                    $control.append($content);
                })
                // При запуске активируем по умолчанию первую вкладку
            $('li').eq(0).click();
        }

        /* Активирует вкладку
         *
         * @param tab - ссылка на вкладку, которую следует активировать
         */
        function setActive(tab) {
            // удаляем актив у предыдущего Кэпшен
            $('.item_active').eq(0).removeClass('item_active');
            // добавляем класс Эктив текущему кэпшен
            tab.eq(0).addClass('item_active');
            // смотрим какой ИД у нового Эктив
            var ID = tab.eq(0).attr('data-capID');
            // удаляем старый эктив у предыдущего дива
            $('.content_active').eq(0).removeClass('content_active');
            // добавляем класс Эктив диву с ИД как у кэпшен
            $('.content').eq(ID).addClass('content_active');
        }

        // Тестовые данные для формирования JSON
        // формат - заголовок, текст
        var dataArr = [{
                caption: "tab 1 title",
                text: "text tab 1 text tab 1 text tab 1"
            },
            {
                caption: "tab 2 title",
                text: "text tab 2 text tab 2 text tab 2"
            },
            {
                caption: "tab 3 title",
                text: "text tab3 text tab3 text tab3"
            },
            {
                caption: "tab 4 title",
                text: "text tab 4 text tab 4 text tab 4"
            },
            {
                caption: "tab 5 title",
                text: "text tab 5 text tab 5 text tab 5"
            },
            {
                caption: "tab 6 title",
                text: "text tab 6 text tab 6 text tab 6"
            }
        ];
        var JSONdata = JSON.stringify(dataArr);
        createForm(JSONdata);

        //**************//  Задание 2,3    //****************************

        // установим обработчик на поле ввода
        $('#inputCity').on('focus', function() {
            var inputText = $(this).val();
            //
            if (inputText.length >= 3) {
                loadCity($(this));
            };
        });

        // установим обработчик на кнопку "Send"
        $('#btnSend').on('click', function(e) {
            e.preventDefault();
            loadCity($('#inputCity'));
        })

        /** По полному или частичному наименованию города создается запрос для создания списка
         * подходящих по наименованию городов
         * 
         * @param {any} obj ссылка на input, содержащий наименование или часть города
         */
        function loadCity(obj) {
            var txt = obj.val();
            // формируем url
            var setUrl = 'http://geoapi.spacenear.ru/api.php?method=getCities&limit=50&pattern=' + txt;
            // создаем AJAX запрос
            $.ajax({
                url: setUrl,
                type: 'GET',
                success: function(data) {
                    // передаем JSON и ссылку на input в функцию для обработки
                    createCitylist(data, obj);
                }
            });
        };

        /** Подставляем список городо в поле ввода
         * 
         * 
         * @param {any} data - список городов
         * @param {any} obj  - ссылка на input
         */
        function createCitylist(data, obj) {
            var inputC = obj;
            var $cityList = $('#cityList');
            // сначала очистим список значений для input-а
            $cityList.empty();
            var cities = JSON.parse(data);
            // проверка на наличие найденных городов
            if (cities['result'] === 0) {
                inputC.val('');
            } else {
                // в цикле дополним список для input данными
                cities.forEach(function(element) {
                    var cityName = element['name'];
                    var cityRegion = element['id_region'];
                    var $option = $('<option/>').attr({ "label": cityRegion, "value": cityName });
                    $cityList.append($option);
                })
            }
        }

    });
})(jQuery)