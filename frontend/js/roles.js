angular.module('rolesController', ['templateservicemod', 'navigationservice', 'assignmenttemplate', 'ui.bootstrap', 'ui.select', 'ngAnimate', 'toastr', 'ngSanitize', 'angular-flexslider', 'ui.tinymce', 'imageupload', 'ngMap', 'toggle-switch', 'cfp.hotkeys', 'ui.sortable', 'infinite-scroll', 'dragularModule'])

    .controller('RolesCtrl', function ($scope, $window, TemplateService, NavigationService, $timeout, base64) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("roles");
        $scope.menutitle = NavigationService.makeactive("Roles");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
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
                val: true,
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
            $scope.roles.push(o);
        }


        addRoles("Email", "Inbox", "", "", true);
        addRoles("Company Setup", "Company", "", "", true, true, true, true);
        addRoles("Company Setup", "Type of Office", "", "", true, true, true, true);
        addRoles("Company Setup", "Office", "", "", true, true, true, true);
        addRoles("Company Setup", "Branch", "", "", true, true, true, true);

    });