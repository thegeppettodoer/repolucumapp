// angular.module('reverseDirective', [])
//     .filter('reverse', function(){
//         return function(items){
//             return items.slice().reverse();
//         };
//     });

angular.module('reverseDirective', [])
    .filter('reverse', function() {
        return function(items) {
            if (!items) {
                return;
            }
            return items.slice().reverse();
        }
    });


$(document).ready(function() {
    $('[data-toggle="popover"]').popover();
});
