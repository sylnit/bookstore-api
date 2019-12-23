import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET ? process.env.JWT_SECRET : "secret";

export const signToken = payload => {
	const token = jwt.sign(payload, secret, { expiresIn: "30d" });
	return token;
};

export const validToken = token => {
	const decoded = jwt.verify(token, secret);
	return decoded ? true : false;
};

export const getUserDetailsFromToken = token => {
	const decoded = jwt.verify(token, secret);
	if (decoded) {
		const username = decoded.username;
		const user_type = decoded.user_type;
		const user_id = decoded.user_id;
		const author_id = decoded.author_id;
		return { username, user_type, user_id, author_id };
	}
};

export const getTokenFromHeader = req => {
	let token;
	if (
		req.headers.authorization &&
		req.headers.authorization.split(" ")[0] === "Bearer"
	) {
		token = req.headers.authorization.split(" ")[1];
	}
	return token;
};
