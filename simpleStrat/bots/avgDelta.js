// STRAT
const SMA = (prices, period) => {
    return prices.slice(-period).reduce((acc, a) => acc + a, 0) / period
}

const SMADelta = (prices, period) => {
    const sma = SMA(prices, period)
    const lastSma = SMA(prices.slice(0, -1), period)
    return sma && lastSma && 100 * sma / lastSma - 100
}

let threshold = 0.2
let period = 10
const strat = {
    shouldBuy(prices) {
        const smaDelta = SMADelta(prices, period)
        const lastPrice = prices[prices.length - 1]
        return smaDelta && smaDelta < threshold
    },
    shouldSell(prices) {
        const smaDelta = SMADelta(prices, period)        
        const lastPrice = prices[prices.length - 1]
        return smaDelta && smaDelta > threshold
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
binance.options({
    'APIKEY': 'HV3cG70qLzZaXKEqp0WYK5iH3idjvGeFloeSlaEUB3wDH1e7f4VCxN5y7bBJN3c9',
    'APISECRET': 'MWfRjmCWuKKulF2taQemO1d6ppKJZaZKb09PX81021eZuoSCan4iwUZ9UGvzfeVQ',
    test: false,
    useServerTime: true
})

const VOLUME = 0.005

const stepSizes = {}
axios.get('https://api.binance.com/api/v1/exchangeInfo').then(data => {
    data.data.symbols.forEach(s => {
        stepSizes[s.symbol] = s.filters.find(f => f.stepSize).stepSize
    })
})

const getVolume = (v, symbol) => stepSizes[symbol] * Math.floor(v / stepSizes[symbol])

// BOT LOOP
const loop = async () => {
    console.log(' -- run ' + new Date().toLocaleString() + ' with ' + symbols.length + ' symbols --')
    // get prices
    let prices = {}
    await Promise.all(symbols.map(s => 
        axios.get('https://api.binance.com/api/v1/klines?symbol=' + s + '&interval=1h&limit=11')
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
            continue
        }

        // buy?
        if(balance[symbol].available < stepSizes[symbol] && strat.shouldBuy(prices[symbol])){
            console.log('BUY ' + symbol)
            binance.marketBuy(symbol, getVolume(VOLUME / prices[symbol].slice(-1), symbol))
        }

        // sell?
        else if(balance[symbol].available > stepSizes[symbol] && strat.shouldSell(prices[symbol])){
            console.log('SELL ' + symbol)            
            binance.marketSell(symbol, getVolume(+balance[symbol].available, symbol))
        }
    }

    console.log('END')
}

var CronJob = require('cron').CronJob;
new CronJob('40 0 * * * *', loop, null, true, 'America/Los_Angeles')
console.log('cron started...')