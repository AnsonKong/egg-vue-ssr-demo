module.exports = app => {
	const mongoose = app.mongoose;
	const Schema = mongoose.Schema;
	const UserSchema = new Schema({
		provider: { type: String },
		username: { type: String },
		email: { type: String },
		avatar: { type: String },
		github: { type: String },
		uid: { type: String }
	});

	return mongoose.model('User', UserSchema);
}