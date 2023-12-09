import React from "react";
import { Chart } from "react-google-charts";

export const options = {
  title: "Propotion of distribution amongst stocks",
  sliceVisibilityThreshold: 0.18, // 20%
};

const StockDivision = ({ propotiondata }) => {
  return propotiondata && propotiondata.length > 1 ? (
    <>
      <Chart
        chartType="PieChart"
        data={propotiondata}
        options={options}
        width={"100%"}
        height={"400px"}
      />
    </>
  ) : null;
};
export default StockDivision;
