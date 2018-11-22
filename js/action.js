(function() {
    var customizeTick = function(el, i) {
        setTimeout(function() {
            window.Support.clearShowStyle();

            var leftEl = document.querySelector('#' + el.left.domId);
            var rightEl = document.querySelector('#' + el.right.domId);

            leftEl.style.backgroundColor = window.Settings.NORMAL_TICK_COLOR;
            rightEl.style.backgroundColor = window.Settings.NORMAL_TICK_COLOR;

            // Сохраняем состояние для паузы
            window.Global.Data.paused += 1;

            if (el.isBigger) {
                leftEl.style.backgroundColor = window.Settings.IS_BIGGER_TICK_COLOR;

                // Cохраняем свойства трансформации
                // (внешний отступ + ширина соседнего элемента)
                el.left.moved += (window.MARGIN_OF_EL + rightEl.offsetWidth);
                el.right.moved -= (window.MARGIN_OF_EL + leftEl.offsetWidth);

                // Применяем свойства трансформации к сортируемой паре
                leftEl.style.transform = 'translate(' + (el.left.moved) + 'px, 0)';
                rightEl.style.transform = 'translate(' + (el.right.moved) + 'px, 0)';

                // Найти индекс левого и правого элементов по id
                var leftElId = window.Global.Data.nonsorted.findIndex(function(e) {
                    return e.domId == el.left.domId;
                });
                var rightElId = window.Global.Data.nonsorted.findIndex(function(e) {
                    return e.domId == el.right.domId;
                });
                // Поменять их местами
                window.Global.Data.nonsorted[rightElId] = el.left;
                window.Global.Data.nonsorted[leftElId] = el.right;
            }

        }, window.Settings.ONE_TICK_TIME * i);
    };


    // Действия после сортировки
    doAfterSorting = function(ticks) {
        setTimeout(function() {
            window.Support.breakSorting();
            window.Support.toggleButtonsField();
            window.Support.toggleSortingOptions();

            // Сбрасываем счётчик состояний для пауз
            window.Global.Data.paused = 0;

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