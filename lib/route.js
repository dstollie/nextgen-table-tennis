FlowRouter.route('/', {
	subscriptions: function(params, queryParams) {
		this.register('games', Meteor.subscribe('games'));
		this.register('rooms', Meteor.subscribe('rooms'));
	},
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

backendRoutes.route('/demo', {
	name: 'backend.demo',
	action: function (params, queryParams) {
		BlazeLayout.render("backendDemo");
	}
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

backendRoutes.route('/users/overview', {
	name: 'backend.users.overview',
	action: function () {
		BlazeLayout.render("backend", {main: "backendUsersOverview"});
	}
});

if (Meteor.isServer) {
	// Global API configuration
	var Api = new Restivus({
		useDefaultAuth: true,
		prettyJson: true
	});

	/*
	 * Api route to check-in an user, with a token id
	 */
	Api.addRoute("join/:tokenId", {
		get: function () {
			var tokenId = this.urlParams.tokenId;

			var resultMessage = "an error occurred";
			var error = null;

			try {
				var result = Meteor.call('enterGame', tokenId);

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

	Api.addRoute("score/:playerNumber", {
		get: function() {
			var playerNumber = this.urlParams.playerNumber;

			var resultMessage = "an error occurred";
			var error = null;

			try {
				var result = Meteor.call('scoreGame', playerNumber);

				if(result) {
					resultMessage = "user score added";
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

	Api.addRoute("reset", {
		get: function() {

			var resultMessage = "an error occurred";
			var error = null;

			try {
				var result = Meteor.call('resetGame');

				if(result) {
					resultMessage = "current game resetted";
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