import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
	isbn: { type: String, required: true, unique: true, index: true },
	author: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Author"
	},
	title: { type: String, required: true },
	publish_date: { type }
});

const Book = mongoose.model("Book", bookSchema);

export default Book;
