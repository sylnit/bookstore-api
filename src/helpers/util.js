import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET ? process.env.JWT_SECRET : "secret";

export const signToken = payload => {
	const token = jwt.sign(payload, secret);
	return token;
};

export const validToken = token => {
	const decoded = jwt.verify(token, secret);
	return decoded ? true : false;
};
