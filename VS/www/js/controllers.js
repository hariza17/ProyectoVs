angular.module('app.controllers', ['ngCordova'])

.controller('buscarCtrl', function ($scope) {

})

.controller('favoritosCtrl', function ($scope, $http) {
   $scope.buscar=function(){
      
      var serveImg = "http://www.grandesmensagens.com.br/wp-content/uploads/2010/06/9112mar.jpg"
      $scope.imgO=serveImg;
         var req = {
            method: 'GET',
            url: 'http://api.imagga.com/v1/tagging?url=' + serveImg + '&version=2',
            headers: {
               "authorization": "Basic YWNjX2FkMDg3MzBkMzU4ZmI5MTphNTgxNDdiN2ViZmU3NTk0NjMzYWU4ZTEzNWNhMTU2Mg==",
               "accept": "application/json"
            }

         }

         $http(req).then(function (data) {
            console.log(data.data.results[0]);
            $scope.confi = data.data.results[0].tags[0].confidence;
            $scope.tags=data.data.results[0].tags[0].tag;
            $scope.datos = data.data.results[0];
         }, function (data) {
            
            $scope.datos = data.data.results[0];
         });

   }
   
})

.controller('recientesCtrl', function ($scope) {

})

.controller('loginCtrl', function ($scope) {

})

.controller('peticiones', function ($scope, $http) {


})

.controller("ExampleController", function ($scope, $cordovaCamera, $http, $cordovaFile) {

   $scope.takePhoto = function () {
      var options = {
         quality: 75,
         destinationType: Camera.DestinationType.FILE_URI,
         sourceType: Camera.PictureSourceType.CAMERA,
         allowEdit: true,
         encodingType: Camera.EncodingType.JPEG,
         targetWidth: 300,
         targetHeight: 300,
         popoverOptions: CameraPopoverOptions,
         saveToPhotoAlbum: true
      };

      $cordovaCamera.getPicture(options).then(function (imageData) {
         $scope.imgURI = imageData;

         var currentName = imageData.replace(/^.*[\\\/]/, '');

         //Create a new name for the photo
         var d = new Date(),
            n = d.getTime(),
            newFileName = n + ".jpg";

         //Move the file to permanent storage
         $cordovaFile.moveFile(cordova.file.tempDirectory, currentName, cordova.file.dataDirectory, newFileName).then(function (success) {

            //success.nativeURL will contain the path to the photo in permanent storage, do whatever you wish with it, e.g:
            //createPhoto(success.nativeURL);
            console.log(cordova.file.dataDirectory);

         }, function (error) {
            //an error occured
         });

         var localImg = $scope.imgURI;
         
      }, function (err) {
         // An error occured. Show a message to the user
      });
   }

   $scope.choosePhoto = function () {
      var options = {
         quality: 75,
         destinationType: Camera.DestinationType.DATA_URL,
         sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
         allowEdit: true,
         encodingType: Camera.EncodingType.JPEG,
         targetWidth: 300,
         targetHeight: 300,
         popoverOptions: CameraPopoverOptions,
         saveToPhotoAlbum: false
      };

      $cordovaCamera.getPicture(options).then(function (imageData) {
         $scope.imgURI = "data:image/jpeg;base64," + imageData;
      }, function (err) {
         // An error occured. Show a message to the user
      });
   }


});