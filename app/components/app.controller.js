(function (){

  angular
    .module('appModule')
    .controller("AppModuleController", AppModuleController);

  AppModuleController.$inject = [
    "AppService"
  ];

  function AppModuleController(AppService){
    var vm = this;
    vm.results = []; //get result from resource
    vm.repos = []; //store the parsed results
    vm.reposelected = []; //store the selected repos

    vm.selectedTime = "";
    vm.languages = [];//only store the language
    vm.languageList = [];//store the language with its status

    //only for test
    vm.keywords = "ruanyf"

    vm.checkGitPros = function(){
      AppService.getRepo(vm.keywords).then(function(result){
        vm.results = result;
        parseResults();
      });
    }

    vm.changeTime = function(){
      vm.reposelected = vm.repos.filter(function(repo){
        return new Date(repo.created_at) > vm.selectedTime
      });
    }

    vm.changeLanguage = function(){
      vm.reposelected = vm.repos.filter(function(repo){
        var language = repo.language;
        var selected = false;
        vm.languages.map(function(item){
          if(item.language == language){
            selected = item.selected;
          }
        });
        return selected;
      });
    }


    function parseResults(){
      vm.repos = [];
      vm.results.map(function(repo){

        var obj = {
          name: repo.name,
          url: repo.html_url,
          description: repo.description,
          fork: repo.forks,
          watcher: repo.watchers,
          language: repo.language,
          created_at: repo.created_at,
          updated_at: repo.updated_at
        };
        vm.repos.push(obj);
        vm.reposelected.push(obj);

        if(vm.languageList.indexOf(obj.language) == -1 && obj.language){
          vm.languages.push({"language":obj.language, "selected":true});
          vm.languageList.push(obj.language);
        }

      });
    }

  }


})();
