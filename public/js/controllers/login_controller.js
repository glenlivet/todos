Todos.LoginController = Ember.Controller.extend({
	actions: {
		login : function(){
			var username = this.get('username');
			if(!username || !username.trim()) return ;
			var that = this;
			$.post('/login', {username : username}, function(){
				sessionStorage.username = username;
				//alert('登录成功！');
				that.transitionToRoute('todos');
			});
		}
	},

});