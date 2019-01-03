const axios = require('axios')
const fs = require('fs')

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


const main = async () => {
    const prices = await Promise.all(symbols.map(async s => {
        const res = await axios.get('https://api.binance.com/api/v1/klines?symbol=' + s + '&interval=1h&limit=1000')
        console.log('got ' + s)
        return {symbol: s, prices: res.data.map(a => ({open: +a[1], high: +a[2], low: +a[3], close: +a[4]}))}
    }))

    fs.writeFileSync('prices.json', JSON.stringify(prices))
    console.log('done')
    process.exit()
}

main()