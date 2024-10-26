import express from "express";
import path from "path";
import morgan from "morgan";
import swaggerUI from "swagger-ui-express";
import YAML from "yamljs";
import * as OpenApiValidator from "express-openapi-validator";
import cors from "cors";
import fileupload from "express-fileupload";
import compression from "compression";
// const swaggerDoc = YAML.load("./src/swagger.yaml");
const swaggerDoc = YAML.load(path.resolve("./swagger.yaml"));
// const cookieParser from"cookie-parser";
// const authenticate from'./authenticate';
const cookieObj = (cookie = "") =>
  cookie?.split?.(/; /g)?.reduce?.((a, c) => {
    const [k, v] = c.split("=");
    if (k && v) a[k.trim()] = v.trim();
    return a;
  }, {});
const applyMiddleware = (app: express.Express) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    cors({
      //   origin: [
      //     "http://localhost:4001",
      //     "http://localhost:4003",
      //     "http://localhost:3000",
      //     "https://pz-attendance.netlify.app",
      //     "https://at.abutaher.online",
      //   ],
      //   credentials: true,
    })
  );
  app.use((req, res, next) => {
    const originalJson = res.json;
    res.json = function (data) {
      const statusCode = res.statusCode || 200;
      const responseData = { code: statusCode, ...data };
      return originalJson.call(this, responseData);
    };

    next();
  });
  app.use(morgan("dev"), fileupload(), compression());
  // app.use(cookieParser())
  app.use((req, res, next) => {
    const { cookie } = req.headers;
    if (cookie) {
      const cookies = cookieObj(decodeURIComponent(cookie));

      req.cookies = cookies;
    }
    return next();
  });
  app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));
  app.use(
    OpenApiValidator.middleware({
      apiSpec: path.resolve("./swagger.yaml"),
    })
  );
};

export default applyMiddleware;

//   cors({ origin: "*" }),
//   express.json({ limit: "10mb" }),
//  ,
//   ,
//   cookieParser(),
//   ,
//   morgan("dev"),
