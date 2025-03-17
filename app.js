const express = require("express");
const cors = require("cors");

const app = express();

const notFound = (req, res) => res.status(404).send("Route does not exist");

const authenticateUser = require("./middleware/auth");

const login = require("./routes/login");
const worker = require("./routes/worker");
const project = require("./routes/project");
const workplace = require("./routes/workplace");
const work = require("./routes/work");

app.use(express.json());

const corsOptions = {
  origin: true, // frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  //optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use("/login", login);
app.use("/worker", authenticateUser, worker);
app.use("/project", authenticateUser, project);
app.use("/workplace", authenticateUser, workplace);
app.use("/work", authenticateUser, work);

app.use(notFound);

app.listen(5000, () => {
  console.log("Server is listening on port 5000....");
});
