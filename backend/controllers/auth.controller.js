import bycrpt from "bcrypt";
import User from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const loginUser = asyncHandler(async (req, res) => {
  try {
    console.log("Login controller");
    const { username, password } = req.body;

    //SignUp logic.....
    if (!username || !password) {
      return res.status(408).json({ error: "Some Field is empty" });
    }

    const existingUser = await User.findOne({ username });

    console.log("User: ", existingUser);

    if (!existingUser) {
      return res.status(400).json({
        error: "Invalid username ",
      });
    }

    //Hash password
    const matchPassword = await bycrpt.compare(password, existingUser.password);

    if (!matchPassword) {
      return res.status(402).json({
        error: "Invalid Password",
      });
    }

    if (existingUser) {
      generateTokenAndSetCookie(existingUser._id, res);
      console.log("User created");
      res.status(201).json({
        _id: existingUser._id,
        fullName: existingUser.fullName,
        username: existingUser.username,
        gender: existingUser.gender,
        profilePic: existingUser.profilePic,
      });
    } else {
      console.log("Error in login user");

      res.status(400).json({
        error: `While login user ,${error.message}`,
      });
    }
  } catch (error) {
    console.log("Error in Login");
    res.status(500).json({
      error: `Internal Server Error ${error.message} `,
    });
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  try {
    console.log("Logout controller");
    res.cookie("jwt", "", {
      maxAge: 0,
    });

    res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (error) {}
});

const signupUser = asyncHandler(async (req, res) => {
  try {
    console.log("Signup controller");
    const { fullName, username, gender, password, confirmPassword } = req.body;
    console.log(username);
    //SignUp logic.....
    if (confirmPassword !== password) {
      return res.status(408).json({ error: "Password don't matched" });
    }

    const user = await User.findOne({ username });

    console.log("User: ", user);
    if (user) {
      return res.status(400).json({
        error: "username already exists",
      });
    }

    //Hash password
    const hashPassword = await bycrpt.hash(password, 10);
    console.log(hashPassword);

    const getpassback = await bycrpt.compare(password, hashPassword);
    console.log(getpassback);

    const profilePic = `https://robohash.org/${username}.png`;

    const newUser = new User({
      username: username,
      fullName,
      password: hashPassword,
      gender,
      profilePic: profilePic,
    });

    if (newUser) {
      // Generate token
      console.log("Inside");
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        gender: newUser.gender,
      });
    } else {
      console.log("Error in creating new user");

      res.status(400).json({
        error: `While Creating user ,${error.message}`,
      });
    }
  } catch (error) {
    console.log("Error in Signup");
    res.status(500).json({
      error: `Internal Server Error ${error.message} `,
    });
  }
});

export { loginUser, signupUser, logoutUser };
