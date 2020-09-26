require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
var cors = require("cors");
const port = 3001;
const app = express();
const { verify } = require("./middleware");
const { login, refresh } = require("./authentication");

app.use(cookieParser());
const corsOptions = {
  //To allow requests from client
  origin: ["http://localhost:3000"],
  credentials: true,
  exposedHeaders: ["Uid", "Access-Token", "set-cookie"],
};

app.use(cors(corsOptions));
app.options("*", cors());

app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//app.get('/comments', verify, routeHandler)
app.post("/login", login);
app.post("/refrsh", refresh);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
