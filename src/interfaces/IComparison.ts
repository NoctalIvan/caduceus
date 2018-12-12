import { ComparisonOperator } from "../enums/ComparisonOperator";

export interface IComparison {
    operator:ComparisonOperator,
    value:number,
    precison?:number,
}