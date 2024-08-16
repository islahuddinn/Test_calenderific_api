const express = require("express");

const apiController = require("../Controllers/apiController");
const router = express.Router();

router.get("/countries", apiController.getCountries);
router.get("/holidays", apiController.getHolidays);

module.exports = router;
