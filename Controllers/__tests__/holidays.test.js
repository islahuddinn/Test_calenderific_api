const request = require("supertest");
const express = require("express");
const axios = require("axios");
const NodeCache = require("node-cache");
const apiController = require("../apiController");

const app = express();
const cache = new NodeCache({ stdTTL: process.env.CACHE_TTL });

jest.mock("axios");

app.use(express.json());
app.get("/countries", apiController.getCountries);
app.get("/holidays", apiController.getHolidays);

describe("GET /countries", () => {
  it("should fetch countries from the API", async () => {
    const countriesData = {
      response: { countries: [{ code: "US", name: "United States" }] },
    };
    axios.get.mockResolvedValue({ data: countriesData });

    const res = await request(app).get("/countries");
    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toEqual(countriesData.response.countries);
  });

  it("should return cached countries", async () => {
    cache.set("countries", [{ code: "US", name: "United States" }]);
    const res = await request(app).get("/countries");
    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toEqual([{ code: "US", name: "United States" }]);
  });
});

describe("GET /holidays", () => {
  it("should fetch holidays from the API", async () => {
    const holidaysData = {
      response: {
        holidays: [{ name: "New Year", date: { iso: "2024-01-01" } }],
      },
    };
    axios.get.mockResolvedValue({ data: holidaysData });

    const res = await request(app).get("/holidays?country=US&year=2024");
    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toEqual(holidaysData.response.holidays);
  });

  it("should return cached holidays", async () => {
    cache.set("holidays_US_2024", [
      { name: "New Year", date: { iso: "2024-01-01" } },
    ]);
    const res = await request(app).get("/holidays?country=US&year=2024");
    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toEqual([
      { name: "New Year", date: { iso: "2024-01-01" } },
    ]);
  });
});
