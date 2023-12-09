import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDatabase } from "@fortawesome/free-solid-svg-icons";
import Container from "react-bootstrap/esm/Container";
export const DivisionTable = ({ data }) => {
  return data && data.length !== 0 ? (
    <table className="ui table" style={{ fontSize: "15px", width: "100%" }}>
      <thead bgColor="#D3D3D3" style={{ fontSize: "13px" }}>
        <tr>
          <th>Symbol</th>
          <th>Stock Name</th>
          <th>Curr. Price</th>
          <th>No. of shares</th>
          <th>Cost</th>
        </tr>
      </thead>

      <tbody>
        {Object.keys(data).map((rec) => {
          return (
            <tr>
              <td data-label="Stock Symbol">{data[rec].symbol}</td>
              <td data-label="Stock Name">{data[rec].name}</td>
              <td data-label="Current Price">
                <div className="ui mini statistics">{data[rec].price}$</div>
              </td>
              <td data-label="Number of shares">
                {(data[rec].cost / data[rec].price).toFixed(2)}
              </td>
              <td data-label="Total Cost">{data[rec].cost}$</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  ) : null;
  // <Container
  //   style={{
  //     display: "flex",
  //     width: "60%",
  //     justifyContent: "center",
  //     alignItems: "center",
  //     height: "25vh",
  //     margin: "0 auto",
  //   }}
  // >
  //   <FontAwesomeIcon icon={faDatabase} size="4x" />
  // </Container>
};
export default DivisionTable;
