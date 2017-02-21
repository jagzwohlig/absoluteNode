angular.module('rolesController', ['templateservicemod', 'navigationservice', 'assignmenttemplate', 'ui.bootstrap', 'ui.select', 'ngAnimate', 'toastr', 'ngSanitize', 'angular-flexslider', 'ui.tinymce', 'imageupload', 'ngMap', 'toggle-switch', 'cfp.hotkeys', 'ui.sortable', 'infinite-scroll', 'dragularModule'])

    .controller('RolesCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, base64) {
        //Used to name the .html file
        $scope.Arr = [];
        $scope.template = TemplateService.changecontent("dashboard");
        $scope.menutitle = NavigationService.makeactive("Dashboard");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        // NavigationService.getDashboardCount(function(data){
        //     console.log("Dashboard",data);
        //     $scope.Arr=data.data;
        // })
        NavigationService.getDashboardCounts(function (data) {
            // console.log("Dashboard",data);
            $scope.Arr = data.data;
        });
        $scope.colors = ["red", "pink", "sky", "purple", "red", "pink", "sky", "purple"];

    });