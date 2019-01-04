// STRAT
const RSI = require('technicalindicators').RSI

let minRsi = 63
let maxRsi = 74
const strat = {
    shouldBuy(prices) {
        const rsi = RSI.calculate({values: prices, period: 10}).slice(-1)[0]
        return rsi && rsi < minRsi
    },
    shouldSell(prices) {
        const rsi = RSI.calculate({values: prices, period: 10}).slice(-1)[0]
        return rsi && rsi > maxRsi
    }
}

// SYMBOLS
const symbols = [
    "XRPBTC",
    "TUSDBTC",
    "EOSBTC",
    "LTCBTC",
    "TRXBTC",
    "WAVESBTC",
    "ENGBTC",
    "ADABTC",
    "ETCBTC",
    "XLMBTC",
    "NEOBTC",
    "STRATBTC",
    "MDABTC",
    "ZILBTC",
]

// SETUP BOT
const axios = require('axios')
const binance = require('node-binance-api')()
const binanceOptions = {
    'APIKEY': 'HV3cG70qLzZaXKEqp0WYK5iH3idjvGeFloeSlaEUB3wDH1e7f4VCxN5y7bBJN3c9',
    'APISECRET': 'MWfRjmCWuKKulF2taQemO1d6ppKJZaZKb09PX81021eZuoSCan4iwUZ9UGvzfeVQ',
    test: false,
    useServerTime: true
}
binance.options(binanceOptions)

const VOLUME = 0.005

const stepSizes = {}
axios.get('https://api.binance.com/api/v1/exchangeInfo').then(data => {
    data.data.symbols.forEach(s => {
        stepSizes[s.symbol] = s.filters.find(f => f.stepSize).stepSize
    })
})

const getVolume = (v, symbol) => stepSizes[symbol] * Math.floor(v / stepSizes[symbol])
const getTicker = (symbol) => axios.get('https://api.binance.com/api/v1/ticker/bookTicker?symbol=' + symbol).then(a => a.data)

// BOT LOOP
const loop = async () => {
    try {
        console.log(' -- run ' + new Date().toLocaleString() + ' with ' + symbols.length + ' symbols --')
        // get prices
        let prices = {}
        await Promise.all(symbols.map(s => 
            axios.get('https://api.binance.com/api/v1/klines?symbol=' + s + '&interval=1h&limit=15')
            .then(data => prices[s] = data.data.map(a => +a[4]))
        ))

        // get balance
        let balance = await new Promise(res => binance.balance((err, data) => res(data)))
        for(s in balance) {
            if(!symbols.includes(s + "BTC")) {
                delete balance[s]
            } else {
                balance[s + "BTC"] = {available: +balance[s].available, onOrder: +balance[s].onOrder}
                delete balance[s]
            }
        }

        // actions (TODO: limit and not market)
        for(symbol of symbols) {
            // ongoing order
            if(+balance[symbol].onOrder > 0) {
                console.warn(symbol + ' got current order!')
                binance.cancelOrders(symbol)
                balance[symbol].available = +balance[symbol].available + +balance[symbol].onOrder
            }

            // buy?
            if(balance[symbol].available < stepSizes[symbol] && strat.shouldBuy(prices[symbol])){
                console.log('BUY ' + symbol)
                const ticker = await getTicker(symbol)
                binance.buy(
                    symbol,
                    getVolume(VOLUME / prices[symbol].slice(-1), symbol),
                    ticker.bidPrice
                )
            }

            // sell?
            else if(balance[symbol].available > stepSizes[symbol] && strat.shouldSell(prices[symbol])){
                console.log('SELL ' + symbol)            
                const ticker = await getTicker(symbol)
                binance.sell(
                    symbol,
                    getVolume(VOLUME / prices[symbol].slice(-1), symbol),
                    ticker.askPrice
                )
            }
        }

        console.log('END')
    } catch (e) {
        console.error(e)
        console.log('retrying in 5s')
        setTimeout(loop, 5000)
    }
}

if(!binanceOptions.test) {
    var CronJob = require('cron').CronJob;
    new CronJob('40 0 * * * *', loop, null, true, 'America/Los_Angeles')
    console.log('cron started...')
} else {
    console.log('TESTMODE ON')
    setTimeout(loop, 1000)
}
