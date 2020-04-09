
// require express package
const express = require("express");

//Initialize app to hold express methods and create a port
const app = express();
const PORT = process.env.PORT || 8080;

//Set up body parsing, static, and route middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
//  access .js files for api and html routes
require("./routes/apiRoutes")(app);
// const htmlRoutes = require("./routes/htmlRoutes");



//Start the Server on the port defined above
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));

//  END OF BOILERPLATE  /////////////////////////////////////

