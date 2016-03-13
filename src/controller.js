app.controller("controller", ["$scope",  "getTweets", "getUserFollows", "getUser",
    function($scope, getTweets, getUserFollows, getUser) {

        var userGot;
        $scope.userFollowing = getUserFollows(/*Hace falta introducir un usuario existente para iniciar*/);
        $scope.tweetsArray = getTweets(/*Hace falta introducir un usuario existente para iniciar*/);
        console.log($scope.tweetsArray);

        //Añade una persona de follow al usuario
        $scope.onFollowClick = function()
        {
            $scope.userFollowing.$add({id: $scope.follow });
            $scope.follow="Follow success";
        };
        $scope.tweetMessage = function()
        {
            $scope.tweetsArray.$add({text: $scope.message});
            $scope.message="Tweet success";
        };
        $scope.onGetUser = function()
        {
            userGot = getUser;
            if (userGot == null)
            {
                console.log("This user does not exist");
            }
            else {
                $scope.user = "Login success";
            }
        };
    }
]);


//Función que cogerá los tweets de firebase mediante objetos.
app.factory("getTweets", ["$firebaseArray",
    function($firebaseArray) {
        return function (user) {
            var ref = new Firebase("https://ecaibtweet.firebaseio.com/users");
            return $firebaseArray(ref.child(user).child("tweets"));
        };
    }
]);

//Función que cogerá los following del usuario
app.factory("getUserFollows", ["$firebaseArray",
    function($firebaseArray) {
        return function(user) {
            var ref = new Firebase("https://ecaibtweet.firebaseio.com/users");
            return $firebaseArray(ref.child(user).child("following"));
        }
    }
]);


//Función que nos busca el usuario
app.factory("getUser", ["$firebaseObject",
    function($firebaseObject) {
        return function(user) {
            var ref = new Firebase("https://ecaibtweet.firebaseio.com/users");
            return $firebaseObject(ref.child(user));
        };
    }
]);