var app = angular.module("myapp", ["ngRoute"]);

// LOGIN, MAIN, STUDENT, SUBJECT, ENROLLMENT, REPORT
app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: 'login.html',
            controller: 'loginController'
        })
        .when("/student", {
            templateUrl: 'student.html',
            controller: 'studentController'
        })
        .when("/subject", {
            templateUrl: 'subject.html',
            controller: 'subjectController'
        })
        .when("/enrollment", {
            templateUrl: 'enrollment.html',
            controller: 'enrollmentController'
        })
        .when("/report", {
            templateUrl: 'report.html',
            controller: 'reportController'
        })
        .otherwise({ redirectTo: '/' });
});

// LOGIN CONTROLLER
app.controller("loginController", function($scope, $rootScope, $location, $http) {
    $scope.login = function() {
        var email = $scope.email;
        var password = $scope.password;
        $http.post("/login", { username: email, password: password })
            .then(function(response) {
                $rootScope.message = "Login successful!";
                $location.path("/student"); 
            })
            .catch(function(error) {
                console.log("Error:", error);
                $rootScope.logged = false;
                $rootScope.message = "Invalid Credentials. Please try again!";
            });
    };
});

// MAIN CONTROLLER
app.controller("mainController", function($scope, $http, $templateCache) {
    $http.get('student.html', {cache: $templateCache}).then(function(response) {
        $scope.studentContent = response.data;
    });
    
});

// STYLE CONTROLLER - SPECIFIC FOR THE HEADER, MENU, CONTENTS
app.controller("Style", function($scope, $location) {
    $scope.isNavOpen = false;
    $scope.sidenavStyle = { width: "0" };
    $scope.mainStyle = { marginLeft: "0" };
    $scope.contentTemplate = 'student.html'; 

    // FUNCTION FOR CLOSE AND OPEN HAMBURGER MENU
    $scope.toggleNav = function() {
        console.log("Toggling navigation menu...")
        if ($scope.isNavOpen) {
            $scope.closeNav();
        } else {
            $scope.openNav();
        }
    };

    // IF USER CLICK THE HAMBURGER MENU
    $scope.openNav = function() {
        $scope.sidenavStyle.width = "215px";
        $scope.mainStyle.marginLeft = "215px";
        $scope.mainWidth = { width: "100%" };
        $scope.studentPosition = { marginLeft: "215px" }; 
        document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
        $scope.isNavOpen = true;

        var container = document.querySelector('.container');
        if (container) {
            content.style.marginLeft = "200px";
        }
    };

    // IF USER CLOSE THE HAMBURGER MENU
    $scope.closeNav = function() {
        $scope.sidenavStyle.width = "0";
        $scope.mainStyle.marginLeft = "0";
        document.body.style.backgroundColor = "white";
        $scope.mainWidth = { width: "100%" };
        $scope.studentPosition = { marginLeft: "0" };
        $scope.isNavOpen = false;

        var container = document.querySelector('.container');
        if (container) {
            container.style.marginLeft = "11%"; 
        }
    };
});

// STUDENT CONTROLLER
app.controller("studentController", function($scope, $http, $templateCache) {
    $http.get('student.html', {cache: $templateCache}).then(function(response) {
        $scope.subjectContent = response.data;
    });
});

// SUBJECT CONTROLLER
app.controller("subjectController", function($scope, $http, $templateCache) {
    $http.get('subject.html', {cache: $templateCache}).then(function(response) {
        $scope.subjectContent = response.data;
    });

});

// ENROLLMENT CONTROLLER
app.controller("enrollmentController", function($scope, $http, $templateCache) {
    $http.get('enrollment.html', {cache: $templateCache}).then(function(response) {
        $scope.enrollmentContent = response.data;
    });
});

// REPORT CONTROLLER
app.controller("reportController", function($scope, $http, $templateCache) {
    $http.get('report.html', {cache: $templateCache}).then(function(response) {
        $scope.reportContent = response.data;
    });
});
