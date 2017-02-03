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
    "ngMap",
    'ab-base64'

]);

firstapp.config(function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
    // for http request with session
    $httpProvider.defaults.withCredentials = true;
    $stateProvider
        .state('dashboard', {
            url: "/dashboard",
            templateUrl: "frontend/views/template.html",
            controller: 'DashboardCtrl'
        })

        .state('login', {
            url: "/login",
            templateUrl: "frontend/views/login.html",
            controller: 'LoginCtrl'
        })

        .state('loginapp', {
            url: "/login/:id",
            templateUrl: "frontend/views/login.html",
            controller: 'LoginCtrl'
        })

        .state('branch-list', {
            url: "/branch-list/{page:.*}/{keyword:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'BranchListCtrl',
            params: {
                page: "1",
                keyword: ""
            }
        })

        .state('branch-create', {
            url: "/branch-create",
            templateUrl: "frontend/views/template.html",
            controller: 'BranchCreateCtrl'
        })

        .state('branch-edit', {
            url: "/branch-edit/:id",
            templateUrl: "frontend/views/template.html",
            controller: 'BranchEditCtrl'
        })

        .state('country-list', {
            url: "/country-list/{page:.*}/{keyword:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'CountryCtrl',
            params: {
                page: "1",
                keyword: ""
            }
        })

        .state('createcountry', {
            url: "/country-create",
            templateUrl: "frontend/views/template.html",
            controller: 'CreateCountryCtrl'
        })

        .state('editcountry', {
            url: "/country-edit/:id",
            templateUrl: "frontend/views/template.html",
            controller: 'EditCountryCtrl'
        })

        .state('zone-list', {
            url: "/zone-list/{page:.*}/{keyword:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'ZoneCtrl',
            params: {
                page: "1",
                keyword: ""
            }
        })

        .state('createzone', {
            url: "/zone-create",
            templateUrl: "frontend/views/template.html",
            controller: 'CreateZoneCtrl'
        })

        .state('editzone', {
            url: "/zone-edit/:id",
            templateUrl: "frontend/views/template.html",
            controller: 'EditZoneCtrl'
        })

        .state('state-list', {
            url: "/state-list/{page:.*}/{keyword:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'StateCtrl',
            params: {
                page: "1",
                keyword: ""
            }
        })

        .state('createstate', {
            url: "/state-create",
            templateUrl: "frontend/views/template.html",
            controller: 'CreateStateCtrl'
        })

        .state('editstate', {
            url: "/state-edit/:id",
            templateUrl: "frontend/views/template.html",
            controller: 'EditStateCtrl'
        })

        .state('district-list', {
            url: "/district-list/{page:.*}/{keyword:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'DistrictCtrl',
            params: {
                page: "1",
                keyword: ""
            }
        })

        .state('createdistrict', {
            url: "/district-create",
            templateUrl: "frontend/views/template.html",
            controller: 'CreateDistrictCtrl'
        })

        .state('editdistrict', {
            url: "/district-edit/:id",
            templateUrl: "frontend/views/template.html",
            controller: 'EditDistrictCtrl'
        })

        .state('currencies-list', {
            url: "/currencies-list/{page:.*}/{keyword:.*}/{model:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'ModelViewCtrl',
            params: {
                page: "1",
                keyword: "",
                model: "currencies"
            }
        })

        .state('createcurrency', {
            url: "/currency-create/{id:.*}/{model:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'CreateModelCtrl',
            params: {
                id: "",
                model: "currencies"
            }
        })

        .state('editcurrency', {
            url: "/currency-edit/{id:.*}/{model:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'EditModelCtrl',
            params: {
                id: "",
                model: "currencies"
            }
        })


        .state('city-list', {
            url: "/city-list/{page:.*}/{keyword:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'CityCtrl',
            params: {
                page: "1",
                keyword: ""
            }
        })

        .state('createcity', {
            url: "/city-create",
            templateUrl: "frontend/views/template.html",
            controller: 'CreateCityCtrl'
        })

        .state('editcity', {
            url: "/city-edit/:id",
            templateUrl: "frontend/views/template.html",
            controller: 'EditCityCtrl'
        })

        .state('office-list', {
            url: "/office-list/{page:.*}/{keyword:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'OfficeCtrl',
            params: {
                page: "1",
                keyword: ""
            }
        })


        .state('createoffice', {
            url: "/office-create",
            templateUrl: "frontend/views/template.html",
            controller: 'CreateOfficeCtrl'
        })

        .state('editoffice', {
            url: "/office-edit/:id",
            templateUrl: "frontend/views/template.html",
            controller: 'EditOfficeCtrl'
        })

        .state('typeOfOffice-list', {
            url: "/typeOfOffice-list/{page:.*}/{keyword:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'TypeOfOfficeCtrl',
            params: {
                page: "1",
                keyword: ""
            }
        })

        .state('createtypeOfOffice', {
            url: "/typeOfOffice-create",
            templateUrl: "frontend/views/template.html",
            controller: 'CreateTypeOfOfficeCtrl'
        })

        .state('edittypeOfOffice', {
            url: "/typeOfOffice-edit/:id",
            templateUrl: "frontend/views/template.html",
            controller: 'EditTypeOfOfficeCtrl'
        })

        .state('activityType-list', {
            url: "/activityType-list/{page:.*}/{keyword:.*}/{model:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'ModelViewCtrl',
            params: {
                page: "1",
                keyword: "",
                model: "activity type"
            }
        })

        .state('createactivityType', {
            url: "/activityType-create/{id:.*}/{model:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'CreateModelCtrl',
            params: {
                id: "",
                model: "activity type"
            }
        })

        .state('editactivityType', {
            url: "/activityType-edit/{id:.*}/{model:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'EditModelCtrl',
            params: {
                id: "",
                model: "activity type"
            }
        })

        .state('expense-list', {
            url: "/expense-list/{page:.*}/{keyword:.*}/{model:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'ModelViewCtrl',
            params: {
                page: "1",
                keyword: "",
                model: "expense"
            }
        })

        .state('createexpense', {
            url: "/expense-create/{id:.*}/{model:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'CreateModelCtrl',
            params: {
                id: "",
                model: "expense"
            }
        })

        .state('editexpense', {
            url: "/expense-edit/{id:.*}/{model:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'EditModelCtrl',
            params: {
                id: "",
                model: "expense"
            }
        })

        .state('department-list', {
            url: "/department-list/{page:.*}/{keyword:.*}/{model:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'ModelViewCtrl',
            params: {
                page: "1",
                keyword: "",
                model: "department"
            }
        })

        .state('createdepartment', {
            url: "/department-create/{id:.*}/{model:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'CreateModelCtrl',
            params: {
                id: "",
                model: "department"
            }
        })

        .state('editdepartment', {
            url: "/department-edit/{id:.*}/{model:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'EditModelCtrl',
            params: {
                id: "",
                model: "department"
            }
        })


        .state('uniqueType-list', {
            url: "/uniquetype-list/{page:.*}/{keyword:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'UniqueTypetCtrl',
            params: {
                page: "1",
                keyword: ""
            }
        })


        .state('createuniquetype', {
            url: "/uniquetype-create",
            templateUrl: "frontend/views/template.html",
            controller: 'CreateUniqueTypeCtrl'
        })

        .state('edituniquetype', {
            url: "/uniquetype-edit/:id",
            templateUrl: "frontend/views/template.html",
            controller: 'EditUniqueTypeCtrl'
        })

        .state('policyType-list', {
            url: "/policytype-list/{page:.*}/{keyword:.*}/{model:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'ModelViewCtrl',
            params: {
                page: "1",
                keyword: "",
                model: "policy type"
            }
        })

        .state('createpolicyType', {
            url: "/policytype-create/{id:.*}/{model:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'CreatePolicyTypeCtrl',
            params: {
                id: "",
                model: "policy type"
            }
        })

        .state('editpolicyType', {
            url: "/policytype-edit/{id:.*}/{model:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'EditPolicyTypeCtrl',
            params: {
                id: "",
                model: "policy type"
            }
        })

        .state('policy-list', {
            url: "/policy-list/{page:.*}/{keyword:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'PolicyCtrl',
            params: {
                page: "1",
                keyword: ""
            }
        })

        .state('createpolicy', {
            url: "/policy-create",
            templateUrl: "frontend/views/template.html",
            controller: 'CreatePolicyCtrl'
        })

        .state('editpolicy', {
            url: "/policy-edit/:id",
            templateUrl: "frontend/views/template.html",
            controller: 'EditPolicyCtrl'
        })

        .state('policyDoc-list', {
            url: "/policydoc-list/{page:.*}/{keyword:.*}/{model:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'ModelViewCtrl',
            params: {
                page: "1",
                keyword: "",
                model: "policy doc"
            }
        })

        .state('createpolicyDoc', {
            url: "/policydoc-create/{id:.*}/{model:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'CreatePolicyDocCtrl',
            params: {
                id: "",
                model: "policy doc"
            }
        })

        .state('editpolicyDoc', {
            url: "/policydoc-edit/{id:.*}/{model:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'EditPolicyDocCtrl',
            params: {
                id: "",
                model: "policy doc"
            }
        })

        .state('industry-list', {
            url: "/industry-list/{page:.*}/{keyword:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'IndustryCtrl',
            params: {
                page: "1",
                keyword: ""
            }
        })

        .state('createindustry', {
            url: "/industry-create",
            templateUrl: "frontend/views/template.html",
            controller: 'CreateIndustryCtrl'
        })

        .state('editindustry', {
            url: "/industry-edit/:id",
            templateUrl: "frontend/views/template.html",
            controller: 'EditIndustryCtrl'
        })

        .state('category-list', {
            url: "/category-list/{page:.*}/{keyword:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'CategoryCtrl',
            params: {
                page: "1",
                keyword: ""
            }
        })

        .state('createcategory', {
            url: "/category-create",
            templateUrl: "frontend/views/template.html",
            controller: 'CreateCategoryCtrl'
        })

        .state('editcategory', {
            url: "/category-edit/:id",
            templateUrl: "frontend/views/template.html",
            controller: 'EditCategoryCtrl'
        })

        .state('func-list', {
            url: "/func-list/{page:.*}/{keyword:.*}/{model:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'ModelViewCtrl',
            params: {
                page: "1",
                keyword: "",
                model: "func"
            }
        })

        .state('createfunc', {
            url: "/func-create/{id:.*}/{model:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'CreateModelCtrl',
            params: {
                id: "",
                model: "func"
            }
        })

        .state('editfunc', {
            url: "/func-edit/{id:.*}/{model:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'EditModelCtrl',
            params: {
                id: "",
                model: "func"
            }
        })

        .state('causeLoss-list', {
            url: "/causeloss-list/{page:.*}/{keyword:.*}/{model:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'ModelViewCtrl',
            params: {
                page: "1",
                keyword: "",
                model: "cause loss"
            }
        })

        .state('createcauseLoss', {
            url: "/causeloss-create/{id:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'CreateCauseLossCtrl',
            params: {
                id: ""
            }
        })

        .state('editcauseLoss', {
            url: "/causeloss-edit/{id:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'EditCauseLossCtrl',
            params: {
                id: ""
            }
        })

        .state('natureLoss-list', {
            url: "/natureloss-list/{page:.*}/{keyword:.*}/{model:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'ModelViewCtrl',
            params: {
                page: "1",
                keyword: "",
                model: "nature loss"
            }
        })

        .state('createnatureLoss', {
            url: "/natureloss-create",
            templateUrl: "frontend/views/template.html",
            controller: 'CreateModelCtrl',
            params: {
                model: "nature loss"
            }
        })

        .state('editnatureLoss', {
            url: "/natureloss-edit/{id:.*}/{model:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'EditModelCtrl',
            params: {
                id: "",
                model: "nature loss"
            }
        })

        .state('businessbranch-list', {
            url: "/businessbranch-list/{page:.*}/{keyword:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'BusinessBranchCtrl',
            params: {
                page: "1",
                keyword: ""
            }
        })

        .state('createbusinessbranch', {
            url: "/businessbranch-create",
            templateUrl: "frontend/views/template.html",
            controller: 'CreateBusinessBranchCtrl'
        })

        .state('editbusinessbranch', {
            url: "/businessbranch-edit/:id",
            templateUrl: "frontend/views/template.html",
            controller: 'EditBusinessBranchCtrl'
        })

        .state('menu-list', {
            url: "/menu-list/{page:.*}/{keyword:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'MenuCtrl',
            params: {
                page: "1",
                keyword: ""
            }
        })

        .state('createmenu', {
            url: "/menu-create",
            templateUrl: "frontend/views/template.html",
            controller: 'CreateMenuCtrl'
        })

        .state('editmenu', {
            url: "/menu-edit/:id",
            templateUrl: "frontend/views/template.html",
            controller: 'EditMenuCtrl'
        })

        .state('role-list', {
            url: "/role-list/{page:.*}/{keyword:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'RoleCtrl',
            params: {
                page: "1",
                keyword: ""
            }
        })

        .state('createrole', {
            url: "/role-create",
            templateUrl: "frontend/views/template.html",
            controller: 'CreateRoleCtrl'
        })

        .state('editrole', {
            url: "/role-edit/:id",
            templateUrl: "frontend/views/template.html",
            controller: 'EditRoleCtrl'
        })

        .state('user-list', {
            url: "/user-list/{page:.*}/{keyword:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'UserCtrl',
            params: {
                page: "1",
                keyword: ""
            }
        })

        .state('createuser', {
            url: "/user-create",
            templateUrl: "frontend/views/template.html",
            controller: 'CreateUserCtrl'
        })

        .state('leave-detail', {
            url: "/leave-detail",
            templateUrl: "frontend/views/template.html",
            controller: 'LeaveDetailCtrl'
        })

        .state('leaveManagement-list', {
            url: "/leavemanagement-list/{page:.*}/{keyword:.*}/{model:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'ModelViewCtrl',
            params: {
                page: "1",
                keyword: "",
                model: "leave management"
            }
        })
        .state('createleaves', {
            url: "/leave-create/{id:.*}/{model:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'CreateLeaveCtrl',
            params: {
                id: "",
                model: "leave management"
            }
        })
        .state('editleaves', {
            url: "/leaves-edit/{id:.*}/{model:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'EditLeaveCtrl',
            params: {
                id: "",
                model: "leave management"
            }
        })



        .state('reimbursement-list', {
            url: "/reimbursement-list/{page:.*}/{keyword:.*}/{model:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'ModelViewCtrl',
            params: {
                page: "1",
                keyword: "",
                model: "reimbursement"
            }
        })

        .state('createreimbursements', {
            url: "/reimbursement-create/{id:.*}/{model:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'CreateReimbursementCtrl',
            params: {
                id: "",
                model: "reimbursement"
            }
        })
        .state('editreimbursements', {
            url: "/reimbursements-edit/{id:.*}/{model:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'EditReimbursementCtrl',
            params: {
                id: "",
                model: "reimbursement"
            }
        })





        // .state('reimbursement-detail', {
        //     url: "/reimbursement-detail",
        //     templateUrl: "frontend/views/template.html",
        //     controller: 'ReimbursementDetailCtrl'
        // })

        .state('edituser', {
            url: "/user-edit/:id",
            templateUrl: "frontend/views/template.html",
            controller: 'EditUserCtrl'
        })

        .state('employee-list', {
            url: "/employee-list//{page:.*}/{keyword:.*}/{model:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'ModelViewCtrl',
            params: {
                page: "1",
                keyword: "",
                model: "employee"
            }
        })


        .state('createemployee', {
            url: "/employee-create/{id:.*}/{model:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'CreateEmployeeCtrl',
            params: {
                id: "",
                model: "employee"
            }
        })

        .state('editemployee', {
            url: "/employee-edit/:id",
            templateUrl: "frontend/views/template.html",
            controller: 'EditEmployeeCtrl',
            params: {
                id: "",
                model: "employee"
            }
        })

        .state('product-list', {
            url: "/product-list/{page:.*}/{keyword:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'ProductCtrl',
            params: {
                page: "1",
                keyword: ""
            }
        })

        .state('createproduct', {
            url: "/product-detail",
            templateUrl: "frontend/views/template.html",
            controller: 'CreateProductCtrl'
        })

        .state('editproduct', {
            url: "/product-edit/:id",
            templateUrl: "frontend/views/template.html",
            controller: 'EditProductCtrl'
        })

        .state('salvage-list', {
            url: "/salvage-list/{page:.*}/{keyword:.*}/{model:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'ModelViewCtrl',
            params: {
                page: "1",
                keyword: "",
                model: "salvage"
            }
        })

        .state('createsalvage', {
            url: "/salvage-detail/{id:.*}/{model:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'CreateModelCtrl',
            params: {
                id: "",
                model: "salvage"
            }
        })

        .state('editSalvage', {
            url: "/salvage-edit/{id:.*}/{model:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'EditModelCtrl',
            params: {
                id: "",
                model: "salvage"
            }
        })

        .state('claims-list', {
            url: "/claims-list/{page:.*}/{keyword:.*}/{model:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'ModelViewCtrl',
            params: {
                page: "1",
                keyword: "",
                model: "claims"
            }
        })

        .state('createclaims', {
            url: "/claims-detail/{id:.*}/{model:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'CreateModelCtrl',
            params: {
                id: "",
                model: "claims"
            }
        })

        .state('editclaims', {
            url: "/claims-edit/{id:.*}/{model:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'EditModelCtrl',
            params: {
                id: "",
                model: "claims"
            }
        })

        .state('bankMaster-list', {
            url: "/bankmaster-list/{page:.*}/{keyword:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'BankMasterCtrl',
            params: {
                page: "1",
                keyword: ""
            }
        })

        .state('createbankmaster', {
            url: "/bankmaster-detail",
            templateUrl: "frontend/views/template.html",
            controller: 'CreateBankmasterCtrl'
        })

        .state('editbankmaster', {
            url: "/bankmaster-detail/:id",
            templateUrl: "frontend/views/template.html",
            controller: 'EditBankmasterCtrl'
        })

        .state('company-list', {
            url: "/company-list/{page:.*}/{keyword:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'CompanyCtrl',
            params: {
                page: "1",
                keyword: ""
            }
        })

        .state('createcompany', {
            url: "/company-detail",
            templateUrl: "frontend/views/template.html",
            controller: 'CreateCompanyCtrl'
        })

        .state('editcompany', {
            url: "/company-detail/:id",
            templateUrl: "frontend/views/template.html",
            controller: 'EditCompanyCtrl'
        })
        .state('knowledgebase-list', {
            url: "/knowledgebase-list/{page:.*}/{keyword:.*}/{model:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'KnowledgeBaseViewCtrl',
            params: {
                page: "1",
                keyword: "",
                model: "knowledge base"
            }
        })
        .state('createKnowledgeBase', {
            url: "/KnowledgeBase-create/{id:.*}/{model:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'CreateKnowledgeBaseCtrl',
            params: {
                id: "",
                model: "knowledge base"
            }
        })
        .state('editKnowledgeBase', {
            url: "/KnowledgeBase-edit/{id:.*}/{model:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'EditKnowledgeBaseCtrl',
            params: {
                id: "",
                model: "knowledge base"
            }
        })
        .state('createAllDocument', {
            url: "/AllDocument-create/{id:.*}/{model:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'CreateAllDocumentCtrl',
            params: {
                id: "",
                model: "jir"
            }
        })
        .state('knowledgebase-detail', {
            url: "/knowledgebase-detail",
            templateUrl: "frontend/views/template.html",
            controller: 'KnowledgebaseDetailCtrl'
        })
        .state('all-document', {
            url: "/all-document",
            templateUrl: "frontend/views/template.html",
            controller: 'AllDocumentCtrl',
            params: {
                id: "",
                model: "jir"
            }
        })
        .state('tag-list', {
            url: "/tag-list/{page:.*}/{keyword:.*}/{model:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'ModelViewCtrl',
            params: {
                page: "1",
                keyword: "",
                model: "tag"
            }
        })
        .state('createtag', {
            url: "/tag-detail/{id:.*}/{model:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'CreateModelCtrl',
            params: {
                id: "",
                model: "tag"
            }
        })
        .state('edittag', {
            url: "/tag-edit/{id:.*}/{model:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'EditModelCtrl',
            params: {
                page: "1",
                keyword: "",
                model: "tag"
            }
        })
        .state('tax-list', {
            url: "/tax-list/{page:.*}/{keyword:.*}/{model:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'ModelViewCtrl',
            params: {
                page: "1",
                keyword: "",
                model: "tax"
            }
        })
        .state('createtax', {
            url: "/tax-detail/{id:.*}/{model:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'CreateModelCtrl',
            params: {
                id: "",
                model: "tax"
            }
        })
        .state('edittax', {
            url: "/tax-edit/{id:.*}/{model:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'EditModelCtrl',
            params: {
                page: "1",
                keyword: "",
                model: "tax"
            }
        })
        .state('customer-list', {
            url: "/customer-list/{page:.*}/{keyword:.*}/{model:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'ModelViewCtrl',
            params: {
                page: "1",
                keyword: "",
                model: "customer"
            }
        })

        .state('createcustomer', {
            url: "/customer-detail/{id:.*}/{model:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'CreateCustomerCtrl',
            // data.error.message
            params: {
                id: "",
                model: "customer"
            }
        })

        .state('editcustomer', {
            url: "/customer-edit/{id:.*}/{model:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'EditCustomerCtrl',
            params: {
                id: "",
                model: "customer"
            }
        })


        .state('contactManagement-list', {
            url: "/contactmanagement-list/{page:.*}/{keyword:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'ContactManagementCtrl',
            params: {
                page: "1",
                keyword: ""
            }
        })

        .state('createcontactmanagement', {
            url: "/contactmanagement-detail",
            templateUrl: "frontend/views/template.html",
            controller: 'CreateContactManagementCtrl'
        })

        .state('contacttype-list', {
            url: "/contacttype-list/{page:.*}/{keyword:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'ContactTypeCtrl',
            params: {
                page: "1",
                keyword: ""
            }
        })

        .state('createcontacttype', {
            url: "/contacttype-detail",
            templateUrl: "frontend/views/template.html",
            controller: 'CreateContactTypeCtrl'
        })

        .state('contactTypeOffice-list', {
            url: "/contacttypeoffice-list/{page:.*}/{keyword:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'ContactTypeOfficeCtrl',
            params: {
                page: "1",
                keyword: ""
            }
        })

        .state('createcontacttypeoffice', {
            url: "/contacttypeoffice-detail",
            templateUrl: "frontend/views/template.html",
            controller: 'CreateContactTypeOfficeCtrl'
        })

        .state('customerSegment-list', {
            url: "/customersegment-list/{page:.*}/{keyword:.*}/{model:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'ModelViewCtrl',
            params: {
                page: "1",
                keyword: "",
                model: "customer segment"
            }
        })

        .state('createcustomerSegment', {
            url: "/customersegment-create/{id:.*}/{model:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'CreateModelCtrl',
            params: {
                id: "",
                model: "customer segment"
            }
        })

        .state('editcustomerSegment', {
            url: "/customersegment-edit/{id:.*}/{model:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'EditModelCtrl',
            params: {
                id: "",
                model: "customer segment"
            }
        })

        .state('customerCompany-list', {
            url: "/customercompany-list/{page:.*}/{keyword:.*}/{model:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'ModelViewCtrl',
            params: {
                page: "1",
                keyword: "",
                model: "customer company"
            }
        })

        .state('createcustomerCompany', {
            url: "/customercompany-create/{id:.*}/{model:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'CreateModelCtrl',
            params: {
                id: "",
                model: "customer company"
            }
        })

        .state('editcustomerCompany', {
            url: "/customercompany-edit/{id:.*}/{model:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'EditModelCtrl',
            params: {
                id: "",
                model: "customer company"
            }
        })

        .state('grade-list', {
            url: "/grade-list/:id/:keyword/:model",
            templateUrl: "frontend/views/template.html",
            controller: 'ModelViewCtrl',
            params: {
                page: "1",
                keyword: "",
                model: "grade"
            }
        })

        .state('creategrade', {
            url: "/grade-create/:id/:model",
            templateUrl: "frontend/views/template.html",
            controller: 'CreateModelCtrl',
            params: {
                id: "",
                model: "grade"
            }
        })

        .state('editgrade', {
            url: "/grade-edit/:id/:model",
            templateUrl: "frontend/views/template.html",
            controller: 'EditModelCtrl',
            params: {
                id: "",
                model: "grade"
            }
        })

        .state('surveyCode-list', {
            url: "/surveycode-list/{page:.*}/{keyword:.*}/{model:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'ModelViewCtrl',
            params: {
                page: "1",
                keyword: "",
                model: "survey code"
            }
        })

        .state('createsurveyCode', {
            url: "/surveycode-create/{id:.*}/{model:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'CreateModelCtrl',
            params: {
                id: "",
                model: "survey code"
            }
        })

        .state('editsurveyCode', {
            url: "/surveycode-edit/{id:.*}/{model:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'EditModelCtrl',
            params: {
                id: "",
                model: "survey code"
            }
        })

        .state('transferOffice-list', {
            url: "/transferoffice-list/{page:.*}/{keyword:.*}/{model:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'ModelViewCtrl',
            params: {
                page: "1",
                keyword: "",
                model: "transfer office"
            }
        })

        .state('createtransferoffice', {
            url: "/transferoffice-create/{id:.*}/{model:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'CreateModelCtrl',
            params: {
                id: "",
                model: "transfer office"
            }
        })

        .state('edittransferofficer', {
            url: "/transferOfficer-edit",
            templateUrl: "frontend/views/template.html",
            controller: 'EditTransferOfficerCtrl'
        })

        .state('createassignment', {
            url: "/assignment-create/{id:.*}/{model:.*}/{assignment:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'CreateAssignmentCtrl',
            params: {
                id: "",
                model: "assignment",
                assignment: ""
            }
        })

        .state('createassignmentemail', {
            url: "/assignmentemail-create/{emailId:.*}/{model:.*}/{pdf:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'CreateAssignmentCtrl',
            params: {
                emailId: "",
                model: "assignment"
            }
        })

        .state('editassignment', {
            url: "/assignment-edit/{id:.*}/{model:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'EditAssignmentCtrl',
            params: {
                id: "",
                model: "assignment"
            }
        })

        .state('assignment-list', {
            url: "/assignment-list",
            templateUrl: "frontend/views/template.html",
            controller: 'ModelViewCtrl',
            params: {
                page: "1",
                keyword: "",
                model: "assignment"
            }
        })

        .state('timeline', {
            url: "/timeline/{id:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'TimelineCtrl',
            params: {
                id: ""
            }
        })

        .state('template-list', {
            url: "/template-list/{page:.*}/{keyword:.*}/{model:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'ModelViewCtrl',
            params: {
                page: "1",
                keyword: "",
                model: "template"
            }
        })

        .state('createtemplate', {
            url: "/template-create",
            templateUrl: "frontend/views/template.html",
            controller: 'CreateTemplateCtrl'
        })

        .state('edittemplate', {
            url: "/template-edit/:id",
            templateUrl: "frontend/views/template.html",
            controller: 'EditTemplateCtrl'
        })

        // jir state
        .state('templateJir-list', {
            url: "/templateJir-list/{page:.*}/{keyword:.*}/{model:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'ModelViewCtrl',
            params: {
                page: "1",
                keyword: "",
                model: "template jir"
            }
        })

        .state('createtemplateJir', {
            url: "/templateJir-create",
            templateUrl: "frontend/views/template.html",
            controller: 'CreateTemplateJIRCtrl'
        })

        .state('edittemplateJir', {
            url: "/templateJir-edit/:id",
            templateUrl: "frontend/views/template.html",
            controller: 'EditTemplateJIRCtrl'
        })

        //  jir state

        // ila state
        .state('templateIla-list', {
            url: "/templateIla-list/{page:.*}/{keyword:.*}/{model:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'ModelViewCtrl',
            params: {
                page: "1",
                keyword: "",
                model: "template ila"
            }
        })

        .state('createtemplateIla', {
            url: "/templateIla-create",
            templateUrl: "frontend/views/template.html",
            controller: 'CreateTemplateILACtrl'
        })

        .state('edittemplateIla', {
            url: "/templateIla-edit/:id",
            templateUrl: "frontend/views/template.html",
            controller: 'EditTemplateILACtrl'
        })

        //  ila state

        // ila state
        .state('templateIsr-list', {
            url: "/templateIsr-list/{page:.*}/{keyword:.*}/{model:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'ModelViewCtrl',
            params: {
                page: "1",
                keyword: "",
                model: "template isr"
            }
        })

        .state('createtemplateIsr', {
            url: "/templateIsr-create",
            templateUrl: "frontend/views/template.html",
            controller: 'CreateTemplateISRCtrl'
        })

        .state('edittemplateIsr', {
            url: "/templateIsr-edit/:id",
            templateUrl: "frontend/views/template.html",
            controller: 'EditTemplateISRCtrl'
        })

        //  ila state

        //  lor state
        .state('templateLor-list', {
            url: "/templateLor-list/{page:.*}/{keyword:.*}/{model:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'ModelViewCtrl',
            params: {
                page: "1",
                keyword: "",
                model: "template lor"
            }
        })

        .state('templateInvoice-list', {
            url: "/templateInvoice-list/{page:.*}/{keyword:.*}/{model:.*}",
            templateUrl: "frontend/views/template.html",
            controller: 'ModelViewCtrl',
            params: {
                page: "1",
                keyword: "",
                model: "template invoice"
            }
        })

        .state('createtemplateLor', {
            url: "/templateLor-create",
            templateUrl: "frontend/views/template.html",
            controller: 'CreateTemplateLORCtrl'
        })

        .state('edittemplateLor', {
            url: "/templateLor-edit/:id",
            templateUrl: "frontend/views/template.html",
            controller: 'EditTemplateLORCtrl'
        })

        //  lor state


        .state('template-view', {
            url: "/template-view/:template/:assignmentTemplate/:assignment/:type",
            templateUrl: "frontend/views/template.html",
            controller: 'TemplateViewCtrl'
        })

        .state('email-inbox', {
            url: "/email-inbox",
            templateUrl: "frontend/views/template.html",
            controller: 'EmailInboxCtrl'
        })

        .state('email-single', {
            url: "/email-single/:id",
            templateUrl: "frontend/views/template.html",
            controller: 'EmailSingleCtrl'
        })

        .state('forbidden', {
            url: "/forbidden",
            templateUrl: "frontend/views/template.html",
            controller: 'ForbiddenCtrl'
        })

    ;
    $urlRouterProvider.otherwise("/dashboard");
    $locationProvider.html5Mode(isproduction);

});

firstapp.filter('toobject', function () {
    return function (input, assignment) {
        var sInput = _.split(input, '+');
        var returnStr = "";
        sInput = _.map(sInput, function (n) {
            var obj = {};
            n = _.trim(n);
            if (_.startsWith(n, '"')) {
                obj.type = "String";
                obj.value = n.substr(1, n.length - 2);
            } else {
                obj.type = "Object";
                var splitVal = _.split(n, ".");
                obj.value = assignment;
                _.each(splitVal, function (m) {
                    if (obj.value) {
                        obj.value = obj.value[m];
                    }

                });
            }
            returnStr = returnStr + obj.value;
            return obj;
        });
        return returnStr;
    };
});

firstapp.filter('uploadpath', function () {
    return function (input, width, height, style) {
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
        } else {
            return 'frontend/img/placeholder.png';
        }
    };
});

firstapp.filter("mrnumber", function (NavigationService, $timeout) {

    return function (input) {
        var MRNumber = "";
        NavigationService.getOneCity(input.city, function (data) {
            MRNumber = data.data.district.state.zone.country.countryCode;
            return data;
        });
    };
});

firstapp.filter('reverse', function () {
    return function (items) {
        return items.slice().reverse();
    };
});


firstapp.directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.myEnter);
                });

                event.preventDefault();
            }
        });
    };
})

firstapp.directive('imageonload', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.bind('load', function () {
                scope.$apply(attrs.imageonload);
            });
        }
    };
});

firstapp.filter('numberFixedLen', function () {
    return function (n, len) {
        var num = parseInt(n, 10);
        len = parseInt(len, 10);
        if (isNaN(num) || isNaN(len)) {
            return n;
        }
        num = '' + num;
        while (num.length < len) {
            num = '0' + num;
        }
        return num;
    };
});

firstapp.directive('dateModel', function () {
    return {
        scope: {
            model: '=ngModel'
        },
        link: function ($scope, element, attrs) {
            $scope.model = new Date($scope.model);
        }
    };
});


firstapp.directive('uploadImage', function ($http, $filter, $timeout) {
    return {
        templateUrl: '/frontend/views/directive/uploadFile.html',
        scope: {
            model: '=ngModel',
            callback: "&ngCallback"
        },
        link: function ($scope, element, attrs) {

            $scope.showImage = function () {
                console.log($scope.image);
            };
            $scope.check = true;
            $scope.type = "img";
            $scope.isMultiple = false;
            $scope.inObject = false;
            if (attrs.multiple || attrs.multiple === "") {
                $scope.isMultiple = true;
                $("#inputImage").attr("multiple", "ADD");
            }
            if (attrs.noView || attrs.noView === "") {
                $scope.noShow = true;
            }
            // if (attrs.required) {
            //     $scope.required = true;
            // } else {
            //     $scope.required = false;
            // }

            $scope.$watch("image", function (newVal, oldVal) {

                isArr = _.isArray(newVal);
                if (!isArr && newVal && newVal.file) {
                    $scope.uploadNow(newVal);
                } else if (isArr && newVal.length > 0 && newVal[0].file) {

                    $timeout(function () {
                        console.log(oldVal, newVal);
                        console.log(newVal.length);
                        _.each(newVal, function (newV, key) {
                            if (newV && newV.file) {
                                $scope.uploadNow(newV);
                            }
                        });
                    }, 100);

                }
            });

            if ($scope.model) {
                if (_.isArray($scope.model)) {
                    $scope.image = [];
                    _.each($scope.model, function (n) {
                        $scope.image.push({
                            url: n
                        });
                    });
                } else {
                    if (_.endsWith($scope.model, ".pdf")) {
                        $scope.type = "pdf";
                    }
                }

            }
            if (attrs.inobj || attrs.inobj === "") {
                $scope.inObject = true;
            }
            $scope.clearOld = function () {
                $scope.model = [];
            };
            $scope.uploadNow = function (image) {
                $scope.uploadStatus = "uploading";

                var Template = this;
                image.hide = true;
                var formData = new FormData();
                formData.append('file', image.file, image.name);
                $http.post(uploadurl, formData, {
                    headers: {
                        'Content-Type': undefined
                    },
                    transformRequest: angular.identity
                }).success(function (data) {

                    $scope.uploadStatus = "uploaded";
                    if ($scope.isMultiple) {

                        if ($scope.inObject) {
                            $scope.model.push({
                                "image": data.data[0]
                            });
                        } else {
                            if (!$scope.model) {
                                $scope.clearOld();
                            }
                            $scope.model.push(data.data[0]);
                        }
                    } else {
                        if (_.endsWith(data.data, ".pdf")) {
                            $scope.type = "pdf";
                        } else {
                            $scope.type = "img";
                        }
                        $scope.model = data.data;

                    }
                    $timeout(function () {
                        $scope.callback();
                    }, 100);

                });
            };
        }
    };
});
firstapp.directive('uploadImageNew', function ($http, $filter, $timeout) {
    return {
        templateUrl: '/frontend/views/directive/uploadFile.html',
        scope: {
            model: '=ngModel',
            callback: "&ngCallback"
        },
        link: function ($scope, element, attrs) {
            $scope.length = 0;
            $scope.showImage = function () {
                console.log($scope.image);
            };
            $scope.check = true;
            $scope.type = "img";
            $scope.isMultiple = false;
            $scope.inObject = false;
            if (attrs.multiple || attrs.multiple === "") {
                $scope.isMultiple = true;
                $("#inputImage").attr("multiple", "ADD");
            }
            if (attrs.noView || attrs.noView === "") {
                $scope.noShow = true;
            }
            // if (attrs.required) {
            //     $scope.required = true;
            // } else {
            //     $scope.required = false;
            // }

            $scope.$watch("image", function (newVal, oldVal) {

                isArr = _.isArray(newVal);
                if (!isArr && newVal && newVal.file) {
                    $scope.uploadNow(newVal);
                } else if (isArr && newVal.length > 0 && newVal[0].file) {

                    $timeout(function () {
                        console.log(oldVal, newVal);
                        console.log(newVal.length);
                        $scope.length = newVal.length;
                        _.each(newVal, function (newV, key) {
                            if (newV && newV.file) {
                                $scope.uploadNow(newV);
                            }
                        });
                    }, 100);

                }
            });

            if ($scope.model) {
                if (_.isArray($scope.model)) {
                    $scope.image = [];
                    _.each($scope.model, function (n) {
                        $scope.image.push({
                            url: n
                        });
                    });
                } else {
                    if (_.endsWith($scope.model, ".pdf")) {
                        $scope.type = "pdf";
                    }
                }

            }
            if (attrs.inobj || attrs.inobj === "") {
                $scope.inObject = true;
            }
            $scope.clearOld = function () {
                $scope.model = [];
            };
            $scope.uploadNow = function (image) {
                $scope.uploadStatus = "uploading";

                var Template = this;
                image.hide = true;
                var formData = new FormData();
                formData.append('file', image.file, image.name);
                $http.post(uploadurl, formData, {
                    headers: {
                        'Content-Type': undefined
                    },
                    transformRequest: angular.identity
                }).success(function (data) {

                    $scope.uploadStatus = "uploaded";
                    if ($scope.isMultiple) {

                        if ($scope.inObject) {
                            $scope.model.push({
                                "image": data.data[0]
                            });
                        } else {
                            if (!$scope.model) {
                                $scope.clearOld();
                            }
                            $scope.model.push(data.data[0]);
                        }
                    } else {
                        if (_.endsWith(data.data, ".pdf")) {
                            $scope.type = "pdf";
                        } else {
                            $scope.type = "img";
                        }
                        $scope.model = data.data;

                    }
                    $timeout(function () {
                        $scope.callback({
                            'img': data.data[0],
                            'length': $scope.length
                        });
                    }, 100);

                });
            };
        }
    };
});

// firstappdirective("limitTo", [function() {
//     return {
//         restrict: "A",
//         link: function(scope, elem, attrs) {
//             var limit = parseInt(attrs.limitTo);
//             angular.element(elem).on("keypress", function(e) {
//                 if (this.value.length == limit) e.preventDefault();
//             });
//         }
//     }
// }]);
firstapp.directive('onlyDigits', function () {
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function (scope, element, attr, ctrl) {
            function inputValue(val) {
                var digits;
                if (val) {
                    if (attr.type == "text") {
                        digits = val.replace(/[^0-9\+\\]/g, '');
                    } else {
                        digits = val.replace(/[^0-9\-\\]/g, '');
                    }


                    if (digits !== val) {
                        ctrl.$setViewValue(digits);
                        ctrl.$render();
                    }
                    return parseInt(digits, 10);
                }
                return undefined;
            }
            ctrl.$parsers.push(inputValue);
        }
    };
});


firstapp.filter('propsFilter', function () {
    return function (items, props) {
        var out = [];

        if (angular.isArray(items)) {
            items.forEach(function (item) {
                var itemMatches = false;

                var keys = Object.keys(props);
                for (var i = 0; i < keys.length; i++) {
                    var prop = keys[i];
                    var text = props[prop].toLowerCase();
                    if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                        itemMatches = true;
                        break;
                    }
                }

                if (itemMatches) {
                    out.push(item);
                }
            });
        } else {
            // Let the output be the input untouched
            out = items;
        }

        return out;
    };
});

firstapp.directive('img', function ($compile, $parse) {
    return {
        restrict: 'E',
        replace: false,
        link: function ($scope, element, attrs) {
            var $element = $(element);
            if (!attrs.noloading) {
                $element.after("<img src='frontend/img/loading.gif' class='loading' />");
                var $loading = $element.next(".loading");
                $element.load(function () {
                    $loading.remove();
                    $(this).addClass("doneLoading");
                });
            } else {
                $($element).addClass("doneLoading");
            }
        }
    };
});

firstapp.directive('fancyboxBox', function ($document) {
    return {
        restrict: 'EA',
        replace: false,
        link: function (scope, element, attr) {
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

firstapp.directive('menuOptions', function ($document) {
    return {
        restrict: 'C',
        replace: false,
        link: function (scope, element, attr) {
            var $element = $(element);
            $(element).on("click", function () {
                $(".side-header.opened-menu").toggleClass('slide-menu');
                $(".main-content").toggleClass('wide-content');
                $("footer").toggleClass('wide-footer');
                $(".menu-options").toggleClass('active');
            });

        }
    };
});


firstapp.filter('serverimage', function () {
    return function (input, width, height, style) {
        if (input) {
            if (input.substr(0, 4) == "http") {
                return input;
            } else {
                image = imgpath + "?file=" + input;
                if (width) {
                    image += "&width=" + width;
                }
                if (height) {
                    image += "&height=" + height;
                }
                if (style) {
                    image += "&style=" + style;
                }
                return image;
            }

        } else {
            return "frontend/img/logo.png";
        }
    };
});



firstapp.filter('base64url', function (base64) {
    return function (input) {
        if (input) {
            return base64.urldecode(input);
        } else {
            return "";
        }

    };
});

firstapp.filter('convDate', function () {
    return function (input) {
        return new Date(input);
    };
});

firstapp.filter('downloadImage', function () {
    return function (input) {
        if (input) {
            return adminurl + "download/" + input;
        } else {
            return "frontend/img/logo.png";
        }
    };
});
firstapp.filter('readUnread', function () {
    return function (input) {
        var check = false;
        if (input) {
            _.each(input, function (n) {
                if (n == "UNREAD") {
                    check = "unread-mail";
                }
            });
            return check;
        } else {
            return check;
        }
    };
});

firstapp.filter('from', function () {
    return function (input, data) {
        var returnString = "Unknown";
        if (input) {
            _.each(input, function (n) {
                if (n.name == data) {
                    returnString = n.value;
                }
            });
            return returnString;
        } else {
            return "Unknown";
        }
    };
});

firstapp.directive('oI', function ($document) {
    return {
        restrict: 'C',
        replace: false,
        link: function (scope, element, attr) {
            var $element = $(element);
            $element.click(function () {
                $element.parent().siblings().children("ul").slideUp();
                $element.parent().siblings().removeClass("active");
                $element.parent().children("ul").slideToggle();
                $element.parent().toggleClass("active");
                return false;
            });

        }
    };
});
firstapp.directive('slimscroll', function ($document) {
    return {
        restrict: 'EA',
        replace: false,
        link: function (scope, element, attr) {
            var $element = $(element);
            $element.slimScroll({
                height: '400px',
                wheelStep: 10,
                size: '2px'
            });
        }
    };
});

firstapp.directive('addressForm', function ($document) {
    return {
        templateUrl: '/frontend/views/directive/address-form.html',
        scope: {
            formData: "=ngModel",
            demoForm: "=ngValid"
        },
        restrict: 'EA',
        replace: false,
        controller: function ($scope, NgMap, NavigationService) {

            $scope.map = {};
            $scope.change = function () {
                NgMap.getMap().then(function (map) {
                    var latLng = {
                        lat: map.markers[0].position.lat(),
                        lng: map.markers[0].position.lng()
                    };
                    _.assign($scope.formData, latLng);
                });
            };
            var value2 = "a";
            $scope.populateAddress = function (data, value) {
                console.log($scope.formData);
                var id = data;
                // Start
                if (value2 === data) {} else {
                    if (data !== undefined && id !== "") {
                        value2 = data;
                        NavigationService.getOneModel(value, id, function (data) {
                            console.log()
                            console.log("Before", $scope.formData.district, $scope.formData.state, $scope.formData.zone, $scope.formData.country);
                            $scope.formData = {};
                            if (value === "City") {
                                console.log("dfhajshwfaljhdsk")

                                $scope.formData.country = data.data.district.state.zone.country._id;
                                $scope.formData.zone = data.data.district.state.zone._id;
                                $scope.formData.state = data.data.district.state._id;
                                $scope.formData.district = data.data.district._id;
                                //      $scope.$apply(function(){
                                //          $scope.formData = _.clone($scope.formData);
                                //    });
                                // $scope.$apply();
                                console.log("After", $scope.formData.district, $scope.formData.state, $scope.formData.zone, $scope.formData.country);
                            } else if (value === "District") {
                                $scope.formData.country = data.data.state.zone.country._id;
                                $scope.formData.zone = data.data.state.zone._id;
                                $scope.formData.state = data.data.state._id;
                            } else if (value === "State") {
                                $scope.formData.country = data.data.zone.country._id;
                                $scope.formData.zone = data.data.zone._id;
                            } else {
                                $scope.formData.country = data.data.country._id;
                            }
                        });
                    } else {
                        console.log("Invalid Address");
                    }
                }


            }



            var LatLongi = 0;
            $scope.getLatLng = function (address) {

                console.log("getLatLng Funct Enter param", address + " ,");
                NavigationService.getLatLng(address, ++LatLongi, function (data, i) {
                    console.log("geometry Data", data);
                    if (i == LatLongi) {
                        $scope.formData.formatted_address = data.results[0].formatted_address;
                        $scope.formData = _.assign($scope.formData, data.results[0].geometry.location);
                        console.log("In function App", $scope.formData);
                    }
                });
                // $http.get("http://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCn9ypqFNxdXt9Zu2YqLcdD1Xdt2wNul9s&address="+address);
            };

        },
    };
});
var aa = {};
firstapp.directive('multipleSelect', function ($document, $timeout) {
    return {
        templateUrl: '/frontend/views/directive/multiple-select.html',
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
        link: function (scope, element, attr, NavigationService) {
            var $element = $(element);
            scope.activeKey = 0;
            scope.isRequired = true;
            if (scope.required === undefined) {
                scope.isRequired = false;
            }
            scope.typeselect = attr.typeselect;
            aa = $element;
            var maxItemLength = 40;
            var maxBoxLength = 200;
            $timeout(function () {

                $element.find(".typeText").keyup(function (event) {
                    var scrollTop = $element.find("ul.allOptions").scrollTop();
                    var optionLength = $element.find("ul.allOptions li").length;
                    if (event.keyCode == 40) {
                        scope.activeKey++;
                    } else if (event.keyCode == 38) {
                        scope.activeKey--;
                    } else if (event.keyCode == 13) {
                        $element.find("ul.allOptions li").eq(scope.activeKey).trigger("click");
                    }
                    if (scope.activeKey < 0) {
                        scope.activeKey = optionLength - 1;
                    }
                    if (scope.activeKey >= optionLength) {
                        scope.activeKey = 0;
                    }
                    var newScroll = -1;
                    var scrollVisibility = (scrollTop + maxBoxLength) - maxItemLength;
                    var currentItemPosition = scope.activeKey * maxItemLength;
                    if (currentItemPosition < scrollTop) {
                        newScroll = (maxItemLength * scope.activeKey);

                    } else if (currentItemPosition > scrollVisibility) {
                        newScroll = (maxItemLength * scope.activeKey);

                    }
                    if (newScroll != -1) {
                        $element.find("ul.allOptions").scrollTop(newScroll);
                    }

                    scope.$apply();
                });

            }, 100);

        }
    };
});

firstapp.filter('ageFilter', function () {
    function calculateAge(birthday) { // birthday is a date
        var ageDifMs = Date.now() - birthday.getTime();
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    return function (birthdate) {
        return calculateAge(birthdate);
    };
});
firstapp.filter('capitalize', function () {
    return function (input, all) {
        var reg = (all) ? /([^\W_]+[^\s-]*) */g : /([^\W_]+[^\s-]*)/;
        return (!!input) ? input.replace(reg, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }) : '';
    };
});
firstapp.filter('boldElements', function () {
    return function (input) {
        var textArr = _.split(input, ",");
        var retText = "";
        _.each(textArr, function (n, key) {
            if (key % 2 == 1) {
                retText = retText + "<b>" + n + "</b>, "
            } else {
                retText = retText + n + ", "
            }
        });

        retText = retText.substr(0, retText.length - 2);
        return retText;
    };
});

firstapp.config(function ($translateProvider) {
    $translateProvider.translations('en', LanguageEnglish);
    $translateProvider.translations('hi', LanguageHindi);
    $translateProvider.preferredLanguage('en');
});

firstapp.directive('alphaNumeric', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                var transformedInput = text.replace(/[^0-9a-zA-Z]/g, '');
                if (transformedInput !== text) {
                    ngModelCtrl.$setViewValue(transformedInput);
                    ngModelCtrl.$render();
                }
                return transformedInput; // or return Number(transformedInput)
            }
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
});