import mongoose from "mongoose";
import bcrypt from "bcrypt";

const saltRound = process.env.SALT_ROUNDS || 10;

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
		required: true,
		lowercase: true,
		trim: true
	},
	password: {
		type: String,
		required: true,
		bcrypt: true
	},
	user_type: {
		type: String,
		enum: ["ADMIN", "AUTHOR", "READER"],
		required: true
	}
});

userSchema.pre("save", function(next) {
	let user = this;
	bcrypt.hash(user.password, saltRound, function(err, hash) {
		if (err) {
			return next(err);
		}
		user.password = hash;
		next();
	});
});

userSchema.methods.comparePassword = function(
	candidatePassword,
	checkPassword
) {
	bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
		if (err) return checkPassword(err);
		checkPassword(null, isMatch);
	});
};

const User = mongoose.model("User", userSchema);

export default User;
