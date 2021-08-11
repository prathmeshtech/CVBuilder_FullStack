const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");

require("./db/connect");

const Register = require("./models/registers");

const port = process.env.PORT || 3000;           //assigning localport OR Server port to a constant

const static_path = path.join(__dirname, "../public");  //assigning path to a constant
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));     //passing static_path const 
app.set("view engine", "hbs");            //passing hbs const
app.set("views" , template_path);         //passing template_path 

hbs.registerPartials(partials_path); 


// app.get("/", (req, res) => {    
//     res.render("index");
// });

app.get("/", (req, res) => {     
    res.render("register");
});

app.post("/register",  async(req, res) => {     
    try {
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;

        if(password === cpassword){
            const registerCV = new Register({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                phone: req.body.phone,
                gender: req.body.gender,
                password: req.body.password,
                confirmpassword: req.body.confirmpassword,
            })

            const registered = await registerCV.save();
            res.status(201).render("index");

        }else{
            res.send("password not matching")
        }
    } catch (error) {
        res.status(400).send(error)
    }
});

app.listen(port, () => {                        //using that const port to listen
    console.log(`server is running fine on port number ${port}`); 
})