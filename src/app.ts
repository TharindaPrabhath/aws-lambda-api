import { APIGatewayProxyHandler } from "aws-lambda";
import serverless from "serverless-http";
import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post("/status", (req: Request, res: Response) => {
  console.log("Body", req.body);
  res.json({ message: "Up & running..." });
});

// @ts-ignore
export const handler: APIGatewayProxyHandler = serverless(app);
