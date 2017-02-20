var globalfunction = {};
angular.module('phonecatControllers', ['templateservicemod', 'navigationservice', 'assignmenttemplate', 'ui.bootstrap', 'ui.select', 'ngAnimate', 'toastr', 'ngSanitize', 'angular-flexslider', 'ui.tinymce', 'imageupload', 'ngMap', 'toggle-switch', 'cfp.hotkeys', 'ui.sortable', 'infinite-scroll', 'dragularModule'])

    .controller('DashboardCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, base64) {
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

    })

    .controller('AccessController', function ($scope, $window, TemplateService, NavigationService, $timeout, $state) {
        if ($.jStorage.get("accessToken")) {

        } else {
            $state.go("login");
        }
    })

    .controller('LoginCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $stateParams, $state) {
        //Used to name the .html file

        $scope.menutitle = NavigationService.makeactive("Login");
        TemplateService.title = $scope.menutitle;
        $scope.currentHost = window.location.origin;
        if ($stateParams.id) {
            NavigationService.parseAccessToken($stateParams.id, function () {
                NavigationService.profile(function () {
                    $state.go("dashboard");
                }, function () {
                    $state.go("login");
                });
            });
        } else {
            NavigationService.removeAccessToken();
        }

    })


    .controller('BranchListCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("branch-list");
        $scope.menutitle = NavigationService.makeactive("Branch List");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.currentPage = $stateParams.page;
        var i = 0;
        $scope.search = {
            keyword: ""
        };
        if ($stateParams.keyword) {
            $scope.search.keyword = $stateParams.keyword;
        }
        $scope.showAllCountries = function (keywordChange) {
            $scope.totalItems = undefined;
            if (keywordChange) {
                $scope.currentPage = 1;
            }
            NavigationService.searchBranch({
                page: $scope.currentPage,
                keyword: $scope.search.keyword
            }, ++i, function (data, ini) {
                if (ini == i) {
                    $scope.allBranch = data.data.results;
                    $scope.totalItems = data.data.total;
                    $scope.maxRow = data.data.options.count;
                }
            });
        };
        $scope.cancel = function () {
            $window.history.back();
        };
        $scope.changePage = function (page) {
            var goTo = "branch-list";
            if ($scope.search.keyword) {
                goTo = "branch-list";
            }
            $state.go(goTo, {
                page: page,
                keyword: $scope.search.keyword
            });
        };
        $scope.showAllCountries();
        $scope.deleteBranch = function (id) {
            globalfunction.confDel(function (value) {
                console.log(value);
                if (value) {
                    NavigationService.deleteBranch(id, function (data) {
                        if (data.value) {
                            $scope.showAllCountries();
                            toastr.success("Branch deleted successfully.", "Branch deleted");
                        } else {
                            toastr.error("There was an error while deleting Branch", "Branch deleting error");
                        }


                    });
                }
            });
        };
    })

    .controller('CountryCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $state, $stateParams, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("country-list");
        $scope.menutitle = NavigationService.makeactive("Country List");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.currentPage = $stateParams.page;
        var i = 0;
        $scope.search = {
            keyword: ""
        };
        if ($stateParams.keyword) {
            $scope.search.keyword = $stateParams.keyword;
        }
        $scope.showAllCountries = function (keywordChange) {
            $scope.totalItems = undefined;
            if (keywordChange) {
                $scope.currentPage = 1;
            }
            NavigationService.searchCountry({
                page: $scope.currentPage,
                keyword: $scope.search.keyword
            }, ++i, function (data, ini) {
                if (ini == i) {
                    $scope.countries = data.data.results;
                    $scope.totalItems = data.data.total;
                    $scope.maxRow = data.data.options.count;
                }
            });
        };
        $scope.cancel = function () {
            $window.history.back();
        };
        $scope.changePage = function (page) {
            var goTo = "country-list";
            if ($scope.search.keyword) {
                goTo = "country-list";
            }
            $state.go(goTo, {
                page: page,
                keyword: $scope.search.keyword
            });
        };
        $scope.showAllCountries();
        $scope.deleteCountry = function (id) {
            globalfunction.confDel(function (value) {
                console.log(value);
                if (value) {
                    NavigationService.deleteCountry(id, function (data) {
                        if (data.value) {
                            $scope.showAllCountries();
                            toastr.success("Country deleted successfully.", "Country deleted");
                        } else {
                            toastr.error("There was an error while deleting country", "Country deleting error");
                        }


                    });
                }
            });
        };
    })
    .controller('ModelViewCtrl', function ($scope, $window, hotkeys, TemplateService, NavigationService, $timeout, $state, $stateParams, toastr, $uibModal) {
        //Used to name the .html file        
        $scope.modelCamel = _.camelCase($stateParams.model);
        var a = _.startCase($scope.modelCamel).split(" ");
        $scope.ModelApi = "";
        _.each(a, function (n) {
            $scope.ModelApi = $scope.ModelApi + n;
        });
        var ownerId = "";
        $scope.ownersId = "";
        NavigationService.getLoginEmployee($.jStorage.get("profile").email, function (data) {
            ownerId = data.data._id;
            $scope.ownersId = data.data._id;
            console.log("In $scope.ownersId", $scope.ownersId);
        });
        console.log("stateparams", $stateParams);
        $scope.filter = {};
        if ($stateParams.timelineStatus) {
            $scope.filter.timelineStatus = $stateParams.timelineStatus;
        } else {
            $scope.filter.timelineStatus = "All";
        }
        if ($stateParams.owner) {
            $scope.filter.owner = $stateParams.owner;
        } else {
            $scope.filter.owner = "";
        }
        if ($stateParams.ownerId) {
            $scope.filter.ownerId = $stateParams.ownerId;
        } else {
            $scope.filter.ownerId = ownerId;
        }
        if ($stateParams.ownerStatus) {
            $scope.filter.ownerStatus = $stateParams.ownerStatus;
        } else {
            $scope.filter.ownerStatus = "My files";
        }
        if ($stateParams.name) {
            $scope.filter.name = $stateParams.name;
        } else {
            $scope.filter.name = "";
        }
        if ($stateParams.city) {
            $scope.filter.city = $stateParams.city;
        } else {
            $scope.filter.city = "";
        }
        if ($stateParams.insurer) {
            $scope.filter.insurer = $stateParams.insurer;
        } else {
            $scope.filter.insurer = "";
        }
        if ($stateParams.insurerd) {
            $scope.filter.insurerd = $stateParams.insurerd;
        } else {
            $scope.filter.insurerd = "";
        }
        if ($stateParams.from) {
            $scope.filter.from = $stateParams.from;
        } else {
            $scope.filter.from = "";
        }

        if ($stateParams.to) {
            $scope.filter.to = $stateParams.to;
        } else {
            $scope.filter.to = "";
        }
        if ($stateParams.fromDate) {
            $scope.filter.fromDate = $stateParams.fromDate;
        } else {
            $scope.filter.fromDate = "";
        }
        if ($stateParams.toDate) {
            $scope.filter.toDate = $stateParams.toDate;
        } else {
            $scope.filter.toDate = "";
        }
        if ($stateParams.department) {
            $scope.filter.department = $stateParams.department;
        } else {
            $scope.filter.department = "";
        }

        $scope.MyFiles = function () {
            console.log("In MyFiles", ownerId);
            NavigationService.searchModel($scope.ModelApi, {
                page: $scope.currentPage,
                keyword: $scope.search.keyword,
                filter: {
                    owner: ownerId
                }
            }, ++i, function (data, ini) {
                if (ini == i) {
                    $scope.modelList = data.data.results;
                    $scope.totalItems = data.data.total;
                    $scope.maxRow = data.data.options.count;
                    console.log("modelList", $scope.modelList);
                }
            });
        };
        hotkeys.bindTo($scope).add({
            combo: 'enter',
            description: 'This one goes to 11',
            callback: function () {
                $state.go("create" + $scope.modelCamel);
            }
        });
        $scope.modelCap = _.capitalize($stateParams.model);
        $scope.modelLow = _.lowerCase($stateParams.model);
        $scope.template = TemplateService.changecontent($scope.modelCamel + "-list");
        $scope.menutitle = NavigationService.makeactive($scope.modelCap + " List");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.currentPage = $stateParams.page;
        var i = 0;
        //  
        // 
        $scope.search = {
            keyword: ""
        };
        if ($stateParams.keyword) {
            $scope.search.keyword = $stateParams.keyword;
        }

        // 
        console.log("OwnerId", ownerId);

        $scope.showAll = function (keywordChange) {
            $scope.totalItems = undefined;
            if (keywordChange) {
                $scope.currentPage = 1;
            }
            NavigationService.searchModel($scope.ModelApi, {
                page: $scope.currentPage,
                keyword: $scope.search.keyword,
            }, ++i, function (data, ini) {
                if (ini == i) {
                    $scope.modelList = data.data.results;
                    $scope.totalItems = data.data.total;
                    $scope.maxRow = data.data.options.count;
                    console.log("modelList", $scope.modelList);
                }
            });
        };
        $scope.showAssignment = function (keywordChange) {
            console.log("keywordChange", keywordChange);
            $scope.totalItems = undefined;
            if (keywordChange) {
                $scope.currentPage = 1;
            }
            console.log("$scope.timelineStatus", $scope.filter.timelineStatus);
            NavigationService.getLoginEmployee($.jStorage.get("profile").email, function (data) {
                ownerId = data.data._id;
                // $scope.ownersId = data.data._id;
                console.log("In $scope.ownersId", ownerId);
                NavigationService.getAllAssignment($scope.ModelApi, {
                    pagenumber: $scope.currentPage,
                    pagelimit: 10,
                    timelineStatus: $scope.filter.timelineStatus,
                    ownerStatus: $scope.filter.ownerStatus,
                    name: $scope.filter.name,
                    owner: $scope.filter.owner,
                    ownerId: ownerId,
                    city: $scope.filter.city,
                    insurer: $scope.filter.insurer,
                    insurerd: $scope.filter.insurerd,
                    from: $scope.filter.from,
                    to: $scope.filter.to,
                    department: $scope.department
                }, ++i, function (data, ini) {
                    if (ini == i) {
                        $scope.modelList = data.data.results;
                        $scope.totalItems = data.data.total;
                        $scope.maxRow = 10;
                        console.log("modelList", $scope.modelList, $scope.totalItems);
                    }
                });
            });

        };

        $scope.changePages = function (page, filter) {
            // console.log("In Change Page", filter);
            var goTo = $scope.modelCamel + "-list";
            if ($scope.search.keyword) {
                goTo = $scope.modelCamel + "-list";
            }
            $state.go(goTo, {
                page: page,
                timelineStatus: filter.timelineStatus,
                ownerStatus: filter.ownerStatus,
                name: filter.name,
                owner: filter.owner,
                ownerId: ownerId,
                city: filter.city,
                insurer: filter.insurer,
                insurerd: filter.insurerd,
                from: filter.from,
                to: filter.to,
                department: filter.department
            });
        };

        $scope.cancel = function () {
            console.log("Model");
            $window.history.back();
        };
        $scope.changePage = function (page) {
            console.log("In Change Page", $scope.filter);
            var goTo = $scope.modelCamel + "-list";
            if ($scope.search.keyword) {
                goTo = $scope.modelCamel + "-list";
            }
            $state.go(goTo, {
                page: page,
                keyword: $scope.search.keyword
            });
        };

        if ($stateParams.model === "assignment") {
            $scope.showAssignment();
        } else {
            $scope.showAll();
        }
        $scope.deleteModel = function (id) {
            console.log("Delete Id", id);
            globalfunction.confDel(function (value) {
                console.log("Delete value", value);
                if (value) {
                    console.log("$scope.ModelApi", $scope.ModelApi);
                    NavigationService.deleteModel($scope.ModelApi, id, function (data) {
                        if (data.value) {
                            if ($stateParams.model === "assignment") {
                                $scope.showAssignment();
                            } else {
                                $scope.showAll();
                            }
                            toastr.success($scope.modelCap + " deleted successfully.", $scope.modelCap + " deleted");
                        } else {
                            toastr.error("There was an error while deleting " + $scope.modelCap, $scope.modelCap + " deleting error");
                        }


                    });
                }
            });
        };

        $scope.changeStatus = function (ind) {
            NavigationService.modelSave($scope.ModelApi, ind, function (data) {
                if (data.value === true) {}
            });
        };

        $scope.assignmentFilter = function () {
            var modalInstance = $uibModal.open({
                scope: $scope,
                templateUrl: '/frontend/views/modal/assignment-filter.html',
                size: 'lg'
            });
        }
        $scope.doFilter = function (data) {
            console.log("Form Data To Filter", data);
            // NavigationService.filterAssignment(data,function(data){
            //     if(data.value === true){

            //     }else{

            //     }
            // })
        }
    })


    .controller('KnowledgeBaseViewCtrl', function ($scope, $window, hotkeys, TemplateService, NavigationService, $timeout, $state, $stateParams, toastr) {
        //Used to name the .html file        
        $scope.modelCamel = _.camelCase($stateParams.model);
        var a = _.startCase($scope.modelCamel).split(" ");
        $scope.ModelApi = "";
        _.each(a, function (n) {
            $scope.ModelApi = $scope.ModelApi + n;
        });


        hotkeys.bindTo($scope).add({
            combo: 'enter',
            description: 'This one goes to 11',
            callback: function () {
                $state.go("create" + $scope.modelCamel);
            }
        });

        $scope.modelCap = _.capitalize($stateParams.model);
        $scope.modelLow = _.lowerCase($stateParams.model);

        $scope.template = TemplateService.changecontent($scope.modelCamel + "-list");
        $scope.menutitle = NavigationService.makeactive($scope.modelCap + " List");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.currentPage = $stateParams.page;
        var i = 0;
        //  
        // 
        $scope.search = {
            keyword: ""
        };
        if ($stateParams.keyword) {
            $scope.search.keyword = $stateParams.keyword;
        }
        $scope.getAllTags = function () {
            NavigationService.searchModel("Tag", {}, 0, function (data) {
                $scope.tags = data.data.results;
            });
        };
        $scope.getAllTags();

        var newTag = 7091990;

        // 
        $scope.showAll = function (keywordChange, tagId) {
            $scope.totalItems = undefined;
            if (keywordChange) {
                $scope.currentPage = 1;
            }
            var filterObj = {
                page: $scope.currentPage,
                keyword: $scope.search.keyword
            };
            if (tagId) {
                newTag = tagId;
            }
            if (newTag != 7091990) {
                filterObj.filter = {
                    tag: newTag
                }
            }
            NavigationService.searchKnowledgeBase($scope.ModelApi, filterObj, ++i, function (data, ini) {
                if (ini == i) {
                    $scope.modelList = data.data.results;
                    $scope.totalItems = data.data.total;
                    $scope.maxRow = data.data.options.count;
                    console.log("modelList", $scope.modelList);
                }
            });
        };
        $scope.cancel = function () {
            $window.history.back();
        };
        $scope.changePage = function (page) {
            var goTo = $scope.modelCamel + "-list";
            if ($scope.search.keyword) {
                goTo = $scope.modelCamel + "-list";
            }
            $state.go(goTo, {
                page: page,
                keyword: $scope.search.keyword
            });
        };
        $scope.showAll();


        $scope.deleteModel = function (id) {
            console.log("Delete Id", id);
            globalfunction.confDel(function (value) {
                console.log("Delete value", value);
                if (value) {
                    console.log("$scope.ModelApi", $scope.ModelApi);
                    NavigationService.deleteModel($scope.ModelApi, id, function (data) {
                        if (data.value) {
                            $scope.showAll();
                            toastr.success($scope.modelCap + " deleted successfully.", $scope.modelCap + " deleted");
                        } else {
                            toastr.error("There was an error while deleting " + $scope.modelCap, $scope.modelCap + " deleting error");
                        }


                    });
                }
            });
        };

        $scope.changeStatus = function (ind) {
            NavigationService.modelSave($scope.ModelApi, ind, function (data) {
                if (data.value === true) {}
            });
        };
    })





    .controller('CreateModelCtrl', function ($scope, hotkeys, $window, TemplateService, NavigationService, $timeout, $state, toastr, $stateParams) {
        //Used to name the .html file
        $scope.modelCamel = _.camelCase($stateParams.model);
        var a = _.startCase($scope.modelCamel).split(" ");
        $scope.ModelApi = "";
        _.each(a, function (n) {
            $scope.ModelApi = $scope.ModelApi + n;
        });

        $scope.modelCap = _.capitalize($stateParams.model);
        $scope.modelLow = _.lowerCase($stateParams.model);
        $scope.template = TemplateService.changecontent($scope.modelCamel + "-detail");
        $scope.menutitle = NavigationService.makeactive($scope.modelCap);
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.header = {
            "name": "Create " + $scope.modelCap
        };

        // FOR EMPLOYEE
        $scope.userStatus = [{
            "name": "Active",
            "value": true
        }, {
            "name": "Inactive",
            "value": false
        }];
        $scope.salutations = ["Mr.", "Mrs.", "Ms.", "Dr."];
        $scope.houseColors = ["Red", "Green", "Blue", "Yellow", "White"];

        $scope.dateOptions = {
            showWeeks: true
        };

        $scope.popup = {
            to: false,
            from: false,
            toReciept: false,
            fromReciept: false,
            toCertificate: false,
            fromCertificate: false,
            toLicense: false,
            fromLicense: false,
            birthDate: false,
            marriageDate: false,
            joiningDate: false,
            leavingDate: false
        };


        $scope.format = 'dd-MMMM-yyyy';

        // FOR EMPLOYEE

        $scope.formData = {};
        $scope.formData.status = true;
        $scope.cancel = function () {
            $window.history.back();
        };
        hotkeys.bindTo($scope).add({
            combo: 'ctrl+enter',
            callback: function (formData) {
                NavigationService.modelSave($scope.ModelApi, $scope.formData, function (data) {
                    if (data.value === true) {
                        $window.history.back();
                        toastr.success($scope.modelCap + " " + formData.name + " created successfully.", $scope.modelCap + " Created");
                    } else {
                        toastr.error($scope.modelCap + " creation failed.", $scope.modelCap + " creation error");
                    }
                });
            }
        });
        $scope.saveModel = function (formData) {
            NavigationService.modelSave($scope.ModelApi, $scope.formData, function (data) {
                if (data.value === true) {
                    $window.history.back();
                    toastr.success($scope.modelCap + " " + formData.name + " created successfully.", $scope.modelCap + " Created");
                } else {
                    toastr.error($scope.modelCap + " creation failed.", $scope.modelCap + " creation error");
                }
            });
        };

    })

    .controller('EditModelCtrl', function ($scope, hotkeys, $window, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr, $uibModal) {
        $scope.modelCamel = _.camelCase($stateParams.model);
        var a = _.startCase($scope.modelCamel).split(" ");
        $scope.ModelApi = "";
        _.each(a, function (n) {
            $scope.ModelApi = $scope.ModelApi + n;
        });
        $scope.modelCap = _.capitalize($stateParams.model);
        $scope.modelLow = _.lowerCase($stateParams.model);
        $scope.template = TemplateService.changecontent($scope.modelCamel + "-detail");
        $scope.menutitle = NavigationService.makeactive($scope.modelCap);
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.formData = {};
        $scope.header = {
            "name": "Edit " + $scope.modelCap
        };
        $scope.salutations = ["Mr.", "Mrs.", "Ms.", "Dr."];


        NavigationService.getOneModel($scope.ModelApi, $stateParams.id, function (data) {
            $scope.formData = data.data;
            if (data.data.city) {
                $scope.formData.country = data.data.city.district.state.zone.country._id;
                $scope.formData.zone = data.data.city.district.state.zone._id;
                $scope.formData.state = data.data.city.district.state._id;
                $scope.formData.district = data.data.city.district._id;
                $scope.formData.city = data.data.city._id;
            }
        });
        $scope.cancel = function () {
            $window.history.back();
        };
        hotkeys.bindTo($scope).add({
            combo: 'ctrl+enter',
            callback: function (formData) {
                NavigationService.modelSave($scope.ModelApi, $scope.formData, function (data) {
                    if (data.value === true) {
                        $window.history.back();
                        toastr.success($scope.modelCap + $scope.formData.name + " edited successfully.", $scope.modelCap + " Edited");
                    } else {
                        toastr.error($scope.modelCap + " edition failed.", $scope.modelCap + " editing error");
                    }
                });
            }
        });
        $scope.saveModel = function (formValid) {
            NavigationService.modelSave($scope.ModelApi, $scope.formData, function (data) {
                if (data.value === true) {
                    $window.history.back();
                    toastr.success($scope.modelCap + $scope.formData.name + " edited successfully.", $scope.modelCap + " Edited");
                } else {
                    toastr.error($scope.modelCap + " edition failed.", $scope.modelCap + " editing error");
                }
            });
        };


        //  FOR LIST OF ARRAY STARTS
        $scope.formData.officers = [];
        $scope.addOfficer = function () {
            var modalInstance = $uibModal.open({
                scope: $scope,
                templateUrl: '/frontend/views/modal/modal-officer.html',
                size: 'lg'
            });
        };
        $scope.$watch("modelData.from", function (newVal, oldVal) {

            console.log("OLD DATA");
            $scope.abc();
        });
        $scope.$watch("modelData.to", function (newVal, oldVal) {
            $scope.abc();
        });
        $scope.abc = function (modalData) {
            console.log("IIIIIIIIIIIIIIINNNNNNNNNNNNN");
            console.log("Data", modalData);
        };
        $scope.createOfficer = function (modelData) {
            $scope.formData.officers.push(modelData);
            console.log($scope.formData);
        };
        //  FOR LIST OF ARRAY ENDS

    })


    .controller('CreateCountryCtrl', function ($scope, hotkeys, $window, TemplateService, NavigationService, $timeout, $state, toastr) {
        //Used to name the .html file

        $scope.template = TemplateService.changecontent("country-detail");
        $scope.menutitle = NavigationService.makeactive("Country");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "Create Country"
        };
        $scope.formData = {};
        $scope.cancel = function () {
            $window.history.back();
        };
        hotkeys.bindTo($scope).add({
            combo: 'ctrl+enter',
            callback: function (formData) {
                NavigationService.countrySave($scope.formData, function (data) {
                    if (data.value === true) {
                        // $state.go('country-list');
                        $window.history.back();
                        toastr.success("Country " + formData.name + " created successfully.", "Country Created");
                    } else {
                        toastr.error("Country creation failed.", "Country creation error");
                    }
                });
            }
        });
        $scope.saveCountry = function (formData) {
            console.log($scope.formData);
            NavigationService.countrySave($scope.formData, function (data) {
                if (data.value === true) {
                    // $state.go('country-list');
                    $window.history.back();
                    toastr.success("Country " + formData.name + " created successfully.", "Country Created");
                } else {
                    toastr.error("Country creation failed.", "Country creation error");
                }
            });
        };

    })

    .controller('CreateInvoiceExpenditureCtrl', function ($scope, hotkeys, $window, TemplateService, NavigationService, $timeout, $state, toastr, $uibModal) {
        //Used to name the .html file

        $scope.template = TemplateService.changecontent("invoiceExpenditure-detail");
        $scope.menutitle = NavigationService.makeactive("InvoiceExpenditure");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "Create Invoice Expenditure"
        };
        $scope.formData = {};
        $scope.formData.rateArray = [];
        $scope.cancel = function () {
            $window.history.back();
        };
        hotkeys.bindTo($scope).add({
            combo: 'ctrl+enter',
            callback: function (formData) {
                NavigationService.invoiceExpenditureSave($scope.formData, function (data) {
                    if (data.value === true) {
                        $window.history.back();
                        toastr.success("InvoiceExpenditure " + formData.name + " created successfully.", "InvoiceExpenditure Created");
                    } else {
                        toastr.error("InvoiceExpenditure creation failed.", "InvoiceExpenditure creation error");
                    }
                });
            }
        });

        $scope.addModal = function (filename, index, holdobj, data, current, wholeObj) {
            if (index !== "") {
                $scope.modalData = data;
                $scope.modalIndex = index;
                $scope.modalData.validFrom = new Date(data.validFrom);
                $scope.modalData.validTo = new Date(data.validTo);
            } else {
                $scope.modalData = {};
                $scope.modalIndex = "";
            }
            $scope.wholeObj = wholeObj;
            $scope.current = current;
            $scope.holdObject = holdobj;
            var modalInstance = $uibModal.open({
                scope: $scope,
                templateUrl: '/frontend/views/modal/' + filename + '.html',
                size: 'lg'
            });
        };

        $scope.addElements = function (moddata) {
            if ($scope.modalIndex !== "") {
                $scope.formData.rate = moddata.rate;
                $scope.wholeObj[$scope.modalIndex] = moddata;
            } else {
                $scope.newjson = moddata;
                var a = moddata;
                switch ($scope.holdObject) {
                    case "rateArray":
                        $scope.formData.rate = moddata.rate;
                        $scope.formData.rateArray.push(moddata);
                        break;
                    default:
                        {
                            $scope.wholeObj.push($scope.newjson);
                        }
                }
            }
        };

        $scope.deleteElements = function (index, data) {
            data.splice(index, 1);
        };

        $scope.saveInvoiceExpenditure = function (formData) {
            console.log($scope.formData);
            NavigationService.invoiceExpenditureSave($scope.formData, function (data) {
                if (data.value === true) {
                    $window.history.back();
                    toastr.success("InvoiceExpenditure " + formData.name + " created successfully.", "InvoiceExpenditure Created");
                } else {
                    toastr.error("InvoiceExpenditure creation failed.", "InvoiceExpenditure creation error");
                }
            });
        };

    })

    .controller('EditInvoiceExpenditureCtrl', function ($scope, hotkeys, $window, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr, $uibModal) {
        //Used to name the .html file

        $scope.template = TemplateService.changecontent("invoiceExpenditure-detail");
        $scope.menutitle = NavigationService.makeactive("InvoiceExpenditure");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.formData = {};
        $scope.formData.rateArray = [];

        $scope.header = {
            "name": "Edit Country"
        };

        NavigationService.getOneinvoiceExpenditure($stateParams.id, function (data) {
            $scope.formData = data.data;
            console.log('$scope.oneCountry', $scope.oneCountry);

        });
        $scope.cancel = function () {
            $window.history.back();
        };

        $scope.addModal = function (filename, index, holdobj, data, current, wholeObj) {
            if (index !== "") {
                $scope.modalData = data;
                $scope.modalIndex = index;
                $scope.modalData.validFrom = new Date(data.validFrom);
                $scope.modalData.validTo = new Date(data.validTo);
            } else {
                $scope.modalData = {};
                $scope.modalIndex = "";
            }
            $scope.wholeObj = wholeObj;
            $scope.current = current;
            $scope.holdObject = holdobj;
            var modalInstance = $uibModal.open({
                scope: $scope,
                templateUrl: '/frontend/views/modal/' + filename + '.html',
                size: 'lg'
            });
        };

        $scope.addElements = function (moddata) {
            if ($scope.modalIndex !== "") {
                $scope.formData.rate = moddata.rate;
                $scope.wholeObj[$scope.modalIndex] = moddata;
            } else {
                $scope.newjson = moddata;
                var a = moddata;
                switch ($scope.holdObject) {
                    case "rateArray":
                        $scope.formData.rate = moddata.rate;
                        $scope.formData.rateArray.push(moddata);
                        break;
                    default:
                        {
                            $scope.wholeObj.push($scope.newjson);
                        }
                }
            }
        };

        $scope.deleteElements = function (index, data) {
            data.splice(index, 1);
        };

        hotkeys.bindTo($scope).add({
            combo: 'ctrl+enter',
            callback: function (formData) {
                NavigationService.invoiceExpenditureSave($scope.formData, function (data) {
                    if (data.value === true) {
                        $window.history.back();
                        console.log("Check this one");
                        toastr.success("InvoiceExpenditure " + $scope.formData.name + " edited successfully.", "InvoiceExpenditure Edited");
                    } else {
                        toastr.error("InvoiceExpenditure edition failed.", "InvoiceExpenditure editing error");
                    }
                });
            }
        });



        $scope.saveInvoiceExpenditure = function (formValid) {
            NavigationService.invoiceExpenditureSave($scope.formData, function (data) {
                if (data.value === true) {
                    $window.history.back();
                    console.log("Check this one");
                    toastr.success("InvoiceExpenditure " + $scope.formData.name + " edited successfully.", "InvoiceExpenditure Edited");
                } else {
                    toastr.error("InvoiceExpenditure edition failed.", "InvoiceExpenditure editing error");
                }
            });
        };

    })


    .controller('CreateAssignmentCtrl', function ($scope, $window, TemplateService, hotkeys, NavigationService, $filter, $timeout, $state, toastr, $stateParams, $uibModal) {
        //Used to name the .html file

        $scope.template = TemplateService.changecontent("assignment-detail");
        $scope.menutitle = NavigationService.makeactive("Assignment");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.header = {
            "name": "Create Assignment"
        };
        $scope.a = function () {
            console.log("CTRL + ENTER");
        }
        $scope.hideSaveCancel = false;
        $scope.formData = {};
        $scope.formData.status = true;
        $scope.formData.appointment = $stateParams.pdf;
        $scope.formData.invoice = [];
        $scope.formData.products = [];
        $scope.formData.LRs = [];
        $scope.formData.vehicleNumber = [];
        $scope.formData.others = [];
        $scope.formData.shareWith = [];
        $scope.formData.locationArr = [];
        $scope.formData.product = [];
        $scope.modalData = {};
        $scope.modalIndex = "";
        $scope.wholeObj = [];
        $scope.ownerEmail = {};
        $scope.addModels = function (dataArray, data) {
            dataArray.push(data);
        };
        $scope.formData.isInsured = true;
        $scope.formData.typeOfClaim = true;
        // cancel
        $scope.cancel = function () {
            $window.history.back();
        };
        $scope.dateOfAppointmentLimit = {
            maxDate: new Date()
        };

        hotkeys.bindTo($scope).add({
            combo: 'ctrl+enter',
            callback: function (formData) {
                $scope.hideSaveCancel = true;
                NavigationService.assignmentSave($scope.formData, function (data) {
                    console.log(data);
                    if (data.value === true) {

                        // $state.go('assignment-list');
                        $window.history.back();
                        toastr.success("Assignment " + data.data.name + " created successfully.", "Assignment Created");
                    } else {
                        $scope.hideSaveCancel = false;
                        toastr.error("Assignment creation failed, " + data.error.message + ".", "Assignment creation error");
                    }
                });
            }
        });


        $scope.populateAddress = function (data) {
            console.log("In Populate");
            var formdata = {};
            formData.zone = data;
            console.log("Form Data", formData);
        };


        //  CLONE ASSIGNMENT
        if ($stateParams.assignment) {
            NavigationService.getOneModel("Assignment", $stateParams.assignment, function (data) {
                $scope.formData = data.data;
                delete $scope.formData._id;
                delete $scope.formData.appointment;
                delete $scope.formData.intimatedLoss;
                delete $scope.formData.city;
                delete $scope.formData.address;
                delete $scope.formData.pincode;
                delete $scope.formData.lat;
                delete $scope.formData.lng;
                $scope.formData.products = [];
                $scope.formData.invoice = [];
                $scope.formData.LRs = [];
                $scope.formData.vehicleNumber = [];
                $scope.formData.others = [];
                $scope.formData.product = [];
                $scope.formData.locationArr = [];
                delete $scope.formData.siteNumber;
                delete $scope.formData.siteMobile;
                delete $scope.formData.siteEmail;
                delete $scope.formData.name;
                delete $scope.formData.name1;
            });
        }

        NavigationService.searchCompany({}, 1, function (data) {
            $scope.formData.company = data.data.results[0]._id;
        });
        //$scope.ownerEmail = $.jStorage.get("profile").email;
        var owner = $.jStorage.get("profile").email;
        console.log("owner : ", $scope.ownerEmail);
        NavigationService.getEmployeeOfficeEmail({
            officeEmail: owner
        }, 1, function (data) {
            $scope.formData.ownerid = data.data._id;
            // $scope.formData.owner = data.data.name;
            $scope.formData.owner = data.data.officeEmail;
            console.log("formdata : ", $scope.formData.owner);

        });
        // $scope.formData.owner = $scope.ownerEmail;
        console.log("formdata ownerid : ", $scope.formData.ownerid);

        console.log($stateParams);
        if ($stateParams.emailId) {

            NavigationService.detailEmail({
                "messageId": $stateParams.emailId
            }, function (data) {
                var doa = moment(parseInt(data.data.internalDate));
                $scope.formData.dateOfAppointment = new Date(doa);
            });
        }

        $scope.refreshShareWith = function (data, office) {
            var formdata = {};
            formdata.keyword = data;
            NavigationService.getBackendEmployee(formdata, 1, function (data) {
                $scope.shareWith = data.data.results;
            });
        };
        $scope.refreshNature = function (data, causeloss) {
            var formdata = {};
            formdata.keyword = data;
            formdata.filter = {
                "_id": causeloss
            };
            NavigationService.getNatureLoss(formdata, 1, function (data) {
                console.log("getNatureLoss", data.data.results);
                $scope.natureLoss = data.data.results;
            });
        };
        $scope.$watch("formData.causeOfLoss", function (newVal, oldVal) {

            console.log(newVal);
            $scope.refreshNature("", newVal);
        });

        $scope.addModal = function (filename, index, holdobj, data, current, wholeObj) {
            if (index !== "") {
                $scope.modalData = data;
                $scope.modalIndex = index;
            } else {
                $scope.modalData = {};
                $scope.modalIndex = "";
            }
            $scope.wholeObj = wholeObj;
            $scope.current = current;
            $scope.holdObject = holdobj;
            if (data === "datefilter") {
                $scope.dateOptions = {
                    maxDate: new Date()
                }
            }
            console.log(filename);
            var modalInstance = $uibModal.open({
                scope: $scope,
                templateUrl: '/frontend/views/modal/' + filename + '.html',
                size: 'lg'
            });
        };

        $scope.addElements = function (moddata) {
            if ($scope.modalIndex !== "") {
                console.log("In Assignment if", moddata);
                $scope.wholeObj[$scope.modalIndex] = moddata;
            } else {
                console.log("In Assignment else", moddata);
                $scope.newjson = moddata;
                console.log("$scope.newjson", $scope.newjson);
                var a = moddata;
                switch ($scope.holdObject) {
                    case "invoice":
                        {
                            var newmod = a.invoiceNumber.split(',');
                            _.each(newmod, function (n) {
                                $scope.newjson.invoiceNumber = n;
                                $scope.wholeObj.push($scope.newjson);
                            });
                        }
                        break;
                    case "products":
                        {
                            var newmod1 = a.item.split(',');
                            _.each(newmod1, function (n) {
                                $scope.newjson.item = n;
                                $scope.wholeObj.push($scope.newjson);
                            });
                        }
                        break;
                    case "LRs":
                        var newmod2 = a.lrNumber.split(',');
                        _.each(newmod2, function (n) {
                            $scope.newjson.lrNumber = n;
                            $scope.wholeObj.push($scope.newjson);
                        });
                        break;
                    case "Vehicle":
                        var newmod3 = a.vehicleNumber.split(',');
                        _.each(newmod3, function (n) {
                            $scope.newjson.vehicleNumber = n;
                            $scope.wholeObj.push($scope.newjson);
                        });
                        break;
                    case "Location":
                        $scope.formData.locationArr.push(moddata);
                        break;
                    case "Product":
                        $scope.formData.product.push(moddata);
                        break;
                    default:
                        {
                            $scope.wholeObj.push($scope.newjson);
                        }

                }

            }
        };

        $scope.deleteElements = function (index, data) {
            data.splice(index, 1);
        };


        $scope.submit = function (formData) {
            delete formData._id;
            $scope.hideSaveCancel = true;
            NavigationService.assignmentSave($scope.formData, function (data) {
                console.log(data);
                if (data.value === true) {
                    // $state.go('assignment-list');
                    $window.history.back();
                    toastr.success("Assignment " + data.data.name + " created successfully.", "Assignment Created");
                } else {
                    $scope.hideSaveCancel = false;
                    toastr.error("Assignment  creation failed," + data.error.message + ".", "Assignment creation error");
                }
            });

        };

    })
    .controller('EditAssignmentCtrl', function ($scope, $window, hotkeys, TemplateService, NavigationService, $timeout, $state, toastr, $stateParams, $uibModal, $filter) {
        //Used to name the .html file

        $scope.template = TemplateService.changecontent("assignment-detail");
        $scope.menutitle = NavigationService.makeactive("Assignment");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.header = {
            "name": "Edit Assignment"
        };
        $scope.name = {};
        $scope.msg = "";
        $scope.MRnumber = "";
        $scope.formData = {};
        $scope.formData.status = true;
        $scope.formData.invoice = [];
        $scope.formData.products = [];
        $scope.formData.LRs = [];
        $scope.formData.vehicleNumber = [];
        $scope.formData.others = [];
        $scope.formData.shareWith = [];
        $scope.formData.product = [];
        $scope.formData.locationArr = [];
        $scope.modalData = {};
        $scope.modalIndex = "";
        $scope.wholeObj = [];
        $scope.addModels = function (dataArray, data) {
            dataArray.push(data);
        };

        $scope.dateOfAppointmentLimit = {
            maxDate: new Date()
        };
        // 
        hotkeys.bindTo($scope).add({
            combo: 'ctrl+enter',
            callback: function (formData) {
                console.log($scope.formData);
                NavigationService.assignmentSave($scope.formData, function (data) {
                    console.log(data);
                    if (data.value === true) {
                        // $state.go('assignment-list');
                        $window.history.back();
                        toastr.success("Assignment " + $scope.msg + " Edited successfully.", "Assignment Edited");
                    } else {
                        toastr.error("Assignment creation failed, " + data.error.message + ".", "Assignment creation error");
                    }
                });

            }
        });
        // 


        NavigationService.getOneModel("Assignment", $stateParams.id, function (data) {
            $scope.msg = data.data.name;
            $scope.formData = data.data;
            $scope.formData.dateOfLoss = new Date(data.data.dateOfLoss);
            $scope.formData.dateOfIntimation = new Date(data.data.dateOfIntimation);
            $scope.formData.dateOfAppointment = new Date(data.data.dateOfAppointment);
            $scope.formData.insuredOfficer = data.data.insuredOfficer._id;
            $scope.MRnumber = data.data.city.district.state.zone.country.countryCode;
            $scope.formData.country = data.data.city.district.state.zone.country._id;
            $scope.formData.zone = data.data.city.district.state.zone._id;
            $scope.formData.state = data.data.city.district.state._id;
            $scope.formData.district = data.data.city.district._id;
            $scope.formData.city = data.data.city._id;
        });

        // cancel


        $scope.refreshShareWith = function (data, office) {
            var formdata = {};
            formdata.keyword = data;
            NavigationService.getBackendEmployee(formdata, 1, function (data) {
                $scope.shareWith = data.data.results;
            });
        };

        $scope.refreshNature = function (data, causeloss) {
            var formdata = {};
            formdata.keyword = data;
            formdata.filter = {
                "_id": causeloss
            };
            NavigationService.getNatureLoss(formdata, 1, function (data) {
                $scope.natureLoss = data.data.results;
            });
        };
        $scope.$watch("formData.causeOfLoss", function (newVal, oldVal) {

            console.log(newVal);
            $scope.refreshNature("", newVal);
        });
        $scope.addModal = function (filename, index, holdobj, data, current, wholeObj) {
            if (index !== "") {
                $scope.modalData = data;
                $scope.modalIndex = index;
            } else {
                $scope.modalData = {};
                $scope.modalIndex = "";
            }
            $scope.wholeObj = wholeObj;
            $scope.current = current;
            $scope.holdObject = holdobj;
            var modalInstance = $uibModal.open({
                scope: $scope,
                templateUrl: '/frontend/views/modal/' + filename + '.html',
                size: 'lg'
            });
        };

        $scope.addElements = function (moddata) {
            console.log("moddata", moddata);
            if ($scope.modalIndex !== "") {
                $scope.wholeObj[$scope.modalIndex] = moddata;
            } else {
                $scope.newjson = moddata;
                var a = moddata;
                switch ($scope.holdObject) {
                    case "invoice":
                        {
                            var newmod = a.invoiceNumber.split(',');
                            _.each(newmod, function (n) {
                                $scope.newjson.invoiceNumber = n;
                                $scope.wholeObj.push($scope.newjson);
                            });
                        }
                        break;
                    case "products":
                        {
                            var newmod1 = a.item.split(',');
                            _.each(newmod1, function (n) {
                                $scope.newjson.item = n;
                                $scope.wholeObj.push($scope.newjson);
                            });
                        }
                        break;
                    case "LRs":
                        var newmod2 = a.lrNumber.split(',');
                        _.each(newmod2, function (n) {
                            $scope.newjson.lrNumber = n;
                            $scope.wholeObj.push($scope.newjson);
                        });
                        break;
                    case "Vehicle":
                        var newmod3 = a.vehicleNumber.split(',');
                        _.each(newmod3, function (n) {
                            $scope.newjson.vehicleNumber = n;
                            $scope.wholeObj.push($scope.newjson);
                        });
                        break;
                    case "Location":
                        $scope.formData.locationArr.push(moddata);
                        break;
                    case "Product":
                        $scope.formData.product.push(moddata);
                        break;
                    default:
                        {
                            $scope.wholeObj.push($scope.newjson);
                        }

                }

            }
        };

        $scope.deleteElements = function (index, data) {
            data.splice(index, 1);
        };


        $scope.submit = function (formData) {
            console.log($scope.formData);
            NavigationService.assignmentSave($scope.formData, function (data) {
                console.log(data);
                if (data.value === true) {
                    // $state.go('assignment-list');
                    $window.history.back();
                    toastr.success("Assignment " + $scope.msg + " Edited successfully.", "Assignment Edited");
                } else {
                    toastr.error("Assignment creation failed, " + data.error.message + ".", "Assignment creation error");
                }
            });

        };
        // Cancel
        $scope.cancel = function () {
            console.log("In Cancel");
            $window.history.back();
        };

    })

    .controller('EditCountryCtrl', function ($scope, hotkeys, $window, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr) {
        //Used to name the .html file

        $scope.template = TemplateService.changecontent("country-detail");
        $scope.menutitle = NavigationService.makeactive("Country");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "Edit Country"
        };

        NavigationService.getOneCountry($stateParams.id, function (data) {
            $scope.formData = data.data;
            console.log('$scope.oneCountry', $scope.oneCountry);

        });
        $scope.cancel = function () {
            $window.history.back();
        };
        hotkeys.bindTo($scope).add({
            combo: 'ctrl+enter',
            callback: function (formData) {
                NavigationService.countryEditSave($scope.formData, function (data) {
                    if (data.value === true) {
                        // $state.go('country-list');
                        $window.history.back();
                        console.log("Check this one");
                        toastr.success("Country " + $scope.formData.name + " edited successfully.", "Country Edited");
                    } else {
                        toastr.error("Country edition failed.", "Country editing error");
                    }
                });
            }
        });

        $scope.saveCountry = function (formValid) {
            NavigationService.countryEditSave($scope.formData, function (data) {
                if (data.value === true) {
                    // $state.go('country-list');
                    $window.history.back();
                    console.log("Check this one");
                    toastr.success("Country " + $scope.formData.name + " edited successfully.", "Country Edited");
                } else {
                    toastr.error("Country edition failed.", "Country editing error");
                }
            });
        };

    })



    .controller('OfficeCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("office-list");
        $scope.menutitle = NavigationService.makeactive("Office List");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.currentPage = $stateParams.page;
        var i = 0;
        $scope.search = {
            keyword: ""
        };
        if ($stateParams.keyword) {
            $scope.search.keyword = $stateParams.keyword;
        }
        $scope.showAllCountries = function (keywordChange) {
            $scope.totalItems = undefined;
            if (keywordChange) {
                $scope.currentPage = 1;
            }
            NavigationService.searchOffice({
                page: $scope.currentPage,
                keyword: $scope.search.keyword
            }, ++i, function (data, ini) {
                console.log(data.data);

                if (ini == i) {
                    console.log(data.data);
                    $scope.allOffices = data.data.results;
                    $scope.totalItems = data.data.total;
                    $scope.maxRow = data.data.options.count;
                }
            });
        };

        $scope.changePage = function (page) {
            console.log("1100", page);
            var goTo = "office-list";
            if ($scope.search.keyword) {
                goTo = "office-list";
            }
            $state.go(goTo, {
                page: page,
                keyword: $scope.search.keyword
            });
        };
        $scope.showAllCountries();

        $scope.deleteOffice = function (id) {
            globalfunction.confDel(function (value) {
                if (value) {
                    NavigationService.deleteOffice(id, function (data) {
                        if (data.value) {
                            $scope.showAllCountries();
                            toastr.success("Office deleted successfully.", "Office deleted");
                        } else {
                            toastr.error("There was an error while deleting Office", "Office deleting error");
                        }


                    });
                }
            });
        };

        $scope.changeStatus = function (ind) {
            NavigationService.officeSave(ind, function (data) {
                if (data.value === true) {}
            });
        };
    })
    .controller('CreateOfficeCtrl', function ($scope, hotkeys, $window, TemplateService, NavigationService, $timeout, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("office-detail");
        $scope.menutitle = NavigationService.makeactive("Office");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "Create Office"
        };
        $scope.formData = {};
        $scope.cancel = function () {
            $window.history.back();
        };
        hotkeys.bindTo($scope).add({
            combo: 'ctrl+enter',
            callback: function (formData) {
                if (formData.lat && formData.lng) {
                    formData.location = [];
                    formData.location.push(formData.lng);
                    formData.location.push(formData.lat);
                }
                NavigationService.officeSave($scope.formData, function (data) {
                    if (data.value === true) {
                        $window.history.back();
                        toastr.success("Office " + formData.name + " created successfully.", "Office Created");
                    } else {
                        toastr.error("Office creation failed.", "Office creation error");
                    }
                });
            }
        });

        $scope.saveOffice = function (formData) {
            if (formData.lat && formData.lng) {
                formData.location = [];
                formData.location.push(formData.lng);
                formData.location.push(formData.lat);
            }
            NavigationService.officeSave($scope.formData, function (data) {
                if (data.value === true) {
                    $window.history.back();
                    toastr.success("Office " + formData.name + " created successfully.", "Office Created");
                } else {
                    toastr.error("Office creation failed.", "Office creation error");
                }
            });
        };

    })
    .controller('EditOfficeCtrl', function ($scope, hotkeys, $window, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("office-detail");
        $scope.menutitle = NavigationService.makeactive("Office");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "Edit Office"
        };
        $scope.cancel = function () {
            $window.history.back();
        };
        NavigationService.getOneOffice($stateParams.id, function (data) {
            $scope.formData = data.data;
            $scope.formData.country = data.data.city.district.state.zone.country._id;
            $scope.formData.zone = data.data.city.district.state.zone._id;
            $scope.formData.state = data.data.city.district.state._id;
            $scope.formData.district = data.data.city.district._id;
            $scope.formData.city = data.data.city._id;
        });

        hotkeys.bindTo($scope).add({
            combo: 'ctrl+enter',
            callback: function (formData) {
                if (formData.lat && formData.lng) {
                    formData.location = [];
                    formData.location.push(formData.lng);
                    formData.location.push(formData.lat);
                }
                NavigationService.officeSave($scope.formData, function (data) {
                    if (data.value === true) {
                        $window.history.back();
                        toastr.success("Office " + $scope.formData.name + " edited successfully.", "Office Edited");
                    } else {
                        toastr.error("Office edition failed.", "Office editing error");
                    }
                });
            }
        });

        $scope.saveOffice = function (formData) {
            if (formData.lat && formData.lng) {
                formData.location = [];
                formData.location.push(formData.lng);
                formData.location.push(formData.lat);
            }
            NavigationService.officeSave($scope.formData, function (data) {
                if (data.value === true) {
                    // $state.go('office-list');
                    $window.history.back();
                    toastr.success("Office " + $scope.formData.name + " edited successfully.", "Office Edited");
                } else {
                    toastr.error("Office edition failed.", "Office editing error");
                }
            });
        };

    })
    .controller('TypeOfOfficeCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("typeOfOffice-list");
        $scope.menutitle = NavigationService.makeactive("Type Of Office List");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.currentPage = $stateParams.page;
        var i = 0;
        $scope.search = {
            keyword: ""
        };
        if ($stateParams.keyword) {
            $scope.search.keyword = $stateParams.keyword;
        }
        $scope.cancel = function () {
            $window.history.back();
        };
        $scope.showAllCountries = function (keywordChange) {
            $scope.totalItems = undefined;
            if (keywordChange) {
                $scope.currentPage = 1;
            }
            NavigationService.searchTypeOfOffice({
                page: $scope.currentPage,
                keyword: $scope.search.keyword
            }, ++i, function (data, ini) {
                if (ini == i) {
                    $scope.allTypeOfOffices = data.data.results;
                    $scope.totalItems = data.data.total;
                    $scope.maxRow = data.data.options.count;
                }
            });
        };

        $scope.changePage = function (page) {
            var goTo = "typeOfOffice-list";
            if ($scope.search.keyword) {
                goTo = "typeOfOffice-list";
            }
            $state.go(goTo, {
                page: page,
                keyword: $scope.search.keyword
            });
        };
        $scope.showAllCountries();
        $scope.deleteTypeOfOffice = function (id) {
            globalfunction.confDel(function (value) {
                console.log(value);
                if (value) {
                    NavigationService.deleteTypeOfOffice(id, function (data) {
                        if (data.value) {
                            $scope.showAllCountries();
                            toastr.success("Office deleted successfully.", "Office deleted");
                        } else {
                            toastr.error("There was an error while deleting Office", "Office deleting error");
                        }
                    });
                }
            });
        };
    })
    .controller('CreateTypeOfOfficeCtrl', function ($scope, hotkeys, $window, TemplateService, NavigationService, $timeout, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("typeOfOffice-detail");
        $scope.menutitle = NavigationService.makeactive("Type Of Office");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "Create Type Of Office"
        };
        $scope.cancel = function () {
            $window.history.back();
        };
        $scope.formData = {};

        hotkeys.bindTo($scope).add({
            combo: 'ctrl+enter',
            callback: function (formData) {
                $scope.errormsg = "";
                NavigationService.typeofofficeSave($scope.formData, function (data) {
                    if (data.value === true) {
                        $window.history.back();
                        toastr.success("Type Of Office " + $scope.formData.name + " created successfully.", "Type Of Office Created");
                    } else {
                        if (data.error.errors) {
                            var i = 0;
                            _.each(data.error.errors, function (data) {
                                $scope.errormsg += data.message + "\n\n";
                            });
                        }
                        toastr.error($scope.errormsg, "Type Of Office creation failed.");
                    }
                });
            }
        });

        $scope.savetypeOfOffice = function (formData) {
            $scope.errormsg = "";
            NavigationService.typeofofficeSave($scope.formData, function (data) {
                if (data.value === true) {
                    $window.history.back();
                    toastr.success("Type Of Office " + $scope.formData.name + " created successfully.", "Type Of Office Created");
                } else {
                    if (data.error.errors) {
                        var i = 0;
                        _.each(data.error.errors, function (data) {
                            $scope.errormsg += data.message + "\n\n";
                        });
                    }
                    toastr.error($scope.errormsg, "Type Of Office creation failed.");
                }
            });
        };

    })
    .controller('EditTypeOfOfficeCtrl', function ($scope, hotkeys, $window, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("typeOfOffice-detail");
        $scope.menutitle = NavigationService.makeactive("Type Of Office");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "Edit Type Of Office"
        };

        NavigationService.getOneTypeOfOffice($stateParams.id, function (data) {
            $scope.formData = data.data;
        });
        $scope.cancel = function () {
            $window.history.back();
        };

        hotkeys.bindTo($scope).add({
            combo: 'ctrl+enter',
            callback: function (formData) {
                $scope.errormsg = "";
                NavigationService.typeofofficeSave($scope.formData, function (data) {
                    if (data.value === true) {
                        $window.history.back();
                        toastr.success("Type Of Office " + $scope.formData.name + " Updated successfully.", "Type Of Office Updated");
                    } else {
                        if (data.error.errors) {
                            var i = 0;
                            _.each(data.error.errors, function (data) {
                                $scope.errormsg += data.message;
                            });
                        }
                        toastr.error($scope.errormsg, "Type Of Office creation failed.");
                    }
                });
            }
        });


        $scope.savetypeOfOffice = function (formValid) {
            $scope.errormsg = "";

            //  if (formValid.$valid) {
            //  $scope.formComplete = true;
            NavigationService.typeofofficeSave($scope.formData, function (data) {
                if (data.value === true) {
                    // $state.go('typeOfOffice-list');
                    $window.history.back();
                    toastr.success("Type Of Office " + $scope.formData.name + " Updated successfully.", "Type Of Office Updated");
                } else {
                    if (data.error.errors) {
                        var i = 0;
                        _.each(data.error.errors, function (data) {
                            $scope.errormsg += data.message;
                        });

                    }
                    toastr.error($scope.errormsg, "Type Of Office creation failed.");
                }
            });
            //  }
        };

    })
    .controller('ZoneCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $stateParams, toastr, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("zone-list");
        $scope.menutitle = NavigationService.makeactive("Zone List");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.currentPage = $stateParams.page;
        var i = 0;
        $scope.search = {
            keyword: ""
        };
        if ($stateParams.keyword) {
            $scope.search.keyword = $stateParams.keyword;
        }
        $scope.showAllCountries = function (keywordChange) {
            $scope.totalItems = undefined;
            if (keywordChange) {
                $scope.currentPage = 1;
            }
            NavigationService.searchZone({
                page: $scope.currentPage,
                keyword: $scope.search.keyword
            }, ++i, function (data, ini) {
                console.log(data.data);

                if (ini == i) {
                    console.log(data.data);
                    $scope.countries = data.data.results;
                    $scope.totalItems = data.data.total;
                    $scope.maxRow = data.data.options.count;

                }
            });
        };

        $scope.changePage = function (page) {
            var goTo = "zone-list";
            if ($scope.search.keyword) {
                goTo = "zone-list";
            }
            $state.go(goTo, {
                page: page,
                keyword: $scope.search.keyword
            });
        };
        $scope.showAllCountries();
        $scope.cancel = function () {
            $window.history.back();
        };
        $scope.deleteZone = function (id) {
            globalfunction.confDel(function (value) {
                console.log(value);
                if (value) {
                    NavigationService.deleteZone(id, function (data) {
                        if (data.value) {
                            $scope.showAllCountries();
                            toastr.success("Country deleted successfully.", "Country deleted");
                        } else {
                            toastr.error("There was an error while deleting country", "Country deleting error");
                        }


                    });
                }
            });
        };
    })
    .controller('CreateZoneCtrl', function ($scope, hotkeys, $window, TemplateService, NavigationService, $timeout, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("zone-detail");
        $scope.menutitle = NavigationService.makeactive("Zone");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "Create Zone"
        };
        $scope.cancel = function () {
            $window.history.back();
        };
        hotkeys.bindTo($scope).add({
            combo: 'ctrl+enter',
            callback: function (formData) {
                NavigationService.zoneSave(formData, function (data) {
                    if (data.value === true) {
                        $window.history.back();
                        toastr.success("Zone " + formData.name + " created successfully.", "Zone Created");
                    } else {
                        toastr.error("Zone creation failed.", "Zone creation error");
                    }
                });
            }
        });
        $scope.saveZone = function (formData) {
            NavigationService.zoneSave(formData, function (data) {
                if (data.value === true) {
                    $window.history.back();
                    toastr.success("Zone " + formData.name + " created successfully.", "Zone Created");
                } else {
                    toastr.error("Zone creation failed.", "Zone creation error");
                }
            });
        };
    })
    .controller('EditZoneCtrl', function ($scope, hotkeys, $window, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("zone-detail");
        $scope.menutitle = NavigationService.makeactive("Zone");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "Edit Zone"
        };

        NavigationService.getOneZone($stateParams.id, function (data) {
            $scope.formData = data.data;
            $scope.formData.country = data.data.country._id;
        });
        $scope.cancel = function () {
            $window.history.back();
        };
        hotkeys.bindTo($scope).add({
            combo: 'ctrl+enter',
            callback: function (formData) {
                $scope.hideSaveCancel = true;
                NavigationService.zoneSave($scope.formData, function (data) {
                    if (data.value === true) {
                        // $state.go('zone-list');
                        $window.history.back();
                        toastr.success("Zone " + $scope.formData.name + " edited successfully.", "Zone Edited");
                    } else {
                        toastr.error("Zone edition failed.", "Zone editing error");
                    }
                });
            }
        });
        $scope.saveZone = function (formValid) {
            NavigationService.zoneSave($scope.formData, function (data) {
                if (data.value === true) {
                    // $state.go('zone-list');
                    $window.history.back();
                    toastr.success("Zone " + $scope.formData.name + " edited successfully.", "Zone Edited");
                } else {
                    toastr.error("Zone edition failed.", "Zone editing error");
                }
            });
        };
    })
    .controller('StateCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $stateParams, toastr, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("state-list");
        $scope.menutitle = NavigationService.makeactive("State List");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.currentPage = $stateParams.page;
        var i = 0;
        $scope.search = {
            keyword: ""
        };
        if ($stateParams.keyword) {
            $scope.search.keyword = $stateParams.keyword;
        }
        $scope.showAllCountries = function (keywordChange) {
            $scope.totalItems = undefined;
            if (keywordChange) {
                $scope.currentPage = 1;
            }
            NavigationService.searchState({
                page: $scope.currentPage,
                keyword: $scope.search.keyword
            }, ++i, function (data, ini) {
                console.log(data.data);

                if (ini == i) {
                    console.log(data.data);
                    $scope.allStates = data.data.results;
                    $scope.totalItems = data.data.total;
                    $scope.maxRow = data.data.options.count;

                }
            });
        };
        $scope.cancel = function () {
            $window.history.back();
        };
        $scope.changePage = function (page) {
            var goTo = "state-list";
            if ($scope.search.keyword) {
                goTo = "state-list";
            }
            $state.go(goTo, {
                page: page,
                keyword: $scope.search.keyword
            });
        };
        $scope.showAllCountries();

        $scope.deleteState = function (id) {
            globalfunction.confDel(function (value) {
                if (value) {
                    NavigationService.deleteState(id, function (data) {
                        if (data.value) {
                            $scope.showAllCountries();
                            toastr.success("State deleted successfully.", "State deleted");
                        } else {
                            toastr.error("There was an error while deleting State", "State deleting error");
                        }


                    });
                }
            });
        };

    })

    .controller('CreateStateCtrl', function ($scope, hotkeys, $window, TemplateService, NavigationService, $timeout, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("state-detail");
        $scope.menutitle = NavigationService.makeactive("State");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "Create State"
        };
        $scope.formData = {};
        $scope.cancel = function () {
            $window.history.back();
        };
        hotkeys.bindTo($scope).add({
            combo: 'ctrl+enter',
            callback: function (formData) {
                $scope.hideSaveCancel = true;
                NavigationService.stateSave($scope.formData, function (data) {
                    if (data.value === true) {
                        // $state.go('state-list');
                        $window.history.back();
                        toastr.success("State " + formData.name + " created successfully.", "State Created");
                    } else {
                        toastr.error("State creation failed.", "State creation error");
                    }
                });
            }
        });
        $scope.saveState = function (formData) {
            NavigationService.stateSave($scope.formData, function (data) {
                if (data.value === true) {
                    // $state.go('state-list');
                    $window.history.back();
                    toastr.success("State " + formData.name + " created successfully.", "State Created");
                } else {
                    toastr.error("State creation failed.", "State creation error");
                }
            });
        };

    })
    .controller('EditStateCtrl', function ($scope, hotkeys, $window, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("state-detail");
        $scope.menutitle = NavigationService.makeactive("State");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "Edit State"
        };

        NavigationService.getOneState($stateParams.id, function (data) {
            $scope.formData = data.data;
            $scope.formData.country = data.data.zone.country._id;
            $scope.formData.zone = data.data.zone._id;
        });
        $scope.cancel = function () {
            $window.history.back();
        };
        hotkeys.bindTo($scope).add({
            combo: 'ctrl+enter',
            callback: function (formData) {
                $scope.hideSaveCancel = true;
                NavigationService.stateSave($scope.formData, function (data) {
                    if (data.value === true) {
                        // $state.go('state-list');
                        $window.history.back();
                        toastr.success("State " + $scope.formData.name + " edited successfully.", "State Edited");
                    } else {
                        toastr.error("State edition failed.", "State editing error");
                    }
                });
            }
        });
        $scope.saveState = function (formValid) {
            NavigationService.stateSave($scope.formData, function (data) {
                if (data.value === true) {
                    // $state.go('state-list');
                    $window.history.back();
                    toastr.success("State " + $scope.formData.name + " edited successfully.", "State Edited");
                } else {
                    toastr.error("State edition failed.", "State editing error");
                }
            });
        };
    })
    .controller('DistrictCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $stateParams, toastr, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("district-list");
        $scope.menutitle = NavigationService.makeactive("district List");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.currentPage = $stateParams.page;
        var i = 0;
        $scope.search = {
            keyword: ""
        };
        if ($stateParams.keyword) {
            $scope.search.keyword = $stateParams.keyword;
        }
        $scope.showAllCountries = function (keywordChange) {
            $scope.totalItems = undefined;
            if (keywordChange) {
                $scope.currentPage = 1;
            }
            NavigationService.searchDistrict({
                page: $scope.currentPage,
                keyword: $scope.search.keyword
            }, ++i, function (data, ini) {
                console.log(data.data);

                if (ini == i) {
                    console.log(data.data);
                    $scope.allDistricts = data.data.results;
                    $scope.totalItems = data.data.total;
                    $scope.maxRow = data.data.options.count;

                }
            });
        };

        $scope.changePage = function (page) {
            var goTo = "district-list";
            if ($scope.search.keyword) {
                goTo = "district-list";
            }
            $state.go(goTo, {
                page: page,
                keyword: $scope.search.keyword
            });
        };
        $scope.showAllCountries();

        $scope.deleteDistrict = function (id) {
            globalfunction.confDel(function (value) {
                console.log(value);
                if (value) {
                    NavigationService.deleteDistrict(id, function (data) {
                        if (data.value) {
                            $scope.showAllCountries();
                            toastr.success("District deleted successfully.", "District deleted");
                        } else {
                            toastr.error("There was an error while deleting District", "District deleting error");
                        }


                    });
                }
            });
        };


    })
    .controller('EmployeeCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("employee-list");
        $scope.menutitle = NavigationService.makeactive("Employee");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.showAllEmployees = function () {
            NavigationService.getAllEmployees(function (data) {
                $scope.allEmployees = data.data;
                console.log('$scope.allEmployees', $scope.allEmployees);

            });
        };
        $scope.showAllEmployees();

        $scope.deleteEmployee = function (id) {

            NavigationService.deleteEmployee({
                id: id
            }, function (data) {
                $scope.showAllEmployees();

            });
        };

    })
    .controller('LeaveListCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $state, $stateParams) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("leave-list");
        $scope.menutitle = NavigationService.makeactive("Leave List");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.currentPage = $stateParams.page;
        var i = 0;
        $scope.search = {
            keyword: ""
        };
        if ($stateParams.keyword) {
            $scope.search.keyword = $stateParams.keyword;
        }
        $scope.showAllLeaves = function (keywordChange) {
            $scope.totalItems = undefined;
            console.log("showAllLeaves");
            if (keywordChange) {
                $scope.currentPage = 1;
            }
            NavigationService.searchLeaves({

                page: $scope.currentPage,
                keyword: $scope.search.keyword
            }, ++i, function (data, ini) {
                if (ini == i) {
                    console.log("In searchLeaves");
                    $scope.leaveList = data.data.results;
                    $scope.totalItems = data.data.total;
                    $scope.maxRow = data.data.options.count;
                }
            });
        };

    })
    // .controller('EditLeaveListCtrl', function ( $scope, $window, TemplateService, NavigationService, $timeout, $stateParams, $state) {
    //     //Used to name the .html file
    //     $scope.template = TemplateService.changecontent("leave-detail");
    //     $scope.menutitle = NavigationService.makeactive("LeaveManagement");
    //     TemplateService.title = $scope.menutitle;
    //     $scope.navigation = NavigationService.getnav();
    //     $scope.userStatus = [{
    //         "name": "Active",
    //         "value": true
    //     }, {
    //         "name": "Inactive",
    //         "value": false
    //     }];
    //     $scope.header = {
    //         "name": "Edit LeaveManagement"
    //     };

    //     NavigationService.getOneLeaveManagement($stateParams.id, function (data) {
    //         $scope.formData = data.data;
    //         console.log('$scope.formData', $scope.formData);

    //     });

    //     $scope.saveLeaveManagement= function (formValid) {

    //         //  if (formValid.$valid) {
    //         //  $scope.formComplete = true;
    //         NavigationService.leaveManagementEditSave($scope.formData, function (data) {
    //             if (data.value === true) {
    //                 $state.go('leaveManagement-list');
    //             }
    //         });
    //         //  }
    //     };
    //     NavigationService.getAllUniqueTypes(function (data) {
    //         $scope.allUniqueTypes = data.data;
    //         console.log('$scope.allUniqueTypes', $scope.allUniqueTypes);

    //     });

    // })

    .controller('ReimbursementListCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("reimbursement-list");
        $scope.menutitle = NavigationService.makeactive("Reimbursement List");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();


    })
    .controller('ReimbursementDetailCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("reimbursement-detail");
        $scope.menutitle = NavigationService.makeactive("Reimbursement Detail");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();


    })
    .controller('LeaveDetailCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("leave-detail");
        $scope.menutitle = NavigationService.makeactive("Leave Detail");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();


    })
    .controller('TemplateILACtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("templateIla-list");
        $scope.menutitle = NavigationService.makeactive("ILA Template");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.header = {
            "name": "LOR Template List"
        };

    })

    .controller('KnowledgebaseListCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("knowledgebase-list");
        $scope.menutitle = NavigationService.makeactive("Knowledge Base");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();


    })
    .controller('KnowledgebaseDetailCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("knowledgebase-detail");
        $scope.menutitle = NavigationService.makeactive("Knowledge Base Detail");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();


    })
    .controller('AllDocumentCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $state, $stateParams, toastr) {
        //Used to name the .html file

        $scope.modelCamel = _.camelCase($stateParams.model);
        var a = _.startCase($scope.modelCamel).split(" ");
        $scope.ModelApi = "";
        _.each(a, function (n) {
            $scope.ModelApi = $scope.ModelApi + n;
        });

        $scope.template = TemplateService.changecontent("all-document");
        $scope.menutitle = NavigationService.makeactive("All Document");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.modelList = [];
        $scope.name;
        $scope.dept = [{
            "name": "Jir",
            "type": "Jir"
        }, {
            "name": "Law",
            "type": "Law"
        }, {
            "name": "Insurance",
            "type": "Insurance"
        }, {
            "name": "Survey",
            "type": "Survey"
        }, {
            "name": "Surveyor",
            "type": "Surveyor"
        }, {
            "name": "ILR",
            "type": "ILR"
        }, {
            "name": "ILA",
            "type": "ILA"
        }];

        // 
        $scope.deleteModel = function (id, type) {
            console.log("Delete Id Type", id, type);
            globalfunction.confDel(function (value) {
                console.log("Delete value", value);
                if (value) {
                    NavigationService.deleteModel($scope.ModelApi, id, function (data) {
                        if (data.value) {
                            console.log("Delete Value", data.value);
                            $scope.viewJIR(type);
                            toastr.success($scope.modelCap + " deleted successfully.", $scope.modelCap + " deleted");
                        } else {
                            toastr.error("There was an error while deleting " + $scope.modelCap, $scope.modelCap + " deleting error");
                        }


                    });
                }
            });
        };


        // 

        $scope.viewJIR = function (data) {
            $scope.name = data
            NavigationService.searchAllDocument(data, function (data) {
                $scope.modelList = data.data
                console.log("DATA IN ALL", $scope.modelList);
            });
        }

        $scope.viewJIR($scope.dept[0].type);
    })
    .controller('EditTemplateILACtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("templateIla-detail");
        $scope.menutitle = NavigationService.makeactive("Edit ILA Template");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "Edit ILA Template"
        };
        $scope.formData = {};
        // $scope.formData.status = true;

        NavigationService.getOneModel("TemplateIla", $stateParams.id, function (data) {
            $scope.formData = data.data;
        });

        $scope.itemTypes = [{
            value: '',
            name: 'Select type of item'
        }, {
            value: 'Custom Input',
            name: 'Custom Input'
        }, {
            value: 'System Fields',
            name: 'System Fields'
        }, {
            value: 'Dropdown',
            name: 'Dropdown'
        }];

        $scope.inputTypes = [{
            value: '',
            name: 'Select type of input'
        }, {
            value: 'Text',
            name: 'Text'
        }, {
            value: 'Date',
            name: 'Date'
        }, {
            value: 'Textarea',
            name: 'Textarea'
        }];


        $scope.addHead = function () {
            $scope.formData.forms.push({
                head: $scope.formData.forms.length + 1,
                items: [{}]
            });
        };
        $scope.removeHead = function (index) {
            if ($scope.formData.forms.length > 1) {
                $scope.formData.forms.splice(index, 1);
            } else {
                $scope.formData.forms = [{
                    head: '',
                    items: [{}, {}]
                }];
            }
        };

        $scope.addItem = function (obj) {
            var index = $scope.formData.forms.indexOf(obj);
            $scope.formData.forms[index].items.push({});
        };

        $scope.removeItem = function (obj, indexItem) {
            var indexHead = $scope.formData.forms.indexOf(obj);
            if ($scope.formData.forms[indexHead].items.length > 1) {
                $scope.formData.forms[indexHead].items.splice(indexItem, 1);
            } else {
                $scope.formData.forms[indexHead].items = [{}];
            }
        };

        $scope.sortableOptions = {
            handle: ' .handleBar',
            axis: 'y',
            'ui-floating': true,
            start: function (e, ui) {
                $('#sortable-ul-selector-id').sortable("refreshPositions");
                $('#sortable-ul-selector-id').sortable("refresh");
            }
        };
        $scope.cancel = function () {
            $window.history.back();
        }
        $scope.saveModel = function (data) {
                NavigationService.modelSave("TemplateIla", $scope.formData, function (data) {
                    if (data.value === true) {
                        // $state.go('templateIla-list');
                        $window.history.back();
                        toastr.success("Template ILA " + formData.name + " edited successfully.", "Template ILA Edited");
                    } else {
                        toastr.error("Template ILA Edition failed.", "Template ILA edition error");
                    }
                });
        };
    })

    .controller('CreateTemplateILACtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("templateIla-detail");
        $scope.menutitle = NavigationService.makeactive("Create ILA Template");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "Create ILA Template"
        };

        $scope.itemTypes = [{
            value: '',
            name: 'Select type of item'
        }, {
            value: 'Custom Input',
            name: 'Custom Input'
        }, {
            value: 'System Fields',
            name: 'System Fields'
        }, {
            value: 'Dropdown',
            name: 'Dropdown'
        }];

        $scope.inputTypes = [{
            value: '',
            name: 'Select type of input'
        }, {
            value: 'Text',
            name: 'Text'
        }, {
            value: 'Date',
            name: 'Date'
        }, {
            value: 'Textarea',
            name: 'Textarea'
        }];

        $scope.formData = {};
        $scope.formData.status = true;

        $scope.formData.forms = [{
            head: '',
            items: [{}, {}]
        }];

        $scope.addHead = function () {
            $scope.formData.forms.push({
                head: $scope.formData.forms.length + 1,
                items: [{}]
            });
        };
        $scope.removeHead = function (index) {
            if ($scope.formData.forms.length > 1) {
                $scope.formData.forms.splice(index, 1);
            } else {
                $scope.formData.forms = [{
                    head: '',
                    items: [{}, {}]
                }];
            }
        };

        $scope.addItem = function (obj) {
            var index = $scope.formData.forms.indexOf(obj);
            $scope.formData.forms[index].items.push({});
        };

        $scope.removeItem = function (obj, indexItem) {
            var indexHead = $scope.formData.forms.indexOf(obj);
            if ($scope.formData.forms[indexHead].items.length > 1) {
                $scope.formData.forms[indexHead].items.splice(indexItem, 1);
            } else {
                $scope.formData.forms[indexHead].items = [{}];
            }
        };

        $scope.sortableOptions = {
            handle: ' .handleBar',
            axis: 'y',
            'ui-floating': true,
            start: function (e, ui) {
                $('#sortable-ul-selector-id').sortable("refreshPositions");
                $('#sortable-ul-selector-id').sortable("refresh");
            }
        };
        $scope.cancel = function () {
            $window.history.back();
        }
        $scope.saveModel = function (data) {
            $scope.saveModel = function (formData) {
                NavigationService.modelSave("TemplateIla", $scope.formData, function (data) {
                    if (data.value === true) {
                        // $state.go('templateIla-list');
                        $window.history.back();
                        toastr.success("Template ILA " + formData.name + " created successfully.", "Template ILA Created");
                    } else {
                        toastr.error("Template ILA creation failed.", "Template ILA creation error");
                    }
                });
            };
        };


    })

    .controller('TemplateISRCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("templateIsr-list");
        $scope.menutitle = NavigationService.makeactive("ISR List");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

    })


    .controller('EditTemplateISRCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("templateIsr-detail");
        $scope.menutitle = NavigationService.makeactive("Edit ISR Template");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "Edit ISR Template"
        };
        $scope.formData = {};
        // $scope.formData.status = true;

        NavigationService.getOneModel("TemplateIsr", $stateParams.id, function (data) {
            $scope.formData = data.data;
        });

        $scope.itemTypes = [{
            value: '',
            name: 'Select type of item'
        }, {
            value: 'Custom Input',
            name: 'Custom Input'
        }, {
            value: 'System Fields',
            name: 'System Fields'
        }, {
            value: 'Dropdown',
            name: 'Dropdown'
        }];

        $scope.inputTypes = [{
            value: '',
            name: 'Select type of input'
        }, {
            value: 'Text',
            name: 'Text'
        }, {
            value: 'Date',
            name: 'Date'
        }, {
            value: 'Textarea',
            name: 'Textarea'
        }];


        $scope.addHead = function () {
            $scope.formData.forms.push({
                head: $scope.formData.forms.length + 1,
                items: [{}]
            });
        };
        $scope.removeHead = function (index) {
            if ($scope.formData.forms.length > 1) {
                $scope.formData.forms.splice(index, 1);
            } else {
                $scope.formData.forms = [{
                    head: '',
                    items: [{}, {}]
                }];
            }
        };

        $scope.addItem = function (obj) {
            var index = $scope.formData.forms.indexOf(obj);
            $scope.formData.forms[index].items.push({});
        };

        $scope.removeItem = function (obj, indexItem) {
            var indexHead = $scope.formData.forms.indexOf(obj);
            if ($scope.formData.forms[indexHead].items.length > 1) {
                $scope.formData.forms[indexHead].items.splice(indexItem, 1);
            } else {
                $scope.formData.forms[indexHead].items = [{}];
            }
        };

        $scope.sortableOptions = {
            handle: ' .handleBar',
            axis: 'y',
            'ui-floating': true,
            start: function (e, ui) {
                $('#sortable-ul-selector-id').sortable("refreshPositions");
                $('#sortable-ul-selector-id').sortable("refresh");
            }
        };
        $scope.cancel = function () {
            $window.history.back();
        }
        $scope.saveModel = function (data) {
            $scope.saveModel = function (formData) {
                NavigationService.modelSave("TemplateIsr", $scope.formData, function (data) {
                    if (data.value === true) {
                        // $state.go('templateIsr-list');
                        $window.history.back();
                        toastr.success("Template ISR " + formData.name + " edited successfully.", "Template ISR Edited");
                    } else {
                        toastr.error("Template ISR Edition failed.", "Template ISR edition error");
                    }
                });
            };
        };
    })

    .controller('CreateTemplateISRCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("templateIsr-detail");
        $scope.menutitle = NavigationService.makeactive("Create ISR Template");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "Create ISR Template"
        };

        $scope.itemTypes = [{
            value: '',
            name: 'Select type of item'
        }, {
            value: 'Custom Input',
            name: 'Custom Input'
        }, {
            value: 'System Fields',
            name: 'System Fields'
        }, {
            value: 'Dropdown',
            name: 'Dropdown'
        }];

        $scope.inputTypes = [{
            value: '',
            name: 'Select type of input'
        }, {
            value: 'Text',
            name: 'Text'
        }, {
            value: 'Date',
            name: 'Date'
        }, {
            value: 'Textarea',
            name: 'Textarea'
        }];

        $scope.formData = {};
        $scope.formData.status = true;

        $scope.formData.forms = [{
            head: '',
            items: [{}, {}]
        }];

        $scope.addHead = function () {
            $scope.formData.forms.push({
                head: $scope.formData.forms.length + 1,
                items: [{}]
            });
        };
        $scope.removeHead = function (index) {
            if ($scope.formData.forms.length > 1) {
                $scope.formData.forms.splice(index, 1);
            } else {
                $scope.formData.forms = [{
                    head: '',
                    items: [{}, {}]
                }];
            }
        };

        $scope.addItem = function (obj) {
            var index = $scope.formData.forms.indexOf(obj);
            $scope.formData.forms[index].items.push({});
        };

        $scope.removeItem = function (obj, indexItem) {
            var indexHead = $scope.formData.forms.indexOf(obj);
            if ($scope.formData.forms[indexHead].items.length > 1) {
                $scope.formData.forms[indexHead].items.splice(indexItem, 1);
            } else {
                $scope.formData.forms[indexHead].items = [{}];
            }
        };

        $scope.sortableOptions = {
            handle: ' .handleBar',
            axis: 'y',
            'ui-floating': true,
            start: function (e, ui) {
                $('#sortable-ul-selector-id').sortable("refreshPositions");
                $('#sortable-ul-selector-id').sortable("refresh");
            }
        };
        $scope.cancel = function () {
            $window.history.back();
        }
        $scope.saveModel = function (data) {
            $scope.saveModel = function (formData) {
                NavigationService.modelSave("TemplateIsr", $scope.formData, function (data) {
                    if (data.value === true) {
                        // $state.go('templateIla-list');
                        $window.history.back();
                        toastr.success("Template ISR " + formData.name + " created successfully.", "Template ISR Created");
                    } else {
                        toastr.error("Template ISR creation failed.", "Template ISR creation error");
                    }
                });
            };
        };


    })


    .controller('TemplateJIRCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("templateJir-list");
        $scope.menutitle = NavigationService.makeactive("JIR List");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

    })


    .controller('EditTemplateJIRCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("templateJir-detail");
        $scope.menutitle = NavigationService.makeactive("Edit JIR Template");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "Edit JIR Template"
        };
        $scope.formData = {};
        // $scope.formData.status = true;

        NavigationService.getOneModel("TemplateJir", $stateParams.id, function (data) {
            $scope.formData = data.data;
        });

        $scope.itemTypes = [{
            value: '',
            name: 'Select type of item'
        }, {
            value: 'Custom Input',
            name: 'Custom Input'
        }, {
            value: 'System Fields',
            name: 'System Fields'
        }, {
            value: 'Dropdown',
            name: 'Dropdown'
        }];

        $scope.inputTypes = [{
            value: '',
            name: 'Select type of input'
        }, {
            value: 'Text',
            name: 'Text'
        }, {
            value: 'Date',
            name: 'Date'
        }, {
            value: 'Textarea',
            name: 'Textarea'
        }];


        $scope.addHead = function () {
            $scope.formData.forms.push({
                head: $scope.formData.forms.length + 1,
                items: [{}]
            });
        };
        $scope.removeHead = function (index) {
            if ($scope.formData.forms.length > 1) {
                $scope.formData.forms.splice(index, 1);
            } else {
                $scope.formData.forms = [{
                    head: '',
                    items: [{}, {}]
                }];
            }
        };

        $scope.addItem = function (obj) {
            var index = $scope.formData.forms.indexOf(obj);
            $scope.formData.forms[index].items.push({});
        };

        $scope.removeItem = function (obj, indexItem) {
            var indexHead = $scope.formData.forms.indexOf(obj);
            if ($scope.formData.forms[indexHead].items.length > 1) {
                $scope.formData.forms[indexHead].items.splice(indexItem, 1);
            } else {
                $scope.formData.forms[indexHead].items = [{}];
            }
        };

        $scope.sortableOptions = {
            handle: ' .handleBar',
            axis: 'y',
            'ui-floating': true,
            start: function (e, ui) {
                $('#sortable-ul-selector-id').sortable("refreshPositions");
                $('#sortable-ul-selector-id').sortable("refresh");
            }
        };
        $scope.cancel = function () {
            $window.history.back();
        }
        $scope.saveModel = function (data) {
            console.log(data);
            $scope.saveModel = function (formData) {
                NavigationService.modelSave("TemplateJir", $scope.formData, function (data) {
                    if (data.value === true) {
                        // $state.go('templateJir-list');
                        $window.history.back();
                        toastr.success("Template JIR " + formData.name + " edited successfully.", "Template JIR Edited");
                    } else {
                        toastr.error("Template JIR Edition failed.", "Template JIR edition error");
                    }
                });
            };
        };
    })

    .controller('CreateTemplateJIRCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("templateJir-detail");
        $scope.menutitle = NavigationService.makeactive("Create JIR Template");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "Create JIR Template"
        };

        $scope.itemTypes = [{
            value: '',
            name: 'Select type of item'
        }, {
            value: 'Custom Input',
            name: 'Custom Input'
        }, {
            value: 'System Fields',
            name: 'System Fields'
        }, {
            value: 'Dropdown',
            name: 'Dropdown'
        }];

        $scope.inputTypes = [{
            value: '',
            name: 'Select type of input'
        }, {
            value: 'Text',
            name: 'Text'
        }, {
            value: 'Date',
            name: 'Date'
        }, {
            value: 'Textarea',
            name: 'Textarea'
        }];

        $scope.formData = {};
        $scope.formData.status = true;

        $scope.formData.forms = [{
            head: '',
            items: [{}, {}]
        }];

        $scope.addHead = function () {
            $scope.formData.forms.push({
                head: $scope.formData.forms.length + 1,
                items: [{}]
            });
        };
        $scope.removeHead = function (index) {
            if ($scope.formData.forms.length > 1) {
                $scope.formData.forms.splice(index, 1);
            } else {
                $scope.formData.forms = [{
                    head: '',
                    items: [{}, {}]
                }];
            }
        };

        $scope.addItem = function (obj) {
            var index = $scope.formData.forms.indexOf(obj);
            $scope.formData.forms[index].items.push({});
        };

        $scope.removeItem = function (obj, indexItem) {
            var indexHead = $scope.formData.forms.indexOf(obj);
            if ($scope.formData.forms[indexHead].items.length > 1) {
                $scope.formData.forms[indexHead].items.splice(indexItem, 1);
            } else {
                $scope.formData.forms[indexHead].items = [{}];
            }
        };

        $scope.sortableOptions = {
            handle: ' .handleBar',
            axis: 'y',
            'ui-floating': true,
            start: function (e, ui) {
                $('#sortable-ul-selector-id').sortable("refreshPositions");
                $('#sortable-ul-selector-id').sortable("refresh");
            }
        };
        $scope.cancel = function () {
            $window.history.back();
        }
        $scope.saveModel = function (data) {
            console.log(data);
            $scope.saveModel = function (formData) {
                NavigationService.modelSave("TemplateJir", $scope.formData, function (data) {
                    if (data.value === true) {
                        // $state.go('templateJir-list');
                        $window.history.back();
                        toastr.success("Template JIR " + formData.name + " created successfully.", "Template JIR Created");
                    } else {
                        toastr.error("Template JIR creation failed.", "Template JIR creation error");
                    }
                });
            };
        };


    })

    .controller('CreateLeaveCtrl', function ($scope, hotkeys, $window, TemplateService, NavigationService, $timeout, $state, $uibModal, $stateParams, toastr, $filter) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("leaveManagement-detail");
        $scope.menutitle = NavigationService.makeactive("LeaveManagement");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.formData = {};
        // $scope.formData.personalDocument = [];
        // $scope.formData.licenseDocument = [];
        // $scope.formData.IIISLACertificate = [];
        // $scope.formData.IIISLAReciept = [];
        // $scope.formData.CTCDetails = [];
        $scope.header = {
            "name": "Create Leave"
        };
        $scope.userStatus = [{
            "name": "Active",
            "value": true
        }, {
            "name": "Inactive",
            "value": false
        }];
        $scope.status = ["Approved", "Pending", "Rejected", "Partially Approved"];
        // $scope.houseColors = ["Red", "Green", "Blue", "Yellow", "White"];

        $scope.dateOptions = {
            showWeeks: true
        };


        $scope.format = 'dd-MMMM-yyyy';
        $scope.modalData = {};
        $scope.holdObject = '';
        $scope.modalIndex = 0;

        $scope.changeDOB = function (date) {
            console.log($filter('ageFilter')(date));
        };
        $scope.minDate = new Date();
        $scope.addModal = function (filename, index, holdobj, data, current) {
            if (index !== "") {
                $scope.modalData = data;
                $scope.modalIndex = index;
                $scope.modalData.from = new Date(data.from);
                $scope.modalData.to = new Date(data.to);
            } else {
                $scope.modalData = {};
                if (current.length > 0) {
                    $scope.modalData.from = new Date(current[current.length - 1].to);
                    $scope.modalData.grade = current[current.length - 1].grade;
                }
                $scope.modalIndex = "";
            }
            $scope.holdObject = holdobj;
            console.log($scope.holdObject);
            var modalInstance = $uibModal.open({
                scope: $scope,
                templateUrl: '/frontend/views/modal/' + filename + '.html',
                size: 'lg'
            });
        };

        $scope.cancel = function () {
            $window.history.back();
        }
        hotkeys.bindTo($scope).add({
            combo: 'ctrl+enter',
            callback: function (formData) {
                NavigationService.modelSave("LeaveManagement", $scope.formData, function (data) {
                    if (data.value === true) {
                        console.log("Data In Else", data.value);
                        // $state.go('leaveManagement-list');
                        $window.history.back();
                        toastr.success("Leave Of " + " " + formData.name + " created successfully.", "Employee" + " Created");
                    } else {
                        console.log("Data In Else", data.value);
                        toastr.error("Leave Of " + " creation failed.", "Employee" + " creation error");
                    }
                });
            }
        });
        $scope.saveModel = function (formData) {
            console.log("SAVE MODEL DATA", formData);
            // $scope.formData.name = $scope.formData.firstName + " " + $scope.formData.lastName;

            NavigationService.modelSave("LeaveManagement", $scope.formData, function (data) {
                if (data.value === true) {
                    console.log("Data In Else", data.value);
                    // $state.go('leaveManagement-list');
                    $window.history.back();
                    toastr.success("Leave Of " + " " + formData.name + " created successfully.", "Employee" + " Created");
                } else {
                    console.log("Data In Else", data.value);
                    toastr.error("Leave Of " + " creation failed.", "Employee" + " creation error");
                }
            });
        };
    })



    .controller('CreateKnowledgeBaseCtrl', function ($scope, hotkeys, $window, TemplateService, NavigationService, $timeout, $state, $uibModal, $stateParams, toastr, $filter) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("knowledgeBase-detail");
        $scope.menutitle = NavigationService.makeactive("KnowledgeBase");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.formData = {};
        $scope.header = {
            "name": "Create All-Documents"
        };
        $scope.userStatus = [{
            "name": "Active",
            "value": true
        }, {
            "name": "Inactive",
            "value": false
        }];



        $scope.dateOptions = {
            showWeeks: true
        };



        $scope.format = 'dd-MMMM-yyyy';
        $scope.modalData = {};
        $scope.holdObject = '';
        $scope.modalIndex = 0;

        $scope.changeDOB = function (date) {
            console.log($filter('ageFilter')(date));
        };
        $scope.minDate = new Date();
        $scope.addModal = function (filename, index, holdobj, data, current) {
            if (index !== "") {
                $scope.modalData = data;
                $scope.modalIndex = index;
                $scope.modalData.from = new Date(data.from);
                $scope.modalData.to = new Date(data.to);
            } else {
                $scope.modalData = {};
                if (current.length > 0) {
                    $scope.modalData.from = new Date(current[current.length - 1].to);
                    $scope.modalData.grade = current[current.length - 1].grade;
                }
                $scope.modalIndex = "";
            }
            $scope.holdObject = holdobj;
            console.log($scope.holdObject);
            var modalInstance = $uibModal.open({
                scope: $scope,
                templateUrl: '/frontend/views/modal/' + filename + '.html',
                size: 'lg'
            });
        };

        $scope.refreshTags = function (data) {
            console.log("Data Inn", data);
            var formdata = {};
            formdata.keyword = data;
            NavigationService.searchTags(formdata, 1, function (data) {
                $scope.tags = data.data.results;
            });
        };
        $scope.cancel = function () {
            $window.history.back();
        }
        hotkeys.bindTo($scope).add({
            combo: 'ctrl+enter',
            callback: function (formData) {
                NavigationService.modelSave("KnowledgeBase", $scope.formData, function (data) {
                    if (data.value === true) {
                        console.log("Data In If", data.value);
                        $window.history.back();
                        toastr.success("Document for " + " " + formData.name + " created successfully.", "Employee" + " Created");
                    } else {
                        console.log("Data In Else", data.value);
                        toastr.error("Document for " + " creation failed.", "Employee" + " creation error");
                    }
                });
            }
        });
        $scope.saveModel = function (formData) {
            console.log("SAVE MODEL DATA", formData);
            NavigationService.modelSave("KnowledgeBase", $scope.formData, function (data) {
                if (data.value === true) {
                    console.log("Data In If", data.value);
                    // $state.go('knowledgebase-list');
                    $window.history.back();
                    toastr.success("Document for " + " " + formData.name + " created successfully.", "Employee" + " Created");
                } else {
                    console.log("Data In Else", data.value);
                    toastr.error("Document for " + " creation failed.", "Employee" + " creation error");
                }
            });
        };
    })

    // 
    .controller('EditKnowledgeBaseCtrl', function ($scope, hotkeys, $window, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("knowledgeBase-detail");
        $scope.menutitle = NavigationService.makeactive("Policy Type");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.userStatus = [{
            "name": "Active",
            "value": true
        }, {
            "name": "Inactive",
            "value": false
        }];
        $scope.header = {
            "name": "Edit Policy Type"
        };
        $scope.tags = [];
        $scope.refreshTags = function (data) {
            console.log("Data Inn", data);
            var formdata = {};
            formdata.keyword = data;
            NavigationService.searchTags(formdata, 1, function (data) {
                $scope.tags = data.data.results;
            });
        };

        NavigationService.getOneModel("KnowledgeBase", $stateParams.id, function (data) {
            $scope.formData = data.data;
        });
        $scope.cancel = function () {
            $window.history.back();
        }
        hotkeys.bindTo($scope).add({
            combo: 'ctrl+enter',
            callback: function (formData) {
                _.each(formData.tag, function (n) {
                    n = n._id;
                });
                NavigationService.modelSave("KnowledgeBase", $scope.formData, function (data) {
                    if (data.value === true) {
                        $window.history.back();
                        toastr.success("KnowledgeBase" + $scope.formData.name + " edited successfully.", "KnowledgeBase" + " Edited");
                    } else {
                        toastr.error("KnowledgeBase" + " edition failed.", "KnowledgeBase" + " editing error");
                    }
                });
            }
        });
        $scope.saveModel = function (formData) {
            _.each(formData.tag, function (n) {
                n = n._id;
            });
            NavigationService.modelSave("KnowledgeBase", $scope.formData, function (data) {
                if (data.value === true) {
                    $window.history.back();
                    toastr.success("KnowledgeBase" + $scope.formData.name + " edited successfully.", "KnowledgeBase" + " Edited");
                } else {
                    toastr.error("KnowledgeBase" + " edition failed.", "KnowledgeBase" + " editing error");
                }
            });
        };

    })
    // 

    .controller('CreateAllDocumentCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $state, $uibModal, $stateParams, toastr, $filter) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("all-document-details");
        $scope.menutitle = NavigationService.makeactive("Jir");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.formData = {};
        $scope.header = {
            "name": "Create Document"
        };
        $scope.userStatus = [{
            "name": "Active",
            "value": true
        }, {
            "name": "Inactive",
            "value": false
        }];



        $scope.dateOptions = {
            showWeeks: true
        };

        $scope.status = ["Jir", "Law", "Insurance", "Survey", "Surveyor", "ILR", "ILA"];

        $scope.format = 'dd-MMMM-yyyy';
        $scope.modalData = {};
        $scope.holdObject = '';
        $scope.modalIndex = 0;

        $scope.changeDOB = function (date) {
            console.log($filter('ageFilter')(date));
        };
        $scope.minDate = new Date();
        $scope.addModal = function (filename, index, holdobj, data, current) {
            if (index !== "") {
                $scope.modalData = data;
                $scope.modalIndex = index;
                $scope.modalData.from = new Date(data.from);
                $scope.modalData.to = new Date(data.to);
            } else {
                $scope.modalData = {};
                if (current.length > 0) {
                    $scope.modalData.from = new Date(current[current.length - 1].to);
                    $scope.modalData.grade = current[current.length - 1].grade;
                }
                $scope.modalIndex = "";
            }
            $scope.holdObject = holdobj;
            console.log($scope.holdObject);
            var modalInstance = $uibModal.open({
                scope: $scope,
                templateUrl: '/frontend/views/modal/' + filename + '.html',
                size: 'lg'
            });
        };

        $scope.cancel = function () {
            $window.history.back();
        }
        $scope.saveModel = function (formData) {
            console.log("SAVE MODEL DATA", formData);

            NavigationService.modelSave("Jir", $scope.formData, function (data) {
                if (data.value === true) {
                    console.log("Data In If", data.value);
                    // $state.go('all-document');
                    $window.history.back();
                    toastr.success("Document for " + " " + formData.name + " created successfully.", "Document" + " Created");
                } else {
                    console.log("Data In Else", data.value);
                    toastr.error("Document for " + " creation failed.", "Document" + " creation error");
                }
            });
        };
    })

    .controller('CreateReimbursementCtrl', function ($scope, hotkeys, $window, TemplateService, NavigationService, $timeout, $state, $uibModal, $stateParams, toastr, $filter) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("reimbursement-detail");
        $scope.menutitle = NavigationService.makeactive("Reimbursement");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.formData = {};
        // $scope.formData.personalDocument = [];
        // $scope.formData.licenseDocument = [];
        // $scope.formData.IIISLACertificate = [];
        // $scope.formData.IIISLAReciept = [];
        // $scope.formData.CTCDetails = [];
        $scope.header = {
            "name": "Create Reimbursement"
        };
        $scope.userStatus = [{
            "name": "Active",
            "value": true
        }, {
            "name": "Inactive",
            "value": false
        }];
        $scope.status = ["Approved", "Pending", "Rejected", "Partially Approved"];
        // $scope.houseColors = ["Red", "Green", "Blue", "Yellow", "White"];

        $scope.dateOptions = {
            showWeeks: true
        };


        $scope.format = 'dd-MMMM-yyyy';
        $scope.modalData = {};
        $scope.holdObject = '';
        $scope.modalIndex = 0;

        $scope.changeDOB = function (date) {
            console.log($filter('ageFilter')(date));
        };
        $scope.minDate = new Date();
        $scope.addModal = function (filename, index, holdobj, data, current) {
            if (index !== "") {
                $scope.modalData = data;
                $scope.modalIndex = index;

            } else {
                $scope.modalData = {};
                if (current.length > 0) {}
                $scope.modalIndex = "";
            }
            $scope.holdObject = holdobj;
            console.log($scope.holdObject, filename);
            var modalInstance = $uibModal.open({
                scope: $scope,
                templateUrl: '/frontend/views/modal/' + filename + '.html',
                size: 'lg'
            });
        };
        $scope.deleteElements = function (index, data) {
            data.splice(index, 1);
        };
        $scope.wholeObj = [];
        $scope.formData.expense = [];
        $scope.addElements = function (moddata) {
            console.log("moddata", moddata);
            if ($scope.modalIndex !== "") {
                $scope.wholeObj[$scope.modalIndex] = moddata;
            } else {
                $scope.newjson = moddata;
                var a = moddata;
                console.log("A", a, $scope.holdObject);
                switch ($scope.holdObject) {
                    case "expense":
                        {


                            //  var newmod = a;
                            //  console.log("kjfgaksdjhfjakshdgk");
                            //  console.log(newmod);
                            // _.each(newmod, function (n) {
                            // $scope.newjson.item = n;
                            // $scope.wholeObj.push(moddata);
                            $scope.formData.expense.push(moddata);
                            // });
                        }
                        break;
                    case "products":
                        {
                            var newmod1 = a.item.split(',');
                            _.each(newmod1, function (n) {
                                $scope.newjson.item = n;
                                $scope.wholeObj.push($scope.newjson);
                            });
                        }
                        break;
                    case "LRs":
                        var newmod2 = a.lrNumber.split(',');
                        _.each(newmod2, function (n) {
                            $scope.newjson.lrNumber = n;
                            $scope.wholeObj.push($scope.newjson);
                        });
                        break;
                    case "Vehicle":
                        var newmod3 = a.vehicleNumber.split(',');
                        _.each(newmod3, function (n) {
                            $scope.newjson.vehicleNumber = n;
                            $scope.wholeObj.push($scope.newjson);
                        });
                        break;

                    default:
                        {
                            $scope.wholeObj.push($scope.newjson);
                        }

                }

            }
        };

        $scope.cancel = function () {
            $window.history.back();
        }
        hotkeys.bindTo($scope).add({
            combo: 'ctrl+enter',
            callback: function (formData) {
                NavigationService.modelSave("Reimbursement", $scope.formData, function (data) {
                    console.log($scope.formData);
                    console.log(data.value);
                    if (data.value === true) {
                        console.log("Data In If", data.value);
                        // $state.go('reimbursement-list');
                        $window.history.back();
                        toastr.success("Reimbursement Of " + " " + formData.name + " created successfully.", "Employee" + " Created");
                    } else {
                        console.log("Data In Else", data.value);
                        toastr.error("Reimbursement Of " + " creation failed.", "Employee" + " creation error");
                    }
                });
            }
        });
        $scope.saveModel = function (formData) {
            console.log(formData);
            NavigationService.modelSave("Reimbursement", $scope.formData, function (data) {
                console.log($scope.formData);
                console.log(data.value);
                if (data.value === true) {
                    console.log("Data In If", data.value);
                    // $state.go('reimbursement-list');
                    $window.history.back();
                    toastr.success("Reimbursement Of " + " " + formData.name + " created successfully.", "Employee" + " Created");
                } else {
                    console.log("Data In Else", data.value);
                    toastr.error("Reimbursement Of " + " creation failed.", "Employee" + " creation error");
                }
            });
        };
    })


    .controller('EditReimbursementCtrl', function ($scope, hotkeys, $window, TemplateService, NavigationService, $timeout, $state, $uibModal, $stateParams, toastr, $filter) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("reimbursement-detail");
        $scope.menutitle = NavigationService.makeactive("Reimbursement");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.formData = {};

        $scope.header = {
            "name": "Edit Reimbursement"
        };
        $scope.userStatus = [{
            "name": "Active",
            "value": true
        }, {
            "name": "Inactive",
            "value": false
        }];
        $scope.status = ["Approved", "Pending", "Rejected", "Partially Approved"];
        $scope.dateOptions = {
            showWeeks: true
        };


        $scope.format = 'dd-MMMM-yyyy';
        $scope.modalData = {};
        $scope.holdObject = '';
        $scope.modalIndex = 0;

        $scope.changeDOB = function (date) {
            console.log($filter('ageFilter')(date));
        };
        $scope.minDate = new Date();
        $scope.addModal = function (filename, index, holdobj, data, current) {
            if (index !== "") {
                $scope.modalData = data;
                $scope.modalIndex = index;
            } else {
                $scope.modalData = {};
                if (current.length > 0) {}
                $scope.modalIndex = "";
            }
            $scope.holdObject = holdobj;
            console.log($scope.holdObject);
            var modalInstance = $uibModal.open({
                scope: $scope,
                templateUrl: '/frontend/views/modal/' + filename + '.html',
                size: 'lg'
            });
        };
        $scope.addElements = function (moddata) {
            console.log("moddata", moddata);
            if ($scope.modalIndex !== "") {
                $scope.wholeObj[$scope.modalIndex] = moddata;
            } else {
                $scope.newjson = moddata;
                var a = moddata;
                console.log("A", a, $scope.holdObject);
                switch ($scope.holdObject) {
                    case "expense":
                        {


                            //  var newmod = a;
                            //  console.log("kjfgaksdjhfjakshdgk");
                            //  console.log(newmod);
                            // _.each(newmod, function (n) {
                            // $scope.newjson.item = n;
                            // $scope.wholeObj.push(moddata);
                            $scope.formData.expense.push(moddata);
                            // });
                        }
                        break;
                    case "products":
                        {
                            var newmod1 = a.item.split(',');
                            _.each(newmod1, function (n) {
                                $scope.newjson.item = n;
                                $scope.wholeObj.push($scope.newjson);
                            });
                        }
                        break;
                    case "LRs":
                        var newmod2 = a.lrNumber.split(',');
                        _.each(newmod2, function (n) {
                            $scope.newjson.lrNumber = n;
                            $scope.wholeObj.push($scope.newjson);
                        });
                        break;
                    case "Vehicle":
                        var newmod3 = a.vehicleNumber.split(',');
                        _.each(newmod3, function (n) {
                            $scope.newjson.vehicleNumber = n;
                            $scope.wholeObj.push($scope.newjson);
                        });
                        break;

                    default:
                        {
                            $scope.wholeObj.push($scope.newjson);
                        }

                }

            }
        };
        $scope.deleteElements = function (index, data) {
            data.splice(index, 1);
        };

        NavigationService.getOneModel("Reimbursement", $stateParams.id, function (data) {
            $scope.formData = data.data;
            console.log("$scope.formData", $scope.formData);
            if (data.data.name) {
                $scope.formData.name = data.data.name._id;
                $scope.formData.assignment = data.data.assignment._id;
            }
            if (data.data.fromDate) {
                $scope.formData.fromDate = new Date(data.data.fromDate);
            }
            if (data.data.toDate) {
                $scope.formData.toDate = new Date(data.data.toDate);
            }
            if (data.data.approvedFrom) {
                $scope.formData.approvedFrom = new Date(data.data.approvedFrom);
            }
            if (data.data.approvedTo) {
                $scope.formData.approvedTo = new Date(data.data.approvedTo);
            }
            // $scope.formData.name = $scope.formData.companyShortName + '-' + $scope.formData.TOFShortName + '-' + $scope.formData.officeCode + '-' + $scope.formData.city1;
        });

        $scope.cancel = function () {
            $window.history.back();
        }
        hotkeys.bindTo($scope).add({
            combo: 'ctrl+enter',
            callback: function (formData) {
                NavigationService.modelSave("Reimbursement", $scope.formData, function (data) {
                    if (data.value === true) {
                        console.log("Data In Else", data.value);
                        // $state.go('reimbursement-list');
                        $window.history.back();
                        toastr.success("Leave Of " + " " + formData.name + " created successfully.", "Leave" + " Created");
                    } else {
                        console.log("Data In Else", data.value);
                        toastr.error("Reimbursement Of " + " creation failed.", "Reimbursement" + " creation error");
                    }
                });
            }
        });
        $scope.saveModel = function (formData) {
            console.log(formData);
            // $scope.formData.name = $scope.formData.firstName + " " + $scope.formData.lastName;

            NavigationService.modelSave("Reimbursement", $scope.formData, function (data) {
                if (data.value === true) {
                    console.log("Data In Else", data.value);
                    // $state.go('reimbursement-list');
                    $window.history.back();
                    toastr.success("Leave Of " + " " + formData.name + " created successfully.", "Leave" + " Created");
                } else {
                    console.log("Data In Else", data.value);
                    toastr.error("Reimbursement Of " + " creation failed.", "Reimbursement" + " creation error");
                }
            });
        };
    })


    .controller('EditLeaveCtrl', function ($scope, hotkeys, $window, TemplateService, NavigationService, $timeout, $state, $uibModal, $stateParams, toastr, $filter) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("leaveManagement-detail");
        $scope.menutitle = NavigationService.makeactive("LeaveManagement");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.formData = {};

        $scope.header = {
            "name": "Edit Leave"
        };
        $scope.userStatus = [{
            "name": "Active",
            "value": true
        }, {
            "name": "Inactive",
            "value": false
        }];
        $scope.status = ["Approved", "Pending", "Rejected", "Partially Approved"];
        $scope.dateOptions = {
            showWeeks: true
        };


        $scope.format = 'dd-MMMM-yyyy';
        $scope.modalData = {};
        $scope.holdObject = '';
        $scope.modalIndex = 0;

        $scope.changeDOB = function (date) {
            console.log($filter('ageFilter')(date));
        };
        $scope.minDate = new Date();
        $scope.addModal = function (filename, index, holdobj, data, current) {
            if (index !== "") {
                $scope.modalData = data;
                $scope.modalIndex = index;
                $scope.modalData.from = new Date(data.from);
                $scope.modalData.to = new Date(data.to);
            } else {
                $scope.modalData = {};
                if (current.length > 0) {
                    $scope.modalData.from = new Date(current[current.length - 1].to);
                    $scope.modalData.grade = current[current.length - 1].grade;
                }
                $scope.modalIndex = "";
            }
            $scope.holdObject = holdobj;
            console.log($scope.holdObject);
            var modalInstance = $uibModal.open({
                scope: $scope,
                templateUrl: '/frontend/views/modal/' + filename + '.html',
                size: 'lg'
            });
        };

        NavigationService.getOneModel("LeaveManagement", $stateParams.id, function (data) {
            $scope.formData = data.data;
            console.log("$scope.formData", $scope.formData);
            if (data.data.name) {
                $scope.formData.name = data.data.name._id;
                console.log("$scope.formData.fromDate", $scope.formData.fromDate);
            }
            if (data.data.fromDate) {
                $scope.formData.fromDate = new Date(data.data.fromDate);
            }
            if (data.data.toDate) {
                $scope.formData.toDate = new Date(data.data.toDate);
            }
            if (data.data.approvedFrom) {
                $scope.formData.approvedFrom = new Date(data.data.approvedFrom);
            }
            if (data.data.approvedTo) {
                $scope.formData.approvedTo = new Date(data.data.approvedTo);
            }
            // $scope.formData.name = $scope.formData.companyShortName + '-' + $scope.formData.TOFShortName + '-' + $scope.formData.officeCode + '-' + $scope.formData.city1;
        });
        $scope.cancel = function () {
            $window.history.back();
        }
        hotkeys.bindTo($scope).add({
            combo: 'ctrl+enter',
            callback: function (formData) {
                NavigationService.modelSave("LeaveManagement", $scope.formData, function (data) {
                    if (data.value === true) {
                        console.log("Data In Else", data.value);
                        // $state.go('leaveManagement-list');
                        $window.history.back();
                        toastr.success("Leave Of " + " " + formData.name + " created successfully.", "Leave" + " Created");
                    } else {
                        console.log("Data In Else", data.value);
                        toastr.error("Leave Of " + " creation failed.", "Leave" + " creation error");
                    }
                });
            }
        });
        $scope.saveModel = function (formData) {
            console.log(formData);
            // $scope.formData.name = $scope.formData.firstName + " " + $scope.formData.lastName;
            NavigationService.modelSave("LeaveManagement", $scope.formData, function (data) {
                if (data.value === true) {
                    console.log("Data In Else", data.value);
                    // $state.go('leaveManagement-list');
                    $window.history.back();
                    toastr.success("Leave Of " + " " + formData.name + " created successfully.", "Leave" + " Created");
                } else {
                    console.log("Data In Else", data.value);
                    toastr.error("Leave Of " + " creation failed.", "Leave" + " creation error");
                }
            });
        };
    })

    .controller('CreateEmployeeCtrl', function ($scope, hotkeys, $window, TemplateService, NavigationService, $timeout, $state, $uibModal, $stateParams, toastr, $filter) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("employee-detail");
        $scope.menutitle = NavigationService.makeactive("Employee");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.formData = {};
        $scope.formData.personalDocument = [];
        $scope.formData.licenseDocument = [];
        $scope.formData.IIISLACertificate = [];
        $scope.formData.IIISLAReciept = [];
        $scope.formData.CTCDetails = [];
        $scope.header = {
            "name": "Create Employee"
        };
        $scope.userStatus = [{
            "name": "Active",
            "value": true
        }, {
            "name": "Inactive",
            "value": false
        }];
        $scope.cancel = function () {
            $window.history.back();
        }
        $scope.salutations = ["Mr.", "Mrs.", "Ms.", "Dr."];
        $scope.houseColors = ["Red", "Green", "Blue", "Yellow", "White"];

        $scope.dateOptions = {
            showWeeks: true
        };

        $scope.popup = {
            to: false,
            from: false,
            toReciept: false,
            fromReciept: false,
            toCertificate: false,
            fromCertificate: false,
            toLicense: false,
            fromLicense: false,
            birthDate: false,
            marriageDate: false,
            joiningDate: false,
            leavingDate: false
        };

        $scope.format = 'dd-MMMM-yyyy';
        $scope.modalData = {};
        $scope.holdObject = '';
        $scope.modalIndex = 0;

        $scope.changeDOB = function (date) {
            console.log($filter('ageFilter')(date));
        };
        $scope.minDate = new Date();
        $scope.addModal = function (filename, index, holdobj, data, current) {
            if (index !== "") {
                $scope.modalData = data;
                $scope.modalIndex = index;
                $scope.modalData.from = new Date(data.from);
                $scope.modalData.to = new Date(data.to);
            } else {
                $scope.modalData = {};
                if (current.length > 0) {
                    $scope.modalData.from = new Date(current[current.length - 1].to);
                    $scope.modalData.grade = current[current.length - 1].grade;
                }
                $scope.modalIndex = "";
            }
            $scope.holdObject = holdobj;
            console.log($scope.holdObject);
            var modalInstance = $uibModal.open({
                scope: $scope,
                templateUrl: '/frontend/views/modal/' + filename + '.html',
                size: 'lg'
            });
        };
        $scope.addElements = function (data) {
            console.log(data);
            console.log($scope.holdObject);
            switch ($scope.holdObject) {
                case 'personalDocument':
                    if ($scope.modalIndex !== "") {
                        $scope.formData.personalDocument[$scope.modal] = data;
                    } else {
                        $scope.formData.personalDocument.push(data);
                    }
                    break;
                case 'licenseDocument':
                    if ($scope.modalIndex !== "") {
                        $scope.formData.licenseDocument[$scope.modal] = data;
                    } else {
                        $scope.formData.licenseDocument.push(data);
                    }
                    break;
                case 'IIISLACertificate':
                    if ($scope.modalIndex !== "") {
                        $scope.formData.IIISLACertificate[$scope.modal] = data;
                    } else {
                        $scope.formData.IIISLACertificate.push(data);
                    }
                    break;
                case 'IIISLAReciept':
                    if ($scope.modalIndex !== "") {
                        $scope.formData.IIISLAReciept[$scope.modal] = data;
                    } else {
                        $scope.formData.IIISLAReciept.push(data);
                    }
                    break;
                case 'CTCDetails':
                    if ($scope.modalIndex !== "") {
                        $scope.formData.CTCDetails[$scope.modal] = data;
                        $scope.formData.grade = $scope.formData.CTCDetails[$scope.formData.CTCDetails.length - 1].grade;
                    } else {
                        $scope.formData.CTCDetails.push(data);
                        $scope.formData.grade = $scope.formData.CTCDetails[$scope.formData.CTCDetails.length - 1].grade;
                    }
                    break;
                default:

            }
        };
        $scope.editElements = function (elemObject, data) {

        };
        $scope.deleteElements = function (index, name) {
            switch (name) {
                case 'personalDocument':
                    $scope.formData.personalDocument.splice(index, 1);
                    break;
                case 'licenseDocument':
                    $scope.formData.licenseDocument.splice(index, 1);
                    break;
                case 'IIISLACertificate':
                    $scope.formData.IIISLACertificate.splice(index, 1);
                    break;
                case 'IIISLAReciept':
                    $scope.formData.IIISLAReciept.splice(index, 1);
                    break;
                case 'CTCDetails':
                    $scope.formData.CTCDetails.splice(index, 1);
                    break;
                default:

            }
        };

        $scope.cancel = function () {
            $window.history.back();
        }
        hotkeys.bindTo($scope).add({
            combo: 'ctrl+enter',
            callback: function (formData) {
                if (formData.lat && formData.lng) {
                    formData.location = [];
                    formData.location.push(formData.lat);
                    formData.location.push(formData.lng);
                }
                $scope.formData.name = $scope.formData.firstName + " " + $scope.formData.lastName;
                NavigationService.modelSave("Employee", $scope.formData, function (data) {
                    if (data.value === true) {
                        // $state.go('employee-list');
                        $window.history.back();
                        toastr.success("Employee" + " " + formData.name + " created successfully.", "Employee" + " Created");
                    } else {
                        toastr.error("Employee" + " creation failed.", "Employee" + " creation error");
                    }
                });
            }
        });
        $scope.saveModel = function (formData) {
            if (formData.lat && formData.lng) {
                formData.location = [];
                formData.location.push(formData.lat);
                formData.location.push(formData.lng);
            }
            console.log(formData);
            $scope.formData.name = $scope.formData.firstName + " " + $scope.formData.lastName;
            NavigationService.modelSave("Employee", $scope.formData, function (data) {
                if (data.value === true) {
                    // $state.go('employee-list');
                    $window.history.back();
                    toastr.success("Employee" + " " + formData.name + " created successfully.", "Employee" + " Created");
                } else {
                    toastr.error("Employee" + " creation failed.", "Employee" + " creation error");
                }
            });
        };
    })
    .controller('EditEmployeeCtrl', function ($scope, hotkeys, $window, TemplateService, NavigationService, $timeout, $state, $stateParams, $filter, $uibModal, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("employee-detail");
        $scope.menutitle = NavigationService.makeactive("Employee");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.formData = {};
        $scope.formData.personalDocument = [];
        $scope.formData.licenseDocument = [];
        $scope.formData.IIISLACertificate = [];
        $scope.formData.IIISLAReciept = [];
        $scope.formData.CTCDetails = [];
        $scope.uploadMsg = "";
        $scope.modalData = {};
        $scope.uploadurl = imgpath;
        console.log($scope.uploadurl);
        $scope.header = {
            "name": "Edit Employee"
        };
        $scope.userStatus = [{
            "name": "Active",
            "value": true
        }, {
            "name": "Inactive",
            "value": false
        }];

        $scope.salutations = ["Mr.", "Mrs.", "Ms.", "Dr."];
        $scope.houseColors = ["Red", "Green", "Blue", "Yellow", "White"];

        $scope.dateOptions = {
            showWeeks: true
        };

        $scope.popup = {
            to: false,
            from: false,
            toReciept: false,
            fromReciept: false,
            toCertificate: false,
            fromCertificate: false,
            toLicense: false,
            fromLicense: false,
            birthDate: false,
            marriageDate: false,
            joiningDate: false,
            leavingDate: false
        };

        $scope.format = 'dd-MMMM-yyyy';
        $scope.modalData = {};
        $scope.modalData1 = {};
        $scope.holdObject = '';
        $scope.modalIndex = 0;

        $scope.changeDOB = function (date) {
            console.log($filter('ageFilter')(date));
        };



        $scope.addModal = function (filename, index, holdobj, data, current) {

            if (index !== "") {
                $scope.modalData = data;
                $scope.modalData.from = new Date(data.from);
                $scope.modalData.to = new Date(data.to);

                $scope.modalIndex = index;
            } else {
                $scope.modalData = {};
                console.log(moment());
                if (current.length > 0) {
                    $scope.modalData.from = new Date(current[current.length - 1].to);
                    $scope.modalData.from = $scope.modalData.from.setDate($scope.modalData.from.getDate() + 1);
                    $scope.modalData.grade = current[current.length - 1].grade;
                }
                $scope.modalIndex = "";
            }
            $scope.holdObject = holdobj;
            var modalInstance = $uibModal.open({
                scope: $scope,
                templateUrl: '/frontend/views/modal/' + filename + '.html',
                size: 'lg'
            });
        };

        $scope.addElements = function (data) {
            switch ($scope.holdObject) {
                case 'personalDocument':
                    if ($scope.modalIndex !== "") {
                        $scope.formData.personalDocument[$scope.modal] = data;
                    } else {
                        $scope.formData.personalDocument.push(data);
                    }
                    break;
                case 'licenseDocument':
                    if ($scope.modalIndex !== "") {
                        $scope.formData.licenseDocument[$scope.modal] = data;
                    } else {
                        $scope.formData.licenseDocument.push(data);
                    }
                    break;
                case 'IIISLACertificate':
                    if ($scope.modalIndex !== "") {
                        $scope.formData.IIISLACertificate[$scope.modal] = data;
                    } else {
                        $scope.formData.IIISLACertificate.push(data);
                    }
                    break;
                case 'IIISLAReciept':
                    if ($scope.modalIndex !== "") {
                        $scope.formData.IIISLAReciept[$scope.modal] = data;
                    } else {
                        $scope.formData.IIISLAReciept.push(data);
                    }
                    break;
                case 'CTCDetails':
                    if ($scope.modalIndex !== "") {
                        $scope.formData.CTCDetails[$scope.modal] = data;
                        $scope.formData.grade = $scope.formData.CTCDetails[$scope.formData.CTCDetails.length - 1].grade;
                    } else {
                        $scope.formData.CTCDetails.push(data);
                        $scope.formData.grade = $scope.formData.CTCDetails[$scope.formData.CTCDetails.length - 1].grade;

                    }
                    break;
                default:

            }
        };
        $scope.editElements = function (elemObject, data) {

        };
        $scope.deleteElements = function (index, name) {
            switch (name) {
                case 'personalDocument':
                    $scope.formData.personalDocument.splice(index, 1);
                    break;
                case 'licenseDocument':
                    $scope.formData.licenseDocument.splice(index, 1);
                    break;
                case 'IIISLACertificate':
                    $scope.formData.IIISLACertificate.splice(index, 1);
                    break;
                case 'IIISLAReciept':
                    $scope.formData.IIISLAReciept.splice(index, 1);
                    break;
                case 'CTCDetails':
                    $scope.formData.CTCDetails.splice(index, 1);
                    break;
                default:

            }
        };


        NavigationService.getOneModel("Employee", $stateParams.id, function (data) {
            $scope.formData = data.data;
            if (data.data.city) {
                $scope.formData.country = data.data.city.district.state.zone.country._id;
                $scope.formData.zone = data.data.city.district.state.zone._id;
                $scope.formData.state = data.data.city.district.state._id;
                $scope.formData.district = data.data.city.district._id;
                $scope.formData.city = data.data.city._id;
            }
            NavigationService.getDepartment(function (data1) {
                $scope.departments = data1.data.results;
            });
            if (data.data.birthDate) {
                $scope.formData.birthDate = new Date(data.data.birthDate);
            }
            if (data.data.joiningDate) {
                $scope.formData.joiningDate = new Date(data.data.joiningDate);
            }
            if (data.data.marriageDate) {
                $scope.formData.marriageDate = new Date(data.data.marriageDate);
            }
            if (data.data.leavingDate) {
                $scope.formData.leavingDate = new Date(data.data.leavingDate);
            }
        });
        $scope.cancel = function () {
            $window.history.back();
        }
        hotkeys.bindTo($scope).add({
            combo: 'ctrl+enter',
            callback: function (formData) {
                if (formData.lat && formData.lng) {
                    formData.location = [];
                    formData.location.push(formData.lat);
                    formData.location.push(formData.lng);
                }
                $scope.formData.name = $scope.formData.firstName + " " + $scope.formData.lastName;
                console.log($scope.formData);
                NavigationService.modelSave("Employee", $scope.formData, function (data) {
                    if (data.value === true) {
                        // $state.go('employee-list');
                        $window.history.back();
                        toastr.success("Employee" + $scope.formData.name + " edited successfully.", "Employee" + " Edited");
                    } else {
                        toastr.error("Employee" + " edition failed.", "Employee" + " editing error");
                    }
                });
            }
        });
        $scope.saveModel = function (formData) {
            if (formData.lat && formData.lng) {
                formData.location = [];
                formData.location.push(formData.lat);
                formData.location.push(formData.lng);
            }
            $scope.formData.name = $scope.formData.firstName + " " + $scope.formData.lastName;
            NavigationService.modelSave("Employee", $scope.formData, function (data) {
                if (data.value === true) {
                    // $state.go('employee-list');
                    $window.history.back();
                    toastr.success("Employee" + $scope.formData.name + " edited successfully.", "Employee" + " Edited");
                } else {
                    toastr.error("Employee" + " edition failed.", "Employee" + " editing error");
                }
            });
        };
    })

    .controller('ProductCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $state, $stateParams, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("product-list");
        $scope.menutitle = NavigationService.makeactive("Product");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.currentPage = $stateParams.page;
        var i = 0;
        $scope.search = {
            keyword: ""
        };
        if ($stateParams.keyword) {
            $scope.search.keyword = $stateParams.keyword;
        }
        $scope.showAllCountries = function (keywordChange) {
            $scope.totalItems = undefined;
            if (keywordChange) {
                $scope.currentPage = 1;
            }
            NavigationService.searchProduct({
                page: $scope.currentPage,
                keyword: $scope.search.keyword
            }, ++i, function (data, ini) {
                if (ini == i) {
                    $scope.allProduct = data.data.results;
                    $scope.totalItems = data.data.total;
                    $scope.maxRow = data.data.options.count;
                }
            });
        };
        $scope.cancel = function () {
            $window.history.back();
        };
        $scope.changePage = function (page) {
            var goTo = "product-list";
            if ($scope.search.keyword) {
                goTo = "product-list";
            }
            $state.go(goTo, {
                page: page,
                keyword: $scope.search.keyword
            });
        };
        $scope.showAllCountries();
        $scope.deleteProduct = function (id) {
            globalfunction.confDel(function (value) {
                console.log(value);
                if (value) {
                    NavigationService.deleteProduct(id, function (data) {
                        if (data.value) {
                            $scope.showAllCountries();
                            toastr.success("Product deleted successfully.", "Product deleted");
                        } else {
                            toastr.error("There was an error while deleting Product", "Product deleting error");
                        }
                    });
                }
            });
        };
    })
    .controller('CreateProductCtrl', function ($scope, hotkeys, $window, TemplateService, NavigationService, $timeout, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("product-detail");
        $scope.menutitle = NavigationService.makeactive("Product");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.header = {
            "name": "Create Product"
        };
        $scope.userStatus = [{
            "name": "Active",
            "value": true
        }, {
            "name": "Inactive",
            "value": false
        }];
        $scope.formData = {};
        $scope.cancel = function () {
            $window.history.back();
        };
        hotkeys.bindTo($scope).add({
            combo: 'ctrl+enter',
            callback: function (formData) {
                NavigationService.productSave($scope.formData, function (data) {
                    if (data.value === true) {
                        // $state.go('product-list');
                        $window.history.back();
                        toastr.success("Product " + formData.name + " created successfully.", "Product Created");
                    } else {
                        toastr.error("Product creation failed.", "Product creation error");
                    }
                });
            }
        });
        $scope.saveProduct = function (formData) {
            NavigationService.productSave($scope.formData, function (data) {
                if (data.value === true) {
                    // $state.go('product-list');
                    $window.history.back();
                    toastr.success("Product " + formData.name + " created successfully.", "Product Created");
                } else {
                    toastr.error("Product creation failed.", "Product creation error");
                }
            });
        };

    })
    .controller('EditProductCtrl', function ($scope, hotkeys, $window, TemplateService, NavigationService, $timeout, $state, $stateParams, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("product-detail");
        $scope.menutitle = NavigationService.makeactive("Product");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.header = {
            "name": "Edit Product "
        };
        $scope.userStatus = [{
            "name": "Active",
            "value": true
        }, {
            "name": "Inactive",
            "value": false
        }];
        NavigationService.getOneProduct($stateParams.id, function (data) {
            $scope.formData = data.data;
            $scope.formData.industry = data.data.category.industry._id;
            $scope.formData.category = data.data.category._id;

        });
        $scope.cancel = function () {
            $window.history.back();
        };
        hotkeys.bindTo($scope).add({
            combo: 'ctrl+enter',
            callback: function (formData) {
                NavigationService.productSave($scope.formData, function (data) {
                    if (data.value === true) {
                        $window.history.back();
                        toastr.success("Product " + $scope.formData.name + " edited successfully.", "Product Edited");
                    } else {
                        toastr.error("Product edition failed.", "Product editing error");
                    }
                });
            }
        });
        $scope.saveProduct = function (formValid) {
            NavigationService.productSave($scope.formData, function (data) {
                if (data.value === true) {
                    $window.history.back();
                    toastr.success("Product " + $scope.formData.name + " edited successfully.", "Product Edited");
                } else {
                    toastr.error("Product edition failed.", "Product editing error");
                }
            });
        };
    })
    .controller('SalvageCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("salvage-list");
        $scope.menutitle = NavigationService.makeactive("Salvage");
        TemplateService.title = $scope.menutitle;

        $scope.navigation = NavigationService.getnav();

        $scope.showAllSalvage = function () {
            NavigationService.getAllSalvage(function (data) {
                $scope.allSalvage = data.data;
                console.log('$scope.allSalvage', $scope.allSalvage);

            });
        };
        $scope.showAllSalvage();

        $scope.deleteSalvage = function (id) {

            NavigationService.deleteSalvage({
                id: id
            }, function (data) {
                $scope.showAllSalvage();

            });
        };
    })
    .controller('CreateSalvageCtrl', function ($scope, hotkeys, $window, TemplateService, NavigationService, $timeout, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("salvage-detail");
        $scope.menutitle = NavigationService.makeactive("Salvage");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.header = {
            "name": "Edit Salvage "
        };
        $scope.userStatus = [{
            "name": "Active",
            "value": true
        }, {
            "name": "Inactive",
            "value": false
        }];
        $scope.formData = {};
        $scope.cancel = function () {
            $window.history.back();
        };
        hotkeys.bindTo($scope).add({
            combo: 'ctrl+enter',
            callback: function (formData) {
                NavigationService.salvageSave($scope.formData, function (data) {
                    if (data.value === true) {
                        // $state.go('salvage-list');
                        $window.history.back();
                    }

                });
            }
        });
        $scope.saveSalvage = function (formData) {
            NavigationService.salvageSave($scope.formData, function (data) {
                if (data.value === true) {
                    // $state.go('salvage-list');
                    $window.history.back();
                }

            });
        };
    })
    .controller('EditSalvageCtrl', function ($scope, hotkeys, $window, TemplateService, NavigationService, $timeout, $state, $stateParams) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("salvage-detail");
        $scope.menutitle = NavigationService.makeactive("Salvage");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.userStatus = [{
            "name": "Active",
            "value": true
        }, {
            "name": "Inactive",
            "value": false
        }];

        NavigationService.getOneSalvage($stateParams.id, function (data) {
            $scope.formData = data.data;
            console.log(data.data);

        });
        $scope.cancel = function () {
            $window.history.back();
        };
        hotkeys.bindTo($scope).add({
            combo: 'ctrl+enter',
            callback: function (formData) {
                NavigationService.salvageEditSave($scope.formData, function (data) {
                    if (data.value === true) {
                        // $state.go('salvage-list');
                        $window.history.back();
                    }
                });
            }
        });
        $scope.saveSalvage = function (formValid) {
            NavigationService.salvageEditSave($scope.formData, function (data) {
                if (data.value === true) {
                    // $state.go('salvage-list');
                    $window.history.back();
                }
            });
        };
    })
    .controller('BankMasterCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $state, $stateParams, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("bankmaster-list");
        $scope.menutitle = NavigationService.makeactive("Bank List");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.currentPage = $stateParams.page;
        var i = 0;
        $scope.search = {
            keyword: ""
        };
        if ($stateParams.keyword) {
            $scope.search.keyword = $stateParams.keyword;
        }
        $scope.showAllCountries = function (keywordChange) {
            $scope.totalItems = undefined;
            if (keywordChange) {
                $scope.currentPage = 1;
            }
            NavigationService.searchBank({
                page: $scope.currentPage,
                keyword: $scope.search.keyword
            }, ++i, function (data, ini) {
                console.log(data.data);

                if (ini == i) {
                    console.log(data.data);
                    $scope.allBank = data.data.results;
                    $scope.totalItems = data.data.total;
                    $scope.maxRow = data.data.options.count;
                }
            });
        };
        $scope.cancel = function () {
            $window.history.back();
        };
        $scope.changePage = function (page) {
            var goTo = "bankMaster-list";
            if ($scope.search.keyword) {
                goTo = "bankMaster-list";
            }
            $state.go(goTo, {
                page: page,
                keyword: $scope.search.keyword
            });
        };
        $scope.showAllCountries();

        $scope.deleteBank = function (id) {
            globalfunction.confDel(function (value) {
                if (value) {
                    NavigationService.deleteBank(id, function (data) {
                        if (data.value) {
                            $scope.showAllCountries();
                            toastr.success("Bank deleted successfully.", "Bank deleted");
                        } else {
                            toastr.error("There was an error while deleting Bank", "Bank deleting error");
                        }


                    });
                }
            });
        };
        $scope.changeStatus = function (ind) {
            NavigationService.bankSave(ind, function (data) {
                if (data.value === true) {}
            });
        };
    })
    .controller('CreateBankmasterCtrl', function ($scope, hotkeys, $window, TemplateService, NavigationService, $timeout, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("bankMaster-detail");
        $scope.menutitle = NavigationService.makeactive("Create Bank");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.formData = {};
        $scope.userStatus = [{
            "name": "Active",
            "value": true
        }, {
            "name": "Inactive",
            "value": false
        }];
        $scope.header = {
            "name": "Create Bank Master"
        };
        $scope.cancel = function () {
            $window.history.back();
        };
        hotkeys.bindTo($scope).add({
            combo: 'ctrl+enter',
            callback: function (formData) {
                NavigationService.bankSave($scope.formData, function (data) {
                    if (data.value === true) {
                        // $state.go('bankMaster-list');
                        $window.history.back();
                        toastr.success("Bank " + $scope.formData.name + " created successfully.", "Bank Created");
                    } else {
                        toastr.error("Bank creation failed.", "Bank creation error");
                    }
                });
            }
        });
        $scope.saveBank = function (formData) {
            NavigationService.bankSave($scope.formData, function (data) {
                if (data.value === true) {
                    // $state.go('bankMaster-list');
                    $window.history.back();
                    toastr.success("Bank " + $scope.formData.name + " created successfully.", "Bank Created");
                } else {
                    toastr.error("Bank creation failed.", "Bank creation error");
                }
            });
        };
    })
    .controller('EditBankmasterCtrl', function ($scope, hotkeys, $window, TemplateService, NavigationService, $timeout, $state, $stateParams, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("bankMaster-detail");
        $scope.menutitle = NavigationService.makeactive("Edit Bank");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.userStatus = [{
            "name": "Active",
            "value": true
        }, {
            "name": "Inactive",
            "value": false
        }];
        $scope.header = {
            "name": "Edit Bank Master"
        };
        NavigationService.getOneBank($stateParams.id, function (data) {
            $scope.formData = data.data;
            console.log(data.data);

        });
        $scope.cancel = function () {
            $window.history.back();
        };
        hotkeys.bindTo($scope).add({
            combo: 'ctrl+enter',
            callback: function (formData) {
                NavigationService.bankSave($scope.formData, function (data) {
                    if (data.value === true) {
                        // $state.go('bankMaster-list');
                        $window.history.back();
                        toastr.success("Bank " + $scope.formData.name + " created successfully.", "Bank Created");
                    } else {
                        toastr.error("Bank creation failed.", "Bank creation error");
                    }
                });
            }
        });
        $scope.saveBank = function (formValid) {
            NavigationService.bankSave($scope.formData, function (data) {
                if (data.value === true) {
                    // $state.go('bankMaster-list');
                    $window.history.back();
                    toastr.success("Bank " + $scope.formData.name + " created successfully.", "Bank Created");
                } else {
                    toastr.error("Bank creation failed.", "Bank creation error");
                }
            });
        };
    })
    .controller('CreateContactManagementCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("contactManagement-detail");
        $scope.menutitle = NavigationService.makeactive("Contact Management");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.cancel = function () {
            $window.history.back();
        };
    })
    .controller('ContactManagementCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("contactManagement-list");
        $scope.menutitle = NavigationService.makeactive("Contact Management List");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.cancel = function () {
            $window.history.back();
        };
    })
    .controller('CreateContactTypeCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("contactType-detail");
        $scope.menutitle = NavigationService.makeactive("Contact Type");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.cancel = function () {
            $window.history.back();
        };
    })
    .controller('ContactTypeCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("contactType-list");
        $scope.menutitle = NavigationService.makeactive("Contact Type List");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.cancel = function () {
            $window.history.back();
        };
    })
    .controller('CreateContactTypeOfficeCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("contactTypeOffice-detail");
        $scope.menutitle = NavigationService.makeactive("Contact Type of Office Type");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.cancel = function () {
            $window.history.back();
        };
    })
    .controller('ContactTypeOfficeCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("contactTypeOffice-list");
        $scope.menutitle = NavigationService.makeactive("Contact Type of Office List");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.cancel = function () {
            $window.history.back();
        };
    })
    .controller('CompanyCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $state, $stateParams, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("company-list");
        $scope.menutitle = NavigationService.makeactive("List of Companies");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.currentPage = $stateParams.page;
        var i = 0;
        $scope.search = {
            keyword: ""
        };
        if ($stateParams.keyword) {
            $scope.search.keyword = $stateParams.keyword;
        }
        $scope.showAllCountries = function (keywordChange) {
            $scope.totalItems = undefined;
            if (keywordChange) {
                $scope.currentPage = 1;
            }
            NavigationService.searchCompany({
                page: $scope.currentPage,
                keyword: $scope.search.keyword
            }, ++i, function (data, ini) {
                console.log(data.data);

                if (ini == i) {
                    console.log(data.data);
                    $scope.allCompanies = data.data.results;
                    $scope.totalItems = data.data.total;
                    $scope.maxRow = data.data.options.count;

                }
            });
        };
        $scope.cancel = function () {
            $window.history.back();
        };

        $scope.changePage = function (page) {
            var goTo = "state-list";
            if ($scope.search.keyword) {
                goTo = "state-list";
            }
            $state.go(goTo, {
                page: page,
                keyword: $scope.search.keyword
            });
        };
        $scope.showAllCountries();

        $scope.deleteCompany = function (id) {
            globalfunction.confDel(function (value) {
                if (value) {
                    NavigationService.deleteCompany(id, function (data) {
                        if (data.value) {
                            $scope.showAllCountries();
                            toastr.success("Company deleted successfully.", "Company deleted");
                        } else {
                            toastr.error("There was an error while deleting Company", "Company deleting error");
                        }


                    });
                }
            });
        };

    })
    .controller('CreateCompanyCtrl', function (hotkeys, $scope, $window, TemplateService, NavigationService, $timeout, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("company-detail");
        $scope.menutitle = NavigationService.makeactive("Create Company");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.userStatus = [{
            "name": "Active",
            "value": true
        }, {
            "name": "Inactive",
            "value": false
        }];


        $scope.header = {
            "name": "Create Company"
        };
        $scope.cancel = function () {
            $window.history.back();
        };
        $scope.formData = {};
        // Ctrl + Enter
        hotkeys.bindTo($scope).add({
            combo: 'ctrl+enter',
            callback: function (formData) {
                $scope.hideSaveCancel = true;
                NavigationService.companySave(formData, function (data) {
                    if (data.value === true) {
                        // $state.go('company-list');
                        $window.history.back();
                        toastr.success("company " + formData.name + " created successfully.", "company Created");
                    } else {
                        $scope.hideSaveCancel = false;
                        toastr.error("company creation failed.", "company creation error");
                    }
                });
            }
        });

        // 
        $scope.saveCompany = function (formData) {
            NavigationService.companySave(formData, function (data) {
                if (data.value === true) {
                    // $state.go('company-list');
                    $window.history.back();
                    toastr.success("company " + formData.name + " created successfully.", "company Created");
                } else {
                    toastr.error("company creation failed.", "company creation error");
                }
            });
        };
    })
    .controller('EditCompanyCtrl', function (hotkeys, $scope, $window, TemplateService, NavigationService, $timeout, $state, $stateParams, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("company-detail");
        $scope.menutitle = NavigationService.makeactive("Edit Company");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.userStatus = [{
            "name": "Active",
            "value": true
        }, {
            "name": "Inactive",
            "value": false
        }];

        $scope.header = {
            "name": "Edit Company"
        };
        $scope.formData = {};
        $scope.cancel = function () {
            $window.history.back();
        };
        NavigationService.getOneCompany($stateParams.id, function (data) {
            $scope.formData = data.data;
            // $scope.formData.country = data.data.
            console.log($scope.formData);
            $scope.formData.country = data.data.city.district.state.zone.country._id;
            $scope.formData.zone = data.data.city.district.state.zone._id;
            $scope.formData.state = data.data.city.district.state._id;
            $scope.formData.district = data.data.city.district._id;
            $scope.formData.city = data.data.city._id;
        });


        // Ctrl + ENTER
        hotkeys.bindTo($scope).add({
            combo: 'ctrl+enter',
            callback: function (formData) {
                $scope.hideSaveCancel = true;
                NavigationService.companySave($scope.formData, function (data) {
                    if (data.value === true) {
                        $window.history.back();
                        toastr.success("Company " + $scope.formData.name + " edited successfully.", "Company Edited");
                    } else {
                        $scope.hideSaveCancel = false;
                        toastr.error("Company edition failed.", "Company editing error");
                    }
                });
            }
        });
        // 
        $scope.saveCompany = function (formValid) {
            NavigationService.companySave($scope.formData, function (data) {
                if (data.value === true) {
                    // $state.go('company-list');
                    $window.history.back();
                    toastr.success("Company " + $scope.formData.name + " edited successfully.", "Company Edited");
                } else {
                    toastr.error("Company edition failed.", "Company editing error");
                }
            });
        };

    })
    .controller('CreateDistrictCtrl', function ($scope, hotkeys, $window, TemplateService, NavigationService, $timeout, $state, $stateParams, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("district-detail");
        $scope.menutitle = NavigationService.makeactive("District");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.formData = {};
        $scope.header = {
            "name": "Create District"
        };
        $scope.cancel = function () {
            $window.history.back();
        };
        hotkeys.bindTo($scope).add({
            combo: 'ctrl+enter',
            callback: function (formData) {
                NavigationService.districtSave($scope.formData, function (data) {
                    if (data.value === true) {
                        $window.history.back();
                        toastr.success("District " + formData.name + " created successfully.", "District Created");
                    } else {
                        toastr.error("District creation failed.", "District creation error");
                    }
                });
            }
        });
        $scope.saveDistrict = function (formData) {
            NavigationService.districtSave($scope.formData, function (data) {
                if (data.value === true) {
                    $window.history.back();
                    toastr.success("District " + formData.name + " created successfully.", "District Created");
                } else {
                    toastr.error("District creation failed.", "District creation error");
                }
            });
        };
    })
    .controller('EditDistrictCtrl', function ($scope, hotkeys, $window, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("district-detail");
        $scope.menutitle = NavigationService.makeactive("District");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "Edit District"
        };

        NavigationService.getOneDistrict($stateParams.id, function (data) {
            $scope.formData = data.data;
            $scope.formData.country = data.data.state.zone.country._id;
            $scope.formData.zone = data.data.state.zone._id;
            $scope.formData.state = data.data.state._id;
        });
        $scope.cancel = function () {
            $window.history.back();
        };
        hotkeys.bindTo($scope).add({
            combo: 'ctrl+enter',
            callback: function (formData) {
                NavigationService.districtSave($scope.formData, function (data) {
                    if (data.value === true) {
                        // $state.go('district-list');
                        $window.history.back();
                        toastr.success("District " + $scope.formData.name + " edited successfully.", "District Edited");
                    } else {
                        toastr.error("District edition failed.", "District editing error");
                    }
                });
            }
        });
        $scope.saveDistrict = function (formValid) {
            NavigationService.districtSave($scope.formData, function (data) {
                if (data.value === true) {
                    // $state.go('district-list');
                    $window.history.back();
                    toastr.success("District " + $scope.formData.name + " edited successfully.", "District Edited");
                } else {
                    toastr.error("District edition failed.", "District editing error");
                }
            });
        };
    })
    .controller('CurrencyCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("currency-list");
        $scope.menutitle = NavigationService.makeactive("Currency List");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.currentPage = $stateParams.page;
        var i = 0;
        $scope.search = {
            keyword: ""
        };
        if ($stateParams.keyword) {
            $scope.search.keyword = $stateParams.keyword;
        }
        $scope.showAllCountries = function (keywordChange) {
            $scope.totalItems = undefined;
            if (keywordChange) {
                $scope.currentPage = 1;
            }
            NavigationService.searchCurrency({
                page: $scope.currentPage,
                keyword: $scope.search.keyword
            }, ++i, function (data, ini) {
                console.log(data.data);

                if (ini == i) {
                    console.log(data.data);
                    $scope.allCurrencies = data.data.results;
                    $scope.totalItems = data.data.total;
                    $scope.maxRow = data.data.options.count;

                }
            });
        };
        $scope.cancel = function () {
            $window.history.back();
        };
        $scope.changePage = function (page) {
            var goTo = "zone-list";
            if ($scope.search.keyword) {
                goTo = "zone-list";
            }
            $state.go(goTo, {
                page: page,
                keyword: $scope.search.keyword
            });
        };
        $scope.showAllCountries();

        $scope.deleteCurrency = function (id) {
            globalfunction.confDel(function (value) {
                console.log(value);
                if (value) {
                    NavigationService.deleteCurrency(id, function (data) {
                        if (data.value) {
                            $scope.showAllCountries();
                            toastr.success("Currency deleted successfully.", "Currency deleted");
                        } else {
                            toastr.error("There was an error while deleting Currency", "Currency deleting error");
                        }


                    });
                }
            });
        };
    })
    .controller('CreateCurrencyCtrl', function ($scope, hotkeys, $window, TemplateService, NavigationService, $timeout, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("currency-detail");
        $scope.menutitle = NavigationService.makeactive("Currency");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "Create Currency"
        };
        $scope.formData = {};
        $scope.cancel = function () {
            $window.history.back();
        };
        hotkeys.bindTo($scope).add({
            combo: 'ctrl+enter',
            callback: function (formData) {
                NavigationService.currencySave($scope.formData, function (data) {
                    if (data.value === true) {
                        // $state.go('currency-list');
                        $window.history.back();
                        toastr.success("Currency " + $scope.formData.name + " created successfully.", "Currency Created");
                    } else {
                        toastr.error("Currency creation failed.", "Currency creation error");
                    }
                });
            }
        });
        $scope.saveCurrency = function (formData) {
            NavigationService.currencySave($scope.formData, function (data) {
                if (data.value === true) {
                    // $state.go('currency-list');
                    $window.history.back();
                    toastr.success("Currency " + $scope.formData.name + " created successfully.", "Currency Created");
                } else {
                    toastr.error("Currency creation failed.", "Currency creation error");
                }
            });
        };

    })
    .controller('EditCurrencyCtrl', function ($scope, hotkeys, $window, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("currency-detail");
        $scope.menutitle = NavigationService.makeactive("Currency");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "Edit Currency"
        };

        NavigationService.getOneCurrency($stateParams.id, function (data) {
            $scope.formData = data.data;
        });
        $scope.cancel = function () {
            console.log("EditCurrencyCtrl");
            $window.history.back();
        };
        hotkeys.bindTo($scope).add({
            combo: 'ctrl+enter',
            callback: function (formData) {
                NavigationService.currencySave($scope.formData, function (data) {
                    if (data.value === true) {
                        $window.history.back();
                        toastr.success("Currency " + $scope.formData.name + " created successfully.", "Currency Created");
                    } else {
                        toastr.error("Currency creation failed.", "Currency creation error");
                    }
                });
            }
        });
        $scope.saveCurrency = function (formValid) {
            NavigationService.currencySave($scope.formData, function (data) {
                if (data.value === true) {
                    $window.history.back();
                    toastr.success("Currency " + $scope.formData.name + " created successfully.", "Currency Created");
                } else {
                    toastr.error("Currency creation failed.", "Currency creation error");
                }
            });
        };

    })
    .controller('CityCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("city-list");
        $scope.menutitle = NavigationService.makeactive("City Lists");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.currentPage = $stateParams.page;
        var i = 0;
        $scope.search = {
            keyword: ""
        };
        if ($stateParams.keyword) {
            $scope.search.keyword = $stateParams.keyword;
        }
        $scope.showAllCountries = function (keywordChange) {
            $scope.totalItems = undefined;
            if (keywordChange) {
                $scope.currentPage = 1;
            }
            NavigationService.searchCity({
                page: $scope.currentPage,
                keyword: $scope.search.keyword
            }, ++i, function (data, ini) {
                console.log(data.data);

                if (ini == i) {
                    console.log(data.data);
                    $scope.allCities = data.data.results;
                    $scope.totalItems = data.data.total;
                    $scope.maxRow = data.data.options.count;

                }
            });
        };

        $scope.changePage = function (page) {
            var goTo = "city-list";
            if ($scope.search.keyword) {
                goTo = "city-list";
            }
            $state.go(goTo, {
                page: page,
                keyword: $scope.search.keyword
            });
        };
        $scope.showAllCountries();

        $scope.deleteCity = function (id) {
            globalfunction.confDel(function (value) {
                console.log(value);
                if (value) {
                    NavigationService.deleteCity(id, function (data) {
                        if (data.value) {
                            $scope.showAllCountries();
                            toastr.success("City deleted successfully.", "City deleted");
                        } else {
                            toastr.error("There was an error while deleting City", "City deleting error");
                        }
                    });
                }
            });
        };
    })
    .controller('CreateCityCtrl', function ($scope, hotkeys, $window, TemplateService, NavigationService, $timeout, $state, $stateParams, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("city-detail");
        $scope.menutitle = NavigationService.makeactive("Create City");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        var vm = this;
        vm.availableColors = ['Red', 'Green', 'Blue', 'Yellow', 'Magenta', 'Maroon', 'Umbra', 'Turquoise'];

        $scope.header = {
            "name": "Create City"
        };
        $scope.formData = {};
        $scope.cancel = function () {
            $window.history.back();
        };
        hotkeys.bindTo($scope).add({
            combo: 'ctrl+enter',
            callback: function (formData) {
                $scope.hideSaveCancel = true;
                NavigationService.citySave($scope.formData, function (data) {
                    if (data.value === true) {
                        $window.history.back();
                        toastr.success("City " + formData.name + " created successfully.", "City Created");
                    } else {
                        toastr.error("City creation failed.", "City creation error");
                    }
                });
            }
        });
        $scope.saveCity = function (formData) {
            NavigationService.citySave($scope.formData, function (data) {
                if (data.value === true) {
                    $window.history.back();
                    toastr.success("City " + formData.name + " created successfully.", "City Created");
                } else {
                    toastr.error("City creation failed.", "City creation error");
                }
            });
        };
    })
    .controller('EditCityCtrl', function ($scope, hotkeys, $window, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("city-detail");
        $scope.menutitle = NavigationService.makeactive("Edit City");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "Edit City"
        };
        NavigationService.getOneCity($stateParams.id, function (data) {
            $scope.formData = data.data;
            $scope.formData.country = data.data.district.state.zone.country._id;
            $scope.formData.zone = data.data.district.state.zone._id;
            $scope.formData.state = data.data.district.state._id;
            $scope.formData.district = data.data.district._id;
        });
        $scope.cancel = function () {
            $window.history.back();
        };
        hotkeys.bindTo($scope).add({
            combo: 'ctrl+enter',
            callback: function (formData) {
                NavigationService.citySave($scope.formData, function (data) {
                    if (data.value === true) {
                        // $state.go('city-list');
                        $window.history.back();
                        toastr.success("City " + $scope.formData.name + " edited successfully.", "City Edited");
                    } else {
                        toastr.error("City edition failed.", "City editing error");
                    }
                });
            }
        });
        $scope.saveCity = function (formValid) {
            NavigationService.citySave($scope.formData, function (data) {
                if (data.value === true) {
                    // $state.go('city-list');
                    $window.history.back();
                    toastr.success("City " + $scope.formData.name + " edited successfully.", "City Edited");
                } else {
                    toastr.error("City edition failed.", "City editing error");
                }
            });
        };
    })
    .controller('DepartmentCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("department-list");
        $scope.menutitle = NavigationService.makeactive("Department List");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.showAllDepartments = function () {
            NavigationService.getAllDepartments(function (data) {
                $scope.allDepartments = data.data;

            });
        };
        $scope.showAllDepartments();

        $scope.deleteDepartment = function (id) {

            NavigationService.deleteDepartment({
                id: id
            }, function (data) {
                $scope.showAllDepartments();

            });
        };

    })
    .controller('CreateDepartmentCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("department-detail");
        $scope.menutitle = NavigationService.makeactive("Department");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.userStatus = [{
            "name": "Active",
            "value": true
        }, {
            "name": "Inactive",
            "value": false
        }];
        $scope.header = {
            "name": "Create Department"
        };
        $scope.formData = {};
        $scope.saveDepartment = function (formData) {

            NavigationService.departmentSave($scope.formData, function (data) {
                console.log(data);
                if (data.value === true) {
                    $window.history.back();
                }

            });
        };

        NavigationService.getAllUniqueTypes(function (data) {
            $scope.allUniqueTypes = data.data;
            console.log('$scope.allUniqueTypes', $scope.allUniqueTypes);

        });

    })
    .controller('EditDepartmentCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $stateParams, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("department-detail");
        $scope.menutitle = NavigationService.makeactive("Department");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.userStatus = [{
            "name": "Active",
            "value": true
        }, {
            "name": "Inactive",
            "value": false
        }];
        $scope.header = {
            "name": "Edit Department"
        };

        NavigationService.getOneDepartment($stateParams.id, function (data) {
            $scope.formData = data.data;
            console.log('$scope.formData', $scope.formData);

        });

        $scope.saveDepartment = function (formValid) {

            //  if (formValid.$valid) {
            //  $scope.formComplete = true;
            NavigationService.departmentEditSave($scope.formData, function (data) {
                if (data.value === true) {
                    // $state.go('department-list');
                    $window.history.back();
                }
            });
            //  }
        };
        NavigationService.getAllUniqueTypes(function (data) {
            $scope.allUniqueTypes = data.data;
            console.log('$scope.allUniqueTypes', $scope.allUniqueTypes);

        });

    })
    .controller('UniqueTypetCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("uniqueType-list");
        $scope.menutitle = NavigationService.makeactive("Unique Type List");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.showAllUniqueTypes = function () {
            NavigationService.getAllUniqueTypes(function (data) {
                $scope.allUniqueTypes = data.data;

            });
        };
        $scope.cancel = function () {
            $window.history.back();
        };
        $scope.showAllUniqueTypes();

        $scope.deleteUniqueType = function (id) {

            NavigationService.deleteUniqueType({
                id: id
            }, function (data) {
                $scope.showAllUniqueTypes();

            });
        };

    })
    .controller('CreateUniqueTypeCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("uniqueType-detail");
        $scope.menutitle = NavigationService.makeactive("Unique Type");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "Create Unique Type"
        };
        $scope.formData = {};
        $scope.cancel = function () {
            $window.history.back();
        };
        $scope.saveUniqueType = function (formData) {

            NavigationService.uniquetypeSave($scope.formData, function (data) {
                console.log(data);
                if (data.value === true) {
                    $window.history.back();
                }

            });
        };

        // NavigationService.getAllallUniqueTypes(function(data) {
        //     $scope.allUniqueTypes = data.data;
        //     console.log('$scope.allUniqueTypes', $scope.allUniqueTypes);
        //
        // });

    })
    .controller('EditUniqueTypeCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $stateParams, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("uniqueType-detail");
        $scope.menutitle = NavigationService.makeactive("Unique Type");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "Edit Unique Type"
        };

        NavigationService.getOneUniqueType($stateParams.id, function (data) {
            $scope.formData = data.data;
            console.log('$scope.formData', $scope.formData);
        });
        $scope.cancel = function () {
            $window.history.back();
        };
        $scope.saveUniqueType = function (formValid) {

            //  if (formValid.$valid) {
            //  $scope.formComplete = true;
            NavigationService.UniqueTypeEditSave($scope.formData, function (data) {
                if (data.value === true) {
                    // $state.go('uniquetype-list');
                    $window.history.back();
                }
            });
            //  }
        };

        // NavigationService.getAllallUniqueTypes(function(data) {
        //     $scope.allUniqueTypes = data.data;
        //     console.log('$scope.allUniqueTypes', $scope.allUniqueTypes);
        //
        // });

    })


    .controller('CustomerSegmentCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("customerSegment-list");
        $scope.menutitle = NavigationService.makeactive("Customer Segment List");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.showAllCustomerSegments = function () {
            NavigationService.getAllCustomerSegments(function (data) {
                $scope.allCustomerSegments = data.data;

            });
        };
        $scope.showAllCustomerSegments();

        $scope.deleteCustomerSegment = function (id) {

            NavigationService.deleteCustomerSegment({
                id: id
            }, function (data) {
                $scope.showAllCustomerSegments();

            });
        };

    })
    .controller('CreateCustomerSegmentCtrl', function ($scope, hotkeys, $window, TemplateService, NavigationService, $timeout, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("customerSegment-detail");
        $scope.menutitle = NavigationService.makeactive("Customer Segment");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "Create Customer Segment"
        };
        $scope.formData = {};
        $scope.cancel = function () {
            $window.history.back();
        };
        hotkeys.bindTo($scope).add({
            combo: 'ctrl+enter',
            callback: function (formData) {
                NavigationService.customersegmentSave($scope.formData, function (data) {
                    console.log(data);
                    if (data.value === true) {
                        $window.history.back();
                    }
                });
            }
        });
        $scope.saveCustomerSegment = function (formData) {
            NavigationService.customersegmentSave($scope.formData, function (data) {
                console.log(data);
                if (data.value === true) {
                    $window.history.back();
                }
            });
        };
    })
    .controller('EditCustomerSegmentCtrl', function ($scope, hotkeys, $window, TemplateService, NavigationService, $timeout, $stateParams, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("customerSegment-detail");
        $scope.menutitle = NavigationService.makeactive("Customer Segment");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "Edit Customer Segment"
        };

        NavigationService.getOneCustomerSegment($stateParams.id, function (data) {
            $scope.formData = data.data;
            console.log('$scope.formData', $scope.formData);

        });

        $scope.cancel = function () {
            $window.history.back();
        };
        hotkeys.bindTo($scope).add({
            combo: 'ctrl+enter',
            callback: function (formData) {
                NavigationService.CustomerSegmentEditSave($scope.formData, function (data) {
                    if (data.value === true) {
                        $window.history.back();
                    }
                });
            }
        });

        $scope.saveCustomerSegment = function (formValid) {
            NavigationService.CustomerSegmentEditSave($scope.formData, function (data) {
                if (data.value === true) {
                    $window.history.back();
                }
            });
        };

    })


    .controller('PolicyTypeCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("policyName-list");
        $scope.menutitle = NavigationService.makeactive("Policy Name List");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.showAllPolicyTypes = function () {
            NavigationService.getAllPolicyTypes(function (data) {
                $scope.allPolicyTypes = data.data;

            });
        };
        $scope.showAllPolicyTypes();

        $scope.deletePolicyType = function (id) {

            NavigationService.deletePolicyType({
                id: id
            }, function (data) {
                $scope.showAllPolicyTypes();

            });
        };

    })
    .controller('CreatePolicyTypeCtrl', function ($scope, hotkeys, $window, TemplateService, NavigationService, $timeout, $state, $stateParams, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("policyType-detail");
        $scope.menutitle = NavigationService.makeactive("Policy Type");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.userStatus = [{
            "name": "Active",
            "value": true
        }, {
            "name": "Inactive",
            "value": false
        }];
        $scope.header = {
            "name": "Create Policy Type"
        };
        $scope.formData = {};
        $scope.insurers = [];

        $scope.refreshInsurer = function (data) {
            console.log("Data Inn", data);
            var formdata = {};
            formdata.keyword = data;
            NavigationService.searchInsurerOffice(formdata, 1, function (data) {
                $scope.insurers = data.data.results;
            });
        };

        $scope.democlick = function (new_value) {
            var new_object = {};
            new_object.name = new_value;
            console.log(new_object);
            return new_object;
        };

        $scope.cancel = function () {
            $window.history.back();
        }
        hotkeys.bindTo($scope).add({
            combo: 'ctrl+enter',
            callback: function (formData) {
                _.each(formData.insurer, function (n) {
                    n = n._id;
                });
                console.log($scope.formData);
                NavigationService.modelSave("PolicyType", $scope.formData, function (data) {
                    if (data.value === true) {
                        // $state.go('policyType-list');
                        $window.history.back();
                        toastr.success("PolicyType" + " " + formData.name + " created successfully.", "PolicyType" + " Created");
                    } else {
                        toastr.error("PolicyType" + " creation failed.", "PolicyType" + " creation error");
                    }
                });
            }
        });
        $scope.saveModel = function (formData) {
            _.each(formData.insurer, function (n) {
                n = n._id;
            });
            console.log($scope.formData);
            NavigationService.modelSave("PolicyType", $scope.formData, function (data) {
                if (data.value === true) {
                    // $state.go('policyType-list');
                    $window.history.back();
                    toastr.success("PolicyType" + " " + formData.name + " created successfully.", "PolicyType" + " Created");
                } else {
                    toastr.error("PolicyType" + " creation failed.", "PolicyType" + " creation error");
                }
            });
        };


    })
    .controller('EditPolicyTypeCtrl', function ($scope, hotkeys, $window, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("policyType-detail");
        $scope.menutitle = NavigationService.makeactive("Policy Type");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.userStatus = [{
            "name": "Active",
            "value": true
        }, {
            "name": "Inactive",
            "value": false
        }];
        $scope.header = {
            "name": "Edit Policy Type"
        };
        $scope.insurers = [];
        $scope.refreshInsurer = function (data) {
            var formdata = {};
            formdata.keyword = data;
            NavigationService.searchInsurerOffice(formdata, 1, function (data) {
                $scope.insurers = data.data.results;
            });
        };

        NavigationService.getOneModel("PolicyType", $stateParams.id, function (data) {
            $scope.formData = data.data;
        });
        $scope.cancel = function () {
            $window.history.back();
        }
        hotkeys.bindTo($scope).add({
            combo: 'ctrl+enter',
            callback: function (formData) {
                _.each(formData.insurer, function (n) {
                    n = n._id;
                });
                NavigationService.modelSave("PolicyType", $scope.formData, function (data) {
                    if (data.value === true) {
                        // $state.go('policyType-list');
                        $window.history.back();
                        toastr.success("PolicyType" + $scope.formData.name + " edited successfully.", "PolicyType" + " Edited");
                    } else {
                        toastr.error("PolicyType" + " edition failed.", "PolicyType" + " editing error");
                    }
                });
            }
        });
        $scope.saveModel = function (formData) {
            _.each(formData.insurer, function (n) {
                n = n._id;
            });
            NavigationService.modelSave("PolicyType", $scope.formData, function (data) {
                if (data.value === true) {
                    // $state.go('policyType-list');
                    $window.history.back();
                    toastr.success("PolicyType" + $scope.formData.name + " edited successfully.", "PolicyType" + " Edited");
                } else {
                    toastr.error("PolicyType" + " edition failed.", "PolicyType" + " editing error");
                }
            });
        };

    })
    .controller('PolicyCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("policy-list");
        $scope.menutitle = NavigationService.makeactive("Policy List");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.showAllPolicies = function () {
            NavigationService.getAllPolicies(function (data) {
                $scope.allPolicies = data.data;

            });
        };
        $scope.showAllPolicies();

        $scope.cancel = function () {
            $window.history.back();
        };

        $scope.deletePolicy = function (id) {

            NavigationService.deletePolicy({
                id: id
            }, function (data) {
                $scope.showAllPolicies();

            });
        };

    })
    .controller('CreatePolicyCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("policy-detail");
        $scope.menutitle = NavigationService.makeactive("Policy");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "Create Policy"
        };
        $scope.formData = {};
        $scope.cancel = function () {
            $window.history.back();
        };
        $scope.savePolicy = function (formData) {

            NavigationService.policySave($scope.formData, function (data) {
                console.log(data);
                if (data.value === true) {
                    $window.history.back();
                }

            });
        };
        NavigationService.getAllPolicyTypes(function (data) {
            $scope.allPolicyTypes = data.data;

        });

    })
    .controller('EditPolicyCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $stateParams, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("policy-detail");
        $scope.menutitle = NavigationService.makeactive("Policy");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "Edit Policy"
        };

        NavigationService.getOnePolicy($stateParams.id, function (data) {
            $scope.formData = data.data;
        });
        $scope.cancel = function () {
            $window.history.back();
        };

        $scope.savePolicy = function (formValid) {

            //  if (formValid.$valid) {
            //  $scope.formComplete = true;
            NavigationService.PolicyEditSave($scope.formData, function (data) {
                if (data.value === true) {
                    // $state.go('policy-list');
                    $window.history.back();
                }
            });
            //  }
        };

        NavigationService.getAllPolicyTypes(function (data) {
            $scope.allPolicyTypes = data.data;

        });

    })

    .controller('PolicyDocCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("policyDoc-list");
        $scope.menutitle = NavigationService.makeactive("Policy Document List");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.showAllPolicyDocs = function () {
            NavigationService.getAllPolicyDocs(function (data) {
                $scope.allPolicyDocs = data.data;

            });
        };
        $scope.showAllPolicyDocs();

        $scope.deletePolicyDoc = function (id) {

            NavigationService.deletePolicyDoc({
                id: id
            }, function (data) {
                $scope.showAllPolicyDocs();

            });
        };

    })
    .controller('CreatePolicyDocCtrl', function ($scope, hotkeys, $window, $uibModal, TemplateService, NavigationService, $timeout, $state, $stateParams, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("policyDoc-detail");
        $scope.menutitle = NavigationService.makeactive("Policy Document");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.userStatus = [{
            "name": "Active",
            "value": true
        }, {
            "name": "Inactive",
            "value": false
        }];
        $scope.header = {
            "name": "Create Policy Doc"
        };
        $scope.formData = {};
        $scope.formData.status = true;
        $scope.formData.listOfDocuments = [];
        $scope.check = true;
        $scope.modelData = {};
        $scope.cancel = function () {
            $window.history.back();
        }
        hotkeys.bindTo($scope).add({
            combo: 'ctrl+enter',
            callback: function (formData) {
                if ($scope.check) {
                    console.log(formData);
                    NavigationService.modelSave("PolicyDoc", $scope.formData, function (data) {
                        $scope.check = false;
                        if (data.value === true) {
                            // $state.go('policyDoc-list');
                            $window.history.back();
                            toastr.success("Policy Document" + " " + formData.name + " created successfully.", "Policy Document" + " Created");
                        } else {
                            toastr.error("Policy Document" + " creation failed.", "Policy Document" + " creation error");
                        }
                    });
                }
            }
        });
        $scope.saveModel = function (formData) {
            if ($scope.check) {
                console.log(formData);
                NavigationService.modelSave("PolicyDoc", $scope.formData, function (data) {
                    $scope.check = false;
                    if (data.value === true) {
                        // $state.go('policyDoc-list');
                        $window.history.back();
                        toastr.success("Policy Document" + " " + formData.name + " created successfully.", "Policy Document" + " Created");
                    } else {
                        toastr.error("Policy Document" + " creation failed.", "Policy Document" + " creation error");
                    }
                });
            }
        };

        $scope.addDocument = function () {
            var modalInstance = $uibModal.open({
                scope: $scope,
                templateUrl: '/frontend/views/modal/modal-policydoc.html',
                size: 'lg'
            });
        };

        $scope.createOfficer = function (modelData) {
            if ($scope.buttonValue === "Save") {
                $scope.formData.listOfDocuments.push(modelData);
            } else {
                $scope.formData.listOfDocuments[$scope.formIndex] = modelData;
            }
        };
        $scope.openCreateOfficer = function () {
            $scope.buttonValue = "Save";
            $scope.modelData = {};
            $scope.addDocument();
        };
        $scope.openEditOfficer = function (index) {
            $scope.formIndex = index;
            $scope.buttonValue = "Edit";
            $scope.modelData = $scope.formData.listOfDocuments[index];
            $scope.addDocument();
        };
        $scope.deleteOfficer = function (index) {
            $scope.formData.listOfDocuments.splice(index, 1);
        };

        $scope.modelData.from = $scope.modelData.to = $scope.modelData.policyNo = null


        $scope.$watch("modelData.from", function (newVal, oldVal) {

            console.log(newVal);
            console.log(oldVal);
            $scope.modelData.from = newVal;
            $scope.abc($scope.modelData);
        });
        $scope.$watch("modelData.to", function (newVal, oldVal) {
            console.log(newVal);
            console.log(oldVal);
            $scope.modelData.to = newVal;
            $scope.abc($scope.modelData);
        });
        $scope.$watch("modelData.policyNo", function (newVal, oldVal) {
            console.log(newVal);
            console.log(oldVal);
            $scope.modelData.policyNo = newVal;
            $scope.abc($scope.modelData);
        });
        $scope.abc = function (modelData) {
            console.log("modelData", modelData);
            if (modelData.from && modelData.to && modelData.policyNo) {
                modelData.name = moment(modelData.from).format("DDMMMYY") + "-" + moment(modelData.to).format("DDMMMYY") + "-" + modelData.policyNo;
            }
        };



        $scope.dateOptions = {
            showWeeks: true
        };

        $scope.popup1 = {
            opened: false
        };
        $scope.popup2 = {
            opened: false
        };

        $scope.dateFrom = function () {
            $scope.popup1.opened = true;
        };
        $scope.dateTo = function () {
            $scope.popup2.opened = true;
        };

        $scope.format = 'dd-MMMM-yyyy';

    })
    .controller('EditPolicyDocCtrl', function ($scope, hotkeys, $window, TemplateService, NavigationService, $timeout, $uibModal, $stateParams, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("policyDoc-detail");
        $scope.menutitle = NavigationService.makeactive("Policy Document");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.userStatus = [{
            "name": "Active",
            "value": true
        }, {
            "name": "Inactive",
            "value": false
        }];
        $scope.header = {
            "name": "Create Policy Doc"
        };
        $scope.formData = {};
        $scope.formData.listOfDocuments = [];
        $scope.modelData = {};
        NavigationService.getOneModel("PolicyDoc", $stateParams.id, function (data) {
            $scope.formData = data.data;

        });
        $scope.cancel = function () {
            $window.history.back();
        }
        hotkeys.bindTo($scope).add({
            combo: 'ctrl+enter',
            callback: function (formData) {
                console.log(formData);
                NavigationService.modelSave("PolicyDoc", $scope.formData, function (data) {
                    if (data.value === true) {
                        // $state.go('policyDoc-list');
                        $window.history.back();
                        toastr.success("Policy Document" + " " + formData.name + " created successfully.", "Policy Document" + " Created");
                    } else {
                        toastr.error("Policy Document" + " creation failed.", "Policy Document" + " creation error");
                    }
                });
            }
        });
        $scope.saveModel = function (formData) {
            console.log(formData);
            NavigationService.modelSave("PolicyDoc", $scope.formData, function (data) {
                if (data.value === true) {
                    // $state.go('policyDoc-list');
                    $window.history.back();
                    toastr.success("Policy Document" + " " + formData.name + " created successfully.", "Policy Document" + " Created");
                } else {
                    toastr.error("Policy Document" + " creation failed.", "Policy Document" + " creation error");
                }
            });
        };
        // 
        $scope.modelData.from = $scope.modelData.to = $scope.modelData.policyNo = null


        $scope.$watch("modelData.from", function (newVal, oldVal) {

            console.log(newVal);
            console.log(oldVal);
            $scope.modelData.from = newVal;
            $scope.abc($scope.modelData);
        });
        $scope.$watch("modelData.to", function (newVal, oldVal) {
            console.log(newVal);
            console.log(oldVal);
            $scope.modelData.to = newVal;
            $scope.abc($scope.modelData);
        });
        $scope.$watch("modelData.policyNo", function (newVal, oldVal) {
            console.log(newVal);
            console.log(oldVal);
            $scope.modelData.policyNo = newVal;
            $scope.abc($scope.modelData);
        });
        $scope.abc = function (modelData) {
            console.log("modelData", modelData);
            if (modelData.from && modelData.to && modelData.policyNo) {
                modelData.name = moment(modelData.from).format("DDMMMYY") + "-" + moment(modelData.to).format("DDMMMYY") + "-" + modelData.policyNo;
            }
        };
        // 
        $scope.addDocument = function () {
            var modalInstance = $uibModal.open({
                scope: $scope,
                templateUrl: '/frontend/views/modal/modal-policydoc.html',
                size: 'lg'
            });
        };

        $scope.createOfficer = function (modelData) {
            if ($scope.buttonValue === "Save") {
                $scope.formData.listOfDocuments.push(modelData);
            } else {
                $scope.formData.listOfDocuments[$scope.formIndex] = modelData;
            }
        };
        $scope.openCreateOfficer = function () {
            $scope.buttonValue = "Save";
            $scope.modelData = {};
            $scope.addDocument();
        };
        $scope.openEditOfficer = function (index) {
            $scope.formIndex = index;
            $scope.buttonValue = "Edit";
            $scope.modelData = $scope.formData.listOfDocuments[index];
            $scope.modelData.from = new Date($scope.formData.listOfDocuments[index].from);
            $scope.modelData.to = new Date($scope.formData.listOfDocuments[index].to);
            $scope.addDocument();
        };
        $scope.deleteOfficer = function (index) {
            $scope.formData.listOfDocuments.splice(index, 1);
        };



        $scope.dateOptions = {
            showWeeks: true
        };

        $scope.popup1 = {
            opened: false
        };
        $scope.popup2 = {
            opened: false
        };

        $scope.dateFrom = function () {
            $scope.popup1.opened = true;
        };
        $scope.dateTo = function () {
            $scope.popup2.opened = true;
        };

        $scope.format = 'dd-MMMM-yyyy';
    })

    .controller('IndustryCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("industry-list");
        $scope.menutitle = NavigationService.makeactive("Industry List");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.currentPage = $stateParams.page;
        var i = 0;
        $scope.search = {
            keyword: ""
        };
        if ($stateParams.keyword) {
            $scope.search.keyword = $stateParams.keyword;
        }
        $scope.showAllCountries = function (keywordChange) {
            $scope.totalItems = undefined;
            if (keywordChange) {
                $scope.currentPage = 1;
            }
            NavigationService.searchIndustry({
                page: $scope.currentPage,
                keyword: $scope.search.keyword
            }, ++i, function (data, ini) {
                console.log(data.data);

                if (ini == i) {
                    console.log(data.data);
                    $scope.allIndustries = data.data.results;
                    $scope.totalItems = data.data.total;
                    $scope.maxRow = data.data.options.count;

                }
            });
        };

        $scope.changePage = function (page) {
            var goTo = "industry-list";
            if ($scope.search.keyword) {
                goTo = "industry-list";
            }
            $state.go(goTo, {
                page: page,
                keyword: $scope.search.keyword
            });
        };
        $scope.showAllCountries();
        $scope.cancel = function () {
            $window.history.back();
        };
        $scope.deleteIndustry = function (id) {
            globalfunction.confDel(function (value) {
                console.log(value);
                if (value) {
                    NavigationService.deleteIndustry(id, function (data) {
                        if (data.value) {
                            $scope.showAllCountries();
                            toastr.success("Industry deleted successfully.", "Industry deleted");
                        } else {
                            toastr.error("There was an error while deleting Industry", "Industry deleting error");
                        }


                    });
                }
            });
        };
        $scope.changeStatus = function (ind) {
            NavigationService.industrySave(ind, function (data) {
                if (data.value === true) {
                    // $state.go('industry-list');
                    $window.history.back();
                }
            });
        };

    })
    .controller('CreateIndustryCtrl', function ($scope, hotkeys, $window, TemplateService, NavigationService, $timeout, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("industry-detail");
        $scope.menutitle = NavigationService.makeactive("Industry");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.userStatus = [{
            "name": "Active",
            "value": true
        }, {
            "name": "Inactive",
            "value": false
        }];
        $scope.header = {
            "name": "Create Industry"
        };
        $scope.formData = {};
        $scope.cancel = function () {
            $window.history.back();
        };
        hotkeys.bindTo($scope).add({
            combo: 'ctrl+enter',
            callback: function (formData) {
                NavigationService.industrySave($scope.formData, function (data) {
                    if (data.value === true) {
                        $window.history.back();
                        toastr.success("Industry " + $scope.formData.name + " created successfully.", "Industry Created");
                    } else {
                        toastr.error("Industry creation failed.", "Industry creation error");
                    }
                });
            }
        });
        $scope.saveIndustry = function (formData) {
            NavigationService.industrySave($scope.formData, function (data) {
                if (data.value === true) {
                    $window.history.back();
                    toastr.success("Industry " + $scope.formData.name + " created successfully.", "Industry Created");
                } else {
                    toastr.error("Industry creation failed.", "Industry creation error");
                }
            });
        };

    })
    .controller('EditIndustryCtrl', function ($scope, hotkeys, $window, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("industry-detail");
        $scope.menutitle = NavigationService.makeactive("Industry");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.userStatus = [{
            "name": "Active",
            "value": true
        }, {
            "name": "Inactive",
            "value": false
        }];
        $scope.header = {
            "name": "Edit Industry"
        };

        NavigationService.getOneIndustry($stateParams.id, function (data) {
            $scope.formData = data.data;
        });

        $scope.cancel = function () {
            $window.history.back();
        };
        hotkeys.bindTo($scope).add({
            combo: 'ctrl+enter',
            callback: function (formData) {
                NavigationService.industrySave($scope.formData, function (data) {
                    if (data.value === true) {
                        // $state.go('industry-list');
                        $window.history.back();
                        toastr.success("Industry " + $scope.formData.name + " created successfully.", "Industry Created");
                    } else {
                        toastr.error("Industry creation failed.", "Industry creation error");
                    }
                });
            }
        });
        $scope.saveIndustry = function (formValid) {
            NavigationService.industrySave($scope.formData, function (data) {
                if (data.value === true) {
                    // $state.go('industry-list');
                    $window.history.back();
                    toastr.success("Industry " + $scope.formData.name + " created successfully.", "Industry Created");
                } else {
                    toastr.error("Industry creation failed.", "Industry creation error");
                }
            });
        };

    })
    .controller('CategoryCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("category-list");
        $scope.menutitle = NavigationService.makeactive("Category List");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.currentPage = $stateParams.page;
        var i = 0;
        $scope.search = {
            keyword: ""
        };
        if ($stateParams.keyword) {
            $scope.search.keyword = $stateParams.keyword;
        }
        $scope.showAllCountries = function (keywordChange) {
            $scope.totalItems = undefined;
            if (keywordChange) {
                $scope.currentPage = 1;
            }
            NavigationService.searchCategory({
                page: $scope.currentPage,
                keyword: $scope.search.keyword
            }, ++i, function (data, ini) {
                console.log(data.data);

                if (ini == i) {
                    console.log(data.data);
                    $scope.allCategories = data.data.results;
                    $scope.totalItems = data.data.total;
                    $scope.maxRow = data.data.options.count;

                }
            });
        };

        $scope.changePage = function (page) {
            var goTo = "category-list";
            if ($scope.search.keyword) {
                goTo = "category-list";
            }
            $state.go(goTo, {
                page: page,
                keyword: $scope.search.keyword
            });
        };
        $scope.showAllCountries();

        $scope.deleteCategory = function (id) {
            globalfunction.confDel(function (value) {
                if (value) {
                    NavigationService.deleteCategory(id, function (data) {
                        if (data.value) {
                            $scope.showAllCountries();
                            toastr.success("Category deleted successfully.", "Category deleted");
                        } else {
                            toastr.error("There was an error while deleting Category", "Category deleting error");
                        }


                    });
                }
            });
        };
        $scope.changeStatus = function (ind) {
            NavigationService.categorySave(ind, function (data) {
                if (data.value === true) {}
            });
        };
    })
    .controller('CreateCategoryCtrl', function ($scope, hotkeys, $window, TemplateService, NavigationService, $timeout, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("category-detail");
        $scope.menutitle = NavigationService.makeactive("Category");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.userStatus = [{
            "name": "Active",
            "value": true
        }, {
            "name": "Inactive",
            "value": false
        }];
        $scope.header = {
            "name": "Create Category"
        };
        $scope.formData = {};
        $scope.cancel = function () {
            $window.history.back();
        };
        hotkeys.bindTo($scope).add({
            combo: 'ctrl+enter',
            callback: function (formData) {
                NavigationService.categorySave($scope.formData, function (data) {
                    if (data.value === true) {
                        $window.history.back();
                        toastr.success("Category " + formData.name + " created successfully.", "Category Created");
                    } else {
                        toastr.error("Category creation failed.", "Category creation error");
                    }
                });
            }
        });
        $scope.saveCategory = function (formData) {
            NavigationService.categorySave($scope.formData, function (data) {
                if (data.value === true) {
                    $window.history.back();
                    toastr.success("Category " + formData.name + " created successfully.", "Category Created");
                } else {
                    toastr.error("Category creation failed.", "Category creation error");
                }
            });
        };
    })
    .controller('EditCategoryCtrl', function ($scope, hotkeys, $window, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("category-detail");
        $scope.menutitle = NavigationService.makeactive("Category");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.userStatus = [{
            "name": "Active",
            "value": true
        }, {
            "name": "Inactive",
            "value": false
        }];
        $scope.header = {
            "name": "Edit Category"
        };

        NavigationService.getOneCategory($stateParams.id, function (data) {
            $scope.formData = data.data;
            console.log('$scope.formData', $scope.formData);

        });
        $scope.cancel = function () {
            $window.history.back();
        };
        hotkeys.bindTo($scope).add({
            combo: 'ctrl+enter',
            callback: function (formData) {
                NavigationService.categorySave($scope.formData, function (data) {
                    if (data.value === true) {
                        $window.history.back();
                        toastr.success("Category " + $scope.formData.name + " edited successfully.", "Category Edited");
                    } else {
                        toastr.error("Category edition failed.", "Category editing error");
                    }
                });
            }
        });
        $scope.saveCategory = function (formValid) {
            NavigationService.categorySave($scope.formData, function (data) {
                if (data.value === true) {
                    $window.history.back();
                    toastr.success("Category " + $scope.formData.name + " edited successfully.", "Category Edited");
                } else {
                    toastr.error("Category edition failed.", "Category editing error");
                }
            });
        };
    })

    .controller('FuncCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("func-list");
        $scope.menutitle = NavigationService.makeactive("Function List");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.showAllFunc = function () {
            NavigationService.getAllFunc(function (data) {
                $scope.allFunc = data.data;

            });
        };
        $scope.showAllFunc();

        $scope.deleteFunc = function (id) {

            NavigationService.deleteFunc({
                id: id
            }, function (data) {
                $scope.showAllFunc();

            });
        };

    })
    .controller('CreateFuncCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("func-detail");
        $scope.menutitle = NavigationService.makeactive("Function");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "Create Function"
        };
        $scope.formData = {};
        $scope.saveFunc = function (formData) {

            NavigationService.funcSave($scope.formData, function (data) {
                console.log(data);
                if (data.value === true) {
                    $window.history.back();
                }

            });
        };

    })
    .controller('EditFuncCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $stateParams, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("func-detail");
        $scope.menutitle = NavigationService.makeactive("Function");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "Edit Function"
        };

        NavigationService.getOneFunc($stateParams.id, function (data) {
            $scope.formData = data.data;
            console.log('$scope.formData', $scope.formData);

        });

        $scope.saveFunc = function (formValid) {

            //  if (formValid.$valid) {
            //  $scope.formComplete = true;
            NavigationService.FuncEditSave($scope.formData, function (data) {
                if (data.value === true) {
                    // $state.go('func-list');
                    $window.history.back();
                }
            });
        };

    })
    .controller('CauseLossCtrl', function ($scope, hotkeys, $window, TemplateService, NavigationService, $timeout) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("causeLoss-list");
        $scope.menutitle = NavigationService.makeactive("Cause of Loss List");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.showAllCauseLoss = function () {
            NavigationService.getAllCauseLoss(function (data) {
                $scope.allCauseLoss = data.data;

            });
        };
        $scope.showAllCauseLoss();

        $scope.deleteCauseLoss = function (id) {

            NavigationService.deleteCauseLoss({
                id: id
            }, function (data) {
                $scope.showAllCauseLoss();

            });
        };

    })
    .controller('CreateCauseLossCtrl', function ($scope, hotkeys, $window, TemplateService, NavigationService, $timeout, $state, $stateParams, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("causeLoss-detail");
        $scope.menutitle = NavigationService.makeactive("Cause of Loss");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.userStatus = [{
            "name": "Active",
            "value": true
        }, {
            "name": "Inactive",
            "value": false
        }];
        $scope.header = {
            "name": "Create Cause of Loss"
        };
        $scope.natureOfLosses = ['Fire', 'Theft', 'Burglary'];
        $scope.formData = {};
        $scope.tagTransform = function (newTag) {
            var item = {
                name: newTag
            };
            return item;
        };

        $scope.departments = [];
        $scope.refreshDepartments = function (data) {
            console.log("Data Inn", data);
            var formdata = {};
            formdata.keyword = data;
            NavigationService.searchDepartment(formdata, 1, function (data) {
                $scope.departments = data.data.results;
            });
        };
        $scope.refreshDepartments();

        $scope.refreshNature = function (data) {
            var formdata = {};
            formdata.keyword = data;
            NavigationService.getNature(formdata, 1, function (data) {
                $scope.natureOfLosses = data.data.results;
            });
        };
        $scope.refreshNature();
        $scope.clicked = function (select) {
            console.log("fsdfasd");
            console.log(select[select.length - 1].name);
            NavigationService.saveNature({
                'name': select[select.length - 1].name
            }, function (data) {
                $scope.formData.natureOfLoss[$scope.formData.natureOfLoss.length - 1] = data.data;
            });
        };
        $scope.cancel = function () {
            $window.history.back();
        }
        hotkeys.bindTo($scope).add({
            combo: 'ctrl+enter',
            callback: function (formData) {
                NavigationService.modelSave("CauseLoss", $scope.formData, function (data) {
                    if (data.value === true) {
                        // $state.go('causeLoss' + '-list');
                        $window.history.back();
                        toastr.success("Customer" + " " + formData.name + " created successfully.", "Customer" + " Created");
                    } else {
                        toastr.error("Customer" + " creation failed.", "Customer" + " creation error");
                    }
                });
            }
        });
        $scope.saveModel = function (formData) {
            NavigationService.modelSave("CauseLoss", $scope.formData, function (data) {
                if (data.value === true) {
                    // $state.go('causeLoss' + '-list');
                    $window.history.back();
                    toastr.success("Customer" + " " + formData.name + " created successfully.", "Customer" + " Created");
                } else {
                    toastr.error("Customer" + " creation failed.", "Customer" + " creation error");
                }
            });
        };

    })
    .controller('EditCauseLossCtrl', function ($scope, hotkeys, $window, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("causeLoss-detail");
        $scope.menutitle = NavigationService.makeactive("Cause of Loss");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.userStatus = [{
            "name": "Active",
            "value": true
        }, {
            "name": "Inactive",
            "value": false
        }];
        $scope.header = {
            "name": "Edit Cause of Loss"
        };
        $scope.natureOfLosses = ['Fire', 'Theft', 'Burglary'];

        $scope.tagTransform = function (newTag) {
            var item = {
                name: newTag
            };
            return item;
        };

        $scope.departments = [];
        $scope.refreshDepartments = function (data) {
            console.log("Data Inn", data);
            var formdata = {};
            formdata.keyword = data;
            NavigationService.searchDepartment(formdata, 1, function (data) {
                $scope.departments = data.data.results;
            });
        };
        $scope.refreshDepartments();

        $scope.refreshNature = function (data) {
            var formdata = {};
            formdata.keyword = data;
            NavigationService.getNature(formdata, 1, function (data) {
                $scope.natureOfLosses = data.data.results;
            });
        };
        $scope.refreshNature();
        $scope.clicked = function (select) {
            NavigationService.saveNature({
                'name': select[select.length - 1].name
            }, function (data) {
                $scope.formData.natureOfLoss[$scope.formData.natureOfLoss.length - 1] = data.data;
            });
        };

        NavigationService.getOneModel("CauseLoss", $stateParams.id, function (data) {
            $scope.formData = data.data;
        });
        $scope.cancel = function () {
            $window.history.back();
        }
        hotkeys.bindTo($scope).add({
            combo: 'ctrl+enter',
            callback: function (formData) {
                NavigationService.modelSave("CauseLoss", $scope.formData, function (data) {
                    if (data.value === true) {
                        $window.history.back();
                        toastr.success("Cause Of Loss" + $scope.formData.name + " edited successfully.", "Cause Of Loss" + " Edited");
                    } else {
                        toastr.error("Cause Of Loss" + " edition failed.", "Cause Of Loss" + " editing error");
                    }
                });
            }
        });
        $scope.saveModel = function (formValid) {
            NavigationService.modelSave("CauseLoss", $scope.formData, function (data) {
                if (data.value === true) {
                    $window.history.back();
                    toastr.success("Cause Of Loss" + $scope.formData.name + " edited successfully.", "Cause Of Loss" + " Edited");
                } else {
                    toastr.error("Cause Of Loss" + " edition failed.", "Cause Of Loss" + " editing error");
                }
            });
        };

    })
    .controller('NatureLossCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("natureLoss-list");
        $scope.menutitle = NavigationService.makeactive("Nature of Loss List");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.showAllNatureLoss = function () {
            NavigationService.getAllNatureLoss(function (data) {
                $scope.allNatureLoss = data.data;

            });
        };
        $scope.showAllNatureLoss();

        $scope.deleteNatureLoss = function (id) {

            NavigationService.deleteNatureLoss({
                id: id
            }, function (data) {
                $scope.showAllNatureLoss();

            });
        };

    })
    .controller('CreateNatureLossCtrl', function ($scope, hotkeys, $window, TemplateService, NavigationService, $timeout, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("natureLoss-detail");
        $scope.menutitle = NavigationService.makeactive("Nature of Loss");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.userStatus = [{
            "name": "Active",
            "value": true
        }, {
            "name": "Inactive",
            "value": false
        }];
        $scope.header = {
            "name": "Create Nature Loss"
        };
        $scope.formData = {};
        $scope.cancel = function () {
            $window.history.back();
        };
        hotkeys.bindTo($scope).add({
            combo: 'ctrl+enter',
            callback: function (formData) {
                NavigationService.naturelossSave($scope.formData, function (data) {
                    console.log(data);
                    if (data.value === true) {
                        $window.history.back();
                    }

                });
            }
        });
        $scope.saveNatureLoss = function (formData) {
            NavigationService.naturelossSave($scope.formData, function (data) {
                console.log(data);
                if (data.value === true) {
                    $window.history.back();
                }

            });
        };
        NavigationService.getAllDepartments(function (data) {
            $scope.allDepartments = data.data;

        });
        NavigationService.getAllCauseLoss(function (data) {
            $scope.allCauseLoss = data.data;

        });

    })
    .controller('EditNatureLossCtrl', function ($scope, hotkeys, $window, TemplateService, NavigationService, $timeout, $stateParams, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("natureLoss-detail");
        $scope.menutitle = NavigationService.makeactive("Nature of Loss");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.userStatus = [{
            "name": "Active",
            "value": true
        }, {
            "name": "Inactive",
            "value": false
        }];
        $scope.header = {
            "name": "Edit Nature Loss"
        };

        NavigationService.getOneNatureLoss($stateParams.id, function (data) {
            $scope.formData = data.data;
            console.log('$scope.formData', $scope.formData);

        });
        $scope.cancel = function () {
            $window.history.back();
        };
        hotkeys.bindTo($scope).add({
            combo: 'ctrl+enter',
            callback: function (formData) {
                NavigationService.NatureLossEditSave($scope.formData, function (data) {
                    if (data.value === true) {
                        // $state.go('natureloss-list');
                        $window.history.back();
                    }
                });
            }
        });
        $scope.saveNatureLoss = function (formValid) {

            //  if (formValid.$valid) {
            //  $scope.formComplete = true;
            NavigationService.NatureLossEditSave($scope.formData, function (data) {
                if (data.value === true) {
                    // $state.go('natureloss-list');
                    $window.history.back();
                }
            });
        };
        NavigationService.getAllDepartments(function (data) {
            $scope.allDepartments = data.data;

        });
        NavigationService.getAllCauseLoss(function (data) {
            $scope.allCauseLoss = data.data;

        });
    })
    .controller('BusinessBranchCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("businessBranch-list");
        $scope.menutitle = NavigationService.makeactive("Business Branch List");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.showAllBusinessBranch = function () {
            NavigationService.getAllBusinessBranch(function (data) {
                $scope.allBusinessBranch = data.data;

            });
        };
        $scope.showAllBusinessBranch();

        $scope.deleteBusinessBranch = function (id) {

            NavigationService.deleteBusinessBranch({
                id: id
            }, function (data) {
                $scope.showAllBusinessBranch();

            });
        };

    })
    .controller('CreateBusinessBranchCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("businessBranch-detail");
        $scope.menutitle = NavigationService.makeactive("Business Branch");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "Create Business Branch"
        };
        $scope.formData = {};
        $scope.saveBusinessBranch = function (formData) {

            $scope.cancel = function () {
                $window.history.back();
            };

            NavigationService.businessbranchSave($scope.formData, function (data) {
                console.log(data);
                if (data.value === true) {
                    $window.history.back();
                }

            });
        };

    })
    .controller('EditBusinessBranchCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $stateParams, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("businessBranch-detail");
        $scope.menutitle = NavigationService.makeactive("Business Branch");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "Edit Business Branch"
        };

        NavigationService.getOneBusinessBranch($stateParams.id, function (data) {
            $scope.formData = data.data;
            console.log('$scope.formData', $scope.formData);

        });
        $scope.cancel = function () {
            $window.history.back();
        };
        $scope.saveBusinessBranch = function (formValid) {

            //  if (formValid.$valid) {
            //  $scope.formComplete = true;
            NavigationService.BusinessBranchEditSave($scope.formData, function (data) {
                if (data.value === true) {
                    // $state.go('businessbranch-list');
                    $window.history.back();
                }
            });
        };
    })









    .controller('MenuCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("menu-list");
        $scope.menutitle = NavigationService.makeactive("Menu List");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.showAllMenus = function () {
            NavigationService.getAllMenus(function (data) {
                $scope.allMenus = data.data;
                console.log('$scope.allMenus', $scope.allZones);
            });

        };
        $scope.showAllMenus();

        $scope.cancel = function () {
            $window.history.back();
        };
        $scope.deleteMenu = function (id) {

            NavigationService.deleteMenu({
                id: id
            }, function (data) {
                $scope.showAllMenus();

            });
        };


    })
    .controller('CreateMenuCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("menu-detail");
        $scope.menutitle = NavigationService.makeactive("Menu");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.userStatus = [{
            "name": "Active",
            "value": true
        }, {
            "name": "Inactive",
            "value": false
        }];
        $scope.header = {
            "name": "Create Menu"
        };
        $scope.formData = {};
        $scope.cancel = function () {
            $window.history.back();
        };
        $scope.saveMenu = function (formData) {

            NavigationService.menuSave($scope.formData, function (data) {
                console.log(data);
                if (data.value === true) {
                    $window.history.back();
                }

            });
        };

        // NavigationService.getAllCountries(function(data) {
        //     $scope.allCountries = data.data;
        //     console.log('$scope.allCountries', $scope.allCountries);
        //
        // });

    })
    .controller('EditMenuCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $stateParams, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("menu-detail");
        $scope.menutitle = NavigationService.makeactive("Menu");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.userStatus = [{
            "name": "Active",
            "value": true
        }, {
            "name": "Inactive",
            "value": false
        }];
        $scope.header = {
            "name": "Edit Menu"
        };

        NavigationService.getOneMenu($stateParams.id, function (data) {
            $scope.formData = data.data;

        });
        $scope.cancel = function () {
            $window.history.back();
        };
        $scope.saveMenu = function (formValid) {

            //  if (formValid.$valid) {
            //  $scope.formComplete = true;
            NavigationService.menuEditSave($scope.formData, function (data) {
                if (data.value === true) {
                    // $state.go('menu-list');
                    $window.history.back();
                }
            });
            //  }
        };

        // NavigationService.getAllCountries(function(data) {
        //     $scope.allCountries = data.data;
        //     console.log('$scope.allCountries', $scope.allCountries);
        //
        // });

    })









    .controller('RoleCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("role-list");
        $scope.menutitle = NavigationService.makeactive("Role List");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.showAllRoles = function () {
            NavigationService.getAllRoles(function (data) {
                $scope.allRoles = data.data;
                console.log('$scope.allRoles', $scope.allZones);
            });

        };
        $scope.showAllRoles();

        $scope.cancel = function () {
            $window.history.back();
        };

        $scope.deleteRole = function (id) {

            NavigationService.deleteRole({
                id: id
            }, function (data) {
                $scope.showAllRoles();

            });
        };


    })
    .controller('CreateRoleCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("role-detail");
        $scope.menutitle = NavigationService.makeactive("Role");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "Create Role"
        };
        $scope.formData = {};
        $scope.UserType = ['internal', 'external'];
        $scope.cancel = function () {
            $window.history.back();
        };
        $scope.saveRole = function (formData) {

            NavigationService.roleSave($scope.formData, function (data) {
                console.log(data);
                if (data.value === true) {
                    $window.history.back();
                }

            });
        };

        NavigationService.getAllMenus(function (data) {
            $scope.allMenus = data.data;
            console.log('$scope.allMenus', $scope.allZones);
        });

    })
    .controller('EditRoleCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $stateParams, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("role-detail");
        $scope.menutitle = NavigationService.makeactive("Role");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "Edit Role"
        };
        $scope.UserType = ['internal', 'external'];
        NavigationService.getOneRole($stateParams.id, function (data) {
            $scope.formData = data.data;

        });
        $scope.cancel = function () {
            $window.history.back();
        };
        $scope.saveRole = function (formValid) {
            NavigationService.roleEditSave($scope.formData, function (data) {
                if (data.value === true) {
                    $window.history.back();
                }
            });
            //  }
        };

        NavigationService.getAllMenus(function (data) {
            $scope.allMenus = data.data;
            console.log('$scope.allMenus', $scope.allZones);
        });

    })









    .controller('UserCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("user-list");
        $scope.menutitle = NavigationService.makeactive("User List");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.UserType = ['internal', 'external'];
        $scope.showAllUsers = function () {
            NavigationService.getAllUsers(function (data) {
                $scope.allUsers = data.data;
                console.log('$scope.allUsers', $scope.allZones);
            });

        };
        $scope.showAllUsers();


        $scope.deleteUser = function (id) {
            $scope.cancel = function () {
                $window.history.back();
            };
            NavigationService.deleteUser({
                id: id
            }, function (data) {
                $scope.showAllUsers();

            });
        };


    })
    .controller('CreateUserCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("user-detail");
        $scope.menutitle = NavigationService.makeactive("User");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.UserType = ['internal', 'external'];
        $scope.header = {
            "name": "Create User"
        };
        $scope.UserType = ['internal', 'external'];
        $scope.userStatus = [{
            "name": "Active",
            "value": true
        }, {
            "name": "Inactive",
            "value": false
        }];
        $scope.formData = {};
        $scope.UserType = ['internal', 'external'];
        $scope.saveUser = function (formData) {

            NavigationService.userSave($scope.formData, function (data) {
                console.log(data);
                if (data.value === true) {
                    $window.history.back();
                }

            });
        };
        $scope.cancel = function () {
            $window.history.back();
        };
        NavigationService.getAllMenus(function (data) {
            $scope.allMenus = data.data;
            console.log('$scope.allMenus', $scope.allZones);
        });
        NavigationService.getAllRoles(function (data) {
            $scope.allRoles = data.data;
            console.log('$scope.allRoles', $scope.allZones);
        });
        NavigationService.getAllDepartments(function (data) {
            $scope.allDepartments = data.data;

        });

    })
    .controller('EditUserCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $stateParams, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("user-detail");
        $scope.menutitle = NavigationService.makeactive("User");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.UserType = ['internal', 'external'];
        $scope.header = {
            "name": "Edit User"
        };

        $scope.UserRole = [{
            user_type: '',
            roleName: '',
            menu: '',
            roleDescription: ''
        }];
        console.log('addd', $scope.UserRole);

        $scope.UserType = ['internal', 'external'];
        $scope.userStatus = [{
            "name": "Active",
            "value": true
        }, {
            "name": "Inactive",
            "value": false
        }];
        $scope.UserType = ['internal', 'external'];
        NavigationService.getOneUser($stateParams.id, function (data) {
            $scope.UserRole = data.data.role;
            console.log('inside', $scope.UserRole);
            $scope.formData = data.data;
            console.log('$scope.formData', $scope.formData);

        });
        $scope.cancel = function () {
            $window.history.back();
        };
        $scope.saveUser = function (formValid) {

            //  if (formValid.$valid) {
            //  $scope.formComplete = true;
            NavigationService.userEditSave($scope.formData, function (data) {
                if (data.value === true) {
                    // $state.go('user-list');
                    $window.history.back();
                }
            });
            //  }
        };

        NavigationService.getAllMenus(function (data) {
            $scope.allMenus = data.data;
            console.log('$scope.allMenus', $scope.allZones);
        });
        NavigationService.getAllRoles(function (data) {
            $scope.allRoles = data.data;
            console.log('$scope.allRoles', $scope.allZones);
        });
        NavigationService.getAllDepartments(function (data) {
            $scope.allDepartments = data.data;

        });

    })

    .controller('BranchCreateCtrl', function ($scope, hotkeys, $window, TemplateService, NavigationService, $timeout, toastr, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("branch-create");
        $scope.menutitle = NavigationService.makeactive("Create Branch");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.formData = {};
        $scope.header = {
            "name": "Create Branch Master"
        };
        $scope.cancel = function () {
            $window.history.back();
        };

        hotkeys.bindTo($scope).add({
            combo: 'ctrl+enter',
            callback: function (formData) {
                $scope.hideSaveCancel = true;
                NavigationService.branchSave($scope.formData, function (data) {
                    if (data.value === true) {
                        $window.history.back();
                        toastr.success("Branch " + $scope.formData.name + " created successfully.", "Branch Created");
                    } else {
                        toastr.error("Branch creation failed.", "Branch creation error");
                    }
                });
            }
        });

        $scope.submit = function (formData) {
            NavigationService.branchSave($scope.formData, function (data) {
                if (data.value === true) {
                    $window.history.back();
                    toastr.success("Branch " + $scope.formData.name + " created successfully.", "Branch Created");
                } else {
                    toastr.error("Branch creation failed.", "Branch creation error");
                }
            });
        };
    })
    .controller('BranchEditCtrl', function ($scope, hotkeys, $window, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("branch-create");
        $scope.menutitle = NavigationService.makeactive("Edit Branch");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "Edit Branch"
        };
        NavigationService.getOneBranch($stateParams.id, function (data) {
            $scope.formData = data.data;
            $scope.formData.company = data.data.office.company;

        });
        $scope.cancel = function () {
            $window.history.back();
        };

        hotkeys.bindTo($scope).add({
            combo: 'ctrl+enter',
            callback: function (formData) {
                $scope.hideSaveCancel = true;
                NavigationService.branchSave($scope.formData, function (data) {
                    if (data.value === true) {
                        $window.history.back();
                        toastr.success("Branch " + $scope.formData.name + " edited successfully.", "Branch Edited");
                    } else {
                        toastr.error("Branch edition failed.", "Branch editing error");
                    }
                });
            }
        });

        $scope.submit = function (formValid) {
            NavigationService.branchSave($scope.formData, function (data) {
                if (data.value === true) {
                    $window.history.back();
                    toastr.success("Branch " + $scope.formData.name + " edited successfully.", "Branch Edited");
                } else {
                    toastr.error("Branch edition failed.", "Branch editing error");
                }
            });
        };
    })

    .controller('headerctrl', function ($scope, $window, TemplateService, $uibModal) {
        $scope.template = TemplateService;
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            $(window).scrollTop(0);
        });
        globalfunction.confDel = function (callback) {

            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: '/frontend/views/modal/conf-delete.html',
                size: 'sm',
                scope: $scope
            });
            $scope.close = function (value) {
                callback(value);
                modalInstance.close("cancel");
            };
        };
    })

    .controller('languageCtrl', function ($scope, $window, TemplateService, $translate, $rootScope) {

        $scope.changeLanguage = function () {
            console.log("Language CLicked");

            if (!$.jStorage.get("language")) {
                $translate.use("hi");
                $.jStorage.set("language", "hi");
            } else {
                if ($.jStorage.get("language") == "en") {
                    $translate.use("hi");
                    $.jStorage.set("language", "hi");
                } else {
                    $translate.use("en");
                    $.jStorage.set("language", "en");
                }
            }
            //  $rootScope.$apply();
        };
    })


    .controller('CustomerCompanyCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("customerCompany-list");
        $scope.menutitle = NavigationService.makeactive("Customer Company List");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.showAllCustomerCompanies = function () {
            NavigationService.getAllCustomerCompanies(function (data) {
                $scope.allCustomerCompanies = data.data;
                console.log('$scope.allCustomerCompanies', $scope.allCustomerCompanies);

            });
        };
        $scope.showAllCustomerCompanies();
        $scope.deleteCustomerCompany = function (id) {

            NavigationService.deleteCustomerCompany({
                id: id
            }, function (data) {
                $scope.showAllCustomerCompanies();

            });
        };
    })
    .controller('CreateCustomerCompanyCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("customerCompany-detail");
        $scope.menutitle = NavigationService.makeactive("Customer Company");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "Create Customer Company"
        };
        $scope.formData = {};
        $scope.saveCustomerCompany = function (formData) {

            NavigationService.customerCompanySave($scope.formData, function (data) {
                if (data.value === true) {
                    // $state.go('customerCompany-list');
                    $window.history.back();
                }

            });
        };

    })
    .controller('EditCustomerCompanyCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $stateParams, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("customerCompany-detail");
        $scope.menutitle = NavigationService.makeactive("Customer Company");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "Edit Customer Company"
        };

        NavigationService.getOneCustomerCompany($stateParams.id, function (data) {
            $scope.formData = data.data;
        });

        $scope.saveCustomerCompany = function (formValid) {

            //  if (formValid.$valid) {
            //  $scope.formComplete = true;
            NavigationService.customerCompanyEditSave($scope.formData, function (data) {
                if (data.value === true) {
                    // $state.go('customerCompany-list');
                    $window.history.back();
                }
            });
            //  }
        };

    })

    .controller('CustomerCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("customer-list");
        $scope.menutitle = NavigationService.makeactive("Customer");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.showAllCustomers = function () {
            NavigationService.getAllCustomers(function (data) {
                $scope.allCustomers = data.data;
                console.log('$scope.allCustomers', $scope.allCustomers);

            });
        };
        $scope.showAllCustomers();
        $scope.cancel = function () {
            $window.history.back();
        };
        $scope.deleteCustomer = function (id) {

            NavigationService.deleteCustomer({
                id: id
            }, function (data) {
                $scope.showAllCustomers();

            });
        };
    })

    .controller('CreateCustomerCtrl', function ($scope, hotkeys, $window, TemplateService, NavigationService, $timeout, $state, $uibModal, $stateParams, toastr, $filter) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("customer-detail");
        $scope.menutitle = NavigationService.makeactive("Create Customer");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.formData = {};
        $scope.formIndex = 0;
        $scope.buttonValue = "Save";
        $scope.formData.officers = [];
        $scope.format = 'dd-MMMM-yyyy';
        $scope.header = {
            "name": "Create Customer"
        };
        $scope.userStatus = [{
            "name": "Active",
            "value": true
        }, {
            "name": "Inactive",
            "value": false
        }];
        $scope.salutations = ["Mr.", "Mrs.", "Ms.", "Dr."];
        $scope.formData.companyShortName = "";
        $scope.formData.TOFShortName = "";
        $scope.formData.officeCode = "";
        $scope.formData.city1 = "";

        $scope.popup = {
            birthDate: false
        };
        $scope.showing = false;
        $scope.passType = 'password';
        $scope.showPass = function () {
            $scope.showing = !$scope.showing;
            if ($scope.showing === false) {
                $scope.passType = 'password';
            } else {
                $scope.passType = 'text';
            }
        };
        $scope.$watch('formData.typeOfOffice', function () {
            console.log("typeOfOffice", $scope.formData.typeOfOffice);
            if ($scope.formData.typeOfOffice) {
                NavigationService.getOneModel('TypeOfOffice', $scope.formData.typeOfOffice, function (data) {
                    $scope.formData.TOFShortName = data.data.shortCode;
                    console.log("CIty Detalis", $scope.formData);
                    if ($scope.formData.officeCode === "") {
                        arr = _.split($scope.formData.city1, ",", 1);
                        $scope.formData.city1 = arr[0];
                        // $scope.formData.sname = $scope.formData.TOFShortName ;
                        $scope.formData.name = $scope.formData.companyShortName + ' ' + $scope.formData.TOFShortName + ' ' + $scope.formData.city1;
                    } else {
                        arr = _.split($scope.formData.city1, ",", 1);
                        $scope.formData.city1 = arr[0];
                        //  $scope.formData.sname = $scope.formData.TOFShortName ;
                        $scope.formData.name = $scope.formData.companyShortName + ' ' + $scope.formData.TOFShortName + ' ' + $scope.formData.officeCode + ' ' + $scope.formData.city1;
                    }
                });
            }
        });
        $scope.$watch('formData.customerCompany', function () {
            if ($scope.formData.customerCompany) {
                NavigationService.getOneModel('CustomerCompany', $scope.formData.customerCompany, function (data) {
                    $scope.formData.companyShortName = data.data.shortName;
                    if ($scope.formData.officeCode === "") {
                        arr = _.split($scope.formData.city1, ",", 1);
                        $scope.formData.city1 = arr[0];
                        $scope.formData.name = $scope.formData.companyShortName + ' ' + $scope.formData.TOFShortName + ' ' + $scope.formData.city1;
                    } else {
                        arr = _.split($scope.formData.city1, ",", 1);
                        $scope.formData.city1 = arr[0];
                        $scope.formData.name = $scope.formData.companyShortName + ' ' + $scope.formData.TOFShortName + ' ' + $scope.formData.officeCode + ' ' + $scope.formData.city1;
                    }
                });
            }
        });
        $scope.$watch('formData.officeCode', function () {
            if ($scope.formData.officeCode === "") {
                arr = _.split($scope.formData.city1, ",", 1);
                $scope.formData.city1 = arr[0];
                $scope.formData.name = $scope.formData.companyShortName + ' ' + $scope.formData.TOFShortName + ' ' + $scope.formData.city1;
            } else {
                arr = _.split($scope.formData.city1, ",", 1);
                $scope.formData.city1 = arr[0];
                $scope.formData.name = $scope.formData.companyShortName + ' ' + $scope.formData.TOFShortName + ' ' + $scope.formData.officeCode + ' ' + $scope.formData.city1;
            }
        });
        $scope.$watch('formData.city1', function () {
            if ($scope.formData.officeCode === "") {
                arr = _.split($scope.formData.city1, ",", 1);
                $scope.formData.city1 = arr[0];
                $scope.formData.name = $scope.formData.companyShortName + ' ' + $scope.formData.TOFShortName + ' ' + $scope.formData.city1;
            } else {
                arr = _.split($scope.formData.city1, ",", 1);
                $scope.formData.city1 = arr[0];
                $scope.formData.name = $scope.formData.companyShortName + ' ' + $scope.formData.TOFShortName + ' ' + $scope.formData.officeCode + ' ' + $scope.formData.city1;
            }
        });
        $scope.addOfficer = function () {
            var modalInstance = $uibModal.open({
                scope: $scope,
                templateUrl: '/frontend/views/modal/modal-officer.html',
                size: 'lg'
            });
        };

        $scope.transferOfficer = function () {
            var modalInstance = $uibModal.open({
                scope: $scope,
                templateUrl: '/frontend/views/modal/modal-transfer-officer.html',
                size: 'lg'
            });
        };
        $scope.cancel = function () {
            $window.history.back();
        }
        hotkeys.bindTo($scope).add({
            combo: 'ctrl+enter',
            callback: function (formData) {
                NavigationService.modelSave("Customer", $scope.formData, function (data) {
                    if (data.value === true) {
                        // $state.go('customer' + '-list');
                        $window.history.back();
                        toastr.success("Customer" + " " + formData.name + " created successfully.", "Customer" + " Created");
                    } else {
                        toastr.error("Error while creating " + data.error.message, "Error");
                    }
                });
            }
        });
        $scope.saveModel = function (formData) {
            NavigationService.modelSave("Customer", $scope.formData, function (data) {
                if (data.value === true) {
                    // $state.go('customer' + '-list');
                    $window.history.back();
                    toastr.success("Customer" + " " + formData.name + " created successfully.", "Customer" + " Created");
                } else {
                    toastr.error("Customer" + data.error.message + " creation failed.", "Customer" + " creation error");
                }
            });
        };
        $scope.createOfficer = function (modelData) {
            modelData.name = modelData.firstName + " " + modelData.lastName;
            NavigationService.saveOfficer(modelData, function (data) {
                if (data.value) {
                    if ($scope.buttonValue === "Save") {
                        $scope.formData.officers.push(data.data);
                    } else {
                        $scope.formData.officers[$scope.formIndex] = modelData;
                    }
                }
            });
        };
        $scope.openCreateOfficer = function () {
            $scope.buttonValue = "Save";
            $scope.modalData = {};
            $scope.addOfficer();
        };
        $scope.openEditOfficer = function (index) {
            $scope.formIndex = index;
            $scope.buttonValue = "Edit";
            $scope.modalData = $scope.formData.officers[index];
            $scope.addOfficer();
        };
        $scope.deleteOfficer = function (index) {
            NavigationService.deleteModel("Officer", $scope.formData.officers[index]._id, function (data) {
                $scope.formData.officers.splice(index, 1);
            });
        };
    })
    .controller('EditCustomerCtrl', function ($scope, hotkeys, $window, TemplateService, NavigationService, $timeout, $state, $stateParams, $uibModal, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("customer-detail");
        $scope.menutitle = NavigationService.makeactive("Edit Customer");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.formData = {};
        $scope.formIndex = 0;
        $scope.buttonValue = "Save";
        $scope.formData.officers = [];
        $scope.format = 'dd-MMMM-yyyy';
        // $scope.
        $scope.header = {
            "name": "Edit Customer"
        };
        $scope.userStatus = [{
            "name": "Active",
            "value": true
        }, {
            "name": "Inactive",
            "value": false
        }];
        $scope.salutations = ["Mr.", "Mrs.", "Ms.", "Dr."];
        $scope.formData.companyShortName = "";
        $scope.formData.TOFShortName = "";
        $scope.formData.officeCode = "";
        $scope.formData.city1 = "";
        $scope.popup = {
            birthDate: false
        };
        $scope.showing = false;
        $scope.passType = 'password';
        $scope.showPass = function () {
            $scope.showing = !$scope.showing;
            if ($scope.showing === false) {
                $scope.passType = 'password';
            } else {
                $scope.passType = 'text';
            }
        };
        $scope.addOfficer = function () {
            var modalInstance = $uibModal.open({
                scope: $scope,
                templateUrl: '/frontend/views/modal/modal-officer.html',
                size: 'lg'
            });
        };
        $scope.transferOfficer = function () {
            var modalInstance = $uibModal.open({
                scope: $scope,
                templateUrl: '/frontend/views/modal/modal-transfer-officer.html',
                size: 'lg'
            });
        };
        $scope.$watch('formData.typeOfOffice', function () {
            console.log($scope.formData.typeOfOffice);
            if ($scope.formData.typeOfOffice) {
                NavigationService.getOneModel('TypeOfOffice', $scope.formData.typeOfOffice, function (data) {
                    console.log(data);
                    $scope.formData.TOFShortName = data.data.shortCode;
                    console.log("CIty Detalis", $scope.formData);
                    if ($scope.formData.officeCode === "") {
                        arr = _.split($scope.formData.city1, ",", 1);
                        $scope.formData.city1 = arr[0];
                        $scope.formData.name = $scope.formData.companyShortName + ' ' + $scope.formData.TOFShortName + ' ' + $scope.formData.city1;

                    } else {
                        arr = _.split($scope.formData.city1, ",", 1);
                        $scope.formData.city1 = arr[0];
                        $scope.formData.name = $scope.formData.companyShortName + ' ' + $scope.formData.TOFShortName + ' ' + $scope.formData.officeCode + ' ' + $scope.formData.city1;
                    }
                });
            }
        });
        $scope.$watch('formData.customerCompany', function () {
            if ($scope.formData.customerCompany) {
                NavigationService.getOneModel('CustomerCompany', $scope.formData.customerCompany, function (data) {
                    $scope.formData.companyShortName = data.data.shortName;
                    if ($scope.formData.officeCode === "") {
                        arr = _.split($scope.formData.city1, ",", 1);
                        $scope.formData.city1 = arr[0];
                        $scope.formData.name = $scope.formData.companyShortName + ' ' + $scope.formData.TOFShortName + ' ' + $scope.formData.city1;
                    } else {
                        arr = _.split($scope.formData.city1, ",", 1);
                        $scope.formData.city1 = arr[0];
                        $scope.formData.name = $scope.formData.companyShortName + ' ' + $scope.formData.TOFShortName + ' ' + $scope.formData.officeCode + ' ' + $scope.formData.city1;
                    }
                });
            }
        });
        $scope.$watch('formData.officeCode', function () {
            if ($scope.formData.officeCode === "") {
                arr = _.split($scope.formData.city1, ",", 1);
                $scope.formData.city1 = arr[0];
                $scope.formData.name = $scope.formData.companyShortName + ' ' + $scope.formData.TOFShortName + ' ' + $scope.formData.city1;
            } else {
                arr = _.split($scope.formData.city1, ",", 1);
                $scope.formData.city1 = arr[0];
                $scope.formData.name = $scope.formData.companyShortName + ' ' + $scope.formData.TOFShortName + ' ' + $scope.formData.officeCode + ' ' + $scope.formData.city1;
            }
        });
        $scope.$watch('formData.city1', function () {
            if ($scope.formData.officeCode === "") {
                arr = _.split($scope.formData.city1, ",", 1);
                $scope.formData.city1 = arr[0];
                $scope.formData.name = $scope.formData.companyShortName + ' ' + $scope.formData.TOFShortName + ' ' + $scope.formData.city1;


            } else {
                arr = _.split($scope.formData.city1, ",", 1);
                $scope.formData.city1 = arr[0];
                $scope.formData.name = $scope.formData.companyShortName + ' ' + $scope.formData.TOFShortName + ' ' + $scope.formData.officeCode + ' ' + $scope.formData.city1;
            }
        });

        NavigationService.getOneModel("Customer", $stateParams.id, function (data) {
            $scope.formData = data.data;

            if (data.data.city) {
                $scope.formData.country = data.data.city.district.state.zone.country._id;
                $scope.formData.zone = data.data.city.district.state.zone._id;
                $scope.formData.state = data.data.city.district.state._id;
                $scope.formData.district = data.data.city.district._id;
                $scope.formData.city = data.data.city._id;
            }
            $scope.formData.name = $scope.formData.companyShortName + '-' + $scope.formData.TOFShortName + '-' + $scope.formData.officeCode + '-' + $scope.formData.city1;

        });
        $scope.cancel = function () {
            $window.history.back();
        }
        hotkeys.bindTo($scope).add({
            combo: 'ctrl+enter',
            callback: function (formData) {
                NavigationService.modelSave("Customer", $scope.formData, function (data) {
                    if (data.value === true) {
                        // $state.go("customer" + '-list');
                        $window.history.back();
                        toastr.success("Customer" + $scope.formData.name + " edited successfully.", "Customer" + " Edited");
                    } else {
                        toastr.error("Customer" + data.error.message + " edition failed.", "Customer" + " editing error");
                    }
                });
            }
        });
        $scope.saveModel = function (formValid) {
            NavigationService.modelSave("Customer", $scope.formData, function (data) {
                if (data.value === true) {
                    // $state.go("customer" + '-list');
                    $window.history.back();
                    toastr.success("Customer" + $scope.formData.name + " edited successfully.", "Customer" + " Edited");
                } else {
                    toastr.error("Customer" + data.error.message + " edition failed.", "Customer" + " editing error");
                }
            });
        };

        $scope.custId = $stateParams.id;

        $scope.createOfficer = function (modelData) {
            modelData.customer = $stateParams.id;
            modelData.name = modelData.firstName + " " + modelData.lastName;
            NavigationService.saveOfficer(modelData, function (data) {
                if (data.value) {
                    if ($scope.buttonValue === "Save") {
                        $scope.formData.officers.push(data.data);
                    } else {
                        $scope.formData.officers[$scope.formIndex] = modelData;
                    }
                }
            });
        };
        $scope.openCreateOfficer = function () {
            $scope.buttonValue = "Save";
            $scope.modalData = {};
            $scope.addOfficer();
        };
        $scope.openEditOfficer = function (index) {
            $scope.formIndex = index;
            $scope.buttonValue = "Edit";
            $scope.modalData = $scope.formData.officers[index];
            $scope.modalData.birthDate = new Date($scope.formData.officers[index].birthDate);
            $scope.addOfficer();
        };
        $scope.deleteOfficer = function (index) {
            NavigationService.deleteModel("Officer", $scope.formData.officers[index]._id, function (data) {
                $scope.formData.officers.splice(index, 1);
            });
        };
    })

    .controller('MultipleSelectCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $state, $stateParams, $filter, toastr) {
        var i = 0;
        $scope.getValues = function (filter, insertFirst) {
            var dataSend = {
                keyword: $scope.search.modelData,
                filter: filter,
                page: 1
            };
            if (dataSend.keyword === null || dataSend.keyword === undefined) {
                dataSend.keyword = "";
            }
            NavigationService[$scope.api](dataSend, ++i, function (data) {
                if (data.value) {
                    $scope.list = data.data.results;
                    if ($scope.search.modelData) {
                        $scope.showCreate = true;
                        _.each($scope.list, function (n) {
                            // if (n.name) {
                            if (_.lowerCase(n.name) == _.lowerCase($scope.search.modelData)) {
                                $scope.showCreate = false;
                                return 0;
                            }
                            // }else{
                            //     if (_.lowerCase(n.officeCode) == _.lowerCase($scope.search.modelData)) {
                            //       $scope.showCreate = false;
                            //       return 0;
                            //   }
                            // }

                        });
                    } else {
                        $scope.showCreate = false;

                    }
                    if (insertFirst) {
                        if ($scope.list[0] && $scope.list[0]._id) {
                            // if ($scope.list[0].name) {
                            $scope.sendData($scope.list[0]._id, $scope.list[0].name);
                            // }else{
                            //   $scope.sendData($scope.list[0]._id, $scope.list[0].officeCode);
                            // }
                        } else {
                            console.log("Making this happen");
                            // $scope.sendData(null, null);
                        }
                    }
                } else {
                    console.log("Making this happen2");
                    $scope.sendData(null, null);
                }


            });
        };

        $scope.$watch('model', function (newVal, oldVal) {
            if (newVal && oldVal === undefined) {
                $scope.getValues({
                    _id: $scope.model
                }, true);
            }
        });


        $scope.$watch('filter', function (newVal, oldVal) {
            var filter = {};
            if ($scope.filter) {
                filter = JSON.parse($scope.filter);
            }
            var dataSend = {
                keyword: $scope.search.modelData,
                filter: filter,
                page: 1
            };

            NavigationService[$scope.api](dataSend, ++i, function (data) {
                if (data.value) {
                    $scope.list = data.data.results;
                    $scope.showCreate = false;

                }
            });
        });


        $scope.search = {
            modelData: ""
        };
        if ($scope.model) {
            $scope.getValues({
                _id: $scope.model
            }, true);
        } else {
            $scope.getValues();
        }





        $scope.listview = false;
        $scope.showCreate = false;
        $scope.typeselect = "";
        $scope.showList = function () {
            $scope.listview = true;
            $scope.searchNew(true);
        };
        $scope.closeList = function () {
            $scope.listview = false;
        };
        $scope.closeListSlow = function () {
            $timeout(function () {
                $scope.closeList();
            }, 500);
        };
        $scope.searchNew = function (dontFlush) {
            if (!dontFlush) {
                $scope.model = "";
            }
            var filter = {};
            if ($scope.filter) {
                filter = JSON.parse($scope.filter);
            }
            $scope.getValues(filter);
        };
        $scope.createNew = function (create) {
            var newCreate = $filter("capitalize")(create);
            var data = {
                name: newCreate
            };
            if ($scope.filter) {
                data = _.assign(data, JSON.parse($scope.filter));
            }
            console.log(data);
            NavigationService[$scope.create](data, function (data) {
                if (data.value) {
                    toastr.success($scope.name + " Created Successfully", "Creation Success");
                    $scope.model = data.data._id;
                    $scope.ngName = data.data.name;
                    // $scope.ngCity = data.data.city;
                } else {
                    toastr.error("Error while creating " + $scope.name, "Error");
                }
            });
            $scope.listview = false;
        };
        $scope.sendData = function (val, name) {
            $scope.search.modelData = name;
            // $scope.ngCity = city;
            $scope.ngName = name;
            $scope.model = val;
            $scope.listview = false;
        };
    })
    .controller('EditGradeCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $state, $stateParams) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("grade-detail");
        $scope.menutitle = NavigationService.makeactive("Grade");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
    })
    .controller('CreateGradeCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $state, $stateParams) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("grade-detail");
        $scope.menutitle = NavigationService.makeactive("Grade");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
    })
    .controller('GradeCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $state, $stateParams) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("grade-list");
        $scope.menutitle = NavigationService.makeactive("Grade List");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
    })
    .controller('EditSurveyCodeCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $state, $stateParams) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("surveyCode-detail");
        $scope.menutitle = NavigationService.makeactive("Survey Code");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
    })
    .controller('CreateSurveyCodeCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $state, $stateParams) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("surveyCode-detail");
        $scope.menutitle = NavigationService.makeactive("Survey Code");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
    })
    .controller('SurveyCodeCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $state, $stateParams) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("surveyCode-list");
        $scope.menutitle = NavigationService.makeactive("Survey Code List");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
    })
    .controller('TransferOfficeCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $state, $stateParams) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("transferOffice-detail");
        $scope.menutitle = NavigationService.makeactive("Transfer Office");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
    })
    .controller('CreateTransferOfficeCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $state, $stateParams) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("transferOffice-detail");
        $scope.menutitle = NavigationService.makeactive("Transfer Office");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
    })
    .controller('TransferOfficeCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $state, $stateParams) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("transferOffice-list");
        $scope.menutitle = NavigationService.makeactive("Transfer Office List");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
    })
    .controller('ActivityTypeCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("activityType-list");
        $scope.menutitle = NavigationService.makeactive("Activity Type List");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.currentPage = $stateParams.page;
        var i = 0;
        $scope.search = {
            keyword: ""
        };
        if ($stateParams.keyword) {
            $scope.search.keyword = $stateParams.keyword;
        }
        $scope.showAllCountries = function (keywordChange) {
            $scope.totalItems = undefined;
            if (keywordChange) {
                $scope.currentPage = 1;
            }
            NavigationService.searchTypeOfOffice({
                page: $scope.currentPage,
                keyword: $scope.search.keyword
            }, ++i, function (data, ini) {
                if (ini == i) {
                    $scope.allTypeOfOffices = data.data.results;
                    $scope.totalItems = data.data.total;
                    $scope.maxRow = data.data.options.count;
                }
            });
        };

        $scope.changePage = function (page) {
            var goTo = "typeOfOffice-list";
            if ($scope.search.keyword) {
                goTo = "typeOfOffice-list";
            }
            $state.go(goTo, {
                page: page,
                keyword: $scope.search.keyword
            });
        };
        $scope.showAllCountries();
        $scope.deleteTypeOfOffice = function (id) {
            globalfunction.confDel(function (value) {
                console.log(value);
                if (value) {
                    NavigationService.deleteTypeOfOffice(id, function (data) {
                        if (data.value) {
                            $scope.showAllCountries();
                            toastr.success("Office deleted successfully.", "Office deleted");
                        } else {
                            toastr.error("There was an error while deleting Office", "Office deleting error");
                        }
                    });
                }
            });
        };
    })
    .controller('CreateActivityTypeCtrl', function ($scope, hotkeys, $window, TemplateService, NavigationService, $timeout, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("activityType-detail");
        $scope.menutitle = NavigationService.makeactive("Activity Type");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "Create Activity Type"
        };
        $scope.formData = {};
        $scope.cancel = function () {
            $window.history.back();
        };
        hotkeys.bindTo($scope).add({
            combo: 'ctrl+enter',
            callback: function (formData) {
                NavigationService.typeofofficeSave($scope.formData, function (data) {
                    if (data.value === true) {
                        // $state.go('typeOfOffice-list');
                        $window.history.back();
                        toastr.success("Type Of Office " + $scope.formData.name + " created successfully.", "Type Of Office Created");
                    } else {
                        toastr.error("Type Of Office creation failed.", "Type Of Office creation error");
                    }
                });
            }
        });
        $scope.savetypeOfOffice = function (formData) {
            NavigationService.typeofofficeSave($scope.formData, function (data) {
                if (data.value === true) {
                    // $state.go('typeOfOffice-list');
                    $window.history.back();
                    toastr.success("Type Of Office " + $scope.formData.name + " created successfully.", "Type Of Office Created");
                } else {
                    toastr.error("Type Of Office creation failed.", "Type Of Office creation error");
                }
            });
        };

    })
    .controller('EditActivityTypeCtrl', function ($scope, hotkeys, $window, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("activityType-detail");
        $scope.menutitle = NavigationService.makeactive("Activity Type");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "Edit Activity Type"
        };

        NavigationService.getOneTypeOfOffice($stateParams.id, function (data) {
            $scope.formData = data.data;
        });
        $scope.cancel = function () {
            $window.history.back();
        };
        hotkeys.bindTo($scope).add({
            combo: 'ctrl+enter',
            callback: function (formData) {
                NavigationService.typeofofficeSave($scope.formData, function (data) {
                    if (data.value === true) {
                        $window.history.back();
                        toastr.success("Type Of Office " + $scope.formData.name + " created successfully.", "Type Of Office Created");
                    } else {
                        toastr.error("Type Of Office creation failed.", "Type Of Office creation error");
                    }
                });
            }
        });
        $scope.savetypeOfOffice = function (formValid) {
            NavigationService.typeofofficeSave($scope.formData, function (data) {
                if (data.value === true) {
                    $window.history.back();
                    toastr.success("Type Of Office " + $scope.formData.name + " created successfully.", "Type Of Office Created");
                } else {
                    toastr.error("Type Of Office creation failed.", "Type Of Office creation error");
                }
            });
            //  }
        };

    })
    .controller('ExpenseCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("expense-list");
        $scope.menutitle = NavigationService.makeactive("Expense List");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.currentPage = $stateParams.page;
        var i = 0;
        $scope.search = {
            keyword: ""
        };
        if ($stateParams.keyword) {
            $scope.search.keyword = $stateParams.keyword;
        }
        $scope.showAllCountries = function (keywordChange) {
            $scope.totalItems = undefined;
            if (keywordChange) {
                $scope.currentPage = 1;
            }
            NavigationService.searchTypeOfOffice({
                page: $scope.currentPage,
                keyword: $scope.search.keyword
            }, ++i, function (data, ini) {
                if (ini == i) {
                    $scope.allTypeOfOffices = data.data.results;
                    $scope.totalItems = data.data.total;
                    $scope.maxRow = data.data.options.count;
                }
            });
        };

        $scope.changePage = function (page) {
            var goTo = "typeOfOffice-list";
            if ($scope.search.keyword) {
                goTo = "typeOfOffice-list";
            }
            $state.go(goTo, {
                page: page,
                keyword: $scope.search.keyword
            });
        };
        $scope.showAllCountries();
        $scope.deleteTypeOfOffice = function (id) {
            globalfunction.confDel(function (value) {
                console.log(value);
                if (value) {
                    NavigationService.deleteTypeOfOffice(id, function (data) {
                        if (data.value) {
                            $scope.showAllCountries();
                            toastr.success("Office deleted successfully.", "Office deleted");
                        } else {
                            toastr.error("There was an error while deleting Office", "Office deleting error");
                        }
                    });
                }
            });
        };
    })
    .controller('CreateExpenseCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("expense-detail");
        $scope.menutitle = NavigationService.makeactive("Expense");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "Create Expense"
        };
        $scope.formData = {};
        $scope.savetypeOfOffice = function (formData) {

            NavigationService.typeofofficeSave($scope.formData, function (data) {
                if (data.value === true) {
                    // $state.go('typeOfOffice-list');
                    $window.history.back();
                    toastr.success("Type Of Office " + $scope.formData.name + " created successfully.", "Type Of Office Created");
                } else {
                    toastr.error("Type Of Office creation failed.", "Type Of Office creation error");
                }
            });
        };

    })
    .controller('EditExpenseCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("expense-detail");
        $scope.menutitle = NavigationService.makeactive("Expense");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "Edit Expense"
        };

        NavigationService.getOnetypeOfOffice($stateParams.id, function (data) {
            $scope.formData = data.data;
        });

        $scope.savetypeOfOffice = function (formValid) {

            //  if (formValid.$valid) {
            //  $scope.formComplete = true;
            NavigationService.typeofofficeSave($scope.formData, function (data) {
                if (data.value === true) {
                    // $state.go('typeOfOffice-list');
                    $window.history.back();
                    toastr.success("Type Of Office " + $scope.formData.name + " created successfully.", "Type Of Office Created");
                } else {
                    toastr.error("Type Of Office creation failed.", "Type Of Office creation error");
                }
            });
            //  }
        };

    })

    .controller('EditTemplateCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("template-detail");
        $scope.menutitle = NavigationService.makeactive("Edit Template");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "Edit Template"
        };
        $scope.formData = {};
        // $scope.formData.status = true;

        NavigationService.getOneModel("Template", $stateParams.id, function (data) {
            $scope.formData = data.data;
        });

        $scope.itemTypes = [{
            value: '',
            name: 'Select type of item'
        }, {
            value: 'Custom Input',
            name: 'Custom Input'
        }, {
            value: 'System Fields',
            name: 'System Fields'
        }, {
            value: 'Dropdown',
            name: 'Dropdown'
        }];

        $scope.inputTypes = [{
            value: '',
            name: 'Select type of input'
        }, {
            value: 'Text',
            name: 'Text'
        }, {
            value: 'Date',
            name: 'Date'
        }, {
            value: 'Textarea',
            name: 'Textarea'
        }];


        $scope.addHead = function () {
            $scope.formData.forms.push({
                head: $scope.formData.forms.length + 1,
                items: [{}]
            });
        };
        $scope.removeHead = function (index) {
            if ($scope.formData.forms.length > 1) {
                $scope.formData.forms.splice(index, 1);
            } else {
                $scope.formData.forms = [{
                    head: '',
                    items: [{}, {}]
                }];
            }
        };

        $scope.addItem = function (obj) {
            var index = $scope.formData.forms.indexOf(obj);
            $scope.formData.forms[index].items.push({});
        };

        $scope.removeItem = function (obj, indexItem) {
            var indexHead = $scope.formData.forms.indexOf(obj);
            if ($scope.formData.forms[indexHead].items.length > 1) {
                $scope.formData.forms[indexHead].items.splice(indexItem, 1);
            } else {
                $scope.formData.forms[indexHead].items = [{}];
            }
        };

        $scope.sortableOptions = {
            handle: ' .handleBar',
            axis: 'y',
            'ui-floating': true,
            start: function (e, ui) {
                $('#sortable-ul-selector-id').sortable("refreshPositions");
                $('#sortable-ul-selector-id').sortable("refresh");
            }
        };
        $scope.cancel = function () {
            $window.history.back();
        }
        $scope.saveModel = function (data) {
            $scope.saveModel = function (formData) {
                NavigationService.modelSave("Template", $scope.formData, function (data) {
                    if (data.value === true) {
                        // $state.go('template-list');
                        $window.history.back();
                        toastr.success("Template " + formData.name + " edited successfully.", "Template Edited");
                    } else {
                        toastr.error("Template Edition failed.", "Template edition error");
                    }
                });
            };
        };
    })

    .controller('CreateTemplateCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("template-detail");
        $scope.menutitle = NavigationService.makeactive("Create Template");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "Create Template"
        };

        $scope.itemTypes = [{
            value: '',
            name: 'Select type of item'
        }, {
            value: 'Custom Input',
            name: 'Custom Input'
        }, {
            value: 'System Fields',
            name: 'System Fields'
        }, {
            value: 'Dropdown',
            name: 'Dropdown'
        }];

        $scope.inputTypes = [{
            value: '',
            name: 'Select type of input'
        }, {
            value: 'Text',
            name: 'Text'
        }, {
            value: 'Date',
            name: 'Date'
        }, {
            value: 'Textarea',
            name: 'Textarea'
        }];

        $scope.formData = {};
        $scope.formData.status = true;

        $scope.formData.forms = [{
            head: '',
            items: [{}, {}]
        }];

        $scope.addHead = function () {
            $scope.formData.forms.push({
                head: $scope.formData.forms.length + 1,
                items: [{}]
            });
        };
        $scope.removeHead = function (index) {
            if ($scope.formData.forms.length > 1) {
                $scope.formData.forms.splice(index, 1);
            } else {
                $scope.formData.forms = [{
                    head: '',
                    items: [{}, {}]
                }];
            }
        };

        $scope.addItem = function (obj) {
            var index = $scope.formData.forms.indexOf(obj);
            $scope.formData.forms[index].items.push({});
        };

        $scope.removeItem = function (obj, indexItem) {
            var indexHead = $scope.formData.forms.indexOf(obj);
            if ($scope.formData.forms[indexHead].items.length > 1) {
                $scope.formData.forms[indexHead].items.splice(indexItem, 1);
            } else {
                $scope.formData.forms[indexHead].items = [{}];
            }
        };

        $scope.sortableOptions = {
            handle: ' .handleBar',
            axis: 'y',
            'ui-floating': true,
            start: function (e, ui) {
                $('#sortable-ul-selector-id').sortable("refreshPositions");
                $('#sortable-ul-selector-id').sortable("refresh");
            }
        };
        $scope.cancel = function () {
            $window.history.back();
        }
        $scope.saveModel = function (data) {
            $scope.saveModel = function (formData) {
                NavigationService.modelSave("Template", $scope.formData, function (data) {
                    if (data.value === true) {
                        // $state.go('template-list');
                        $window.history.back();
                        toastr.success("Template " + formData.name + " created successfully.", "Template Created");
                    } else {
                        toastr.error("Template creation failed.", "Template creation error");
                    }
                });
            };
        };


    })

    .controller('TemplateCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("template-list");
        $scope.menutitle = NavigationService.makeactive("Templates");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "Template List"
        };
    })

    .controller('EditTemplateLORCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("templateLor-detail");
        $scope.menutitle = NavigationService.makeactive("Edit LOR Template");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "Edit LOR Template"
        };

        $scope.formData = {};
        NavigationService.getOneModel("TemplateLor", $stateParams.id, function (data) {
            $scope.formData = data.data;
        });
        $scope.itemTypes = [{
            value: '',
            name: 'Select Status'
        }, {
            value: 'Copy',
            name: 'Copy'
        }, {
            value: 'Original',
            name: 'Original'
        }];

        $scope.formData.forms = [{
            head: '',
            items: [{}, {}]
        }];

        $scope.required = true;

        $scope.addHead = function () {
            $scope.formData.forms.push({
                head: $scope.formData.forms.length + 1,
                items: [{}]
            });
        };
        $scope.removeHead = function (index) {
            if ($scope.formData.forms.length > 1) {
                $scope.formData.forms.splice(index, 1);
            } else {
                $scope.formData.forms = [{
                    head: '',
                    items: [{}, {}]
                }];
            }
        };

        $scope.addItem = function (obj) {
            var index = $scope.formData.forms.indexOf(obj);
            $scope.formData.forms[index].items.push({});
        };

        $scope.removeItem = function (obj, indexItem) {
            var indexHead = $scope.formData.forms.indexOf(obj);
            if ($scope.formData.forms[indexHead].items.length > 1) {
                $scope.formData.forms[indexHead].items.splice(indexItem, 1);
            } else {
                $scope.formData.forms[indexHead].items = [{}];
            }
        };

        $scope.sortableOptions = {
            handle: ' .handleBar',
            axis: 'y',
            'ui-floating': true,
            start: function (e, ui) {
                $('#sortable-ul-selector-id').sortable("refreshPositions");
                $('#sortable-ul-selector-id').sortable("refresh");
            }
        };
        $scope.cancel = function () {
            $window.history.back();
        }
        $scope.saveModel = function (data) {
            $scope.saveModel = function (formData) {
                NavigationService.modelSave("TemplateLor", $scope.formData, function (data) {
                    if (data.value === true) {
                        // $state.go('templateLor-list');
                        $window.history.back();
                        toastr.success("LOR Template " + formData.name + " edited successfully.", "LOR Template Edited");
                    } else {
                        toastr.error("LOR Template edition failed.", "LOr Template edition error");
                    }
                });
            };
        };
    })

    .controller('CreateTemplateLORCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("templateLor-detail");
        $scope.menutitle = NavigationService.makeactive("Create LOR Template");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "Create LOR Template"
        };

        $scope.itemTypes = [{
            value: '',
            name: 'Select Status'
        }, {
            value: 'Copy',
            name: 'Copy'
        }, {
            value: 'Original',
            name: 'Original'
        }];

        $scope.formData = {};
        $scope.formData.status = true;
        $scope.formData.forms = [{
            head: '',
            items: [{}, {}]
        }];

        $scope.required = true;

        $scope.addHead = function () {
            $scope.formData.forms.push({
                head: $scope.formData.forms.length + 1,
                items: [{}]
            });
        };
        $scope.removeHead = function (index) {
            if ($scope.formData.forms.length > 1) {
                $scope.formData.forms.splice(index, 1);
            } else {
                $scope.formData.forms = [{
                    head: '',
                    items: [{}, {}]
                }];
            }
        };

        $scope.addItem = function (obj) {
            var index = $scope.formData.forms.indexOf(obj);
            $scope.formData.forms[index].items.push({});
        };

        $scope.removeItem = function (obj, indexItem) {
            var indexHead = $scope.formData.forms.indexOf(obj);
            if ($scope.formData.forms[indexHead].items.length > 1) {
                $scope.formData.forms[indexHead].items.splice(indexItem, 1);
            } else {
                $scope.formData.forms[indexHead].items = [{}];
            }
        };

        $scope.sortableOptions = {
            handle: ' .handleBar',
            axis: 'y',
            'ui-floating': true,
            start: function (e, ui) {
                $('#sortable-ul-selector-id').sortable("refreshPositions");
                $('#sortable-ul-selector-id').sortable("refresh");
            }
        };
        $scope.cancel = function () {
            $window.history.back();
        }
        $scope.saveModel = function (data) {
            $scope.saveModel = function (formData) {
                NavigationService.modelSave("TemplateLor", $scope.formData, function (data) {
                    if (data.value === true) {
                        // $state.go('templateLor-list');
                        $window.history.back();
                        toastr.success("LOR Template " + formData.name + " created successfully.", "LOR Template Created");
                    } else {
                        toastr.error("LOR Template creation failed.", "LOr Template creation error");
                    }
                });
            };
        };

    })

    .controller('EditTemplateInvoiceCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("templateInvoice-detail");
        $scope.menutitle = NavigationService.makeactive("Edit Invoice Template");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "Edit Invoice Template"
        };

        $scope.formData = {};
        NavigationService.getOneModel("TemplateInvoice", $stateParams.id, function (data) {
            $scope.formData = data.data;
        });

        $scope.formData.invoiceExpenditure = [{
            invoiceExpenditure: '',
        }];

        $scope.required = true;

        $scope.addHead = function () {
            $scope.formData.invoiceExpenditure.push({
                invoiceExpenditure: ''
            });
        };
        $scope.removeHead = function (index) {
            if ($scope.formData.invoiceExpenditure.length > 1) {
                $scope.formData.invoiceExpenditure.splice(index, 1);
            } else {
                $scope.formData.invoiceExpenditure = [{
                    invoiceExpenditure: ''
                }];
            }
        };
        $scope.sortableOptions = {
            handle: ' .handleBar',
            axis: 'y',
            'ui-floating': true,
            start: function (e, ui) {
                $('#sortable-ul-selector-id').sortable("refreshPositions");
                $('#sortable-ul-selector-id').sortable("refresh");
            }
        };
        $scope.cancel = function () {
            $window.history.back();
        }
        $scope.saveModel = function (data) {
            $scope.saveModel = function (formData) {
                NavigationService.modelSave("TemplateInvoice", $scope.formData, function (data) {
                    if (data.value === true) {
                        $window.history.back();
                        toastr.success("Invoice Template " + formData.name + " edited successfully.", "Invoice Template Edited");
                    } else {
                        toastr.error("Invoice Template edition failed.", "Invoice Template edition error");
                    }
                });
            };
        };
    })

    .controller('CreateTemplateInvoiceCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("templateInvoice-detail");
        $scope.menutitle = NavigationService.makeactive("Create Invoice Template");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "Create Invoice Template"
        };
        $scope.formData = {};
        $scope.formData.status = true;
        $scope.formData.invoiceExpenditure = [{}];

        $scope.required = true;

        $scope.addHead = function () {
            $scope.formData.invoiceExpenditure.push({});
        };
        $scope.removeHead = function (index) {
            if ($scope.formData.invoiceExpenditure.length > 1) {
                $scope.formData.invoiceExpenditure.splice(index, 1);
            } else {
                $scope.formData.invoiceExpenditure = [{}];
            }
        };
        $scope.sortableOptions = {
            handle: ' .handleBar',
            axis: 'y',
            'ui-floating': true,
            start: function (e, ui) {
                $('#sortable-ul-selector-id').sortable("refreshPositions");
                $('#sortable-ul-selector-id').sortable("refresh");
            }
        };
        $scope.cancel = function () {
            $window.history.back();
        }
        $scope.saveModel = function (data) {
            $scope.saveModel = function (formData) {
                NavigationService.modelSave("templateInvoice", $scope.formData, function (data) {
                    if (data.value === true) {
                        $window.history.back();
                        toastr.success("Invoice Template " + formData.name + " created successfully.", "Invoice Template Created");
                    } else {
                        toastr.error("Invoice Template creation failed.", "Invoice Template creation error");
                    }
                });
            };
        };

    })

    .controller('CreateInvoiceCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("invoice-detail");
        $scope.menutitle = NavigationService.makeactive("Create Invoice");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.assignment = {};
        NavigationService.getOneModel("Assignment", $stateParams.assignmentId, function (data) {
            $scope.assignment = data.data;
        });

        $scope.formData = {};
        $scope.formData.invoiceList = [];
        $scope.addHead = function () {
            $scope.formData.invoiceList.push({});
        };
        $scope.removeHead = function (index) {
            if ($scope.formData.invoiceList.length > 1) {
                $scope.formData.invoiceList.splice(index, 1);
            } else {
                $scope.formData.invoiceList = [{}];
            }
        };
        $scope.formData.tax = [];
        $scope.formData.status = true;
        $scope.required = true;
        $scope.formData.subTotal = 0;
        $scope.showForm = false;

        $scope.message = {};
        $scope.message.attachment = [];
        $scope.timeline = {};
        $scope.formData.grandTotal = 0;
        $scope.cancel = function () {
            $window.history.back();
        }
        $scope.sendMessage = function (fileName) {
            console.log("In Send MSG", fileName);
            $scope.message.type = "File";
            $scope.message.title = "Updated Invoice";
            $scope.message.attachment.push(fileName);
            $scope.timeline.chat.push($scope.message);
            NavigationService.saveChat($scope.timeline, function (data) {
                console.log("FFFFF", data);
            });
        };

        NavigationService.getLoginEmployee($.jStorage.get("profile").email, function (data) {
            $scope.message.employee = data.data._id;
            console.log("In Employee", $scope.message.employee);
        });

        NavigationService.getTimeline($stateParams.assignmentId, function (data) {
            $scope.timeline = data.data;
            console.log("In Employee", $scope.timeline);
        });

        NavigationService.getTax(function (data) {
            $scope.formData.tax = data.data.results;
            console.log("Tax", $scope.formData.tax);
        });
       $scope.getdescriptions = function () {
            NavigationService.searchInvoiceExpenditure1({}, function (data) {
                $scope.descriptions = data.data.results;
                console.log("Tax", $scope.descriptions);
            });
        }
        $scope.getAll = function (invoice, $index) {
            console.log("Invoice", invoice);
            $scope.formData.invoiceList[$index].name = invoice.name;
            $scope.formData.invoiceList[$index].description = invoice.description;
            $scope.formData.invoiceList[$index].unit = invoice.unit;
            $scope.formData.invoiceList[$index].rate = invoice.rate;
        }
        $scope.change = function (form, $index) {
            console.log("ABC", form);
            // $scope.formData.invoiceList[$index].name=form.name;
        }
        $scope.getTemplateDetails = function (data) {
            NavigationService.getTemplate("TemplateInvoice", data, function (data) {
                if (data.value === true) {
                    $scope.showForm = true;
                    console.log("Data Data", data.data);
                    $scope.formData.invoiceList = data.data;
                    console.log("$scope.formData.invoiceList",$scope.formData.invoiceList);                    
                } else {
                    toastr.error("Template Access failed.");
                }
            });
            console.log("In getTemplateDetails");
        }
        $scope.calAmt = function (a, b, index) {
            $scope.formData.subTotal = 0;
            $scope.formData.grandTotal = 0;
            $scope.formData.invoiceList[index].amount = a * b;
            _.each($scope.formData.invoiceList, function (n) {
                if (!isNaN(n.amount)) {
                    $scope.formData.subTotal = $scope.formData.subTotal + n.amount;
                }
            })
            $scope.formData.grandTotal = $scope.formData.subTotal;
            _.each($scope.formData.tax, function (n) {
                n.amount = n.percent * $scope.formData.subTotal / 100;
                $scope.formData.grandTotal = n.amount + $scope.formData.grandTotal;
            })
            var round = $scope.formData.grandTotal - Math.floor($scope.formData.grandTotal);
            $scope.formData.grandTotal = $scope.formData.grandTotal - round;
            $scope.formData.roundOff = round.toFixed(2);
        }
        $scope.saveModel = function (data) {
            console.log("Data of Pdf");
            $scope.formData.createdBy = $scope.message.employee;
            $scope.formData.assignment = $stateParams.assignmentId;
            NavigationService.modelSave("Invoice", $scope.formData, function (data) {
                if (data.value === true) {
                    console.log("Data of Pdf");
                    var invoice = {
                        _id: data.data._id
                    };
                    $scope.assignment.invoice.push(data.data._id);
                    $scope.assignment.timelineStatus = "BBND";
                    NavigationService.modelSave("Assignment", $scope.assignment, function (data) {
                        if (data.value === true) {
                            console.log("Data of Pdf",invoice);
                            NavigationService.generateInvoicePdf(invoice, function (data) {
                                if (data.value === true) {
                                    console.log("Data of Pdf", data.data.name);
                                    $scope.sendMessage(data.data.name);
                                    $window.history.back();
                                    toastr.success("Invoice Template " + formData.name + " created successfully.", "Invoice Template Created");
                                } else {
                                    toastr.error("Invoice Template creation failed.", "Invoice Template creation error");
                                }
                            });
                        } else {
                            toastr.error("Invoice Template creation failed.", "Invoice Template creation error");
                        }
                    });
                } else {
                    toastr.error("Invoice Template creation failed.", "Invoice Template creation error");
                }
            });
        };

    })


    .controller('EditInvoiceCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("invoice-detail");
        $scope.menutitle = NavigationService.makeactive("Edit Invoice");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.formData = {};
        $scope.formData.invoiceList = [];
        $scope.formData.tax = [];
        NavigationService.getOneModel("Invoice", $stateParams.invoiceId, function (data) {
            $scope.formData = data.data;
            console.log("ABCDEF", $scope.formData);
        });
        $scope.formData.status = true;
        $scope.required = true;
        $scope.showForm = true;
        $scope.message = {};
        $scope.message.attachment = [];
        $scope.timeline = {};
        $scope.descriptions = [];
        $scope.cancel = function () {
            $window.history.back();
        }
        $scope.addHead = function () {
            $scope.formData.invoiceList.push({});
        };
        $scope.getdescriptions = function () {
            NavigationService.searchInvoiceExpenditure1({}, function (data) {
                $scope.descriptions = data.data.results;
                console.log("Tax", $scope.descriptions);
            });
        }
        $scope.getAll = function (invoice, $index) {
            console.log("Invoice", invoice);
            $scope.formData.invoiceList[$index].name = invoice.name;
            $scope.formData.invoiceList[$index].description = invoice.description;
            $scope.formData.invoiceList[$index].unit = invoice.unit;
            $scope.formData.invoiceList[$index].rate = invoice.rate;
        }
        $scope.removeHead = function (index) {
            if ($scope.formData.invoiceList.length > 1) {
                $scope.formData.invoiceList.splice(index, 1);
            } else {
                $scope.formData.invoiceList = [{}];
            }
        };
        $scope.sendMessage = function (fileName) {
            console.log("In Send MSG", fileName);
            $scope.message.type = "File";
            $scope.message.title = "Updated Invoice";
            $scope.message.attachment.push(fileName);
            $scope.timeline.chat.push($scope.message);
            NavigationService.saveChat($scope.timeline, function (data) {
                console.log("FFFFF", data);
            });
        };
        NavigationService.getLoginEmployee($.jStorage.get("profile").email, function (data) {
            $scope.message.employee = data.data._id;
            console.log("In Employee", $scope.message.employee);
        });
        NavigationService.getTimeline($stateParams.assignmentId, function (data) {
            $scope.timeline = data.data;
            console.log("In Employee", $scope.timeline);
        });
        $scope.calAmt = function (a, b, index) {
            $scope.formData.subTotal = 0;
            $scope.formData.grandTotal = 0;
            $scope.formData.invoiceList[index].amount = a * b;
            _.each($scope.formData.invoiceList, function (n) {
                if (!isNaN(n.amount)) {
                    $scope.formData.subTotal = $scope.formData.subTotal + n.amount;
                }
            })
            $scope.formData.grandTotal = $scope.formData.subTotal;
            _.each($scope.formData.tax, function (n) {
                n.amount = n.percent * $scope.formData.subTotal / 100;
                $scope.formData.grandTotal = n.amount + $scope.formData.grandTotal;
            })
            var round = $scope.formData.grandTotal - Math.floor($scope.formData.grandTotal);
            $scope.formData.grandTotal = $scope.formData.grandTotal - round;
            $scope.formData.roundOff = round.toFixed(2);
        }
        $scope.saveModel = function (data) {
                NavigationService.modelSave("Invoice", $scope.formData, function (data) {
                    if (data.value === true) {
                        $scope.formData.assignment = $stateParams.assignmentId;
                        console.log($scope.formData.assignment, $scope.formData, "$scope.formData.assignment");
                        NavigationService.generateInvoicePdf($scope.formData, function (data) {
                            if (data.value === true) {
                                console.log("Data of Pdf", data.data.name);
                                $scope.sendMessage(data.data.name);
                                $window.history.back();
                                toastr.success("Invoice Template " + formData.name + " created successfully.", "Invoice Template Created");
                            } else {
                                toastr.error("Invoice Template creation failed.", "Invoice Template creation error");
                            }
                        });
                    } else {
                        toastr.error("Invoice Template creation failed.", "Invoice Template creation error");
                    }
                });
            };

    })

    .controller('TemplateLORCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("template-lor-list");
        $scope.menutitle = NavigationService.makeactive("LOR Templates");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "LOR Template List"
        };
    })

    .controller('TemplateInvoiceCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("template-invoice");
        $scope.menutitle = NavigationService.makeactive("Template Invoice");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "Invoice Template"
        };
        $scope.assignment = {};
        $scope.assignment.templateInvoice = [];
        $scope.templateArray = [];
        NavigationService.getOneModel("Assignment", $stateParams.assignment, function (data) {
            $scope.assignment = data;
            console.log("AAAAAA", $scope.assignment);
        });
        NavigationService.getExpenditure($stateParams.assignmentTemplate, function (data) {
            $scope.templateArray = data.data[0];
            console.log("AAAAAA", $scope.templateArray);
        });
    })

    .controller('TemplateViewCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr, AssignmentTemplate) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("template-view");
        $scope.menutitle = NavigationService.makeactive("Form Name");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "Form Name"
        };
        $scope.Saved = false;
        $scope.forms = [{
            head: 'Snapshot',
            items: [{
                name: 'Insurer',
                type: 'text'
            }, {
                name: 'Date',
                type: 'date'
            }, {
                name: 'Address',
                type: 'textarea'
            }, {
                name: 'City',
                type: 'system'
            }, {
                name: 'Country',
                type: 'dropdown',
                dropdownValues: ['Mumbai', 'Bihar', 'Orissa']
            }]
        }];
        $scope.assignment = {};
        $scope.assignment.templateIla = [];
        $scope.assignment.templateIsr = [];
        $scope.assignment.templateLor = [];
        $scope.assignment.templateJir = [];
        $scope.message = {};
        $scope.timeline = {};
        $scope.timeline.attachment = [];
        $scope.message.title = "Sent a new message";
        $scope.tempt = $stateParams.type;
        NavigationService.getLoginEmployee($.jStorage.get("profile").email, function (data) {
            $scope.message.employee = data.data;
            console.log("In Employee", $scope.employee, data);
        });
        if ($stateParams.assignmentTemplate === "") {
            NavigationService.getOneModel($stateParams.type, $stateParams.template, function (data) {
                $scope.forms = data.data;
            });
        } else {
            var a = {
                _id: $stateParams.assignmentTemplate,
                type: _.camelCase($stateParams.type)
            };
            NavigationService.getAssignmentTemplate(a, function (data) {
                _.each(data.data.forms, function (n) {
                    console.log("In Forms");
                    _.each(n.items, function (m) {
                        console.log("In Items", m);
                        if (m.value == "Date") {
                            m.field = moment(m.field, 'ddd, MMM Do, YYYY').toDate();
                        }
                        if (m.type == "Dropdown") {
                            m.dropdownValues = [];
                            m.dropdownValues = _.split(m.value, ",");
                            console.log("DropdownValues", m.dropdownValues);
                        }
                    });
                });
                console.log(data);
                $scope.forms = data.data;
                console.log("CCCCCCCCCCCCCCCCCCC", $scope.forms);
                $scope.assignment = data.data.assignment;
                $scope.getTimeline();
            });
        }


        $scope.sendMessage = function (type) {
            console.log("DEF");
            $scope.message.type = type;
            var a = {
                type: $stateParams.type,
                url: {
                    assignmentTemplate: $stateParams.assignmentTemplate,
                    type: $stateParams.type
                }
            };
            $scope.message.attachment = [];
            $scope.message.attachment.push(a);
            $scope.timeline.chat.push($scope.message);

            NavigationService.saveChat($scope.timeline, function (data) {});
        };

        $scope.getTimeline = function () {
            NavigationService.getOneModel("Timeline", $scope.assignment.timeline[0], function (data) {
                $scope.timeline = data.data;

            });
        };

        if ($stateParams.assignment !== "") {
            NavigationService.getOneModel("Assignment", $stateParams.assignment, function (data) {
                $scope.assignment = data.data;
                $scope.getTimeline();
            });
        }

        $scope.cancel = function () {
            $window.history.back();
        }
        $scope.sendMessage2 = function (type) {
            $scope.timeline.chat.push(type);
            NavigationService.saveChat($scope.timeline, function (data) {
                console.log("FFFFF", data);
                $scope.getTimeline();
            });
        };

        $scope.saveModel = function (templateObj) {


            console.log("Save Data", templateObj);
            //  Config.generatePdf("pdf/abs-synopsis", templateObj.forms, res.callback);
            if ($stateParams.assignment !== "") {
                delete templateObj._id;
                $scope.assignment[_.camelCase($stateParams.type)].push(templateObj);

                NavigationService.modelSave("Assignment", $scope.assignment, function (data) {
                    if (data.value) {
                        $scope.message.title = "Created New " + $stateParams.type;
                        $scope.sendMessage("Template");
                        toastr.success("Created " + $stateParams.type + " for " + $scope.assignment.name, $stateParams.type);
                        $state.go('timeline', {
                            id: $scope.assignment._id
                        });
                    } else {
                        toastr.error("Error occured in Creating " + $stateParams.type + " for " + $scope.assignment.name, $stateParams.type);
                    }
                });
            } else {
                $scope.Saved = true;
                console.log("Data To Saveeee", $scope.forms);
                NavigationService.editAssignmentTemplate($scope.forms, function (data) {

                    if (data.value) {
                        var a = {};
                        $scope.message.title = "Updated " + $stateParams.type;
                        // $scope.sendMessage("Template");
                        a.type = "File",
                            a.employee = $scope.message.employee,
                            a.title = $scope.message.title,
                            a.attachment = data.data.name;
                        $scope.sendMessage2(_.cloneDeep(a));
                        console.log("YZ", a);
                        toastr.success("Updated " + $stateParams.type + " for " + $scope.assignment.name, $stateParams.type);
                        $state.go('timeline', {
                            id: $scope.assignment._id
                        });
                    } else {
                        toastr.error("Error occured in Updating " + $stateParams.type + " for " + $scope.assignment.name, $stateParams.type);
                    }
                });
            }
        };
    })

    .controller('TimelineCtrl', function ($scope, $window, TemplateService, NavigationService, AssignmentTemplate, $timeout, $uibModal, $stateParams, toastr, $filter, $state) {
        $scope.template = TemplateService.changecontent("timeline");
        $scope.menutitle = NavigationService.makeactive("Timeline");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.email = {
            message: ""
        };
        $scope.surveyDate;
        $scope.getAllSurveyors = [];
        $scope.finalSurveyors = [];
        $scope.assignment = {};
        $scope.checker = 1;
        $scope.emailtos = [{
            name: 'Mahesh',
            email: 'mahesh@wohlig.com'
        }, {
            name: 'Jagruti',
            email: 'jagruti@wohlig.com'
        }, {
            name: 'Tushar',
            email: 'tushar@wohlig.com'
        }, {
            name: 'Chintan',
            email: 'chintan@wohlig.com'
        }, {
            name: 'Harsh',
            email: 'harsh@wohlig.com'
        }, {
            name: 'Raj',
            email: 'raj@wohlig.com'
        }];

        $scope.saveILA = function (assignment) {

            if (!assignment.ilaStatus && assignment.lorStatus) {
                assignment.timelineStatus = "LOR Pending";
            } else if (!assignment.ilaStatus && !assignment.lorStatus) {
                assignment.timelineStatus = "Dox Pending";
            } else {
                assignment.timelineStatus = "ILA Pending";
            }
            console.log("In ILA", assignment);
            NavigationService.assignmentSave(assignment, function (data) {
                $state.go('timeline', {
                    id: $scope.assignment._id
                });
                console.log("Saved Assignment", data);

            });
        }

        // 1st
        $scope.saveSurveyDate = function (date) {
            var formdata = {};
            $scope.surveyDate = date;
            formdata.surveyDate = date;
            formdata._id = $stateParams.id;
            NavigationService.assignmentSave(formdata, function (data) {
                console.log("Survey Date Saved", data);
                $scope.getAssignmentData();
            });
        };

        // 2nd
        $scope.getAssignmentData = function () {
            console.log("surveyDate", $scope.surveyDate);
            NavigationService.getOneModel("Assignment", $stateParams.id, function (data) {
                $scope.assignment = data.data;
                console.log("$scope.assignment", $scope.assignment);
                NavigationService.getNearestOffice(data.data, function (data) {
                    $scope.getAllSurveyors = data.data;
                    console.log("Success On GetNearest Survayer", $scope.getAllSurveyors, data);
                    var arr = [];
                    _.each(data.data, function (n) {
                        var m = {};
                        m.ForDate = moment(new Date(n.date)).add(5, "hours").add(30, "minutes").format("DD/MM/YYYY"),
                            m.Email = n.officeEmail,
                            m._id = n._id,
                            arr.push(m);
                    });
                    console.log("array to pass", arr);
                    //    Consider Api Reply
                    NavigationService.thirdPartyApi(arr, function (data) {
                        console.log("Data OUTPUT", data);
                    });
                    $scope.displayFinalSurveyor();
                });

            });
        };

        // 3rd
        $scope.displayFinalSurveyor = function () {
            console.log("surveyDate", $scope.surveyDate);
            var arrayOfId = _.cloneDeep($scope.getAllSurveyors);
            console.log("arrayOfId", arrayOfId);
            var arrayId = [];
            _.each(arrayOfId, function (n) {
                delete n.date,
                    delete n.officeEmail,
                    arrayId.push(n._id);
            });
            console.log("arrayOfId", arrayId);
            NavigationService.getNearerSurveyor2({
                ids: arrayId
            }, function (data) {
                var final = data.data;
                console.log("Final Data", data, final)
                $scope.finalSurveyors = final;
            });
        };

        $scope.updateEmployeeAssignment = function (empId) {
            var emp = {};
            emp.assignment = {
                assignment: $stateParams.id
            };
            emp._id = empId;
            console.log("Employee", emp);
            NavigationService.saveEmployeeAssignment(emp, function (data) {
                console.log("Success On Save EmployeeAssignment", data);
            });
        };
        $scope.updateAssignmentEmployee = function (empId) {
            var assignment = {};
            assignment._id = $stateParams.id,
                assignment.survey = {
                    employee: empId
                }

            console.log("Assignment Survey", assignment);
            NavigationService.updateSurveyor(assignment, function (data) {
                console.log("Success Assignment Survey", data);
            });

        };
        $scope.surveyorAssigned = false;
        $scope.afterSurveyAssign = function (employee) {
            console.log("BEFORE", $scope.message.employee, $scope.message.title);
            $scope.message.employee = employee;
            $scope.message.title = "Assigned To";
            console.log("AFTER", $scope.message.employee, $scope.message.title);

            $scope.surveyorAssigned = true;
            $scope.modalInstance.close();
            $timeout(function () {
                $scope.sendMessage("Normal");
                $state.reload();
            }, 1000);
        };

        $scope.tinymceModel = 'Initial content';
        $scope.tinymceOptions = {
            plugins: 'link image code',
            toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
        };
        $scope.repeat = _.times(20, Number);
        $scope.assignSurveyor = function () {
            $scope.modalInstance = $uibModal.open({
                scope: $scope,
                templateUrl: '/frontend/views/modal/modal-assign-surveyor.html',
                size: 'lg'
            });
        };
        $scope.markActivity = function () {
            var modalInstance = $uibModal.open({
                scope: $scope,
                templateUrl: '/frontend/views/modal/mark-activity.html',
                size: 'lg'
            });
        };
        $scope.newAssessment = function () {
            var modalInstance = $uibModal.open({
                scope: $scope,
                templateUrl: '/frontend/views/modal/new-assessment.html',
                size: 'md'
            });
        };
        $scope.viewStaff = function () {
            var modalInstance = $uibModal.open({
                scope: $scope,
                templateUrl: '/frontend/views/modal/staff-rating.html',
                size: 'lg'
            });
        };
        $scope.viewSurveyor = function () {
            var modalInstance = $uibModal.open({
                scope: $scope,
                templateUrl: '/frontend/views/modal/surveyor-rating.html',
                size: 'lg'
            });
        };
        $scope.viewClient = function () {
            var modalInstance = $uibModal.open({
                scope: $scope,
                templateUrl: '/frontend/views/modal/client-rating.html',
                size: 'lg'
            });
        };
        $scope.viewPhotos = function () {
            var modalInstance = $uibModal.open({
                scope: $scope,
                templateUrl: '/frontend/views/modal/new-photos.html',
                size: 'md'
            });
        };
        $scope.viewILA = function () {
            var modalInstance = $uibModal.open({
                scope: $scope,
                templateUrl: '/frontend/views/modal/new-ila.html',
                size: 'md'
            });
        };
        $scope.viewFSR = function () {
            var modalInstance = $uibModal.open({
                scope: $scope,
                templateUrl: '/frontend/views/modal/new-fsr.html',
                size: 'md'
            });
        };
        $scope.viewFiles = function () {
            var modalInstance = $uibModal.open({
                scope: $scope,
                templateUrl: '/frontend/views/modal/other-file.html',
                size: 'md'
            });
        };
        $scope.viewImages = function () {
            var modalInstance = $uibModal.open({
                scope: $scope,
                templateUrl: '/frontend/views/modal/upload-image.html',
                size: 'md'
            });
        };
        $scope.viewDocs = function () {
            var modalInstance = $uibModal.open({
                scope: $scope,
                templateUrl: '/frontend/views/modal/upload-document.html',
                size: 'md'
            });
        };
        $scope.viewISR = function () {
            var modalInstance = $uibModal.open({
                scope: $scope,
                templateUrl: '/frontend/views/modal/new-isr.html',
                size: 'md'
            });
        };
        $scope.viewLOR = function () {
            var modalInstance = $uibModal.open({
                scope: $scope,
                templateUrl: '/frontend/views/modal/new-lor.html',
                size: 'md'
            });
        };

        $scope.allAssessment = function (check) {
            $scope.showCreate = check;
            var modalInstance = $uibModal.open({
                scope: $scope,
                templateUrl: '/frontend/views/modal/assessment.html',
                size: 'md'
            });
        };

        $scope.newEmail = function () {
            var modalInstance = $uibModal.open({
                scope: $scope,
                templateUrl: '/frontend/views/modal/modal-email.html',
                size: 'lg'
            });
        };
        $scope.newInvoice = function () {
            var modalInstance = $uibModal.open({
                scope: $scope,
                templateUrl: '/frontend/views/modal/invoice.html',
                size: 'md'
            });
        };

        $scope.newMessage = function () {
            var modalInstance = $uibModal.open({
                scope: $scope,
                templateUrl: '/frontend/views/modal/modal-message.html',
                size: 'lg'
            });
        };
        $scope.viewJIR = function () {
            var modalInstance = $uibModal.open({
                scope: $scope,
                templateUrl: '/frontend/views/modal/new-jir.html',
                size: 'md'
            });
        };
        // $scope.viewJIR = function () {
        //     var modalInstance = $uibModal.open({
        //         scope: $scope,
        //         templateUrl: '/frontend/views/modal/modal-files.html',
        //         size: 'md'
        //     });
        // };
        var modalInstance = function () {};
        $scope.allTemplate = "";
        $scope.saveAssignmentTemplate = function (name, temp) {
            console.log(temp);
            NavigationService.modelSave('assignment', temp, function (data) {
                if (data.value === true) {
                    $scope.message.title = name + " Deleted.";
                    $scope.sendMessage("Normal");
                    toastr.success($scope.assignment.name + " Updated", "Assignment " + $scope.assignment.name);
                } else {
                    toastr.error("Error in updating " + $scope.assignment.name + ".", "Assignment " + $scope.assignment.name);
                }
            });
        };
        $scope.deleteTemplate = function (type, index) {
            $scope.assignment[type].splice(index, 1);
            var newAssignment = {
                "_id": $scope.assignment._id
            };
            newAssignment[type] = $scope.assignment[type];
            $scope.saveAssignmentTemplate(type, newAssignment);
        };
        $scope.createTemplate = function (tmp) {
            console.log("In createTemplate", tmp);
            delete tmp._id;
            if ($scope.api === "TemplateInvoice") {
                var newObj = {};

                $scope.assignment[_.camelCase($scope.api)].push(tmp);
            } else {
                $scope.assignment[_.camelCase($scope.api)].push(tmp);
            }

            NavigationService.modelSave("Assignment", $scope.assignment, function (data) {
                if (data.value) {
                    toastr.success("Created " + $stateParams.type + " for " + $scope.assignment.name, $stateParams.type);
                    $scope.assignmentRefresh();
                } else {
                    toastr.error("Error occured in Creating " + $stateParams.type + " for " + $scope.assignment.name, $stateParams.type);
                }
            });
        }

        $scope.viewTemplates = function (temp, getApi, data) {
            $scope.allTemplate = temp;
            $scope.api = getApi;
            console.log("$scope.api", $scope.api);
            if (data === "") {
                console.log("In If");
                NavigationService.searchModel(getApi, {
                    page: "1",
                    keyword: ""
                }, "", function (data) {
                    $scope.templateList = data.data.results;
                });
                var modalInstance = $uibModal.open({
                    scope: $scope,
                    templateUrl: '/frontend/views/modal/modal-template.html',
                    size: 'md'
                });
            } else {
                console.log("In Else");
                $state.go("template-view", {
                    "assignmentTemplate": data._id,
                    "type": getApi
                });
            }
        };
        $scope.viewInvoice = function (assignment, invoice) {
            if (invoice === '') {
                $state.go("createInvoice", {
                    "invoiceId": invoice._id,
                    "assignmentId": assignment._id,
                    "type": "InvoiceExpenditure"
                });
            } else {
                $state.go("editInvoice", {
                    "invoiceId": invoice._id,
                    "assignmentId": assignment._id,
                    "type": "InvoiceExpenditure"
                });
            }
        };

        $scope.templateAttachment = function (attachment) {
            console.log(attachment);
            $state.go("template-view", attachment[0].url);
        };

        $scope.files = [{
            name: "JIR",
            type: "templateJir",
            count: 2,
            files: []
        }, {
            name: "ILA",
            type: "templateIla",
            count: 0,
            files: []
        }, {
            name: "ISR",
            type: "templateIsr",
            count: 0,
            files: []
        }, {
            name: "LOR",
            type: "templateLor",
            count: 0,
            files: []
        }, {
            name: "Assesments",
            type: "assessment",
            count: 0,
            files: []
        }, {
            name: "FSR",
            type: "",
            count: 0,
            files: []
        }, {
            name: "Invoice",
            type: "",
            count: 0,
            files: []
        }, {
            name: "Documents",
            type: "docs",
            count: 0,
            files: []
        }, {
            name: "Photos",
            type: "photos",
            count: 0,
            files: []
        }, {
            name: "Total Attachments",
            count: 2,
            files: []
        }];


        //  INTEGRATION STARTS
        $scope.assignment = {};
        $scope.message = {};
        $scope.message.employee = "";
        $scope.timeline = {};
        console.log(new Date());
        $scope.message.title = "Sent a new message";
        $scope.assessment = {};
        $scope.doc = {};
        $scope.photo = {};
        $scope.showCreate = false;
        $scope.showCreateTrue = function () {
            $scope.showCreate = true;
        }
        NavigationService.getLoginEmployee($.jStorage.get("profile").email, function (data) {
            // NavigationService.getOneModel("User", $.jStorage.get("profile")._id, function (data) {
            $scope.message.employee = data.data;
            console.log("In Employee", $scope.employee, data);
            $scope.assessment.employee = $scope.employee.employee;
            $scope.photo.employee = $scope.employee.employee;
            $scope.doc.employee = $scope.employee.employee;
        });
        $scope.getTimeline = function () {
            NavigationService.getOneModel("Timeline", $scope.timelineID, function (data) {
                $scope.timeline = data.data;
                console.log("ABCD", data.data, $scope.timelineID);
            });
        };
        $scope.sendMessage = function (type) {
            console.log("ABC", $scope.timeline);
            $scope.message.type = type;
            $scope.timeline.chat.push($scope.message);
            NavigationService.saveChat($scope.timeline, function (data) {
                console.log("FFFFF", data);
                $scope.getTimeline();
            });
        };
        $scope.sendMessageFromPhoto = function (type) {
            $scope.timeline.chat.push(type);
            NavigationService.saveChat($scope.timeline, function (data) {
                console.log("FFFFF", data);
                $scope.getTimeline();
            });
        };
        $scope.assignmentRefresh = function () {
            NavigationService.getOneModel("Assignment", $stateParams.id, function (data) {
                $scope.assignment = data.data;
                _.each($scope.assignment, function (n, assignmentKey) {
                    console.log("assignment for template");
                    _.each($scope.files, function (m, filesKey) {
                        if (assignmentKey === m.type) {
                            m.files = n;
                        }
                    });
                    console.log(assignmentKey);
                });
                if ($scope.assignment.natureOfLoss) {
                    $scope.assignment.natureloss = "";
                }
                if (data.data.timeline && data.data.timeline[0]) {
                    console.log("in if");
                    $scope.timelineID = data.data.timeline[0];
                    $scope.getTimeline();
                } else {
                    console.log("in else");
                    NavigationService.createTimeline(data.data._id, function (data) {
                        NavigationService.getOneModel("Assignment", $stateParams.id, function (data) {
                            $scope.timelineID = data.data.timeline[0];
                            $scope.getTimeline();
                        });
                    });
                }
            });
        }
        $scope.assignmentRefresh();

        //  send email
        $scope.sendEmail = function (modalForm) {

            $scope.msgSend = "Sending..";
            $scope.newTo = angular.copy($scope.email);
            $scope.newTo.to = [];
            _.each($scope.email.to, function (n) {
                $scope.newTo.to.push(n.email);
            });
            $scope.newTo.cc = [];
            _.each($scope.email.cc, function (n) {
                $scope.newTo.cc.push(n.email);
            });
            $scope.newTo.bcc = [];
            _.each($scope.email.bcc, function (n) {
                $scope.newTo.bcc.push(n.email);
            });
            $scope.newTo.to = $scope.newTo.to.join();
            $scope.newTo.cc = $scope.newTo.cc.join();
            $scope.newTo.bcc = $scope.newTo.bcc.join();
            console.log($scope.newTo);
            NavigationService.sendEmail($scope.newTo, function (data) {
                console.log(data);
                if (data.value) {
                    if (data.data.error) {

                        toastr.error(data.data.error.code + " Code " + data.data.error.message, "Send email.");
                    } else {
                        $scope.message.email = $scope.newTo;
                        $scope.message.email.response = data;
                        $scope.sendMessage("Email");
                        toastr.success("Your message has been send.", "Send email.");
                        $timeout(function () {
                            modalInstance.close();
                        }, 1000);
                    }

                } else {
                    // $scope.msgSend = "Error in sending email";
                    toastr.error("Error in sending email.", "Send email.");
                }
            });
        };

        $scope.saveAssignment = function (otherInfo) {
            if (otherInfo === "Assessment") {
                $scope.assignment.timelineStatus = "Consent Pending";
            } else if (otherInfo === "Docs") {
                console.log("In Docs")
                $scope.assignment.timelineStatus = "Assessment Pending";
            } else if (otherInfo === "FSR") {
                $scope.assignment.timelineStatus = "Dispatched";
            }
            NavigationService.assignmentSave($scope.assignment, function (data) {
                if (data.value === true) {
                    // $scope.message.title = otherInfo + " Uploaded.";
                    // $scope.sendMessage("File");
                    toastr.success($scope.assignment.name + " Updated", "Assignment " + $scope.assignment.name);
                } else {
                    toastr.error("Error in updating " + $scope.assignment.name + ".", "Assignment " + $scope.assignment.name);
                }
            });
        };

        $scope.onFileUploadCallback1 = function (data) {
            if (data.file) {
                if (!$scope.assignment.assessment) {
                    $scope.assignment.assessment = [];
                }
                data.fileName = Date.now();
                $scope.message.attachment = [];
                var a = {
                    type: "Assessment",
                    url: data.file[0]
                };
                $scope.message.attachment.push(a);
                $scope.assignment.assessment.push(data);
                $scope.saveAssignment("Assessment");
            }
        };

        // $scope.onFileUploadCallback = function (data) {
        //     if (data.file) {
        //         if (!$scope.assignment.fsrs) {
        //             $scope.assignment.fsrs = [];
        //         }
        //         data.fileName = Date.now();
        //         $scope.message.attachment = [];
        //         var a = {
        //             type: "FSR",
        //             url: data.file[0]
        //         };
        //         $scope.message.attachment.push(a);
        //         $scope.assignment.fsrs.push(data);
        //         $scope.saveAssignment("FSR");
        //     }
        // };

        var a = {};
        var b = 0;
        $scope.arr = [];

        $scope.onFileUploadCallback = function (data, length) {
            console.log("Photo Data", data, $scope.timeline, $scope.timelineID);
            if ($scope.checker === length) {
                $scope.arr.push(data);
                $scope.checker = 1;
                var array = _.cloneDeep($scope.arr);
                var newArray = _.each($scope.arr, function (n) {
                    a.employee = $scope.message.employee,
                        a.file = n,
                        a.fileName = Date.now();
                    a.type = "File",
                        a.title = "FSR Uploaded",
                        a.attachment = n;
                    $scope.assignment.fsrs.push(_.cloneDeep(a));
                    $scope.sendMessageFromPhoto(_.cloneDeep(a));
                    console.log("Array to be Passed", a);
                });
                $scope.arr = [];
                $scope.saveAssignment("FSR");
            } else {
                $scope.arr.push(data);
                $scope.checker++;
            }
        };

        //         $scope.onInvoiceUploadCallback = function (data, length) {
        //     console.log("Photo Data", data, $scope.timeline, $scope.timelineID);
        //     if ($scope.checker === length) {
        //         $scope.arr.push(data);
        //         $scope.checker = 1;
        //         var array = _.cloneDeep($scope.arr);
        //         var newArray = _.each($scope.arr, function (n) {
        //             a.employee = $scope.message.employee,
        //                 a.file = n,
        //                 a.fileName = Date.now();
        //                 a.type = "File",
        //                 a.title = "FSR Uploaded",
        //                 a.attachment = n;
        //             $scope.assignment.invoice.push(_.cloneDeep(a));
        //             $scope.sendMessageFromPhoto(_.cloneDeep(a));
        //             console.log("Array to be Passed", a);
        //         });
        //         $scope.arr = [];
        //         $scope.saveAssignment("FSR");
        //     } else {
        //         $scope.arr.push(data);
        //         $scope.checker++;
        //     }
        // };

        $scope.onPhotoUploadCallback = function (data, length) {
            console.log("Photo Data", data, $scope.timeline, $scope.timelineID);
            if ($scope.checker === length) {
                $scope.arr.push(data);
                $scope.checker = 1;
                var array = _.cloneDeep($scope.arr);
                var newArray = _.each($scope.arr, function (n) {
                    a.employee = $scope.message.employee,
                        a.file = n,
                        a.fileName = Date.now();
                    a.type = "Normal",
                        a.title = "Photo Uploaded",
                        a.attachment = n;
                    $scope.assignment.photos.push(_.cloneDeep(a));
                    $scope.sendMessageFromPhoto(_.cloneDeep(a));
                    console.log("Array to be Passed", a);
                });
                $scope.arr = [];
                $scope.saveAssignment("Photo");
            } else {
                $scope.arr.push(data);
                $scope.checker++;
            }
        };
        $scope.onAssessmentUploadCallback = function (data, length) {
            if ($scope.checker === length) {
                $scope.arr.push(data);
                $scope.checker = 1;
                var array = _.cloneDeep($scope.arr);
                var newArray = _.each($scope.arr, function (n) {
                    a.employee = $scope.message.employee,
                        a.file = n,
                        a.fileName = Date.now();
                    a.type = "File",
                        a.title = "Assessment Uploaded",
                        a.attachment = n;
                    $scope.assignment.assessment.push(_.cloneDeep(a));
                    $scope.sendMessageFromPhoto(_.cloneDeep(a));
                });
                $scope.arr = [];
                $scope.saveAssignment("Assessment");
                console.log("After Save", $scope.arr);

            } else {
                $scope.arr.push(data);
                $scope.checker++;
            }
        };
        $scope.onDocsUploadCallback = function (data, length) {
            console.log("In Doc");
            if ($scope.checker === length) {
                $scope.arr.push(data);
                $scope.checker = 1;
                var array = _.cloneDeep($scope.arr);
                var newArray = _.each($scope.arr, function (n) {
                    a.employee = $scope.message.employee,
                        a.file = n,
                        a.fileName = Date.now();
                    a.type = "File",
                        a.title = "Document Uploaded",
                        a.attachment = n;
                    $scope.assignment.docs.push(_.cloneDeep(a));
                    $scope.sendMessageFromPhoto(_.cloneDeep(a));
                });
                $scope.arr = [];
                $scope.saveAssignment("Docs");
                console.log("After Save", $scope.arr);

            } else {
                $scope.arr.push(data);
                $scope.checker++;
            }
        };

        // $scope.onDocsUploadCallback = function (data) {
        //     if (data.file) {
        //         if (!$scope.assignment.docs) {
        //             $scope.assignment.docs = [];
        //         }
        //         data.fileName = Date.now();
        //         $scope.message.attachment = [];
        //         var a = {
        //             type: "Docs",
        //             url: data.file[0]
        //         };
        //         $scope.assignment.docs.push(data);
        //         $scope.saveAssignment("Docs");
        //     }
        // };
    })

    .controller('EmailInboxCtrl', function ($scope, $window, $uibModal, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr, base64) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("email-inbox");
        $scope.menutitle = NavigationService.makeactive("Email Inbox");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "Email Inbox"
        };
        $scope.msg = "Loading...";
        $scope.msgSend = "";
        $scope.allSelect = false;
        $scope.mails = [];
        $scope.emailForm = {};
        $scope.labelIds = "INBOX";
        $scope.tabMenue = [{
            title: "Inbox",
            label: "INBOX",
            class: "active"
        }, {
            title: "Draft",
            label: "DRAFT",
            class: ""
        }, {
            title: "Important",
            label: "IMPORTANT",
            class: ""
        }, {
            title: "Sent",
            label: "SENT",
            class: ""
        }, {
            title: "Trash",
            label: "TRASH",
            class: ""
        }];
        $scope.scrollDisable = false;
        // GMAIL CALL
        $scope.tabSelected = function (label, tab) {
            _.each($scope.tabMenue, function (n) {
                n.class = "";
            });
            tab.class = "active";
            $scope.msg = "Loading...";
            $scope.emailForm.search = "";
            $scope.mails = [];
            $scope.labelIds = label;
            $scope.reloadGmail();
        };
        $scope.reloadGmail = function (nextPageToken) {
            NavigationService.gmailCall({
                url: "messages",
                method: "GET",
                nextPageToken: nextPageToken,
                search: $scope.emailForm.search,
                labelIds: $scope.labelIds
            }, function (data) {
                console.log(data);
                if (data.data.resultSizeEstimate === 0) {
                    $scope.msg = "You don't have any e-mails.";
                } else {
                    $scope.msg = "";
                }
                if (!nextPageToken) {
                    $scope.mails = data.data.messages;
                } else {
                    _.each(data.data.messages, function (n) {
                        $scope.mails.push(n);
                    });
                }
                $scope.nextPage = data.data.nextPageToken;

            });
        };
        $scope.reloadGmail();
        $scope.showSingle = function (data) {
            console.log("Email Data Before Passing", data);
            $.jStorage.set("oneEmail", data);
            $state.go("email-single", {
                // id: data.threadId
                id: data.id
            });
        };

        function getHeight() {
            $scope.emailheight = $window.innerHeight - 130;
        }
        getHeight();

        angular.element($window).bind('resize', function () {
            getHeight();
            $scope.$apply();
        });

        $scope.tinymceModel = 'Initial content';
        $scope.tinymceOptions = {
            plugins: 'link image code',
            toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
        };

        $scope.emailToDelete = [];
        $scope.selectAll = function (check) {
            console.log(check);
            if (check) {
                _.each($scope.mails, function (n) {
                    n.checked = true;
                    $scope.emailToDelete.push(n.threadId);
                });
            } else {
                $scope.emailToDelete = [];
                _.each($scope.mails, function (n) {
                    n.checked = false;

                });
            }
        };
        $scope.addEmailToDelete = function (data) {
            var a = _.findIndex($scope.emailToDelete, function (o) {
                return o == data.id;
            });
            console.log(a);
            if (a == -1) {
                $scope.emailToDelete.push(data.id);
            } else {
                // var ind =
                $scope.emailToDelete.splice(a, 1);
            }

            console.log($scope.emailToDelete);
        };

        $scope.email = {
            message: ""
        };
        $scope.emailtos = [{
            name: 'Jagruti',
            email: 'jagruti@wohlig.com'
        }, {
            name: 'Tushar',
            email: 'tushar@wohlig.com'
        }, {
            name: 'Chintan',
            email: 'chintan@wohlig.com'
        }, {
            name: 'Harsh',
            email: 'harsh@wohlig.com'
        }, {
            name: 'Raj',
            email: 'raj@wohlig.com'
        }];
        var modalInstance = function () {};
        $scope.newEmail = function () {
            $scope.msgSend = "";
            modalInstance = $uibModal.open({
                scope: $scope,
                templateUrl: '/frontend/views/modal/modal-email.html',
                size: 'lg'
            });
        };
        $scope.sendEmail = function (modalForm) {

            $scope.msgSend = "Sending..";
            $scope.newTo = angular.copy($scope.email);
            $scope.newTo.to = [];
            _.each($scope.email.to, function (n) {
                $scope.newTo.to.push(n.email);
            });
            $scope.newTo.cc = [];
            _.each($scope.email.cc, function (n) {
                $scope.newTo.cc.push(n.email);
            });
            $scope.newTo.bcc = [];
            _.each($scope.email.bcc, function (n) {
                $scope.newTo.bcc.push(n.email);
            });
            $scope.newTo.to = $scope.newTo.to.join();
            $scope.newTo.cc = $scope.newTo.cc.join();
            $scope.newTo.bcc = $scope.newTo.bcc.join();
            console.log($scope.newTo);
            NavigationService.sendEmail($scope.newTo, function (data) {
                console.log(data);
                if (data.value) {
                    toastr.success("Your message has been send.", "Send email.");
                    $timeout(function () {
                        modalInstance.close();
                    }, 1000);
                } else {
                    // $scope.msgSend = "Error in sending email";
                    toastr.success("Error in sending email.", "Send email.");
                }
            });
        };
        $scope.files = [{
            type: "JIR",
            count: 2,
            files: [{
                name: "doc1.docx",
                selection: true
            }, {
                name: "doc2.docx",
                selection: true
            }]
        }, {
            type: "ILA",
            count: 0,
            files: []
        }, {
            type: "ILR",
            count: 0,
            files: []
        }, {
            type: "LOR",
            count: 0,
            files: []
        }, {
            type: "Assesments",
            count: 0,
            files: []
        }, {
            type: "FSR",
            count: 0,
            files: []
        }, {
            type: "Invoice",
            count: 0,
            files: []
        }, {
            type: "Documents",
            count: 0,
            files: []
        }, {
            type: "Images",
            count: 0,
            files: []
        }, {
            type: "Total Attachments",
            count: 2,
            files: [{
                name: "doc1.docx",
                selection: true
            }, {
                name: "doc2.docx",
                selection: true
            }]
        }];


    })


    .controller('EmailSingleCtrl', function ($scope, $window, $filter, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("email-single");
        $scope.menutitle = NavigationService.makeactive("Single Mail");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "Single Mail"
        };
        console.log();
        $scope.pdf = {};

        $scope.createAssignment = function () {
            NavigationService.pdfGenerate({
                "messageId": $stateParams.id
            }, function (data) {

                $scope.pdf = data.data;

                $state.go("createassignmentemail", {
                    'emailId': $scope.email.id,
                    'model': "assignment",
                    'pdf': $scope.pdf.name
                });

            });
        };
        NavigationService.detailEmail({
            "messageId": $stateParams.id
        }, function (data) {
            $scope.email = data.data;
            console.log("Email ............", $scope.email, data);
            var a = $filter("base64url")(data.data.raw);

            $scope.email.attachment = [];
            switch ($scope.email.payload.mimeType) {
                case "multipart/related":
                    {
                        _.each($scope.email.payload.parts, function (data) {
                            console.log("in parts");
                            console.log(data);
                            if (data.mimeType == "multipart/alternative") {
                                _.each(data.parts, function (data2) {
                                    if (data2.mimeType == "text/html") {
                                        console.log("In related");
                                        $scope.email.body = data2.body.data;
                                    }
                                });

                            }
                            if (data.filename !== "") {
                                console.log("in attach");
                                $scope.email.attachment.push(data);
                                console.log($scope.email.attachment);
                            }
                        });
                    }
                    break;
                case "multipart/mixed":
                    {
                        _.each($scope.email.payload.parts, function (data) {
                            console.log("in parts");
                            console.log(data);
                            if (data.mimeType == "multipart/alternative") {
                                _.each(data.parts, function (data2) {
                                    if (data2.mimeType == "text/html") {
                                        console.log("In Mixed");
                                        $scope.email.body = data2.body.data;
                                    }
                                });

                            }
                            if (data.mimeType == "application/zip") {
                                console.log("In Zip outer If");
                                _.each(data.parts, function (data2) {
                                    console.log("In Zip _.each");
                                    if (data2.mimeType == "multipart/alternative") {
                                        console.log("In Zip");
                                        $scope.email.body = data2.body.data;
                                    }
                                });

                            }
                            if (data.filename !== "") {
                                console.log("in attach");
                                $scope.email.attachment.push(data);
                                console.log($scope.email.attachment);
                            }
                        });
                    }
                    break;

                case "multipart/alternative":
                    {
                        _.each($scope.email.payload.parts, function (data) {

                            if (data.mimeType == "text/html") {
                                console.log("In Alternative");
                                $scope.email.body = data.body.data;
                            }

                        });
                    }
                    break;
                case "text/html":
                    {
                        console.log("In text/html");
                        $scope.email.body = $scope.email.payload.body.data;
                    }
                    break;
            }

        });
        $scope.accessToken = $.jStorage.get("accessToken");
        $scope.openAttachment = function (f) {
            var a = {
                "attachmentId": f.body.attachmentId,
                "fileName": f.filename,
                "messageId": $stateParams.id
            };
            var win = window.open(adminurl + "user/getAttachment?accessToken=" + $scope.accessToken + "&fileName=" + f.filename + "&attachmentId=" + f.body.attachmentId + "&messageId=" + $stateParams.id, '_blank');
            // NavigationService.getAttachment(a, function (data) {
            //     console.log(data);
            // });
        };


        $scope.emailSnippet = '<div dir="ltr">Dear Chintan,<div><br></div><div>Seen the links. What next?</div></div><div data-smartmail="gmail_signature"><div><br></div><div>Warm Regards,</div><div><br></div><div><b>Arun Arora</b></div><div><font color="#666666">M: +91 81080 99789</font></div><div>______________________________<wbr>____________________</div><div><br></div><div><b><font color="#000099">Absolute Insurance Surveyors &amp; Loss Assessors Pvt Ltd</font></b></div><div><font color="#666666">501/502, Ideal Trade Centre, Sector 11,&nbsp;CBD Belapur, Navi Mumbai 400 614</font></div><div><font color="#666666">T: +91 22 2756 2983 | F: +91 22 2756 2984</font></div></div>';

    })

    .controller('ForbiddenCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("forbidden");
        $scope.menutitle = NavigationService.makeactive("Access Forbidden");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

    });