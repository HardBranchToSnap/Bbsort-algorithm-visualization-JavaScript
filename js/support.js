(function() {
    window.Support = {
        createElementSpan: function(integerValue, elId, noCrossButton) {
            // Создание спана элемента
            var newEl = document.createElement('div');
            newEl.classList.add('element-wrap');
            newEl.id = elId;
            
            var spanEl = document.createElement('span');
            spanEl.classList.add('el-span');
            spanEl.textContent = integerValue;

            window.Global.Element.ELEMENTS_CONTAINER.appendChild(newEl);
            // Создание кнопки удаления на спане
              if(!noCrossButton){
                var deleteButton = document.createElement('i');
                deleteButton.classList.add('delete', 'delete-button');
                newEl.appendChild(deleteButton);
              }
            newEl.appendChild(spanEl);
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

                var thisSpan = thisEl.querySelector('.el-span');

                // Задаём фиксированную ширину колонки
                thisEl.style.width = (thisSpan.offsetWidth) + 'px';
                // Задаём правильные отступы спан-цифр
                thisSpan.style.right = ((thisEl.offsetWidth - thisSpan.offsetWidth) / 2 ) + 'px';  
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

        clearTimeouts: function(){
          // Set a fake timeout to get the highest timeout id
          var highestTimeoutId = setTimeout(';');
          // clear all timeouts with an id between 0 and highestTimeoutId
            for (var i = 0 ; i < highestTimeoutId ; i++) {
                clearTimeout(i); 
            }
        },

        toggleSortingOptions: function(){
          window.Global.Element.SORTING_OPTIONS.classList.toggle('hidden');
        },

        togglePauseContinue: function(){
          window.Global.Element.CONTINUE_SORT_BUTTON.classList.toggle('hidden');
          window.Global.Element.PAUSE_SORT_BUTTON.classList.toggle('hidden');
        },

        changeSpeed: {
          '0': function(){ window.Settings.ONE_TICK_TIME = 500; },
          '1': function(){ window.Settings.ONE_TICK_TIME = 1000; },
          '2': function(){ window.Settings.ONE_TICK_TIME = 1500; },
        }
    };
}());