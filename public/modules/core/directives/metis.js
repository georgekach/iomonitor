/**
 * Created by George on 2/26/2016.
 */
app.directive('metis', function ($timeout) {
    return function ($scope, $element, $attrs) {
        if ($scope.$last == true) {
            $timeout(function () {
                $('#side-menu').metisMenu();
            }, 250)
        }
    };
});
