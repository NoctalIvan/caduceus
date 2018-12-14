import { IEnrichedChartItem } from "../../interfaces/IChartItem";
import { closeSimplePeriodOp } from "./helpers/nextValueOp";

export function sma(chart:IEnrichedChartItem[], period:number) {
    closeSimplePeriodOp(chart, period, 'sma', false)
}
export function ema(chart:IEnrichedChartItem[], period:number) {
    closeSimplePeriodOp(chart, period, 'ema', false)
}
export function wma(chart:IEnrichedChartItem[], period:number) {
    closeSimplePeriodOp(chart, period, 'wma', false)
}
export function wema(chart:IEnrichedChartItem[], period:number) {
    closeSimplePeriodOp(chart, period, 'wema', false)
}

export function smaDelta(chart:IEnrichedChartItem[], period:number) {
    closeSimplePeriodOp(chart, period, 'sma', true)
}
export function emaDelta(chart:IEnrichedChartItem[], period:number) {
    closeSimplePeriodOp(chart, period, 'ema', true)
}
export function wmaDelta(chart:IEnrichedChartItem[], period:number) {
    closeSimplePeriodOp(chart, period, 'wma', true)
}
export function wemaDelta(chart:IEnrichedChartItem[], period:number) {
    closeSimplePeriodOp(chart, period, 'wema', true)
}