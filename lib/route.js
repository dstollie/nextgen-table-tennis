FlowRouter.route('/', {
	action: function (params, queryParams) {
		BlazeLayout.render("main", {main: "scoreboard"});
	}
});

var backendRoutes = FlowRouter.group({
	prefix: '/backend',
	name: 'backend'
});

backendRoutes.route('/', {
	triggersEnter: [
		function (context, redirect) {
			redirect('/backend/dashboard');
		}
	]
});

backendRoutes.route('/dashboard', {
	action: function (params, queryParams) {
		BlazeLayout.render("main", {main: "backendDashboard"});
	}
});