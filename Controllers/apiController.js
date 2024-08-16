const axios = require("axios");
const NodeCache = require("node-cache");
const AppError = require("../Utils/appError");
const catchAsync = require("../Utils/catchAsync");

const cache = new NodeCache({ stdTTL: process.env.CACHE_TTL });

const CALENDARIFIC_API_KEY = process.env.CALENDARIFIC_API_KEY;
const CALENDARIFIC_API_URL = process.env.CALENDARIFIC_API_URL;

exports.getCountries = catchAsync(async (req, res, next) => {
  const cacheKey = "countries";
  if (cache.has(cacheKey)) {
    return res.status(200).json({
      success: true,
      status: 200,
      data: cache.get(cacheKey),
    });
  }

  try {
    const response = await axios.get(
      `${CALENDARIFIC_API_URL}/countries?api_key=${CALENDARIFIC_API_KEY}`
    );
    const countries = response.data.response.countries;
    cache.set(cacheKey, countries);

    res.status(200).json({
      success: true,
      status: 200,
      data: countries,
    });
  } catch (error) {
    return next(new AppError("Failed to fetch countries", 500));
  }
});

exports.getHolidays = catchAsync(async (req, res, next) => {
  const { country, year } = req.query;

  if (!country || !year) {
    return next(new AppError("Country and year are required", 400));
  }

  const cacheKey = `holidays_${country}_${year}`;
  if (cache.has(cacheKey)) {
    return res.status(200).json({
      success: true,
      status: 200,
      data: cache.get(cacheKey),
    });
  }

  try {
    const response = await axios.get(
      `${CALENDARIFIC_API_URL}/holidays?api_key=${CALENDARIFIC_API_KEY}&country=${country}&year=${year}`
    );
    // console.log(response, "here is the api response");
    const holidays = response.data.response.holidays;
    cache.set(cacheKey, holidays);
    // console.log(holidays, "here are the holiday");

    res.status(200).json({
      success: true,
      status: 200,
      data: holidays,
    });
  } catch (error) {
    return next(new AppError("Failed to fetch holidays", 500));
  }
});
