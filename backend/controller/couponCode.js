const express = require("express");
const { isSeller } = require("../middleware/auth");
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/ErrorHandler");
const CoupounCode = require("../model/coupounCode");
const coupounCode = require("../model/coupounCode");
const router = express.Router();

router.post(
  "/create-coupon-code",
  isSeller,
  catchAsyncError(async (req, res, next) => {
    try {
      const isCouponCodeExists = await CoupounCode.find({
        name: req.body.name,
      });

      if (isCouponCodeExists.length !== 0) {
        return next(new ErrorHandler("Coupoun code already exists", 400));
      }

      const coupounCode = await CoupounCode.create(req.body);

      res.status(201).json({
        success: true,
        coupounCode,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

//get all coupouns of a shop
router.get(
  "/get-coupon/:id",
  isSeller,
  catchAsyncError(async (req, res, next) => {
    try {
      const coupounCodes = await CoupounCode.find({ shopId: req.seller.id });
      res.status(201).json({
        success: true,
        coupounCodes,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);


//delete coupon code of a shop
router.delete("/delete-coupon/:id", isSeller, catchAsyncError(async(req, res, next) => {
  try{
    const couponCode = await CoupounCode.findByIdAndDelete(req.params.id);

    if(!couponCode){
      return next(new ErrorHandler("Coupoun code dosn't exists!", 400));
    }

    res.status(201).json({
      success: true,
      message: "Coupoun code deleted successfully"
    })

  }catch(error){
    return next(new ErrorHandler(error, 400));
  }
}))

router.get("/get-coupon-value/:name", catchAsyncError(async (req, res, next) =>{
  try {
    const coupounCode = await CoupounCode.find({
      name: req.params.name,
    });
    res.status(201).json({
      success: true,
      coupounCode,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
}))

module.exports = router;
