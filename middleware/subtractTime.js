const checkWorkID = require("../controllers/checker").checkWorkID;
const prepareResponse = require("../controllers/tools").prepareResponse;

const updateProjectTime =
  require("../controllers/timeHandler").updateProjectTime;
const updateWorkplaceTime =
  require("../controllers/timeHandler").updateWorkplaceTime;

const subtractTime = async (req, res, next) => {
  try {
    const { IDdela: workID } = req.params;

    if (workID) {
      const freeID = await checkWorkID(workID);

      if (freeID.length !== 0) {
        const data = {
          worker: freeID[0].ime,
          project: freeID[0].projekt,
          workplace: freeID[0].stroj,
          start_time: freeID[0].zacetni_cas,
          end_time: freeID[0].koncni_cas,
        };

        const dataTimeDiff =
          new Date(data.end_time) - new Date(data.start_time);
        const type = "substract";

        await updateProjectTime(data.project, dataTimeDiff, type);
        console.log("Project time subtracting...");

        await updateWorkplaceTime(data.workplace, dataTimeDiff, type);
        console.log("Workplace time subtracting...");

        next();
      } else {
        const errorMsg = prepareResponse("Work does not exist!", 110);
        res.status(404).json({ errorMsg });
      }
    } else {
      res.status(400).json("Bad request");
    }
  } catch (error) {
    console.log("Error updating time: ", error);
  }
};

module.exports = subtractTime;
