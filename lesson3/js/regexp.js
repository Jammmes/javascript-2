//Элементы формы
var textArea = document.getElementById('textArea');
var txt = textArea.innerText;
var btn = document.getElementById('sendButton');
var userName = document.getElementById('userName');
var phone = document.getElementById('phone');
var email = document.getElementById('email');
var comment = document.getElementById('comment');
// Регулярные выражения
var pcreName = /^([^\d\s])+$/;
var pcrePhone = /^\+7\(\d{3}\)\d{3}\-\d{4}$/;
var pcreEmail = /^[a-zA-Z0-9]+[a-zA-Z0-9.-]*[a-zA-Z0-9]\@[a-zA-Z0-9]+[a-zA-Z0-9.-]+[a-zA-Z0-9]$/;
var pcreComment = /\b.+/;

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
    var isNameValid = pcreName.test(textName);
    showChecking(userName, isNameValid);
    //Проверяем телефон
    var phoneNumber = phone.value;
    var isPhoneValid = pcrePhone.test(phoneNumber);
    showChecking(phone, isPhoneValid);
    //Проверяем email
    var emailText = email.value;
    var isEmailValid = pcreEmail.test(emailText);
    showChecking(email, isEmailValid);
    //Проверяем текст
    var commentText = comment.value;
    var isCommentValid = pcreComment.test(commentText);
    showChecking(comment, isCommentValid);
}

/*
 *Визуальное отображение валидации
 */
function showChecking(elem, isValid) {
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
        var formatInfo = elem.dataset.format;
        // Отображаем уведомление
        var tipElem = document.createElement('div');
        var coords = elem.getBoundingClientRect();
        var top = coords.top;
        var left = coords.right;
        //
        tipElem.className = 'tip'
        tipElem.innerHTML = 'please input data in correct ' + formatInfo;
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