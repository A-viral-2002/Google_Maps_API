const mongoose = require("mongoose");

//Create Database
mongoose.connect("mongodb://localhost:27017/AWP", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connection Successful");
}).catch((error) => {
    console.log(error);
})