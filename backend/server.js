const app = require("./app");
const connecDatabase = require("./db/Database");
const cloudinary = require("cloudinary")

//Handel error
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`sutdown the server for handling uncaugth error`);
});

//config
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({
    path: "backend/config/.env",
  });
}

//connect database
connecDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

//server start running
const server = app.listen(process.env.PORT, () => {
  console.log(
    `server is running on port http://localhost:${process.env.PORT}`
  );
});


//handle server rejection
process.on("unhandledRejection", (err) => {
  console.log(`shutdown down the server for ${err.message}`);
  console.log(`shutdown down the server for unhandled error rejection`);

  server.close(() => {
    process.exit(1);
  });
});
