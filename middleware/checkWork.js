const checkName = require("../controllers/checker").checkName;
const checkWorkplace = require("../controllers/checker").checkWorkplace;
const checkProject = require("../controllers/checker").checkProject;

const checkWork = async (req, res, next) => {
  const data = {
    worker: req.body.ime,
    project: req.body.projekt,
    workplace: req.body.stroj,
    start_time: req.body.zacetni_cas,
    end_time: req.body.koncni_cas,
  };
  if (
    data.worker &&
    data.project &&
    data.workplace &&
    data.start_time &&
    data.end_time
  ) {
    const workerID = await checkName(data.worker);
    const workplaceCheck = await checkWorkplace(data.workplace);
    const projectCheck = await checkProject(data.project);

    if (!workerID) {
      if (workplaceCheck.length !== 0) {
        if (projectCheck.length !== 0) {
          if (projectCheck[0].status === 1) {
            if (workplaceCheck[0].status === 1) {
              console.log("Data is good!");
              next();
            } else {
              res.status(409).json("Workplace is inactive!");
            }
          } else {
            res.status(409).json("Project is inactive!");
          }
        } else {
          res.status(404).json("Project does not exist!");
        }
      } else {
        res.status(404).json("Workplace does not exist!");
      }
    } else {
      res.status(404).json("Worker does not exist!");
    }
  } else {
    res.status(400).json("Bad request");
  }
};

module.exports = checkWork;
