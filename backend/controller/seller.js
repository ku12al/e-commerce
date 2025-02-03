const express = require("express");
const router = express.Router();
const path = require("path");
const Shop = require("../model/shop");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/ErrorHandler");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const sendShopToken = require("../utils/shopToken");
const upload = require("../multer");
const { isAuthenticated, isSeller } = require("../middleware/auth");


router.post("/create-shop", upload.single("file"), async (req, res, next) => {
  try {
    const { email } = req.body;
    const sellerEmail = await Shop.findOne({ email });

    
    if (sellerEmail) {
      const filename = req.body.avatar;
      const filePath = path.join("uploads", filename);

      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: "Error deleting file" });
        } else {
          res.json({ message: " file deleted successfully" });
        }
      });
      return next(new ErrorHandler("seller already exists", 400));
    }
    const filename = req.file.filename;
    console.log(filename);
    const fileUrl = path.join(filename);

    const seller = {
      name: req.body.name,
      email: email,
      password: req.body.password,
      avatar: fileUrl,
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
      zipCode: req.body.zipCode,
    };

    const activationToken = createActivationToken(seller);
    console.log(activationToken);

    const activationUrl = `http://localhost:3000/seller/activation/${activationToken}`;

    try {
      await sendMail({
        email: seller.email,
        subject: "Activation your account",
        text: `Hello ${seller.name} please click on the link to activate your account ${activationUrl}`,
      });
      res.status(201).json({
          success: true,
          message: `please check your email:- ${seller.email} to activate your account`,
        });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    console.log("kunal");
    return next(new ErrorHandler(error.message, 400));
  }
});

// create activation token
const createActivationToken = (seller) => {
  return jwt.sign(seller, process.env.ACTIVATION_SECRET, {
    expiresIn: "1hr",
  });
};


// activate
router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;
      const newSeller = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );
      if (!newSeller) {
        return next(new ErrorHandler("Invalid token", 400));
      }
      const { name, phoneNumber, email, password, avatar, zipCode, address } = newSeller;

      let seller = await Shop.findOne({ email });

      if (seller) {
        return next(new ErrorHandler("seller already exists", 400));
      }
      seller = await Shop.create({
        name,
        phoneNumber,
        email,
        avatar,
        password,
        zipCode,
        address
      });
      sendShopToken(seller, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);


//login Shop
router.post("/login-shop", 
catchAsyncErrors(async(req, res, next) => {
  try{
    const {email, password} = req.body;

    if(!email || !password){
      return next(new ErrorHandler("Please provide the all fields!", 400));
    }

    const seller = await Shop.findOne(({email})).select("+password");
    // console.log(seller)

    if(!seller){
      return next(new ErrorHandler("Seller doesn't exists!", 400));
    }

    const isPasswordValid = await seller.comparePassword(password);

    if(!isPasswordValid){
      return next(
        new ErrorHandler("Please provide the correct information", 400)
      )
    }

    sendShopToken(seller, 201, res);
  }catch(error){
    return next(new ErrorHandler(error.message, 500));
  }
})
);



// load user
router.get(
  "/getseller",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const seller = await Shop.findById(req.seller._id);

      if (!seller) {
        return next(new ErrorHandler("User doesn't exists", 400));
      }

      res.status(200).json({
        success: true,
        seller,
      });
    } catch (error) {
      console.log("kunal")
      return next(new ErrorHandler(error.message, 500));
    }
  })
);


//log out from shop
router.get("/logout", catchAsyncErrors(async (req, res, next) => {
  try{
    res.cookie("token_seller", null, {
      expires: new Date(Date.now()),
      httpOnly: true
    });
    res.status(201).json({
      success: true,
      message: "log out successfully",
    });
  }catch(error){
    return next(new ErrorHandler(error.message, 500));
  }
}))



//get shop info
router.get("/get-shop-info/:id", isSeller, catchAsyncErrors(async (req, res, next) => {
  try{
    const shop = await Shop.findById(req.params.id);
    console.log(shop)
    res.status(201).json({
      success: true,
      shop,
    })
  }catch(error){
    return next(new ErrorHandler(error.message, 500));
  }
}))

//update user avatar
router.put(
  "/update-seller-avatar",
  isSeller,
  upload.single("image"),
  catchAsyncErrors(async (req, res, next) => {
    console.log("error");
    try {
      const existsSeller = await Shop.findById(req.seller._id);
      // console.log(existsSeller);

      const existAvatarPath = `${existsSeller.avatar}`;
      console.log(existAvatarPath);

      fs.access(existAvatarPath, fs.constants.F_OK, (err) => {
        if (err) {
          console.log("File does not exist:", existAvatarPath);
        } else {
          fs.unlink(existAvatarPath, (err) => {
            if (err) {
              console.error("Error deleting file:", err);
            } else {
              console.log("File deleted successfully.");
            }
          });
        }
      });

      const fileUrl = path.join(req.file.filename);
      // console.log(fileUrl);

      const seller = await Shop.findByIdAndUpdate(req.seller._id, {
        avatar: fileUrl,
      });
      // console.log(seller);

      await seller.save();
console.log("done")
      res.status(200).json({
        success: true,
        seller,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

//update user info
router.put(
  "/update-seller-info",
  isSeller,
  catchAsyncErrors(async (req, res) => {
    console.log("error");
    try {
      const { name, description, address, phoneNumber, zipCode } = req.body;
      // console.log(req.body);
      // console.log(req.seller._id);
      const seller = await Shop.findOne(req.seller._id)

      // console.log(seller);
      if (!seller) {
        return next(new ErrorHandler("seller not found", 400));
      }
      console.log("sonow")
      seller.name = name;
      seller.description = description;
      seller.address = address;
      seller.phoneNumber = phoneNumber;
      seller.zipCode = zipCode;
      await seller.save();
console.log("iowe")
      res.status(201).json({
        success: true,
        seller,
      });
    } catch (error) {
      console.log("ioowniewer")
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
