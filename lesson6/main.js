(function ($) {
  $(function () {
    // Элементы формы
    var $btn = $('#sendButton').on('click', function (e) {
      e.preventDefault()
      checkRegexp()
    })
    var $userName = $('#userName')
    var $phone = $('#phone')
    var $email = $('#email')
    var $comment = $('#comment')
    var $birthDay = $('#birthDay')
      // Объкт, хранящий данные для проверки введенной информации
    var inputFormat = {
      name: {
        pcre: /^([^\d])+$/,
        format: 'Text will not consist numbers.'
      },
      bday: {
        pcre: /^[0-9]{2}\.[0-9]{2}\.[0-9]{4}$/,
        format: 'Use dd.mm.yyyy format'
      },
      phone: {
        pcre: /^\+7\(\d{3}\)\d{3}\-\d{4}$/,
        format: 'Use +7(000)000-0000 format.'
      },
      email: {
        pcre: /^[\w\d\.\-]*[\w\7]\@[\w\d]+[\w\d\.\-]+[\.]+[\w]{2,5}$/,
        format: 'Allow to use subdomains, symbol @ is necessary, length of last-level domain must be in 2-5 symbols.'
      },
      comment: {
        pcre: /.+/,
        format: 'Any symbols'
      }
    };


    /** Проверяем на валидность элементы и отправляем данные для
     *  визуализации уведомления
     */
    function checkRegexp() {
      //
      var warningArr = {
        elem: [],
        txt: []
      }
      var textName = $userName.eq(0).val()
      var textBirthDay = $birthDay.eq(0).val()
      var phoneNumber = $phone.eq(0).val()
      var emailText = $email.eq(0).val()
      var commentText = $comment.eq(0).val()
        // Проверяем Имя
      if ((!textName) || (!inputFormat.name.pcre.test(textName))) {
        warningArr.elem.push($userName)
        warningArr.txt.push(inputFormat.name.format)
      }
      // Проверяем дату рождения
      if ((!textBirthDay) || (!inputFormat.bday.pcre.test(textBirthDay))) {
        warningArr.elem.push($birthDay)
        warningArr.txt.push(inputFormat.bday.format)

      };
      // Проверяем телефон
      if ((!phoneNumber) || (!inputFormat.phone.pcre.test(phoneNumber))) {
        warningArr.elem.push($phone)
        warningArr.txt.push(inputFormat.phone.format)
      }
      // Проверяем email
      if ((!emailText) || (!inputFormat.email.pcre.test(emailText))) {
        warningArr.elem.push($email)
        warningArr.txt.push(inputFormat.email.format)
      }
      // Проверяем комментарий
      if ((!commentText) || (!inputFormat.comment.pcre.test(commentText))) {
        warningArr.elem.push($comment)
        warningArr.txt.push(inputFormat.comment.format)
      }
      //
      if (warningArr.elem.length > 0) {
        showWarning(warningArr)
      }
    }

    /** Выводим уведомление о неправильном формате
     *
     *
     * @param {any} elements - массив элементов для уведомления
     */
    function showWarning(elements) {
      console.log(elements);
      // Удалим старое окно
      $('.ui-dialog').remove()
        //
      var textDialog = ''
      elements.elem.forEach(function (element, ind) {
          // Сделаем анимацию на инпут
          element.effect('bounce', 500)
            // Соберем текст сообщения для всех элементов
          textDialog += ' \n' + ' ~~~ ' + elements.txt[ind]
        })
        // Выводим диалог
      $('<div/>', {
        text: textDialog
      }).dialog({
        position: {
          my: 'left top',
          at: 'right top',
          of: elements.elem[0]
        },
        show: {
          effect: 'drop',
          duration: 500
        },
        hide: {
          effect: 'scale',
          duration: 500
        },
        draggable: true,
        title: 'Внимание!',
        close: function (event, ui) {
          $(this).remove()
        }
      }, 'destroy')
    }

    // ********************- Задание№ 3 и 4 -******************************

    // Инициируем карусель
    $(function () {
      $('.jcarousel').jcarousel({
        // Configuration goes here
        animation: {
          duration: 900,
          easing: 'linear',
          complete: function () {}
        },
        wrap: 'circular'
      })
    })

    $('.jcarousel').jcarouselAutoscroll({
      interval: 4000,
      target: '+=1',
      autostart: true
    })

    // Настраиваем перетаскивание из карусели в карзину
    $('.carousel__item').draggable({ opacity: 0.7, helper: 'clone' })
    $('#cartBlock').droppable({
      drop: function (event, ui) {
        $(this).addClass('ui-state-highlight')
        var item = ($('<li/>', {
          class: 'cartList__item'
        }))
        item.append($('<div/>', {
          text: ui['draggable'].find('.goodTitle').eq(0).text(),
          class: 'goodName'
        }))
        item.append($('<div/>', {
          text: ui['draggable'].find('.goodPrice').eq(0).text(),
          class: 'goodPrice'
        }))
        $('#cartList').append(item)
      }
    })
  })
})(jQuery)