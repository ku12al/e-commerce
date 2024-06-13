const express = require("express");
const { isSeller } = require("../middleware/auth");
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/ErrorHandler");
const CoupounCode = require("../model/coupounCode");
const router = express.Router();

router.post(
  "/create-coupon-code",
  isSeller,
  catchAsyncError(async (req, res, next) => {
    try {
      const isCouponCodeExists = await CoupounCode.find({
        name: req.body.name,
      });

      if (isCouponCodeExists !== 0) {
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
      const coupounCodes = await CoupounCode.find({
        shop: {
          _id: req.params.id,
        },
      });
      res.status(201).json({
        success: true,
        coupounCodes,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

module.exports = router;
