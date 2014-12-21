/**
 * New node file
 */
var util = require('util'), 
MongoClient = require('mongodb').MongoClient,
ObjectID = require('mongodb').ObjectID,
assert = require('assert'),
url = "mongodb://localhost:27017/library",
db = null;

MongoClient.connect(url, function(err, _db) {
	
	  if(!err){
		  console.log("Connected correctly to mongodb server");
		  db = _db;
		  
	  }
	});

var getCollection = function(req){
	var username = req.session['username'];
	return db.collection(username);
};

//GET ALL
exports.list =  function(req, res){
	getCollection(req).find({}).toArray(function(err, docs) {
		var json = {
				todos : docs
		};
		res.json(json);
	}); 
};
//CREATE
exports.create = function(req, res){
	getCollection(req).insertOne(req.body.todo, function(err, r){
		if(!err){
			console.log('SAVE ONE TODO!' );
			console.log(util.inspect(r.ops[0], {showHidden:true}));
			res.json({todo : r.ops[0]});
		}
	});
};
//DELETE
exports.remove = function(req, res){
	var id = req.param('id');
	//console.log(id);
	getCollection(req).findOneAndDelete({'_id' : new ObjectID(id)}, function(err, r){
		assert.equal(err, null);
		if(!err){
			console.log(util.inspect(r, {showHidden:true}));
			res.json({});
		}
	});
};
//UPDATE
exports.update = function(req, res){
	var id = req.param('id');
	var todo = req.param('todo');
	console.log(todo);
	//console.log(util.inspect(req.body, {showHidden:true}));
	getCollection(req).findOneAndUpdate(
			{'_id': new ObjectID(id)}, 
			{$set:{
				title : todo.title,
				isCompleted : todo.isCompleted
			}},
			{returnOriginal : false},
			function(err, r){
		assert.equal(err,null);
		if(!err){
			console.log(util.inspect(r, {showHidden:true}));
			res.json({todo : r.value});
		}
	});
};

