const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name!"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email!"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [4, "Password should be greater than 4 characters"],
    select: false,
  },
  phoneNumber: {
    type: Number,
    required: [true, "Please enter your phone number!"],
  },
  addresses: [
    {
      country: {
        type: String,
      },
      city: {
        type: String,
      },
      address1: {
        type: String,
      },
      address2: {
        type: String,
      },
      zipCode: {
        type: Number,
      },
      addressType: {
        type: String,
      },
    },
  ],
  role: {
    type: String,
    default: "user"
  },
  avatar: {
    // public_id: {
    //   type: String,
    //   required:false,
    // },
    // url: {
    //   type: String,
    //   required: false,
    // },
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  resetPasswordToken: String,
  resetPasswordTime: Date,
});


//  Hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next(); // Add return statement here
  }

  this.password = await bcrypt.hash(this.password, 10);
  next(); // Call next() after updating the password
});

    
    // jwt token
    userSchema.methods.getJwtToken = function () {
      return jwt.sign({ id: this._id}, process.env.JWT_SECRET_KEY,{
        expiresIn: process.env.JWT_EXPIRES,
      });
    };
    
    // compare password
    userSchema.methods.comparePassword = async function (enteredPassword) {
      return await bcrypt.compare(enteredPassword, this.password);
    };
    
    module.exports = mongoose.model("User", userSchema);