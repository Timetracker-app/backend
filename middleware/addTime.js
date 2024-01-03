const updateProjectTime =
  require("../controllers/timeHandler").updateProjectTime;
const updateWorkplaceTime =
  require("../controllers/timeHandler").updateWorkplaceTime;

const addTime = async (req, res, next) => {
  try {
    const data = {
      worker: req.body.ime,
      project: req.body.projekt,
      workplace: req.body.stroj,
      start_time: req.body.zacetni_cas,
      end_time: req.body.koncni_cas,
    };
    const dataTimeDiff = new Date(data.end_time) - new Date(data.start_time);
    const type = "add";

    await updateProjectTime(data.project, dataTimeDiff, type);
    console.log("Project time adding...");

    await updateWorkplaceTime(data.workplace, dataTimeDiff, type);
    console.log("Workplace time adding...");

    next();
  } catch (error) {
    console.log("Error updating time: ", error);
  }
};

module.exports = addTime;
