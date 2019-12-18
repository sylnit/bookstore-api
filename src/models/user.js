import mongoose from "mongoose";

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

const User = mongoose.model("User", userSchema);

export default User;
