import { User } from "../model/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;
  console.log(req.body);
  if (!fullName || !email || !password) {
    throw new ApiError(400, "all fields is required");
  }
  const userExist = await User.findOne({ email });
  if (userExist) {
    throw new ApiError(400, "User already exist with this username");
  }
  const user = await User.create({ fullName, email, password });

  const userCreated = await User.findById(user._id).select("-password");
  if (!userCreated) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }
  res
    .status(201)
    .json(
      new ApiResponse(201, { userCreated }, "User registered successfully")
    );
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const passwordCheck = await user.isPasswordCorrect(password);
  console.log(passwordCheck);
  if (!passwordCheck) {
    throw new ApiError(401, "Invalid password");
  }

  const token = user.generateAccessToken();
  console.log(token);

  const loggedInUser = await User.findById(user._id).select("-password");
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .cookie("accessToken", token, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, token },
        "User logged in successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  // get _id from user - btw not required
  // clear all the cookies

  const { _id } = req.user;
  const options = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

export { registerUser, loginUser, logoutUser };
