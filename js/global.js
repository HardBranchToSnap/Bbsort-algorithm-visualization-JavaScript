(function() {
    window.Global = {
        Element: {
            ELEMENTS_CONTAINER: document.querySelector('.added-els'),
            NEW_ELEMENT_INPUT: document.querySelector('.insert-el'),
            DO_SORT_BUTTON: document.querySelector('.do-sort'),
            ADD_EL_BUTTON: document.querySelector('.add-el'),
            GENERATE_RANDOM_BUTTON: document.querySelector('.generate-random')
        },

        Data: {
            arr: [],

            arrState: {
                lastId: 0,
                getId: function() {
                    this.lastId += 1;
                    return 'el--' + this.lastId;
                }
            }
        },

        ErrorMessage: {
            MISSING_PATTERN: 'Вы должны добавить число'
        }
    };
}());