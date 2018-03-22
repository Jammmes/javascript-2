(function($) {
    $(function() {
        /*
         *******************Обработчики
         */

        //Установим обработчик нажатия на кнопку - показать все отзывы
        $('#btnShowReview').on('click', function(e) {
            getReviews();
        })

        //Установим обработчик нажатия на кнопку - скрыть отзывы
        $('#btnHideReview').on('click', function(e) {
            $('.review').remove();
        })

        //Установим обработчик нажатия на кнопку - добавить отзыв
        $('#btnAddReview').on('click', function(e) {
            //
            var id = $('#inputID')[0].value;
            var userId = $('#inputUserID')[0].value;
            var comment = $('#txtArea_add')[0].value;
            if (id && userId && comment) {
                //Cоберем данные в JSON
                var newReview = JSON.stringify({
                        id: id,
                        userId: userId,
                        comment: comment,
                        isAccept: 0
                    })
                    //вызываем функцию добавления отзыва
                addReview(newReview);
            } else {
                console.log('Заполните все реквизиты');
            }
        })

        //Установим обработчик нажатия на кнопку - одобрить отзыв
        $('#btnAccReview').on('click', function(e) {
            //Сначала соберем данные в JSON
            var accReview = JSON.stringify({
                    id: $('#inputReview')[0].value,
                    isAccept: 1
                })
                //вызываем функцию одобрения отзыва
            acceptReview(accReview);
        })

        //Установим обработчик нажатия на кнопку - удалить отзыв
        $('#btnDelReview').on('click', function(e) {
            var reviewId = $('#inputReview')[0].value;
            //вызываем функцию удаления отзыва
            deleteReview(reviewId);
        })

        /*
         ***********************Функции по работе с JSON-server
         */

        /** Получаем список всех отзывов и вызываем отрисовку их списка
         * 
         * 
         */
        function getReviews() {
            //
            $.ajax({
                url: "http://localhost:3000/review",
                dataType: 'json',
                success: function(reviews) {
                    renderAllReview(reviews);
                }
            })
        }

        /** Удалить отзыв
         * 
         * 
         * @param {any} reviewId - ИД отзыва
         */
        function deleteReview(reviewId) {
            //
            var setUrl = 'http://localhost:3000/review/' + reviewId;
            $.ajax({
                url: setUrl,
                dataType: 'json',
                type: 'DELETE',
                contentType: 'application/json',
                success: function() {
                    console.log('success send delete-request');
                }
            });
        }
        /**Добавить отзыв
         * 
         * 
         * @param {any} newReview - данные в формате JSON
         */
        function addReview(newReview) {
            $.ajax({
                url: "http://localhost:3000/review",
                dataType: 'json',
                type: 'POST',
                contentType: 'application/json',
                data: newReview,
                success: function() {
                    console.log('success send add-request');
                }
            });
        }

        /** Одобрить отзыв
         * 
         * 
         * @param {any} accReview - данные в формате JSON
         */
        function acceptReview(accReview) {
            //
            $.ajax({
                url: "http://localhost:3000/reviewBuffer",
                dataType: 'json',
                type: 'POST',
                contentType: 'application/json',
                data: accReview,
                success: function() {
                    console.log('success send accept-request');
                }
            });
        }

        /*
         *******************Рендеринг
         */

        /** Показать список всех отзывов
         * 
         * 
         * @param {any} reviews - данные в JSON формате
         */
        function renderAllReview(reviews) {
            //Удалим старые записи
            $('.review').remove();
            //
            reviews.forEach(function(review) {
                var $li = $('<li/>').addClass('list__item review');
                var $itemBlockId = $('<div/>').addClass('itemBlock');
                var $itemBlockLine1 = $('<div/>').addClass('itemBlock__line');
                var $reviewsId = $('<div/>', {
                    class: 'reviewId',
                    text: 'ID: ' + review.id
                });
                //
                var $reviewsUserId = $('<div/>', {
                    class: 'UserId',
                    text: ', USER ID: ' + review.userId
                });
                var $comment = $('<div/>', {
                    class: 'comment',
                    text: ', TEXT: ' +
                        review.comment
                });
                var $status = $('<div/>', {
                    class: 'status',
                    text: ', IS ACCEPT: ' + review.isAccept
                });
                //
                $itemBlockId.append($itemBlockLine1);
                $itemBlockLine1.append($reviewsId, $reviewsUserId, $comment, $status);
                $li.append($itemBlockId);
                //
                $('#reviewList').append($li);
            });
        }
    });

})(jQuery)