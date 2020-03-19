import React, { memo, useState, useRef, useCallback } from "react";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";
import ReactTooltip from "react-tooltip";
import { scaleQuantize } from "d3-scale";
import useFetch from "use-http";

import styles from "./WorldMap.module.scss";

const colorRange = [
  "#ffedea",
  "#ffcec5",
  "#ffad9f",
  "#ff8a75",
  "#ff5533",
  "#e2492d",
  "#be3d26",
  "#9a311f",
  "#782618"
];

const colorScale = scaleQuantize()
  .domain([1, 100000])
  .range(colorRange);

const MapChartComp = ({ setTooltipContent, geoData }) => {
  return (
    <>
      <ComposableMap data-tip="" projectionConfig={{ scale: 200 }}>
        <ZoomableGroup>
          <Geographies geography={geoData}>
            {({ geographies }) =>
              geographies.map(geo => {
                const { NAME, Dead, Cured, Infected } = geo.properties;
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => {
                      if (
                        Dead !== undefined &&
                        Cured !== undefined &&
                        Infected !== undefined
                      ) {
                        setTooltipContent(
                          `${NAME} —
                        Infected: ${Infected}
                        Cured: ${Cured}
                        Dead: ${Dead}
                        `
                        );
                      } else {
                        setTooltipContent(`No data for ${NAME}`);
                      }
                    }}
                    onMouseLeave={() => {
                      setTooltipContent("");
                    }}
                    style={{
                      default: {
                        fill:
                          Infected !== undefined
                            ? colorScale(Infected)
                            : "#D6D6DA",
                        outline: "none"
                      },
                      hover: {
                        fill: "#F53",
                        // outline: "1px solid black"
                        outline: "none"
                      },
                      pressed: {
                        fill: "#E42",
                        outline: "none"
                      }
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </>
  );
};

MapChartComp.defaultProps = {
  setToolTipContent: x => x,
  geoData: []
}

const MapChart = memo(MapChartComp);

const MapComponent = props => {
  const [content, setContent] = useState("");
  const mapRef = useRef();
  const { data, loading } = useFetch(
    {
      url: window.location.origin.includes("localhost")
      ? "http://localhost:4000/mapdata"
      : window.location.origin + "/mapdata"
    },
    []
  );

  const handleFullscreen = useCallback(() => {
    mapRef.current.requestFullscreen();
  }, [mapRef]);

  return (
    <>
      <p>
        <button onClick={handleFullscreen}>Vis i fuld skærm</button>
      </p>
      <div ref={mapRef} className={styles.mapContainer}>
        {!loading && data && (
          <>
            <MapChart setTooltipContent={setContent} geoData={data}/>
            <ReactTooltip>{content}</ReactTooltip>
          </>
        )}
      </div>
    </>
  );
};

export default MapComponent;
