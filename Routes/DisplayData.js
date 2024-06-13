const express = require("express");
const router = express.Router();

const foodItem = require('../dbs/fooditem');
const mongoose = require("mongoose");

router.post("/fooddata",async(req,res)=>{
    try {
        const result = await foodItem.find({})
        const foodCategory = await mongoose.connection.db.collection("foodcategory").find({}).toArray();
        res.send([result,foodCategory]);
    } catch (error) {
        console.log(error.msg);
        res.send("server error")
    }
})

module.exports = router;