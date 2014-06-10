'use strict';

app.controller('myTasksCtrl', function($scope, taskService) {

    //get all elements
    $scope.getAll = function() {
        taskService.getAll()
            .success(function (data, status, headers, config) {
                $scope.tasks = data;
            })
            .error(function(data, status, headers, config) {
                //toaster.pop('error', current);
            });
    }

    // Call to blogService.create()
    $scope.addTask = function() {
        if ($scope.newTask !== '') {

            var taskData = {
                name : $scope.newTask,
                finish : false
            };
            taskService.create(taskData)
                .success(function (current, status, headers, config) {
                    $scope.getAll();
//                  $location.path("/posts");
//                toaster.pop('success', "Post saved successfully!");
                })
                .error(function(current, status, headers, config) {
//                toaster.pop('error', current);
                });

            $scope.newTask = '';

        } else {
            $scope.invalidTask = true;
        }
    };

    $scope.newTaskValue = function () {
        if ($scope.newTask !== '')
            $scope.invalidTask = false;
    };


//    //get single post
//    $scope.getById = function() {
//        taskService.getById($routeParams.postId)
//            .success(function (current, status, headers, config) {
//                $scope.current = current;
//            })
//            .error(function(current, status, headers, config) {
////                toaster.pop('error', current);
//            });
//    };

    // update post information. Call to blogService.update()
//    $scope.updatePost = function() {
//        taskService.update($scope.current.id, $scope.current)
//            .success(function (current, status, headers, config) {
//                $location.path("/posts/"+$scope.current.id);
//                toaster.pop('success', "Post updated successfully!");
//            })
//            .error(function(current, status, headers, config) {
////                toaster.pop('error', current);
//            });
//    };

    // removePost function
    $scope.removePost = function () {
        taskService.remove($scope.current.id)
            .success(function (current, status, headers, config) {
                $location.path("/posts/");
//                toaster.pop('success', "Post removed successfully!");
            })
            .error(function(current, status, headers, config) {
//                toaster.pop('error', current);
            });
    }

    $scope.deleteFinish = function () {
        var oldTasks = $scope.tasks;
        $scope.tasks = [];
        angular.forEach(oldTasks, function (task) {
            if (!task.finish) $scope.tasks.push(task);
        });
    };

    $scope.deleteAll = function () {
//        debugger;
        taskService.clear()
            .success(function (current, status, headers, config) {
                    $scope.getAll();
//                  $location.path("/posts");
//                toaster.pop('success', "Post saved successfully!");
            })
            .error(function(current, status, headers, config) {
                  $scope.getAll();
//                toaster.pop('error', current);
            });
        $scope.getAll();
    };

    //call this method at first!
    $scope.getAll();
});