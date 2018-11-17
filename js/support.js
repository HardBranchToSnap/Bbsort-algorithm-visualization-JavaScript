(function() {
    window.Support = {
        createElementSpan: function(integerValue, elId) {
            // Создание спана элемента
            var newEl = document.createElement('span');
            newEl.classList.add('element-wrap');
            newEl.textContent = integerValue;
            newEl.id = elId;

            window.Global.Element.ELEMENTS_CONTAINER.appendChild(newEl);

            // Создание кнопки удаления на спане
            var deleteButton = document.createElement('i');
            deleteButton.classList.add('delete', 'delete-button');
            newEl.appendChild(deleteButton);
        },

        addElement: function(integerValue) {
            var elId = window.Global.Data.arrState.getId();

            window.Support.createElementSpan(integerValue, elId);

            window.Global.Data.arr.push({
                domId: elId,
                value: integerValue,
                moved: 0
            });

            window.Support.setSpansPropertyes();

            window.Global.Element.NEW_ELEMENT_INPUT.value = '';
        },

        // Устанавливает оттенок и высоту сортируемого элемента,
        // относительно самому большому по значению
        setSpansPropertyes: function() {
            var bigestValue = window.Global.Data.arr.map(function(el) {
                return el.value;
            }).sort(function(a, b) {
                return b - a;
            })[0];

            window.Global.Data.arr.forEach(function(el) {
                var percentFromBigest = el.value * 100 / bigestValue;

                var thisEl = document.querySelector('#' + el.domId);
                thisEl.style.backgroundColor = 'hsl(' + percentFromBigest + ', 50%, 50%)';
                thisEl.style.height = percentFromBigest + '%';
            });
        },

        // Удаляет все стили после каждого тика алгоритма
        clearShowStyle: function() {
            var pseudoArrayElements = document.querySelectorAll('.element-wrap');

            for (i = 0; i < pseudoArrayElements.length; i++) {
                pseudoArrayElements[i].style.backgroundColor = null;
            }
        },

        // Удаляет дочерние ноды у контейнера элементов
        clearElements: function() {
            while (Global.Element.ELEMENTS_CONTAINER.firstChild) {
                Global.Element.ELEMENTS_CONTAINER.removeChild(Global.Element.ELEMENTS_CONTAINER.firstChild);
            }
        },

        /* Переключатели видимости элементов */
        toggleCloseButtons: function() {
            var closeButtons = document.querySelectorAll('.delete');
            for (i = 0; i < closeButtons.length; i++) {
                closeButtons[i].classList.toggle('unvisible');
            }
        },

        toggleButtonsField: function() {
            var userInfo = document.querySelector('.user-info');
            var userForm = document.querySelector('.user-form');
            userInfo.classList.toggle('hidden');
            userForm.classList.toggle('hidden');
        },

        displayError: function(message) {
            alert(message);
        }
    };
}());