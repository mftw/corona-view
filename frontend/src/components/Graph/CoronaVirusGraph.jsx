import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  memo,
} from "react";

import {
  LineChart,
  BarChart,
  CartesianGrid,
  YAxis,
  XAxis,
  Tooltip,
  Line,
  Bar,
  Legend
} from "recharts";
import moment from "moment";
import useFetch from "use-http";

import useResizeObserver from "../../hooks/useResizeObserver";

const colors = {
  dead: "#ff0000",
  cured: "#25bafa",
  infected: "#c2b527"
};

const GraphComp = props => {
  const { chartData, width, chartType } = props;

  if (chartType === "bar") {
    return (
      <>
        <BarChart
          width={width}
          height={300}
          data={chartData}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
          <Line type="monotone" dataKey="uv" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="City" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Dead" fill={colors.dead} />
          <Bar dataKey="Cured" fill={colors.cured} />
          <Bar dataKey="Infected" fill={colors.infected} />
        </BarChart>
        <br />
      </>
    );
  }

  return (
    <>
      <LineChart data={chartData} width={width} height={300}>
        <Line type="monotone" dataKey="Dead" stroke={colors.dead} />
        <Line type="monotone" dataKey="Cured" stroke={colors.cured} />
        <Line type="monotone" dataKey="Infected" stroke={colors.infected} />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="City" />
        <YAxis />
        <Tooltip />
        <Legend />
      </LineChart>
      <br />
    </>
  );
};

GraphComp.defaultProps = {
  chartData: [],
  width: 600,
  chartType: "line"
};

const Graph = memo(GraphComp);

const GraphGeneratorComp = props => {
  const { chartData, width, size, chartType } = props;
  if (!chartData.reduce) return null;
  return chartData
    .reduce((acc, curr, i, self) => {
      if (!(i % size)) {
        return [...acc, self.slice(i, i + size)];
      }
      return acc;
    }, [])
    .map((chart, i) => (
      <Graph
        // key={"graph-" + i}
        key={chart[0].City}
        chartType={chartType}
        chartData={chart}
        width={width}
      />
    ));
};

GraphGeneratorComp.defaultProps = {
  chartData: [],
  width: 600,
  size: 10,
  chartType: "line"
};

const GraphGenerator = memo(GraphGeneratorComp);

const CoronaGraph = props => {
  const [fetchTime, setFetchTime] = useState(0);
  const [chartData, setChartData] = useState(null);
  const [dataUpdatedAt, setDataUpdatedAt] = useState(0);
  const origChartData = useRef();

  const { ref, width = 1 } = useResizeObserver();
  // const { ref, width = 1 } = useResizeObserverDebounced();
  const { data, loading } = useFetch(
    {
      url: window.location.origin.includes("localhost")
        ? "http://localhost:4000/api"
        : window.location.origin + "/api",
      retries: 3
    },
    []
  );

  const [chartType, setChartType] = useState("bar");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [countries, setCountries] = useState([]);

  function makeChartData(data) {
    const dataArray = data.results;
    const dataObject = dataArray.reduce((history, country) => {
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

    const sortedDataArray = Object.values(dataObject);
    const alphabeticallySortedDataArray = sortedDataArray.sort((a, b) => {
      return String(a.City).localeCompare(String(b.City));
    });
    return alphabeticallySortedDataArray;
  }

  const removeCountryFromData = country => {
    if (chartData) {
      const newData = chartData.filter(({ City }) => City !== country);
      setChartData(newData);
    }
  };

  const handleCountrySelect = e => {
    setSelectedCountry(e.target.value);
  };

  const removeSelectedCountry = () => {
    removeCountryFromData(selectedCountry);
  };

  const toggleBarType = () => {
    if (chartType === "line") {
      setChartType("bar");
    } else {
      setChartType("line");
    }
  };

  const getTotalOf = useCallback(
    value => {
      if (origChartData.current) {
        return origChartData.current.reduce(
          (acc, country) => (acc += country[value]),
          0
        );
      }
    },
    [origChartData]
  );

  useEffect(() => {
    if (!chartData && !loading && data) {
      const updateTimes = data.results.map(r => r.updateTime);
      const updateTime = updateTimes.sort((a, b) => a.updateTime < b.updateTime)[0];
      const humanReadableTime = moment(updateTime).format("DD/MM-YYYY HH:mm");
      const newChartData = makeChartData(data);
      setDataUpdatedAt(humanReadableTime);
      origChartData.current = newChartData;
      setChartData(newChartData);
      setFetchTime(Date.now());
      setCountries(newChartData.map(c => c.City));
      setSelectedCountry(newChartData[0].City);
      // startTransition(() =>
      //   fetch("http://localhost:4000/api/delayed")
      //     .then(res => res.json())
      //     .then(data => {
      //       const updateTimes = data.results.map(r => r.updateTime);
      //       const updateTime = updateTimes.sort(
      //         (a, b) => a.updateTime < b.updateTime
      //       )[0];
      //       const humanReadableTime = moment(updateTime).format(
      //         "DD/MM-YYYY HH:mm"
      //       );
      //       const newChartData = makeChartData(data);
      //       setDataUpdatedAt(humanReadableTime);
      //       origChartData.current = newChartData;
      //       setChartData(newChartData);
      //       setFetchTime(Date.now());
      //       setCountries(newChartData.map(c => c.City));
      //       setSelectedCountry(newChartData[0].City);
      //     })
      // );
    }
  // }, [chartData, data, loading, startTransition]);
  }, [chartData, data, loading]);

  return (
    <div className="fetch-div" ref={ref}>
      <p>
        Data kommer fra: <a href="https://ncov.dxy.cn">https://ncov.dxy.cn</a>{" "}
        via <a href="https://lab.isaaclin.cn/">https://lab.isaaclin.cn/</a>
      </p>
      {!loading && (
        <>
          <p>Data er opdateret: {dataUpdatedAt} lokal tid</p>
          <p>
            Data blev hentet: {moment(fetchTime).format("DD/MM-YYYY HH:mm")}
          </p>
          <p>Antal inficerede på verdensplan: {getTotalOf("Infected")}</p>
          <p>Antal kurerede på verdensplan: {getTotalOf("Cured")}</p>
          <p>Antal døde på verdensplan: {getTotalOf("Dead")}</p>
        </>
      )}
      <select onChange={handleCountrySelect} value={selectedCountry}>
        {countries.map((country, i) => (
          <option key={"country-option" + i} value={country}>
            {country}
          </option>
        ))}
      </select>
      <button onClick={removeSelectedCountry}>
        Fjern det valge land fra graf
      </button>{" "}
      <button onClick={() => setChartData(origChartData.current)}>
        Gendan original graf
      </button>{" "}
      <button onClick={toggleBarType}>
        {chartType === "line" ? "Vis som søjlediagram" : "Vis graf"}
      </button>
      {!loading && chartData && (
        <GraphGenerator
          chartData={chartData}
          chartType={chartType}
          width={width}
          size={width < 600 ? 3 : 10}
        />
      )}
    </div>
  );
};

export default memo(CoronaGraph);
