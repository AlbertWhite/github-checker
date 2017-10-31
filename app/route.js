(function() {

  angular
    .module("appModule")
    .config(routerConfig);

   routerConfig.$inject = [
      '$stateProvider',
      '$urlRouterProvider'
   ];

  function routerConfig($stateProvider, $urlRouterProvider) {

    var stateIndex = {
      name: "index",
      url: "/index",
      templateUrl: "./app/components/main/main.html",
      controller: "AppModuleController",
      controllerAs: "app"
    };

    $stateProvider.state(stateIndex);

    $urlRouterProvider.otherwise('/index'); //redirect to /index if the state is not defined
  }

})();
