import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import routes from "./routes";

const port = process.env.PORT || 8040;
const dbUrl = process.env.DATABASE_URL;
try {
	mongoose.set("useCreateIndex", true);
	mongoose.connect(dbUrl, { useUnifiedTopology: true, useNewUrlParser: true });
} catch (error) {
	console.log(error);
}

const app = express();
app.use(cors());

app.use(bodyParser.json());

app.get("/", (req, res) => {
	res.status(200).json({
		msg:
			"This is the api for the bookstore app. Consult the API docs on how to proceed."
	});
});
app.use("/api/vi", routes);

app.listen(port, () => {
	console.log(`Server started at port: ${port}`);
});

export default app;
