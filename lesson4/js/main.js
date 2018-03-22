(function($) {
    $(function() {

        /*Создает форму с вкладками
         *@param- данные для вкладок в формате JSON
         *@LIMIT - ограничение: 15 вкладок максимум
         */
        function createForm(JSONdata) {
            var LIMIT = 15;
            var dataArr = $.parseJSON(JSONdata);
            $('#container').append('<div class="control"></div>');
            $('.control').append('<ul class="control__captions"></div>');
            for (var i = 0; i < dataArr.length; i++) {
                var caption = dataArr[i]['caption'];
                var txt = dataArr[i]['text'];
                $('.control__captions').append('<li class = "item" data-capID="' + i + '">' + caption + '</div>');
                $('.control').append('<div class="content" data-tabID="' + i + '">' + txt + '</div>');
                if (i === LIMIT - 1) { i = dataArr.length };
            }
            //При запуске активируем по умолчанию первую вкладку
            setActive(0, null);

            //Установим обработчик на событие click используя всплытие
            $('.control__captions').on('click', '.item', function(event) {
                //
                setActive(null, $(this));
            });
        }

        /* Активирует вкладку
         *
         *@param manual - номер вкладки, которую нужно активировать / ручной тип выполнения
         *@param e - контекст, которые передается при автоматическом типе выполнения
         */
        function setActive(manual, e) {
            //Если запуск вручную
            if (typeof manual == "number") {
                $($('li')[manual]).addClass('item_active');
                $($('li')[manual]).removeClass('item');
                $($('.content')[manual]).addClass('content_active');
            } else {
                //Удаляем текущий класс
                $(e[0]).removeClass('item');
                //Удаляем актив у предыдущего Кэпшен
                var oldActiveCap = $('.item_active');
                $(oldActiveCap[0]).addClass('item');
                $(oldActiveCap[0]).removeClass('item_active');
                //Добавляем класс Эктив текущему кэпшен
                $(e[0]).addClass('item_active');
                //Смотрим какой ИД у нового Эктив
                var ID = e[0].dataset.capid;
                //Удаляем старый эктив у предыдущего дива
                var oldActiveCont = $('.content_active');
                $(oldActiveCont[0]).removeClass('content_active');
                $(oldActiveCont[0]).addClass('content');
                //Добавляем класс Эктив диву с ИД как у кэпшен
                var newCont = $($('.content')[ID]);
                newCont.removeClass('content');
                newCont.addClass('content_active');
            }
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

        //Установим обработчик на поле ввода
        $('#inputCity').on('input', function() {
            var inputText = $(this).val();
            //
            if (inputText.length >= 3) {
                loadCity($(this));
            };
        });
        //Установим обработчик на кнопку "Send"
        $('#btnSend').on('click', function(e) {
            e.preventDefault();
            loadCity($('#inputCity'));
        })

        /*По входящим данным подгружает с сервера и возвращает список городов
         *@param txt - строка для поиска города по наименованию
         * 
         */
        function loadCity(obj) {
            var txt = obj.val();
            //Формируем url
            var setUrl = 'http://geoapi.spacenear.ru/api.php?method=getCities&limit=50&pattern=' + txt;
            //Создаем AJAX запрос
            $.ajax({
                url: setUrl,
                type: 'GET',
                success: function(data, obj) {
                    //Здесь контекст обрывается
                    //Передаем JSON в функцию для обработки
                    createCitylist(data, obj);
                }
            });
        };

        /* Создаем из JSON список городов и подставляем его в выпадающий список 
         *
         * 
         */
        function createCitylist(data, obj) {
            //пока контекст потерян, obj не работает
            //нахожу инпут ручками
            var inputC = $('#inputCity');
            //сначала очистим список
            $('#cityList').empty();
            var cities = $.parseJSON(data);
            //проверка на наличие найденных городов
            if (cities['result'] == 0) {
                inputC.val('');
            } else {
                //В цикле дополним input данными
                for (var i = 0; i < cities.length; i++) {
                    var cityName = cities[i]['name'];
                    var cityRegion = cities[i]['id_region'];
                    $('#cityList').append('<option label="' + cityRegion + '" value="' + cityName + '">')
                }
                //сымитируем двойной клик для раскрытия элементов списка
                inputC.dblclick();
            }
        }


    });
})(jQuery)