angular.module('starter', ['ionic', 'ngCordova', 'ImgCache'])

  .config(function (ImgCacheProvider) {

    ImgCacheProvider.setOptions({
      debug: true,    // you can set this to false for a production app
      chromeQuota: 25 * 1024 * 1024,          /* allocated cache space : here 25MB instead of the default 10MB */
      usePersistentCache: true
    });

    // ImgCache library is initialized automatically, but set this option if you are using platform like Ionic -
    // in this case we need init imgcache.js manually after device is ready
    ImgCacheProvider.manualInit = true;
  })

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {

       ImgCache.$init();

      if (window.cordova && window.cordova.plugins.Keyboard) {

        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })
