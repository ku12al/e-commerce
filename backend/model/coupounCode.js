const mongoose = require("mongoose");

const coupounCodeSchem = new mongoose.Schema({
      name:{
            type:String,
            required:[true, "Please enter you coupon code name!"],
            unique: true,
      },
      value:{
            type: Number,
            required: true,

      },
      minAmount:{
            type: Number,
      },
      maxAmount:{
            type: Number,
      },
      shop:{
            type:Object,
            required:true,
      },
      selectedProduct:{
            type:String,
      },
      createAt:{
            type: Date,
            default: Date.now(),
      }
})

module.exports = mongoose.model("CoupounCode", coupounCodeSchem);