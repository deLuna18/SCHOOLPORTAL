var app = angular.module("myapp", ["ngRoute"]);

app.controller("logoutController", function($rootScope, $location) {
    $rootScope.logout = function() {
        localStorage.removeItem('user'); 
        $rootScope.logged = false;
        $location.path("/"); 
    };
});

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


//LOGIN CONTROLLER
app.controller("loginController", function($scope, $rootScope, $location, $http) {
    $scope.login = function() {
        var email = $scope.email;
        var password = $scope.password;
        
        // Send POST request to backend for user login
        $http.post("/api/users/login", { email: email, password: password })
            .then(function(response) {
                // Login successful
                $rootScope.logged = true;
                $rootScope.message = "Login successful!";
                $location.path("/student"); 
                
            })
            .catch(function(error) {
                // Login failed
                console.log("Error:", error);
                $rootScope.logged = false;
                $rootScope.message = "Invalid Credentials. Please try again!";
            });
    };
});

/*app.controller("loginController", function($scope, $rootScope, $location, $http) {
    $scope.login = function() {
        var email = $scope.email;
        var password = $scope.password;
        $http.post("/login", { username: email, password: password })
            .then(function(response) {
                $rootScope.logged = true;
                $rootScope.message = "Login successful!";
                
                // Store user login information in local storage
                localStorage.setItem('user', JSON.stringify({ email: email, password: password }));
                
                $location.path("/student"); 
                
            })
            .catch(function(error) {
                console.log("Error:", error);
                $rootScope.logged = false;
                $rootScope.message = "Invalid Credentials. Please try again!";
            });
    };
});*/


// STYLE CONTROLLER - SPECIFIC FOR THE HEADER, MENU, CONTENTS
app.controller("Style", function($scope,  $location) {
    $scope.isNavOpen = false;
    $scope.sidenavStyle = { width: "0" };
    $scope.mainStyle = { marginLeft: "0" };
    $scope.contentTemplate = 'student.html'; 

    // FUNCTION FOR CLOSE AND OPEN HAMBURBER MENU
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

        var content = document.querySelector('.container');
        if (content) {
            content.style.marginLeft = "114px";
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

        var content = document.querySelector('.container');
        if (content) {
            content.style.marginLeft = "11%"; 
        }
    };
});

// DO NOT REMOVE THIS 
// IF REMOVED, HAMBURGER MENU WON'T WORK
// STUDENT CONTROLLER
app.controller("studentController", function($scope, $http) {
    $http.get("/api/students")
        .then(function(response) {
            $scope.students = response.data;
        })
        .catch(function(error) {
            console.error("Error fetching student data:", error);
        });
});



// SUBJECT CONTROLLER
app.controller("subjectController", function($scope, $http) {
    // Fetch subjects data from backend API
    $http.get("/api/subjects")
        .then(function(response) {
            // Assign the fetched data to the scope variable
            $scope.subjects = response.data;
        })
        .catch(function(error) {
            console.error("Error fetching subjects data:", error);
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