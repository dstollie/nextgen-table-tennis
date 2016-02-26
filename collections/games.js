App.Collections.Games = new Mongo.Collection('games', {
	transform: function (entry) {
		entry.score = function (userId) {

			this.players[userId]++;

			this.save();
		};

		entry.startable = function () {
			return !this.started_at && !this.finished_at && this.players && this.players.length > 2;
		};

		entry.started = function () {
			return !!this.started_at;
		};

		entry.finished = function () {
			return !!this.finished_at;
		};

		entry.addPlayer = function (user) {
			// Check if the current user is already in the game
			var userInGame = games.findOne({players: {$elemMatch: {userId: user._id}}});

			if (userInGame) {
				return false;
			}

			var player = {
				userId: user._id,
				score: 0
			};
			games.update({_id: this._id}, {$addToSet: {players: player}});

			return true;
		};

		entry.scorePlayer = function(playerNumber) {
			var currentUser = currentGame.players.length >= 2 ? currentGame.players[playerNumber] : null;

			if (!currentUser) {
				return false;
			}

			//@todo: set score

			return true;
		};

		entry.start = function () {
			games.update({_id: this._id}, {$set: {started_at: new Date()}});
		};

		entry.finish = function () {
			games.update({_id: this._id}, {$set: {finished_at: new Date()}});
		};

		return entry;
	}
});

var games = App.Collections.Games;

function getCurrentGame() {
	// Find the first game which is started but and is not finished
	//return games.findOne({started_at: { $exists: true, $ne: "" }, finished_at: null});
	return games.findOne({finished_at: null});
}

function createGame() {
	var gameId = games.insert({created_at: new Date()});
	return games.findOne(gameId);
}

if (Meteor.isServer) {
	Meteor.methods({
		enterGame: function (tokenId) {

			var currentUser = Meteor.users.findOne({tokenId: tokenId});

			if (!currentUser) {
				throw new Meteor.Error("non-existent");
			}

			var currentGame = getCurrentGame();

			if (!currentGame) {
				currentGame = createGame();
			}

			if (currentGame.started()) {
				throw new Meteor.Error("already-started");
			}

			var playerAdded = currentGame.addPlayer(currentUser);

			if (!playerAdded) {
				throw new Meteor.Error("player-already-ingame");
			}

			if (currentGame.startable()) {
				currentGame.start();
			}

			return true;
		},

		scoreGame: function(playerNumber) {

			var currentGame = getCurrentGame();

			if (!currentGame) {
				throw new Meteor.Error("no-current-game");
			}

			if(!currentGame.scorePlayer(playerNumber)) {
				throw new Meteor.Error("player-number-not-found");
			}

			return true;
		}
	});
}