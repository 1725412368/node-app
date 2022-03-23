const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const res = require("express/lib/response");
const app = express();
const passport = require("passport");

//引入users.js
const users = require("./routers/api/users");
const profiles = require("./routers/api/profiles");

//DB config
const db = require("./config/keys").mongoURI;

//使用body-parser中间件
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//passport初始化
// app.use(passport.initialize());

//Connect to mongodb
mongoose.connect(db,{useNewUrlParser:true})
         .then(() => console.log("MongoDB connected"))
         .catch(err => console.log(err))   

// app.get("/",(req,res) => {
//     res.send("Helld World!");
// })
//passport初始化
app.use(passport.initialize());
require("./config/passport")(passport);

//use routers
app.use("/api/users",users);
app.use("/api/profiles",profiles);

const port = process.env.PORT || 5000;
app.listen(port,() =>{
    console.log(`Server runnimg on port ${port}`);
})