//Элементы формы
var textArea = document.getElementById('textArea');
var txt = textArea.innerText;
var btn = document.getElementById('sendButton');
var userName = document.getElementById('userName');
var phone = document.getElementById('phone');
var email = document.getElementById('email');
var comment = document.getElementById('comment');
// Данные для проверки введенной информации
var inputFormat = {
    name: {
        pcre: /^([^\d])+$/,
        format: 'Text will not consist numbers'
    },
    phone: {
        pcre: /^\+7\(\d{3}\)\d{3}\-\d{4}$/,
        format: 'Use +7(000)000-0000 format.'
    },
    email: {
        pcre: /^[\w\d\.\-]*[\w\7]\@[\w\d]+[\w\d\.\-]+[\.]+[\w]{2,5}$/,
        format: 'Allow to use subdomains, symbol @ is necessary, length of last-level domain must be in 2-5 symbols'
    },
    comment: {
        pcre: /.+/,
        format: 'Any symbols'
    }
};

btn.addEventListener("click", checkRegexp);

/*
 *Проверка элементов формы на валидацию
 */
function checkRegexp(e) {
    e.preventDefault();
    //Преобразуем textArea
    textArea.innerText = txt.replace(/\B(\')/mg, '\"');
    //Проверяем Имя
    var textName = userName.value;
    var isNameValid = inputFormat.name.pcre.test(textName);
    showChecking(userName, inputFormat.name, isNameValid);
    //Проверяем телефон
    var phoneNumber = phone.value;
    var isPhoneValid = inputFormat.phone.pcre.test(phoneNumber);
    showChecking(phone, inputFormat.phone, isPhoneValid);
    //Проверяем email
    var emailText = email.value;
    var isEmailValid = inputFormat.email.pcre.test(emailText);
    showChecking(email, inputFormat.email, isEmailValid);
    //Проверяем текст
    var commentText = comment.value;
    var isCommentValid = inputFormat.comment.pcre.test(commentText);
    showChecking(comment, inputFormat.comment, isCommentValid);
}

/*
 *Визуальное отображение валидации
 */
function showChecking(elem, input, isValid) {
    var parentElem = elem.parentNode;
    //Сначала удалим старое уведомление
    if (parentElem.children[1]) {
        parentElem.children[1].remove();
    };
    //Валидация пройдена
    if (isValid) {
        if (elem.classList.contains('validError')) {
            elem.classList.remove('validError');
        }
        //Валидация не пройдена
    } else {
        var formatInfo = input.format;
        // Отображаем уведомление
        var tipElem = document.createElement('div');
        var coords = elem.getBoundingClientRect();
        var top = coords.top;
        var left = coords.right;
        //
        tipElem.className = 'tip'
        tipElem.innerHTML = 'please input correct data. ' + formatInfo;
        parentElem.appendChild(tipElem);
        // не вылезать за левую границу окна
        if (left < 0) {
            left = 0;
        }
        // не вылезать за верхнюю границу окна
        if (top < 0) {
            top = 0;
        }
        //
        tipElem.style.left = left + 'px';
        tipElem.style.top = top + 'px';
        // Изменяем внешний вид элемента ввода 
        if (!elem.classList.contains('validError')) {
            elem.classList.add('validError');
        }
    }
}