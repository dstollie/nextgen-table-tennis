// counter starts at 0
Session.setDefault('counter', 0);

Template.scoreboard.helpers({
	counter: function () {
		return Session.get('counter');
	},

	playerOneServing: function()
	{
		return getCurrentGame() && getCurrentGame().serving_player == 0 ? true : false;
	},

	playerOne: function () {
		return getPlayer(0);
	},

	playerTwo: function () {
		return getPlayer(1);
	}
});

Template.scoreboard.events({
	'click button': function () {
		// increment the counter when button is clicked
		Session.set('counter', Session.get('counter') + 1);
	}
});