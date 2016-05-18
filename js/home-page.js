

// Enables popover #2
jQuery(document).ready(function(){

    /*tooltip function*/
    jQuery(".example-popover-2").popover({
        html : true,
        content: function() {
            return jQuery("#example-popover-2-content").html();
        },
        title: function() {
            return jQuery("#example-popover-2-title").html();
        }
    });


});

var app = angular.module('index', ['highcharts-ng']);
app.controller('indexCtrl', function($http, $scope) {
    var restaurantList = [
        {"restaurant_business_id": 1, "name": "La Pitas", "location": "122 Santa Clara and 3rd, San Jose Downtown, CA", "parking_garage": "Yes", "AcceptsCreditCards": "Yes", "src": "images/restaurant1.jpg"},
        {"restaurant_business_id": 2, "name": "Amici's", "location": "1st and Market St, San Jose Downtown, CA", "parking_garage": "No", "AcceptsCreditCards": "Yes", "src": "images/restaurant2.jpg"},
        {"restaurant_business_id": 3, "name": "P.f Chang's", "location": "3122 Santana Row, Beside Best Buy, San Jose, CA", "parking_garage": "Yes", "AcceptsCreditCards": "Yes", "src": "images/restaurant3.jpg"},
        {"restaurant_business_id": 4, "name": "Amber India", "location": "3122 Santana Row, Beside Best Buy, San Jose, CA", "parking_garage": "Yes", "AcceptsCreditCards": "Yes", "src": "images/restaurant4.jpg"},
        {"restaurant_business_id": 5, "name": "Shanghai Chef", "location": "3122 Santana Row, Beside Best Buy, San Jose, CA", "parking_garage": "Yes", "AcceptsCreditCards": "Yes", "src": "images/restaurant5.jpg"}
    ];
    $scope.columns = [
        "column1","column2","column3","column4","column5"
    ];
    $scope.dynamicPopover = {
        content: 'Hello, World!',
        templateUrl: 'myPopoverTemplate.html',
        title: 'Title'
    };

    $scope.getColumnData = function(value){
        $http({
            method: 'GET',
            url: 'http://localhost:3000/getColumnData/'
        }).success(function(response) {
            if(!response.isDistinct && ("frequency" in response)){
                var customOptions = {"type":"bar","title":value,"keys":[],"series":[]};
                customOptions.keys = Object.keys(response.frequency);
                for( var key in response.frequency ) {
                    if ( response.frequency.hasOwnProperty(key) ) {
                        customOptions.series.push(parseInt(response.frequency[key]));
                    }
                }
                response.customOptions=customOptions;
                drawHighChart(response);
            }else if(response.isDistinct && response.isNum){
                response.customOptions = {};
            }
        }).error(function (error) {
            console.log(error);
        });
    };

    function drawHighChart(response){
        $scope.chartConfig = {
            options: {
                chart: {
                    type: response.customOptions.type
                }
            },
            xAxis: {
                categories: response.customOptions.keys
            },
            series: [{
                data: response.customOptions.series
            }],
            title: {
                text: response.customOptions.title
            },

            loading: false
        }
    }
    $scope.restaurants = restaurantList;
    // //implement this code:
    // var getRestaurantList = function() {
    //     $http.get('/getList').success(function (response) {
    //       console.log(response);
    //       if(response != null)
    //         $scope.restaurants = response.restaurantList;
    //     }).error(function(error){
    //         alert(error);
    //     });
    // };

    // getRestaurantList();

    $scope.getMoreInfo = function(businessId) {
        console.log("Inside getMoreInfo");
        $http({
            method: 'GET',
            url: '/getMoreInfo',
            data: {
                "businessId": businessId,
            }
        }).success(function(response) {
            window.location = '/index';
        }).error(function (error) {
            console.log(error);
        });
    };

    $scope.getRestaurantReviews = function() {
        $http({
            method: 'POST',
            url: '/logout'
        }).success(function(response){
            //alert("logout success");
            window.location='/';
        }).error(function(error){
            alert(error);
        });
    }

});

app.directive('bsPopover', function() {
    return function(scope, element, attrs) {
        element.find("a[rel=popover]").popover({ placement: 'bottom', html: 'true', trigger: 'focus'});
    };
});
