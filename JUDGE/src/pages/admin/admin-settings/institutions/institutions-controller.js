class InstitutionsController {

    static resolve() {
        return {
                institutions: ['institutionService', (institutionService) => {
                    return institutionService.get()
                        .then((data) => {
                            return data;
                        })
                }],
                judgeCategories: ['judgeCategoryService', (judgeCategoryService) => {
                    return judgeCategoryService.get({active: 1})
                        .then((data) => {
                            return data;
                        })
                }]
            }
    }

    constructor(institutionService, institutions, judgeCategories) {
        this.institutionService = institutionService;
        this.institutions = institutions;
        this.judgeCategories = judgeCategories;
        this.institution = {judgeCategoryId: '', active: '1'};
        this.modal = false;
        this.editModal = false;
        this.canEdit = false;
    }

    add() {
        this.institutionService.create(this.institution)
            .then((institution) => {
                angular.element('.modal').modal('close');
                this.reset();
                this.setModal();
                _.forEach(this.judgeCategories, (judgeCategory) => {
                    if(judgeCategory.judgeCategoryId === institution.judgeCategoryId) {
                        institution.category = judgeCategory.title;
                    }
                });
                this.institutions.push(institution);
                this.institution = {judgeCategory: '', active: '1'};
            });
    }

    edit() {
        this.institutionService.update(this.institution)
            .then(() => {
                _.forEach(this.institutions, (institution) => {
                    if(angular.equals(institution, this.original)) {
                        // This iterates through each key for the model and applies the new update
                        // This is crucial to making the UI updates
                        _.forEach(institution, (value, key) => {
                             if(this.institution[key]) {
                                 institution[key] = this.institution[key];
                             }
                             if(key === 'judgeCategoryId') {
                                _.forEach(this.judgeCategories, (judgeCategory) => {
                                    if(judgeCategory.judgeCategoryId === institution.judgeCategoryId) {
                                        institution.category = judgeCategory.title;
                                    }
                                });
                             }
                        })
                    }
                });
                angular.element('.modal').modal('close');
                this.reset();
                this.setModal();
                this.institution = {judgeCategoryId: '', active: '1'};
            });

    }

    cancel() {
        this.institution = {active: '1'};
        this.reset();
        this.setModal();
        this.canEdit = false;
    }

    // Resets the select fields.
    // Based on: http://stackoverflow.com/questions/37399188/jquery-materialize-changing-select-option-back-to-disabled-select-on-clear
    reset() {
        var selects = angular.element(document.querySelectorAll('select'));
        _.forEach(selects, (select) => {
            select = angular.element(select);
            //select.val('None'); //Different approach here required for some reason
            //select.material_select();
        })
    }

    activate(institution) {
        institution.active = '1';
        this.institutionService.update(institution);
    }

    deactivate(institution) {
        institution.active = '0';
        this.institutionService.update(institution);
    }

    setModal() {
        this.modal = this.modal ? false : true;
    }

    setEdit(institution) {
        this.canEdit = true;
        this.original = institution;
        this.institution = angular.copy(this.original);
    }

    setEditModal() {
        this.editModal = this.editModal ? false : true;
    }

}

InstitutionsController.$inject = ['institutionService', 'institutions', 'judgeCategories'];
app.controller('institutionsController', InstitutionsController);