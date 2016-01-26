var users = Meteor.users;

Meteor.methods({
	userExists: function (username) {
		return !!users.findOne({username: username});
	}
});