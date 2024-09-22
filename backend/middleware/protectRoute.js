import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
  try {
    // console.log("Why undefine", req.cookies); //It Should be cookie's'
    const token = req.cookies.jwt;

    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized - No token provided" });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    console.log(decode);
    if (!decode) {
      console.log("While decoding jwt token");
      return res
        .status(400)
        .json({ error: "Unauthorized user - Invalid Token " });
    }

    const user = await User.findById(decode.userId).select("-password");

    if (!user) {
      res.status(404).json("User not found");
    }
    // console.log(user);
    req.user = user;
    // console.log("Request User", req.user);
    next();
  } catch (error) {
    console.log("error in protectRoute middleware");
    res.status(500).json(`Error in protectRoute ${error}`);
  }
};

export default protectRoute;
