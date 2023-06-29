const mongoose = require("mongoose");
const app = require("./app");

const { DB_HOST } = process.env;

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
  })
  .catch(() => {
    console.log("Connection DB failed");
    process.exit(1);
  });
