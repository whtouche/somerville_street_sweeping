var myApp = angular.module("StreetSweep",[]);

myApp.controller("parkingController", function($scope, streetList) {
    $scope.streetSearch = function() {
        $scope.foundStreet = streetList.search($scope.myStreet);

    };
    $scope.daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday"];
});

myApp.service("streetList", function($resource) {
    var parkingRestrictions = $resource(streetSweeping.json, {});
    ];

    function searchStreet(input) {
        for (var i = 0; i < streets.length; i++) {
            if (streets[i].name === input) {
                return streets[i];
            }
        }
        return null;
    }
    return {search: searchStreet};
});