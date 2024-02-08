import User from "../models/UserModel.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res, next) => {
  //   console.log(req.body);
  const { username, email, password } = req.body;
  const hashedPassword = await bcryptjs.hashSync(password, 12);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({
      message: "Signup success! Please login.",
    });
  } catch (error) {
    next(error);
  }
};
