'use strict';

app.controller('myTasksCtrl', function($scope, blogService) {

    //get all elements
    $scope.getAll = function() {
       blogService.getAll()
            .success(function (data, status, headers, config) {
                $scope.tareas = data;
            })
            .error(function(data, status, headers, config) {
                //toaster.pop('error', current);
            });
    }

    // Call to blogService.create()
    $scope.addPost = function() {
        var postData = {
            id : '',
            title : $scope.titlePost,
            text : $scope.bodyPost
        };
        blogService.create(postData)
            .success(function (current, status, headers, config) {
                $location.path("/posts");
                toaster.pop('success', "Post saved successfully!");
            })
            .error(function(current, status, headers, config) {
                toaster.pop('error', current);
            });
    };

    //get single post
    $scope.getById = function() {
        blogService.getById($routeParams.postId)
            .success(function (current, status, headers, config) {
                $scope.current = current;
            })
            .error(function(current, status, headers, config) {
                toaster.pop('error', current);
            });
    };

    // update post information. Call to blogService.update()
    $scope.updatePost = function() {
        blogService.update($scope.current.id, $scope.current)
            .success(function (current, status, headers, config) {
                $location.path("/posts/"+$scope.current.id);
                toaster.pop('success', "Post updated successfully!");
            })
            .error(function(current, status, headers, config) {
                toaster.pop('error', current);
            });
    };

    //call this method at first!
    $scope.getAll();
});