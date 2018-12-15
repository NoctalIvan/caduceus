import * as assert from "assert";
import { IChartItem } from "./../../src/interfaces/IChartItem";
import anal from "./../../src/engine/analytics/index";

it("analytics - rsi", () => {
    const chart: IChartItem[] = require("./../mocks/appl.json")
    anal.rsi(chart, 3)
    anal.adx(chart, 3)
    anal.candlePatterns(chart)
    anal.macd(chart, 3, 5, 4)
    anal.movingAvg(chart, 3)
    anal.priceEvolution(chart, 3)
    anal.atr(chart, 3)
    anal.roc(chart, 3)
    console.log(chart[8])

    return
    assert.deepEqual(chart[8], { date: '2018-11-23',
    open: 174.94,
    high: 176.595,
    low: 172.1,
    close: 172.29,
    volume: 23623972,
    unadjustedVolume: 23623972,
    change: -4.49,
    changePercent: -2.54,
    vwap: 173.9189,
    label: 'Nov 23',
    changeOverTime: -0.11268476077663901,
    adx:
     { '3':
        { adx: 79.31872802358193,
          adxDelta: 0.07073083273568659,
          pdi: 3.3026466316748087,
          pdiDelta: -0.2608699960691956,
          mdi: 61.442908090741106,
          mdiDelta: 0.23954211872580689 } },
    rsi: { '3': { rsi: 7.99, rsiDelta: -0.34987794955248164 } },
    candlePatterns:
     { abandonedbaby: false,
       doji: false,
       bearishengulfingpattern: false,
       bullishengulfingpattern: false,
       darkcloudcover: false,
       downsidetasukigap: false,
       dragonflydoji: false,
       gravestonedoji: false,
       bullishharami: false,
       bearishharami: false,
       bullishharamicross: false,
       bearishharamicross: false,
       eveningdojistar: false,
       eveningstar: false,
       morningdojistar: false,
       morningstar: false,
       bullishmarubozu: false,
       bearishmarubozu: false,
       piercingline: false,
       bullishspinningtop: true,
       bearishspinningtop: false,
       threeblackcrows: false,
       threewhitesoldiers: false,
       bullishhammerstick: false,
       bearishhammerstick: false,
       bullishinvertedhammerstick: false,
       bearishinvertedhammerstick: false,
       hammerpattern: false,
       hammerpatternunconfirmed: false,
       hangingman: false,
       hangingmanunconfirmed: false,
       shootingstar: false,
       shootingstarunconfirmed: false,
       tweezertop: false,
       tweezerbottom: false },
    macd:
     { '3_5_4':
        { macd: -3.0399309413580227,
          macdDelta: 0.1456236585685715,
          signal: -1.949939390432097,
          signalDelta: -0.37265826697802795,
          histogram: -1.0899915509259257,
          histogramDelta: 0.31215498506136585 } },
    movingAverages:
     { '3':
        { sma: 175.35,
          ema: 176.10276041666668,
          wma: 174.56833333333333,
          wema: 175.35,
          smaRelative: 0.01776075222009399,
          emaRelative: 0.02212989968464041,
          wmaRelative: 0.013223828041867502,
          wemaRelative: 0.040159477394572596,
          smaDelta: -0.025147325896000883,
          emaDelta: -0.021191948304441488,
          wmaDelta: -0.021258503401360596,
          wemaDelta: -0.018938875673078948 } },
    priceEvolution:
     { '3':
        { past: 185.86,
          pastRelative: 0.07876255151198563,
          future: 180.94,
          futureRelative: 0.05020604794242267,
          pastLowest: Infinity,
          pastLowestRelative: Infinity,
          pastHighest: -Infinity,
          pastHighestRelative: -Infinity,
          futureLowest: 170.26,
          futureLowestRelative: -0.011782459806140788,
          futureHighest: 181.29,
          futureHighestRelative: 0.05223750652968828 } } })
})
