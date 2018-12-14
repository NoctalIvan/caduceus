import { IEnrichedChartItem } from "../../interfaces/IChartItem";

export function futureChange (chart:IEnrichedChartItem[], period:number) {
    for(let i = 0; i < chart.length - period; i ++) {
        const item = chart[i]
        item.futureChange = {
            ...(item.futureChange || {}),
            [period]: chart[i+period].close / item.close - 1
        }
    }
}

export function pastChange (chart:IEnrichedChartItem[], period:number) {
    for(let i = period - 1; i < chart.length; i ++) {
        const item = chart[i]
        item.pastChange = {
            ...(item.pastChange || {}),
            [period]: item.close / chart[i-period+1].open - 1
        }
    }
} 