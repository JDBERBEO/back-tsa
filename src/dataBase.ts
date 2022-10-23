// const mongoose = require('mongoose');
import mongoose from 'mongoose';

function connect() {
  const mongoURI =
    process.env.MONGO_URI || 'mongodb://localhost:27017/me-retracto';
  mongoose
    .connect(mongoURI)
    .then(() => {
      console.log('Connection established successfully');
    })
    .catch((error: Error) => {
      console.log('Something went wrong', error);
    });
}

export default connect;
