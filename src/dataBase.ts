const mongoose = require("mongoose");
function connect() {
  const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/roomatch";
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  mongoose
    .connect(mongoURI, options)
    .then(() => {
      console.log("Connection established successfully");
    })
    // TODO: Type the error 
    .catch((error: any) => {
      console.log("Something went wrong", error);
    });
}

module.exports = connect;