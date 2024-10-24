import express from "express";
import z from "zod";
import routes from "@/routes";
import applyMiddleware from "@/middleware";

const app = express();

applyMiddleware(app);

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

export default app;
