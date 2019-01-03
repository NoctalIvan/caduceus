const tester = require('./tester')
const RSI = require('technicalindicators').RSI

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
const stratAvg = {
    shouldBuy(prices) {
        const smaDelta = SMADelta(prices, period)
        return smaDelta && smaDelta < threshold
    },
    shouldSell(prices) {
        const smaDelta = SMADelta(prices, period)        
        return smaDelta && smaDelta > threshold
    }
}

let minRsi = 63
let maxRsi = 74
const stratRsi = {
    shouldBuy(price) {
        const rsi = RSI.calculate({values: price.map(a => a.close), period: 10}).slice(-1)[0]
        return rsi && rsi < minRsi
    },
    shouldSell(price) {
        const rsi = RSI.calculate({values: price.map(a => a.close), period: 10}).slice(-1)[0]
        return rsi && rsi > maxRsi
    }
}

// for(minRsi = 60; minRsi < 70; minRsi += 1) {
//     console.log('\n')
//     for(let j = 8; j < 15; j += 1) {
//         maxRsi = minRsi + j
//         console.log(minRsi, maxRsi, "=>", tester(stratRsi).slice(-1)[0].avgDiff)
//     }
// }

console.table(tester(stratRsi))