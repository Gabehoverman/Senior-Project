class NavbarDirective {

    constructor() {
        this.restrict = 'E';
        this.replace = true;
        this.scope = {
            hideSide: '='
        };
        this.templateUrl = 'build/views/directives/navbar/navbar.html';
        this.controller = 'navbarController';
        this.controllerAs = 'ctrl';
    }

    static directiveFactory() {
        NavbarDirective.instance = new NavbarDirective();
        return NavbarDirective.instance;
    }

}
app.directive('navbar', NavbarDirective.directiveFactory);