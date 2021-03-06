class AdminService extends BaseApiService {

    static serviceFactory($injector) {
        AdminService.instance = new AdminService($injector);
        return AdminService.instance;
    }

    constructor($injector) {
        super($injector, 'admins', 'admin');
    }

    updatePassword(object) {
        var deferred = this.$q.defer();

        var backendSafeObject = this.sanitizeObject(object);

        var url = this.baseUrl + this.serviceUrl + '/update_password';
        this.$http.post(url, backendSafeObject)
            .then((response) => {
                this.notificationService.success('Successfully updated password!');
                deferred.resolve(response.data[0]);
            })
            .catch((error) => {
                this.notificationService.error('Failed to update password! Make sure the old password was correct!');
                deferred.reject(error);
            })
        return deferred.promise;
    }

        updateOtherAdminPassword(object) {
        var deferred = this.$q.defer();

        var backendSafeObject = this.sanitizeObject(object);

        var url = this.baseUrl + this.serviceUrl + '/update_other_admin_password';
        this.$http.post(url, backendSafeObject)
            .then((response) => {
                this.notificationService.success('Successfully updated password!');
                deferred.resolve(response.data[0]);
            })
            .catch((error) => {
                this.notificationService.error('Failed to update password!');
                deferred.reject(error);
            })
        return deferred.promise;
    }

    delete(object) {
        super.update(object);
    }

}

AdminService.$inject = ['$injector'];
app.factory('adminService', AdminService.serviceFactory);