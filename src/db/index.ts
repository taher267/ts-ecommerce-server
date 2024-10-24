import mongoose from "mongoose";

const { DB_CONNECTION_URL, DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env;
let connectionURL = DB_CONNECTION_URL as string;
connectionURL = connectionURL.replace("<username>", DB_USERNAME as string);
connectionURL = connectionURL.replace("<password>", DB_PASSWORD as string);

const DB = async () => {
  mongoose.connection.on("error", (err: Error) => {
    console.log(err);
    process.exit(1);
  });
  return mongoose.connect(connectionURL, { dbName: DB_NAME });
};

export default DB;
