const mongoose = require("mongoose");
const url =
  "mongodb+srv://tapioka:xKg7lnkrTkZMHr0T@cluster0.rkcbmqv.mongodb.net/?retryWrites=true&w=majority";
const conectarDB = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB conectada");
  } catch (error) {
    console.log(error);
  }
};

module.exports = conectarDB;
