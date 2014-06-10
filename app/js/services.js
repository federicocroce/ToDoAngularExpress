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
//        this.update = function (blogItemId, blogItem) {
//            return $http.post('/editPost', blogItem);
//        };
//
        //remove blogItem matching by id
        this.deleteFinish = function () {
            return $http.delete('/deleteFinish');
            
        };
}); 
