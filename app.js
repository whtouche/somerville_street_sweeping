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
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    $scope.daysOfWeek = days;
    var months = [31,28,31,30,31,30,31,31,30,31,30,31];

    $scope.daysOfMonth = getDaysOfMonth();

    function getDaysOfMonth() {
        var today = new Date();
        var month = [];
        var week = [];
        var dayOfWeek = today.getDate() % 7;

        for (var i = 0; i < months[today.getMonth()]; i++) {
            week[dayOfWeek] = {
                day: days[dayOfWeek],
                date: i + 1,
                isToday: today.getDate() === i + 1
            }
            if (dayOfWeek == 6) {
                month.push(week);
                week = [];
            }
            dayOfWeek = ( dayOfWeek + 1 ) % 7;
        }
        month.push(week);
        return month;
    }
});

