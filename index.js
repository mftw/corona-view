const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const app = express();
const data = require("./data");
const mapData = require("./mapdata");

const debug = true;
const log = (...args) => debug && console.log(...args);

const countData = data.results.reduce((history, country) => {
  const countryInHistory =
    history[country.countryEnglishName || country.countryName];

  // Tjekker om vi har dette land allerede
  if (countryInHistory) {
    // Ligger nye data sammen med gamle data
    countryInHistory.Dead += country.deadCount;
    countryInHistory.Cured += country.curedCount;
    countryInHistory.Infected += country.confirmedCount;
    // } else if (country.countryEnglishName !== "China") {
  } else {
    // Hvis vi ikke har landet så skriver vi det til history
    history[country.countryEnglishName || country.countryName] = {
      City: country.countryEnglishName || country.countryName,
      Dead: country.deadCount,
      Cured: country.curedCount,
      Infected: country.confirmedCount
    };
  }
  return history;
}, {});

const mergedMapData = (() => {
  const mapDataCopy = { ...mapData };
  const geometriesCopy = [
    ...mapDataCopy.objects.ne_110m_admin_0_countries.geometries
  ];
  const countryNames = Object.keys(countData);
  mapDataCopy.objects.ne_110m_admin_0_countries.geometries = geometriesCopy.map(
    geo => {
      const geoCopy = { ...geo };
      const foundCountry = countryNames.find(name =>
        name.toLowerCase().includes(geoCopy.properties.NAME.toLowerCase())
      );
      geoCopy.properties = {
        ...geoCopy.properties,
        ...(foundCountry
          ? countData[foundCountry]
          : countData[geoCopy.properties.NAME])
        // ...countData[geoCopy.properties.NAME]
      };
      return geoCopy;
    }
  );
  return mapDataCopy;
})();

if (debug) {
  app.use(logger("dev"));
}

app.use(cors());
app.use(express.static("public"));

app.get("/api", (req, res) => {
  return res.json(data);
});

app.get("/mapdata", (req, res) => {
  return res.json(mergedMapData);
});

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

const listener = app.listen(4000, () => {
  log("server @ http://localhost:" + listener.address().port);
});
