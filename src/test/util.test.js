import {
	signToken,
	validToken,
	getTokenFromHeader,
	getUserDetailsFromToken
} from "../helpers/util";

describe("Util functions", () => {
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

	it("should return user details from token", () => {
		const reqMock = {
			headers: {
				authorization:
					"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhbXVlbGloZWFkaW5kdTIiLCJ1c2VyX3R5cGUiOiJBVVRIT1IiLCJ1c2VyX2lkIjoiNWRmYmI0MzQzZDM1ODc3ZGEwOTJmNTE0IiwiaWF0IjoxNTc2Nzc2NzY4fQ.gIyeaWUchtnESQRqepldVGPS9INoCiKcL2PDlQSDW-U"
			}
		};

		const token = getTokenFromHeader(reqMock);
		expect(getUserDetailsFromToken(token)).not.toBeNull();
	});

	it("should return token from header", () => {
		const reqMock = {
			headers: {
				authorization:
					"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhbXVlbGloZWFkaW5kdTIiLCJ1c2VyX3R5cGUiOiJBVVRIT1IiLCJ1c2VyX2lkIjoiNWRmYmI0MzQzZDM1ODc3ZGEwOTJmNTE0IiwiaWF0IjoxNTc2Nzc2NzY4fQ.gIyeaWUchtnESQRqepldVGPS9INoCiKcL2PDlQSDW-U"
			}
		};
		expect(getTokenFromHeader(reqMock)).toBe(
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhbXVlbGloZWFkaW5kdTIiLCJ1c2VyX3R5cGUiOiJBVVRIT1IiLCJ1c2VyX2lkIjoiNWRmYmI0MzQzZDM1ODc3ZGEwOTJmNTE0IiwiaWF0IjoxNTc2Nzc2NzY4fQ.gIyeaWUchtnESQRqepldVGPS9INoCiKcL2PDlQSDW-U"
		);
	});
});
