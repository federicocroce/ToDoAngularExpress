'use strict';

/* Services */
app.service('taskService', function ($http, $location) {
        
        var urlBase = "/api/myTasks";
    
        //return the array
        this.getAll = function () {
           return $http.get('/api/myTasks');
        }
       
//        //search by id in the current array
//        this.getById = function (blogItemId) {
//            return $http.get('/api/myPosts/'+blogItemId);
//        };
    
        //add a new element to array
        this.create = function (taskData) {
            return $http.put('/newTask', taskData);
        };

        this.clear = function () {
            return $http.delete('/clearTask');
        };
//
//        //update blogItem matching by id
        this.updateTaskState = function (taskId) {
            return $http.post('/editTaskState/'+taskId);
        };



    this.editName = function (task) {
        return $http.post('/editTaskName', task);
    };
//

        //remove blogItem matching by id
        this.deleteFinish = function () {
            return $http.delete('/deleteFinish');
            
        };
}); 
