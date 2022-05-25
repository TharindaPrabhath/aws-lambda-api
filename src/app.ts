import { APIGatewayProxyHandler } from "aws-lambda";
import serverless from "serverless-http";
import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { handleError } from "./utils/errorHandler";

const supportRoutes = require("./routes/support.routes");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// support routes
app.use("/support", supportRoutes);

app.get("/status", (req: Request, res: Response) => {
  res.json({ message: "Up & running..." });
});

// error handling
app.use(handleError);

// @ts-ignore
export const handler: APIGatewayProxyHandler = serverless(app);
