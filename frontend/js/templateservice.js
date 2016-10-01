var templateservicemod = angular.module('templateservicemod', ['navigationservice']);
templateservicemod.service('TemplateService', function(NavigationService, $filter) {
  this.title = "Home";
  this.meta = "Google";
  this.metadesc = "Home";
  this.pageMax = 10;
  this.profile = $.jStorage.get("profile");
  var d = new Date();
  this.year = d.getFullYear();

  this.init = function() {
    this.header = "frontend/views/header.html";
    this.menu = "frontend/views/menu.html";
    this.content = "frontend/views/content/content.html";
    this.footer = "frontend/views/footer.html";
    this.profile = $.jStorage.get("profile");
  };

  this.mrnumber = function(data, callback) {
    var MRNumber = "";
    var objectData = data;
    console.log(objectData);
    NavigationService.getOneCity(objectData.city, function(data) {
      MRNumber += data.data.district.state.zone.country.countryCode;
      NavigationService.getOneCompany(objectData.company, function(company) {
        MRNumber += company.data.companyCode;
        NavigationService.getOneClaim(objectData.typeOfClaim, function(claim) {
          MRNumber += claim.data.claimNumber;
          NavigationService.getOneNatureOfServey(objectData.natureOfSurvey, function(serveycode) {
            MRNumber += "-" + serveycode.data.code;
            NavigationService.getOneBranch(objectData.branch, function(branch) {
              MRNumber += branch.data.code;
              console.log(objectData.dateOfAppointment);
              MRNumber += "-" + $filter("date")(objectData.dateOfAppointment, "yy");
              MRNumber += $filter("date")(objectData.dateOfAppointment, "MM");
              MRNumber += "-" + $filter("numberFixedLen")(objectData.serialNumber, 4);
              callback(MRNumber);
            });

          });
        });

      });

    });

  };

  this.changecontent = function(page) {
    this.init();
    var data = this;
    data.content = "frontend/views/content/" + page + ".html";
    return data;
  };

  this.init();

});