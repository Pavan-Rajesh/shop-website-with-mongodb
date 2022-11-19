const express = require("express");
const newUser = require("../models/register");
const router = express.Router();
const mongoose = require('mongoose')
const grocery = require("../models/products");

// Home page
router.get("/checkout", (req, res) => {
    res.send("this is checkout page");
})


router.get("/", (req, res) => {
    // const pro = {
    //     productName: "dal",
    //     quantity: 43
    // }
    // const item = new grocery(pro);
    // item.save().then((err, data) => {
    //     if (err) {
    //         console.log(err)
    //     }
    //     console.log("successfully saved")
    // })
    res.render("homepage");
})

router.post("/", (req, res) => {
    const x = req.body;
    x.forEach(item => {
        itemName = item.name;
        grocery.find({
            name: itemName
        }, 'quantity', function (err, docs) {

            if (err) {
                console.log(err)
            } else if (docs[0].quantity < parseInt(x[0].quantity)) {
                var data = {
                    success: false,
                    message: "items are low"
                };

                // Adds header
                res.setHeader('custom_header_name', 'abcde');

                // responds with status code 200 and data
                res.status(200).json(data);
            } else {
                var data = {
                    success: true,
                    message: "items are present"
                };

                // Adds header
                res.setHeader('Content-Type', 'application/json');

                // responds with status code 200 and data
                res.status(200).json(data);
            }

        })
    });

})




// login page

router.get('/login', (req, res) => {
    res.render("login");
})

router.post("/login", (req, res) => {

    console.log(req.body.userPassword);
    console.log(req.body.userEmail);

    newUser.find({

        $and: [{
            Password: req.body.userPassword
        }, {
            Email: req.body.userEmail
        }]
    }, function (err, docs) {
        if (err) {
            throw err;
        } else if (docs.length == 0) {
            res.send("login unsuccessful")
        } else {
            // console.log(docs);
            res.redirect('/');
        }
    })


})




//Registration page
router.get("/register", (req, res) => {
    res.render("register");
})


router.post("/register", (req, res) => {

    const name = req.body.userName;
    const phnumber = req.body.userphoneNumber
    const email = req.body.userEmail;
    const password = req.body.userPassword;
    const dbdata = {
        userName: name,
        phoneNumber: phnumber,
        Email: email,
        Password: password
    }
    const user = new newUser(dbdata);
    user.save().then((err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log("registration completed");
        }
    })

    res.redirect('/');
})

module.exports = router;