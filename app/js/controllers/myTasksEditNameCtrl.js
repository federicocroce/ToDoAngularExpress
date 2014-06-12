
app.controller('myTasksEditNameCtrl', function($scope, taskService) {

$scope.currentTask;


    $scope.editName = function (task) {
        $scope.newTaskName = task.name;
        $scope.currentTask = task;
    }

    //get all elements
    $scope.getAll = function() {
        taskService.getAll()
            .success(function (data, status, headers, config) {
                $scope.tasks = data.tasks;
                $scope.remaining = data.count;
            })
            .error(function(data, status, headers, config) {
                //toaster.pop('error', current);
            });
    }

    // Call to blogService.create()
    $scope.editTask = function() {
        if ($scope.newTaskName !== '') {
            $scope.currentTask.name = $scope.newTaskName;
            $scope.newTaskName = "";
            taskService.editName($scope.currentTask)
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

//    update post information. Call to blogService.update()

    $scope.change = function(task) {
        $scope.updateTaskState(task);
    };


    $scope.updateTaskState = function(task) {

//        var taskToUdapte = {
//            id : task.id,
//            finish : task.finish
//        };

        taskService.updateTaskState(task)
            .success(function (current, status, headers, config) {
//                $location.path("/posts/"+$scope.current.id);
                $scope.getAll();
            })
            .error(function(current, status, headers, config) {
//                toaster.pop('error', current);
            });
    };

//    // removePost function
//    $scope.removePost = function () {
//        taskService.remove($scope.current.id)
//            .success(function (current, status, headers, config) {
//                $location.path("/posts/");
////                toaster.pop('success', "Post removed successfully!");
//            })
//            .error(function(current, status, headers, config) {
////                toaster.pop('error', current);
//            });
//    }

    $scope.deleteFinish = function () {
//        var oldTasks = [];
//
//        angular.forEach(oldTasks, function (task) {
//            if (task.finish) oldTasks.push(task);
//        });

        taskService.deleteFinish()
            .success(function (current, status, headers, config) {
                $scope.getAll();
//                  $location.path("/posts");
//                toaster.pop('success', "Post saved successfully!");
            })
            .error(function(current, status, headers, config) {
                $scope.getAll();
//                toaster.pop('error', current);
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

//                toaster.pop('error', current);
            });

    };

//    $scope.remaining = function () {
//        var count = 0;
//
//        angular.forEach($scope.tasks, function (task) {
//            count += task.finish ? 0 : 1;
//        });
//        return count;
//    };


    //call this method at first!
    $scope.getAll();
});