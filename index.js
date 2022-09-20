const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("express-flash");
const cookieParser = require("cookie-parser");

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser("youwantsomecookies?"));

app.use(session({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: true,
        cookie: {maxAge: 60000}
    })
);

app.use(flash());

app.get("/", (req, res) => {
    var email = req.flash('email');
    var emailError = req.flash('emailError');
    var nameError = req.flash('nameError');
    var passwordError = req.flash('passwordError');

    if(email != undefined) {
        if(email.length == 0) {
            email = email;
        }
    }

    if(emailError != undefined) {
        if(emailError.length == 0) {
            emailError = undefined;
        }
    }

    if(nameError != undefined) {
        if(nameError.length == 0) {
            nameError = undefined;
        }
    }
    if(passwordError != undefined) {
        if(passwordError.length == 0) {
            passwordError = undefined;
        }
    }

    res.render("index", {emailError, nameError, passwordError, email: email});
})

app.post("/form", (req, res) => {
    var {email, name, password} = req.body;
    var emailError;
    var nameError;
    var passwordError;

    if(email == undefined || email == ''){
        emailError = 'the email cannot be empty';
    }
    if(name == undefined || name == ''){
        nameError = 'the name cannot be empty';
    }

    if(name.length < 3 ){
        nameError = 'the name must be at least 3 letters';
    }
    
    if(password == undefined || password == ''){
        passwordError = 'the password cannot be empty';
    }

    if(emailError != undefined || nameError != undefined || passwordError != undefined) {
        req.flash('emailError', emailError);
        req.flash('nameError', nameError);
        req.flash('passwordError', passwordError);
        req.flash('email', email);

        res.redirect('/')
    } else {
        res.send('Form OK');
    }
})

app.listen(3000, () => {
    console.log("listening on http://localhost/3000");
});
