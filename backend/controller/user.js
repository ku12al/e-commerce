const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary");
const User = require("../model/user");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/ErrorHandler").default;
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const sendToken = require("../utils/jwtToken")
const {isAuthenticated} = require("../middleware/auth");
const upload = require("../multer");

//create user singup
router.post("/create-user", upload.single("file"), async (req, res, next) => {
  try {
    console.log(req.file) 
    const {email} = req.body;
    console.log(email);
    const userEmail = await User.findOne({ email: email});
    console.log(userEmail);

    if (userEmail) {
      const filename = req.file.filename;
      const filePath = `uploads/${filename}`;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: "Error deleting file" });
        } else {
          res.json({ message: " file deleted successfully" });
        }
      });
      return next(new ErrorHandler("seller already exists", 400))
    }
    const filename = req.file.filename;
    
    const fileUrl = `/uploads/${filename}`;
    // const myCloud = await cloudinary.v2.uploader.upload(avatar, {
    //   folder: "avatars",
    // });
    


    const user = {

      name:req.body.name,
      phoneNumber:req.body.phoneNumber,
      email:email,
      password:req.body.password,
      avatar: fileUrl,
    };

    const activationToken = createActivationToken(user);


    const activationUrl = `http://localhost:3000/activation/${activationToken}`;

    try {
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
      console.log("error 1");
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    console.log("error 2");
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
router.get("/logout", isAuthenticated, catchAsyncErrors(async (req, res, next) => {
  try{
    res.cookie("token", null,{
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(201).json({
      success: true,
      message: "Log out successfully!"
    })

  }catch(e){
    return next(new ErrorHandler(e.message, 500));
  }
}))

module.exports = router;
