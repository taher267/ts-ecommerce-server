import { Request, Response, NextFunction } from "express";
import { createUser, getUserByEmail } from "@/user";
import { authentication, random } from "@/helpers";

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, username } = req.body;
    if (!email || !password) {
      return res.sendStatus(400);
    }
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.sendStatus(400);
    }

    const salt = random();
    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });
    return res.status(201).json(user).end();
  } catch (e) {
    return next(e);
  }
};
export default register;
