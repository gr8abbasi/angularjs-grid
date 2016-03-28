angular.module('tblModule', [])
.directive('myCustomer', function() {
    return {
        restrict: 'E',
        transclude: true,

        scope: {
            "tblWidth": '='
        },

        link: function (scope, element) {
            scope.$watch("tblWidth", function (value) {
                $("#tbltemp").css({"width": value + "px"});
            }, false);
        },

        controller: function($scope, $filter) {
            $scope.sortingOrder = sortingOrder;
            $scope.reverse = false;
            $scope.filteredItems = [];
            $scope.groupedItems = [];
            $scope.itemsPerPage = 5;
            $scope.pagedItems = [];
            $scope.currentPage = 0;
            $scope.items = [
                {"id":"1","name":"Biswabhusan","designation":"Sr. UI Developer","employeeid":"012801","email":"biswabhusan@gmail.com","location":"INDIA"}, 
                {"id":"2","name":"Rakesh Srivastab","designation":"Software Engineer","employeeid":"013882","email":"rakesh@gmail.com","location":"GERMANY"}, 
                {"id":"3","name":"John Fernandez","designation":"Sr. Team Lead","employeeid":"055620","email":"john@gmail.com","location":"ITALY"}, 
                {"id":"4","name":"Kumar Abhishek","designation":"Project Manager","employeeid":"032451","email":"ku.abhishek@gmail.com","location":"INDIA"}, 
                {"id":"5","name":"Swati Rao","designation":"UI Developer","employeeid":"001235","email":"rao@gmail.com","location":"HONG KONG"}, 
                {"id":"6","name":"Monika Roy","designation":"SEO","employeeid":"076565","email":"monika@gmail.com","location":"INDIA"}, 
                {"id":"7","name":"Monalisha Pradhan","designation":"Sr. Software Engineer","employeeid":"012302","email":"monalisha@gmail.com","location":"US"}
            ];
            
            var source = new EventSource("http://localhost:8080");

            source.addEventListener("message", function(e) {
                obj = JSON.parse(e.data);
                $scope.items.push(
                    {"id":"1","name":"aaaaaaaaa","designation":"Sr. UI Developer","employeeid":"012801","email":"biswabhusan@gmail.com","location":"INDIA"}, 
                    {"id":"2","name":"bbbbbbb Srivastab","designation":"Software Engineer","employeeid":"013882","email":"rakesh@gmail.com","location":"GERMANY"}, 
                    {"id":"3","name":"ccccccc Fernandez","designation":"Sr. Team Lead","employeeid":"055620","email":"john@gmail.com","location":"ITALY"}, 
                    {"id":"4","name":"ddddddd Abhishek","designation":"Project Manager","employeeid":"032451","email":"ku.abhishek@gmail.com","location":"INDIA"}, 
                    {"id":"5","name":"eeeeeeee Rao","designation":"UI Developer","employeeid":"001235","email":"rao@gmail.com","location":"HONG KONG"}, 
                    {"id":"6","name":"ffffffff Roy","designation":"SEO","employeeid":"076565","email":"monika@gmail.com","location":"INDIA"}, 
                    {"id":"7","name":"ggggggg Pradhan","designation":"Sr. Software Engineer","employeeid":"012302","email":"monalisha@gmail.com","location":"US"}

                );

                //updatePrice(e.data);
                //              //logMessage(e);
            }, false);

            var searchMatch = function (haystack, needle) {
                if (!needle) {
                    return true;
                }
                return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
            };

            // initializing the filtered items
            $scope.search = function () {
                $scope.filteredItems = $filter('filter')($scope.items, function (item) {
                    for(var attr in item) {
                        if (searchMatch(item[attr], $scope.query))
                            return true;
                    }
                    return false;
                });
                // taking care of the sorting order
                if ($scope.sortingOrder !== '') {
                    $scope.filteredItems = $filter('orderBy')($scope.filteredItems, $scope.sortingOrder, $scope.reverse);
                }
                $scope.currentPage = 0;
                // now group by pages
                $scope.groupToPages();
            };

            // calculate page in place
            $scope.groupToPages = function () {
            $scope.pagedItems = [];

            for (var i = 0; i < $scope.filteredItems.length; i++) {
                if (i % $scope.itemsPerPage === 0) {
                    $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [ $scope.filteredItems[i] ];
                } else {
                    $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredItems[i]);
                }
            }
        };

        $scope.range = function (start, end) {
            var ret = [];
            if (!end) {
                end = start;
                start = 0;
            }
            for (var i = start; i < end; i++) {
                ret.push(i);
            }
            return ret;
        };

        $scope.prevPage = function () {
            if ($scope.currentPage > 0) {
                $scope.currentPage--;
            }
        };

        $scope.nextPage = function () {
            if ($scope.currentPage < $scope.pagedItems.length - 1) {
                $scope.currentPage++;
            }
        };

        $scope.setPage = function () {
            $scope.currentPage = this.n;
        };

        // functions have been describe process the data for display
        $scope.search();

        // change sorting order
        $scope.sort_by = function(newSortingOrder) {
            if ($scope.sortingOrder == newSortingOrder)
                $scope.reverse = !$scope.reverse;

            $scope.sortingOrder = newSortingOrder;

            // icon setup
            $('th i').each(function(){
                // icon reset
                $(this).removeClass().addClass('icon-sort');
            });
            if ($scope.reverse)
                $('th.'+new_sorting_order+' i').removeClass().addClass('icon-chevron-up');
            else
                $('th.'+new_sorting_order+' i').removeClass().addClass('icon-chevron-down');
        };
        },
        templateUrl: 'my-customer.html'
    };
});

