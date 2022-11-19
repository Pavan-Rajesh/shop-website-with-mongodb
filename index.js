const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/appdb')
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())
app.use(express.static("public"));

const shop = require("./routes/routes");



app.use("/", shop);



app.listen(3000, (err) => {
    if (err) throw err;
    console.log("connected....")
});