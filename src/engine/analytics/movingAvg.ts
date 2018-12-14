import { IEnrichedChartItem } from "../../interfaces/IChartItem";
import * as anal from 'technicalindicators'

function avg (chart:IEnrichedChartItem[], period:number, type:string, delta:boolean) {
    const a = new anal[type.toUpperCase()]({period, values : []})
    chart.forEach(item => {
        if(!item[type]) {item[type] = {}}
        item[type][period] = a.nextValue(item.close)
    })

    if(delta) {
        for(let i = 1; i < chart.length; i ++) {
            const item = chart[i]
            item[type + 'Delta'] = {
                ...(item[type + 'Delta'] || {}),
                [period]: item[type][period] / chart[i-1][type][period] - 1
            }
        }
    }
}

export function sma(chart:IEnrichedChartItem[], period:number) {
    avg(chart, period, 'sma', false)
}
export function ema(chart:IEnrichedChartItem[], period:number) {
    avg(chart, period, 'ema', false)
}
export function wma(chart:IEnrichedChartItem[], period:number) {
    avg(chart, period, 'wma', false)
}
export function wema(chart:IEnrichedChartItem[], period:number) {
    avg(chart, period, 'wema', false)
}

export function smaDelta(chart:IEnrichedChartItem[], period:number) {
    avg(chart, period, 'sma', true)
}
export function emaDelta(chart:IEnrichedChartItem[], period:number) {
    avg(chart, period, 'ema', true)
}
export function wmaDelta(chart:IEnrichedChartItem[], period:number) {
    avg(chart, period, 'wma', true)
}
export function wemaDelta(chart:IEnrichedChartItem[], period:number) {
    avg(chart, period, 'wema', true)
}