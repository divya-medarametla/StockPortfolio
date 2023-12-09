import React, { useState, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import Spinner from "react-bootstrap/Spinner";
import Table from "react-bootstrap/Table";

import { TrendChart } from "./TrendChart";
const host = "localhost";
const port = 5000;

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let url = new URL(`http://${host}:${port}/investment`);
    console.log(url);
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLoading(false);
        setPortfolio(data.portfolios);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <>
      {loading ? (
        <Spinner className="spinner" animation="grow" variant="success" />
      ) : (
        <Accordion defaultActiveKey={0}>
          {portfolio.map((p, i) => {
            return (
              <Accordion.Item eventKey={i}>
                <Accordion.Header>{p.name} </Accordion.Header>
                <Accordion.Body>
                  <h6>Portfolio History</h6>
                  <div style={{ width: "350px", height: "250px" }}>
                    <TrendChart
                      trenddata={[
                        {
                          x: Object.keys(p.portfolio_history)[0],
                          y: Object.values(p.portfolio_history)[0],
                        },
                        {
                          x: Object.keys(p.portfolio_history)[1],
                          y: Object.values(p.portfolio_history)[1],
                        },
                        {
                          x: Object.keys(p.portfolio_history)[2],
                          y: Object.values(p.portfolio_history)[2],
                        },
                        {
                          x: Object.keys(p.portfolio_history)[3],
                          y: Object.values(p.portfolio_history)[3],
                        },
                        {
                          x: Object.keys(p.portfolio_history)[4],
                          y: Object.values(p.portfolio_history)[4],
                        },
                      ]}
                    />
                  </div>

                  <h6>Stocks</h6>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Symbol</th>
                        <th>Stock Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Current Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {p.stocks.map((s) => {
                        return (
                          <tr>
                            <td>{s.symbol}</td>
                            <td>{s.name}</td>
                            <td>{s.price}</td>
                            <td>{s.quantity}</td>
                            <td>{s.current_price}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </Accordion.Body>
              </Accordion.Item>
            );
          })}
        </Accordion>
      )}
    </>
  );
};

export default Portfolio;
