import Book from "../models/book";
import Author from "../models/author";
import { getUserDetailsFromToken, getTokenFromHeader } from "../helpers/util";

const getBooks = (req, res) => {
	const { isbn, author } = req.query;
	if (!isbn && !author) {
		//get all books
		Book.find({}, (err, books) => {
			if (err) return res.status(400).json({ error: err });
			return res
				.status(200)
				.json({ msg: "Books successfully retrieved", books });
		});
	} else if (isbn || author) {
		//search with these fields
		Book.find({ $or: [{ isbn: isbn }, { author: author }] }, (err, books) => {
			if (err) return res.status(400).json({ error: err });
			return res
				.status(200)
				.json({ msg: "Books successfully retrieved", books });
		});
	}
};

const createBook = (req, res) => {
	const { isbn, title, publish_date } = req.body;
	const token = getTokenFromHeader(req);
	//get author from token
	const { user_id } = getUserDetailsFromToken(token);
	if (!user_id)
		return res.status(400).json({ msg: "Invalid user. Process aborted." });
	//get author
	Author.findOne({ user: user_id }, (err, author) => {
		if (err) return res.status(400).json({ error: err });
		if (author) {
			//use the author details to create the book
			const authorId = author._id;
			const newBook = new Book({ isbn, author: authorId, title, publish_date });
			newBook
				.save()
				.then(data => {
					return res
						.status(200)
						.json({ msg: "Book successfully created.", data });
				})
				.catch(err => {
					return res.status(400).json({ error: err });
				});
		} else {
			return res.status(404).json({ msg: "Author not found." });
		}
	});
};

const updateBook = (req, res) => {
	const query = { _id: req.params.bookId };
	Book.findOneAndUpdate(
		query,
		req.body,
		{ new: true, useFindAndModify: false },
		(err, book) => {
			if (err) return res.status(400).json({ error: err });
			return res
				.status(200)
				.json({ msg: "Book successfully updated.", data: book });
		}
	);
};

const deleteBook = (req, res) => {
	const query = { _id: req.params.bookId };
	const token = getTokenFromHeader(req);
	const { author_id } = getUserDetailsFromToken(token);
	Book.findOne(query, (err, book) => {
		if (err) return res.status(400).json({ error: err });
		if (book.author != author_id) {
			return res
				.status(400)
				.json({ msg: "You can only delete books created by you." });
		}
		Book.deleteOne(query, err => {
			if (err) return res.status(400).json({ error: err });
			return res
				.status(200)
				.json({ msg: `Book with ID: ${req.params.bookId} has been deleted` });
		});
	});
};

export default { getBooks, createBook, updateBook, deleteBook };
