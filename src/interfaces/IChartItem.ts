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
    lastChangePercent: number
    futureChangePercent: number
}