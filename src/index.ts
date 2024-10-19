import dotenv from "dotenv";
dotenv.config();
import express from "express";
import http from "http";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import routes from "./routes";
import fileupload from "express-fileupload";
import z from "zod";
import morgan from "morgan";

const PORT = process.env.PORT || 4001;
const app = express();
const middlewares = [
  cors({ origin: "*" }),
  express.json({ limit: "10mb" }),
  express.urlencoded({ extended: true }),
  compression(),
  cookieParser(),
  fileupload(),
  morgan("dev"),
  // (
  //   req: express.Request,
  //   _res: express.Response,
  //   next: express.NextFunction
  // ) => {
  //   console.log(req.url);
  //   next();
  // },
];

app.use(middlewares);
app.get("/health", (_req, res) => {
  res.status(200).json({ message: `Alhamdu lillah` });
});

app.use("/api/v1", routes());

app.use((_req, res) => {
  res.status(404).json({ message: `Not Found!` });
});
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  const status = err?.status || 500,
    message = err?.message || `Internal server error`;

  if (err instanceof z.ZodError) {
    const errors = err.errors.map(({ path, message }) => {
      return { path: path[0], message };
    });
    return res.status(400).json({
      errorType: "validationError",
      message: "Validation failed",
      errors,
      code: 400,
    });
  }
  res.status(status).json({ message, code: status });
});
app.use("/api/v1/github", (req: express.Request, res: express.Response) => {
  const str = `<a href="https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.GITHUB_AUTH_CALLBACK}?path=/&scope=user:email"
    >LOGIN WITH GITHUB</a>`;
  res.send(str);
});

const server = http.createServer(app);
mongoose.Promise;
mongoose.connect(process.env.MONGO_STR as string);
mongoose.connection.on("error", (err: Error) => {
  console.log(err);
  process.exit(1);
});
mongoose.connection.on("connected", () => {
  server.listen(PORT, () =>
    console.log(`Server on Running http://localhost:${PORT}`)
  );
});
