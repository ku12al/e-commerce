const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
      name:{
            type:String,
            required: [true, "please enter your product name!"]
      },
      description:{
            type:String,
            required:[true, "please enter your product description"]
      },
      category:{
            type:String,
            required:[true, "please enter your product catagory"]
      },
      tags:{
            type:String,
      },
      originalPrice:{
            type:Number,
      },
      discountPrice:{
            type:Number,
            required:[true, "please enter your product price"]
      },
      stock:{
            type:Number,
            required:[true, "please enter your product stock"]
      },
      images:[
            {
                  type:String
            },
      ],
      reviews:[
            {
                  user:{
                        type:Object,
                  },
                  rating:{
                        type:Number,
                  },
                  message:{
                        type:String,
                  },
                  productId:{
                        type:String,
                  },
                  createdAt:{
                        type: Date,
                        default: Date.now(),
                  }
            },
      ],
      ratings:{
            type:Number,
      },
      shopId:{
            type: String,
            required:true
      },
      shop:{
            type:Object,
            required:true
      },
      sold_out:{
            type:Number,
            default:0,
      },
      createAt:{
            type:Date,
            default:Date.now()
      }

})

module.exports = mongoose.model('Product', productSchema)