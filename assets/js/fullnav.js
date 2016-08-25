// var adminURL = "";
// if(isproduction)
// {

//   adminURL =  "http://www.wohlig.co.in/demo/index.php";
// }
// else {
//   adminURL = "http://localhost/demo/index.php";
// }
// var adminurl = "http://localhost:1337/";
var adminurl = "http://104.199.175.10/";
var imgurl = adminurl + "upload/";



// var adminurl = "http://104.199.175.10/";
// var imgurl = adminurl + "upload/";

var imgpath = imgurl + "readFile";
var uploadurl = imgurl;


var navigationservice = angular.module('navigationservice', [])

.factory('NavigationService', function($http) {
    var navigation = [
      {
        name: "Dashboard",
        classis: "active",
        anchor: "dashboard",
        icon: "dashboard",
        subnav: [{
            name: "Dashboard",
            classis: "active",
            anchor: "dashboard",
            icon: "dashboard"
        }]
    },
    {
        name: "Company Setup",
        classis: "active",
        anchor: "company",
        icon: "building",
        subnav: [
          {
            name: "Company",
            classis: "active",
            anchor: "company-list",
            icon: "building"
        }, {
            name: "Branch",
            classis: "active",
            anchor: "branch-list",
            icon: "link"
        }, {
            name: "Type Of Office",
            classis: "active",
            anchor: "typeOfOffice-list",
            icon: "building"
        }, {
            name: "Function",
            classis: "active",
            anchor: "func-list",
            icon: "cogs"
        }, {
            name: "Menu",
            classis: "active",
            anchor: "menu-list",
            icon: "bars"
        }, {
            name: "Role",
            classis: "active",
            anchor: "role-list",
            icon: "user-plus"
        }, {
            name: "Contact Management",
            classis: "active",
            anchor: "contactmanagement-list",
            icon: "briefcase"
        }, {
            name: "Contact Type",
            classis: "active",
            anchor: "contacttype-list",
            icon: "list-ul"
        }, {
            name: "Contact Types of Office",
            classis: "active",
            anchor: "contacttypeoffice-list",
            icon: "th-list"
        }]
    },
    {
        name: "Customers",
        classis: "active",
        anchor: "company",
        icon: "users",
        subnav: [{
            name: "Customer Segment",
            classis: "active",
            anchor: "customersegment-list",
            icon: "user"
        }, {
            name: "Customer Company",
            classis: "active",
            anchor: "customerCompany-list",
            icon: "building"
        }, {
            name: "Office",
            classis: "active",
            anchor: "office-list",
            icon: "building-o"
        }, {
            name: "Customer",
            classis: "active",
            anchor: "customer-list",
            icon: "user"
        }]
    },
    {
        name: "Employee",
        classis: "active",
        anchor: "company",
        icon: "user",
        subnav: [{
                name: "Employee",
                classis: "active",
                anchor: "employee-list",
                icon: "user"
            }, {
                name: "User",
                classis: "active",
                anchor: "user-list",
                icon: "users"
            }, {
                name: "Role",
                classis: "active",
                anchor: "role-list",
                icon: "user-plus"
            }, {
                name: "Function",
                classis: "active",
                anchor: "func-list",
                icon: "cogs"
            }, {
                name: "Grade",
                classis: "active",
                anchor: "grade-list",
                icon: "font"
            }
        ]
    },
    {
        name: "Companies",
        classis: "active",
        anchor: "company",
        icon: "briefcase",
        subnav: [{
            name: "Company",
            classis: "active",
            anchor: "company-list",
            icon: "building"
        }, {
            name: "Office",
            classis: "active",
            anchor: "office-list",
            icon: "building-o"
        }]
    },
    {
        name: "Locations",
        classis: "active",
        anchor: "company",
        icon: "map",
        subnav: [{
            name: "Country",
            classis: "active",
            anchor: "country-list",
            icon: "globe"
        }, {
            name: "Zone",
            classis: "active",
            anchor: "zone-list",
            icon: "location-arrow"
        }, {
            name: "State",
            classis: "active",
            anchor: "state-list",
            icon: "link"
        }, {
            name: "District",
            classis: "active",
            anchor: "district-list",
            icon: "link"
        }, {
            name: "City",
            classis: "active",
            anchor: "city-list",
            icon: "link"
        }]
    },
    {
        name: "Insurance",
        classis: "active",
        anchor: "company",
        icon: "file-text-o",
        subnav: [{
            name: "Department",
            classis: "active",
            anchor: "department-list",
            icon: "user"
        }, {
            name: "Policy Type",
            classis: "active",
            anchor: "policyname-list",
            icon: "link"
        }, {
            name: "Policy Document",
            classis: "active",
            anchor: "policydoc-list",
            icon: "file-pdf-o"
        }, {
            name: "Cause Loss",
            classis: "active",
            anchor: "causeloss-list",
            icon: "money"
        }, {
            name: "Nature Loss",
            classis: "active",
            anchor: "natureloss-list",
            icon: "money"
        }, {
            name: "Salvage",
            classis: "active",
            anchor: "salvage-list",
            icon: "retweet"
        }]
    },
    {
        name: "Products",
        classis: "active",
        anchor: "company",
        icon: "puzzle-piece",
        subnav: [{
            name: "Industry",
            classis: "active",
            anchor: "industry-list",
            icon: "building"
        }, {
            name: "Category",
            classis: "active",
            anchor: "category-list",
            icon: "clone"
        }, {
            name: "Product",
            classis: "active",
            anchor: "product-list",
            icon: "shopping-bag"
        }]
    },
    {
        name: "Finance",
        classis: "active",
        anchor: "company",
        icon: "line-chart",
        subnav: [{
            name: "Currency",
            classis: "active",
            anchor: "currency-list",
            icon: "inr"
        }, {
            name: "Banks",
            classis: "active",
            anchor: "bankmaster-list",
            icon: "building"
        }]
    },
     {
        name: "Timeline",
        classis: "active",
        anchor: "timeline",
        icon: "calendar",
        subnav: [{
            name: "Music Broadcast Ltd",
            classis: "active",
            anchor: "timeline",
            icon: "music"
        }]
    }];

    return {
        getnav: function() {
            return navigation;
        },
        makeactive: function(menuname) {
            for (var i = 0; i < navigation.length; i++) {
                if (navigation[i].name == menuname) {
                    navigation[i].classis = "active";
                } else {
                    navigation[i].classis = "";
                }
            }
            return menuname;
        },
        getAllCountries: function(callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'country/getAll',
                method: 'POST',
                withCredentials: true
            }).success(callback);
        },
        countrySave: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'country/saveData',
                method: 'POST',
                withCredentials: true,
                data: formData
            }).success(callback);
        },
        getOneCountry: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'country/getOne',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id
                }
            }).success(callback);
        },
        countryEditSave: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'country/saveData',
                method: 'POST',
                withCredentials: true,
                data: id
            }).success(callback);
        },
        deleteCountry: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'country/delete',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id.id,
                }
            }).success(callback);
        },

        getAllZones: function(callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'zone/getAll',
                method: 'POST',
                withCredentials: true
            }).success(callback);
        },
        zoneSave: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'zone/saveData',
                method: 'POST',
                withCredentials: true,
                data: formData
            }).success(callback);
        },
        getOneZone: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'zone/getOne',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id
                }
            }).success(callback);
        },
        zoneEditSave: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'zone/saveData',
                method: 'POST',
                withCredentials: true,
                data: id
            }).success(callback);
        },
        deleteZone: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'zone/delete',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id.id,
                }
            }).success(callback);
        },


        getAllStates: function(callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'state/getAll',
                method: 'POST',
                withCredentials: true
            }).success(callback);
        },
        stateSave: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'state/saveData',
                method: 'POST',
                withCredentials: true,
                data: formData
            }).success(callback);
        },
        getOneState: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'state/getOne',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id
                }
            }).success(callback);
        },
        stateEditSave: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'state/saveData',
                method: 'POST',
                withCredentials: true,
                data: id
            }).success(callback);
        },
        deleteState: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'state/delete',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id.id,
                }
            }).success(callback);
        },


        getAllDistricts: function(callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'district/getAll',
                method: 'POST',
                withCredentials: true
            }).success(callback);
        },
        districtSave: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'district/saveData',
                method: 'POST',
                withCredentials: true,
                data: formData
            }).success(callback);
        },
        getOneDistrict: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'district/getOne',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id
                }
            }).success(callback);
        },
        districtEditSave: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'district/saveData',
                method: 'POST',
                withCredentials: true,
                data: id
            }).success(callback);
        },
        deleteDistrict: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'district/delete',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id.id,
                }
            }).success(callback);
        },



        getAllCurrencies: function(callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'currencies/getAll',
                method: 'POST',
                withCredentials: true
            }).success(callback);
        },
        currencySave: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'currencies/saveData',
                method: 'POST',
                withCredentials: true,
                data: formData
            }).success(callback);
        },
        getOneCurrency: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'currencies/getOne',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id
                }
            }).success(callback);
        },
        currencyEditSave: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'currencies/saveData',
                method: 'POST',
                withCredentials: true,
                data: id
            }).success(callback);
        },
        deleteCurrency: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'currencies/delete',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id.id,
                }
            }).success(callback);
        },




        getAllCities: function(callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'city/getAll',
                method: 'POST',
                withCredentials: true
            }).success(callback);
        },
        citySave: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'city/saveData',
                method: 'POST',
                withCredentials: true,
                data: formData
            }).success(callback);
        },
        getOneCity: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'city/getOne',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id
                }
            }).success(callback);
        },
        cityEditSave: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'city/saveData',
                method: 'POST',
                withCredentials: true,
                data: id
            }).success(callback);
        },
        deleteCity: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'city/delete',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id.id,
                }
            }).success(callback);
        },



        getAllOffices: function(callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'office/getAll',
                method: 'POST',
                withCredentials: true
            }).success(callback);
        },
        officeSave: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'office/saveData',
                method: 'POST',
                withCredentials: true,
                data: formData
            }).success(callback);
        },
        getOneOffice: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'office/getOne',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id
                }
            }).success(callback);
        },
        officeEditSave: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'office/saveData',
                method: 'POST',
                withCredentials: true,
                data: id
            }).success(callback);
        },
        deleteOffice: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'office/delete',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id.id,
                }
            }).success(callback);
        },




        getAllTypeOfOffices: function(callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'TypeOfOffice/getAll',
                method: 'POST',
                withCredentials: true
            }).success(callback);
        },
        typeOfOfficeSave: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'TypeOfOffice/saveData',
                method: 'POST',
                withCredentials: true,
                data: formData
            }).success(callback);
        },
        getOnetypeOfOffice: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'TypeOfOffice/getOne',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id
                }
            }).success(callback);
        },
        typeOfOfficeEditSave: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'TypeOfOffice/saveData',
                method: 'POST',
                withCredentials: true,
                data: id
            }).success(callback);
        },
        deleteTypeOfOffice: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'TypeOfOffice/delete',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id.id,
                }
            }).success(callback);
        },




        getAllDepartments: function(callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'department/getAll',
                method: 'POST',
                withCredentials: true
            }).success(callback);
        },
        departmentSave: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'department/saveData',
                method: 'POST',
                withCredentials: true,
                data: formData
            }).success(callback);
        },
        getOneDepartment: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'department/getOne',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id
                }
            }).success(callback);
        },
        departmentEditSave: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'department/saveData',
                method: 'POST',
                withCredentials: true,
                data: id
            }).success(callback);
        },
        deleteDepartment: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'department/delete',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id.id,
                }
            }).success(callback);
        },

        getAllUniqueTypes: function(callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'UniqueTypes/getAll',
                method: 'POST',
                withCredentials: true
            }).success(callback);
        },
        uniquetypeSave: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'UniqueTypes/saveData',
                method: 'POST',
                withCredentials: true,
                data: formData
            }).success(callback);
        },
        getOneUniqueType: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'UniqueTypes/getOne',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id
                }
            }).success(callback);
        },
        UniqueTypeEditSave: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'UniqueTypes/saveData',
                method: 'POST',
                withCredentials: true,
                data: id
            }).success(callback);
        },
        deleteUniqueType: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'UniqueTypes/delete',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id.id,
                }
            }).success(callback);
        },




        getAllCustomerSegments: function(callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'CustomerSegment/getAll',
                method: 'POST',
                withCredentials: true
            }).success(callback);
        },
        customersegmentSave: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'CustomerSegment/saveData',
                method: 'POST',
                withCredentials: true,
                data: formData
            }).success(callback);
        },
        getOneCustomerSegment: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'CustomerSegment/getOne',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id
                }
            }).success(callback);
        },
        CustomerSegmentEditSave: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'CustomerSegment/saveData',
                method: 'POST',
                withCredentials: true,
                data: id
            }).success(callback);
        },
        deleteCustomerSegment: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'CustomerSegment/delete',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id.id,
                }
            }).success(callback);
        },

        getAllPolicyTypes: function(callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'policyname/getAll',
                method: 'POST',
                withCredentials: true
            }).success(callback);
        },
        policynameSave: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'policyname/saveData',
                method: 'POST',
                withCredentials: true,
                data: formData
            }).success(callback);
        },
        getOnePolicyType: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'policyname/getOne',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id
                }
            }).success(callback);
        },
        PolicyTypeEditSave: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'policyname/saveData',
                method: 'POST',
                withCredentials: true,
                data: id
            }).success(callback);
        },
        deletePolicyType: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'policyname/delete',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id.id,
                }
            }).success(callback);
        },

        getAllPolicies: function(callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'policy/getAll',
                method: 'POST',
                withCredentials: true
            }).success(callback);
        },
        policySave: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'policy/saveData',
                method: 'POST',
                withCredentials: true,
                data: formData
            }).success(callback);
        },
        getOnePolicy: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'policy/getOne',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id
                }
            }).success(callback);
        },
        PolicyEditSave: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'policy/saveData',
                method: 'POST',
                withCredentials: true,
                data: id
            }).success(callback);
        },
        deletePolicy: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'policy/delete',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id.id,
                }
            }).success(callback);
        },
        getAllPolicyDocs: function(callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'policydoc/getAll',
                method: 'POST',
                withCredentials: true
            }).success(callback);
        },
        policydocSave: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'policydoc/saveData',
                method: 'POST',
                withCredentials: true,
                data: formData
            }).success(callback);
        },
        getOnePolicyDoc: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'policydoc/getOne',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id
                }
            }).success(callback);
        },
        PolicyDocEditSave: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'policydoc/saveData',
                method: 'POST',
                withCredentials: true,
                data: id
            }).success(callback);
        },
        deletePolicyDoc: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'policydoc/delete',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id.id,
                }
            }).success(callback);
        },
        getAllIndustries: function(callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'industry/getAll',
                method: 'POST',
                withCredentials: true
            }).success(callback);
        },
        industrySave: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'industry/saveData',
                method: 'POST',
                withCredentials: true,
                data: formData
            }).success(callback);
        },
        getOneIndustry: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'industry/getOne',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id
                }
            }).success(callback);
        },
        IndustryEditSave: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'industry/saveData',
                method: 'POST',
                withCredentials: true,
                data: id
            }).success(callback);
        },
        deleteIndustry: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'industry/delete',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id.id,
                }
            }).success(callback);
        },
        getAllCategories: function(callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'category/getAll',
                method: 'POST',
                withCredentials: true
            }).success(callback);
        },
        categorySave: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'category/saveData',
                method: 'POST',
                withCredentials: true,
                data: formData
            }).success(callback);
        },
        getOneCategory: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'category/getOne',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id
                }
            }).success(callback);
        },
        CategoryEditSave: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'category/saveData',
                method: 'POST',
                withCredentials: true,
                data: id
            }).success(callback);
        },
        deleteCategory: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'category/delete',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id.id,
                }
            }).success(callback);
        },
        getAllFunc: function(callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'func/getAll',
                method: 'POST',
                withCredentials: true
            }).success(callback);
        },
        funcSave: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'func/saveData',
                method: 'POST',
                withCredentials: true,
                data: formData
            }).success(callback);
        },
        getOneFunc: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'func/getOne',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id
                }
            }).success(callback);
        },
        FuncEditSave: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'func/saveData',
                method: 'POST',
                withCredentials: true,
                data: id
            }).success(callback);
        },
        deleteFunc: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'func/delete',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id.id,
                }
            }).success(callback);
        },
        getAllCauseLoss: function(callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'causeloss/getAll',
                method: 'POST',
                withCredentials: true
            }).success(callback);
        },
        causelossSave: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'causeloss/saveData',
                method: 'POST',
                withCredentials: true,
                data: formData
            }).success(callback);
        },
        getOneCauseLoss: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'causeloss/getOne',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id
                }
            }).success(callback);
        },
        CauseLossEditSave: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'causeloss/saveData',
                method: 'POST',
                withCredentials: true,
                data: id
            }).success(callback);
        },
        deleteCauseLoss: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'causeloss/delete',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id.id,
                }
            }).success(callback);
        },
        getAllNatureLoss: function(callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'natureloss/getAll',
                method: 'POST',
                withCredentials: true
            }).success(callback);
        },
        naturelossSave: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'natureloss/saveData',
                method: 'POST',
                withCredentials: true,
                data: formData
            }).success(callback);
        },
        getOneNatureLoss: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'natureloss/getOne',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id
                }
            }).success(callback);
        },
        NatureLossEditSave: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'natureloss/saveData',
                method: 'POST',
                withCredentials: true,
                data: id
            }).success(callback);
        },
        deleteNatureLoss: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'natureloss/delete',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id.id,
                }
            }).success(callback);
        },

        getAllBusinessBranch: function(callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'businessbranch/getAll',
                method: 'POST',
                withCredentials: true
            }).success(callback);
        },
        businessbranchSave: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'businessbranch/saveData',
                method: 'POST',
                withCredentials: true,
                data: formData
            }).success(callback);
        },
        getOneBusinessBranch: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'businessbranch/getOne',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id
                }
            }).success(callback);
        },
        BusinessBranchEditSave: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'businessbranch/saveData',
                method: 'POST',
                withCredentials: true,
                data: id
            }).success(callback);
        },
        deleteBusinessBranch: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'businessbranch/delete',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id.id,
                }
            }).success(callback);
        },
        getAllMenus: function(callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'menu/getAll',
                method: 'POST',
                withCredentials: true
            }).success(callback);
        },
        menuSave: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'menu/saveData',
                method: 'POST',
                withCredentials: true,
                data: formData
            }).success(callback);
        },
        getOneMenu: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'menu/getOne',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id
                }
            }).success(callback);
        },
        menuEditSave: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'menu/saveData',
                method: 'POST',
                withCredentials: true,
                data: id
            }).success(callback);
        },
        deleteMenu: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'menu/delete',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id.id,
                }
            }).success(callback);
        },
        getAllRoles: function(callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'role/getAll',
                method: 'POST',
                withCredentials: true
            }).success(callback);
        },
        roleSave: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'role/saveData',
                method: 'POST',
                withCredentials: true,
                data: formData
            }).success(callback);
        },
        getOneRole: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'role/getOne',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id
                }
            }).success(callback);
        },
        roleEditSave: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'role/saveData',
                method: 'POST',
                withCredentials: true,
                data: id
            }).success(callback);
        },
        deleteRole: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'role/delete',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id.id,
                }
            }).success(callback);
        },
        getAllUsers: function(callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'user/getAll',
                method: 'POST',
                withCredentials: true
            }).success(callback);
        },
        userSave: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'user/saveData',
                method: 'POST',
                withCredentials: true,
                data: formData
            }).success(callback);
        },
        getOneUser: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'user/getOne',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id
                }
            }).success(callback);
        },
        userEditSave: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'user/saveData',
                method: 'POST',
                withCredentials: true,
                data: id
            }).success(callback);
        },
        deleteUser: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'user/delete',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id.id,
                }
            }).success(callback);
        },
        getAllCustomerCompanies: function(callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'customerCompany/getAll',
                method: 'POST',
                withCredentials: true
            }).success(callback);
        },
        customerCompanySave: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'customerCompany/saveData',
                method: 'POST',
                withCredentials: true,
                data: formData
            }).success(callback);
        },
        getOneCustomerCompany: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'customerCompany/getOne',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id
                }
            }).success(callback);
        },
        customerCompanyEditSave: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'customerCompany/saveData',
                method: 'POST',
                withCredentials: true,
                data: id
            }).success(callback);
        },
        deleteCustomerCompany: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'customerCompany/delete',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id.id,
                }
            }).success(callback);
        },


        getAllCompanies: function(callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'company/getAll',
                method: 'POST',
                withCredentials: true
            }).success(callback);
        },
        customerSave: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'company/saveData',
                method: 'POST',
                withCredentials: true,
                data: formData
            }).success(callback);
        },
        getOneCompany: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'company/getOne',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id
                }
            }).success(callback);
        },
        companyEditSave: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'company/saveData',
                method: 'POST',
                withCredentials: true,
                data: id
            }).success(callback);
        },
        deleteCompany: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'company/delete',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id.id,
                }
            }).success(callback);
        },

        getAllCustomers: function(callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'customer/getAll',
                method: 'POST',
                withCredentials: true
            }).success(callback);
        },
        customerSave: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'customer/saveData',
                method: 'POST',
                withCredentials: true,
                data: formData
            }).success(callback);
        },
        getOneCustomer: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'customer/getOne',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id
                }
            }).success(callback);
        },
        customerEditSave: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'customer/saveData',
                method: 'POST',
                withCredentials: true,
                data: id
            }).success(callback);
        },
        deleteCustomer: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'customer/delete',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id.id,
                }
            }).success(callback);
        },
        getAllEmployees: function(callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'employee/getAll',
                method: 'POST',
                withCredentials: true
            }).success(callback);
        },
        employeeSave: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'employee/saveData',
                method: 'POST',
                withCredentials: true,
                data: formData
            }).success(callback);
        },
        getOneEmployee: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'employee/getOne',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id
                }
            }).success(callback);
        },
        employeeEditSave: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'employee/saveData',
                method: 'POST',
                withCredentials: true,
                data: id
            }).success(callback);
        },
        deleteEmployee: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'employee/delete',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id.id,
                }
            }).success(callback);
        },
        getAllSalvage: function(callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'salvage/getAll',
                method: 'POST',
                withCredentials: true
            }).success(callback);
        },
        salvageSave: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'salvage/saveData',
                method: 'POST',
                withCredentials: true,
                data: formData
            }).success(callback);
        },
        getOneSalvage: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'salvage/getOne',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id
                }
            }).success(callback);
        },
        salvageEditSave: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'salvage/saveData',
                method: 'POST',
                withCredentials: true,
                data: id
            }).success(callback);
        },
        deleteSalvage: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'salvage/delete',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id.id,
                }
            }).success(callback);
        },
        getAllProduct: function(callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'product/getAll',
                method: 'POST',
                withCredentials: true
            }).success(callback);
        },
        productSave: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'product/saveData',
                method: 'POST',
                withCredentials: true,
                data: formData
            }).success(callback);
        },
        getOneProduct: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'product/getOne',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id
                }
            }).success(callback);
        },
        productEditSave: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'product/saveData',
                method: 'POST',
                withCredentials: true,
                data: id
            }).success(callback);
        },
        deleteProduct: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'product/delete',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id.id,
                }
            }).success(callback);
        },



        getAllBank: function(callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'bank/getAll',
                method: 'POST',
                withCredentials: true
            }).success(callback);
        },
        bankSave: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'bank/saveData',
                method: 'POST',
                withCredentials: true,
                data: formData
            }).success(callback);
        },
        getOneBank: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'bank/getOne',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id
                }
            }).success(callback);
        },
        bankEditSave: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'bank/saveData',
                method: 'POST',
                withCredentials: true,
                data: id
            }).success(callback);
        },
        deleteBank: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'bank/delete',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id.id,
                }
            }).success(callback);
        },

    };
});
