const express = require("express");

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

mongoose.connect('mongodb+srv://marciamoss:U95kPxhGn8qiuCMs@cluster0.qns5q.mongodb.net/newgooglebooks',
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
