const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const express = require("express");
const Conversation = require("../model/conversation");
const router = express.Router();

router.post(
  "/create-now-conversation",
  catchAsyncError(async (req, res, next) => {
    try {
      const { groupTitle, userId, sellerId } = req.body;

      const isConversation = await Conversation.findOne({ groupTitle });

      if (isConversation) {
        const conversation = isConversation;
        res.status(201).json({
          success: true,
          conversation,
        });
      } else {
        const conversation = await Conversation.create({
          members: [userId, sellerId],
          groupTitle: groupTitle,
        });

        res.status(201).json({ success: true, conversation });
      }
    } catch (err) {
      return next(new ErrorHandler(err.response.message), 500);
    }
  })
);

module.exports = router;
