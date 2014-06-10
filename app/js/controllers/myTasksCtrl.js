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


    //get single post
    $scope.getById = function() {
        taskService.getById($routeParams.postId)
            .success(function (current, status, headers, config) {
                $scope.current = current;
            })
            .error(function(current, status, headers, config) {
//                toaster.pop('error', current);
            });
    };

    // update post information. Call to blogService.update()
    $scope.updatePost = function() {
        taskService.update($scope.current.id, $scope.current)
            .success(function (current, status, headers, config) {
                $location.path("/posts/"+$scope.current.id);
                toaster.pop('success', "Post updated successfully!");
            })
            .error(function(current, status, headers, config) {
//                toaster.pop('error', current);
            });
    };

    //call this method at first!
    $scope.getAll();
});