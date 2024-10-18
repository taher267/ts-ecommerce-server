import { Schema, model } from "mongoose";
const userSchema = new Schema({
  username: { type: String, required: false },
  email: { type: String, required: true },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
});

export const User = model("User", userSchema);
export const getUsers = (qry?: object) => User.find(qry || {});
export const getUser = (qry: object) => User.findOne(qry);
export const getUserByEmail = (email: string) => User.findOne({ email });
export const getUserBySessionToken = (sessionToken: string) =>
  User.findOne({ "authentication.sessionToken": sessionToken });

export const getUserById = (id: string) => User.findById(id);
export const createUser = (values: Record<string, any>) =>
  new User(values).save().then((user) => user.toObject());
export const deleteUserById = (id: string) => User.findByIdAndDelete(id);
export const updaeUserById = (id: string, values: Record<string, any>) =>
  User.findByIdAndUpdate(id, values);

//   https://www.youtube.com/watch?v=b8ZUb_Okxro&t=2s
