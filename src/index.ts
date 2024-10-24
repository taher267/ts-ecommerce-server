import dotenv from "dotenv";
import http from "http";
dotenv.config();
import app from "@/app";
import DB from "@/db";

const PORT = process.env.PORT || 4001;

const server = http.createServer(app);
const main = async () => {
  try {
    await DB();
    server.listen(PORT, async () => {
      console.log(`Express server is listening at http://localhost:${PORT}`);
    });
  } catch (e) {
    console.log("Database Error");
    console.log(e);
  }
};

main();
