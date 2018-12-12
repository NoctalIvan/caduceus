import { ICondition } from "../interfaces/ICondition";
import { IChartItem } from "../interfaces/IChartItem";
import { ComparisonOperator } from "../enums/ComparisonOperator";

export function getConditionFunction(condition:ICondition) {
    return (item:IChartItem) => {
        const conditionValue = item[condition.analytic]
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
