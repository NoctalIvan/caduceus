import { IChartItem, IEnrichedChartItem } from "../interfaces/IChartItem";

export function enrichChart (chart:IChartItem[]) : IEnrichedChartItem[] {
    const ec:IEnrichedChartItem[] = JSON.parse(JSON.stringify(chart))
    for(let i = 0; i < chart.length; i ++) {
        // last change
        if(i > 1) {
            ec[i].lastChangePercent = ec[i-1].changePercent
        }

        // future change
        if(i < chart.length - 1) {
            ec[i].futureChangePercent = ec[i+1].changePercent
        }
    }

    return ec
}