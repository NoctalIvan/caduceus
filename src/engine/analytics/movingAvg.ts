import { IEnrichedChartItem } from "../../interfaces/IChartItem";
import { SMA, EMA } from 'technicalindicators'

export function sma (chart:IEnrichedChartItem[], period:number) {
    const sma = new SMA({period, values : []})
    chart.forEach(item => {
        if(!item.sma) {item.sma = {}}
        item.sma[period] = sma.nextValue(item.close)
    })
}

export function ema (chart:IEnrichedChartItem[], period:number) {
    const ema = new EMA({period, values : []})
    chart.forEach(item => {
        if(!item.ema) {item.ema = {}}
        item.ema[period] = ema.nextValue(item.close)
    })
}

export function smaDelta (chart:IEnrichedChartItem[], period:number) {
    if(!chart[0].sma || !chart[period].sma[period]) {
        sma(chart, period)
    }

    for(let i = 1; i < chart.length; i ++) {
        const item = chart[i]
        item.smaDelta = {
            ...(item.smaDelta || {}),
            [period]: item.sma[period] / chart[i-1].sma[period] - 1
        }
    }
}

export function emaDelta (chart:IEnrichedChartItem[], period:number) {
    if(!chart[0].ema || !chart[period].ema[period]) {
        ema(chart, period)
    }

    for(let i = 1; i < chart.length; i ++) {
        const item = chart[i]
        item.emaDelta = {
            ...(item.emaDelta || {}),
            [period]: item.ema[period] / chart[i-1].ema[period] - 1
        }
    }
}