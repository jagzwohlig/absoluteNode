var templateservicemod = angular.module('templateservicemod', ['navigationservice']);
templateservicemod.service('TemplateService', function ($filter,NavigationService) {
  this.title = "Home";
  this.meta = "Google";
  this.metadesc = "Home";
  this.isLoader = false;
  this.removeLoaderNum = 0;
  this.removeLoaderTemp = 0;
  this.pageMax = 10;
  this.profile = $.jStorage.get("profile");
  var d = new Date();
  var role = $.jStorage.get("role");
  this.year = d.getFullYear();

  this.setRole = function () {
    role = $.jStorage.get("role");
  };

  this.currency = {
    numeral: true,
    numeralThousandsGroupStyle: 'thousand'
  };
  this.currencyNoDecimal = {
    numeral: true,
    numeralThousandsGroupStyle: 'thousand',
    numeralDecimalScale: 0
  };

  this.vehicle = {
    uppercase: true
  };

  this.init = function () {

    this.header = "frontend/views/header.html";
    this.menu = "frontend/views/menu.html";
    this.isLoader = false;
    this.content = "frontend/views/content/content.html";
    this.footer = "frontend/views/footer.html";
    this.profile = $.jStorage.get("profile");
    this.removeLoaderTemp = 0;
    this.removeLoaderNum = 0;
  };

  // this.removeLoader = function() {
  //     this.removeLoaderTemp++;
  //     if (this.removeLoaderTemp >= this.removeLoaderNum) {
  //         this.isLoader = false;
  //     }
  // };
  this.getLoader = function () {
    this.isLoader = true;
  };
  this.removeLoader = function () {
    this.isLoader = false;
  };
  // this.removeLoaderOn = function(num) {
  //     this.isLoader = true;
  //     this.removeLoaderNum = num;
  // };

  // this.mrnumber = function (data, callback) {
  //   var MRNumber = "";
  //   var objectData = data;
  //   console.log(objectData);
  //   NavigationService.getOneCity(objectData.city, function (data) {

  //     MRNumber += data.data.district.state.zone.country.countryCode;
  //     NavigationService.getOneCompany(objectData.company, function (company) {
  //       MRNumber += company.data.companyCode;
  //       NavigationService.getOneClaim(objectData.typeOfClaim, function (claim) {
  //         MRNumber += claim.data.claimNumber;
  //         NavigationService.getOneNatureOfServey(objectData.natureOfSurvey, function (serveycode) {
  //           MRNumber += "-" + serveycode.data.code;
  //           NavigationService.getOneBranch(objectData.branch, function (branch) {
  //             MRNumber += branch.data.code;
  //             console.log(objectData.dateOfAppointment);
  //             MRNumber += "-" + $filter("date")(objectData.dateOfAppointment, "yy");
  //             MRNumber += $filter("date")(objectData.dateOfAppointment, "MM");
  //             MRNumber += "-" + $filter("numberFixedLen")(objectData.serialNumber, 4);
  //             callback(MRNumber);
  //           });

  //         });
  //       });

  //     });

  //   });

  // };

  this.changecontent = function (page, state) {
    this.init();
    var data = this;
    var role = $.jStorage.get("role");
    data.content = "frontend/views/content/" + page + ".html";
    if (state) {
      var stateName = state.current.name;
      data.role = role;
      data.currentRole = _.filter(role.roles, function (n) {
        var index = _.indexOf(n.states, stateName);
        if (index >= 0) {
          return true;
        } else {
          return false;
        }
      });
      if (data.currentRole.length > 0) {
        data.currentRole = data.currentRole[0];
      }
      var assignmentFilter = _.filter(role.roles, {
        "subMenu": "Assignment"
      });
      console.log(assignmentFilter);
      data.assignmentRole = _.groupBy(assignmentFilter, "subThirdMenu");
      console.log(data.assignmentRole);
      _.each(data.assignmentRole, function (n, key) {
        data.assignmentRole[key] = n[0];
      });
      console.log(data.assignmentRole);
    }
    NavigationService.getNavByRole(role);
    return data;
  };

  this.init();

  this.getRole = function (data) {
    console.log("Role", role);
  };

  this.getAssignmentRole = function (subMenu, thirdMenu) {
    role = $.jStorage.get("role");
    var assignRole = _.filter(role.roles, function (n) {
      var level1Test = (n.mainMenu == "Assignments");
      var level2Test = (n.subMenu == subMenu);
      var level3Test = (n.subThirdMenu == thirdMenu);
      return level1Test && level2Test && level3Test;
    });
    if (assignRole.length > 0) {
      return assignRole[0].view.val;
    } else {
      return false;
    }
  };
  template = this;
});
var template = {};