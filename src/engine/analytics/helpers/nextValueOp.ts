import { IEnrichedChartItem } from "../../../interfaces/IChartItem";
import * as anal from 'technicalindicators'

export function nextValueOp (
    chart:IEnrichedChartItem[], 
    periods:{[label: string]: number},
    getValue:(IEnrichedChartItem) => Object,
    type:string, 
) {
    const analytic = new anal[type.toUpperCase()]({
        ...periods,
        values: []
    })
    const strPeriod = Object.values(periods).join('_')
    let lastValue = undefined
    chart.forEach(item => {
        if(!item[type]) {
            item[type] = {}
            item[type + 'Delta'] = {}
            item[type + 'Relative'] = {}
        }
        const value = analytic.nextValue(getValue(item))
        item[type][strPeriod] = value
        item[type + 'Relative'][strPeriod] = value / item.close - 1
        item[type + 'Delta'][strPeriod] = lastValue && value / lastValue - 1

        lastValue = value
    })
}

export function closeSimplePeriodOp(
    chart: IEnrichedChartItem[], 
    period: number,
    type: string, 
) {
    nextValueOp(chart, {period}, (a) => a.close, type)
}
