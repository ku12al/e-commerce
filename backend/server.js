const app = require("./app");
const connecDatabase = require("./db/Database");

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
