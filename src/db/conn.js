const mongoose = require("mongoose");

        mongoose.connect("mongodb://127.0.0.1:27017/userRegistration", {
        }).then(() => {
            console.log(`connection successful`); // if connection is established
        }).catch((e) => {
            console.log(`connection failed`) // if connection is not successfull
        })

        // used to connect to the database where the user inputs well be stored.