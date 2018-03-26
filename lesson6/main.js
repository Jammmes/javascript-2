(function ($) {
  $(function () {
    // Элементы формы
    var btn = $('#sendButton')
    var userName = $('#userName')
    var phone = $('#phone')
    var email = $('#email')
    var comment = $('#comment')
    var birthDay = $('#birthDay')
      // Регулярные выражения для проверки
    var pcreName = /([^\d\s])+/
    var pcrePhone = /^\+7\(\d{3}\)\d{3}-\d{4}$/
    var pcreEmail = /^[a-zA-Z0-9]+[a-zA-Z0-9.-]*[a-zA-Z0-9]@[a-zA-Z0-9]+[a-zA-Z0-9.-]+[a-zA-Z0-9]$/
    var pcreComment = /.+/
    var pcreBirthDay = /^[0-9]{2}\.[0-9]{2}\.[0-9]{4}$/

    /** Проверяем на валидность элементы и отправляем данные для
     *  визуализации уведомления
     */
    function checkRegexp() {
      //
      var warningArr = []
      var textName = userName.eq(0).val()
      var textBirthDay = birthDay.eq(0).val()
      var phoneNumber = phone.eq(0).val()
      var emailText = email.eq(0).val()
      var commentText = comment.eq(0).val()
        // Проверяем Имя
      if ((!textName) || (!pcreName.test(textName))) {
        warningArr.push(userName)
      }
      // Проверяем дату рождения
      if ((!textBirthDay) || (!pcreBirthDay.test(textBirthDay))) {
        warningArr.push(birthDay)
      };
      // Проверяем телефон
      if ((!phoneNumber) || (!pcrePhone.test(phoneNumber))) {
        warningArr.push(phone)
      }
      // Проверяем email
      if ((!emailText) || (!pcreEmail.test(emailText))) {
        warningArr.push(email)
      }
      // Проверяем комментарий
      if ((!commentText) || (!pcreComment.test(commentText))) {
        warningArr.push(comment)
      }
      //
      if (warningArr.length > 0) {
        showWarning(warningArr)
      }
    }

    /** Выводим уведомление о неправильном формате
     *
     *
     * @param {any} elements - массив элементов для уведомления
     */
    function showWarning(elements) {
      // Удалим старое окно
      $('.ui-dialog').remove()
        //
      var textDialog = ''
      var i = 1
      elements.forEach(function (element) {
          // Сделаем анимацию на инпут
          element.effect('bounce', 500)
            // Соберем текст сообщения для всех элементов
          textDialog += ' \n' + i + '.) ' + $(element).parent().find('.dialogText').children(0).text()
          i++
        })
        // Выводим диалог
      $('<div/>', {
        text: textDialog
      }).dialog({
        position: {
          my: 'left top',
          at: 'right top',
          of: elements[0]
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

    $(btn).on('click', function (e) {
      e.preventDefault()
      checkRegexp()
    })

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