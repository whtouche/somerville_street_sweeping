var myApp = angular.module("StreetSweep",['ngResource']);


myApp.service("streetList", function($resource) {
    var parkingRestrictions = $resource('streetSweeping.json', {}).query();

    function searchStreet(input) {
        var searchResults = [];
        for (var i = 0; i < parkingRestrictions.length; i++) {
            if (parkingRestrictions[i]['Street Name'] === input) {
                searchResults.push(parkingRestrictions[i]);
            }
        }
        return searchResults;
    }
    return {search: searchStreet};
});

myApp.controller("parkingController", function($scope, streetList) {
    $scope.streetSearch = function() {
        $scope.foundStreet = streetList.search($scope.myStreet);

    };
    $scope.daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    $scope.daysOfMonth = function() {
        var days = [];
        for(var length = 1; length < 32; length++) {
                days.push( {date: length, side: 'even'} );
                days.push( {date: length, side: 'odd'} );
        }
        return days;
    }();
});

//create table where columns are days and rows are weeks