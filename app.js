const express = require("express");
const app = express();

const notFound = (req, res) => res.status(404).send("Route does not exist");

const authenticateUser = require("./middleware/auth");

const login = require("./routes/login");
const worker = require("./routes/worker");
const project = require("./routes/project");
const workplace = require("./routes/workplace");
const work = require("./routes/work");

app.use(express.json());

app.use("/login", login);
app.use("/worker", authenticateUser, worker);
app.use("/project", authenticateUser, project);
app.use("/workplace", authenticateUser, workplace);
app.use("/work", authenticateUser, work);

app.use(notFound);

app.listen(5000, () => {
  console.log("Server is listening on port 5000....");
});
