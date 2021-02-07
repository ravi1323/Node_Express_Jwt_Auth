const express = require("express");
const path = require("path");
require("dotenv").config();
const cors = require("cors");
const passport = require("passport");

//requiring router
const authRouter = require("./routers/auth");

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cors());
require("./config/passport")(passport);
app.use("/auth", authRouter);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port : ${process.env.PORT || "5000"}`);
});
