import { IQuestion } from '../src/interfaces/IQuestion'
import { ComparisonOperator } from '../src/enums/ComparisonOperator';
import { fetchAndAnswer } from '../src/engine/answerQuestion'
import * as assert from 'assert'

describe('answerQuestion', () => {
    it('should resolve an easy question', async () => {
        const question:IQuestion = {
            symbol: 'aapl',
            condition: {
                analytic: 'lastChangePercent',
                comparison: {
                    operator: ComparisonOperator.LT,
                    value: -0.5
                },
            },
            resultCondition: {
                analytic: 'futureChangePercent',
                comparison: {
                    operator: ComparisonOperator.GT,
                    value: 0.5
                }
            }
        }

        const answer = await fetchAndAnswer(question)
        assert.ok(answer)
        assert.ok(answer.matchingSize > 1)
    } )
})