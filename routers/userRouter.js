const express = require("express")
const router = express.Router()
const Auth = require("../middlewares/Auth")
const Activated = require("../model/Activated")

router.get("/login", (req,res) => {
    res.render("login")
})
  
router.get('/', Auth.isLoggedIn, (req, res) => {
    Activated.findOne({id: req.user.id})
    .then(a => {
        if(!a.activate) {
            req.session.flash = {
                message: "Tài khoản chưa được kích hoạt",
                type: "danger",
          }
          return res.redirect("/unactivated")
        }
        return res.send(`Hello ${req.user.displayName}`);
    })
});

router.get("/unactivated", (req,res) => {
    res.render("unactivated")
})

router.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.send('Goodbye!');
});

module.exports = router