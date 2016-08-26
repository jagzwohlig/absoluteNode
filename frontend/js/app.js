// JavaScript Document
var firstapp = angular.module('firstapp', [
  'ui.router',
  'phonecatControllers',
  'templateservicemod',
  'navigationservice',
  'pascalprecht.translate',
  'angulartics',
  'angulartics.google.analytics',
  'imageupload',
  "ngMap"

]);

firstapp.config(function($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
  // for http request with session
  $httpProvider.defaults.withCredentials = true;
  $stateProvider
    .state('dashboard', {
      url: "/dashboard",
      templateUrl: "views/template.html",
      controller: 'DashboardCtrl'
    })

  .state('login', {
    url: "/login",
    templateUrl: "views/template.html",
    controller: 'LoginCtrl'
  })

  .state('branch-list', {
    url: "/branch-list/{page:.*}/{keyword:.*}",
    templateUrl: "views/template.html",
    controller: 'BranchListCtrl',
    params: {
      page: "1",
      keyword: ""
    }
  })

  .state('branch-create', {
    url: "/branch-create",
    templateUrl: "views/template.html",
    controller: 'BranchCreateCtrl'
  })

  .state('branch-edit', {
    url: "/branch-edit/:id",
    templateUrl: "views/template.html",
    controller: 'BranchEditCtrl'
  })

  .state('country-list', {
    url: "/country-list/{page:.*}/{keyword:.*}",
    templateUrl: "views/template.html",
    controller: 'CountryCtrl',
    params: {
      page: "1",
      keyword: ""
    }
  })



  .state('createcountry', {
    url: "/country-create",
    templateUrl: "views/template.html",
    controller: 'CreateCountryCtrl'
  })

  .state('editcountry', {
    url: "/country-edit/:id",
    templateUrl: "views/template.html",
    controller: 'EditCountryCtrl'
  })

  .state('zone-list', {
    url: "/zone-list/{page:.*}/{keyword:.*}",
    templateUrl: "views/template.html",
    controller: 'ZoneCtrl',
    params: {
      page: "1",
      keyword: ""
    }
  })

  .state('createzone', {
    url: "/zone-create",
    templateUrl: "views/template.html",
    controller: 'CreateZoneCtrl'
  })

  .state('editzone', {
    url: "/zone-edit/:id",
    templateUrl: "views/template.html",
    controller: 'EditZoneCtrl'
  })

  .state('state-list', {
    url: "/state-list/{page:.*}/{keyword:.*}",
    templateUrl: "views/template.html",
    controller: 'StateCtrl',
    params: {
      page: "1",
      keyword: ""
    }
  })

  .state('createstate', {
    url: "/state-create",
    templateUrl: "views/template.html",
    controller: 'CreateStateCtrl'
  })

  .state('editstate', {
    url: "/state-edit/:id",
    templateUrl: "views/template.html",
    controller: 'EditStateCtrl'
  })

  .state('district-list', {
    url: "/district-list/{page:.*}/{keyword:.*}",
    templateUrl: "views/template.html",
    controller: 'DistrictCtrl',
    params: {
      page: "1",
      keyword: ""
    }
  })

  .state('createdistrict', {
    url: "/district-create",
    templateUrl: "views/template.html",
    controller: 'CreateDistrictCtrl'
  })

  .state('editdistrict', {
    url: "/district-edit/:id",
    templateUrl: "views/template.html",
    controller: 'EditDistrictCtrl'
  })

  .state('currency-list', {
    url: "/currency-list/{page:.*}/{keyword:.*}",
    templateUrl: "views/template.html",
    controller: 'CurrencyCtrl',
    params: {
      page: "1",
      keyword: ""
    }
  })

  .state('createcurrency', {
    url: "/currency-create",
    templateUrl: "views/template.html",
    controller: 'CreateCurrencyCtrl'
  })

  .state('editcurrency', {
    url: "/currency-edit/:id",
    templateUrl: "views/template.html",
    controller: 'EditCurrencyCtrl'
  })

  .state('city-list', {
    url: "/city-list/{page:.*}/{keyword:.*}",
    templateUrl: "views/template.html",
    controller: 'CityCtrl',
    params: {
      page: "1",
      keyword: ""
    }
  })

  .state('createcity', {
    url: "/city-create",
    templateUrl: "views/template.html",
    controller: 'CreateCityCtrl'
  })

  .state('editcity', {
    url: "/city-edit/:id",
    templateUrl: "views/template.html",
    controller: 'EditCityCtrl'
  })

  .state('office-list', {
    url: "/office-list/{page:.*}/{keyword:.*}",
    templateUrl: "views/template.html",
    controller: 'OfficeCtrl',
    params: {
      page: "1",
      keyword: ""
    }
  })


  .state('createoffice', {
    url: "/office-create",
    templateUrl: "views/template.html",
    controller: 'CreateOfficeCtrl'
  })

  .state('editoffice', {
    url: "/office-edit/:id",
    templateUrl: "views/template.html",
    controller: 'EditOfficeCtrl'
  })

  .state('typeOfOffice-list', {
    url: "/typeOfOffice-list/{page:.*}/{keyword:.*}",
    templateUrl: "views/template.html",
    controller: 'TypeOfOfficeCtrl',
    params: {
      page: "1",
      keyword: ""
    }
  })

  .state('createtypeOfOffice', {
    url: "/typeOfOffice-create",
    templateUrl: "views/template.html",
    controller: 'CreateTypeOfOfficeCtrl'
  })

  .state('edittypeOfOffice', {
      url: "/typeOfOffice-edit/:id",
      templateUrl: "views/template.html",
      controller: 'EditTypeOfOfficeCtrl'
    })
    .state('activityType-list', {
      url: "/activityType-list/{page:.*}/{keyword:.*}",
      templateUrl: "views/template.html",
      controller: 'ActivityTypeCtrl',
      params: {
        page: "1",
        keyword: ""
      }
    })

  .state('createactivityType', {
    url: "/activityType-create",
    templateUrl: "views/template.html",
    controller: 'CreateActivityTypeCtrl'
  })

  .state('editactivityType', {
    url: "/activityType-edit/:id",
    templateUrl: "views/template.html",
    controller: 'EditActivityTypeCtrl'
  })

  .state('expense-list', {
    url: "/expense-list/{page:.*}/{keyword:.*}",
    templateUrl: "views/template.html",
    controller: 'ExpenseCtrl',
    params: {
      page: "1",
      keyword: ""
    }
  })

  .state('createexpense', {
    url: "/expense-create",
    templateUrl: "views/template.html",
    controller: 'CreateExpenseCtrl'
  })

  .state('editexpense', {
    url: "/expense-edit/:id",
    templateUrl: "views/template.html",
    controller: 'EditExpenseCtrl'
  })

  .state('department-list', {
    url: "/department-list/{page:.*}/{keyword:.*}/{model:.*}",
    templateUrl: "views/template.html",
    controller: 'ModelViewCtrl',
    params: {
      page: "1",
      keyword: "",
      model:"department"
    }
  })


  .state('createdepartment', {
    url: "/department-create/{id:.*}/{model:.*}",
    templateUrl: "views/template.html",
    controller: 'CreateModelCtrl',
    params: {
      id: "",
      model: "department"
    }
  })

  .state('editdepartment', {
    url: "/department-edit/{id:.*}/{model:.*}",
    templateUrl: "views/template.html",
    controller: 'EditModelCtrl',
    params: {
      id: "",
      model: "department"
    }
  })


  .state('uniquetype-list', {
    url: "/uniquetype-list/{page:.*}/{keyword:.*}",
    templateUrl: "views/template.html",
    controller: 'UniqueTypetCtrl',
    params: {
      page: "1",
      keyword: ""
    }
  })


  .state('createuniquetype', {
    url: "/uniquetype-create",
    templateUrl: "views/template.html",
    controller: 'CreateUniqueTypeCtrl'
  })

  .state('edituniquetype', {
    url: "/uniquetype-edit/:id",
    templateUrl: "views/template.html",
    controller: 'EditUniqueTypeCtrl'
  })

  .state('policyname-list', {
    url: "/policyname-list/{page:.*}/{keyword:.*}",
    templateUrl: "views/template.html",
    controller: 'PolicyTypeCtrl',
    params: {
      page: "1",
      keyword: ""
    }
  })

  .state('createpolicyname', {
    url: "/policyname-create",
    templateUrl: "views/template.html",
    controller: 'CreatePolicyTypeCtrl'
  })

  .state('editpolicyname', {
    url: "/policyname-edit/:id",
    templateUrl: "views/template.html",
    controller: 'EditPolicyTypeCtrl'
  })

  .state('policy-list', {
    url: "/policy-list/{page:.*}/{keyword:.*}",
    templateUrl: "views/template.html",
    controller: 'PolicyCtrl',
    params: {
      page: "1",
      keyword: ""
    }
  })

  .state('createpolicy', {
    url: "/policy-create",
    templateUrl: "views/template.html",
    controller: 'CreatePolicyCtrl'
  })

  .state('editpolicy', {
    url: "/policy-edit/:id",
    templateUrl: "views/template.html",
    controller: 'EditPolicyCtrl'
  })

  .state('policydoc-list', {
    url: "/policydoc-list/{page:.*}/{keyword:.*}",
    templateUrl: "views/template.html",
    controller: 'PolicyDocCtrl',
    params: {
      page: "1",
      keyword: ""
    }
  })

  .state('createpolicydoc', {
    url: "/policydoc-create",
    templateUrl: "views/template.html",
    controller: 'CreatePolicyDocCtrl'
  })

  .state('editpolicydoc', {
    url: "/policydoc-edit/:id",
    templateUrl: "views/template.html",
    controller: 'EditPolicyDocCtrl'
  })

  .state('industry-list', {
    url: "/industry-list/{page:.*}/{keyword:.*}",
    templateUrl: "views/template.html",
    controller: 'IndustryCtrl',
    params: {
      page: "1",
      keyword: ""
    }
  })

  .state('createindustry', {
    url: "/industry-create",
    templateUrl: "views/template.html",
    controller: 'CreateIndustryCtrl'
  })

  .state('editindustry', {
    url: "/industry-edit/:id",
    templateUrl: "views/template.html",
    controller: 'EditIndustryCtrl'
  })

  .state('category-list', {
    url: "/category-list/{page:.*}/{keyword:.*}",
    templateUrl: "views/template.html",
    controller: 'CategoryCtrl',
    params: {
      page: "1",
      keyword: ""
    }
  })

  .state('createcategory', {
    url: "/category-create",
    templateUrl: "views/template.html",
    controller: 'CreateCategoryCtrl'
  })

  .state('editcategory', {
    url: "/category-edit/:id",
    templateUrl: "views/template.html",
    controller: 'EditCategoryCtrl'
  })

  .state('func-list', {
    url: "/func-list/{page:.*}/{keyword:.*}/{model:.*}",
    templateUrl: "views/template.html",
    controller: 'ModelViewCtrl',
    params: {
      page: "1",
      keyword: "",
      model: "func"
    }
  })

  .state('createfunc', {
    url: "/func-create/{id:.*}/{model:.*}",
    templateUrl: "views/template.html",
    controller: 'CreateModelCtrl',
    params: {
      id: "",
      model: "func"
    }
  })

  .state('editfunc', {
    url: "/func-edit/{id:.*}/{model:.*}",
    templateUrl: "views/template.html",
    controller: 'EditModelCtrl',
    params: {
      id: "",
      model: "func"
    }
  })

  .state('causeloss-list', {
    url: "/causeloss-list/{page:.*}/{keyword:.*}",
    templateUrl: "views/template.html",
    controller: 'CauseLossCtrl',
    params: {
      page: "1",
      keyword: ""
    }
  })

  .state('createcauseloss', {
    url: "/causeloss-create",
    templateUrl: "views/template.html",
    controller: 'CreateCauseLossCtrl'
  })

  .state('editcauseloss', {
    url: "/causeloss-edit/:id",
    templateUrl: "views/template.html",
    controller: 'EditCauseLossCtrl'
  })

  .state('natureloss-list', {
    url: "/natureloss-list/{page:.*}/{keyword:.*}",
    templateUrl: "views/template.html",
    controller: 'NatureLossCtrl',
    params: {
      page: "1",
      keyword: ""
    }
  })

  .state('createnatureloss', {
    url: "/natureloss-create",
    templateUrl: "views/template.html",
    controller: 'CreateNatureLossCtrl'
  })

  .state('editnatureloss', {
    url: "/natureloss-edit/:id",
    templateUrl: "views/template.html",
    controller: 'EditNatureLossCtrl'
  })

  .state('businessbranch-list', {
    url: "/businessbranch-list/{page:.*}/{keyword:.*}",
    templateUrl: "views/template.html",
    controller: 'BusinessBranchCtrl',
    params: {
      page: "1",
      keyword: ""
    }
  })

  .state('createbusinessbranch', {
    url: "/businessbranch-create",
    templateUrl: "views/template.html",
    controller: 'CreateBusinessBranchCtrl'
  })

  .state('editbusinessbranch', {
    url: "/businessbranch-edit/:id",
    templateUrl: "views/template.html",
    controller: 'EditBusinessBranchCtrl'
  })

  .state('menu-list', {
    url: "/menu-list/{page:.*}/{keyword:.*}",
    templateUrl: "views/template.html",
    controller: 'MenuCtrl',
    params: {
      page: "1",
      keyword: ""
    }
  })

  .state('createmenu', {
    url: "/menu-create",
    templateUrl: "views/template.html",
    controller: 'CreateMenuCtrl'
  })

  .state('editmenu', {
    url: "/menu-edit/:id",
    templateUrl: "views/template.html",
    controller: 'EditMenuCtrl'
  })

  .state('role-list', {
    url: "/role-list/{page:.*}/{keyword:.*}",
    templateUrl: "views/template.html",
    controller: 'RoleCtrl',
    params: {
      page: "1",
      keyword: ""
    }
  })

  .state('createrole', {
    url: "/role-create",
    templateUrl: "views/template.html",
    controller: 'CreateRoleCtrl'
  })

  .state('editrole', {
    url: "/role-edit/:id",
    templateUrl: "views/template.html",
    controller: 'EditRoleCtrl'
  })

  .state('user-list', {
    url: "/user-list/{page:.*}/{keyword:.*}",
    templateUrl: "views/template.html",
    controller: 'UserCtrl',
    params: {
      page: "1",
      keyword: ""
    }
  })

  .state('createuser', {
    url: "/user-create",
    templateUrl: "views/template.html",
    controller: 'CreateUserCtrl'
  })

  .state('edituser', {
    url: "/user-edit/:id",
    templateUrl: "views/template.html",
    controller: 'EditUserCtrl'
  })

  .state('employee-list', {
    url: "/employee-list//{page:.*}/{keyword:.*}/{model:.*}",
    templateUrl: "views/template.html",
    controller: 'ModelViewCtrl',
    params: {
      page: "1",
      keyword: "",
      model: "employee"
    }
  })

  .state('createemployee', {
    url: "/employee-create/{id:.*}/{model:.*}",
    templateUrl: "views/template.html",
    controller: 'CreateModelCtrl',
    params: {
      id: "",
      model: "employee"
    }
  })

  .state('editemployee', {
    url: "/employee-edit/:id",
    templateUrl: "views/template.html",
    controller: 'EditModelCtrl',
    params: {
      id:"",
      model:"employee"
    }
  })

  .state('product-list', {
    url: "/product-list/{page:.*}/{keyword:.*}",
    templateUrl: "views/template.html",
    controller: 'ProductCtrl',
    params: {
      page: "1",
      keyword: ""
    }
  })

  .state('createproduct', {
    url: "/product-detail",
    templateUrl: "views/template.html",
    controller: 'CreateProductCtrl'
  })

  .state('editproduct', {
    url: "/product-edit/:id",
    templateUrl: "views/template.html",
    controller: 'EditProductCtrl'
  })

  .state('salvage-list', {
    url: "/salvage-list/{page:.*}/{keyword:.*}/{model:.*}",
    templateUrl: "views/template.html",
    controller: 'ModelViewCtrl',
    params: {
      page: "1",
      keyword: "",
      model: "salvage"
    }
  })

  .state('createsalvage', {
    url: "/salvage-detail/{id:.*}/{model:.*}",
    templateUrl: "views/template.html",
    controller: 'CreateModelCtrl',
    params: {
      id:"",
      model:"salvage"
    }
  })

  .state('editSalvage', {
    url: "/salvage-edit/{id:.*}/{model:.*}",
    templateUrl: "views/template.html",
    controller: 'EditModelCtrl',
    params: {
      id:"",
      model:"salvage"
    }
  })

  .state('bankmaster-list', {
    url: "/bankmaster-list/{page:.*}/{keyword:.*}",
    templateUrl: "views/template.html",
    controller: 'BankMasterCtrl',
    params: {
      page: "1",
      keyword: ""
    }
  })

  .state('createbankmaster', {
      url: "/bankmaster-detail",
      templateUrl: "views/template.html",
      controller: 'CreateBankmasterCtrl'
    })
    .state('editbankmaster', {
      url: "/bankmaster-detail/:id",
      templateUrl: "views/template.html",
      controller: 'EditBankmasterCtrl'
    })

  .state('company-list', {
    url: "/company-list/{page:.*}/{keyword:.*}",
    templateUrl: "views/template.html",
    controller: 'CompanyCtrl',
    params: {
      page: "1",
      keyword: ""
    }
  })

  .state('createcompany', {
    url: "/company-detail",
    templateUrl: "views/template.html",
    controller: 'CreateCompanyCtrl'
  })

  .state('editcompany', {
    url: "/company-detail/:id",
    templateUrl: "views/template.html",
    controller: 'EditCompanyCtrl'
  })

  .state('customer-list', {
    url: "/customer-list/{page:.*}/{keyword:.*}/{model:.*}",
    templateUrl: "views/template.html",
    controller: 'ModelViewCtrl',
    params: {
      page: "1",
      keyword: "",
      model: "customer"
    }
  })

  .state('createcustomer', {
      url: "/customer-detail/{id:.*}/{model:.*}",
      templateUrl: "views/template.html",
      controller: 'CreateCustomerCtrl',
      params: {
        id: "",
        model: "customer"
      }
    })

    .state('editcustomer', {
      url: "/customer-edit/{id:.*}/{model:.*}",
      templateUrl: "views/template.html",
      controller: 'EditModelCtrl',
      params: {
        id: "",
        model: "customer"
      }
    })

  .state('contactmanagement-list', {
    url: "/contactmanagement-list/{page:.*}/{keyword:.*}",
    templateUrl: "views/template.html",
    controller: 'ContactManagementCtrl',
    params: {
      page: "1",
      keyword: ""
    }
  })

  .state('createcontactmanagement', {
    url: "/contactmanagement-detail",
    templateUrl: "views/template.html",
    controller: 'CreateContactManagementCtrl'
  })

  .state('contacttype-list', {
    url: "/contacttype-list/{page:.*}/{keyword:.*}",
    templateUrl: "views/template.html",
    controller: 'ContactTypeCtrl',
    params: {
      page: "1",
      keyword: ""
    }
  })

  .state('createcontacttype', {
    url: "/contacttype-detail",
    templateUrl: "views/template.html",
    controller: 'CreateContactTypeCtrl'
  })

  .state('contacttypeoffice-list', {
    url: "/contacttypeoffice-list/{page:.*}/{keyword:.*}",
    templateUrl: "views/template.html",
    controller: 'ContactTypeOfficeCtrl',
    params: {
      page: "1",
      keyword: ""
    }
  })

  .state('createcontacttypeoffice', {
    url: "/contacttypeoffice-detail",
    templateUrl: "views/template.html",
    controller: 'CreateContactTypeOfficeCtrl'
  })

  .state('customersegment-list', {
    url: "/customersegment-list/{page:.*}/{keyword:.*}/{model:.*}",
    templateUrl: "views/template.html",
    controller: 'ModelViewCtrl',
    params: {
      page: "1",
      keyword: "",
      model: "customersegment"
    }
  })


  .state('createcustomersegment', {
    url: "/customersegment-create/{id:.*}/{model:.*}",
    templateUrl: "views/template.html",
    controller: 'CreateModelCtrl',
    params: {
      id: "",
      model: "customersegment"
    }
  })

  .state('editcustomersegment', {
    url: "/customersegment-edit/{id:.*}/{model:.*}",
    templateUrl: "views/template.html",
    controller: 'EditModelCtrl',
    params: {
      id: "",
      model: "customersegment"
    }
  })

  .state('customercompany-list', {
    url: "/customercompany-list/{page:.*}/{keyword:.*}/{model:.*}",
    templateUrl: "views/template.html",
    controller: 'ModelViewCtrl',
    params: {
      page: "1",
      keyword: "",
      model: "customercompany"
    }
  })

  .state('createcustomercompany', {
    url: "/customercompany-create/{id:.*}/{model:.*}",
    templateUrl: "views/template.html",
    controller: 'CreateModelCtrl',
    params: {
      id:"",
      model: "customercompany"
    }
  })

  .state('editcustomercompany', {
    url: "/customercompany-edit/{id:.*}/{model:.*}",
    templateUrl: "views/template.html",
    controller: 'EditModelCtrl',
    params: {
      id: "",
      model: "customercompany"
    }
  })

  .state('grade-list', {
    url: "/grade-list/:id/:keyword/:model",
    templateUrl: "views/template.html",
    controller: 'ModelViewCtrl',
    params: {
      page: "1",
      keyword: "",
      model: "grade"
    }
  })

  .state('creategrade', {
    url: "/grade-create/:id/:model",
    templateUrl: "views/template.html",
    controller: 'CreateModelCtrl',
    params: {
      id: "",
      model: "grade"
    }
  })

  .state('editgrade', {
    url: "/grade-edit/:id/:model",
    templateUrl: "views/template.html",
    controller: 'EditModelCtrl',
    params: {
      id: "",
      model: "grade"
    }
  })

  .state('surveycode-list', {
    url: "/surveycode-list/{page:.*}/{keyword:.*}/{model:.*}",
    templateUrl: "views/template.html",
    controller: 'ModelViewCtrl',
    params: {
      page:"1",
      keyword: "",
      model: "surveycode"
    }
  })

  .state('createsurveycode', {
    url: "/surveycode-create/{id:.*}/{model:.*}",
    templateUrl: "views/template.html",
    controller: 'CreateModelCtrl',
    params: {
      id:"",
      model: "surveycode"
    }
  })

  .state('editsurveycode', {
    url: "/surveycode-edit/{id:.*}/{model:.*}",
    templateUrl: "views/template.html",
    controller: 'EditModelCtrl',
    params: {
      id: "",
      model: "surveycode"
    }
  })

  .state('transferoffice-list', {
    url: "/transferoffice-list/{page:.*}/{keyword:.*}/{model:.*}",
    templateUrl: "views/template.html",
    controller: 'ModelViewCtrl',
    params: {
      page: "1",
      keyword: "",
      model: "transferoffice"
    }
  })

  .state('createtransferoffice', {
    url: "/transferoffice-create/{id:.*}/{model:.*}",
    templateUrl: "views/template.html",
    controller: 'CreateModelCtrl',
    params: {
      id: "",
      model: "transferoffice"
    }
  })

  .state('edittransferofficer', {
    url: "/transferOfficer-edit",
    templateUrl: "views/template.html",
    controller: 'EditTransferOfficerCtrl'
  })

  .state('timeline', {
    url: "/timeline",
    templateUrl: "views/template.html",
    controller: 'TimelineCtrl'
  });
  $urlRouterProvider.otherwise("/login");
  $locationProvider.html5Mode(isproduction);

});


firstapp.filter('uploadpath', function() {
  return function(input, width, height, style) {
    var other = "";
    if (width && width !== "") {
      other += "&width=" + width;
    }
    if (height && height !== "") {
      other += "&height=" + height;
    }
    if (style && style !== "") {
      other += "&style=" + style;
    }
    if (input) {
      if (input.indexOf('https://') == -1) {
        return imgpath + "?file=" + input + other;
      } else {
        return input;
      }
    }
  };
});
firstapp.directive('imageonload', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      element.bind('load', function() {
        scope.$apply(attrs.imageonload);
      });
    }
  };
});


firstapp.directive('uploadImage', function($http, $filter) {
  return {
    templateUrl: 'views/directive/uploadFile.html',
    scope: {
      model: '=ngModel',
      callback: "=ngCallback"
    },
    link: function($scope, element, attrs) {
      $scope.isMultiple = false;
      $scope.inObject = false;
      if (attrs.multiple || attrs.multiple === "") {
        $scope.isMultiple = true;
        $("#inputImage").attr("multiple", "ADD");
      }
      if (attrs.noView || attrs.noView === "") {
        $scope.noShow = true;
      }
      if ($scope.model) {
        if (_.isArray($scope.model)) {
          $scope.image = [];
          _.each($scope.model, function(n) {
            $scope.image.push({
              url: $filter("uploadpath")(n)
            });
          });
        }

      }
      if (attrs.inobj || attrs.inobj === "") {
        $scope.inObject = true;
      }
      $scope.clearOld = function() {
        $scope.model = [];
      };
      $scope.uploadNow = function(image) {
        var Template = this;
        image.hide = true;
        var formData = new FormData();
        formData.append('file', image.file, image.name);
        $http.post(uploadurl, formData, {
          headers: {
            'Content-Type': undefined
          },
          transformRequest: angular.identity
        }).success(function(data) {
          if ($scope.callback) {
            $scope.callback(data);
          } else {
            if ($scope.isMultiple) {
              if ($scope.inObject) {
                $scope.model.push({
                  "image": data.data[0]
                });
              } else {
                $scope.model.push(data.data[0]);
              }
            } else {
              $scope.model = data.data[0];
            }
          }
        });
      };
    }
  };
});




firstapp.directive('img', function($compile, $parse) {
  return {
    restrict: 'E',
    replace: false,
    link: function($scope, element, attrs) {
      var $element = $(element);
      if (!attrs.noloading) {
        $element.after("<img src='img/loading.gif' class='loading' />");
        var $loading = $element.next(".loading");
        $element.load(function() {
          $loading.remove();
          $(this).addClass("doneLoading");
        });
      } else {
        $($element).addClass("doneLoading");
      }
    }
  };
});

firstapp.directive('fancyboxBox', function($document) {
  return {
    restrict: 'EA',
    replace: false,
    link: function(scope, element, attr) {
      var $element = $(element);
      var target;
      if (attr.rel) {
        target = $("[rel='" + attr.rel + "']");
      } else {
        target = element;
      }

      target.fancybox({
        openEffect: 'fade',
        closeEffect: 'fade',
        closeBtn: true,
        helpers: {
          media: {}
        }
      });
    }
  };
});

firstapp.directive('menuOptions', function($document) {
  return {
    restrict: 'C',
    replace: false,
    link: function(scope, element, attr) {
      var $element = $(element);
      $(element).on("click", function() {
        $(".side-header.opened-menu").toggleClass('slide-menu');
        $(".main-content").toggleClass('wide-content');
        $("footer").toggleClass('wide-footer');
        $(".menu-options").toggleClass('active');
      });

    }
  };
});


firstapp.directive('oI', function($document) {
  return {
    restrict: 'C',
    replace: false,
    link: function(scope, element, attr) {
      var $element = $(element);
      $element.click(function() {
        $element.parent().siblings().children("ul").slideUp();
        $element.parent().siblings().removeClass("active");
        $element.parent().children("ul").slideToggle();
        $element.parent().toggleClass("active");
        return false;
      });

    }
  };
});
firstapp.directive('slimscroll', function($document) {
  return {
    restrict: 'EA',
    replace: false,
    link: function(scope, element, attr) {
      var $element = $(element);
      $element.slimScroll({
        height: '400px',
        wheelStep: 10,
        size: '2px'
      });
    }
  };
});

firstapp.directive('addressForm', function($document) {
  return {
    templateUrl: 'views/directive/address-form.html',
    scope: {
      formData: "=ngModel",
      demoForm: "=ngValid"
    },
    restrict: 'EA',
    replace: false,
    controller: function($scope, NgMap, NavigationService) {

      $scope.map = {};
      $scope.change = function() {
        NgMap.getMap().then(function(map) {
          var latLng = {
            lat: map.markers[0].position.lat(),
            lng: map.markers[0].position.lng()
          };
          _.assign($scope.formData, latLng);
        });
      };
      var LatLongi = 0;
      $scope.getLatLng = function(address) {

        NavigationService.getLatLng(address, ++LatLongi, function(data, i) {

          if (i == LatLongi) {
            $scope.formData = _.assign($scope.formData, data.results[0].geometry.location);
          }
        });
        // $http.get("http://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCn9ypqFNxdXt9Zu2YqLcdD1Xdt2wNul9s&address="+address);
      };

    },
    // link: function($scope, element, attr, NgMap) {
    //     var $element = $(element);
    //     $scope.demoForm = {};
    //     $scope.demoForm.lat = 19.0760;
    //     $scope.demoForm.long = 72.8777;
    //     $scope.map = {};
    //     $scope.change = function() {
    //       NgMap.getMap().then(function(map) {
    //         console.log(map);
    //       });
    //
    //     };
    //
    // }
  };
});

firstapp.directive('multipleSelect', function($document) {
  return {
    templateUrl: 'views/directive/multiple-select.html',
    scope: {
      model: '=ngModel',
      api: "@api",
      name: "@name",
      required: "@required",
      filter: "@filter",
      ngName: "=ngName",
      create: "@ngCreate",

    },
    restrict: 'EA',
    replace: false,
    controller: 'MultipleSelectCtrl',
    link: function(scope, element, attr, NavigationService) {
      var $element = $(element);
      scope.isRequired = true;
      if (scope.required === undefined) {
        scope.isRequired = false;
      }
      scope.typeselect = attr.typeselect;
      // $scope.searchNew()
    }
  };
});
firstapp.filter('capitalize', function() {
  return function(input, all) {
    var reg = (all) ? /([^\W_]+[^\s-]*) */g : /([^\W_]+[^\s-]*)/;
    return (!!input) ? input.replace(reg, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }) : '';
  };
});

firstapp.config(function($translateProvider) {
  $translateProvider.translations('en', LanguageEnglish);
  $translateProvider.translations('hi', LanguageHindi);
  $translateProvider.preferredLanguage('en');
});
