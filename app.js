const express = require("express");
const app = express();

const worker = require("./routes/worker");
const project = require("./routes/project");
const workplace = require("./routes/workplace");
const work = require("./routes/work");

//app.use(express.urlencoded({ extended: false }));
// parse json
app.use(express.json());

app.use("/worker", worker);
app.use("/project", project);
app.use("/workplace", workplace);
app.use("/work", work);

app.listen(5000, () => {
  console.log("Server is listening on port 5000....");
});
