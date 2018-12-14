import { ComparisonOperator } from "../enums/ComparisonOperator";

// how often did the aapl which fall by 0.5% raise by 0.5% in a day, on the last 5 years
//  => APPL / FALL < 0.5 / RAISE > 0.5
//  => symbol / condition / result

export interface IQuestion {
    symbol:string,
    condition:ICondition,
    resultCondition:ICondition,
}

export interface IAnswer {
    totalSize:number,
    sampleSize: number,
    matchingSize: number,
    dummySize: number,
}

export interface ICondition {
    analytic: IAnalytic,
    comparison: IComparison,
}

export interface IAnalytic {
    type: string,
    period: number
}

export interface IComparison {
    operator:ComparisonOperator,
    value:number,
    precison?:number,
}