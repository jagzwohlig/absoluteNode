angular.module('rolesController', ['templateservicemod', 'navigationservice', 'assignmenttemplate', 'ui.bootstrap', 'ui.select', 'ngAnimate', 'toastr', 'ngSanitize', 'angular-flexslider', 'ui.tinymce', 'imageupload', 'ngMap', 'toggle-switch', 'cfp.hotkeys', 'ui.sortable', 'infinite-scroll', 'dragularModule'])

    .controller('RolesCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, base64) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("roles");
        $scope.menutitle = NavigationService.makeactive("Roles");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.formData = {
            roles: [],
            name: ""
        };
        var obj = {
            mainMenu: "",
            subMenu: "",
            subThirdMenu: "",
            controller: "",
            view: {
                val: false,
                isExist: false
            },
            add: {
                val: false,
                isExist: false
            },
            edit: {
                val: false,
                isExist: false
            },
            delete: {
                val: false,
                isExist: false
            },
            addRequest: {
                val: false,
                isExist: false
            },
            modifyRequest: {
                val: false,
                isExist: false
            },
            approve: {
                val: false,
                isExist: false
            },
            reject: {
                val: false,
                isExist: false
            },
            viewAll: {
                val: false,
                isExist: false
            }
        };
        $scope.roles = [];

        function addRoles(menu1, menu2, menu3, controller, viewBool, addBool, editBool, deleteBool, addRequestBool, modifyRequestBool, approveBool, rejectBool, viewAllBool) {
            var o = _.cloneDeep(obj);
            o.mainMenu = menu1;
            o.subMenu = menu2;
            o.subThirdMenu = menu3;
            o.controller = controller;
            o.view.isExist = viewBool;
            o.add.isExist = addBool;
            o.edit.isExist = editBool;
            o.delete.isExist = deleteBool;
            o.addRequest.isExist = addRequestBool;
            o.modifyRequest.isExist = modifyRequestBool;
            o.approve.isExist = approveBool;
            o.reject.isExist = rejectBool;
            o.viewAll.isExist = viewAllBool;
            $scope.formData.roles.push(o);
        }
        addRoles("Email", "Inbox", "", "", true, false, false, false, false, false, false, false, true);
        addRoles("Company Setup", "Company", "", "", true, true, true, true, false, false, false, false, true);
        addRoles("Company Setup", "Type of Office", "", "", true, true, true, true, false, false, false, false, true);
        addRoles("Company Setup", "Office", "", "", true, true, true, true, false, false, false, false, true);
        addRoles("Company Setup", "Branch", "", "", true, true, true, true, false, false, false, false, true);
        addRoles("Location", "Zone", "", "", true, true, true, true, false, false, false, false, true);
        addRoles("Location", "State", "", "", true, true, true, true, false, false, false, false, true);
        addRoles("Location", "District", "", "", true, true, true, true, false, false, false, false, true);
        addRoles("Location", "City", "", "", true, true, true, true, false, false, false, false, true);
        addRoles("Products", "Industry", "", "", true, true, true, true, true, true, true, true, true);
        addRoles("Products", "Category", "", "", true, true, true, true, true, true, true, true, true);
        addRoles("Products", "Product", "", "", true, true, true, true, true, true, true, true, true);
        addRoles("Finance", "Currency", "", "", true, true, true, true, false, false, false, false, true);
        addRoles("Finance", "Banks", "", "", true, true, true, true, false, false, false, false, true);
        addRoles("Finance", "Activity Type", "", "", true, true, true, true, true, true, true, true, true);
        addRoles("Finance", "Expense", "", "", true, true, true, true, true, true, true, true, true);
        addRoles("Finance", "Tax", "", "", true, true, true, true, false, false, false, false, true);
        addRoles("Customer", "Segment", "", "", true, true, true, true, false, false, false, false, true);
        addRoles("Customer", "Company", "", "", true, true, true, true, false, false, false, false, true);
        addRoles("Customer", "Customer", "", "", true, true, true, true, false, false, false, false, true);
        addRoles("Employee", "Employee", "", "", true, true, true, true, false, false, false, false, true);
        addRoles("Employee", "Function", "", "", true, true, true, true, false, false, false, false, true);
        addRoles("Employee", "Grade", "", "", true, true, true, true, false, false, false, false, true);
        addRoles("Insurance", "Department", "", "", true, true, true, true, false, false, false, false, true);
        addRoles("Insurance", "Policy Type", "", "", true, true, true, true, true, true, true, true, true);
        addRoles("Insurance", "Policy Doc", "", "", true, true, true, true, false, false, false, false, true);
        addRoles("Insurance", "COL", "", "", true, true, true, true, true, true, true, true, true);
        addRoles("Insurance", "NOL", "", "", true, true, true, true, true, true, true, true, true);
        addRoles("Insurance", "Salvage", "", "", true, true, true, true, true, true, true, true, true);
        addRoles("Insurance", "Nature Of Survey Code", "", "", true, true, true, true, false, false, false, false, true);
        addRoles("Assignments", "Type Of Claims", "", "", true, true, true, true, false, false, false, false, true);
        addRoles("Assignments", "Assignment", "New", "", true, true, false, false, false, false, false, false, true);
        addRoles("Assignments", "Assignment", "Edit", "", true, true, false, false, false, false, false, false, true);
        addRoles("Assignments", "Assignment", "List", "", true, false, false, false, false, false, false, false, true);
        addRoles("Assignments", "Assignment", "Document Upload", "", true, true, true, true, false, false, false, false, true);
        addRoles("Assignments", "Assignment", "Document Download", "", true, false, true, true, false, false, false, false, true);
        addRoles("Assignments", "Assignment", "Photographs", "", true, true, true, true, false, false, false, false, true);
        addRoles("Assignments", "Assignment", "Transfer", "", true, true, false, false, false, false, false, false, true);
        addRoles("Assignments", "Assignment", "Force close request", "", true, true, false, false, false, false, false, false, true);
        addRoles("Assignments", "Assignment", "Force close approval", "", true, true, false, false, false, false, false, false, true);
        addRoles("Assignments", "Assignment", "Reopen Request", "", true, true, false, false, false, false, false, false, true);
        addRoles("Assignments", "Assignment", "Reopen Approval", "", true, true, false, false, false, false, false, false, true);
        addRoles("Assignments", "ILA", "New", "", true, true, false, false, false, false, false, false, true);
        addRoles("Assignments", "ILA", "Send for Authorize", "", true, true, false, false, false, false, false, false, true);
        addRoles("Assignments", "ILA", "Authorize", "", true, true, false, false, false, false, false, false, true);
        addRoles("Assignments", "ILA", "Revise", "", true, true, false, false, false, false, false, false, true);
        addRoles("Assignments", "ILA", "Release", "", true, true, false, false, false, false, false, false, true);
        addRoles("Assignments", "ILA", "Released", "", true, false, false, false, false, false, false, false, true);
        addRoles("Assignments", "LOR", "New", "", true, true, false, false, false, false, false, false, true);
        addRoles("Assignments", "LOR", "Send for authorize", "", true, true, false, false, false, false, false, false, true);
        addRoles("Assignments", "LOR", "Authorize", "", true, true, false, false, false, false, false, false, true);
        addRoles("Assignments", "LOR", "Revise", "", true, true, false, false, false, false, false, false, true);
        addRoles("Assignments", "LOR", "Release", "", true, true, false, false, false, false, false, false, true);
        addRoles("Assignments", "LOR", "Regenerate", "", true, true, false, false, false, false, false, false, true);
        addRoles("Assignments", "LOR", "Status", "", true, true, false, false, false, false, false, false, true);
        addRoles("Templates", "LOR", "", "", true, true, true, true, false, false, false, false, true);
        addRoles("Templates", "ILA", "", "", true, true, true, true, false, false, false, false, true);
        addRoles("Templates", "ISR", "", "", true, true, true, true, false, false, false, false, true);
        addRoles("Reimbursement", "Reimbursement Detail", "Request", "", true, true, true, true, false, false, false, false, true);
        addRoles("Reimbursement", "Reimbursement Detail", "Approval", "", true, false, true, false, false, false, true, true, true);
        addRoles("Reimbursement", "Reimbursement Detail", "Disbusement", "", true, true, true, true, false, false, false, false, true);
        addRoles("Knowledge Base", "Knowledge Base list", "Access", "", true, true, true, false, false, false, false, false, true);
        addRoles("Knowledge Base", "Knowledge Base list", "Request", "", true, true, true, false, false, false, false, false, true);
        addRoles("Knowledge Base", "Knowledge Base list", "Approval", "", true, true, true, false, false, false, false, false, true);
        addRoles("Invoice", "Invoice", "New", "", true, true, false, false, false, false, false, false, true);
        addRoles("Invoice", "Invoice", "Send for Authorize", "", true, true, false, false, false, false, false, false, true);
        addRoles("Invoice", "Invoice", "Authorize", "", true, true, false, false, false, false, false, false, true);
        addRoles("Invoice", "Invoice", "Revise", "", true, true, false, false, false, false, false, false, true);
        addRoles("Invoice", "Invoice", "Release", "", true, true, false, false, false, false, false, false, true);
        addRoles("Invoice", "Invoice", "Cancle", "", true, true, false, false, false, false, false, false, true);
        addRoles("Invoice", "Invoice", "Regenerate", "", true, true, false, false, false, false, false, false, true);

          $scope.saveModel = function (formData) {
            NavigationService.modelSave("Role", $scope.formData, function (data) {
                if (data.value === true) {
                    $window.history.back();
                    toastr.success($scope.modelCap + " " + formData.name + " created successfully.", $scope.modelCap + " Created");
                } else {
                    toastr.error($scope.modelCap + " creation failed.", $scope.modelCap + " creation error");
                }
            });
        };
         $scope.viewAll = function (index,state) {
            _.each($scope.formData.roles[index],function(n){
                if(n.isExist==true){
                    n.val=state;
                }
            });
        };
    });