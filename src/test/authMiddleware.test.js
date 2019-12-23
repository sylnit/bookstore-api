import checkForToken from "../middlewares/auth";

describe("Auth middleware", () => {
	it("should return Token must be supplied in header", () => {
		const reqMock = {
			headers: {
				authorization: ""
			}
		};
		expect(checkForToken(reqMock)).toBeUndefined();
	});

	it("should return undefined for invalid token", () => {
		const reqMock = {
			headers: {
				authorization:
					"Bearer eyJ1c2VybmFtZSI6InNhInR5cCI6IkpXVCJ9.eyJhbGciOiJIUzI1NiIsbXVlbGloZWFkaW5kdTIiLCJ1c2VyX3R5cGUiOiJBVVRIT1IiLCJ1c2VyX2lkIjoiNWRmYmI0MzQzZDM1ODc3ZGEwOTJmNTE0IiwiaWF0IjoxNTc2Nzc2NzY4fQ.gIyeaWUchtnESQRqepldVGPS9INoCiKcL2PDlQSDW-U"
			}
		};
		expect(checkForToken(reqMock)).toBeUndefined();
	});

	it("should execute callback", () => {
		const reqMock = {
			headers: {
				authorization:
					"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhbXVlbGloZWFkaW5kdTIiLCJ1c2VyX3R5cGUiOiJBVVRIT1IiLCJ1c2VyX2lkIjoiNWRmYmI0MzQzZDM1ODc3ZGEwOTJmNTE0IiwiaWF0IjoxNTc2Nzc2NzY4fQ.gIyeaWUchtnESQRqepldVGPS9INoCiKcL2PDlQSDW-U"
			}
		};
		const resMock = {
			statusCode: 300,
			status: jest.fn()
		};
		const cb = jest.fn();
		checkForToken(reqMock, resMock, cb);
		expect(cb.mock.calls.length).toBe(1);
	});
});
