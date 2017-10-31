(function() {

  angular
  .module("appModule")
  .factory("AppService", AppService)
  .factory("AppResource", AppResource);

  AppResource.$inject = [
  "$resource"
  ];

  AppService.$inject = [
  "AppResource"
  ];

  function AppService(AppResource){

    var s = this;

    var service = {
      getRepo: getRepo
    };

    var getRepoPromise = null;

    //use resource
    function getRepo(id){

      if(!getRepoPromise){
        getRepoPromise = AppResource.getRepo({id: id}).$promise.then(function(results){
          getRepoPromise = null;
          return results;
        });
      }
      return getRepoPromise;

    }

    return service;

  }

  //create resource for managing restful api
  function AppResource($resource){

    return $resource("https://api.github.com/users/:id/repos", {id:'@id'},
    {
      'getRepo':{
        method: 'GET',
        isArray: true
      }
    });

  }

})();
