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

router.get("/bill", (req, res) => {
    res.render("bill");
})


router.post('/bill', (req, res) => {
    console.log(req.body)
})

var lesit = 1;

router.post("/", (req, res) => {
    const x = req.body;
    x.forEach(item => {
        itemName = item.name;
        grocery.find({
            productName: itemName
        }, 'quantity', function (err, docs) {

            if (err) {
                console.log(err)
            } else if (docs[0].quantity < parseInt(item.quantity)) {
                lesit = -1;

            } else {

                grocery.findOneAndUpdate({
                    productName: item.name
                }, {
                    $inc: {
                        quantity: -item.quantity
                    }
                }, function (err, docs) {
                    if (err) {
                        console.log(err)
                    } else {
                        // console.log(docs);
                    }
                })


            }

        })

    });
    if (lesit != -1) {
        var data = {
            success: true,
            message: "items are available",
            items: x
        };

        // Adds header
        res.setHeader('Content-Type', 'application/json');

        // responds with status code 200 and data
        res.status(200).json(data);
    } else {
        var data = {
            success: false,
            message: "items are low"
        };

        // Adds header
        res.setHeader('custom_header_name', 'abcde');

        // responds with status code 200 and data
        res.status(200).json(data);
    }

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
            // res.status(401).send("please register before logging int");
        } else {
            // console.log(docs);
            // res.status(200).send("successfully logged in");
            res.redirect("/");


        }
    })


})




//Registration page
router.get("/register", (req, res) => {
    res.render("register");
})


router.post("/register", (req, res) => {
    const name = req.body.userName;
    const phnumber = req.body.userphoneNumber;
    const email = req.body.userEmail;
    const password = req.body.userPassword;
    const dbdata = {
        userName: name,
        phoneNumber: phnumber,
        Email: email,
        Password: password
    }
    // console.log(dbdata);
    // if (name == "" || phnumber == "" || email == "" || password == "") {
    //     res.status(400).send("please enter all the details that are mentioned above");
    // } else {
    // }
    const user = new newUser(dbdata);
    user.save().then((err, data) => {
        if (err) {
            console.log(err);
        }
        console.log("registration completed")
        // res.status(201).send("ok successfully created");
        res.redirect('/');

    })






})

module.exports = router;