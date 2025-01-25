const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const express = require("express");
const router = express.Router();
const Messages = require("../model/message");
const { isAuthenticated, isSeller } = require("../middleware/auth");
const upload = require("../multer");

router.post(
  "/create-new-message",
  upload.array("image"),
  catchAsyncError(async (req, res, next) => {
    try {
      const messageData = req.body;

      if (req.files) {
        const files = req.files;
        const imageUrls = files.map((file) => `${file.filename}`);
        messageData.images = imageUrls;
      }

      messageData.conversationId = req.body.conversationId;
      messageData.sender = req.body.sender;
      messageData.text = req.body.text;

      const message = new Messages({
        conversationId: messageData.conversationId,
        text: messageData.text,
        sender: messageData.sender,
        images: messageData.images ? messageData.images : undefined,
      });

      await message.save();

      res.status(201).json({
        success: true,
        message,
      });
    } catch (error) {
      return next(new ErrorHandler(error.response.message), 500);
    }
  })
);


//get all message with conversation id
router.get("/get-all-message/:id", catchAsyncError(async(req, res, next) => {
      try{
            const messages = await Messages.find({
                  conversationId: req.params.id,
            });

            res.status(201).json({success: true, messages});
      }catch(error){
            return next(new ErrorHandler(error.message), 500)
      }
}))

module.exports = router;
