import User from "../models/user";
import { signToken } from "../helpers/util";
import Author from "../models/author";

const createUser = (req, res) => {
	const {
		username,
		password,
		user_type,
		firstName,
		lastName,
		emailAddress
	} = req.body;
	const newUser = new User({ username, password, user_type });
	newUser
		.save()
		.then(async data => {
			if (user_type == "AUTHOR") {
				const user = data._id;
				const newAuthor = new Author({
					firstName,
					lastName,
					emailAddress,
					user
				});
				await newAuthor
					.save()
					.then(() => {
						return res
							.status(200)
							.json({ msg: "User successfully create.", data });
					})
					.catch(err => {
						return res.status(400).json({ error: err });
					});
			} else {
				return res.status(200).json({ msg: "User successfully create.", data });
			}
		})
		.catch(err => {
			return res.status(400).json({ msg: "User creation failed.", error: err });
		});
};

const login = (req, res) => {
	User.findOne({ username: req.body.username }, (err, user) => {
		if (err) return res.status(400).json({ error: err });
		if (!user) return res.status(404).json({ msg: "User not found." });

		user.comparePassword(req.body.password, async (err, isMatch) => {
			if (err) throw err;
			if (!isMatch)
				return res
					.status(400)
					.json({ msg: "Invalid username and / or password" });
			const userType = user.user_type;
			const userId = user._id;
			let authorId;
			await Author.findOne({ user: userId }, (err, author) => {
				if (!err) {
					if (author) {
						authorId = author._id;
					}
				}
			});
			const authToken = signToken({
				username: req.body.username,
				user_type: userType,
				user_id: userId,
				author_id: authorId
			});
			return res.status(200).json({
				msg: "Login successful",
				data: { token: authToken, user: user }
			});
		});
	});
};

export default { createUser, login };
