import { Request, Response, NextFunction } from "express";
import { getUserByEmail } from "@/user";

const getItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ code: 400, message: `Invalid parameters!` });
    }
    const item = await getUserByEmail(email);

    if (!item) {
      return res
        .sendStatus(404)
        .json({ code: 404, message: `User doesn't exist` });
    }

    return res.status(200).json({ item, code: 200 });
  } catch (e) {
    return next(e);
  }
};

export default getItem;
