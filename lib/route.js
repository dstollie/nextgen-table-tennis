FlowRouter.route('/', {
	action: function (params, queryParams) {
		BlazeLayout.render("main", {main: "scoreboard"});
	}
});

AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');

var backendRoutes = FlowRouter.group({
	prefix: '/backend',
	name: 'backend',
	triggersEnter: [AccountsTemplates.ensureSignedIn]
});

backendRoutes.route('/', {
	triggersEnter: [
		function (context, redirect) {
			redirect('/backend/dashboard');
		}
	]
});

backendRoutes.route('/dashboard', {
	name: 'backend.dashboard',
	action: function (params, queryParams) {
		BlazeLayout.render("backend", {main: "backendDashboard"});
	}
});

backendRoutes.route('/games/overview', {
	name: 'backend.games.overview',
	action: function() {
		BlazeLayout.render("backend", {main: "backendGamesOverview" });
	}
});