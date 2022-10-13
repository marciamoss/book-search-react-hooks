const express = require("express");
require("dotenv").config();

const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);
let userName=process.env.USER_NAME;
let password=process.env.PASSWORD;
mongoose.connect(`mongodb+srv://${userName}:${password}@cluster0.qns5q.mongodb.net/newgooglebooks`,
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
).then(()=>console.log('db connected'))
.catch(e=>console.log('db connection failed', e));;

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
