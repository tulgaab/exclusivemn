var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = decodeURIComponent(window.location.search.substring(1)),
    sURLVariables = sPageURL.split('&'),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : sParameterName[1];
    }
  }
};

var App = angular.module('exclusivemn', [
      'firebase',
      'ngSanitize',
]);

App.config(function () {
  'use strict';
  var config = {
    apiKey: "AIzaSyDhx9IZsBNTLvival_UsZYRITq5Qx0I6ew",
    authDomain: "exclusive-7e764.firebaseapp.com",
    databaseURL: "https://exclusive-7e764.firebaseio.com",
    storageBucket: "exclusive-7e764.appspot.com",
    messagingSenderId: "445846977354"
  };
  firebase.initializeApp(config);

});

App.controller('ExclusiveController', ExclusiveController);

function ExclusiveController($scope, $firebaseObject, $firebaseArray) {
  'use strict';

  $scope.subDomain = "/exclusivemn";
  
  $scope.getPostsLast = function(){
    var messagesRef = firebase.database().ref().child("posts").limitToFirst(5);
    $scope.lastposts = $firebaseArray(messagesRef);
  }

  $scope.getPosts = function(){
    var messagesRef = firebase.database().ref().child("posts");
    $scope.posts = $firebaseArray(messagesRef);
  }

  $scope.getPostDetail = function(){
    var id = getUrlParameter("id");
    if (id != null && id != undefined){
      var messagesRef = firebase.database().ref().child("posts").child(id);
      $scope.post = $firebaseObject(messagesRef);
      $scope.post.$watch(function(e) {
        if ($scope.post != null && $scope.post != undefined){
          document.title = $scope.post.title + " - " + document.title;
        }
      });
      
    }
    else{
      $scope.post = {};
    }
  }

};