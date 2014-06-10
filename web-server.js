var express = require("express"),
    app     = express()

var _ = require("underscore");

var myTasks =  [{
    name: 'Task1',
    finish: true
}, {
    name: 'Task2',
    finish: false
}];

var cont = myTasks.length;

app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.use(express.errorHandler());
    app.use(express.methodOverride());
    app.use(express.bodyParser());
    app.use(express.static(__dirname + '/app'));
    app.use(express.errorHandler());
    app.use(app.router);
});

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});


app.get("/", function(req, res) {
    res.redirect("/index.html");
});

// get all Tasks
app.get('/api/myTasks', function(req, res){
    res.send (myTasks) ;
});


////get a particular Task by ID.   return itemTask.id  est'a bien?
//app.get('/api/myPosts/:id', function(req, res){
//    selTask = _.find(myTasks, function(itemTask){return itemTask.id == req.params.id});
//    res.send (selTask);
//});

// create a new Task.   Preguntar id, texto hecho.   que hace res.json?
app.put('/newTask', function(req, res) {
    var newTask = {
        name : req.body.name,
        finish : req.body.finish
    };
    myTasks.push(newTask);
    res.json(true);
});

// update a created Task    est'a bien req.params.id?
// var postIndex = myPosts.indexOf(selPost);  que hace?
// myTasks[postIndex] = req.body;   no entiendo
// res.json(true);   returna que fue correcto?
// _ que sentido tiene?
//app.post('/editPost', function(req, res) {
//    selTask= _.find(myTasks, function(itemTask){return itemTask.id == req.params.id});
//    var postIndex = myTasks.indexOf(selPost);
//    myTasks[postIndex] = req.body;
//    res.json(true);
//});

// delete a particular post
app.post('/editTask/:id', function(req, res) {
    selPost = _.find(myPosts, function(itemPost){return itemPost.id == req.params.id});
    var postIndex = myPosts.indexOf(selPost);
    myPosts.splice(postIndex, 1);
    res.json(true);
});

app.delete('/deleteFinish', function(req, res) {

    var oldTasks = myTasks;
    myTasks = [];
//    var c = 0;

    _.each(oldTasks,function (task) {
        if (!task.finish) myTasks.push(task);
    });


});


// delete all
app.delete('/clearTask', function(req, res) {
    myTasks = [];
});


