import yfinance as yf
from datetime import datetime, timedelta

investment_strategies = {
    "Ethical Investing": {"GILD": 0.2, "FSLR": 0.2, "BYND": 0.2, "TSLA": 0.2, "MSFT": 0.2},
    "Growth Investing": {"AMZN": 0.3, "GOOG": 0.4, "META": 0.3},
    "Index Investing": {"VTI": 0.25, "IXUS": 0.25, "ILTB": 0.25, "SMH": 0.25},
    "Quality Investing": {"XOM": 0.25, "HD": 0.25, "AAPL": 0.3, "TSM": 0.2},
    "Value Investing": {"UNH": 0.2, "TGT": 0.2, "JNJ": 0.2, "PG": 0.2, "KO": 0.2}
}


def get_stock_info(stock_ticker):
    return yf.Ticker(stock_ticker)


# get stocks and their weights for distributing money among them
# weights = {"VTI": 0.25, "IXUS": 0.25, "ILTB": 0.25, "SMH": 0.25}
def get_stock_weights(strategy_list):
    stock_weights = {}
    total_strategy_num = len(strategy_list)
    for strategy in strategy_list:
        init_list = investment_strategies[strategy]
        for key, val in init_list.items():
            stock_weights[key] = round(val / total_strategy_num, 2)

    return stock_weights


# get how many units of each stocks can be bought
# shares = {'VTI': 0.12, 'IXUS': 0.42, 'ILTB': 0.46, 'SMH': 0.11}
def get_portfolio_shares(stock_weights, amount):
    shares = {}
    for key in stock_weights:
        stock_info = get_stock_info(key)
        price = round(stock_info.info['regularMarketPrice'], 2)
        shares[key] = round(amount * stock_weights[key] / price, 2)
    return shares


def get_investment_portfolio(stock_weights, amount):
    portfolio = {}
    portfolio['amount'] = amount
    portfolio['portfolio_history'] = get_recommended_portfolio_history(stock_weights)
    for key in stock_weights:
        stock_info = get_stock_info(key)
        portfolio[key] = {}
        portfolio[key]['name'] = stock_info.info['shortName']
        portfolio[key]['symbol'] = key
        portfolio[key]['price'] = round(stock_info.info['regularMarketPrice'], 2)
        portfolio[key]['cost'] = amount * stock_weights[key]
        portfolio[key]['portion'] = stock_weights[key]
        stock_history = get_stock_history(stock_info)
        portfolio[key]['stock_history'] = stock_history
    return portfolio

# prices of the stock over last 5 days
# stock_history = {'2022-11-28': 198.27, '2022-11-29': 197.96, '2022-11-30': 204.06, '2022-12-01': 204.18, '2022-12-02': 203.99}
def get_stock_history(stock_info):
    stock_history = {}
    history = stock_info.history(period="5d", interval="1d")['Close']
    for date, closePrice in history.items():
        stock_history[str(date.date())] = round(closePrice, 2)
    return stock_history

# the total value of a portfolio over last 5 days
# portfolio_history = {'2022-11-28': 95.82950000000001, '2022-11-29': 95.7344, '2022-11-30': 98.6155, '2022-12-01': 99.2494, '2022-12-02': 99.0892}
def get_recommended_portfolio_history(stocks_shares):
    portfolio_history = {}
    for stock_symbol, shares in stocks_shares.items():
        stock_info = get_stock_info(stock_symbol)
        stock_history = get_stock_history(stock_info)
        for date, price in stock_history.items():
            if date not in portfolio_history:
                portfolio_history[date] = 0
            portfolio_history[date] += shares * price
            portfolio_history[date] = round(portfolio_history[date], 2)
    return portfolio_history

def get_portfolio_history(stocks_list):
    portfolio_history = {}
    for stock in stocks_list:
        stock_info = get_stock_info(stock['symbol'])
        stock_history = get_stock_history(stock_info)
        for date, price in stock_history.items():
            if date not in portfolio_history:
                portfolio_history[date] = 0
            portfolio_history[date] += stock['quantity'] * price
            portfolio_history[date] = round(portfolio_history[date], 2)
    return portfolio_history


def current_stock_prices(stock_weights):
    prices = {}
    for key in stock_weights:
        stock_info = get_stock_info(key)
        current_price = round(stock_info.info['regularMarketPrice'], 2)
        prices[key] = current_price
    return prices


# print(get_stock_info("AAPL"))
# print(list(yf.Ticker("AAPL").history(period="1wk", interval="1d")['Close']))
# sw = get_stock_weights(['Index Investing'])
# print(sw)
# print(current_stock_prices(sw))
# print(get_portfolio_shares(sw, 100))
# print(get_investment_portfolio(sw, 100))
# print(get_portfolio_history(get_portfolio_shares(sw, 100)))
