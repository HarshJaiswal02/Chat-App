import bycrpt from "bcrypt";
import User from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

const loginUser = async (req, res) => {
  try {
    console.log("Login controller");
    const { userName, password } = req.body;

    //SignUp logic.....
    if (!userName || !password) {
      return res.status(408).json({ error: "Some Field is empty" });
    }

    const existingUser = await User.findOne({ userName });

    console.log("User: ", existingUser);

    if (!existingUser) {
      return res.status(400).json({
        error: "Invalid UserName ",
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
        userName: existingUser.userName,
        gender: existingUser.gender,
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
};

const logoutUser = async (req, res) => {
  try {
    console.log("Logout controller");
    res.cookie("jwt", "", {
      maxAge: 0,
    });

    res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (error) {}
};

const signupUser = async (req, res) => {
  try {
    console.log("Signup controller");
    const { fullName, userName, gender, password, confirmPassword } = req.body;

    //SignUp logic.....
    if (confirmPassword !== password) {
      return res.status(408).json({ error: "Password don't matched" });
    }

    const user = await User.findOne({ userName });

    console.log("User: ", user);
    if (user) {
      return res.status(400).json({
        error: "Username already exists",
      });
    }

    //Hash password
    const hashPassword = await bycrpt.hash(password, 10);
    console.log(hashPassword);

    const getpassback = await bycrpt.compare(password, hashPassword);
    console.log(getpassback);

    const profilePic = `https://robohash.org/${userName}.png`;

    const newUser = new User({
      userName,
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
        userName: newUser.userName,
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
};

export { loginUser, signupUser, logoutUser };
