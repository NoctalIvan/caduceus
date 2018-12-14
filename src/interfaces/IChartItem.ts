export interface IChartItem {
    date: string,
    open: number,
    high: number,
    low: number,
    close: number,
    volume: number,
    unadjustedVolume: number,
    change: number,
    changePercent: number,
    vwap: number,
    label: string,
    changeOverTime: number
}

export interface IEnrichedChartItem extends IChartItem {
    // past future ratio
    pastChange: {[period: number]: number},
    futureChange: {[period: number]: number},
    lowestPast: {[period: number]: number},
    highestPast: {[period: number]: number},
    lowestFuture: {[period: number]: number},
    highestFuture: {[period: number]: number},

    // movingAvg
    sma: {[period: number]: number},
    ema: {[period: number]: number},
    wma: {[period: number]: number},
    wema: {[period: number]: number},
    smaRelative: {[period: number]: number},
    emaRelative: {[period: number]: number},
    wmaRelative: {[period: number]: number},
    wemaRelative: {[period: number]: number},
    smaDelta: {[period: number]: number},
    emaDelta: {[period: number]: number},
    wmaDelta: {[period: number]: number},
    wemaDelta: {[period: number]: number},

    // candle patterns
    candlePatterns: {[name: string]: boolean},

    // MACD
    macd: {[periods: string]: number}
    macdDelta: {[periods: string]: number}
    macdSignal: {[periods: string]: number}
    macdSignalDelta: {[periods: string]: number}
    macdHistogram: {[periods: string]: number}
    macdHistogramDelta: {[periods: string]: number}
}