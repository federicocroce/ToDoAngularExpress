var express = require("express"),
    app     = express()
var mongoose = require('mongoose');


var _ = require("underscore");

//var myTasks =  [{
//    id: 0,
//    name: 'Task1',
//    finish: true
//}, {
//    id: 1,
//    name: 'Task2',
//    finish: false
//}];



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



// _____________________________________________________________________________________________________

// mongo db ____________________________________________________________________________________________

var db = mongoose.connection;

db.on('error', console.error);

db.once('open', function() {
    // Schema
    var taskSchema = new mongoose.Schema({
        name: { type: String },
        finish:  { type: Boolean}
    });
    // Mongoose also creates a MongoDB collection called 'Tasks' for these documents.
    var Tasks = mongoose.model('Tasks', taskSchema);

    // examples ____________________________________________________________________________________________

//    var task_example1 = new Tasks({
//        id: 0,
//        name: 'Algo',
//        finish: false
//    });
//
//    var task_example2 = new Tasks({
//        id: 1,
//        name: 'Algo1',
//        finish:  true
//    });
//
////    var contID = 2;
//
//    task_example1.save();
//    task_example2.save();

    // _____________________________________________________________________________________________________
//    var cont = myTasks.length;


    var count = 0;
    var AllTasks = [];


// get all Tasks
app.get('/api/myTasks', function(req, res){
    Tasks.find(function(err, myTasks) {
        if (err) return console.error(err);

        AllTasks = myTasks;
        var tasksToDo  = _.where(myTasks,  {finish: false})
        count = tasksToDo.length;

    var tasksAndCount = {
        tasks: myTasks,
        count : count
    };
        res.send (tasksAndCount);
   });
});


//    var count = 0;
//
//    _.each(myTasks,function (task) {
//        if (!task.finish)  count ++;
//        });
//
//    var all = {
//        tasks: myTasks,
//        count : count
//    };
//
//    res.send (all);



////get a particular Task by ID.   return itemTask.id  est'a bien?
//app.get('/api/myPosts/:id', function(req, res){
//    selTask = _.find(myTasks, function(itemTask){return itemTask.id == req.params.id});
//    res.send (selTask);
//});

// create a new Task.   Preguntar id, texto hecho.   que hace res.json?
app.put('/newTask', function(req, res) {
    var newTask = new Tasks({
        name : req.body.name,
        finish : req.body.finish
    });

    newTask.save();
    res.json(true);
});



// delete a particular post
app.post('/editTaskState/:_id', function(req, res) {

    Tasks.findOne({ _id: req.params._id }, function (err, task){
        task.finish = !req.body.finish;
        task.save();
    });
    res.json(true);
});



    app.post('/editTaskName', function(req, res) {
        Tasks.findOne({ _id: req.body._id }, function (err, task){
            task.name = req.body.name;
            task.save();
        });
        res.json(true);
});


    app.delete('/deleteFinish', function(req, res) {

        Tasks.remove({finish: true}, function (err) {
            if (err) return handleError(err);
            // removed!
            res.json(true);
        });
});



// delete all
app.delete('/clearTask', function(req, res) {

    Tasks.remove({}, function (err) {
        if (err) return handleError(err);
        // removed!
        res.json(true);
    });

});

});

mongoose.connect('mongodb://localhost/todo');
