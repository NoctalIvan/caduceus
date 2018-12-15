import { IQuestion } from "../interfaces/IQuestion";
import { ComparisonOperator } from "../enums/ComparisonOperator";
import { fetchAndAnswer, answerQuestion } from "../engine/answerQuestion";

const question:IQuestion = {
    symbol: 'aapl',
    condition: {
        analytic: {
            type: 'candlePatterns',
            subType: 'morningstar'
        },
        comparison: {
            operator: ComparisonOperator.ISTRUE,
        },
    },
    resultCondition: {
        analytic: {
            type: 'candlePatterns',
            subType: 'morningstar'
        },
        comparison: {
            operator: ComparisonOperator.ISTRUE,
        }
    }
}

fetchAndAnswer(question).then(answer => {
    console.log(question)
    console.log(answer)
    console.log({
        dummyRatio: answer.dummySize / answer.totalSize,
        matchingRatio: answer.matchingSize / answer.sampleSize,
        sampleSizeRatio: answer.sampleSize / answer.totalSize
    })
})