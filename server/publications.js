Meteor.publish("games", function () {
	return App.Collections.Games.find({});
});

Meteor.publish("rooms", function () {
	return Meteor.users.find({});
});

