(function() {
    var customizeTick = function(i, leftEl, rightEl, isBigger) {
        setTimeout(function() {
            window.Support.clearShowStyle();

            leftEl.style.backgroundColor = window.Settings.NORMAL_TICK_COLOR;
            rightEl.style.backgroundColor = window.Settings.NORMAL_TICK_COLOR;

            if (isBigger) {
                leftEl.style.backgroundColor = window.Settings.IS_BIGGER_TICK_COLOR;
                rightEl.parentNode.insertBefore(rightEl, leftEl);
            }
        }, window.Settings.ONE_TICK_TIME * i);
    };

    // Действия после сортировки
    var doAfterSorting = function(ticks) {
        setTimeout(function() {
            window.Support.setSpansPropertyes();
            window.Support.toggleButtonsField();
            window.Support.toggleCloseButtons();
        }, window.Settings.ONE_TICK_TIME * ticks);
    };


    window.action = function(sortedCouples) {
        for (i = 0; i < sortedCouples.length; i++) {
            var el = sortedCouples[i];

            var leftEl = document.querySelector('#' + el[0].domId);
            var rightEl = document.querySelector('#' + el[1].domId);

            var isBigger = el[2];

            // Добавляет в луп эффекты тика
            customizeTick(i, leftEl, rightEl, isBigger);
        }
        // Эта функция добавится в луп как последняя, после всех тиков
        // поэтому передаём ей колличество тиков
        doAfterSorting(sortedCouples.length);
    };
}());