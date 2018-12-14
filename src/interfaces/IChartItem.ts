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
    pastChange: {[period: number]: number},
    futureChange: {[period: number]: number},
    lowestPast: {[period: number]: number},
    highestPast: {[period: number]: number},
    lowestFuture: {[period: number]: number},
    highestFuture: {[period: number]: number},
}