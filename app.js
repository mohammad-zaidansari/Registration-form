const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Registration = require("./models/regForm.js");
// const dotevn = require("dotenv");
// dotevn.config();

app.use(express.urlencoded({extended: true}));      // To encode the data that comes from the form....

// const connectDb = process.env.CONNECTION_DB;

main()
.then(() => {
    console.log("DB connection successfully");
})
.catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/registrationForm');

};

// let reg1 = new Registration({
//     name: "zaid",
//     email: "zaid@gmail.com",
//     password: "123"
// });
// reg1.save().then(res => {console.log(res)});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/pages/index.html");
});

app.post("/register", async (req, res) => {
    try{
        const{ name, email, password } = req.body;

        const exitingUser = await Registration.findOne({email : email});
        if(!exitingUser){
            const registrationData = new Registration({
                name,
                email,
                password
            });
            await registrationData.save();
            res.redirect("/success");
        }else{
            console.log("User already exist in DB");
            res.redirect("/error");
        }

       
    }catch(error){
        console.log(error);
        res.redirect("error");
    }
    
});

app.get("/success", (req, res) => {
    res.sendFile(__dirname + "/pages/success.html");
});

app.get("/error", (req, res) => {
    res.sendFile(__dirname + "/pages/error.html");
});

app.listen(3000, () => {
    console.log("server is listening on port 3000");
});