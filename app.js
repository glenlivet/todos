
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , todos = require('./routes/todos')
  , http = require('http')
  , path = require('path');

var app = express();

var endsWith = function(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  //app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('S3CRE7'));
  app.use(express.session());
  app.use(app.router);

  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

//app.get('/', routes.index);
//app.get('/users', user.list);
app.get('/todos', todos.list);
app.get('/logged', function(req, resp){
	if(req.session['username']){
		resp.json({ok:1});
	}else {
		resp.json({ok:false});
	}
});
app.post('/todos', todos.create);
app.delete('/todos/:id', todos.remove);
app.put('/todos/:id', todos.update);

app.post('/login', function(req, resp){
	//保存username
	var n = req.param('username');
	console.log(n);
	req.session.username = n;
	resp.json({});
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
