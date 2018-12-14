import { IEnrichedChartItem } from "../../interfaces/IChartItem";

export function pastChange (chart:IEnrichedChartItem[], period:number) {
    for(let i = period - 1; i < chart.length; i ++) {
        const item = chart[i]
        item.pastChange = {
            ...(item.pastChange || {}),
            [period]: item.close / chart[i-period+1].open - 1
        }
    }
}

export function futureChange (chart:IEnrichedChartItem[], period:number) {
    for(let i = 0; i < chart.length - period; i ++) {
        const item = chart[i]
        item.futureChange = {
            ...(item.futureChange || {}),
            [period]: chart[i+period].close / item.close - 1
        }
    }
}

export function lowestPastRatio (chart:IEnrichedChartItem[], period:number) {
    for(let i = period - 1; i < chart.length; i ++) {
        const item = chart[i]
        item.lowestPast = {
            ...(item.lowestPast || {}),
            [period]: chart
                .slice(i - period + 1, i + 1)
                .reduce((min, a) => a.low < min ? a.low : min, Infinity) / item.close - 1
        }
    }
}

export function highestPastRatio (chart:IEnrichedChartItem[], period:number) {
    for(let i = period - 1; i < chart.length; i ++) {
        const item = chart[i]
        item.highestPast = {
            ...(item.highestPast || {}),
            [period]: chart
                .slice(i - period + 1, i + 1)
                .reduce((max, a) => a.high > max ? a.high : max, 0) / item.close - 1
        }
    }
}

export function lowestFutureRatio (chart:IEnrichedChartItem[], period:number) {
    for(let i = 0; i < chart.length - period; i ++) {
        const item = chart[i]
        item.lowestFuture = {
            ...(item.lowestFuture || {}),
            [period]: chart
                .slice(i + 1, i + period + 1)
                .reduce((min, a) => a.low < min ? a.low : min, Infinity) / item.close - 1
        }
    }
}

export function highestFutureRatio (chart:IEnrichedChartItem[], period:number) {
    for(let i = 0; i < chart.length - period; i ++) {
        const item = chart[i]
        item.highestFuture = {
            ...(item.highestFuture || {}),
            [period]: chart
                .slice(i + 1, i + period + 1)
                .reduce((max, a) => a.high > max ? a.high : max, 0) / item.close - 1
        }
    }
}