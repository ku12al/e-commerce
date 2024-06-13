const express = require("express")
const router = express.Router();
const catchAsyncError = require("../middleware/catchAsyncError");
const Shop = require("../model/shop");
const Event = require("../model/event");
const upload = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const { isSeller } = require("../middleware/auth");



router.post(
      "/create-event",
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
            const eventData = req.body;
            eventData.images = imageUrls;

    
            eventData.shop = shop;
            const event = await Event.create(eventData);

    
            res.status(201).json({
              success: true,
              event,
            });
          }
        } catch (error) {
          return next(new ErrorHandler(error, 400));
        }
      })
    );


    
    //get all events of a shop

router.get(
  "/get-all-events/:id",
  catchAsyncError(async (req, res, next) => {
    
    try {
      const events = await Event.find({ shopId: req.params.id });
      res.status(201).json({
        success: true,
        events,
      });

    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

//delete product of a shop
router.delete(
  "/delete-shop-event/:id",
  isSeller,
  catchAsyncError(async (req, res, next) => {
    try {
      const productId = req.params.id;

      const eventData = await Event.findById(productId);

      eventData.images.forEach((imageUrl) =>{
        const filename = imageUrl;
        const filePath = `uploads/${filename}`;

        fs.unlink(filePath, (err) =>{
          if(err){
            console.log(err);
          }
        })
      })

      const event = await Event.findByIdAndDelete(productId);
      if (!event) {
        return next(new ErrorHandler("event not found with this id!", 500));
      }
      res.status(201).json({
        success: true,
        message: "event will be deleted"
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);
    module.exports = router;