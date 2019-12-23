import { validToken } from "../helpers/util";

export default (req, res, next) => {
	let token;
	try {
		if (
			req.headers.authorization &&
			req.headers.authorization.split(" ")[0] === "Bearer"
		) {
			token = req.headers.authorization.split(" ")[1];
		}
		if (!token) {
			res.status(404).json({ msg: "Token must be supplied in header." });
		} else {
			if (validToken(token)) {
				next();
			} else {
				res.status(404).json({ msg: "Invalid token." });
			}
		}
	} catch (e) {
		//throw new JsonWebTokenError("Error with token: " + e);
	}
};
