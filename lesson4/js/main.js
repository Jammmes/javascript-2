(function ($) {
  $(function () {

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
      var $captions = $('<ul/>').addClass('control__captions').on('click', '.item', function (event) {
        setActive($(this));
      });
      $control.append($captions);
      //
      dataArr.forEach(function (element, i) {
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
      var $li = $('li');
      $li.eq(1).click();
    }

    /* Активирует вкладку
     *
     * @param tab - ссылка на вкладку, которую следует активировать
     */
    function setActive(tab) {
      //Удаляем актив у предыдущего Кэпшен
      $('.item_active').eq(0).removeClass('item_active');
      //Добавляем класс Эктив текущему кэпшен
      tab.eq(0).addClass('item_active');
      //Смотрим какой ИД у нового Эктив
      var ID = tab.eq(0).attr('data-capID');
      //Удаляем старый эктив у предыдущего дива
      $('.content_active').eq(0).removeClass('content_active');
      //Добавляем класс Эктив диву с ИД как у кэпшен
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

    //Установим обработчик на поле ввода
    $('#inputCity').on('input', function () {
      var inputText = $(this).val();
      //
      if (inputText.length >= 3) {
        loadCity($(this));
      };
    });
    //Установим обработчик на кнопку "Send"
    $('#btnSend').on('click', function (e) {
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
        success: function (data, obj) {
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