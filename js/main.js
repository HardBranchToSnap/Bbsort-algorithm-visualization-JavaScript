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

            if(window.Global.Data.arr.length > 0){
              window.Support.setSpansPropertyes();
            }
        }
    };


    var validateValue = function() {
      var integerValue = parseInt(window.Global.Element.NEW_ELEMENT_INPUT.value);
      
      // Проверяет на регулярку
      if (!NUMBERS_REGEXP.test(integerValue)) {
          return window.Support.displayError(window.Global.ErrorMessage.MISSING_PATTERN);
      }

      window.Support.addElement(integerValue);
    };

    var generateRandom = function() {
      window.Support.clearElements();

      var rndArr = [];

      for(i=0; i< window.Settings.RANDOM_ARRAY_LENGTH; i++){
        var randomNumber = Math.floor(Math.random() * Math.floor(window.Settings.MAXIMAL_RANDOM_NUMBER));
        rndArr.push(randomNumber);
      }

      rndArr.forEach(window.Support.addElement);

    };

    var changeDomBeforeSort = function(){
      window.Support.toggleCloseButtons();
      window.Support.toggleButtonsField();
      // Запуск сортировки
      window.bbsort();
    };

    window.Global.Element.NEW_ELEMENT_INPUT.addEventListener('keydown', function(evt){
      if(evt.keyCode == KEY_CODE_ENTER){
        validateValue();
      }
    });
    window.Global.Element.ADD_EL_BUTTON.addEventListener('click', validateValue);
    window.Global.Element.ELEMENTS_CONTAINER.addEventListener('click', removeElement);
    window.Global.Element.DO_SORT_BUTTON.addEventListener('click', changeDomBeforeSort);
    window.Global.Element.GENERATE_RANDOM_BUTTON.addEventListener('click', generateRandom);
}());