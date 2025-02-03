const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary");
const User = require("../model/user");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/ErrorHandler").default;
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const sendToken = require("../utils/jwtToken");
const { isAuthenticated } = require("../middleware/auth");
const upload = require("../multer");
//create user singup
router.post("/create-user", upload.single("file"), async (req, res, next) => {
  try {
    const {name, email, password, avatar } = req.body;
    const userEmail = await User.findOne({ email: email });
    console.log(userEmail)
    if (userEmail) {
      return next(new ErrorHandler("User already exists", 400));
    }
    const filename = req.file.filename;

    // const fileUrl = `/uploads/${filename}`;
    const myCloud = await cloudinary.v2.uploader.upload(avatar, {
      folder: "avatars",
    });

    const user = {
      name: name,
      // phoneNumber: req.body.phoneNumber,
      email: email,
      password: password,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url
      }
    };

    const activationToken = createActivationToken(user);
    const activationUrl = `http://localhost:3000/activation/${activationToken}`;

    try {
      console.log("aouon")
      await sendMail({
        email: user.email,
        subject: "Activation your account",
        text: `Hello ${user.name} please click on the link to activate your account ${activationUrl}`,
      });

      res.status(201).json({
        success: true,
        message: `please check your email:- ${user.email} to activate your account`,
        // user,
        // activationToken,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// create activation token
const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

// activate user
router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;

      const newUser = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );

      if (!newUser) {
        return next(new ErrorHandler("Invalid token", 400));
      }
      const { name, email, password, avatar } = newUser;

      let user = await User.findOne({ email });

      if (user) {
        return next(new ErrorHandler("User already exists", 400));
      }
      user = await User.create({
        name,
        email,
        avatar,
        password,
      });
      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// login user
router.post(
  "/login-user",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(new ErrorHandler("Please provide the all fields!", 400));
      }

      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        return next(new ErrorHandler("User doesn't exists!", 400));
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return next(
          new ErrorHandler("Please provide the correct information", 400)
        );
      }
      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// load user
router.get(
  "/getuser",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user._id);

      if (!user) {
        return next(new ErrorHandler("User doesn't exists", 400));
      }

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// log out user
router.get(
  "/logout",
  catchAsyncErrors(async (req, res, next) => {
    try {
      res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });

      res.status(201).json({
        success: true,
        message: "Log out successfully!",
      });
    } catch (e) {
      return next(new ErrorHandler(e.message, 500));
    }
  })
);

//update user info
router.put(
  "/update-user-info",
  isAuthenticated,
  catchAsyncErrors(async (req, res) => {
    console.log("error");
    try {
      const { email, password, phoneNumber, name } = req.body;

      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        return next(new ErrorHandler("User not found", 400));
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return next(
          new ErrorHandler("Please provide the correct password", 400)
        );
      }

      user.name = name;
      user.email = email;
      user.phoneNumber = phoneNumber;

      await user.save();

      res.status(201).json({
        success: true,
        message: "User information updated successfully",
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);


//update user avatar
router.put(
  "/update-avatar",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {

      if (!req.user || !req.user.id) {
        return next(new ErrorHandler("User not authenticated", 401));
      }

      const existsUser = await User.findById(req.user.id);

      if (!existsUser) {
        return next(new ErrorHandler("User not found", 404));
      }

      if (!req.body.avatar) {
        return next(new ErrorHandler("Avatar is required", 400));
      }

      if (req.body.avatar !== "" && existsUser.avatar && existsUser.avatar.public_id) {
        console.log("Destroying previous avatar...");
        await cloudinary.v2.uploader.destroy(existsUser.avatar.public_id);
      }

      console.log("Uploading new avatar...");
      const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
      });

      existsUser.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };

      await existsUser.save();
      console.log("Avatar updated successfully");

      res.status(200).json({
        success: true,
        user: existsUser,
      });
    } catch (error) {
      console.error("Error updating avatar:", error);
      return next(new ErrorHandler(error.message || "Internal Server Error", 500));
    }
  })
);

router.put(
  "/update-user-addresses",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);
      const sameTypeAddress = user.addresses.find(
        (address) => address.addressType === req.body.addressType
      );

      if (sameTypeAddress) {
        return next(
          new ErrorHandler(`${req.body.addressType} address already exists`)
        );
      }

      const exixtsAddress = user.addresses.find(
        (address) => address._id === req.body._id
      );

      if (exixtsAddress) {
        Object.assign(exixtsAddress, req.body);
      } else {
        // add the new address to the array
        user.addresses.push(req.body);
      }

      await user.save();

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//delete user address
router.delete(
  "/delete-user-address/:id",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const userId = req.user._id;
      const addressId = req.params.id;
      console.log(addressId);

      const user = await User.findById(userId);
      if (!user) {
        console.log("User not found.");
        return next(new ErrorHandler("User not found", 404));
      }

      // Log before update operation
      console.log("Before update operation");

      // Remove the address from the addresses array
      user.addresses = user.addresses.filter(
        (address) => address._id.toString() !== addressId
      );
      console.log("lopk");

      // Save the updated user document
      await user.save();
      console.log("lopk");

      res.status(200).json({ success: true, user });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);


//update user information 
router.put(
  "/update-user-password",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      // const { oldPassword } = req.body;
      // console.log(req.body);
      const user = await User.findById(req.user.id).select("+password");
      const isPasswordValid = await user.comparePassword(req.body.oldPassword);

      if (!isPasswordValid) {
        return next(
          new ErrorHandler("Please provide the correct password", 400)
        );
      }


      // if(req.body.newPassword !== req.body.confirmPassword){
      //   return next(new ErrorHandler("Passwords do not match", 400));
      // }


      user.password = req.body.newPassword;
      console.log(user.password);

      await user.save();
      console.log(user.password);


      res.status(200).json({
        success: true,
        user: "Password update successfull!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);


//find user information with the userId
router.get("/user-info/:id", catchAsyncErrors(async (req, res, next) => {
  try{
    const user = await User.findById(req.params.id);

    res.status(201).json({
      success: true,
      user,
    })

  }catch(error){
    return next(new ErrorHandler(error.message, 500))
  }
}))
module.exports = router;
