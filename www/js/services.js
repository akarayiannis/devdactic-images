angular.module('starter')

    //FileService is used to store and retrieve the files we have taken or saved
    .factory('FileService', function () {
        var images;
        var IMAGE_STORAGE_KEY = 'images';

        function getImages() {
            console.log('getImages() method was called');
            var img = window.localStorage.getItem(IMAGE_STORAGE_KEY);
            if (img) {
                images = JSON.parse(img);
            } else {
                images = [];
            }
             console.log('getImages() method was finished');

            return images;
        };

        function addImage(img) {
            console.log('addImage() method was called');
            console.log(img);//aiR3s14.jpg
            images.push(img);
            window.localStorage.setItem(IMAGE_STORAGE_KEY, JSON.stringify(images));
            console.log(window.localStorage.getItem(IMAGE_STORAGE_KEY));//returns array: ["aiR3s14.jpg"]
        };
        console.log('addImage() method was finished');
        return {
            storeImage: addImage,
            images: getImages
        }
    })

    .factory('ImageService', function ($cordovaCamera, FileService, $q, $cordovaFile) {

        //Helper Function
        function makeid() {
            console.log('makeid() method was called');
            var text = '';
            var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

            for (var i = 0; i < 5; i++) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            console.log('makeid() method was finished');
            return text;
        };

        //Helper Function
        function optionsForType(type) {
            console.log('optionsForType() method was called');
            var source;
            switch (type) {
                case 0:
                    source = Camera.PictureSourceType.CAMERA;
                    break;
                case 1:
                    source = Camera.PictureSourceType.PHOTOLIBRARY;
                    break;
            }
            console.log('optionsForType() method was finished');
            return {
                destinationType: Camera.DestinationType.FILE_URI,
                sourceType: source,
                allowEdit: false,
                encodingType: Camera.EncodingType.JPEG,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false
            };

        }

        function saveMedia(type) {
            return $q(function (resolve, reject) {
                var options = optionsForType(type);

                // $cordovaCamera.getPicture(options).then(function (imageUrl) {
                //     console.log(imageUrl);
                //     var name = imageUrl.substr(imageUrl.lastIndexOf('/') + 1);
                //     console.log(name);
                //     var namePath = imageUrl.substr(0, imageUrl.lastIndexOf('/') + 1);
                //     console.log(namePath);
                //     var newName = makeid() + name;
                //     console.log('New name: ' + newName);
                //     $cordovaFile.copyFile(namePath, name, cordova.file.dataDirectory, newName)
                //         .then(function (info) {
                //             console.log('inside copyfile()');
                //             FileService.storeImage(newName);
                //             resolve();
                //         }, function (e) {
                //             reject();
                //         });
                // });

                $cordovaCamera.getPicture(options).then(function (imageUrl) {
                    console.log('getPicture() method was called');
                    console.log('imageUrl: ' + imageUrl);
                    //android only
                    window.FilePath.resolveNativePath(imageUrl, function (result) {
                        console.log('result returned from resolveNativePath() method' + result);
                        var name = result.substr(result.lastIndexOf('/') + 1);
                        console.log('name: ' + name);
                        var namePath = result.substr(0, result.lastIndexOf('/') + 1);//'file://' + result.substr(0, result.lastIndexOf('/') + 1);
                        console.log('namePath: ' + namePath);
                        var newName = makeid() + name;
                        console.log('New name: ' + newName);
                        $cordovaFile.copyFile(namePath, name, cordova.file.dataDirectory, newName)
                            .then(function (info) {
                                console.log('inside copyfile()');
                                FileService.storeImage(newName);
                                resolve();
                            }, function (e) {
                                console.log('Start:Rejection in copyFile() method was called');
                                console.log(e);
                                reject();
                                console.log('Finish:Rejection in copyFile() method was called');
                            });
                    }, function (error) {
                        console.log(error);
                    })

                });

                console.log('getPicture() method was finished');
            })
        }

        return {
            handleMediaDialog: saveMedia
        }
    });