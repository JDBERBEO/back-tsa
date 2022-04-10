const mongoose = require("mongoose");
function connect() {
  const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/me-retracto";
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  mongoose
    .connect(mongoURI, options)
    .then(() => {
      console.log("Connection established successfully");
    })
    .catch((error: Error) => {
      console.log("Something went wrong", error);
    });
}

export default connect;
