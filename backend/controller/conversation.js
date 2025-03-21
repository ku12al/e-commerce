const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const express = require("express");
const Conversation = require("../model/conversation");
const router = express.Router();
const { isAuthenticated, isSeller } = require("../middleware/auth");
const conversation = require("../model/conversation");
router.post(
  "/create-new-conversation",
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

//get seller conversation
router.get(
  "/get-all-conversation-seller/:id",
  isSeller,
  catchAsyncError(async (req, res, next) => {
    try {
      const conversations = await Conversation.find({
        members: {
          $in: [req.params.id],
        },
      }).sort({ updateAt: -1, createdAt: -1 });

      res.status(201).json({
        success: true,
        conversations,
      });
    } catch (error) {
      return next(new ErrorHandler(error.response.message), 500);
    }
  })
);

//get user conversation
router.get(
  "/get-all-conversation-user/:id",
  isAuthenticated,
  catchAsyncError(async (req, res, next) => {
    try {
      const conversations = await Conversation.find({
        members: {
          $in: [req.params.id],
        },
      }).sort({ updateAt: -1, createAt: -1 });

      res.status(201).json({
        success: true,
        conversations,
      });
    } catch (error) {
      return next(new ErrorHandler(error), 500);
    }
  })
);


//update the last message
router.put("/update-last-message/:id", catchAsyncError(async(req, res, next) => {
  try{
    const {lastMessage, lastMessageId} = req.body;

    const conversation = await Conversation.findByIdAndUpdate(req.params.id, {
      lastMessage,
      lastMessageId,
    })

    res.status(200).json({
      success: true,
      conversation,
    })
  }catch(error){
    return next(new ErrorHandler(error), 500);
  }
}))

module.exports = router;
