const express = require("express");
const ErrorHandler = require("./middleware/error");
const app = express();
const cookieParser = require("cookie-parser");


const bodyParser = require("body-parser");
const cors = require("cors");


app.use(express.json());
app.use(cookieParser());
app.use(cors({
      origin: "http://localhost:3000",
      credentials: true
}));
app.use("/", express.static("uploads"))
app.use(bodyParser.urlencoded({extended:true,limit:"50mb"}));


//config
if(process.env.NODE_ENV !== 'production'){
      require("dotenv").config({
            path:"backend/config/.env"
      })
}

const user = require("./controller/user");
const shop = require("./controller/seller");
const product = require("./controller/product");
const event = require("./controller/event");
const coupon = require("./controller/couponCode")
const payment = require("./controller/payment")
const order = require("./controller/order")
const conversation = require("./controller/conversation")


app.use("/user",user);
app.use("/shop",shop);
app.use("/product",product);
app.use("/event",event);
app.use("/coupon", coupon);
app.use("/payment", payment)
app.use("/order", order);
app.use("/conversation", conversation);



app.use(ErrorHandler);

module.exports = app;