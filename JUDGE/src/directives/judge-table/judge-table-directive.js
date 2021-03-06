class JudgeTableDirective {

    constructor() {
        this.restrict = 'E';
        this.templateUrl = 'build/views/directives/judge-table/judge-table.html';
        this.replace = true;
        this.scope = {
            judges: '=',
            judgeCategories: '='
        }
        this.controller = 'judgeTableController';
        this.controllerAs = 'ctrl';
    }

    static directiveFactory() {
        JudgeTableDirective.instance = new JudgeTableDirective();
        return JudgeTableDirective.instance;
    }
}

app.directive('judgeTable', JudgeTableDirective.directiveFactory);