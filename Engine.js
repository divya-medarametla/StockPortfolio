import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { DivisionTable } from "./DivisionTable";
import { TrendChart } from "./TrendChart";
import StockDivision from "./StockDivision";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyCheck } from "@fortawesome/free-solid-svg-icons";
import { faMoneyBillTrendUp } from "@fortawesome/free-solid-svg-icons";
import Spinner from "react-bootstrap/Spinner";
const host = "localhost";
const port = 5000;
const Engine = () => {
  const [amount, setAmmount] = useState(5000);
  const [strategy, setStrategy] = useState();
  const [suggestions, setSuggestions] = useState([]);
  const [propotions, setPropotions] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [portfolioName, setPortfolioName] = useState();
  const [disableBuy, setDisableBuy] = useState(true);

  useEffect(() => {
    generatePortionChartData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [suggestions, stocks]);

  const onBuy = (e) => {
    e.preventDefault();

    let buyingStocks = [];
    Object.keys(stocks).map((record) =>
      buyingStocks.push({
        symbol: stocks[record].symbol,
        quantity: stocks[record].cost / stocks[record].price,
        price: stocks[record].price,
      })
    );

    let payload = {
      name: portfolioName,
      stocks: buyingStocks,
    };
    let url = new URL(`http://${host}:${port}/investment`);
    setLoading(true);
    fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let url = new URL(
      `http://${host}:${port}/recommendation?amount=${amount}&strategies=${strategy}`
    );
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setSuggestions(data);
        delete data["amount"];
        delete data["portfolio_history"];
        setStocks(data);
        generatePortionChartData();
        setLoading(false);
        setDisableBuy(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const generatePortionChartData = () => {
    let chartInput = [["Stock Name", "Percentage"]];
    Object.keys(stocks).map((record) =>
      chartInput.push([stocks[record].symbol, stocks[record].portion])
    );
    setPropotions(chartInput);
  };

  return (
    <Container fluid>
      <Row style={{ minHeight: "20vh" }}>
        <Col xs={6}>
          <Row>
            <Form>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Amount</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter amount min 5000$"
                    value={amount}
                    onChange={(e) => {
                      setAmmount(e.target.value);
                    }}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Choose Investment Strategy:</Form.Label>
                  <Form.Select
                    as={Col}
                    aria-label="Default select example"
                    value={strategy}
                    onChange={(e) => {
                      setStrategy(e.target.value);
                    }}
                  >
                    <option value="undefined">Select an investing type</option>
                    <option value="Index Investing">Index</option>
                    <option value="Quality Investing">Quality</option>
                    <option value="Value Investing">Value</option>
                    <option value="Ethical Investing">Ethical</option>
                    <option value="Growth Investing">Growth</option>
                  </Form.Select>
                </Form.Group>
              </Row>
              <Button
                variant="primary"
                type="button"
                style={{ width: "100%" }}
                disabled={!strategy || !(strategy !== "undefined") || !amount}
                onClick={(e) => onSubmit(e)}
              >
                <span>
                  <FontAwesomeIcon icon={faMoneyBillTrendUp} />
                </span>{" "}
                &nbsp; Get Suggestion
              </Button>
            </Form>
          </Row>
        </Col>
        <Col xs={6}>
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Save your portfolio </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter a name for your portfolio"
                  value={portfolioName}
                  onChange={(e) => {
                    setPortfolioName(e.target.value);
                  }}
                  disabled={disableBuy}
                />
              </Form.Group>
            </Row>
            <Button
              variant="success"
              type="button"
              style={{ width: "100%" }}
              disabled={disableBuy || !portfolioName}
              onClick={(e) => onBuy(e)}
            >
              <span>
                <FontAwesomeIcon icon={faMoneyCheck} />
              </span>
              &nbsp; Buy
            </Button>
          </Form>
        </Col>
      </Row>
      <Row style={{ minHeight: "25vh" }}>
        {loading ? (
          <Spinner className="spinner" animation="grow" variant="success" />
        ) : (
          <>
            <Col xs={12}>
              <Container>
                <Row>
                  {stocks &&
                    Object.keys(stocks).map((stock) => {
                      return (
                        <Col xs={3}>
                          <span>
                            <TrendChart
                              charttitle={stocks[stock].symbol}
                              trenddata={[
                                {
                                  x: 5,
                                  y: Object.values(
                                    stocks[stock].stock_history
                                  )[0],
                                },
                                {
                                  x: 4,
                                  y: Object.values(
                                    stocks[stock].stock_history
                                  )[1],
                                },
                                {
                                  x: 3,
                                  y: Object.values(
                                    stocks[stock].stock_history
                                  )[2],
                                },
                                {
                                  x: 2,
                                  y: Object.values(
                                    stocks[stock].stock_history
                                  )[3],
                                },
                                {
                                  x: 1,
                                  y: Object.values(
                                    stocks[stock].stock_history
                                  )[4],
                                },
                              ]}
                            />
                          </span>
                        </Col>
                      );
                    })}
                </Row>
              </Container>
              {/*  */}
            </Col>
          </>
        )}
      </Row>
      <Row>
        <Col xs={6}>
          {" "}
          {!loading && <StockDivision propotiondata={propotions} />}
        </Col>

        <Col xs={6}>
          <br></br>
          <br></br>
          {!loading && <DivisionTable data={stocks}></DivisionTable>}
        </Col>
      </Row>
    </Container>
  );
};
export default Engine;
