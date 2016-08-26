var globalfunction = {};
angular.module('phonecatControllers', ['templateservicemod', 'navigationservice', 'ui.bootstrap', 'ui.select', 'ngAnimate', 'toastr', 'ngSanitize', 'angular-flexslider', 'ui.tinymce', 'imageupload', 'ngMap', 'toggle-switch'])

.controller('DashboardCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("dashboard");
    $scope.menutitle = NavigationService.makeactive("Dashboard");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
})

.controller('LoginCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("login");
    $scope.menutitle = NavigationService.makeactive("Login");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
})

.controller('BranchListCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr) {
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
    $scope.showAllCountries = function(keywordChange) {
        $scope.totalItems = undefined;
        if (keywordChange) {
            $scope.currentPage = 1;
        }
        NavigationService.searchBranch({
            page: $scope.currentPage,
            keyword: $scope.search.keyword
        }, ++i, function(data, ini) {
            if (ini == i) {
                $scope.allBranch = data.data.results;
                $scope.totalItems = data.data.total;
                $scope.maxRow = data.data.options.count;
            }
        });
    };

    $scope.changePage = function(page) {
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
    $scope.deleteBranch = function(id) {
        globalfunction.confDel(function(value) {
            console.log(value);
            if (value) {
                NavigationService.deleteBranch(id, function(data) {
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

.controller('CountryCtrl', function($scope, TemplateService, NavigationService, $timeout, $state, $stateParams, toastr) {
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
        $scope.showAllCountries = function(keywordChange) {
            $scope.totalItems = undefined;
            if (keywordChange) {
                $scope.currentPage = 1;
            }
            NavigationService.searchCountry({
                page: $scope.currentPage,
                keyword: $scope.search.keyword
            }, ++i, function(data, ini) {
                if (ini == i) {
                    $scope.countries = data.data.results;
                    $scope.totalItems = data.data.total;
                    $scope.maxRow = data.data.options.count;
                }
            });
        };

        $scope.changePage = function(page) {
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
        $scope.deleteCountry = function(id) {
            globalfunction.confDel(function(value) {
                console.log(value);
                if (value) {
                    NavigationService.deleteCountry(id, function(data) {
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
    .controller('ModelViewCtrl', function($scope, TemplateService, NavigationService, $timeout, $state, $stateParams, toastr) {
        //Used to name the .html file
        $scope.modelCap = _.capitalize($stateParams.model);
        $scope.modelLow = _.lowerCase($stateParams.model);

        $scope.template = TemplateService.changecontent($stateParams.model + "-list");
        $scope.menutitle = NavigationService.makeactive($scope.modelCap + " List");
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
        $scope.showAll = function(keywordChange) {
            $scope.totalItems = undefined;
            if (keywordChange) {
                $scope.currentPage = 1;
            }
            NavigationService.searchModel($stateParams.model, {
                page: $scope.currentPage,
                keyword: $scope.search.keyword
            }, ++i, function(data, ini) {
                if (ini == i) {
                    $scope.modelList = data.data.results;
                    $scope.totalItems = data.data.total;
                    $scope.maxRow = data.data.options.count;
                }
            });
        };

        $scope.changePage = function(page) {
            var goTo = $stateParams.model + "-list";
            if ($scope.search.keyword) {
                goTo = $stateParams.model + "-list";
            }
            $state.go(goTo, {
                page: page,
                keyword: $scope.search.keyword
            });
        };
        $scope.showAll();
        $scope.deleteModel = function(id) {
            globalfunction.confDel(function(value) {
                console.log(value);
                if (value) {
                    NavigationService.deleteModel($scope.modelLow, id, function(data) {
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

        $scope.changeStatus = function(ind) {
            NavigationService.modelSave($scope.modelLow, ind, function(data) {
                if (data.value === true) {}
            });
        };
    })

    .controller('CreateModelCtrl', function($scope, TemplateService, NavigationService, $timeout, $state, toastr, $stateParams) {
        //Used to name the .html file
        $scope.modelCap = _.capitalize($stateParams.model);
        $scope.modelLow = _.lowerCase($stateParams.model);
        $scope.template = TemplateService.changecontent( $scope.modelLow + "-detail");
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
        $scope.houseColors = ["Red", "Green", "Blue", "Yellow"];

        $scope.dateOptions = {
            showWeeks: true
        };

        $scope.popup = {
            to: false,
            from: false,
            birthDate: false,
            marriageDate: false,
            joiningDate: false,
            leavingDate: false
        };

        $scope.format = 'dd-MMMM-yyyy';

        // FOR EMPLOYEE

        $scope.formData = {};
        $scope.saveModel = function(formData) {
            NavigationService.modelSave($scope.modelLow, $scope.formData, function(data) {
                if (data.value === true) {
                    $state.go($stateParams.model + '-list');
                    toastr.success($scope.modelCap + " " + formData.name + " created successfully.", $scope.modelCap + " Created");
                } else {
                    toastr.error($scope.modelCap + " creation failed.", $scope.modelCap + " creation error");
                }
            });
        };

    })

    .controller('EditModelCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr) {
      $scope.modelCap = _.capitalize($stateParams.model);
      $scope.modelLow = _.lowerCase($stateParams.model);
        $scope.template = TemplateService.changecontent( $scope.modelLow +"-detail");
        $scope.menutitle = NavigationService.makeactive($scope.modelCap);
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        console.log($state);
        console.log("000000000000000000");
        $scope.formData = {};
        $scope.header = {
            "name": "Edit " + $scope.modelCap
        };

        NavigationService.getOneModel($stateParams.model, $stateParams.id, function(data) {
            $scope.formData = data.data;
        });

        $scope.saveModel = function(formValid) {
            NavigationService.modelSave($stateParams.model, $scope.formData, function(data) {
                if (data.value === true) {
                    $state.go($scope.modelLow + '-list');
                    toastr.success($scope.modelCap + $scope.formData.name + " edited successfully.", $scope.modelCap+" Edited");
                } else {
                    toastr.error($scope.modelCap+" edition failed.", $scope.modelCap+" editing error");
                }
            });
        };

    })


.controller('CreateCountryCtrl', function($scope, TemplateService, NavigationService, $timeout, $state, toastr) {
        //Used to name the .html file

        $scope.template = TemplateService.changecontent("country-detail");
        $scope.menutitle = NavigationService.makeactive("Country");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "Create Country"
        };
        $scope.formData = {};
        $scope.saveCountry = function(formData) {
            console.log($scope.formData);
            NavigationService.countrySave($scope.formData, function(data) {
                if (data.value === true) {
                    $state.go('country-list');
                    toastr.success("Country " + formData.name + " created successfully.", "Country Created");
                } else {
                    toastr.error("Country creation failed.", "Country creation error");
                }
            });
        };

    })

.controller('EditCountryCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr) {
    //Used to name the .html file

    $scope.template = TemplateService.changecontent("country-detail");
    $scope.menutitle = NavigationService.makeactive("Country");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $scope.header = {
        "name": "Edit Country"
    };

    NavigationService.getOneCountry($stateParams.id, function(data) {
        $scope.formData = data.data;
        console.log('$scope.oneCountry', $scope.oneCountry);

    });

    $scope.saveCountry = function(formValid) {
        NavigationService.countryEditSave($scope.formData, function(data) {
            if (data.value === true) {
                $state.go('country-list');
                console.log("Check this one");
                toastr.success("Country " + $scope.formData.name + " edited successfully.", "Country Edited");
            } else {
                toastr.error("Country edition failed.", "Country editing error");
            }
        });
    };

})



.controller('OfficeCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr) {
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
        $scope.showAllCountries = function(keywordChange) {
            $scope.totalItems = undefined;
            if (keywordChange) {
                $scope.currentPage = 1;
            }
            NavigationService.searchOffice({
                page: $scope.currentPage,
                keyword: $scope.search.keyword
            }, ++i, function(data, ini) {
                console.log(data.data);

                if (ini == i) {
                    console.log(data.data);
                    $scope.allOffices = data.data.results;
                    $scope.totalItems = data.data.total;
                    $scope.maxRow = data.data.options.count;
                }
            });
        };

        $scope.changePage = function(page) {
            var goTo = "bankmaster-list";
            if ($scope.search.keyword) {
                goTo = "bankmaster-list";
            }
            $state.go(goTo, {
                page: page,
                keyword: $scope.search.keyword
            });
        };
        $scope.showAllCountries();

        $scope.deleteOffice = function(id) {
            globalfunction.confDel(function(value) {
                if (value) {
                    NavigationService.deleteOffice(id, function(data) {
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

        $scope.changeStatus = function(ind) {
            NavigationService.officeSave(ind, function(data) {
                if (data.value === true) {}
            });
        };
    })
    .controller('CreateOfficeCtrl', function($scope, TemplateService, NavigationService, $timeout, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("office-detail");
        $scope.menutitle = NavigationService.makeactive("Office");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "Create Office"
        };
        $scope.formData = {};
        $scope.saveOffice = function(formData) {

            NavigationService.officeSave($scope.formData, function(data) {
                if (data.value === true) {
                    $state.go('office-list');
                    toastr.success("Office " + formData.name + " created successfully.", "Office Created");
                } else {
                    toastr.error("Office creation failed.", "Office creation error");
                }
            });
        };

    })
    .controller('EditOfficeCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("office-detail");
        $scope.menutitle = NavigationService.makeactive("Office");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "Edit Office"
        };
        NavigationService.getOneOffice($stateParams.id, function(data) {
            $scope.formData = data.data;
            $scope.formData.country = data.data.city.district.state.zone.country._id;
            $scope.formData.zone = data.data.city.district.state.zone._id;
            $scope.formData.state = data.data.city.district.state._id;
            $scope.formData.district = data.data.city.district._id;
            $scope.formData.city = data.data.city._id;
        });

        $scope.saveOffice = function(formValid) {
            NavigationService.officeSave($scope.formData, function(data) {
                if (data.value === true) {
                    $state.go('office-list');
                    toastr.success("Office " + $scope.formData.name + " edited successfully.", "Office Edited");
                } else {
                    toastr.error("Office edition failed.", "Office editing error");
                }
            });
        };

    })
    .controller('TypeOfOfficeCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr) {
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
        $scope.showAllCountries = function(keywordChange) {
            $scope.totalItems = undefined;
            if (keywordChange) {
                $scope.currentPage = 1;
            }
            NavigationService.searchTypeOfOffice({
                page: $scope.currentPage,
                keyword: $scope.search.keyword
            }, ++i, function(data, ini) {
                if (ini == i) {
                    $scope.allTypeOfOffices = data.data.results;
                    $scope.totalItems = data.data.total;
                    $scope.maxRow = data.data.options.count;
                }
            });
        };

        $scope.changePage = function(page) {
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
        $scope.deleteTypeOfOffice = function(id) {
            globalfunction.confDel(function(value) {
                console.log(value);
                if (value) {
                    NavigationService.deleteTypeOfOffice(id, function(data) {
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
    .controller('CreateTypeOfOfficeCtrl', function($scope, TemplateService, NavigationService, $timeout, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("typeOfOffice-detail");
        $scope.menutitle = NavigationService.makeactive("Type Of Office");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "Create Type Of Office"
        };
        $scope.formData = {};
        $scope.savetypeOfOffice = function(formData) {

            NavigationService.typeofofficeSave($scope.formData, function(data) {
                if (data.value === true) {
                    $state.go('typeOfOffice-list');
                    toastr.success("Type Of Office " + $scope.formData.name + " created successfully.", "Type Of Office Created");
                } else {
                    toastr.error("Type Of Office creation failed.", "Type Of Office creation error");
                }
            });
        };

    })
    .controller('EditTypeOfOfficeCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("typeOfOffice-detail");
        $scope.menutitle = NavigationService.makeactive("Type Of Office");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "Edit Type Of Office"
        };

        NavigationService.getOnetypeOfOffice($stateParams.id, function(data) {
            $scope.formData = data.data;
        });

        $scope.savetypeOfOffice = function(formValid) {

            //  if (formValid.$valid) {
            //  $scope.formComplete = true;
            NavigationService.typeofofficeSave($scope.formData, function(data) {
                if (data.value === true) {
                    $state.go('typeOfOffice-list');
                    toastr.success("Type Of Office " + $scope.formData.name + " created successfully.", "Type Of Office Created");
                } else {
                    toastr.error("Type Of Office creation failed.", "Type Of Office creation error");
                }
            });
            //  }
        };

    })
    .controller('ZoneCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams, toastr, $state) {
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
        $scope.showAllCountries = function(keywordChange) {
            $scope.totalItems = undefined;
            if (keywordChange) {
                $scope.currentPage = 1;
            }
            NavigationService.searchZone({
                page: $scope.currentPage,
                keyword: $scope.search.keyword
            }, ++i, function(data, ini) {
                console.log(data.data);

                if (ini == i) {
                    console.log(data.data);
                    $scope.countries = data.data.results;
                    $scope.totalItems = data.data.total;
                    $scope.maxRow = data.data.options.count;

                }
            });
        };

        $scope.changePage = function(page) {
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

        $scope.deleteZone = function(id) {
            globalfunction.confDel(function(value) {
                console.log(value);
                if (value) {
                    NavigationService.deleteZone(id, function(data) {
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
    .controller('CreateZoneCtrl', function($scope, TemplateService, NavigationService, $timeout, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("zone-detail");
        $scope.menutitle = NavigationService.makeactive("Zone");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "Create Zone"
        };
        $scope.saveZone = function(formData) {
            NavigationService.zoneSave(formData, function(data) {
                if (data.value === true) {
                    $state.go('zone-list');
                    toastr.success("Zone " + formData.name + " created successfully.", "Zone Created");
                } else {
                    toastr.error("Zone creation failed.", "Zone creation error");
                }
            });
        };
    })
    .controller('EditZoneCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("zone-detail");
        $scope.menutitle = NavigationService.makeactive("Zone");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "Edit Zone"
        };

        NavigationService.getOneZone($stateParams.id, function(data) {
            $scope.formData = data.data;
            $scope.formData.country = data.data.country._id;
        });

        $scope.saveZone = function(formValid) {
            NavigationService.zoneSave($scope.formData, function(data) {
                if (data.value === true) {
                    $state.go('zone-list');
                    toastr.success("Zone " + $scope.formData.name + " edited successfully.", "Zone Edited");
                } else {
                    toastr.error("Zone edition failed.", "Zone editing error");
                }
            });
        };
    })
    .controller('StateCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams, toastr, $state) {
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
        $scope.showAllCountries = function(keywordChange) {
            $scope.totalItems = undefined;
            if (keywordChange) {
                $scope.currentPage = 1;
            }
            NavigationService.searchState({
                page: $scope.currentPage,
                keyword: $scope.search.keyword
            }, ++i, function(data, ini) {
                console.log(data.data);

                if (ini == i) {
                    console.log(data.data);
                    $scope.allStates = data.data.results;
                    $scope.totalItems = data.data.total;
                    $scope.maxRow = data.data.options.count;

                }
            });
        };

        $scope.changePage = function(page) {
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

        $scope.deleteState = function(id) {
            globalfunction.confDel(function(value) {
                if (value) {
                    NavigationService.deleteState(id, function(data) {
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

.controller('CreateStateCtrl', function($scope, TemplateService, NavigationService, $timeout, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("state-detail");
        $scope.menutitle = NavigationService.makeactive("State");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "Create State"
        };
        $scope.formData = {};
        $scope.saveState = function(formData) {

            NavigationService.stateSave($scope.formData, function(data) {
                if (data.value === true) {
                    $state.go('state-list');
                    toastr.success("State " + formData.name + " created successfully.", "State Created");
                } else {
                    toastr.error("State creation failed.", "State creation error");
                }
            });
        };

    })
    .controller('EditStateCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("state-detail");
        $scope.menutitle = NavigationService.makeactive("State");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "Edit State"
        };

        NavigationService.getOneState($stateParams.id, function(data) {
            $scope.formData = data.data;
            $scope.formData.country = data.data.zone.country._id;
            $scope.formData.zone = data.data.zone._id;
        });

        $scope.saveState = function(formValid) {
            NavigationService.stateSave($scope.formData, function(data) {
                if (data.value === true) {
                    $state.go('state-list');
                    toastr.success("State " + $scope.formData.name + " edited successfully.", "State Edited");
                } else {
                    toastr.error("State edition failed.", "State editing error");
                }
            });
        };
    })
    .controller('DistrictCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams, toastr, $state) {
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
        $scope.showAllCountries = function(keywordChange) {
            $scope.totalItems = undefined;
            if (keywordChange) {
                $scope.currentPage = 1;
            }
            NavigationService.searchDistrict({
                page: $scope.currentPage,
                keyword: $scope.search.keyword
            }, ++i, function(data, ini) {
                console.log(data.data);

                if (ini == i) {
                    console.log(data.data);
                    $scope.allDistricts = data.data.results;
                    $scope.totalItems = data.data.total;
                    $scope.maxRow = data.data.options.count;

                }
            });
        };

        $scope.changePage = function(page) {
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

        $scope.deleteDistrict = function(id) {
            globalfunction.confDel(function(value) {
                console.log(value);
                if (value) {
                    NavigationService.deleteDistrict(id, function(data) {
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
    .controller('EmployeeCtrl', function($scope, TemplateService, NavigationService, $timeout, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("employee-list");
        $scope.menutitle = NavigationService.makeactive("Employee");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.showAllEmployees = function() {
            NavigationService.getAllEmployees(function(data) {
                $scope.allEmployees = data.data;
                console.log('$scope.allEmployees', $scope.allEmployees);

            });
        };
        $scope.showAllEmployees();

        $scope.deleteEmployee = function(id) {

            NavigationService.deleteEmployee({
                id: id
            }, function(data) {
                $scope.showAllEmployees();

            });
        };

    })
    .controller('CreateEmployeeCtrl', function($scope, TemplateService, NavigationService, $timeout, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("employee-detail");
        $scope.menutitle = NavigationService.makeactive("Employee");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.formData = {};
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
        $scope.salutations = ["Mr.", "Mrs.", "Ms.", "Dr."];
        $scope.houseColors = ["Red", "Green", "Blue", "Yellow"];

        $scope.dateOptions = {
            showWeeks: true
        };

        $scope.popup = {
            to: false,
            from: false,
            birthDate: false,
            marriageDate: false,
            joiningDate: false,
            leavingDate: false
        };

        $scope.format = 'dd-MMMM-yyyy';

        NavigationService.getAllCompanies(function(data) {
            $scope.allCompanies = data.data;
            console.log('$scope.allCompanies', $scope.allCompanies);

        });
        NavigationService.getAllDepartments(function(data) {
            $scope.allDepartments = data.data;

        });
        NavigationService.getAllCountries(function(data) {
            $scope.allCountries = data.data;
            console.log('$scope.allCountries', $scope.allCountries);

        });
        NavigationService.getAllStates(function(data) {
            $scope.allStates = data.data;
            console.log('$scope.allStates', $scope.allStates);

        });
        NavigationService.getAllCities(function(data) {
            $scope.allCities = data.data;
            console.log('$scope.allCities', $scope.allCities);

        });
        $scope.saveEmployee = function(formData) {

            NavigationService.employeeSave($scope.formData, function(data) {
                // console.log(formData.surveyor.valid_upto);
                // console.log('$scope.formData',$scope.formData);
                // console.log(data);
                // $scope.formData.surveyor.valid_upto = new Date($scope.formData.surveyor.valid_upto);
                if (data.value === true) {
                    $state.go('employee-list');
                }
                // console.log('$scope.allCountriessave', $scope.data);

            });
        }

    })
    .controller('EditEmployeeCtrl', function($scope, TemplateService, NavigationService, $timeout, $state, $stateParams, $filter) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("employee-detail");
        $scope.menutitle = NavigationService.makeactive("Employee");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
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
        $scope.houseColors = ["Red", "Green", "Blue", "Yellow"];

        $scope.dateOptions = {
            showWeeks: true
        };

        $scope.popup = {
            to: false,
            from: false,
            birthDate: false,
            marriageDate: false,
            joiningDate: false,
            leavingDate: false
        };

        NavigationService.getAllCompanies(function(data) {
            $scope.allCompanies = data.data;
            console.log('$scope.allCompanies', $scope.allCompanies);

        });
        NavigationService.getAllDepartments(function(data) {
            $scope.allDepartments = data.data;

        });
        NavigationService.getAllCountries(function(data) {
            $scope.allCountries = data.data;
            console.log('$scope.allCountries', $scope.allCountries);

        });
        NavigationService.getAllStates(function(data) {
            $scope.allStates = data.data;
            console.log('$scope.allStates', $scope.allStates);

        });
        NavigationService.getAllCities(function(data) {
            $scope.allCities = data.data;
            console.log('$scope.allCities', $scope.allCities);

        });
        NavigationService.getOneEmployee($stateParams.id, function(data) {
            $scope.formData = data.data;
            console.log(data.data);
            console.log($filter('date')($scope.formData.surveyor.valid_upto));
            if ($scope.formData && $scope.formData.surveyor && $scope.formData.surveyor.valid_upto) {
                $scope.formData.surveyor.valid_upto = new Date($scope.formData.surveyor.valid_upto);
            }
            if ($scope.formData && $scope.formData.dob) {
                $scope.formData.dob = new Date($scope.formData.dob);
            }
            if ($scope.formData && $scope.formData.marriageDate) {
                $scope.formData.marriageDate = new Date($scope.formData.marriageDate);
            }
            if ($scope.formData && $scope.formData.joiningDate) {
                $scope.formData.joiningDate = new Date($scope.formData.joiningDate);
            }
            if ($scope.formData && $scope.formData.leavingDate) {
                $scope.formData.leavingDate = new Date($scope.formData.leavingDate);
            }
        });

        $scope.saveEmployee = function(formValid) {

            //  if (formValid.$valid) {
            //  $scope.formComplete = true;
            NavigationService.employeeEditSave($scope.formData, function(data) {
                if (data.value == true) {
                    $state.go('employee-list');
                }
            });
            //  }
        };
    })

.controller('ProductCtrl', function($scope, TemplateService, NavigationService, $timeout, $state, $stateParams, toastr) {
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
        $scope.showAllCountries = function(keywordChange) {
            $scope.totalItems = undefined;
            if (keywordChange) {
                $scope.currentPage = 1;
            }
            NavigationService.searchProduct({
                page: $scope.currentPage,
                keyword: $scope.search.keyword
            }, ++i, function(data, ini) {
                if (ini == i) {
                    $scope.allProduct = data.data.results;
                    $scope.totalItems = data.data.total;
                    $scope.maxRow = data.data.options.count;
                }
            });
        };

        $scope.changePage = function(page) {
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
        $scope.deleteProduct = function(id) {
            globalfunction.confDel(function(value) {
                console.log(value);
                if (value) {
                    NavigationService.deleteProduct(id, function(data) {
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
    .controller('CreateProductCtrl', function($scope, TemplateService, NavigationService, $timeout, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("product-detail");
        $scope.menutitle = NavigationService.makeactive("Product");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.userStatus = [{
            "name": "Active",
            "value": true
        }, {
            "name": "Inactive",
            "value": false
        }];
        $scope.formData = {};

        $scope.saveProduct = function(formData) {

            NavigationService.productSave($scope.formData, function(data) {
                if (data.value === true) {
                    $state.go('product-list');
                    toastr.success("Product " + formData.name + " created successfully.", "Product Created");
                } else {
                    toastr.error("Product creation failed.", "Product creation error");
                }
            });
        };

    })
    .controller('EditProductCtrl', function($scope, TemplateService, NavigationService, $timeout, $state, $stateParams, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("product-detail");
        $scope.menutitle = NavigationService.makeactive("Product");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.userStatus = [{
            "name": "Active",
            "value": true
        }, {
            "name": "Inactive",
            "value": false
        }];
        NavigationService.getOneProduct($stateParams.id, function(data) {
            $scope.formData = data.data;
            $scope.formData.industry = data.data.category.industry._id;
            $scope.formData.category = data.data.category._id;

        });

        $scope.saveProduct = function(formValid) {
            NavigationService.productSave($scope.formData, function(data) {
                if (data.value === true) {
                    $state.go('product-list');
                    toastr.success("Product " + $scope.formData.name + " edited successfully.", "Product Edited");
                } else {
                    toastr.error("Product edition failed.", "Product editing error");
                }
            });
        };
    })
    .controller('SalvageCtrl', function($scope, TemplateService, NavigationService, $timeout, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("salvage-list");
        $scope.menutitle = NavigationService.makeactive("Salvage");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.showAllSalvage = function() {
            NavigationService.getAllSalvage(function(data) {
                $scope.allSalvage = data.data;
                console.log('$scope.allSalvage', $scope.allSalvage);

            });
        };
        $scope.showAllSalvage();

        $scope.deleteSalvage = function(id) {

            NavigationService.deleteSalvage({
                id: id
            }, function(data) {
                $scope.showAllSalvage();

            });
        }
    })
    .controller('CreateSalvageCtrl', function($scope, TemplateService, NavigationService, $timeout, $state) {
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
        $scope.formData = {};
        $scope.saveSalvage = function(formData) {

            NavigationService.salvageSave($scope.formData, function(data) {
                if (data.value == true) {
                    $state.go('salvage-list');
                }

            });
        }
    })
    .controller('EditSalvageCtrl', function($scope, TemplateService, NavigationService, $timeout, $state, $stateParams) {
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

        NavigationService.getOneSalvage($stateParams.id, function(data) {
            $scope.formData = data.data;
            console.log(data.data);

        });

        $scope.saveSalvage = function(formValid) {
            NavigationService.salvageEditSave($scope.formData, function(data) {
                if (data.value == true) {
                    $state.go('salvage-list');
                }
            });
        };
    })
    .controller('BankMasterCtrl', function($scope, TemplateService, NavigationService, $timeout, $state, $stateParams, toastr) {
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
        $scope.showAllCountries = function(keywordChange) {
            $scope.totalItems = undefined;
            if (keywordChange) {
                $scope.currentPage = 1;
            }
            NavigationService.searchBank({
                page: $scope.currentPage,
                keyword: $scope.search.keyword
            }, ++i, function(data, ini) {
                console.log(data.data);

                if (ini == i) {
                    console.log(data.data);
                    $scope.allBank = data.data.results;
                    $scope.totalItems = data.data.total;
                    $scope.maxRow = data.data.options.count;
                }
            });
        };

        $scope.changePage = function(page) {
            var goTo = "bankmaster-list";
            if ($scope.search.keyword) {
                goTo = "bankmaster-list";
            }
            $state.go(goTo, {
                page: page,
                keyword: $scope.search.keyword
            });
        };
        $scope.showAllCountries();

        $scope.deleteBank = function(id) {
            globalfunction.confDel(function(value) {
                if (value) {
                    NavigationService.deleteBank(id, function(data) {
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
        $scope.changeStatus = function(ind) {
            NavigationService.bankSave(ind, function(data) {
                if (data.value === true) {}
            });
        };
    })
    .controller('CreateBankmasterCtrl', function($scope, TemplateService, NavigationService, $timeout, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("bankmaster-detail");
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
        $scope.saveBank = function(formData) {

            NavigationService.bankSave($scope.formData, function(data) {
                if (data.value === true) {
                    $state.go('bankmaster-list');
                    toastr.success("Bank " + $scope.formData.name + " created successfully.", "Bank Created");
                } else {
                    toastr.error("Bank creation failed.", "Bank creation error");
                }
            });
        };
    })
    .controller('EditBankmasterCtrl', function($scope, TemplateService, NavigationService, $timeout, $state, $stateParams, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("bankmaster-detail");
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
        NavigationService.getOneBank($stateParams.id, function(data) {
            $scope.formData = data.data;
            console.log(data.data);

        });

        $scope.saveBank = function(formValid) {
            NavigationService.bankSave($scope.formData, function(data) {
                if (data.value === true) {
                    $state.go('bankmaster-list');
                    toastr.success("Bank " + $scope.formData.name + " created successfully.", "Bank Created");
                } else {
                    toastr.error("Bank creation failed.", "Bank creation error");
                }
            });
        };
    })
    .controller('CreateContactManagementCtrl', function($scope, TemplateService, NavigationService, $timeout, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("contactmanagement-detail");
        $scope.menutitle = NavigationService.makeactive("Contact Management");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
    })
    .controller('ContactManagementCtrl', function($scope, TemplateService, NavigationService, $timeout, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("contactmanagement-list");
        $scope.menutitle = NavigationService.makeactive("Contact Management List");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
    })
    .controller('CreateContactTypeCtrl', function($scope, TemplateService, NavigationService, $timeout, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("contacttype-detail");
        $scope.menutitle = NavigationService.makeactive("Contact Type");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
    })
    .controller('ContactTypeCtrl', function($scope, TemplateService, NavigationService, $timeout, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("contacttype-list");
        $scope.menutitle = NavigationService.makeactive("Contact Type List");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
    })
    .controller('CreateContactTypeOfficeCtrl', function($scope, TemplateService, NavigationService, $timeout, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("contacttypeoffice-detail");
        $scope.menutitle = NavigationService.makeactive("Contact Type of Office Type");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
    })
    .controller('ContactTypeOfficeCtrl', function($scope, TemplateService, NavigationService, $timeout, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("contacttypeoffice-list");
        $scope.menutitle = NavigationService.makeactive("Contact Type of Office List");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
    })
    .controller('CompanyCtrl', function($scope, TemplateService, NavigationService, $timeout, $state, $stateParams, toastr) {
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
        $scope.showAllCountries = function(keywordChange) {
            $scope.totalItems = undefined;
            if (keywordChange) {
                $scope.currentPage = 1;
            }
            NavigationService.searchCompany({
                page: $scope.currentPage,
                keyword: $scope.search.keyword
            }, ++i, function(data, ini) {
                console.log(data.data);

                if (ini == i) {
                    console.log(data.data);
                    $scope.allCompanies = data.data.results;
                    $scope.totalItems = data.data.total;
                    $scope.maxRow = data.data.options.count;

                }
            });
        };

        $scope.changePage = function(page) {
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

        $scope.deleteCompany = function(id) {
            globalfunction.confDel(function(value) {
                if (value) {
                    NavigationService.deleteCompany(id, function(data) {
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
    .controller('CreateCompanyCtrl', function($scope, TemplateService, NavigationService, $timeout, $state, toastr) {
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
        $scope.formData = {};
        $scope.saveCompany = function(formData) {
            NavigationService.companySave(formData, function(data) {
                if (data.value === true) {
                    $state.go('company-list');
                    toastr.success("company " + formData.name + " created successfully.", "company Created");
                } else {
                    toastr.error("company creation failed.", "company creation error");
                }
            });
        };
    })
    .controller('EditCompanyCtrl', function($scope, TemplateService, NavigationService, $timeout, $state, $stateParams, toastr) {
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

        NavigationService.getOneCompany($stateParams.id, function(data) {
            $scope.formData = data.data;
            // $scope.formData.country = data.data.
            console.log($scope.formData);
            $scope.formData.country = data.data.city.district.state.zone.country._id;
            $scope.formData.zone = data.data.city.district.state.zone._id;
            $scope.formData.state = data.data.city.district.state._id;
            $scope.formData.district = data.data.city.district._id;
            $scope.formData.city = data.data.city._id;
        });
        $scope.saveCompany = function(formValid) {
            NavigationService.companySave($scope.formData, function(data) {
                if (data.value === true) {
                    $state.go('company-list');
                    toastr.success("Company " + $scope.formData.name + " edited successfully.", "Company Edited");
                } else {
                    toastr.error("Company edition failed.", "Company editing error");
                }
            });
        };

    })
    .controller('CreateDistrictCtrl', function($scope, TemplateService, NavigationService, $timeout, $state, $stateParams, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("district-detail");
        $scope.menutitle = NavigationService.makeactive("District");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.formData = {};
        $scope.saveDistrict = function(formData) {
            NavigationService.districtSave($scope.formData, function(data) {
                if (data.value === true) {
                    $state.go('district-list');
                    toastr.success("District " + formData.name + " created successfully.", "District Created");
                } else {
                    toastr.error("District creation failed.", "District creation error");
                }
            });
        };
    })
    .controller('EditDistrictCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("district-detail");
        $scope.menutitle = NavigationService.makeactive("District");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "Edit District"
        };

        NavigationService.getOneDistrict($stateParams.id, function(data) {
            $scope.formData = data.data;
            $scope.formData.country = data.data.state.zone.country._id;
            $scope.formData.zone = data.data.state.zone._id;
            $scope.formData.state = data.data.state._id;
        });

        $scope.saveDistrict = function(formValid) {
            NavigationService.districtSave($scope.formData, function(data) {
                if (data.value === true) {
                    $state.go('district-list');
                    toastr.success("District " + $scope.formData.name + " edited successfully.", "District Edited");
                } else {
                    toastr.error("District edition failed.", "District editing error");
                }
            });
        };
    })
    .controller('CurrencyCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr) {
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
        $scope.showAllCountries = function(keywordChange) {
            $scope.totalItems = undefined;
            if (keywordChange) {
                $scope.currentPage = 1;
            }
            NavigationService.searchCurrency({
                page: $scope.currentPage,
                keyword: $scope.search.keyword
            }, ++i, function(data, ini) {
                console.log(data.data);

                if (ini == i) {
                    console.log(data.data);
                    $scope.allCurrencies = data.data.results;
                    $scope.totalItems = data.data.total;
                    $scope.maxRow = data.data.options.count;

                }
            });
        };

        $scope.changePage = function(page) {
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

        $scope.deleteCurrency = function(id) {
            globalfunction.confDel(function(value) {
                console.log(value);
                if (value) {
                    NavigationService.deleteCurrency(id, function(data) {
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
    .controller('CreateCurrencyCtrl', function($scope, TemplateService, NavigationService, $timeout, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("currency-detail");
        $scope.menutitle = NavigationService.makeactive("Currency");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "Create Currency"
        };
        $scope.formData = {};
        $scope.saveCurrency = function(formData) {

            NavigationService.currencySave($scope.formData, function(data) {
                if (data.value === true) {
                    $state.go('currency-list');
                    toastr.success("Currency " + $scope.formData.name + " created successfully.", "Currency Created");
                } else {
                    toastr.error("Currency creation failed.", "Currency creation error");
                }
            });
        };

    })
    .controller('EditCurrencyCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("currency-detail");
        $scope.menutitle = NavigationService.makeactive("Currency");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "Edit Currency"
        };

        NavigationService.getOneCurrency($stateParams.id, function(data) {
            $scope.formData = data.data;
        });

        $scope.saveCurrency = function(formValid) {

            NavigationService.currencySave($scope.formData, function(data) {
                if (data.value === true) {
                    $state.go('currency-list');
                    toastr.success("Currency " + $scope.formData.name + " created successfully.", "Currency Created");
                } else {
                    toastr.error("Currency creation failed.", "Currency creation error");
                }
            });
        };

    })
    .controller('CityCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr) {
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
        $scope.showAllCountries = function(keywordChange) {
            $scope.totalItems = undefined;
            if (keywordChange) {
                $scope.currentPage = 1;
            }
            NavigationService.searchCity({
                page: $scope.currentPage,
                keyword: $scope.search.keyword
            }, ++i, function(data, ini) {
                console.log(data.data);

                if (ini == i) {
                    console.log(data.data);
                    $scope.allCities = data.data.results;
                    $scope.totalItems = data.data.total;
                    $scope.maxRow = data.data.options.count;

                }
            });
        };

        $scope.changePage = function(page) {
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

        $scope.deleteCity = function(id) {
            globalfunction.confDel(function(value) {
                console.log(value);
                if (value) {
                    NavigationService.deleteCity(id, function(data) {
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
    .controller('CreateCityCtrl', function($scope, TemplateService, NavigationService, $timeout, $state, $stateParams, toastr) {
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
        $scope.saveCity = function(formData) {
            NavigationService.citySave($scope.formData, function(data) {
                if (data.value === true) {
                    $state.go('city-list');
                    toastr.success("City " + formData.name + " created successfully.", "City Created");
                } else {
                    toastr.error("City creation failed.", "City creation error");
                }
            });
        };
    })
    .controller('EditCityCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("city-detail");
        $scope.menutitle = NavigationService.makeactive("Edit City");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "Edit City"
        };
        NavigationService.getOneCity($stateParams.id, function(data) {
            $scope.formData = data.data;
            $scope.formData.country = data.data.district.state.zone.country._id;
            $scope.formData.zone = data.data.district.state.zone._id;
            $scope.formData.state = data.data.district.state._id;
            $scope.formData.district = data.data.district._id;
        });

        $scope.saveCity = function(formValid) {

            NavigationService.citySave($scope.formData, function(data) {
                if (data.value === true) {
                    $state.go('city-list');
                    toastr.success("City " + $scope.formData.name + " edited successfully.", "City Edited");
                } else {
                    toastr.error("City edition failed.", "City editing error");
                }
            });
        };
    })
    .controller('DepartmentCtrl', function($scope, TemplateService, NavigationService, $timeout) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("department-list");
        $scope.menutitle = NavigationService.makeactive("Department List");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.showAllDepartments = function() {
            NavigationService.getAllDepartments(function(data) {
                $scope.allDepartments = data.data;

            });
        };
        $scope.showAllDepartments();

        $scope.deleteDepartment = function(id) {

            NavigationService.deleteDepartment({
                id: id
            }, function(data) {
                $scope.showAllDepartments();

            });
        };

    })
    .controller('CreateDepartmentCtrl', function($scope, TemplateService, NavigationService, $timeout, $state) {
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
        $scope.saveDepartment = function(formData) {

            NavigationService.departmentSave($scope.formData, function(data) {
                console.log(data);
                if (data.value == true) {
                    $state.go('department-list');
                }
                // console.log('$scope.allCountriessave', $scope.data);

            });
        }

        NavigationService.getAllUniqueTypes(function(data) {
            $scope.allUniqueTypes = data.data;
            console.log('$scope.allUniqueTypes', $scope.allUniqueTypes);

        });

    })
    .controller('EditDepartmentCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams, $state) {
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

        NavigationService.getOneDepartment($stateParams.id, function(data) {
            $scope.formData = data.data;
            console.log('$scope.formData', $scope.formData);

        });

        $scope.saveDepartment = function(formValid) {

            //  if (formValid.$valid) {
            //  $scope.formComplete = true;
            NavigationService.departmentEditSave($scope.formData, function(data) {
                if (data.value == true) {
                    $state.go('department-list');
                }
            });
            //  }
        };
        NavigationService.getAllUniqueTypes(function(data) {
            $scope.allUniqueTypes = data.data;
            console.log('$scope.allUniqueTypes', $scope.allUniqueTypes);

        });

    })
    .controller('UniqueTypetCtrl', function($scope, TemplateService, NavigationService, $timeout) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("uniquetype-list");
        $scope.menutitle = NavigationService.makeactive("Unique Type List");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.showAllUniqueTypes = function() {
            NavigationService.getAllUniqueTypes(function(data) {
                $scope.allUniqueTypes = data.data;

            });
        };
        $scope.showAllUniqueTypes();

        $scope.deleteUniqueType = function(id) {

            NavigationService.deleteUniqueType({
                id: id
            }, function(data) {
                $scope.showAllUniqueTypes();

            });
        }

    })
    .controller('CreateUniqueTypeCtrl', function($scope, TemplateService, NavigationService, $timeout, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("uniquetype-detail");
        $scope.menutitle = NavigationService.makeactive("Unique Type");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "Create Unique Type"
        };
        $scope.formData = {};
        $scope.saveUniqueType = function(formData) {

            NavigationService.uniquetypeSave($scope.formData, function(data) {
                console.log(data);
                if (data.value == true) {
                    $state.go('uniquetype-list');
                }
                // console.log('$scope.allCountriessave', $scope.data);

            });
        }

        // NavigationService.getAllallUniqueTypes(function(data) {
        //     $scope.allUniqueTypes = data.data;
        //     console.log('$scope.allUniqueTypes', $scope.allUniqueTypes);
        //
        // });

    })
    .controller('EditUniqueTypeCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("uniquetype-detail");
        $scope.menutitle = NavigationService.makeactive("Unique Type");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "Edit Unique Type"
        };

        NavigationService.getOneUniqueType($stateParams.id, function(data) {
            $scope.formData = data.data;
            console.log('$scope.formData', $scope.formData);

        });

        $scope.saveUniqueType = function(formValid) {

            //  if (formValid.$valid) {
            //  $scope.formComplete = true;
            NavigationService.UniqueTypeEditSave($scope.formData, function(data) {
                if (data.value == true) {
                    $state.go('uniquetype-list');
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


.controller('CustomerSegmentCtrl', function($scope, TemplateService, NavigationService, $timeout) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("customerSegment-list");
        $scope.menutitle = NavigationService.makeactive("Customer Segment List");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.showAllCustomerSegments = function() {
            NavigationService.getAllCustomerSegments(function(data) {
                $scope.allCustomerSegments = data.data;

            });
        };
        $scope.showAllCustomerSegments();

        $scope.deleteCustomerSegment = function(id) {

            NavigationService.deleteCustomerSegment({
                id: id
            }, function(data) {
                $scope.showAllCustomerSegments();

            });
        }

    })
    .controller('CreateCustomerSegmentCtrl', function($scope, TemplateService, NavigationService, $timeout, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("customersegment-detail");
        $scope.menutitle = NavigationService.makeactive("Customer Segment");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "Create Customer Segment"
        };
        $scope.formData = {};
        $scope.saveCustomerSegment = function(formData) {

            NavigationService.customersegmentSave($scope.formData, function(data) {
                console.log(data);
                if (data.value == true) {
                    $state.go('customerSegment-list');
                }
                // console.log('$scope.allCountriessave', $scope.data);

            });
        }

        // NavigationService.getAllallUniqueTypes(function(data) {
        //     $scope.allUniqueTypes = data.data;
        //     console.log('$scope.allUniqueTypes', $scope.allUniqueTypes);
        //
        // });

    })
    .controller('EditCustomerSegmentCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("customersegment-detail");
        $scope.menutitle = NavigationService.makeactive("Customer Segment");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "Edit Customer Segment"
        };

        NavigationService.getOneCustomerSegment($stateParams.id, function(data) {
            $scope.formData = data.data;
            console.log('$scope.formData', $scope.formData);

        });

        $scope.saveCustomerSegment = function(formValid) {

            //  if (formValid.$valid) {
            //  $scope.formComplete = true;
            NavigationService.CustomerSegmentEditSave($scope.formData, function(data) {
                if (data.value == true) {
                    $state.go('customerSegment-list');
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


.controller('PolicyTypeCtrl', function($scope, TemplateService, NavigationService, $timeout) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("policyname-list");
        $scope.menutitle = NavigationService.makeactive("Policy Name List");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.showAllPolicyTypes = function() {
            NavigationService.getAllPolicyTypes(function(data) {
                $scope.allPolicyTypes = data.data;

            });
        };
        $scope.showAllPolicyTypes();

        $scope.deletePolicyType = function(id) {

            NavigationService.deletePolicyType({
                id: id
            }, function(data) {
                $scope.showAllPolicyTypes();

            });
        }

    })
    .controller('CreatePolicyTypeCtrl', function($scope, TemplateService, NavigationService, $timeout, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("policyname-detail");
        $scope.menutitle = NavigationService.makeactive("Policy Name");
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
            "name": "Create Policy Name"
        };
        $scope.formData = {};
        $scope.savePolicyType = function(formData) {

            NavigationService.policynameSave($scope.formData, function(data) {
                console.log(data);
                if (data.value == true) {
                    $state.go('policyname-list');
                }
                // console.log('$scope.allCountriessave', $scope.data);

            });
        }
        NavigationService.getAllDepartments(function(data) {
            $scope.allDepartments = data.data;

        });

    })
    .controller('EditPolicyTypeCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("policyname-detail");
        $scope.menutitle = NavigationService.makeactive("Policy Name");
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
            "name": "Edit Policy Name"
        };

        NavigationService.getOnePolicyType($stateParams.id, function(data) {
            $scope.formData = data.data;
            console.log('$scope.formData', $scope.formData);

        });

        $scope.savePolicyType = function(formValid) {

            //  if (formValid.$valid) {
            //  $scope.formComplete = true;
            NavigationService.PolicyTypeEditSave($scope.formData, function(data) {
                if (data.value == true) {
                    $state.go('policyname-list');
                }
            });
            //  }
        };

        NavigationService.getAllDepartments(function(data) {
            $scope.allDepartments = data.data;

        });

    })
    .controller('PolicyCtrl', function($scope, TemplateService, NavigationService, $timeout) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("policy-list");
        $scope.menutitle = NavigationService.makeactive("Policy List");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.showAllPolicies = function() {
            NavigationService.getAllPolicies(function(data) {
                $scope.allPolicies = data.data;

            });
        };
        $scope.showAllPolicies();

        $scope.deletePolicy = function(id) {

            NavigationService.deletePolicy({
                id: id
            }, function(data) {
                $scope.showAllPolicies();

            });
        }

    })
    .controller('CreatePolicyCtrl', function($scope, TemplateService, NavigationService, $timeout, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("policy-detail");
        $scope.menutitle = NavigationService.makeactive("Policy");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "Create Policy"
        };
        $scope.formData = {};
        $scope.savePolicy = function(formData) {

            NavigationService.policySave($scope.formData, function(data) {
                console.log(data);
                if (data.value == true) {
                    $state.go('policy-list');
                }
                // console.log('$scope.allCountriessave', $scope.data);

            });
        }
        NavigationService.getAllPolicyTypes(function(data) {
            $scope.allPolicyTypes = data.data;

        });

    })
    .controller('EditPolicyCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("policy-detail");
        $scope.menutitle = NavigationService.makeactive("Policy");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "Edit Policy"
        };

        NavigationService.getOnePolicy($stateParams.id, function(data) {
            $scope.formData = data.data;
            console.log('$scope.formData', $scope.formData);

        });

        $scope.savePolicy = function(formValid) {

            //  if (formValid.$valid) {
            //  $scope.formComplete = true;
            NavigationService.PolicyEditSave($scope.formData, function(data) {
                if (data.value == true) {
                    $state.go('policy-list');
                }
            });
            //  }
        };

        NavigationService.getAllPolicyTypes(function(data) {
            $scope.allPolicyTypes = data.data;

        });

    })

.controller('PolicyDocCtrl', function($scope, TemplateService, NavigationService, $timeout) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("policydoc-list");
        $scope.menutitle = NavigationService.makeactive("Policy Document List");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.showAllPolicyDocs = function() {
            NavigationService.getAllPolicyDocs(function(data) {
                $scope.allPolicyDocs = data.data;

            });
        };
        $scope.showAllPolicyDocs();

        $scope.deletePolicyDoc = function(id) {

            NavigationService.deletePolicyDoc({
                id: id
            }, function(data) {
                $scope.showAllPolicyDocs();

            });
        }

    })
    .controller('CreatePolicyDocCtrl', function($scope, TemplateService, NavigationService, $timeout, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("policydoc-detail");
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
        $scope.savePolicyDoc = function(formData) {

            NavigationService.policydocSave($scope.formData, function(data) {
                console.log(data);
                if (data.value == true) {
                    $state.go('policydoc-list');
                }
                // console.log('$scope.allCountriessave', $scope.data);

            });
        }
        NavigationService.getAllDepartments(function(data) {
            $scope.allDepartments = data.data;

        });
        NavigationService.getAllPolicyTypes(function(data) {
            $scope.allPolicyTypes = data.data;

        });

        $scope.dateOptions = {
            showWeeks: true
        };

        $scope.popup1 = {
            opened: false
        };
        $scope.popup2 = {
            opened: false
        };

        $scope.dateFrom = function() {
            $scope.popup1.opened = true;
        };
        $scope.dateTo = function() {
            $scope.popup2.opened = true;
        };

        $scope.format = 'dd-MMMM-yyyy';

    })
    .controller('EditPolicyDocCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("policydoc-detail");
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
            "name": "Edit Policy Doc"
        };

        NavigationService.getOnePolicyDoc($stateParams.id, function(data) {
            $scope.formData = data.data;
            console.log('$scope.formData', $scope.formData);

        });

        $scope.savePolicyDoc = function(formValid) {

            //  if (formValid.$valid) {
            //  $scope.formComplete = true;
            NavigationService.PolicyDocEditSave($scope.formData, function(data) {
                if (data.value == true) {
                    $state.go('policydoc-list');
                }
            });
            //  }
        };

        NavigationService.getAllDepartments(function(data) {
            $scope.allDepartments = data.data;

        });
        NavigationService.getAllPolicyTypes(function(data) {
            $scope.allPolicyTypes = data.data;

        });

    })

.controller('IndustryCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr) {
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
        $scope.showAllCountries = function(keywordChange) {
            $scope.totalItems = undefined;
            if (keywordChange) {
                $scope.currentPage = 1;
            }
            NavigationService.searchIndustry({
                page: $scope.currentPage,
                keyword: $scope.search.keyword
            }, ++i, function(data, ini) {
                console.log(data.data);

                if (ini == i) {
                    console.log(data.data);
                    $scope.allIndustries = data.data.results;
                    $scope.totalItems = data.data.total;
                    $scope.maxRow = data.data.options.count;

                }
            });
        };

        $scope.changePage = function(page) {
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

        $scope.deleteIndustry = function(id) {
            globalfunction.confDel(function(value) {
                console.log(value);
                if (value) {
                    NavigationService.deleteIndustry(id, function(data) {
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
        $scope.changeStatus = function(ind) {
            NavigationService.industrySave(ind, function(data) {
                if (data.value === true) {
                    $state.go('industry-list');
                }
            });
        };

    })
    .controller('CreateIndustryCtrl', function($scope, TemplateService, NavigationService, $timeout, $state, toastr) {
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
        $scope.saveIndustry = function(formData) {

            NavigationService.industrySave($scope.formData, function(data) {

                if (data.value === true) {
                    $state.go('industry-list');
                    toastr.success("Industry " + $scope.formData.name + " created successfully.", "Industry Created");
                } else {
                    toastr.error("Industry creation failed.", "Industry creation error");
                }
            });
        }

    })
    .controller('EditIndustryCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr) {
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

        NavigationService.getOneIndustry($stateParams.id, function(data) {
            $scope.formData = data.data;
        });

        $scope.saveIndustry = function(formValid) {

            NavigationService.industrySave($scope.formData, function(data) {
                if (data.value === true) {
                    $state.go('industry-list');
                    toastr.success("Industry " + $scope.formData.name + " created successfully.", "Industry Created");
                } else {
                    toastr.error("Industry creation failed.", "Industry creation error");
                }
            });
        };

    })
    .controller('CategoryCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr) {
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
        $scope.showAllCountries = function(keywordChange) {
            $scope.totalItems = undefined;
            if (keywordChange) {
                $scope.currentPage = 1;
            }
            NavigationService.searchCategory({
                page: $scope.currentPage,
                keyword: $scope.search.keyword
            }, ++i, function(data, ini) {
                console.log(data.data);

                if (ini == i) {
                    console.log(data.data);
                    $scope.allCategories = data.data.results;
                    $scope.totalItems = data.data.total;
                    $scope.maxRow = data.data.options.count;

                }
            });
        };

        $scope.changePage = function(page) {
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

        $scope.deleteCategory = function(id) {
            globalfunction.confDel(function(value) {
                if (value) {
                    NavigationService.deleteCategory(id, function(data) {
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
        $scope.changeStatus = function(ind) {
            NavigationService.categorySave(ind, function(data) {
                if (data.value === true) {}
            });
        };
    })
    .controller('CreateCategoryCtrl', function($scope, TemplateService, NavigationService, $timeout, $state, toastr) {
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
        $scope.saveCategory = function(formData) {
            NavigationService.categorySave($scope.formData, function(data) {
                if (data.value === true) {
                    $state.go('category-list');
                    toastr.success("Category " + formData.name + " created successfully.", "Category Created");
                } else {
                    toastr.error("Category creation failed.", "Category creation error");
                }
            });
        };
    })
    .controller('EditCategoryCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr) {
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

        NavigationService.getOneCategory($stateParams.id, function(data) {
            $scope.formData = data.data;
            console.log('$scope.formData', $scope.formData);

        });

        $scope.saveCategory = function(formValid) {
            NavigationService.categorySave($scope.formData, function(data) {
                if (data.value === true) {
                    $state.go('category-list');
                    toastr.success("Category " + $scope.formData.name + " edited successfully.", "Category Edited");
                } else {
                    toastr.error("Category edition failed.", "Category editing error");
                }
            });
        };
    })

.controller('FuncCtrl', function($scope, TemplateService, NavigationService, $timeout) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("func-list");
        $scope.menutitle = NavigationService.makeactive("Function List");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.showAllFunc = function() {
            NavigationService.getAllFunc(function(data) {
                $scope.allFunc = data.data;

            });
        };
        $scope.showAllFunc();

        $scope.deleteFunc = function(id) {

            NavigationService.deleteFunc({
                id: id
            }, function(data) {
                $scope.showAllFunc();

            });
        }

    })
    .controller('CreateFuncCtrl', function($scope, TemplateService, NavigationService, $timeout, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("func-detail");
        $scope.menutitle = NavigationService.makeactive("Function");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "Create Function"
        };
        $scope.formData = {};
        $scope.saveFunc = function(formData) {

            NavigationService.funcSave($scope.formData, function(data) {
                console.log(data);
                if (data.value == true) {
                    $state.go('func-list');
                }
                // console.log('$scope.allCountriessave', $scope.data);

            });
        }

    })
    .controller('EditFuncCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("func-detail");
        $scope.menutitle = NavigationService.makeactive("Function");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "Edit Function"
        };

        NavigationService.getOneFunc($stateParams.id, function(data) {
            $scope.formData = data.data;
            console.log('$scope.formData', $scope.formData);

        });

        $scope.saveFunc = function(formValid) {

            //  if (formValid.$valid) {
            //  $scope.formComplete = true;
            NavigationService.FuncEditSave($scope.formData, function(data) {
                if (data.value == true) {
                    $state.go('func-list');
                }
            });
        };

    })
    .controller('CauseLossCtrl', function($scope, TemplateService, NavigationService, $timeout) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("causeloss-list");
        $scope.menutitle = NavigationService.makeactive("Cause of Loss List");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.showAllCauseLoss = function() {
            NavigationService.getAllCauseLoss(function(data) {
                $scope.allCauseLoss = data.data;

            });
        };
        $scope.showAllCauseLoss();

        $scope.deleteCauseLoss = function(id) {

            NavigationService.deleteCauseLoss({
                id: id
            }, function(data) {
                $scope.showAllCauseLoss();

            });
        }

    })
    .controller('CreateCauseLossCtrl', function($scope, TemplateService, NavigationService, $timeout, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("causeloss-detail");
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
        $scope.formData = {};
        $scope.saveCauseLoss = function(formData) {

            NavigationService.causelossSave($scope.formData, function(data) {
                console.log(data);
                if (data.value == true) {
                    $state.go('causeloss-list');
                }
                // console.log('$scope.allCountriessave', $scope.data);

            });
        }
        NavigationService.getAllDepartments(function(data) {
            $scope.allDepartments = data.data;

        });

    })
    .controller('EditCauseLossCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("causeloss-detail");
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

        NavigationService.getOneCauseLoss($stateParams.id, function(data) {
            $scope.formData = data.data;
            console.log('$scope.formData', $scope.formData);

        });

        $scope.saveCauseLoss = function(formValid) {

            //  if (formValid.$valid) {
            //  $scope.formComplete = true;
            NavigationService.CauseLossEditSave($scope.formData, function(data) {
                if (data.value == true) {
                    $state.go('causeloss-list');
                }
            });
        };
        NavigationService.getAllDepartments(function(data) {
            $scope.allDepartments = data.data;

        });
    })
    .controller('NatureLossCtrl', function($scope, TemplateService, NavigationService, $timeout) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("natureloss-list");
        $scope.menutitle = NavigationService.makeactive("Nature of Loss List");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.showAllNatureLoss = function() {
            NavigationService.getAllNatureLoss(function(data) {
                $scope.allNatureLoss = data.data;

            });
        };
        $scope.showAllNatureLoss();

        $scope.deleteNatureLoss = function(id) {

            NavigationService.deleteNatureLoss({
                id: id
            }, function(data) {
                $scope.showAllNatureLoss();

            });
        }

    })
    .controller('CreateNatureLossCtrl', function($scope, TemplateService, NavigationService, $timeout, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("natureloss-detail");
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
        $scope.saveNatureLoss = function(formData) {

            NavigationService.naturelossSave($scope.formData, function(data) {
                console.log(data);
                if (data.value == true) {
                    $state.go('natureloss-list');
                }
                // console.log('$scope.allCountriessave', $scope.data);

            });
        }
        NavigationService.getAllDepartments(function(data) {
            $scope.allDepartments = data.data;

        });
        NavigationService.getAllCauseLoss(function(data) {
            $scope.allCauseLoss = data.data;

        });

    })
    .controller('EditNatureLossCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("natureloss-detail");
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

        NavigationService.getOneNatureLoss($stateParams.id, function(data) {
            $scope.formData = data.data;
            console.log('$scope.formData', $scope.formData);

        });

        $scope.saveNatureLoss = function(formValid) {

            //  if (formValid.$valid) {
            //  $scope.formComplete = true;
            NavigationService.NatureLossEditSave($scope.formData, function(data) {
                if (data.value == true) {
                    $state.go('natureloss-list');
                }
            });
        };
        NavigationService.getAllDepartments(function(data) {
            $scope.allDepartments = data.data;

        });
        NavigationService.getAllCauseLoss(function(data) {
            $scope.allCauseLoss = data.data;

        });
    })
    .controller('BusinessBranchCtrl', function($scope, TemplateService, NavigationService, $timeout) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("businessbranch-list");
        $scope.menutitle = NavigationService.makeactive("Business Branch List");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.showAllBusinessBranch = function() {
            NavigationService.getAllBusinessBranch(function(data) {
                $scope.allBusinessBranch = data.data;

            });
        };
        $scope.showAllBusinessBranch();

        $scope.deleteBusinessBranch = function(id) {

            NavigationService.deleteBusinessBranch({
                id: id
            }, function(data) {
                $scope.showAllBusinessBranch();

            });
        }

    })
    .controller('CreateBusinessBranchCtrl', function($scope, TemplateService, NavigationService, $timeout, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("businessbranch-detail");
        $scope.menutitle = NavigationService.makeactive("Business Branch");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "Create Business Branch"
        };
        $scope.formData = {};
        $scope.saveBusinessBranch = function(formData) {

            NavigationService.businessbranchSave($scope.formData, function(data) {
                console.log(data);
                if (data.value == true) {
                    $state.go('businessbranch-list');
                }
                // console.log('$scope.allCountriessave', $scope.data);

            });
        }

    })
    .controller('EditBusinessBranchCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("businessbranch-detail");
        $scope.menutitle = NavigationService.makeactive("Business Branch");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "Edit Business Branch"
        };

        NavigationService.getOneBusinessBranch($stateParams.id, function(data) {
            $scope.formData = data.data;
            console.log('$scope.formData', $scope.formData);

        });

        $scope.saveBusinessBranch = function(formValid) {

            //  if (formValid.$valid) {
            //  $scope.formComplete = true;
            NavigationService.BusinessBranchEditSave($scope.formData, function(data) {
                if (data.value == true) {
                    $state.go('businessbranch-list');
                }
            });
        };
    })









.controller('MenuCtrl', function($scope, TemplateService, NavigationService, $timeout) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("menu-list");
        $scope.menutitle = NavigationService.makeactive("Menu List");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.showAllMenus = function() {
            NavigationService.getAllMenus(function(data) {
                $scope.allMenus = data.data;
                console.log('$scope.allMenus', $scope.allZones);
            });

        };
        $scope.showAllMenus();


        $scope.deleteMenu = function(id) {

            NavigationService.deleteMenu({
                id: id
            }, function(data) {
                $scope.showAllMenus();

            });
        }


    })
    .controller('CreateMenuCtrl', function($scope, TemplateService, NavigationService, $timeout, $state) {
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
        $scope.saveMenu = function(formData) {

            NavigationService.menuSave($scope.formData, function(data) {
                console.log(data);
                if (data.value == true) {
                    $state.go('menu-list');
                }
                // console.log('$scope.allCountriessave', $scope.data);

            });
        }

        // NavigationService.getAllCountries(function(data) {
        //     $scope.allCountries = data.data;
        //     console.log('$scope.allCountries', $scope.allCountries);
        //
        // });

    })
    .controller('EditMenuCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams, $state) {
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

        NavigationService.getOneMenu($stateParams.id, function(data) {
            $scope.formData = data.data;
            // console.log('$scope.oneCountry', $scope.oneCountry);

        });

        $scope.saveMenu = function(formValid) {

            //  if (formValid.$valid) {
            //  $scope.formComplete = true;
            NavigationService.menuEditSave($scope.formData, function(data) {
                if (data.value == true) {
                    $state.go('menu-list');
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









.controller('RoleCtrl', function($scope, TemplateService, NavigationService, $timeout) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("role-list");
        $scope.menutitle = NavigationService.makeactive("Role List");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.showAllRoles = function() {
            NavigationService.getAllRoles(function(data) {
                $scope.allRoles = data.data;
                console.log('$scope.allRoles', $scope.allZones);
            });

        };
        $scope.showAllRoles();


        $scope.deleteRole = function(id) {

            NavigationService.deleteRole({
                id: id
            }, function(data) {
                $scope.showAllRoles();

            });
        }


    })
    .controller('CreateRoleCtrl', function($scope, TemplateService, NavigationService, $timeout, $state) {
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
        $scope.saveRole = function(formData) {

            NavigationService.roleSave($scope.formData, function(data) {
                console.log(data);
                if (data.value == true) {
                    $state.go('role-list');
                }
                // console.log('$scope.allCountriessave', $scope.data);

            });
        }

        NavigationService.getAllMenus(function(data) {
            $scope.allMenus = data.data;
            console.log('$scope.allMenus', $scope.allZones);
        });

    })
    .controller('EditRoleCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("role-detail");
        $scope.menutitle = NavigationService.makeactive("Role");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "Edit Role"
        };
        $scope.UserType = ['internal', 'external'];
        NavigationService.getOneRole($stateParams.id, function(data) {
            $scope.formData = data.data;
            // console.log('$scope.oneCountry', $scope.oneCountry);

        });

        $scope.saveRole = function(formValid) {

            //  if (formValid.$valid) {
            //  $scope.formComplete = true;
            NavigationService.roleEditSave($scope.formData, function(data) {
                if (data.value == true) {
                    $state.go('role-list');
                }
            });
            //  }
        };

        NavigationService.getAllMenus(function(data) {
            $scope.allMenus = data.data;
            console.log('$scope.allMenus', $scope.allZones);
        });

    })









.controller('UserCtrl', function($scope, TemplateService, NavigationService, $timeout) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("user-list");
        $scope.menutitle = NavigationService.makeactive("User List");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.UserType = ['internal', 'external'];
        $scope.showAllUsers = function() {
            NavigationService.getAllUsers(function(data) {
                $scope.allUsers = data.data;
                console.log('$scope.allUsers', $scope.allZones);
            });

        };
        $scope.showAllUsers();


        $scope.deleteUser = function(id) {

            NavigationService.deleteUser({
                id: id
            }, function(data) {
                $scope.showAllUsers();

            });
        }


    })
    .controller('CreateUserCtrl', function($scope, TemplateService, NavigationService, $timeout, $state) {
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
        $scope.saveUser = function(formData) {

            NavigationService.userSave($scope.formData, function(data) {
                console.log(data);
                if (data.value == true) {
                    $state.go('user-list');
                }
                // console.log('$scope.allCountriessave', $scope.data);

            });
        }

        NavigationService.getAllMenus(function(data) {
            $scope.allMenus = data.data;
            console.log('$scope.allMenus', $scope.allZones);
        });
        NavigationService.getAllRoles(function(data) {
            $scope.allRoles = data.data;
            console.log('$scope.allRoles', $scope.allZones);
        });
        NavigationService.getAllDepartments(function(data) {
            $scope.allDepartments = data.data;

        });

    })
    .controller('EditUserCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams, $state) {
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
        NavigationService.getOneUser($stateParams.id, function(data) {
            $scope.UserRole = data.data.role;
            console.log('inside', $scope.UserRole);
            $scope.formData = data.data;
            console.log('$scope.formData', $scope.formData);

        });

        $scope.saveUser = function(formValid) {

            //  if (formValid.$valid) {
            //  $scope.formComplete = true;
            NavigationService.userEditSave($scope.formData, function(data) {
                if (data.value == true) {
                    $state.go('user-list');
                }
            });
            //  }
        };

        NavigationService.getAllMenus(function(data) {
            $scope.allMenus = data.data;
            console.log('$scope.allMenus', $scope.allZones);
        });
        NavigationService.getAllRoles(function(data) {
            $scope.allRoles = data.data;
            console.log('$scope.allRoles', $scope.allZones);
        });
        NavigationService.getAllDepartments(function(data) {
            $scope.allDepartments = data.data;

        });

    })

.controller('BranchCreateCtrl', function($scope, TemplateService, NavigationService, $timeout, toastr, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("branch-create");
        $scope.menutitle = NavigationService.makeactive("Create Branch");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.formData = {};
        $scope.header = {
            "name": "Create Branch Master"
        };
        $scope.submit = function(formData) {
            NavigationService.branchSave($scope.formData, function(data) {
                if (data.value === true) {
                    $state.go('branch-list');
                    toastr.success("Branch " + $scope.formData.name + " created successfully.", "Branch Created");
                } else {
                    toastr.error("Branch creation failed.", "Branch creation error");
                }
            });
        };
    })
    .controller('BranchEditCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("branch-create");
        $scope.menutitle = NavigationService.makeactive("Edit Branch");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "Edit Branch"
        };
        NavigationService.getOneBranch($stateParams.id, function(data) {
            $scope.formData = data.data;
            $scope.formData.company = data.data.office.company;

        });

        $scope.submit = function(formValid) {
            NavigationService.branchSave($scope.formData, function(data) {
                if (data.value === true) {
                    $state.go('branch-list');
                    toastr.success("Branch " + $scope.formData.name + " edited successfully.", "Branch Edited");
                } else {
                    toastr.error("Branch edition failed.", "Branch editing error");
                }
            });
        };
    })

.controller('TimelineCtrl', function($scope, TemplateService, NavigationService, $timeout, $uibModal) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("timeline");
    $scope.menutitle = NavigationService.makeactive("Timeline");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $scope.email = {
        message: "Change"
    };
    $scope.emailtos = [{
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

    $scope.tinymceModel = 'Initial content';
    $scope.tinymceOptions = {
        plugins: 'link image code',
        toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
    };

    $scope.newEmail = function() {
        var modalInstance = $uibModal.open({
            scope: $scope,
            templateUrl: 'views/modal/modal-email.html',
            size: 'lg'
        });
    };

    $scope.newMessage = function() {
        var modalInstance = $uibModal.open({
            scope: $scope,
            templateUrl: 'views/modal/modal-message.html',
            size: 'lg'
        });
    };

    $scope.viewJIR = function() {
        var modalInstance = $uibModal.open({
            scope: $scope,
            templateUrl: 'views/modal/modal-files.html',
            size: 'md'
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

.controller('headerctrl', function($scope, TemplateService, $uibModal) {
    $scope.template = TemplateService;
    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        $(window).scrollTop(0);
    });
    globalfunction.confDel = function(callback) {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'views/modal/conf-delete.html',
            size: 'sm',
            scope: $scope
        });
        $scope.close = function(value) {
            callback(value);
            modalInstance.close("cancel");
        };
    };
})

.controller('languageCtrl', function($scope, TemplateService, $translate, $rootScope) {

    $scope.changeLanguage = function() {
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


.controller('CustomerCompanyCtrl', function($scope, TemplateService, NavigationService, $timeout) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("customerCompany-list");
        $scope.menutitle = NavigationService.makeactive("Customer Company List");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.showAllCustomerCompanies = function() {
            NavigationService.getAllCustomerCompanies(function(data) {
                $scope.allCustomerCompanies = data.data;
                console.log('$scope.allCustomerCompanies', $scope.allCustomerCompanies);

            });
        };
        $scope.showAllCustomerCompanies();
        $scope.deleteCustomerCompany = function(id) {

            NavigationService.deleteCustomerCompany({
                id: id
            }, function(data) {
                $scope.showAllCustomerCompanies();

            });
        }
    })
    .controller('CreateCustomerCompanyCtrl', function($scope, TemplateService, NavigationService, $timeout, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("customerCompany-detail");
        $scope.menutitle = NavigationService.makeactive("Customer Company");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "Create Customer Company"
        };
        $scope.formData = {};
        $scope.saveCustomerCompany = function(formData) {

            NavigationService.customerCompanySave($scope.formData, function(data) {
                if (data.value == true) {
                    $state.go('customerCompany-list');
                }

            });
        }

    })
    .controller('EditCustomerCompanyCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("customerCompany-detail");
        $scope.menutitle = NavigationService.makeactive("Customer Company");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "Edit Customer Company"
        };

        NavigationService.getOneCustomerCompany($stateParams.id, function(data) {
            $scope.formData = data.data;
        });

        $scope.saveCustomerCompany = function(formValid) {

            //  if (formValid.$valid) {
            //  $scope.formComplete = true;
            NavigationService.customerCompanyEditSave($scope.formData, function(data) {
                if (data.value == true) {
                    $state.go('customerCompany-list');
                }
            });
            //  }
        };

    })

.controller('CustomerCtrl', function($scope, TemplateService, NavigationService, $timeout, $state) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("customer-list");
    $scope.menutitle = NavigationService.makeactive("Customer");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $scope.showAllCustomers = function() {
        NavigationService.getAllCustomers(function(data) {
            $scope.allCustomers = data.data;
            console.log('$scope.allCustomers', $scope.allCustomers);

        });
    };
    $scope.showAllCustomers();

    $scope.deleteCustomer = function(id) {

        NavigationService.deleteCustomer({
            id: id
        }, function(data) {
            $scope.showAllCustomers();

        });
    }
})

.controller('CreateCustomerCtrl', function($scope, TemplateService, NavigationService, $timeout, $state, $uibModal) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("customer-detail");
        $scope.menutitle = NavigationService.makeactive("Create Customer");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.header = {
            "name": "Create Customer"
        };
        $scope.formData = {};
        $scope.userStatus = [{
            "name": "Active",
            "value": true
        }, {
            "name": "Inactive",
            "value": false
        }];
        $scope.salutations = ["Mr.", "Mrs.", "Ms.", "Dr."];

        $scope.popup = {
            birthDate: false
        };
        $scope.showing = false;
        $scope.passType = 'password';
        $scope.showPass = function() {
          $scope.showing = !$scope.showing;
          if($scope.showing === false) {
            $scope.passType = 'password';
          }
          else
          {
            $scope.passType = 'text';
          }
        };

        $scope.addOfficer = function() {
            var modalInstance = $uibModal.open({
                scope: $scope,
                templateUrl: 'views/modal/modal-officer.html',
                size: 'lg'
            });
        };
        $scope.saveCustomer = function() {
            console.log($scope.formData);
            // NavigationService.customerSave($scope.formData, function(data) {
            //     console.log(data);
            //     if (data.value == true) {
            //         $state.go('customer-list');
            //     }
            // });
        }
        NavigationService.getAllCustomerCompanies(function(data) {
            $scope.allCustomerCompanies = data.data;
            console.log('$scope.allCustomerCompanies', $scope.allCustomerCompanies);

        });
        NavigationService.getAllCustomerSegments(function(data) {
            $scope.allCustomerSegments = data.data;
        });
        NavigationService.getAllTypeOfOffices(function(data) {
            $scope.allTypeOfOffices = data.data;
            console.log('$scope.allTypeOfOffices', $scope.allTypeOfOffices);
        });

        NavigationService.getAllCountries(function(data) {
            $scope.allCountries = data.data;
            console.log('$scope.allCountries', $scope.allCountries);
        });
        NavigationService.getAllStates(function(data) {
            $scope.allStates = data.data;
            console.log('$scope.allStates', $scope.allStates);
        });
        NavigationService.getAllCities(function(data) {
            $scope.allCities = data.data;
            console.log('$scope.allCities', $scope.allCities);
        });


    })
    .controller('EditCustomerCtrl', function($scope, TemplateService, NavigationService, $timeout, $state, $stateParams, $uibModal) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("customer-detail");
        $scope.menutitle = NavigationService.makeactive("Edit Customer");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
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
        $scope.popup = {
            birthDate: false
        };
        $scope.showing = false;
        $scope.passType = 'password';
        $scope.showPass = function() {
          $scope.showing = !$scope.showing;
          if($scope.showing === false) {
            $scope.passType = 'password';
          }
          else
          {
            $scope.passType = 'text';
          }
        };
        $scope.addOfficer = function() {
            var modalInstance = $uibModal.open({
                scope: $scope,
                templateUrl: 'views/modal/modal-officer.html',
                size: 'lg'
            });
        };
        NavigationService.getOneCustomer($stateParams.id, function(data) {
            console.log(data.data.status);
            // if(data.data.status==true){
            //   data.data.status='Active';
            // }else{
            //   data.data.status='Inactive';
            // }
            $scope.formData = data.data;

            console.log('$scope.formData', $scope.formData);

        });
        $scope.saveCustomer = function(formData) {

            NavigationService.customerSave($scope.formData, function(data) {
                console.log($scope.formData.status);
                // if($scope.formData.status && $scope.formData.status=='Active'){
                //   console.log('ifffffffffff');
                //   data.data.status=false;
                // }else{
                //     console.log('elseeeeeeeeeeeeee');
                //   data.data.status=true;
                // }
                console.log(data.data.status);
                if (data.value == true) {
                    $state.go('customer-list');
                }
            });
        }
        NavigationService.getAllCustomerCompanies(function(data) {
            $scope.allCustomerCompanies = data.data;
            console.log('$scope.allCustomerCompanies', $scope.allCustomerCompanies);

        });
        NavigationService.getAllCustomerSegments(function(data) {
            $scope.allCustomerSegments = data.data;
        });
        NavigationService.getAllTypeOfOffices(function(data) {
            $scope.allTypeOfOffices = data.data;
            console.log('$scope.allTypeOfOffices', $scope.allTypeOfOffices);
        });
        NavigationService.getAllCountries(function(data) {
            $scope.allCountries = data.data;
            console.log('$scope.allCountries', $scope.allCountries);
        });
        NavigationService.getAllStates(function(data) {
            $scope.allStates = data.data;
            console.log('$scope.allStates', $scope.allStates);
        });
        NavigationService.getAllCities(function(data) {
            $scope.allCities = data.data;
            console.log('$scope.allCities', $scope.allCities);
        });
    })

.controller('MultipleSelectCtrl', function($scope, TemplateService, NavigationService, $timeout, $state, $stateParams, $filter, toastr) {
        var i = 0;
        $scope.getValues = function(filter, insertFirst) {
            var dataSend = {
                keyword: $scope.search.modelData,
                filter: filter,
                page: 1
            };
            NavigationService[$scope.api](dataSend, ++i, function(data) {
                if (data.value) {
                    $scope.list = data.data.results;

                    if ($scope.search.modelData) {
                        $scope.showCreate = true;
                        _.each($scope.list, function(n) {
                            if (_.lowerCase(n.name) == _.lowerCase($scope.search.modelData)) {
                                $scope.showCreate = false;
                                return 0;
                            }
                        });
                    } else {
                        $scope.showCreate = false;

                    }
                    if (insertFirst) {
                        if ($scope.list[0] && $scope.list[0]._id) {
                            $scope.sendData($scope.list[0]._id, $scope.list[0].name);
                        } else {
                            console.log("Making this happen");
                            $scope.sendData("", "");
                        }
                    }
                } else {
                    console.log("Making this happen2");
                    $scope.sendData("", "");
                }


            });
        };

        $scope.$watch('model', function(newVal, oldVal) {
            if (newVal && oldVal === undefined) {
                $scope.getValues({
                    _id: $scope.model
                }, true);
            }
            console.log("watch", newVal, oldVal);
        });


        $scope.$watch('filter', function(newVal, oldVal) {
            console.log("watch FILTER", newVal, oldVal);



            var filter = {};
            if ($scope.filter) {
                filter = JSON.parse($scope.filter);
            }
            var dataSend = {
                keyword: $scope.search.modelData,
                filter: filter,
                page: 1
            };

            NavigationService[$scope.api](dataSend, ++i, function(data) {
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
        $scope.showList = function() {
            $scope.listview = true;
            $scope.searchNew(true);
        };
        $scope.closeList = function() {
            $scope.listview = false;
        };
        $scope.closeListSlow = function() {
            console.log("Slow Called");
            $timeout(function() {
                $scope.closeList();
            }, 500);
        };
        $scope.searchNew = function(dontFlush) {
            if (!dontFlush) {
                $scope.model = "";
            }
            var filter = {};
            if ($scope.filter) {
                filter = JSON.parse($scope.filter);
            }
            $scope.getValues(filter);
        };
        $scope.createNew = function(create) {
            var newCreate = $filter("capitalize")(create);
            var data = {
                name: newCreate
            };
            if ($scope.filter) {
                data = _.assign(data, JSON.parse($scope.filter));
            }
            console.log(data);
            NavigationService[$scope.create](data, function(data) {
                if (data.value) {
                    toastr.success($scope.name + " Created Successfully", "Creation Success");
                    $scope.model = data.data._id;
                    $scope.ngName = data.data.name;
                } else {
                    toastr.error("Error while creating " + $scope.name, "Error");
                }
            });
            $scope.listview = false;
        };
        $scope.sendData = function(val, name) {
            $scope.search.modelData = name;
            $scope.ngName = name;
            $scope.model = val;
            $scope.listview = false;
        }
    })
    .controller('EditGradeCtrl', function($scope, TemplateService, NavigationService, $timeout, $state, $stateParams) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("grade-detail");
        $scope.menutitle = NavigationService.makeactive("Grade");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
    })
    .controller('CreateGradeCtrl', function($scope, TemplateService, NavigationService, $timeout, $state, $stateParams) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("grade-detail");
        $scope.menutitle = NavigationService.makeactive("Grade");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
    })
    .controller('GradeCtrl', function($scope, TemplateService, NavigationService, $timeout, $state, $stateParams) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("grade-list");
        $scope.menutitle = NavigationService.makeactive("Grade List");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
    })
    .controller('EditSurveyCodeCtrl', function($scope, TemplateService, NavigationService, $timeout, $state, $stateParams) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("surveycode-detail");
        $scope.menutitle = NavigationService.makeactive("Survey Code");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
    })
    .controller('CreateSurveyCodeCtrl', function($scope, TemplateService, NavigationService, $timeout, $state, $stateParams) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("surveycode-detail");
        $scope.menutitle = NavigationService.makeactive("Survey Code");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
    })
    .controller('SurveyCodeCtrl', function($scope, TemplateService, NavigationService, $timeout, $state, $stateParams) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("surveycode-list");
        $scope.menutitle = NavigationService.makeactive("Survey Code List");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
    })
    .controller('TransferOfficeCtrl', function($scope, TemplateService, NavigationService, $timeout, $state, $stateParams) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("transferOffice-detail");
        $scope.menutitle = NavigationService.makeactive("Transfer Office");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
    })
    .controller('CreateTransferOfficeCtrl', function($scope, TemplateService, NavigationService, $timeout, $state, $stateParams) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("transferOffice-detail");
        $scope.menutitle = NavigationService.makeactive("Transfer Office");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
    })
    .controller('TransferOfficeCtrl', function($scope, TemplateService, NavigationService, $timeout, $state, $stateParams) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("transferOffice-list");
        $scope.menutitle = NavigationService.makeactive("Transfer Office List");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
    })
    .controller('ActivityTypeCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr) {
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
      $scope.showAllCountries = function(keywordChange) {
        $scope.totalItems = undefined;
        if (keywordChange) {
          $scope.currentPage = 1;
        }
        NavigationService.searchTypeOfOffice({
          page: $scope.currentPage,
          keyword: $scope.search.keyword
        }, ++i, function(data, ini) {
          if (ini == i) {
            $scope.allTypeOfOffices = data.data.results;
            $scope.totalItems = data.data.total;
            $scope.maxRow = data.data.options.count;
          }
        });
      };

      $scope.changePage = function(page) {
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
      $scope.deleteTypeOfOffice = function(id) {
        globalfunction.confDel(function(value) {
          console.log(value);
          if (value) {
            NavigationService.deleteTypeOfOffice(id, function(data) {
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
    .controller('CreateActivityTypeCtrl', function($scope, TemplateService, NavigationService, $timeout, $state, toastr) {
      //Used to name the .html file
      $scope.template = TemplateService.changecontent("activityType-detail");
      $scope.menutitle = NavigationService.makeactive("Activity Type");
      TemplateService.title = $scope.menutitle;
      $scope.navigation = NavigationService.getnav();

      $scope.header = {
        "name": "Create Activity Type"
      };
      $scope.formData = {};
      $scope.savetypeOfOffice = function(formData) {

        NavigationService.typeofofficeSave($scope.formData, function(data) {
          if (data.value === true) {
            $state.go('typeOfOffice-list');
            toastr.success("Type Of Office " + $scope.formData.name + " created successfully.", "Type Of Office Created");
          } else {
            toastr.error("Type Of Office creation failed.", "Type Of Office creation error");
          }
        });
      };

    })
    .controller('EditActivityTypeCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr) {
      //Used to name the .html file
      $scope.template = TemplateService.changecontent("activityType-detail");
      $scope.menutitle = NavigationService.makeactive("Activity Type");
      TemplateService.title = $scope.menutitle;
      $scope.navigation = NavigationService.getnav();

      $scope.header = {
        "name": "Edit Activity Type"
      };

      NavigationService.getOnetypeOfOffice($stateParams.id, function(data) {
        $scope.formData = data.data;
      });

      $scope.savetypeOfOffice = function(formValid) {

        //  if (formValid.$valid) {
        //  $scope.formComplete = true;
        NavigationService.typeofofficeSave($scope.formData, function(data) {
          if (data.value === true) {
            $state.go('typeOfOffice-list');
            toastr.success("Type Of Office " + $scope.formData.name + " created successfully.", "Type Of Office Created");
          } else {
            toastr.error("Type Of Office creation failed.", "Type Of Office creation error");
          }
        });
        //  }
      };

    })
    .controller('ExpenseCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr) {
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
      $scope.showAllCountries = function(keywordChange) {
        $scope.totalItems = undefined;
        if (keywordChange) {
          $scope.currentPage = 1;
        }
        NavigationService.searchTypeOfOffice({
          page: $scope.currentPage,
          keyword: $scope.search.keyword
        }, ++i, function(data, ini) {
          if (ini == i) {
            $scope.allTypeOfOffices = data.data.results;
            $scope.totalItems = data.data.total;
            $scope.maxRow = data.data.options.count;
          }
        });
      };

      $scope.changePage = function(page) {
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
      $scope.deleteTypeOfOffice = function(id) {
        globalfunction.confDel(function(value) {
          console.log(value);
          if (value) {
            NavigationService.deleteTypeOfOffice(id, function(data) {
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
    .controller('CreateExpenseCtrl', function($scope, TemplateService, NavigationService, $timeout, $state, toastr) {
      //Used to name the .html file
      $scope.template = TemplateService.changecontent("expense-detail");
      $scope.menutitle = NavigationService.makeactive("Expense");
      TemplateService.title = $scope.menutitle;
      $scope.navigation = NavigationService.getnav();

      $scope.header = {
        "name": "Create Expense"
      };
      $scope.formData = {};
      $scope.savetypeOfOffice = function(formData) {

        NavigationService.typeofofficeSave($scope.formData, function(data) {
          if (data.value === true) {
            $state.go('typeOfOffice-list');
            toastr.success("Type Of Office " + $scope.formData.name + " created successfully.", "Type Of Office Created");
          } else {
            toastr.error("Type Of Office creation failed.", "Type Of Office creation error");
          }
        });
      };

    })
    .controller('EditExpenseCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr) {
      //Used to name the .html file
      $scope.template = TemplateService.changecontent("expense-detail");
      $scope.menutitle = NavigationService.makeactive("Expense");
      TemplateService.title = $scope.menutitle;
      $scope.navigation = NavigationService.getnav();

      $scope.header = {
        "name": "Edit Expense"
      };

      NavigationService.getOnetypeOfOffice($stateParams.id, function(data) {
        $scope.formData = data.data;
      });

      $scope.savetypeOfOffice = function(formValid) {

        //  if (formValid.$valid) {
        //  $scope.formComplete = true;
        NavigationService.typeofofficeSave($scope.formData, function(data) {
          if (data.value === true) {
            $state.go('typeOfOffice-list');
            toastr.success("Type Of Office " + $scope.formData.name + " created successfully.", "Type Of Office Created");
          } else {
            toastr.error("Type Of Office creation failed.", "Type Of Office creation error");
          }
        });
        //  }
      };

    })
    ;
