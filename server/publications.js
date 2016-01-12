Meteor.publish("rooms", function () {
	return Games.find({});
});