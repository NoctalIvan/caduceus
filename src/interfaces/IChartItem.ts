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
    smaDelta: {[period: number]: number},
    emaDelta: {[period: number]: number},
    wmaDelta: {[period: number]: number},
    wemaDelta: {[period: number]: number},
}