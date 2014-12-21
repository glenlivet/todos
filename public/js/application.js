
window.Todos = Ember.Application.create({
	LOG_TRANSITIONS: true
});

//Todos.ApplicationAdapter = DS.FixtureAdapter.extend();

//Todos.ApplicationAdapter = DS.LSAdapter.extend({
//  namespace: 'todos-emberjs'
//});

Todos.ApplicationSerializer = DS.RESTSerializer.extend({
	  primaryKey: '_id'
	});