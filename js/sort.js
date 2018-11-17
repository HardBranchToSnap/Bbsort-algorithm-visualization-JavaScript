(function() {
    window.bbsort = function() {
        var sortedCouples = [];

        var arr = window.Global.Data.arr;
        var len = window.Global.Data.arr.length;

        for (var i = len - 1; i >= 0; i--) {
            for (var j = 1; j <= i; j++) {
                var isBigger = arr[j - 1].value > arr[j].value;
                // Добавляет сортировочные пары и состояния сортировки
                // в массив, который в будущем попадёт в визуализацию
                sortedCouples.push({left: arr[j - 1], right: arr[j], isBigger: isBigger});
                if (isBigger) {
                    var temp = arr[j - 1];
                    arr[j - 1] = arr[j];
                    arr[j] = temp;
                }
            }
        }
        window.action(sortedCouples);
    };
}());