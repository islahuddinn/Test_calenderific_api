const express = require("express");
const holidayRoutes = require("./holidayRoutes");

const setupRoutesV1 = () => {
  const router = express.Router();
  router.use("/", holidayRoutes);
  return router;
};
module.exports = setupRoutesV1;
