const tester = require('./tester')

const SMA = (prices, period) => {
    return prices.slice(-period).reduce((acc, a) => acc + a.close, 0) / period
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

console.table(tester(strat))