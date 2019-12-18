import { signToken, validToken } from "../helpers/util";

describe("Util functions", () => {
	// const payLoad = {
	// 	username: "test"
	// };
	it("should return a signed token", () => {
		const payload = {
			username: "test"
		};
		expect(signToken(payload)).not.toBeNull();
	});

	it("should return token valid", () => {
		const payload = {
			username: "test"
		};
		const token = signToken(payload);
		expect(validToken(token)).toBeTruthy();
	});
});
