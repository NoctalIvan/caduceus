import { IChartItem } from "../../interfaces/IChartItem";
import { ROC } from 'technicalindicators' 

export function roc(chart:IChartItem[], period: number) {
    let roc = new ROC({values: [], period})
    let lastValue
    for(let i = 0; i < chart.length; i ++) {
        const item = chart[i]
        const value = roc.nextValue(item.close)
        if(!value) continue
        
        item.roc = item.roc || {}
        item.roc[period] = {
            roc: value,
            rocDelta: lastValue && lastValue && value / lastValue - 1,
        }

        lastValue = value
    }
}
