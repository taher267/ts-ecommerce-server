import { Request, Response, NextFunction } from "express";
import { getUserByEmail } from "@/user";
import { authentication, random } from "../../helpers";

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.sendStatus(400);
    }
    const user = await getUserByEmail(email).select(
      "+authentication.salt +authentication.password"
    );
    if (!user || !user?.authentication?.salt) {
      return res
        .sendStatus(400)
        .json({ code: 400, message: `User doesn't exist!` });
    }

    const expectedHash = authentication(user.authentication.salt, password);
    if (expectedHash !== user.authentication.password) {
      return res.sendStatus(403);
    }
    const salt = random();
    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString()
    );
    await user.save();
    res.cookie("TAHER-AUTH", user.authentication.sessionToken, {
      domain: "localhost",
      path: "/",
    });

    return res.status(200).json(user).end();
  } catch (e) {
    next(e);
  }
};

export default login;
