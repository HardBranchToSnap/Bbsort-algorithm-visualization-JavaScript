(function() {
    var customizeTick = function(el, i) {
        setTimeout(function() {
            window.Support.clearShowStyle();

            var leftEl = document.querySelector('#' + el.left.domId);
            var rightEl = document.querySelector('#' + el.right.domId);

            leftEl.style.backgroundColor = window.Settings.NORMAL_TICK_COLOR;
            rightEl.style.backgroundColor = window.Settings.NORMAL_TICK_COLOR;

            if (el.isBigger) {
                leftEl.style.backgroundColor = window.Settings.IS_BIGGER_TICK_COLOR;

                // Cохраняем свойства трансформации
                // (внешний отступ + ширина соседнего элемента)
                el.left.moved += (window.MARGIN_OF_EL + rightEl.offsetWidth);
                el.right.moved -= (window.MARGIN_OF_EL + leftEl.offsetWidth);

                // Применяем свойства трансформации к сортируемой паре
                leftEl.style.transform = 'translate(' + (el.left.moved) + 'px, 0)';
                rightEl.style.transform = 'translate(' + (el.right.moved) + 'px, 0)';
            }

        }, window.Settings.ONE_TICK_TIME * i);
    };


    // Действия после сортировки
    var doAfterSorting = function(ticks) {
        setTimeout(function() {
            // Удаляем все элементы с DOM'а
            window.Support.clearElements();

            // Удаляем все свойства трансформаций у элементов
            // и заново всё отрисовываем
            window.Global.Data.arr.forEach(function(el) {
                el.moved = 0;
                window.Support.createElementSpan(el.value, el.domId);
            });

            window.Support.setSpansPropertyes();
            window.Support.toggleButtonsField();
        }, window.Settings.ONE_TICK_TIME * ticks);
    };


    window.action = function(sortedCouples) {
        // Узнаём внешний отступ с обеих сторон всех сортируемых элементов,
        // чтобы не хардкодить и не изменять после смены css.
        // Передаём в window scope, чтоб не переопределять в цикле
        var elwrap = document.querySelector('.element-wrap');
        window.MARGIN_OF_EL = 2 * parseInt(window.getComputedStyle(elwrap).getPropertyValue("margin").split('px')[0]);

        sortedCouples.forEach(customizeTick);

        // Эта функция добавится в луп как последняя, после всех тиков
        // поэтому передаём ей колличество тиков
        doAfterSorting(sortedCouples.length);
    };
}());