const express = require("express"); // importing the express
const path = require("path"); // provides utilities for working with file and directory paths
const app = express(); // making an express app
const hbs = require("hbs"); // use to render hbs files
const Register = require("./models/registers"); // importing register.js file form modules
const port = process.env.PORT || 3000; // defining the port on which the project will be running
//console.log(path.join(__dirname, "../public"));
const static_path = path.join(__dirname, "../public"); // use to join specific path segments into one
const template_path = path.join(__dirname, "../templates/views"); // use to join specific path segments into one
const partials_path = path.join(__dirname, "../templates/partials"); // use to join specific path segments into one

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(express.static(static_path));
app.set("view engine", "hbs"); // setting view engine and hbs
app.set("views", template_path);
hbs.registerPartials(partials_path);
require("./db/conn"); // linking to the connection


app.get("/", (req, res) => {
    res.render("index")
}); // using it to render index.hbs page

app.get("/register", (req, res) => {
    res.render("register");
}); // using it to render register.hbs page
app.get("/login", (req, res) => {
    res.render("login");
}); // using it to render login.hbs page
app.post("/register", async (req, res) => { //creating a async function post request after submitting the form
    try { // try method to check if password and confirm password are really same
        const password = req.body.password; // taking the password entered by the user
        const cpassword = req.body.cpassword; // taking the password entered by the user
        if (password === cpassword) { // checking if both passwords are same
            const registerEmployee = new Register({
                firstname: req.body.firstname, // taking the details that the user fills
                lastname: req.body.lastname,
                email: req.body.email,
                gender: req.body.gender,
                phone: req.body.phone,
                age: req.body.age,
                password: password,
                cpassword: cpassword,
                
            })
            const registered = await registerEmployee.save(); // if the passwords are not matching
            res.status(201).render("index");
            //res.status(201).render("register");
        } else {
            console.log(password)
            console.log(cpassword)
            res.send("passwords are not matching")
        }
    } catch (error) { // error if user tries to register with same email again
        res.status(400).send(error);
    }
});



app.post("/login", async (req, res) => { //setting a async function with req and res
    try {
        const email = req.body.email; //takig the email and password user enters in login page
        const password = req.body.password;

        //console.log(`${email} and password is ${password}`)
        const useremail = await Register.findOne({email:email}) //checking if the email is registered or not with us

        if(useremail.password===password){
            res.status(201).send(`
            <!DOCTYPE html>
            <html>
            
            <head>
            <title>Details</title>
                <!-- Required meta tags -->
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            
                <!-- Bootstrap CSS -->
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css"
                    integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous" />
            
                    <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <a class="navbar-brand" href="#">User Registration</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                      <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                      <ul class="navbar-nav">
                        <li class="nav-item active">
                          <a class="nav-link" href="http://localhost:3000">Home<span class="sr-only">(current)</span></a>
                        </li>
                      <li class="nav-item active">
                          <a class="nav-link" href="http://localhost:3000/register">Register</a> 
                        </li>
                        <li class="nav-item active">
                          <a class="nav-link" href="http://localhost:3000/login">Login</a>
                        </li>
                      </ul>
                    </div>
                  </nav>
                  
                <style>
                    table {
                        font-family: arial, sans-serif;
                        border-collapse: collapse;
                        width: 70%;
                    }
            
                    td,
                    th {
                        border: 1px solid #dddddd;
                        text-align: left;
                        padding: 8px;
                    }
            
                    tr:nth-child(even) {
                        background-color: #dddddd;
                    }
                </style>
            </head>
            
            <body>
                <div class="container">
                    <div class="jumbotron">
            
                        <center>
                            <h2>Details of ${useremail.firstname}</h2>
                            <table>
                            <br>
                                <h4>Personal Details :</h4>
                                <br><br>
                                <tr>
                                    <td>User Name</td>
                                    <td>${useremail.firstname} ${useremail.lastname}</td>
                                </tr>
                                <tr>
                                    <td>User Email</td>
                                    <td>${useremail.email}</td>
                                </tr>
                                <tr>
                                    <td>User Phone No.</td>
                                    <td>${useremail.phone}</td>
            
                                </tr>
                                <tr>
                                    <td>User Gender</td>
                                    <td>${useremail.gender}</td>
                                </tr>
                                <tr>
                                    <td>Student Age</td>
                                    <td>${useremail.age}</td>
            
                                </tr>
                            </table>
                            <br>
                            <form action="http://localhost:3000">
                            <input type="submit" value="Logout" />
                            </form>
                        </center>
                    </div>
                </div>
                <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
                    integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
                    crossorigin="anonymous"></script>
                <script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.3/dist/umd/popper.min.js"
                    integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49"
                    crossorigin="anonymous"></script>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/js/bootstrap.min.js"
                    integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy"
                    crossorigin="anonymous"></script>
            </body>
            
            </html>
            `); //if the user enters the correct password 
        }else{
            res.send("incorrectpassword")
        }
    } catch (error) {
        res.status(400).send("notregistered");
    }
});


app.listen(port, () => {
    console.log(`server is running at port no ${port}`);
})