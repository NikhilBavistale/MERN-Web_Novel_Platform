import User from "../models/UserModel.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
export const test = (req, res) => {
  res.json({ message: "Welcome to the server!" });
};
// update user
export const updateUser = async (req, res, next) => {
  if (req.params.id !== req.user.id) {
    return next(
      errorHandler(401, "Unauthorized: You can only update your account")
    );
  }
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          profilePicture: req.body.profilePicture,
          dob: req.body.dob,
          aboutMe: req.body.aboutMe,
          country: req.body.country,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updateUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
