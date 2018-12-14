import { IEnrichedChartItem } from "../../../interfaces/IChartItem";
import * as anal from 'technicalindicators'

export function nextValueOp (
    chart:IEnrichedChartItem[], 
    periods:{[label: string]: number},
    getValue:(IEnrichedChartItem) => Object,
    type:string, 
    delta:boolean
) {
    const analytic = new anal[type.toUpperCase()]({
        ...periods,
        values: []
    })
    const strPeriod = Object.values(periods).join('_')
    chart.forEach(item => {
        if(!item[type]) {item[type] = {}}
        item[type][strPeriod] = analytic.nextValue(getValue(item))
    })

    if(delta) {
        for(let i = 1; i < chart.length; i ++) {
            const item = chart[i]
            item[type + 'Delta'] = {
                ...(item[type + 'Delta'] || {}),
                [strPeriod]: item[type][strPeriod] / chart[i-1][type][strPeriod] - 1
            }
        }
    }
}

export function closeSimplePeriodOp(
    chart: IEnrichedChartItem[], 
    period: number,
    type: string, 
    delta: boolean
) {
    nextValueOp(chart, {period}, (a) => a.close, type, delta)
}
