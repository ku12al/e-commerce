const express = require("express");
const router = express.Router();
const Product = require("../model/product");
const catchAsyncError = require("../middleware/catchAsyncError");
const Shop = require("../model/shop");
const ErrorHandler = require("../utils/ErrorHandler");
const upload = require("../multer");
const fs = require("fs");
const { isAuthenticated } = require("../middleware/auth");

router.post(
  "/create-product",
  upload.array("images"),
  catchAsyncError(async (req, res, next) => {
    try {
      const shopId = req.body.shopId;
      const shop = await Shop.findById(shopId);

      if (!shop) {
        return next(new ErrorHandler("shop Id is invalid"));
      } else {
        const files = req.files;

        const imageUrls = files.map((file) => `${file.filename}`);
        const productData = req.body;
        productData.images = imageUrls;

        productData.shop = shop;

        const product = await Product.create(productData);
        console.log(product);
        res.status(201).json({
          success: true,
          product,
        });
        console.log(product);
      }
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

//get all products of a shop
router.get(
  "/get-all-products-shop/:id",
  catchAsyncError(async (req, res, next) => {
    try {
      const products = await Product.find({ shopId: req.params.id });

      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

//delete product of a shop
router.delete(
  "/delete-shop-product/:id",
  catchAsyncError(async (req, res, next) => {
    try {
      const productId = req.params.id;

      const productData = await Product.findById(productId);

      productData.images.forEach((imageUrl) => {
        const filename = imageUrl;
        const filePath = `uploads/${filename}`;

        fs.unlink(filePath, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("File deleted successfully");
          }
        });
      });
      const product = await Product.findByIdAndDelete(productId);
      if (!product) {
        return next(new ErrorHandler("Product not found with this id!", 500));
      }
      res.status(201).json({
        success: true,
        message: "Product will be deleted",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

router.get(
  "/get-all-products",
  catchAsyncError(async (req, res, next) => {
    try {
      const product = await Product.find().sort({ createAt: -1 });

      res.status(201).json({
        success: true,
        product,
      });
    } catch (error) {
      console.log(error);
      return next(new ErrorHandler(error, 400));
    }
  })
);

router.put(
  "/create-new-review",
  isAuthenticated,
  catchAsyncError(async (req, res, next) => {
    try {
      const { user, rating, comment, productId } = req.body;
      const product = await Product.findById(productId);

      const review = {
        user,
        rating,
        comment,
        productId,
      };

      const isReviewed = product.reviews.find(
        (rev) => rev.user._id === req.user._id
      );

      if (isReviewed) {
        product.reviews.forEach((rev) => {
          if (rev.user._id === req.user._id) {
            (rev.rating = rating), (rev.comment = comment), (rev.user = user);
          }
        });
      } else {
        product.reviews.push(review);
      }

      let avg = 0;
      product.reviews.forEach((rev) => {
        avg += rev.reating;
      });

      product.ratings = avg / product.reviews.length;
      await product.save({ validateBeforeSave: false });

      await Order.findByIdAndUpdate(
        orderId,
        {
          $set: { "cart.$[elem].isReviewed": true },
        },
        {
          arrayFilters: [{ "elem._id": productId }],
          new: true,
        }
      );

      res.status(200).json({
        success: true,
        message: "Reviewed successfully",
      });
    } catch (err) {
      return next(new ErrorHandler(err, 400));
    }
  })
);

module.exports = router;
