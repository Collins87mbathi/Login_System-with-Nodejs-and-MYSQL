const express = require('express');
const app = express();
 const path = require("path");
 require('dotenv').config();
const db = require("./models/index");
const AuthRoute = require("./routers/User");
const PORT = process.env.PORT || 8000;


//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//database connection 
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

  
// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
//   });
//routes

app.use('/api/user', AuthRoute);

app.get('/', (req,res)=>{
 res.send("this is a web page")
})

app.use((req,res,err)=> {
let errMessage = err.message || "something went wrong";
let errStatus = err.status || 500;
 return res.status(errStatus).json({
success : false,
message : errMessage,
});
})

app.listen(PORT,()=> {
    console.log(`server is listening to port ${PORT}`);
});