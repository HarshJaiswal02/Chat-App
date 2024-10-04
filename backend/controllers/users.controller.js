import User from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const fetchAllUser = asyncHandler(async (req, res) => {
  try {
    const loginUserId = req.user._id;

    const remainingUsers = await User.find({
      _id: {
        $ne: loginUserId,
      },
    });

    // console.log(remainingUsers);

    if (!remainingUsers) {
      return res.status(200).json("No users");
    }

    res.status(200).json(remainingUsers);
  } catch (error) {
    console.log("Error in the fetchAllUser Controller");
    res.status(500).json(`Server Internal Error - fetchAllUser ${error} `);
  }
});

export { fetchAllUser };
