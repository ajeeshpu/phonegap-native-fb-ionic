angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, $ionicModal, $state) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });


  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
      facebookConnectPlugin.getAccessToken(function(result){
          $state.go('app.me')
      },function(){
          facebookConnectPlugin.login(["email"], function(response) {

              if (response.authResponse) {
                  facebookConnectPlugin.getAccessToken(function(result){
                      $state.go('app.me')
                  })
              } else {
                  facebookConnectPlugin.showDialog(["email"],function(response){
                  })
              }
          },function(response){
              $state.go('app.login')

          });
      })
  };
})

.controller('MeCtrl', function($scope,$ionicLoading) {
        $ionicLoading.show({
            template: 'Loading...'
        });
        $scope.fbProfile = {}
        facebookConnectPlugin.api('/me', undefined, function (result) {
            $scope.$apply(function(){
                $ionicLoading.hide();
                $scope.fbProfile = result;
            })
        }, function (response) {
            alert('Error->' + JSON.stringify(response))

        })

})

