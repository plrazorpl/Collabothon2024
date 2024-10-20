"use client";
import React, { useEffect, useState } from "react";
import { csv } from "d3-fetch";
import fetch from "node-fetch";
import { scaleLinear } from "d3-scale";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule,
} from "react-simple-maps";

const geoUrl = "/features.json";

const colorScale = scaleLinear()
  .domain([0.29, 0.68])
  .range(["#ffedea" as any, "#ffcc00" as any]);

const MapChart = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    csv(`/vulnerability.csv`).then((data) => {
      setData(data);
    });
  }, []);

  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    //Implementing the setInterval method
    const interval = setInterval(() => {
      if (rotation === 360) {
        setRotation(0);
      }
      setRotation(rotation + 1);
    }, 30);

    //Clearing the interval
    return () => clearInterval(interval);
  }, [rotation]);

  return (
    <ComposableMap
      className="absolute w-[500px]  align-baselineleft-1/2 top-1/4 "
      fill="#333333"
      height={300}
      opacity={0.05}
      projectionConfig={{
        rotate: [rotation, 0, 0],
        scale: 105,
      }}
    >
      <Sphere stroke="#E4E5E6" strokeWidth={0.5} id={""} fill={""} />
      <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
      {data.length > 0 && (
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const d = data.find((s: any) => s.ISO3 === geo.id);
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={d ? (colorScale(d["2017"]) as any) : "#F5F4F6"}
                />
              );
            })
          }
        </Geographies>
      )}
    </ComposableMap>
  );
};

export default MapChart;
