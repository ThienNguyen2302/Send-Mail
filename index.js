require("dotenv").config()
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const handlebars = require("express-handlebars")
const Mongo = require("./config/database")

const app = express();
Mongo.connect()

app.engine(
  "hbs",
  handlebars.engine({
    defaultLayout: "main",
    extname: ".hbs",
    helpers: {
      getName: (filename, ext)=>{
        return filename.replace(ext, "")
      }
    }
  })
);
app.set("view engine", "hbs");

app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", require("./routers/authRouter"))

app.use("/", require("./routers/userRouter"))

app.listen(3000, () => console.log('listening on port: 3000'));
