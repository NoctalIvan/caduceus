import { IChartItem } from "../interfaces/IChartItem";
import { ComparisonOperator } from "../enums/ComparisonOperator";
import { ICondition } from "../interfaces/IQuestion";

export function getConditionFunction(condition:ICondition) {
    return (item:IChartItem) => {
        let conditionValue = item[condition.analytic.type] && item[condition.analytic.type][condition.analytic.subType]
        if(!conditionValue) { return null }
        
        if(condition.analytic.period) {
            conditionValue = conditionValue[condition.analytic.period.join('_')]
            if(!conditionValue) { return null }
        }

        switch (condition.comparison.operator) {
            case ComparisonOperator.GT:
                return conditionValue >= condition.comparison.value
            case ComparisonOperator.LT:
                return conditionValue <= condition.comparison.value
            case ComparisonOperator.EQ:
                return conditionValue == condition.comparison.value
            case ComparisonOperator.AROUND:
                return 100 * Math.abs(conditionValue/condition.comparison.value - 1) < condition.comparison.precison
            case ComparisonOperator.TRUE:
                return conditionValue
            case ComparisonOperator.FALSE:
                return !conditionValue
        }
    }
}
