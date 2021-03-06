class JudgeFormController {

    static resolve() {
        return {
                awards: ['awardService', (awardService) => {
                    return awardService.get({active: 1})
                        .then((data) => {
                            return data;
                        });
                }],
                form: ['formService', '$stateParams', (formService, $stateParams) => {
                    return formService.get({formId: $stateParams.formId})
                        .then((data) => {
                            return data[0];
                        });
                }],
                formQuestions: ['form', 'formQuestionService', (form, formQuestionService) => {
                    if(form.formId) {
                        return formQuestionService.get({formId: form.formId})
                            .then((data) => {
                                return data;
                            });
                    } else {
                        return [];
                    }
                }],
                questionSections: ['questionSectionService', (questionSectionService) => {
                    return questionSectionService.get({active: 1})
                        .then((data) => {
                            return data;
                        });
                }],
                questions: ['questionService', (questionService) => {
                    return questionService.get({active: 1})
                        .then((data) => {
                            return data;
                        });
                }]
            }
    }

    constructor($scope, $state, awards, form, formQuestions, questions, questionSections, formService, formQuestionService, notificationService) {
        this.awards = awards;
        this.questions = questions;
        this.questionSections = questionSections;
        this.originalForm = form;
        this.form = angular.copy(this.originalForm);
        this.form.judged = '1';
        this.originalFormQuestions = formQuestions;
        this.formQuestions = angular.copy(this.originalFormQuestions);
        this.formService = formService;
        this.formQuestionService = formQuestionService;
        this.notificationService = notificationService;
        this.$state = $state;
        this.scores = [
                { id: '1', label: 'poor' },
                { id: '2', label: 'adequate'},
                { id: '3', label: 'fair' },
                { id: '4', label: 'good' },
                { id: '5', label: 'excellent' }
            ];
        this.setupForm();
    }

    submit() {
        if(!_.isEqual(this.form, this.originalForm)) {
            this.formService.update(this.form)
                .then((data) => {
                    this.originalForm = angular.copy(this.form);
                    if(!_.isEqualWith(this.formQuestions, this.originalFormQuestions, (newVal, originalVal) => {
                        var match = true;
                        _.forEach(newVal, (val, key) => {
                            if(val.score !== originalVal[key].score) {
                                match = false;
                            }
                        })
                        return match;
                    })) {
                        this.formQuestionService.update(this.formQuestions)
                            .then((data) => {
                                this.originalFormQuestions = angular.copy(this.formQuestions);
                                this.$state.go('home.judge.dashboard');
                            });
                    } else {
                        this.$state.go('home.judge.dashboard');
                    }
                });
        } else {
            this.notificationService.error('No changes to submit!');
        }
    }

    cancel() {
        this.form = angular.copy(this.originalForm);
        this.form.judged = '1';
        this.$state.go('home.judge.dashboard');
    }

    // This creates form questions if its the first time accessing the page
    setupForm() {
        if(this.formQuestions.length === 0) {
            _.forEach(this.questions, (question) => {
                var formQuestion = { formId: this.form.formId, questionId: question.questionId, section: question.section, description: question.description, score: 0 };
                this.formQuestions.push(formQuestion);
            });
            this.formQuestionService.create(this.formQuestions);
            this.originalFormQuestions = angular.copy(this.formQuestions);
        }
    }

    sum() {
        this.form.total = 0;
        _.forEach(this.formQuestions, (formQuestion) => {
            this.form.total += parseInt(formQuestion.score);
        });
    }

}

JudgeFormController.$inject = ['$scope', '$state', 'awards', 'form', 'formQuestions', 'questions', 'questionSections', 'formService', 'formQuestionService', 'notificationService'];
app.controller('judgeFormController', JudgeFormController);