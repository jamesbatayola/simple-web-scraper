import express, { Request, Response, NextFunction } from "express";

const app = express();

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
	const server = app.listen(2000);
} catch (err) {
	console.log("ERROR RUNNING SERVER:");
	console.log(err);
}
