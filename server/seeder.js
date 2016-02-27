/**
 * This file is used to seed the application's database so the application can be used right away
 */

Migrations.add({
	version: 1,
	name: 'Adds Martijn and Nick as the first test users.',
	up: function () {
		Accounts.createUser({
			username: "martijn",
			email: "martijn@impres.nl",
			password: "martijn123",
			tokenId: "b68e8d18",
			profile: {
				nickname: "De cowboy",
				name: "Martijn"
			}
		});

		Accounts.createUser({
			username: "nick",
			email: "nick@impres.nl",
			password: "nick123",
			tokenId: "66aa8718",
			profile: {
				nickname: "De prinses",
				name: "Nick"
			}
		});

		Accounts.createUser({
			username: "dennis",
			email: "dennis@impres.nl",
			password: "dennis123",
			tokenId: "68ce8a18",
			profile: {
				nickname: "ADHDennis",
				name: "Dennis"
			}
		});
	},
	down: function () {
		Meteor.users.remove({username: {$in: ['martijn', 'nick', 'dennis']}});
	}
});

Meteor.startup(function () {
	Migrations.migrateTo('latest');
});