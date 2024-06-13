const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000;
const User = require("./dbs/User")
require("dotenv/config")

app.use(express.json())
app.use(cors());

const bcypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET

require('./dbs/config');


const foodItem = require('./dbs/fooditem');



app.get("/health",(req,res)=>{
  res.send({message:"health is ok"})
})

app.use("/api", require("./Routes/CreateUser"))
app.use("/api", require("./Routes/DisplayData"))
app.use("/api", require("./Routes/OrderData"))


app.post('/login', async (req, res) => {
  if (req.body.email && req.body.password) {
    try {
      let user = await User.findOne({ email: req.body.email})
      const isPassword = await bcypt.compare(req.body.password,user.password)
      if (isPassword) {
        const id = {
          id:user.id
        }
        const jwtToken = jwt.sign(id,jwtSecret)
        res.send({user,jwtToken});
      } else {
        res.send("User does not exist");
      }
     
    } catch (err) {
      console.error(err);
      res.status(500).send({ result: "Something went wrong" });
    }
  } else {
    res.status(400).send("Email and password are required");
  }
});







app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
