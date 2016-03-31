app.controller('ContactController', function ($scope, $http) {

    var source = new EventSource("http://localhost:8080");

    $scope.products = [
        {productID: 'Laurent', name: 'Renard', price: new Date('1987-05-21'), productURL: 102, imageURL: 'whatever@gmail.com'},
        {productID: 'Blandine', name: 'Faivre', price: new Date('1987-04-25'), productURL: -2323.22, imageURL: 'oufblandou@gmail.com'},
        {productID: 'Francoise', name: 'Frere', price: new Date('1955-08-27'), productURL: 42343, imageURL: 'raymondef@gmail.com'}
    ];

    source.addEventListener("xmlparser", function(e) {
        obj = JSON.parse(e.data);
        alert('hello');
        var myEl = angular.element( document.querySelector( '#products' ) );
        myEl.append('<tr><td>'+obj.productID[0]+'</td><td>'+obj.name[0]+'</td><td>'+obj.price[0]+'</td><td>'+obj.productURL[0]+'</td><td>'+obj.imageURL[0]+'</td><td>'+obj.description[0]+'</td><td>'+obj.categories[0]+'</td><td>'+obj.additional[0]+'</td></tr>');



        //updatePrice(e.data);
        //logMessage(e);
    }, false);

    $scope.result = 'hidden'
    $scope.resultMessage;
    $scope.formData; //formData is an object holding the name, email, subject, and message
    $scope.submitButtonDisabled = false;
    $scope.submitted = false; //used so that form errors are shown only after the form has been submitted
    $scope.submit = function(contactform) {
        $scope.submitted = true;
        $scope.submitButtonDisabled = true;
        if (contactform.$valid) {
            $http({
                method  : 'POST',
                url     : 'contact-form.php',
                data    : $.param($scope.formData),  //param method from jQuery
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  //set the headers so angular passing info as form data (not request payload)
            }).success(function(data){
                console.log(data);
                if (data.success) { //success comes from the return json object
                    $scope.submitButtonDisabled = true;
                    $scope.resultMessage = data.message;
                    $scope.result='bg-success';
                } else {
                    $scope.submitButtonDisabled = false;
                    $scope.resultMessage = data.message;
                    $scope.result='bg-danger';
                }
            });
        } else {
            $scope.submitButtonDisabled = false;
            $scope.resultMessage = 'Failed :( Please fill out all the fields.';
            $scope.result='bg-danger';
        }
    }
});
