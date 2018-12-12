import { ICondition } from "./ICondition";

// how often did the aapl which fall by 0.5% raise by 0.5% in a day, on the last 5 years
//  => APPL / FALL < 0.5 / RAISE > 0.5
//  => symbol / condition / result

export interface IQuestion {
    symbol:string,
    condition:ICondition,
    resultCondition:ICondition,
}