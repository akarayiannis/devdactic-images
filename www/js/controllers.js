angular.module('starter')

    // .config(['$compileProvider', function ($compileProvider) {
    //     $compileProvider.imgSrcSanitizationWhitelist(/^\s(https|file|blob|cdvfile|content):|data:image\//);
    // }
    // ])

    .controller('ImageController', function ($scope, $cordovaDevice, $cordovaFile,
        $ionicPlatform, $ionicActionSheet, ImageService, FileService) {

        $ionicPlatform.ready(function () {
            $scope.images = FileService.images();
            console.log('$scope.images ' + $scope.images);
            $scope.$apply();
        });

        $scope.urlForImage = function (imageName) {
            console.log('urlForImage() method was called');

            // var dataDirectory = cordova.file.dataDirectory;
            // var path = dataDirectory.substring(12, dataDirectory.lastIndexOf('/') + 1);
            // var trueOrigin = path + imageName;

            var trueOrigin = cordova.file.dataDirectory + imageName;
            console.log('value of trueOrigin is: ' + trueOrigin);

            // window.plugins.Base64.endodeFile(trueOrigin, function (base64) {
            //     $scope.collectionImages = base64;
            // })

            console.log('urlForImage() method was finished');

            return trueOrigin;
        }

        $scope.addMedia = function () {
            console.log('addMedia() method in controller was called');
            $scope.hideSheet = $ionicActionSheet.show({
                buttons: [
                    { text: 'Take photo' },
                    { text: 'Photo from library' }
                ],
                titleText: 'Add images',
                cancelText: 'Cancel',
                buttonClicked: function (index) {
                    console.log('value of index is: ' + index);
                    $scope.addImage(index);
                }
            });
            console.log('addMedia() method in controller was finished');
        }

        $scope.addImage = function (type) {
            console.log('addImage() method in controller was called');
            $scope.hideSheet();
            ImageService.handleMediaDialog(type).then(function () {
                //$scope.$apply();
                $scope.images = FileService.images();
            });
            console.log('addImage() method in controller was finished');
        }
    });