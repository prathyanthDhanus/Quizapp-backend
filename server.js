require("dotenv").config();
const app = require("./app");
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
const url = process.env.MONGODB_URL;

//Mongodb connection setup
mongoose
  .connect(url)
  .then(() => console.log("Mongodb Atlas Connected"))
  .catch((error) => console.log("Error : ", error));

// Start the  server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
