import request from "supertest";
import app from "../server";

describe("Integration Tests", () => {
	describe("POST /users", () => {
		it("should create new user", async () => {
			const userDetails = {
				username: "josh.kwuzie",
				password: "samba",
				user_type: "AUTHOR",
				firstName: "Joshua",
				lastName: "Chikwuzie",
				emailAddress: "josh@gmail.com"
			};
			await request(app)
				.post("/users")
				.send(userDetails);
			expect(200);
		});
	});

	describe("POST /login", () => {
		it("should login with correct credentials", async () => {
			const userDetails = {
				username: "chummy",
				password: "samba"
			};
			await request(app)
				.post("/login")
				.send(userDetails);
			expect(200);
		});

		it("should fail with incorrect credentials", async () => {
			const randomUserDetails = {
				username: "kdjsaooiejs",
				password: "lksdalkldad"
			};
			await request(app)
				.post("/login")
				.send(randomUserDetails);
			expect(404);
		});
	});

	describe("books CRUD routes", () => {
		it("get all books", async () => {
			await request(app).get("/books");
			expect(200);
		});

		it("create a book", async () => {
			const newBook = {
				isbn: "ISBN-13: 978-1-56619-909-30",
				title: "Professional Nodejs",
				publish_date: "2012-12-22"
			};
			await request(app)
				.post("/books")
				.send(newBook);
			expect(200);
		});

		it("update a book", async () => {
			const updatedBook = {
				isbn: "ISBN-13: 978-1-56619-909-30",
				title: "Instant Nodjs starter",
				publish_date: "2019-12-22"
			};
			await request(app)
				.put("/books/5dff7f1e0794a07adc97e288")
				.send(updatedBook);
			expect(200);
		});

		it("delete a book", async () => {
			await request(app).delete("/books/5dff7f1e0794a07adc97e288");
			expect(200);
		});
	});
});
