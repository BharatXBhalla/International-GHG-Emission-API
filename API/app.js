const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());



// Routes
app.use("/country", require("./routes/country"));
app.use("/countries",require("./routes/countries"));


app.use(function (err, req, res, next) {
  console.log(err);
  res.status(500).json({"error":err.stack});
})
module.exports = app;
