const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const employeeSchema = new mongoose.Schema({
    username : {
        type:String,
        required:true
    },
    email : {
        type:String,
        required:true,
        unique:true
    },
    mobile: {
        type:Number,
        required:true,
        unique:true
    },
    gender : {
        type:String,
        required:true
    },
    city : {
        type:String,
        required:true
    },
    password : {
        type:String,
        required:true
    },
    confirmpassword :{
        type:String,
        required:true
    }
})

// employeeSchema.methods.generateAuthToken = async function(){
//     try{
//         const token = jwt.sign({_id:this._id.toString()},"mynameissaurabhdhankariamfromu");
//         console.log(token);

//     } catch(error){
//         res.send("the error part" +error);
//         console.log("the error part" +error);

//     }
// }



//now we need to create collection
 //password hash
 employeeSchema.pre("save",async function(next) {
    if(this.isModified("password")){
        // const passwordHash =  await bcrypt.hash(password, 10);
        console.log(`${this.password}`);
        this.password = await bcrypt.hash(this.password, 10);
        console.log(`${this.password}`);
        next();

        this.confirmpassword = undefined;
    }

})



const Register = new mongoose.model("Register",employeeSchema);
module.exports = Register;