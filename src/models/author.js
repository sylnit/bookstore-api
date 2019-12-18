import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	emailAddress: { type: String, required: true },
	user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

const Author = mongoose.model("Author", authorSchema);

export default Author;
