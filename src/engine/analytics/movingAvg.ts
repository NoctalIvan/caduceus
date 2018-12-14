import { IEnrichedChartItem } from "../../interfaces/IChartItem";
import { closeSimplePeriodOp } from "./helpers/nextValueOp";

export function sma(chart:IEnrichedChartItem[], period:number) {
    closeSimplePeriodOp(chart, period, 'sma')
}
export function ema(chart:IEnrichedChartItem[], period:number) {
    closeSimplePeriodOp(chart, period, 'ema')
}
export function wma(chart:IEnrichedChartItem[], period:number) {
    closeSimplePeriodOp(chart, period, 'wma')
}
export function wema(chart:IEnrichedChartItem[], period:number) {
    closeSimplePeriodOp(chart, period, 'wema')
}
