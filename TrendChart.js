import React from "react";
import { VictoryChart, VictoryTheme, VictoryLine, VictoryLabel } from "victory";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartArea } from "@fortawesome/free-solid-svg-icons";
import Container from "react-bootstrap/esm/Container";
export const TrendChart = ({ trenddata, charttitle }) => {
  return trenddata && trenddata.length !== 0 ? (
    <>
      <VictoryLabel
        text={charttitle ? charttitle : ""}
        x={225}
        y={10}
        textAnchor="middle"
      />
      <VictoryChart
        theme={VictoryTheme.material}
        height={250}
        style={{
          background: { fill: "aliceblue" },
        }}
      >
        <VictoryLine
          style={{
            data: { stroke: "#c43a31" },
            parent: { border: "1px solid #ccc" },
          }}
          data={trenddata}
        />
      </VictoryChart>
    </>
  ) : (
    <Container
      style={{
        display: "flex",
        width: "60%",
        justifyContent: "center",
        alignItems: "center",
        height: "25vh",
        margin: "0 auto",
      }}
    >
      <FontAwesomeIcon icon={faChartArea} size="4x" />
    </Container>
  );
};
