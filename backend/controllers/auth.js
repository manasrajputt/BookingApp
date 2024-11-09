import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const register = async (req, res, next) => {
  try {
    const { username } = req.body;

    const existedUSer = await User.findOne({ username });

    if (existedUSer) {
      return next(createError(409, "User with username already exists"));
    }

    const imgUrlLocalPath = req.files?.image[0]?.path;
    if (!imgUrlLocalPath) {
      return next(createError(400, "Profile image is required"));
    }

    const profile = await uploadOnCloudinary(imgUrlLocalPath);

    if (!profile) {
      return next(createError(400, "Profile files is required"));
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
      img: {
        public_id: profile?.public_id,
        url: profile?.url,
      },
    });

    await newUser.save();

    return res.status(201).json({
      details: newUser,
      message: "User has been created successfully.",
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );

    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
        // sameSite: "None",
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
