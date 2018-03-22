//module3

(function($) {
    $(function() {
        // Элементы формы
        function changeTextButton(Butt, text) {
            $(Butt).text(text);
        }
        changeTextButton($('#buttApply'), 'Send to');
    })
})(jQuery)