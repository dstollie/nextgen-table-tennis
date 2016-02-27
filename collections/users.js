var users = Meteor.users;

if(Meteor.isServer) {
	Accounts.onCreateUser(function(options, user) {
		user.tokenId = options.tokenId;
		user.profile = options.profile;
		return user;
	});
}

Meteor.methods({
	userExists: function (username) {
		return !!users.findOne({username: username});
	}
});