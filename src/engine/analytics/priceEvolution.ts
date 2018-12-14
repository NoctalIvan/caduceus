import { IChartItem } from "../../interfaces/IChartItem";

export function priceEvolution (chart:IChartItem[], period:number) {
    for(let i = 0; i < chart.length; i ++) {
        const item = chart[i]
        const past = chart[i - period]
        const future = chart[i + period]

        const pastLowest = past && Math.min(...chart.slice(i - period, period).map(a => a.low))
        const pastHighest = past && Math.max(...chart.slice(i - period, period).map(a => a.high))
        const futureLowest = future && Math.min(...chart.slice(i + 1, i + period + 1).map(a => a.low))
        const futureHighest = future && Math.max(...chart.slice(i + 1, i + period + 1).map(a => a.high))

        item.priceEvolution = item.priceEvolution || {}
        item.priceEvolution[period] = {
            past: past && past.close,
            pastRelative: past && past.close / item.close - 1,
            future: future && future.close,
            futureRelative: future && future.close / item.close - 1,
            pastLowest,
            pastLowestRelative: pastLowest && pastLowest / item.close - 1,
            pastHighest: pastHighest,
            pastHighestRelative: pastHighest && pastHighest / item.close - 1,
            futureLowest: futureLowest,
            futureLowestRelative: futureLowest && futureLowest / item.close - 1,
            futureHighest: futureHighest,
            futureHighestRelative: futureHighest && futureHighest / item.close - 1,
        }
    }
}