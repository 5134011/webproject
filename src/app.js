const express = require("express");


const path = require("path");

const app = express();

const hbs = require("hbs");

require("./db/conn");

const Register = require("./models/registers")

const port = process.env.PORT || 4000;

const static_path = path.join(__dirname, "../public");

const template_path = path.join(__dirname, "../src/templates/views");

const partials_path = path.join(__dirname, "../src/templates/partials");

app.use(express.json());

app.use(express.urlencoded({ extended: false }));
// console.log(path.join(__dirname,"../public"));

app.use(express.static(static_path));

app.set("view engine", "hbs");

app.set("views", template_path);


hbs.registerPartials(partials_path);

app.get("/", (req, res) => {
    res.render("index");
})

app.get("/login", (req, res) => {
    res.render("login");
})

app.get("/register", (req, res) => {
    res.render("register");
})

//create a new user in our database
// app.post("/register", async (req, res) => {
//     try {
//         const password = req.body.password;
//         const cpassword = req.body.cpassword;
//         if (password == cpassword) {
//             const registerEmployee = new Register({

//                 username: req.body.username,
//                 email: req.body.email,
//                 mobile: req.body.mobile,
//                 gender: req.body.gender,
//                 city: req.body.city,
//                 password: password,
//                 confirmpassword: cpassword

//             })

           

//             console.log("the success part" + registerEmployee);
//             const registered = await registerEmployee.save();
//             res.status(201).render("index");
//         } else {
//             res.send("passwords are not matching");
//         }
//     } catch (error) {
//         res.status(400).send(error);
//     }
// })

//login check

// app.post("/login", async (req, res) => {
//     try {
//         const email = req.body.email;
//         const password = req.body.password;
//         console.log(`${email} and password is ${password}`);
//         const useremail = await Register.findOne({ email: email });
//         if (useremail.password == password) {
//             // res.send("You are authenticate person");
//             res.status(201).render("index");
//         } else {
//             res.send("password are not matching");
//         }
//         res.send(useremail);
//         console.log(useremail);

//     } catch (error) {
//         res.status(400).send("Invalid Email")
//     }
// })


const jwt = require('jsonwebtoken');
const createToken = async() => {
     const token = await jwt.sign({_id:"60c640c759b4f02174f116f1"}, "mynameissaurabhdhankariamfromu",{
         expiresIn:"2 seconds"
     });
     console.log(token);

     const userVer = await jwt.verify(token,"mynameissaurabhdhankariamfromu");
console.log(userVer);
}
createToken();


// const bcrypt = require("bcryptjs");
// const securePassword = async (password) => {
//     const passwordHash = await bcrypt.hash(password, 10);
//     console.log(passwordHash);

//     const passwordmatch = await bcrypt.compare("saurabh", passwordHash);
//     console.log(passwordmatch);   
// }
// securePassword("saurabh");

app.listen(port, (req, res) => {
    console.log(`server is runing at port no ${port}`);
})
