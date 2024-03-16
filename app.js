const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotevn = require("dotenv");
const bodyParser = require("body-parser");


dotevn.config();
app.use(express.urlencoded({extended: true}));      // To encode the data that comes from the form....


const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD

const connectDB = async () => {
    try{
        await mongoose.connect(`mongodb+srv://${username}:${password}@registration-form.tkp4ji0.mongodb.net/?retryWrites=true&w=majority&appName=registration-form`);
        console.log("Connect to MongoDB successfully");
    }catch (error) {
        console.log("Connection failed" + error.message);
    }
}
connectDB();   //start DB 

const registrationschema = new mongoose.Schema({
    name : String,
    email : String,
    password : String,
});

const Registration = mongoose.model("Registration",registrationschema );
app.use(bodyParser.urlencoded({ extended : true}));
app.use((bodyParser.json()));


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