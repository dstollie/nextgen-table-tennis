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
	action: function () {
		BlazeLayout.render("backend", {main: "backendGamesOverview"});
	}
});

if (Meteor.isServer) {
	// Global API configuration
	var Api = new Restivus({
		version: 'v1',
		useDefaultAuth: true,
		prettyJson: true
	});

	// Maps to: /api/articles/:id
	Api.addRoute("join/:userId", {
		get: function () {
			var userId = this.urlParams.userId;

			var resultMessage = "an error occurred";
			var error = null;

			try {
				var result = Meteor.call('enterGame', userId);

				if(result) {
					resultMessage = "user successfully joined";
				}
			}
			catch (err) {
				error = err;
			}

			return {
				result: {
					resultMessage: resultMessage,
					error: error
				}
			}

		}
	});
}