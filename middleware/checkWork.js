const checkName = require("../controllers/checker").checkName;
const checkWorkplace = require("../controllers/checker").checkWorkplace;
const checkProject = require("../controllers/checker").checkProject;
const prepareResponse = require("../controllers/tools").prepareResponse;

const checkWork = async (req, res, next) => {
  const data = {
    worker: req.body.ime,
    project: req.body.projekt,
    workplace: req.body.stroj,
    start_time: req.body.zacetni_cas,
    end_time: req.body.koncni_cas,
  };
  if (
    typeof data.worker === "string" &&
    typeof data.project === "string" &&
    typeof data.workplace === "string" &&
    typeof data.start_time === "string" &&
    typeof data.end_time === "string"
  ) {
    const workerID = await checkName(data.worker);
    const workplaceCheck = await checkWorkplace(data.workplace);
    const projectCheck = await checkProject(data.project);

    if (workerID.length !== 0) {
      if (workplaceCheck.length !== 0) {
        if (projectCheck.length !== 0) {
          if (projectCheck[0].status === 1) {
            if (workplaceCheck[0].status === 1) {
              console.log("Data is good!");
              next();
            } else {
              const errorMsg = prepareResponse("Workplace is inactive!", 108);
              res.status(409).json({ errorMsg });
            }
          } else {
            const errorMsg = prepareResponse("Project is inactive!", 109);
            res.status(409).json({ errorMsg });
          }
        } else {
          const errorMsg = prepareResponse("Project does not exist!", 107);
          res.status(404).json({ errorMsg });
        }
      } else {
        const errorMsg = prepareResponse("Workplace does not exist!", 105);
        res.status(404).json({ errorMsg });
      }
    } else {
      const errorMsg = prepareResponse("Worker does not exist!", 103);
      res.status(404).json({ errorMsg });
    }
  } else {
    res.status(400).json("Bad request");
  }
};

module.exports = checkWork;
