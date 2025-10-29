import express, { Request, Response, NextFunction, json } from "express";
import cors from "cors";

const PORT_NUMBER = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());

interface HttpError extends Error {
	statusCode: number;
	data: string;
}

app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
	const status = err.statusCode || 500;

	res.status(status).json({
		success: false,
		message: err.message || "Something went wrong",
		data: err.data || "NULL",
	});
});

try {
	const server = app.listen(PORT_NUMBER);
	console.log(`RUNNING ON PORT ${PORT_NUMBER}`);
} catch (err) {
	console.log("ERROR RUNNING SERVER:");
	console.log(err);
}
