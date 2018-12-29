// test a strategy over many curr over many 200h segments of the last 1000h
const prices = require('./prices.json').slice(0,20)

const testStrategyOnPrices = (strat, prices) => {
    let got = undefined
    let totalDiff = 0
    let transactionCpt = 0
    for(let i = 0; i < prices.length; i ++) {
        const subPrices = prices.slice(0, i+1)
        const lastClose = subPrices[subPrices.length - 1].close

        if(!got && strat.shouldBuy(subPrices)) {
            got = lastClose
        } else if (got && (i == prices.length - 1 || strat.shouldSell(subPrices))) {
            const diff = 100 * (lastClose / got - 1) - 0.15
            totalDiff += diff
            got = undefined
            transactionCpt ++
        }
    }

    return {
        totalDiff,
        transactionCpt,
        priceDiff: 100 * (prices.slice(-1)[0] / prices[0] - 1)
    }
}

module.exports = (strat) => {
    const symbolResults = prices.map(price => {
        const results = []
        for(i = 0; i < price.prices.length - 200; i += 100) {
            const subPrices = price.prices.slice(i, i + 200)
            results.push(testStrategyOnPrices(strat, subPrices))
        }

        return {
            symbol: price.symbol,
            winning: 100 * results.filter(r => r.totalDiff > 0).length / results.length,
            avgDiff: results.reduce((acc, r) => acc + r.totalDiff, 0),
            avgTransCpt: results.reduce((acc, r) => acc + r.transactionCpt, 0) / results.length,
        }
    })

    return symbolResults.concat({
        symbol: 'TOTAL',
        winning: symbolResults.reduce((acc, a) => a.winning + acc, 0) / symbolResults.length,
        avgDiff: symbolResults.reduce((acc, a) => a.avgDiff + acc, 0) / symbolResults.length,
        avgTransCpt: symbolResults.reduce((acc, a) => a.avgTransCpt + acc, 0) / symbolResults.length,
    })
}