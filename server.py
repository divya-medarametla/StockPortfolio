from flask import Flask, request
from StockManager import *
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)

portfolios = []

def create_portfolio(portfolio_request):
    portfolio = {}
    portfolio['id'] = len(portfolios) + 1
    portfolio['name'] = portfolio_request['name']
    portfolio['stocks'] = []
    portfolio['portfolio_history'] = get_portfolio_history(portfolio_request['stocks'])
    # print(portfolio['portfolio_history'])
    for each_stock in portfolio_request['stocks']:
        stock_info = get_stock_info(each_stock['symbol'])
        current_price = round(stock_info.info['regularMarketPrice'], 2)
        each_stock['name'] = stock_info.info['shortName']
        each_stock['current_price'] = current_price
        each_stock['stock_history'] = get_stock_history(stock_info)
        portfolio['stocks'].append(each_stock)
    portfolios.append(portfolio)

def update_portfolios():
    for portfolio in portfolios:
        portfolio['portfolio_history'] = get_portfolio_history(portfolio['stocks'])
        for stock in portfolio['stocks']:
            stock_info = get_stock_info(stock['symbol'])
            current_price = round(stock_info.info['regularMarketPrice'], 2)
            stock['current_price'] = current_price
            stock['stock_history'] = get_stock_history(stock_info)
    

@app.route('/stock')
def display_quote():
    try:
        symbol = request.args.get('symbol', default="AAPL")
        quote = get_stock_info(symbol)
        return quote.info
    except Exception as ex:
        return {'messsage': 'Server error occured.'}, 500


@app.route('/investment', methods=['GET', 'POST'])
def investment():
    try:
        if request.method == 'GET':
            update_portfolios()
            response = {'portfolios':portfolios}
        else:
            portfolio_request = request.json
            create_portfolio(portfolio_request)
        
            response = {'success':True}, 200
        return response
    except Exception as ex:
        return {'messsage': 'Server error occured.'}, 500

@app.route('/recommendation', methods=['GET'])
def get_stock_recommendation():
    try:
        investment_amount = int(request.args.get('amount', 5000))
        list_of_strategies = request.args.get('strategies')
        print(list_of_strategies.split(','))
        stock_weights = get_stock_weights(list_of_strategies.split(','))
        recommendation = get_investment_portfolio(stock_weights, investment_amount)
        return recommendation, 200
    except Exception as ex:
        return {'messsage': 'Server error occured.'}, 500

@app.route('/clear', methods=['GET'])
def clear_portfolio():
    try:
        portfolios.clear()
        return {'message': 'Portfolio history cleared'}, 200
    except Exception as ex:
        return {'messsage': 'Server error occured.'}, 500


if __name__ == '__main__':
    app.run(debug=True, host='localhost', port=5000)
