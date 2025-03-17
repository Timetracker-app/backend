const checkName = require("../controllers/checker").checkName;
const checkWorkplace = require("../controllers/checker").checkWorkplace;
const checkProject = require("../controllers/checker").checkProject;
const checkWorkID = require("../controllers/checker").checkWorkID;
const prepareResponse = require("../controllers/tools").prepareResponse;

const checkAddWork = async (req, res, next) => {
  const data = {
    worker: req.body.worker,
    project: req.body.project,
    workplace: req.body.workplace,
    start_time: req.body.start_time,
    end_time: req.body.end_time,
  };
  console.log(data);

  const userRole = req.user.role;
  const userName = req.user.userName;

  if (
    typeof data.worker === "string" &&
    typeof data.project === "string" &&
    typeof data.workplace === "string" &&
    typeof data.start_time === "string" &&
    typeof data.end_time === "string"
  ) {
    const workerID = await checkName(data.worker);
    console.log(workerID);
    const workplaceCheck = await checkWorkplace(data.workplace);
    const projectCheck = await checkProject(data.project);

    if (userRole === "admin" || userName === data.worker) {
      if (workerID.length !== 0) {
        if (workplaceCheck.length !== 0) {
          if (projectCheck.length !== 0) {
            if (workerID[0].status === 1) {
              console.log(workerID[0].status);
              if (projectCheck[0].status === 1) {
                if (workplaceCheck[0].status === 1) {
                  console.log("Data is good!");
                  next();
                } else {
                  const errorMsg = prepareResponse(
                    "Workplace is inactive!",
                    108
                  );
                  res.status(409).json({ errorMsg });
                }
              } else {
                const errorMsg = prepareResponse("Project is inactive!", 109);
                res.status(409).json({ errorMsg });
              }
            } else {
              const errorMsg = prepareResponse("Worker is inactive!", 112);
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
      console.log("Forbidden");
      res.status(403).json("Forbidden");
    }
  } else {
    res.status(400).json("Bad request");
  }
};

const checkUpdateWork = async (req, res, next) => {
  const data = {
    worker: req.body.worker,
    project: req.body.project,
    workplace: req.body.workplace,
    start_time: req.body.start_time,
    end_time: req.body.end_time,
  };
  const { workID: workID } = req.params;

  const userRole = req.user.role;
  const userName = req.user.userName;

  if (
    typeof data.worker === "string" &&
    typeof data.project === "string" &&
    typeof data.workplace === "string" &&
    typeof data.start_time === "string" &&
    typeof data.end_time === "string"
  ) {
    const work = await checkWorkID(workID);
    const workerID = await checkName(data.worker);
    const workplaceCheck = await checkWorkplace(data.workplace);
    const projectCheck = await checkProject(data.project);

    if (work.length !== 0) {
      if (userRole === "admin" || work[0].name === userName) {
        if (workerID.length !== 0) {
          if (workplaceCheck.length !== 0) {
            if (projectCheck.length !== 0) {
              console.log("Data is good!");
              next();
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
        console.log("Forbidden");
        res.status(403).json("Forbidden");
      }
    } else {
      const errorMsg = prepareResponse("Work does not exist!", 110);
      res.status(404).json({ errorMsg });
    }
  } else {
    res.status(400).json("Bad request");
  }
};

const checkDeleteWork = async (req, res, next) => {
  const { workID: workID } = req.params;

  const userRole = req.user.role;
  const userName = req.user.userName;

  if (workID) {
    const work = await checkWorkID(workID);

    if (work.length !== 0) {
      if (userRole === "admin" || work[0].name === userName) {
        next();
      } else {
        console.log("Forbidden");
        res.status(403).json("Forbidden");
      }
    } else {
      const errorMsg = prepareResponse("Work does not exist!", 110);
      res.status(404).json({ errorMsg });
    }
  } else {
    res.status(400).json("Bad request");
  }
};

module.exports = { checkAddWork, checkUpdateWork, checkDeleteWork };
