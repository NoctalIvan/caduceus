import { IChartItem } from "../interfaces/IChartItem";
import { ComparisonOperator } from "../enums/ComparisonOperator";
import { ICondition } from "../interfaces/IQuestion";

export function getConditionFunction(condition:ICondition) {
    return (item:IChartItem) => {
        const conditionValue = item[condition.analytic.type][condition.analytic.period]
        if(!item || !conditionValue) {
            return null
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
        }
    }
}
