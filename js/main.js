(function() {
    var NUMBERS_REGEXP = /^[0-9]*$/;

    var KEY_CODE_ENTER = 13;


    var removeElement = function(evt) {
        if (evt.target.tagName.toLowerCase() == 'i') {
            var thisEl = evt.target.parentNode;
            thisEl.parentNode.removeChild(thisEl);

            window.Global.Data.arr.splice(window.Global.Data.arr.findIndex(function(el) {
                return el.domId == thisEl.id;
            }), 1);

            if (window.Global.Data.arr.length > 0) {
                window.Support.setSpansPropertyes();
            }
        }
    };


    var validateValue = function() {
        var values = window.Global.Element.NEW_ELEMENT_INPUT.value.split(' ').join('').split(',').map(function(el){
          return parseInt(el);
        });

        values.forEach(function(el){
          if (NUMBERS_REGEXP.test(el)) {
            window.Support.addElement(el);
          }
        });
    };

    var generateRandom = function() {
        window.Global.Data.arr = [];
        window.Support.clearElements();

        var rndArr = [];

        for (i = 0; i < window.Settings.RANDOM_ARRAY_LENGTH; i++) {
            var randomNumber = Math.floor(Math.random() * Math.floor(window.Settings.MAXIMAL_RANDOM_NUMBER));
            rndArr.push(randomNumber);
        }

        rndArr.forEach(window.Support.addElement);

    };

    var changeDomBeforeSort = function() {
        if(window.Global.Data.arr.length > 0){
          window.Support.toggleCloseButtons();
          window.Support.toggleButtonsField();
          window.Support.toggleSortingOptions();

          if (window.Global.Element.PAUSE_SORT_BUTTON.classList.contains('hidden')){
            window.Support.togglePauseContinue();
          }
          // Запуск сортировки
          window.bbsort();
        }
    };

    var stopSorting = function() {
        // Изменяем видимость элементов
        window.Support.toggleCloseButtons();
        window.Support.toggleButtonsField();

        window.Support.breakSorting();
        window.Global.Data.paused = 0;
        window.Support.toggleSortingOptions();
    };

    var pauseSorting = function() {
        window.Support.togglePauseContinue();
        window.Support.breakSorting(true);
    };

    var continueSorting = function() {
        window.Support.togglePauseContinue();
        window.Global.Data.arr = window.finalSorted;
        // Начинаем сортировать с места остановки
        var sortedCouples = window.copySortedCouples.slice(window.Global.Data.paused);
        window.action(sortedCouples);
    };

    window.Global.Element.NEW_ELEMENT_INPUT.addEventListener('keydown', function(evt) {
        if (evt.keyCode == KEY_CODE_ENTER) {
            validateValue();
        }
    });
    window.Global.Element.ADD_EL_BUTTON.addEventListener('click', validateValue);
    window.Global.Element.ELEMENTS_CONTAINER.addEventListener('click', removeElement);
    window.Global.Element.DO_SORT_BUTTON.addEventListener('click', changeDomBeforeSort);
    window.Global.Element.GENERATE_RANDOM_BUTTON.addEventListener('click', generateRandom);
    window.Global.Element.STOP_SORT_BUTTON.addEventListener('click', stopSorting);
    window.Global.Element.PAUSE_SORT_BUTTON.addEventListener('click', pauseSorting);
    window.Global.Element.CONTINUE_SORT_BUTTON.addEventListener('click', continueSorting);

    window.Global.Element.SPEED_BUTTON.addEventListener('click', function(evt){
      window.Global.Element.SPEED_FILTER.style.display = null;
      evt.currentTarget.style.display = 'none';
    });

    window.Global.Element.SPEED_FILTER.addEventListener('change', function(evt){
      var selectedFilter = evt.target.value;

      window.Support.changeSpeed[selectedFilter]();
    });
}());